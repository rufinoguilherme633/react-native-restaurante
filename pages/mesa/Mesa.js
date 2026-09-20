import { View, Button, Text, Image } from "react-native";

import { styles } from "./styles";
import { useUserContext } from "../../contexts/UserContext";

import { useState, useEffect } from "react";
import Card from "../../componets/Card/Card";
import Buton from "../../componets/Button/Buton";
import {
  deletarMesaService,
  listarMesaService,
} from "../../services/MesaService";

export default function Mesa({ navigation, stackNavigation }) {
  const { userData } = useUserContext();
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    if (!userData?.idRestaurante) {
      return;
    }

    const unsubscribe = listarMesaService(userData.idRestaurante, (data) => {
      setMesas(data);
    });

    return () => {
      unsubscribe?.();
    };
  }, [userData?.idRestaurante]);

  return (
    <View style={styles.container}>
      <Buton
        onPress={() => navigation.getParent()?.navigate("CriarMesa")}
        styleButton={styles.buttonAdicionar}
      >
        <Image
          style={styles.imageAdiocionar}
          source={require("../../assets/adicionar.png")}
        ></Image>
      </Buton>
      <View style={styles.cardsContainer}>
        {mesas && mesas.length > 0 ? (
          mesas.map((mesa) => (
            <Card
              key={mesa.id}
              onPress={() => {
                navigation
                  .getParent()
                  ?.navigate("AtualizarMesa", { id: mesa.id });
              }}
              image={require("../../assets/perfil.png")}
              title={mesa.nome}
              description={"nome: " + mesa.descricao}
              containerStyle={styles.cardContainer}
              textContainerStyle={styles.textContainerStyleCard}
              titleStyle={styles.titleCard}
              descriptionStyle={styles.descriptionCard}
              imageStyle={styles.logoCard}
              content={""}
              secondaryContent={
                <Buton
                  onPress={() => deletarMesaService(mesa.id)}
                  styleButton={styles.buttonEntrar}
                >
                  <Text style={styles.textButton}>Deletar</Text>
                </Buton>
              }
            />
          ))
        ) : (
          <Text>Nenhuma mesa cadastrada</Text>
        )}
      </View>
    </View>
  );
}
