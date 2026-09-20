import { View, Button, Text, Image } from "react-native";

import { styles } from "./styles";
import { useUserContext } from "../../contexts/UserContext";
import {
  deletarUsuarioService,
  listarUsuariosService,
} from "../../services/UsuarioService";
import { useState, useEffect } from "react";
import Card from "../../componets/Card/Card";
import Buton from "../../componets/Button/Buton";

export default function Usuarios({ navigation }) {
  const { userData } = useUserContext();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (!userData?.idRestaurante) {
      return;
    }

    const unsubscribe = listarUsuariosService(
      userData.idRestaurante,
      (data) => {
        setUsuarios(data);
      },
    );

    return () => {
      unsubscribe?.();
    };
  }, [userData?.idRestaurante]);

  return (
    <View style={styles.container}>
      <Buton
        onPress={() => navigation.getParent()?.navigate("CriarUsuario")}
        styleButton={styles.buttonAdicionar}
      >
        <Image
          style={styles.imageAdiocionar}
          source={require("../../assets/adicionar.png")}
        ></Image>
      </Buton>
      <View style={styles.cardsContainer}>
        {usuarios &&
          usuarios.map((usuario) => (
            <Card
              key={usuario.id}
              onPress={() =>
                navigation
                  .getParent()
                  ?.navigate("Atualizar", { id: usuario.id })
              }
              image={require("../../assets/perfil.png")}
              title={usuario.tipoUsuario}
              description={"nome: " + usuario.nomeCompleto}
              containerStyle={styles.cardContainer}
              textContainerStyle={styles.textContainerStyleCard}
              titleStyle={styles.titleCard}
              descriptionStyle={styles.descriptionCard}
              imageStyle={styles.logoCard}
              content={
                <Text style={styles.descriptionCard}>
                  email: {usuario.email}
                </Text>
              }
              secondaryContent={
                <Buton
                  onPress={() => deletarUsuarioService(usuario.id)}
                  styleButton={styles.buttonEntrar}
                >
                  <Text style={styles.textButton}>Deletar</Text>
                </Buton>
              }
            />
          ))}
      </View>
    </View>
  );
}
