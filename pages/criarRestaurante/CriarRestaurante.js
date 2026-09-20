import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import { useCadastroRestaurante } from "../../contexts/CadastroRestauranteContext";
import { criarAutenticacaoService } from "../../services/criarAutenticacaoService";
import cadastrarRestaurante from "../../services/RestauranteService";
import { criarUsuario } from "../../services/UsuarioService";

export default function CriarRestaurante({ navigation }) {
  const { cadastroRestaurante, setCadastroRestaurante } =
    useCadastroRestaurante();

  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/IconRestaurante.png")}
        title="Criar restaurante "
        description="Preencha as informações do seu restaurante para começar."
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
          <Text>Nome do restaurante</Text>
          <Input
            image={require("../../assets/IconRestaurante.png")}
            placeholder={"Ex: Cantina Toscana"}
            value={cadastroRestaurante.nomeRestaurante}
            onChangeText={(text) =>
              setCadastroRestaurante((prev) => ({
                ...prev,
                nomeRestaurante: text,
              }))
            }
            secureTextEntry={false}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
          <Text style={{}}>Endereco</Text>
          <Input
            image={require("../../assets/localizacao.png")}
            placeholder={"Rua, número, bairro e cidade"}
            value={cadastroRestaurante.endereco}
            onChangeText={(text) =>
              setCadastroRestaurante((prev) => ({
                ...prev,
                endereco: text,
              }))
            }
            secureTextEntry={false}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />

          <Text>Telefone</Text>
          <Input
            image={require("../../assets/telefone.png")}
            placeholder={"(11) 99999-9999"}
            value={cadastroRestaurante.telefone}
            onChangeText={(text) =>
              setCadastroRestaurante((prev) => ({
                ...prev,
                telefone: text,
              }))
            }
            secureTextEntry={false}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
        </View>

        <Buton
          onPress={() => navigation.navigate("CriarAdministrador")}
          //onPress={() => console.log(cadastroRestaurante)}
          styleButton={styles.buttonEntrar}
        >
          <Text style={styles.textButton}>Próximo</Text>
        </Buton>
      </View>
    </View>
  );
}
