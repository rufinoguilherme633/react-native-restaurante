import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

export default function Button({ children, onPress, styleButton }) {
  return (
    <TouchableOpacity onPress={onPress} style={styleButton}>
      {children && children}
    </TouchableOpacity>
  );
}
