import { View, Button, Text, Image } from "react-native";

import { styles } from "./styles";
import { useUserContext } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import Card from "../../componets/Card/Card";
import Buton from "../../componets/Button/Buton";
import {
  deletarCategoriaService,
  listarCategoriasService,
} from "../../services/CategoriaService";

export default function Categoria({ navigation }) {
  const { userData } = useUserContext();
  const [categorias, setCategorias] = useState([]);

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

  return (
    <View style={styles.container}>
      <Buton
        onPress={() => navigation.getParent()?.navigate("CriarCategoria")}
        styleButton={styles.buttonAdicionar}
      >
        <Image
          style={styles.imageAdiocionar}
          source={require("../../assets/adicionar.png")}
        ></Image>
      </Buton>
      <View style={styles.cardsContainer}>
        {categorias && categorias.length > 0 ? (
          categorias.map((categoria) => (
            <Card
              key={categoria.id}
              onPress={() =>
                navigation
                  .getParent()
                  ?.navigate("AtualizarCategoria", { id: categoria.id })
              }
              image={require("../../assets/perfil.png")}
              title={"nome " + categoria.nome}
              description={"descricao: " + categoria.descricao}
              containerStyle={styles.cardContainer}
              textContainerStyle={styles.textContainerStyleCard}
              titleStyle={styles.titleCard}
              descriptionStyle={styles.descriptionCard}
              imageStyle={styles.logoCard}
              secondaryContent={
                <Buton
                  onPress={() => deletarCategoriaService(categoria.id)}
                  styleButton={styles.buttonEntrar}
                >
                  <Text style={styles.textButton}>Deletar</Text>
                </Buton>
              }
            />
          ))
        ) : (
          <Text>Nunhuma caterogia </Text>
        )}
      </View>
    </View>
  );
}
