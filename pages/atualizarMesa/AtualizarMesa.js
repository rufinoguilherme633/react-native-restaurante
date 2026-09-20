import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { use, useEffect, useState } from "react";
import { styles } from "./styles";
import IntroContent from "../../componets/IntroContent/IntroContent";
import Input from "../../componets/Input/Input";
import Buton from "../../componets/Button/Buton";
import { buscarCategoriaService } from "../../services/CategoriaService";
import {
  atualizarMesa,
  buscarMesaService,
  gerarCódigoMesa,
} from "../../services/MesaService";
import Card from "../../componets/Card/Card";

export default function AtualizarMesa({ navigation, route }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const [codigo, setCodigo] = useState("");
  const { id } = route.params;

  async function buscarMesa(id) {
    try {
      const categ = await buscarMesaService(id);

      setNome(categ?.nome ?? "");
      setDescricao(categ?.descricao ?? "");
      setCodigo(categ.codigo ?? "");
    } catch (error) {
      console.error("Erro ao trazer", error);
    }
  }

  useEffect(() => {
    console.log("id" + id);
    buscarMesa(id);
  }, [id]);

  return (
    <View style={styles.container}>
      <IntroContent
        image={require("../../assets/iconeContaAdministradora.png")}
        title={nome}
        description="Gerencie suas categorias"
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
            placeholder={"Seu nome"}
            value={nome}
            onChangeText={setNome}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />
          <Text>descricao</Text>
          <Input
            image={require("../../assets/iconEmail.png")}
            placeholder={"seu-descricao@exemplo.com"}
            value={descricao}
            onChangeText={setDescricao}
            secureTextEntry={false}
            containerInput={styles.containerInput}
            inputStyle={styles.input}
            imageStyle={styles.imageInput}
          />

          <Card
            onPress={() => navigation.navigate("Auth")}
            image={require("../../assets/perfil.png")}
            title={"Código da mesa"}
            description={codigo}
            containerStyle={styles.cardContainer}
            textContainerStyle={styles.textContainerStyleCard}
            titleStyle={styles.titleCard}
            descriptionStyle={styles.descriptionCard}
            imageStyle={styles.logoCard}
            content={null}
            secondaryContent={
              <Buton
                onPress={async () => {
                  let c = await gerarCódigoMesa();
                  setCodigo(c);
                }}
                styleButton={styles.buttonGerarCodigo}
              >
                <Image
                  style={styles.iconRelaod}
                  source={require("../../assets/iconReload.png")}
                ></Image>
                <Text style={styles.textGerarCodigo}>Gerar novo codigo</Text>
              </Buton>
            }
          />
        </View>

        <Buton
          onPress={async () =>
            await atualizarMesa({ uuid: id, nome, descricao, codigo })
          }
          styleButton={styles.buttonEntrar}
        >
          <Text style={styles.textButton}>Atualizar</Text>
        </Buton>
      </ScrollView>
    </View>
  );
}
