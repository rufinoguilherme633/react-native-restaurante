import { auth, db } from "../config/firebaseConfig";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  deleteDoc,
  onSnapshot,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { buscarMesaService } from "./MesaService";

export async function criarPedido(pedido, restauranteId) {
  try {
    console.log(pedido);
    console.log(restauranteId);

    await addDoc(collection(db, "pedidos"), {
      produtos: pedido.produtos,
      sessaoUuid: pedido.sessaoUuid,
      usuario: pedido.uudiusuario,
      idRestaurante: restauranteId,
      status_pedido: true,
      dataCriacao: serverTimestamp(),
      dataAtualizacao: serverTimestamp(),
    });

    console.log("Pedido criaddo com sucesso");
  } catch (error) {
    console.error("Erro ao criar Pedido:", error);
    throw error;
  }
}

export async function buscarPedidoService(uuid) {
  try {
    const PedidosRef = doc(db, "pedidos", uuid);

    const resultado = await getDoc(PedidosRef);
    if (!resultado.exists()) {
      return null;
    }

    return {
      id: resultado.id,
      ...resultado.data(),
    };
  } catch (error) {
    console.error("Erro ao criar Authentication:", error);
    throw error;
  }
}

export function listarPedidosService(idRestaurante, onPedidosChange) {
  try {
    const PedidosRef = collection(db, "pedidos");

    const consulta = query(
      PedidosRef,
      where("idRestaurante", "==", idRestaurante),
      where("status_pedido", "==", true),
    );

    const unsubscribe = onSnapshot(
      consulta,
      async (resultado) => {
        const pedidos = await Promise.all(
          resultado.docs.map(async (document) => {
            const pedido = {
              id: document.id,
              ...document.data(),
            };
            let mesa = null;
            if (pedido.sessaoUuid?.mesa) {
              mesa = await buscarMesaService(pedido.sessaoUuid.mesa);
            }
            return {
              ...pedido,
              mesa,
            };
          }),
        );
        onPedidosChange(pedidos);
      },
      (error) => {
        console.error("Erro ao escutar usuários:", error);
      },
    );
    return unsubscribe;
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    throw error;
  }
}

export async function deletarPedidoService(uuid) {
  try {
    const PedidosRef = doc(db, "pedidos", uuid);

    const resultado = await deleteDoc(PedidosRef);
    console.log("deletado com sucesso");
  } catch (error) {}
}

export async function fecharPedidoService(pedidoId) {
  try {
    if (!pedidoId) {
      throw new Error("ID do pedido não informado.");
    }

    const pedidoRef = doc(db, "pedidos", pedidoId);

    await updateDoc(pedidoRef, {
      status_pedido: false,
      dataAtualizacao: serverTimestamp(),
    });

    console.log("Pedido fechado:", pedidoId);

    return {
      sucesso: true,
      id: pedidoId,
    };
  } catch (error) {
    console.error("Erro ao fechar pedido:", error);
    throw error;
  }
}
