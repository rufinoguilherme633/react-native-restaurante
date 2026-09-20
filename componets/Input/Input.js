import { View, Text, Image, TextInput } from "react-native";

export default function Input({
  image,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  containerInput,
  inputStyle,
  imageStyle,
  children,
}) {
  return (
    <View style={containerInput}>
      <Image source={image} style={imageStyle} />
      <TextInput
        style={[inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid="transparent"
      />
      {children && children}
    </View>
  );
}
