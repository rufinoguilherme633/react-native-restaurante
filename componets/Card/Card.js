import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function Card({
  onPress,
  image,
  title,
  description,
  containerStyle,
  textContainerStyle,
  titleStyle,
  descriptionStyle,
  imageStyle,
  content,
  secondaryContent,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <Image source={image} style={[styles.logo, imageStyle]} />
      <View style={[styles.textContainer, textContainerStyle]}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
        {content && content}
      </View>
      {secondaryContent && secondaryContent}
    </TouchableOpacity>
  );
}
