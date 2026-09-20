import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { use, useEffect, useState } from "react";
import { styles } from "./styles";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import { Picker } from "@react-native-picker/picker";
import { useUserContext } from "../../contexts/UserContext";
import { criarAutenticacaoService } from "../../services/criarAutenticacaoService";
import {
  buscarUsuarioService,
  criarUsuario,
} from "../../services/UsuarioService";
import Card from "../../componets/Card/Card";
export default function Atualizar({ navigation, route }) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("Administrador");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState();
  const { userData, setUserData } = useUserContext();
  const { id } = route.params;

  async function buscarUsuario(id) {
    try {
      const user = await buscarUsuarioService(id);

      setNomeCompleto(user?.nomeCompleto ?? "");
      setEmail(user?.email ?? "");
      setTipoUsuario(user?.tipoUsuario ?? "Comum");
    } catch (error) {
      console.error("Erro ao trazer", error);
    }
  }

  useEffect(() => {
    console.log("id" + id);
    buscarUsuario(id);
  }, [id]);

  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/iconeContaAdministradora.png")}
        title="Atualizar "
        description="Gerencie seus usuarios"
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
          <Text>Nome completo</Text>
          <Input
            image={require("../../assets/IconRestaurante.png")}
            placeholder={"Seu nome"}
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
          <Text>Email</Text>
          <Input
            image={require("../../assets/iconEmail.png")}
            placeholder={"seu-email@exemplo.com"}
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />

          <Text>Tipo usuario</Text>

          <Picker
            selectedValue={tipoUsuario}
            onValueChange={(value) => setTipoUsuario(value)}
            style={styles.picker}
          >
            <Picker.Item label="Administrador" value="Administrador" />
            <Picker.Item label="Comum" value="Comum" />
          </Picker>

          <Card
            onPress={() => navigation.navigate("SelecionarModoLogin")}
            image={require("../../assets/perfil.png")}
            title={"Alterar Senha"}
            description={"Defina uma nova senha para o usuario"}
            containerStyle={styles.cardContainer}
            textContainerStyle={styles.textContainerStyleCard}
            titleStyle={styles.titleCard}
            descriptionStyle={styles.descriptionCard}
            imageStyle={styles.logoCard}
            content={null}
            secondaryContent={
              <Image
                style={{ width: 10, height: 10 }}
                source={require("../../assets/seta_direita.png")}
              ></Image>
            }
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
