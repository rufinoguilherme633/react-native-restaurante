import { View, Text, Image } from "react-native";

import { styles } from "./styles";
import Card from "../../componets/Card/Card";
import IntroContent from "../../componets/IntroContent/IntroContent";
export default function SelecionarModoLogin({ navigation }) {
  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/login.jpg")}
        title="Como deseja entrar? "
        description="Escolha uma forma de acesso para continuar usando o  app"
        containerStyle={styles.introContainer}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        imageStyle={styles.logo}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.cardsContainer}>
        <Card
          onPress={() => navigation.navigate("Auth")}
          image={require("../../assets/perfil.png")}
          title={"Entrar com login"}
          description={"use seu login e senha para acessar sua conta"}
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
          onPress={() => navigation.navigate("ModoMesa")}
          image={require("../../assets/perfil.png")}
          title={"Modo mesa"}
          description={"Use o app para ver o cardapio do restaurante"}
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
