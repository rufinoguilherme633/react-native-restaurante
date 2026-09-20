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
export default function CriarUsuario({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("Administrador");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState();

  const { userData, setUserData } = useUserContext();
  async function createUser() {
    try {
      const userAuth = await criarAutenticacaoService(email, senha);

      const uuid = userAuth.uid;
      const userDataInsert = {
        nomeCompleto: nomeCompleto,
        email: email,
      };

      console.log("Tipo de usuário: Se", tipoUsuario);

      const user = await criarUsuario(
        userDataInsert,
        uuid,
        userData.idRestaurante,
        tipoUsuario,
      );
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
        title="Criar Conta "
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
          <Text>Senha</Text>
          <Input
            image={require("../../assets/iconPassword.png")}
            placeholder={" Digite sua-senha"}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          >
            <TouchableOpacity>
              <Image
                source={require("../../assets/eye.png")}
                style={styles.imageInput}
              />
            </TouchableOpacity>
          </Input>

          <Text>Confime senha </Text>
          <Input
            image={require("../../assets/iconPassword.png")}
            placeholder={" Digite sua-senha"}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={true}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          >
            <TouchableOpacity>
              <Image
                source={require("../../assets/eye.png")}
                style={styles.imageInput}
              />
            </TouchableOpacity>
          </Input>
        </View>

        <Buton onPress={createUser} styleButton={styles.buttonEntrar}>
          <Text style={styles.textButton}>Criar</Text>
        </Buton>
      </ScrollView>
    </View>
  );
}
