import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import ConfirmarDadosCadastro from "../pages/confirmarDadosCadastro/ConfirmarDadosCadastro";
import CriarAdministrador from "../pages/criarAdministrador/CriarAdministrador";
import CriarRestaurante from "../pages/criarRestaurante/CriarRestaurante";
import { CadastroRestauranteProvider } from "../contexts/CadastroRestauranteContext";

const PilhaNavehacao = createNativeStackNavigator();
export default function CadastroRestauranteStack() {
  return (
    <CadastroRestauranteProvider>
      <PilhaNavehacao.Navigator
        initialRouteName="CriarRestaurante"
        screenOptions={{ headerShown: false }}
      >
        <PilhaNavehacao.Screen
          name="CriarRestaurante"
          component={CriarRestaurante}
        />
        <PilhaNavehacao.Screen
          name="CriarAdministrador"
          component={CriarAdministrador}
        />
        <PilhaNavehacao.Screen
          name="ConfirmarDadosCadastro"
          component={ConfirmarDadosCadastro}
        />
      </PilhaNavehacao.Navigator>
    </CadastroRestauranteProvider>
  );
}
