import { View, Text, Image, TouchableOpacity } from "react-native";
import { use, useEffect, useState } from "react";
import { styles } from "./style";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import {
  persistirDadosNoAparelho,
  verificarCodigoNoBanco,
  verificarPersistenciaDadoAparelho,
} from "../../services/MesaService";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  buscarSessaoService,
  criarSessaoService,
} from "../../services/SessaoService";
import { ScrollView } from "react-native";
import { listarCategoriasService } from "../../services/CategoriaService";
import { listarProdutosPorCategoriaService } from "../../services/ProdutosServices";
import Card from "../../componets/Card/Card";
import * as NavigationBar from "expo-navigation-bar";
import { criarPedido } from "../../services/PedidoService";

export default function ModoMesa({ navigation }) {
  const [codigo, setCodigo] = useState("");
  const [codigoPersistido, setCodigoPersistido] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [sessao, setSessao] = useState(null);
  const [uudiMesa, setUudiMesa] = useState(null);
  const [uuidRestaurante, setUuidRestaurante] = useState(null);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [produtos, setProdutos] = useState([]);

  const [produtosSelecionados, setProdutosSelecionados] = useState({});

  useEffect(() => {
    let unsubscribeSessao;
    async function verificarCodigo() {
      const resultado = await verificarPersistenciaDadoAparelho();
      console.log("persistencia no aparelho", resultado);
      const verificarCodigoBanco = await verificarCodigoNoBanco(resultado);
      console.log("dados Banco", verificarCodigoBanco);

      if (verificarCodigoBanco == null) {
        console.log("Codigo nao encontrado");
        setCodigoPersistido("");
        return;
      }
      setCodigoPersistido(resultado);
      setUudiMesa(verificarCodigoBanco.id);
      const idRestaurante = verificarCodigoBanco.idRestaurante;

      setUuidRestaurante(verificarCodigoBanco.idRestaurante);
      console.log("opa", codigoPersistido);
      unsubscribeSessao = await buscarSessaoService(
        verificarCodigoBanco.id,
        verificarCodigoBanco.idRestaurante,
        (sessaoAtualizada) => {
          if (sessaoAtualizada.length == 0) {
            console.log("nenhuma sessao encontrada");
            setSessao("");
            return;
          }
          setSessao(sessaoAtualizada[0]);
          const unsubscribe = listarCategoriasService(idRestaurante, (data) => {
            setCategorias(data);
            setCategoriaSelecionada(data[0]);

            console.log("categoria inicial", categoriaSelecionada);
          });
          console.log("categorias", categorias);
        },
      );
    }
    async function configurarOrientacao() {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE,
        );
        await NavigationBar.setVisibilityAsync("hidden");
        await NavigationBar.setBehaviorAsync("overlay-swipe");
      } catch (error) {
        console.log("Não foi possível alterar orientação:", error);
      }
    }

    verificarCodigo();
    configurarOrientacao();
    verificarCodigo();

    return () => {
      if (unsubscribeSessao) {
        unsubscribeSessao();
      }

      ScreenOrientation.unlockAsync().catch((error) => {
        console.log("Não foi possível liberar orientação:", error);
      });
    };
  }, []);

  async function criarSessao() {
    try {
      const sessaoCriada = await criarSessaoService(uudiMesa, uuidRestaurante);
      console.log(sessaoCriada);

      setSessao(sessaoCriada.id);
    } catch (error) {
      console.error("Erro ao criar sessao:", error);
      throw error;
    }
  }

  function listarProdutosPorCategoria(categoriaid) {
    try {
      const results = listarProdutosPorCategoriaService(
        uuidRestaurante,
        categoriaid,
        (data) => {
          setProdutos(data);
        },
      );
      console.log(results);
    } catch (error) {
      console.error("Erro ao criar Authentication:", error);
      throw error;
    }
  }
  function calcularTotal() {
    let valorTotal = 0;

    Object.values(produtosSelecionados).forEach((produto) => {
      valorTotal += produto.preco * produto.quantidade;
    });

    return valorTotal;
  }

  function adicionarProdutoAoPedido(produto) {
    setProdutosSelecionados((selecionados) => ({
      ...selecionados,
      [produto.id]: {
        quantidade: (selecionados[produto.id]?.quantidade || 0) + 1,
        preco: Number(produto.preco),
        nome: produto.nome,
      },
    }));
  }

  function removerProdutoAoPedido(produtoId) {
    setProdutosSelecionados((selecionados) => {
      const produto = selecionados[produtoId];

      if (!produto) {
        return selecionados;
      }

      if (produto.quantidade <= 1) {
        const novoSelecionados = { ...selecionados };

        delete novoSelecionados[produtoId];

        return novoSelecionados;
      }

      return {
        ...selecionados,
        [produtoId]: {
          ...produto,
          quantidade: produto.quantidade - 1,
        },
      };
    });
  }

  async function fazerPedido() {
    try {
      const pedido = {
        produtos: produtosSelecionados,
        sessaoUuid: sessao,
        uudiusuario: "",
      };

      const pedidoService = await criarPedido(pedido, uuidRestaurante);
      console.log("criado com sucesso");
      setProdutosSelecionados({});
    } catch (error) {
      console.error("Erro ao criar Pedido:", error);
      throw error;
    }
  }
  return (
    <>
      {codigoPersistido ? (
        sessao ? (
          <View style={styles.containerPage}>
            <View style={styles.containerCategorias}>
              <Text style={{ fontSize: 20 }}>Categorias</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 15,
                  flexDirection: "column",
                  paddingTop: 15,
                  paddingLeft: 15,
                  width: "100%",
                }}
              >
                {categorias && categorias.length > 0 ? (
                  categorias.map((categoria) => (
                    <Buton
                      key={categoria.id}
                      onPress={() => {
                        setCategoriaSelecionada(categoria);
                        listarProdutosPorCategoria(categoria.id);
                      }}
                      styleButton={styles.buttonCategoria}
                    >
                      <Text>{categoria.nome}</Text>
                    </Buton>
                  ))
                ) : (
                  <Text>Categoria não encontrada</Text>
                )}
              </ScrollView>
            </View>
            <View style={styles.containerProdutos}>
              <Text>{categoriaSelecionada.nome}</Text>
              <ScrollView
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                }}
              >
                {produtos && produtos.length > 0 ? (
                  produtos.map((produto) => (
                    <Card
                      key={produto.id}
                      onPress={() =>
                        navigation
                          .getParent()
                          ?.navigate("Atualizar", { id: produto.id })
                      }
                      image={require("../../assets/perfil.png")}
                      title={produto.nome}
                      description={produto.descricao}
                      containerStyle={styles.cardContainer}
                      textContainerStyle={styles.textContainerStyleCard}
                      imageStyle={styles.imageProduto}
                      titleStyle={styles.titleCard}
                      descriptionStyle={styles.descriptionCard}
                      content={
                        <>
                          <Text style={styles.descriptionCard}>
                            {"R$ " + produto.preco}
                          </Text>
                        </>
                      }
                      secondaryContent={
                        <>
                          <Buton
                            onPress={() => removerProdutoAoPedido(produto.id)}
                            styleButton={styles.buttonSubstractPedido}
                          >
                            <Image
                              source={require("../../assets/subtract.png")}
                              style={styles.imageButtonContadorPedido}
                            />
                          </Buton>

                          <Buton styleButton={styles.buttonContadorPedido}>
                            <Text>
                              {produtosSelecionados[produto.id]?.quantidade ||
                                0}
                            </Text>
                          </Buton>

                          <Buton
                            onPress={() => adicionarProdutoAoPedido(produto)}
                            styleButton={styles.buttonAddPedido}
                          >
                            <Image
                              source={require("../../assets/add.png")}
                              style={styles.imageButtonContadorPedido}
                            />
                          </Buton>
                        </>
                      }
                    />
                  ))
                ) : (
                  <Text>Nenhum produto cadastrado</Text>
                )}
              </ScrollView>
              <View style={styles.containerFazerPedido}>
                <Buton
                  onPress={fazerPedido}
                  styleButton={styles.buttonFazerPedido}
                >
                  <Text style={styles.textButtonFazerPedido}>Fazer pedido</Text>
                </Buton>

                <Buton styleButton={styles.buttonFazerPedido}>
                  <Text style={styles.textButtonFazerPedido}>
                    R$ {calcularTotal().toFixed(2).replace(".", ",")}
                  </Text>
                </Buton>
              </View>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.container}>
              <IntroContent
                image={require("../../assets/login.jpg")}
                title="Bem-vindo ao seu restaurante"
                description="Para começar a pedir, toque em Iniciar sessão"
                containerStyle={styles.introContainer}
                titleStyle={styles.title}
                descriptionStyle={styles.description}
                imageStyle={styles.logo}
                onBack={() => navigation.goBack()}
              />
              <View style={styles.cardsContainer}>
                <Buton
                  onPress={() => criarSessao()}
                  styleButton={styles.buttonIniciarSessao}
                >
                  <Text style={styles.textoBotao}>Iniciar sessão</Text>
                </Buton>
              </View>
            </View>
          </>
        )
      ) : (
        <Text>Aparelho não cadastrado</Text>
      )}
    </>
  );
}
