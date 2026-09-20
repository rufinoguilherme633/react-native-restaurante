import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import { useCadastroRestaurante } from "../../contexts/CadastroRestauranteContext";

export default function CriarAdministrador({ navigation }) {
  const { cadastroRestaurante, setCadastroRestaurante } =
    useCadastroRestaurante();

  const [confirmarSenha, setConfirmarSenha] = useState();
  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/iconeContaAdministradora.png")}
        title="Conta do administrador "
        description="Crie sua conta de administrador para gerenciar o restaurante."
        containerStyle={styles.introContainer}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        imageStyle={styles.logo}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.cardsContainer}>
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
            value={cadastroRestaurante.nomeCompleto}
            onChangeText={(text) =>
              setCadastroRestaurante((prev) => ({
                ...prev,
                nomeCompleto: text,
              }))
            }
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
          <Text>Email</Text>
          <Input
            image={require("../../assets/iconEmail.png")}
            placeholder={"seu-email@exemplo.com"}
            value={cadastroRestaurante.email}
            onChangeText={(text) =>
              setCadastroRestaurante((prev) => ({
                ...prev,
                email: text,
              }))
            }
            secureTextEntry={false}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
          <Text>Senha</Text>
          <Input
            image={require("../../assets/iconPassword.png")}
            placeholder={" Digite sua-senha"}
            value={cadastroRestaurante.senha}
            onChangeText={(text) =>
              setCadastroRestaurante((prev) => ({
                ...prev,
                senha: text,
              }))
            }
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

        <Buton
          onPress={() => navigation.navigate("ConfirmarDadosCadastro")}
          styleButton={styles.buttonEntrar}
        >
          <Text style={styles.textButton}>Próximo</Text>
        </Buton>
      </View>
    </View>
  );
}
