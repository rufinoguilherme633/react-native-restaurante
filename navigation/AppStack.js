import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BoasVIndas from "../pages/BoasVindas/BoasVindas";
import TelaEscolhaAcao from "../pages/TelaEscolhaAcao/TelaEscolhaAcao";
import SelecionarModoLogin from "../pages/SelecionarModoLogin/SelecionarModoLogin";

import CadastroRestauranteStack from "./CadastroRestauranteStack";
import Auth from "./Auth";
import RegistrarModoMesa from "../pages/registrarModoMesa/RegistrarModoMesa";
import ModoMesa from "../pages/modoMesa/ModoMesa";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="BoasVindas"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BoasVindas" component={BoasVIndas} />

      <Stack.Screen name="TelaEscolhaAcao" component={TelaEscolhaAcao} />
      <Stack.Screen name="RegistrarModoMesa" component={RegistrarModoMesa} />

      <Stack.Screen
        name="SelecionarModoLogin"
        component={SelecionarModoLogin}
      />
      <Stack.Screen name="ModoMesa" component={ModoMesa} />

      <Stack.Screen name="Auth" component={Auth} />

      <Stack.Screen
        name="CadastroRestaurante"
        component={CadastroRestauranteStack}
      />
    </Stack.Navigator>
  );
}
