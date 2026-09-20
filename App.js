import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import ConfirmarDadosCadastro from "./pages/confirmarDadosCadastro/ConfirmarDadosCadastro";
import CriarAdministrador from "./pages/criarAdministrador/CriarAdministrador";
import CriarRestaurante from "./pages/criarRestaurante/CriarRestaurante";
import Login from "./pages/Login/Login";
import SelecionarModoLogin from "./pages/SelecionarModoLogin/SelecionarModoLogin";
import TelaEscolhaAcao from "./pages/TelaEscolhaAcao/TelaEscolhaAcao";
import BoasVIndas from "./pages/BoasVindas/BoasVindas";
import { CadastroRestauranteContext } from "./contexts/CadastroRestauranteContext";
import AppStack from "./navigation/AppStack";

const PilhaNavehacao = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
