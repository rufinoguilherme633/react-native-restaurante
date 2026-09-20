import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import { Picker } from "@react-native-picker/picker";
import { useUserContext } from "../../contexts/UserContext";
import Card from "../../componets/Card/Card";
import {
  buscarSessao,
  buscarSessaoService,
  listarPedidosDaSessao,
} from "../../services/SessaoService";
import { fecharPedidoService } from "../../services/PedidoService";

export default function DetalhesDoPedido({ navigation, route }) {
  const [produtos, setProdutos] = useState([]);
  const [sessao, setSessao] = useState("");
  const { sessaoData, setsessaoData } = useUserContext();
  const { idRestaurante, uuidMesa, uudiSessao, pedidoId } = route.params;

  useEffect(() => {
    if (!uudiSessao || !idRestaurante) {
      return;
    }

    const unsubscribeSessao = buscarSessao(
      uudiSessao,
      idRestaurante,
      (data) => {
        console.log("SESSÃO:", data);

        if (data.length > 0) {
          setSessao(data[0]);
        }
      },
    );

    const unsubscribePedidos = listarPedidosDaSessao(
      uudiSessao,
      idRestaurante,
      (data) => {
        console.log("PEDIDOS DA SESSÃO:", data);

        const produtosDaSessao = data.flatMap((pedido) => {
          return Object.entries(pedido.produtos ?? {}).map(
            ([produtoId, produto]) => ({
              id: produtoId,
              pedidoId: pedido.id,
              ...produto,
            }),
          );
        });

        console.log("PRODUTOS:", produtosDaSessao);

        setProdutos(produtosDaSessao);
      },
    );

    return () => {
      unsubscribeSessao?.();
      unsubscribePedidos?.();
    };
  }, [uudiSessao, idRestaurante]);

  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/iconeContaAdministradora.png")}
        title="Pedidos "
        description=""
        containerStyle={styles.introContainer}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        imageStyle={styles.logo}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.cardsContainer}
      >
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <Card
              key={`${produto.pedidoId}-${produto.id}`}
              image={require("../../assets/perfil.png")}
              title={produto.nome}
              description={`Quantidade: ${produto.quantidade}`}
              containerStyle={styles.cardContainer}
              textContainerStyle={styles.textContainerStyleCard}
              titleStyle={styles.titleCard}
              descriptionStyle={styles.descriptionCard}
              imageStyle={styles.logoCard}
              content={
                <Text style={styles.descriptionCard}>
                  R${" "}
                  {(Number(produto.preco) * Number(produto.quantidade)).toFixed(
                    2,
                  )}
                </Text>
              }
            />
          ))
        ) : (
          <Text>Nenhum produto pedido nessa sessão.</Text>
        )}
      </ScrollView>

      <Buton
        onPress={async () => {
          try {
            await fecharPedidoService(pedidoId);

            console.log("Pedido fechado com sucesso:", pedidoId);

            navigation.goBack();
          } catch (error) {
            console.error("Erro ao fechar pedido:", error);
          }
        }}
        styleButton={styles.buttonEntrar}
      >
        <Text style={styles.textButton}>Confirmar</Text>
      </Buton>
    </View>
  );
}
