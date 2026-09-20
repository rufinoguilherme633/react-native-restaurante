import { View, Text, Image } from "react-native";

import { styles } from "./styles";
import Card from "../../componets/Card/Card";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Button from "../../componets/Button/Buton";
export default function TelaEscolhaAcao({ navigation }) {
  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/logo.png")}
        title="O que deseja fazer ? "
        description="Escolha uma das opções abaixo para continuar e comece a usar o app"
        containerStyle={styles.introContainer}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        imageStyle={styles.logo}
        onBack={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.cardsContainer}>
        <Card
          onPress={() => navigation.navigate("SelecionarModoLogin")}
          image={require("../../assets/perfil.png")}
          title={"Entrar"}
          description={"Já tenho conta"}
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
        <Card
          onPress={() => navigation.navigate("CadastroRestaurante")}
          image={require("../../assets/perfil.png")}
          title={"Criar restaurante"}
          description={"Cadastre seu restaurante no app"}
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
        <Card
          onPress={() => navigation.navigate("RegistrarModoMesa")}
          image={require("../../assets/perfil.png")}
          title={"Ativar aparelho"}
          description={"Configure seu dispositivo de pedidos"}
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
    </View>
  );
}
