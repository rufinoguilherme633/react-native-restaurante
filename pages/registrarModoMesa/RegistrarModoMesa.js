import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./style";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import {
  persistirDadosNoAparelho,
  verificarCodigoNoBanco,
  verificarPersistenciaDadoAparelho,
} from "../../services/MesaService";

export default function RegistrarModoMesa({ navigation }) {
  const [codigo, setCodigo] = useState("");

  const [codigoPersistido, setCodigoPersistido] = useState("");
  useEffect(() => {
    async function verificarCodigo() {
      const results = await verificarPersistenciaDadoAparelho();

      const resultado = await verificarPersistenciaDadoAparelho();
      setCodigoPersistido(resultado || "");
    }
  }, []);
  async function ativarModoMesa() {
    try {
      const mesaEncontrada = await verificarCodigoNoBanco(codigo);
      if (!mesaEncontrada) {
        console.log("codigo invalido");
        return;
      }
      const mesa = await persistirDadosNoAparelho(codigo);
      console.log("Sucess");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/login.jpg")}
        title="Modo mesa"
        description="Digite o código da mesa para ver o cardápio do restaurante."
        containerStyle={styles.introContainer}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        imageStyle={styles.logo}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.cardsContainer}>
        {codigoPersistido ? (
          <Text>Já cadastrado</Text>
        ) : (
          <>
            <Input
              image={require("../../assets/iconEmail.png")}
              placeholder={"Insira o código gerado"}
              value={codigo}
              onChangeText={setCodigo}
              secureTextEntry={false}
              containerInput={styles.containerInput}
              inputStyle={styles.input}
              imageStyle={styles.imageInput}
            />

            <Buton onPress={ativarModoMesa} styleButton={styles.buttonEntrar}>
              <Text style={styles.textButton}>Entrar</Text>
            </Buton>
          </>
        )}
      </View>
    </View>
  );
}
