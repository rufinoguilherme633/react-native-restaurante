import { View, Button, Text, Image, ScrollView } from "react-native";

import { styles } from "./styles";
import { useUserContext } from "../../contexts/UserContext";

import { useState, useEffect } from "react";
import Card from "../../componets/Card/Card";
import Buton from "../../componets/Button/Buton";
import {
  deletarProdutoService,
  listarProdutosPorCategoriaService,
  listarProdutosService,
} from "../../services/ProdutosServices";
import { listarCategoriasService } from "../../services/CategoriaService";

export default function Produtos({ navigation }) {
  const { userData } = useUserContext();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    if (!userData?.idRestaurante) {
      return;
    }

    const unsubscribe = listarProdutosService(
      userData.idRestaurante,
      (data) => {
        setProdutos(data);
      },
    );

    return () => {
      unsubscribe?.();
    };
  }, [userData?.idRestaurante]);

  useEffect(() => {
    if (!userData?.idRestaurante) {
      return;
    }

    const unsubscribe = listarCategoriasService(
      userData.idRestaurante,
      (data) => {
        setCategorias(data);
      },
    );

    return () => {
      unsubscribe?.();
    };
  }, [userData?.idRestaurante]);

  function listarProdutosPorCategoria(categoriaid) {
    try {
      const results = listarProdutosPorCategoriaService(
        userData.idRestaurante,
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

  return (
    <View style={styles.container}>
      <Buton
        onPress={() => navigation.getParent()?.navigate("CriarProduto")}
        styleButton={styles.buttonAdicionar}
      >
        <Image
          style={styles.imageAdiocionar}
          source={require("../../assets/adicionar.png")}
        ></Image>
      </Buton>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 20,
        }}
        style={{ flexGrow: 0 }}
      >
        {categorias && categorias.length > 0 ? (
          categorias.map((categoria) => (
            <Buton
              key={categoria.id}
              onPress={() => listarProdutosPorCategoria(categoria.id)}
              styleButton={styles.buttonCategoria}
            >
              <Text>{categoria.nome}</Text>
            </Buton>
          ))
        ) : (
          <Text>Categoria não encontrada</Text>
        )}
      </ScrollView>
      <ScrollView
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 15,
          width: "100%",
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
              title={produto.tipoproduto}
              description={"nome: " + produto.nome}
              containerStyle={styles.cardContainer}
              textContainerStyle={styles.textContainerStyleCard}
              titleStyle={styles.titleCard}
              descriptionStyle={styles.descriptionCard}
              imageStyle={styles.logoCard}
              content={
                <Text style={styles.descriptionCard}>
                  descricao: {produto.descricao}
                </Text>
              }
              secondaryContent={
                <Buton
                  onPress={() => deletarProdutoService(produto.id)}
                  styleButton={styles.buttonEntrar}
                >
                  <Text style={styles.textButton}>Deletar</Text>
                </Buton>
              }
            />
          ))
        ) : (
          <Text>Nenhum produto cadastrado</Text>
        )}
      </ScrollView>
    </View>
  );
}
