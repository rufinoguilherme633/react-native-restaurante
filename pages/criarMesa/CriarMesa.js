import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import { Picker } from "@react-native-picker/picker";
import { useUserContext } from "../../contexts/UserContext";
import { criarAutenticacaoService } from "../../services/criarAutenticacaoService";
import { criarUsuario } from "../../services/UsuarioService";
import { criarCategoria } from "../../services/CategoriaService";
import { criarMesa } from "../../services/MesaService";

export default function CriarMesa({ navigation }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const { userData, setUserData } = useUserContext();
  async function createMesa() {
    try {
      const mesaDataInsert = {
        nome: nome,
        descricao: descricao,
      };

      const categoria = await criarMesa(mesaDataInsert, userData.idRestaurante);
      console.log("Cadastro completo realizado!");
    } catch (error) {
      console.error("Erro no cadastro completo:", error);
      throw error;
    }
  }
  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/iconeContaAdministradora.png")}
        title="Criar Mesas "
        description="Gerencie suas mesas "
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
            placeholder={"Nome"}
            value={nome}
            onChangeText={setNome}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
          <Text>Descricao</Text>
          <Input
            image={require("../../assets/iconEmail.png")}
            placeholder={"Descricao"}
            value={descricao}
            onChangeText={setDescricao}
            secureTextEntry={false}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
        </View>

        <Buton onPress={createMesa} styleButton={styles.buttonEntrar}>
          <Text style={styles.textButton}>Criar</Text>
        </Buton>
      </ScrollView>
    </View>
  );
}
