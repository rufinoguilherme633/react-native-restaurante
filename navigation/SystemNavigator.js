import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "../contexts/UserContext";
import Usuarios from "../pages/usuarios/Usuarios";
import Login from "../pages/Login/Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Categoria from "../pages/Categoria/Categoria";
import Produtos from "../pages/produtos/Produtos";
import Mesa from "../pages/mesa/Mesa";
import Pedidos from "../pages/pedidos/Pedidos";

const Drawer = createDrawerNavigator();
export default function SystemNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Usuarios"
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Usuarios" component={Usuarios} />
      <Drawer.Screen name="Categoria" component={Categoria} />
      <Drawer.Screen name="Produtos" component={Produtos} />
      <Drawer.Screen name="Mesa" component={Mesa} />
      <Drawer.Screen name="Pedidos" component={Pedidos} />
    </Drawer.Navigator>
  );
}
