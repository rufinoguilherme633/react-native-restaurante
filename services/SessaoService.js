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
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function criarSessaoService(uuidMesa, restauranteId) {
  try {
    const dadosSessao = {
      ativo: true,
      mesa: uuidMesa,
      idRestaurante: restauranteId,
      formaPagamento: null,
      dataCriacao: serverTimestamp(),
      dataAtualizacao: serverTimestamp(),
    };
    const insert = await addDoc(collection(db, "sessao"), dadosSessao);

    const resultado = {
      id: insert.id,
      ...dadosSessao,
    };
    return resultado;
  } catch (error) {
    console.error("Erro ao criar sessao:", error);
    throw error;
  }
}

export function buscarSessao(uuidSessao, idRestaurante, onMesaChange) {
  try {
    const sessaoRef = doc(db, "sessao", uuidSessao);

    const unsubscribe = onSnapshot(
      sessaoRef,
      (resultado) => {
        if (!resultado.exists()) {
          console.log("Sessão não encontrada:", uuidSessao);
          onMesaChange([]);
          return;
        }

        const sessao = {
          id: resultado.id,
          ...resultado.data(),
        };

        console.log("SESSÃO ENCONTRADA:", sessao);

        onMesaChange([sessao]);
      },
      (error) => {
        console.error("Erro ao escutar sessão:", error);
      },
    );

    return unsubscribe;
  } catch (error) {
    console.error("Erro ao buscar sessão:", error);
    throw error;
  }
}

export async function buscarSessaoService(
  uuidMesa,
  idRestaurante,
  onMesaChange,
) {
  try {
    const sessaoRef = collection(db, "sessao");

    const consulta = query(
      sessaoRef,
      where("idRestaurante", "==", idRestaurante),
      where("ativo", "==", true),
      where("mesa", "==", uuidMesa),
    );

    const unsubscribe = onSnapshot(
      consulta,
      (resultado) => {
        const sessao = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));
        onMesaChange(sessao);
      },
      (error) => {
        console.error("Erro ao escutar mesa:", error);
      },
    );

    return unsubscribe;
  } catch (error) {
    console.error("Erro ao criar Authentication:", error);
    throw error;
  }
}

export function listarsessaoervice(idRestaurante, onMesaChange) {
  try {
    const sessaoRef = collection(db, "sessao");

    const consulta = query(
      sessaoRef,
      where("idRestaurante", "==", idRestaurante),
    );

    const unsubscribe = onSnapshot(
      consulta,
      (resultado) => {
        const sessao = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));
        onMesaChange(sessao);
      },
      (error) => {
        console.error("Erro ao escutar usuários:", error);
      },
    );
    return unsubscribe;
  } catch (error) {
    console.error("Erro ao criar Authentication:", error);
    throw error;
  }
}

export async function deletarsessaoervice(uuid) {
  try {
    const sessaoRef = doc(db, "sessao", uuid);

    const resultado = await deleteDoc(sessaoRef);
    console.log("deletado com sucesso");
  } catch (error) {}
}

export async function gerarCódigoMesa() {
  try {
    const sessaoRef = collection(db, "sessao");

    const consulta = query(sessaoRef, orderBy("codigo", "desc"), limit(1));

    const sessao = await getDocs(consulta);

    if (sessao.empty) {
      return 100;
    }
    const maiorCodigo = sessao.docs[0].data().codigo;
    return Number(maiorCodigo) + 1;
  } catch (error) {
    console.error("Erro ao gerar código da mesa:", error);
    throw error;
  }
}

export async function atualizarMesa({ uuid, nome, descricao, codigo }) {
  try {
    console.log("========== ATUALIZAR MESA ==========");
    console.log("db:", db);
    console.log("uuid:", uuid);
    console.log("nome:", nome);
    console.log("descricao:", descricao);
    console.log("codigo:", codigo);
    console.log("====================================");
    const sessaoRef = doc(db, "sessao", uuid);

    const mesa = await buscarSessaoService(uuid);

    if (!mesa) {
      return null;
    }

    const resultas = await updateDoc(sessaoRef, {
      nome,
      descricao,
      codigo,
    });

    return { mensagem: "Atualizado com sucesso", id: uuid };
  } catch (error) {
    console.error("Erro ao atualizar a mesa:", error);
    throw error;
  }
}

export async function persistirDadosNoAparelho(codigo) {
  try {
    await AsyncStorage.setItem("codigo_cadastro", codigo);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function verificarPersistenciaDadoAparelho() {
  const aparelhoCodigo = await AsyncStorage.getItem("codigo_cadastro");
  if (!aparelhoCodigo) {
    return "";
  }

  return aparelhoCodigo;
}

export async function verificarCodigoNoBanco(codigo) {
  try {
    const mesaRef = collection(db, "sessao");
    const codigoNumero = Number(codigo);

    const consulta = query(mesaRef, where("codigo", "==", codigoNumero));

    const results = await getDocs(consulta);
    if (results.empty) {
      return null;
    }
    return results.docs[0].data();
  } catch (error) {
    console.error("Erro ao consultar o banco:", error);
    throw error;
  }
}

export function listarPedidosDaSessao(
  uuidSessao,
  idRestaurante,
  onPedidosChange,
) {
  try {
    const pedidosRef = collection(db, "pedidos");

    const consulta = query(
      pedidosRef,
      where("sessaoUuid.id", "==", uuidSessao),
      where("idRestaurante", "==", idRestaurante),
      where("status_pedido", "==", true),
    );

    const unsubscribe = onSnapshot(
      consulta,
      (resultado) => {
        const pedidos = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));

        console.log("================================");
        console.log("UUID DA SESSÃO:", uuidSessao);
        console.log("PEDIDOS ENCONTRADOS:", pedidos);
        console.log("================================");

        onPedidosChange(pedidos);
      },
      (error) => {
        console.error("ERRO AO BUSCAR PEDIDOS:", error);
      },
    );

    return unsubscribe;
  } catch (error) {
    console.error("Erro ao listar pedidos da sessão:", error);
    throw error;
  }
}
