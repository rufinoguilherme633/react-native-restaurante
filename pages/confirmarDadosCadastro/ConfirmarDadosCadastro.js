import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import Card from "../../componets/Card/Card";
import IntroContent from "../../componets/IntroContent/IntroContent";

import Buton from "../../componets/Button/Buton";
import { useCadastroRestaurante } from "../../contexts/CadastroRestauranteContext";
import cadastrarRestaurante from "../../services/RestauranteService";
import { criarAutenticacaoService } from "../../services/criarAutenticacaoService";
import { criarUsuario } from "../../services/UsuarioService";
export default function ConfirmarDadosCadastro({ navigation }) {
  const { cadastroRestaurante, setCadastroRestaurante } =
    useCadastroRestaurante();

  async function criarRestaurante() {
    try {
      const userAuth = await criarAutenticacaoService(
        cadastroRestaurante.email,
        cadastroRestaurante.senha,
      );

      const uuid = userAuth.uid;

      const restauranteData = {
        nomeRestaurante: cadastroRestaurante.nomeRestaurante,
        endereco: cadastroRestaurante.endereco,
        telefone: cadastroRestaurante.telefone,
      };
      const restaurante = await cadastrarRestaurante(restauranteData);

      const restauranteUUid = restaurante.id;

      const userData = {
        nomeCompleto: cadastroRestaurante.nomeCompleto,
        email: cadastroRestaurante.email,
      };
      const user = await criarUsuario(
        userData,
        uuid,
        restauranteUUid,
        "Administrador",
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
        title="Tudo pronto!"
        description="Revise as informações antes de criar seu restaurante."
        containerStyle={styles.introContainer}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        imageStyle={styles.logo}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.containerResumoCadastro}
        contentContainerStyle={{
          paddingBottom: 20,
          gap: 20,
        }}
        showsVerticalScrollIndicator={true}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#EAE3DC",
            paddingBottom: 10,
          }}
        >
          <Text style={styles.titleResulmo}>Resumo do cadastro</Text>
        </View>
        <Card
          image={require("../../assets/IconRestaurante.png")}
          title={"Nome restaurante"}
          description={cadastroRestaurante.nomeRestaurante}
          containerStyle={styles.cardContainer}
          textContainerStyle={styles.textContainerStyleCard}
          titleStyle={styles.titleCard}
          descriptionStyle={styles.descriptionCard}
          imageStyle={styles.logoCard}
          content={null}
        />
        <Card
          image={require("../../assets/localizacao.png")}
          title={"Endereço"}
          description={cadastroRestaurante.endereco}
          containerStyle={styles.cardContainer}
          textContainerStyle={styles.textContainerStyleCard}
          titleStyle={styles.titleCard}
          descriptionStyle={styles.descriptionCard}
          imageStyle={styles.logoCard}
          content={null}
        />
        <Card
          image={require("../../assets/telefone.png")}
          title={"Telefone"}
          description={cadastroRestaurante.telefone}
          containerStyle={styles.cardContainer}
          textContainerStyle={styles.textContainerStyleCard}
          titleStyle={styles.titleCard}
          descriptionStyle={styles.descriptionCard}
          imageStyle={styles.logoCard}
          content={null}
        />
        <Card
          image={require("../../assets/iconEmail.png")}
          title={"E-mail do Administrador"}
          description={cadastroRestaurante.email}
          containerStyle={styles.cardContainer}
          textContainerStyle={styles.textContainerStyleCard}
          titleStyle={styles.titleCard}
          descriptionStyle={styles.descriptionCard}
          imageStyle={styles.logoCard}
          content={null}
        />
      </ScrollView>

      <Buton
        onPress={() => criarRestaurante()}
        styleButton={styles.buttonEntrar}
      >
        <Text style={styles.textButton}>Confirmar</Text>
      </Buton>

      <Buton
        onPress={() => navigation.goBack()}
        styleButton={styles.buttonVoltar}
      >
        <Text style={styles.textVoltar}>Voltar</Text>
      </Buton>
    </View>
  );
}
