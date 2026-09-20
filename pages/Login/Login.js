import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { styles } from "./style";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import {
  buscarUsuarioService,
  loginService,
} from "../../services/UsuarioService";
import { useUserContext } from "../../contexts/UserContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useUserContext();

  async function login() {
    try {
      const user = await loginService(email, password);
      const token = await user.getIdToken();

      console.log("meu token " + token);
      const dadosUsuario = await buscarUsuarioService(user.uid);

      if (!dadosUsuario) {
        throw new Error("Dados do usuário não encontrados.");
      }
      setUserData({
        email: dadosUsuario.email,
        idRestaurante: dadosUsuario.idRestaurante,
        nomeCompleto: dadosUsuario.nomeCompleto,
        tipoUsuario: dadosUsuario.tipoUsuario,
        token: token,
      });
      navigation.navigate("SystemNavigator");
    } catch (error) {
      console.error("Erro ao criar Authentication:", error);
      throw error;
    }
  }

  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/login.jpg")}
        title="Acesse sua conta "
        description="Digite seu e-mail e sua senha paracontinuar"
        containerStyle={styles.introContainer}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        imageStyle={styles.logo}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.cardsContainer}>
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

        <Input
          image={require("../../assets/iconPassword.png")}
          placeholder={" Digite sua-senha"}
          value={password}
          onChangeText={setPassword}
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

        <View
          style={{
            width: "90%",
            alignContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ color: "#F97316", fontWeight: "bold" }}>
            Esqueceu Sua senha?{" "}
          </Text>
        </View>

        <Buton onPress={login} styleButton={styles.buttonEntrar}>
          <Text style={styles.textButton}>Entrar</Text>
        </Buton>

        <Buton
          onPress={() => navigation.goBack()}
          styleButton={styles.buttonVoltar}
        >
          <Text style={styles.textVoltar}>Voltar</Text>
        </Buton>
      </View>
    </View>
  );
}
