import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import { Picker } from "@react-native-picker/picker";
import { useUserContext } from "../../contexts/UserContext";
import { listarCategoriasService } from "../../services/CategoriaService";
import { criarProduto } from "../../services/ProdutosServices";
export default function CriarProduto({ navigation }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [senha, setSenha] = useState("");
  const [categoria, setCategoria] = useState("");

  const { userData, setUserData } = useUserContext();
  const [categorias, setCategorias] = useState([]);

  async function createProduto() {
    try {
      const produtoDataInsert = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        categoriaId: categoria,
        idRestaurante: userData.idRestaurante,
      };

      console.log("Tipo de usuário: Se", preco);

      const user = await criarProduto(
        produtoDataInsert,
        userData.idRestaurante,
      );
      console.log("Cadastro completo realizado!");
    } catch (error) {
      console.error("Erro no cadastro completo:", error);
      throw error;
    }
  }

  useEffect(() => {
    if (!userData?.idRestaurante) {
      return;
    }

    const unsubscribe = listarCategoriasService(
      userData.idRestaurante,
      (data) => {
        setCategorias(data);
        if (data.length > 0) {
          setCategoria(data[0].id);
        }
      },
    );

    return () => {
      unsubscribe?.();
    };
  }, [userData?.idRestaurante]);
  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/iconeContaAdministradora.png")}
        title="Criar produtos "
        description="Gerencie seus produtos"
        containerStyle={styles.introContainer}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        imageStyle={styles.logo}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.cardsContainer}
      >
        <View
          style={{
            width: "90%",
            alignItems: "flex-start",
          }}
        >
          <Text>Nome</Text>
          <Input
            image={require("../../assets/IconRestaurante.png")}
            placeholder={"Nome do produto"}
            value={nome}
            onChangeText={setNome}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
          <Text>descricao</Text>
          <Input
            image={require("../../assets/iconEmail.png")}
            placeholder={"descricao"}
            value={descricao}
            onChangeText={setDescricao}
            secureTextEntry={false}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />

          <Text>Categoria</Text>
          <Picker
            selectedValue={categoria}
            onValueChange={(value) => setCategoria(value)}
            style={styles.picker}
          >
            {categorias.map((categoria) => {
              return (
                <Picker.Item
                  key={categoria.id}
                  label={categoria.nome}
                  value={categoria.id}
                />
              );
            })}
          </Picker>
          <Text>preco</Text>
          <Input
            image={require("../../assets/iconPassword.png")}
            placeholder={" Digite preco"}
            value={preco}
            onChangeText={setPreco}
            secureTextEntry={false}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          >
            <TouchableOpacity>
              <Image
                source={require("../../assets/eye.png")}
                style={styles.imageInput}
              />
            </TouchableOpacity>
          </Input>
        </View>

        <Buton onPress={createProduto} styleButton={styles.buttonEntrar}>
          <Text style={styles.textButton}>Criar</Text>
        </Buton>
      </ScrollView>
    </View>
  );
}
