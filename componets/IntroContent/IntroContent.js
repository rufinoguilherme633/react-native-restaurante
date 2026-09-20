import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import Button from "../Button/Buton";

export default function IntroContent({
  image,
  title,
  description,
  containerStyle,
  titleStyle,
  descriptionStyle,
  imageStyle,
  showButton = true,
  onBack,
}) {
  return (
    <View style={styles.header}>
      {showButton && (
        <View
          style={{
            height: 50,
            justifyContent: "center",
            padding: 15,
          }}
        >
          <Button onPress={onBack}>
            <Image
              style={{ width: 10, height: 10, marginLeft: 10 }}
              source={require("../../assets/seta_esquerda.png")}
            ></Image>
          </Button>
        </View>
      )}

      <View style={[styles.topContent, containerStyle]}>
        <Image source={image} style={[styles.logo, imageStyle]} />
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
      </View>
    </View>
  );
}
