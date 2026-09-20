import { View, Button, Text, Image } from "react-native";

import { styles } from "./styles";
import IntroContent from "../../componets/IntroContent/IntroContent";

export default function BoasVindas({ navigation }) {
  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/logo.png")}
        title={"Bem-vindo ao seu restaurante"}
        description={
          "Uma maneira simples de gerenciar seus negócios, e fazer pedidos"
        }
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        imageStyle={styles.logo}
        showButton={false}
      />
      <Button
        title="Continuar"
        onPress={() => navigation.navigate("TelaEscolhaAcao")}
      ></Button>
    </View>
  );
}
