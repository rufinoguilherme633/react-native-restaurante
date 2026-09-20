import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { use, useEffect, useState } from "react";
import { styles } from "./styles";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import { buscarCategoriaService } from "../../services/CategoriaService";

export default function AtualizarCategoria({ navigation, route }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const { id } = route.params;

  async function buscarCategoria(id) {
    try {
      const categ = await buscarCategoriaService(id);

      setNome(categ?.nome ?? "");
      setDescricao(categ?.descricao ?? "");
    } catch (error) {
      console.error("Erro ao trazer", error);
    }
  }

  useEffect(() => {
    console.log("id" + id);
    buscarCategoria(id);
  }, [id]);

  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/iconeContaAdministradora.png")}
        title="Atualizar "
        description="Gerencie suas categorias"
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
        <View
          style={{
            width: "90%",
            alignItems: "flex-start",
          }}
        >
          <Text>Nome</Text>
          <Input
            image={require("../../assets/IconRestaurante.png")}
            placeholder={"Seu nome"}
            value={nome}
            onChangeText={setNome}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
          <Text>descricao</Text>
          <Input
            image={require("../../assets/iconEmail.png")}
            placeholder={"seu-descricao@exemplo.com"}
            value={descricao}
            onChangeText={setDescricao}
            secureTextEntry={false}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
        </View>

        <Buton
          onPress={() => console.log("update")}
          styleButton={styles.buttonEntrar}
        >
          <Text style={styles.textButton}>Atualizar</Text>
        </Buton>
      </ScrollView>
    </View>
  );
}
