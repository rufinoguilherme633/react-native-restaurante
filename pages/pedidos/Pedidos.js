import { View, Button, Text, Image, ScrollView } from "react-native";

import { styles } from "./styles";
import { useUserContext } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import Card from "../../componets/Card/Card";
import Buton from "../../componets/Button/Buton";
import { listarPedidosService } from "../../services/PedidoService";

export default function Pedidos({ navigation }) {
  const { userData } = useUserContext();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (!userData?.idRestaurante) {
      return;
    }

    const unsubscribe = listarPedidosService(userData.idRestaurante, (data) => {
      console.log("PEDIDOS RECEBIDOS DO FIREBASE:", data);

      setPedidos(data);
    });

    return () => {
      unsubscribe?.();
    };
  }, [userData?.idRestaurante]);

  return (
    <View style={styles.container}>
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
        {pedidos && pedidos.length > 0 ? (
          pedidos.map((produto) => (
            <Card
              key={produto.id}
              onPress={() =>
                navigation.getParent()?.navigate("DetalhesDoPedido", {
                  uuidMesa: produto.uuidMesa,
                  idRestaurante: produto.idRestaurante,
                  uudiSessao: produto.sessaoUuid?.id,
                  pedidoId: produto.id,
                })
              }
              image={require("../../assets/perfil.png")}
              title={produto.mesa?.nome ?? "Mesa não encontrada"}
              description={""}
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
            />
          ))
        ) : (
          <Text>Nenhum produto cadastrado</Text>
        )}
      </ScrollView>
    </View>
  );
}
