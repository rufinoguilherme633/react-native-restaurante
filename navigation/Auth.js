import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "../contexts/UserContext";
import Usuarios from "../pages/usuarios/Usuarios";
import Login from "../pages/Login/Login";
import SystemNavigator from "./SystemNavigator";
import CriarUsuario from "../pages/criarUsuario/CriarUsuario";
import Atualizar from "../pages/atualizar/Atualizar";
import CriarCategoria from "../pages/criarCategoria/CriarCategoria";
import AtualizarCategoria from "../pages/atualizarCategoria/AtualizarCategoria";
import CriarProduto from "../pages/criarProduto/CriarProduto";
import CriarMesa from "../pages/criarMesa/CriarMesa";
import AtualizarMesa from "../pages/atualizarMesa/AtualizarMesa";
import ModoMesa from "../pages/modoMesa/ModoMesa";
import DetalhesDoPedidRestauranteo from "../pages/detalhesDoPedido/DetalhesDoPedido";
import DetalhesDoPedido from "../pages/detalhesDoPedido/DetalhesDoPedido";

const PilhaNavehacao = createNativeStackNavigator();
export default function Auth() {
  return (
    <UserProvider>
      <PilhaNavehacao.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <PilhaNavehacao.Screen name="Login" component={Login} />

        <PilhaNavehacao.Screen name="CriarUsuario" component={CriarUsuario} />
        <PilhaNavehacao.Screen name="Atualizar" component={Atualizar} />
        <PilhaNavehacao.Screen
          name="AtualizarCategoria"
          component={AtualizarCategoria}
        />
        <PilhaNavehacao.Screen
          name="CriarCategoria"
          component={CriarCategoria}
        />
        <PilhaNavehacao.Screen name="CriarProduto" component={CriarProduto} />

        <PilhaNavehacao.Screen name="AtualizarMesa" component={AtualizarMesa} />

        <PilhaNavehacao.Screen name="CriarMesa" component={CriarMesa} />
        <PilhaNavehacao.Screen
          name="DetalhesDoPedido"
          component={DetalhesDoPedido}
        />

        <PilhaNavehacao.Screen
          name="SystemNavigator"
          component={SystemNavigator}
        />
      </PilhaNavehacao.Navigator>
    </UserProvider>
  );
}
