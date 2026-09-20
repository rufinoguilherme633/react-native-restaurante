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

export async function criarMesa(mesa, restauranteId) {
  try {
    await addDoc(collection(db, "mesas"), {
      nome: mesa.nome,
      descricao: mesa.descricao,
      ativo: true,
      idRestaurante: restauranteId,
      codigo: null,
      dataCriacao: serverTimestamp(),
      dataAtualizacao: serverTimestamp(),
    });

    console.log("mesa criaddo com sucesso");
  } catch (error) {
    console.error("Erro ao criar mesa:", error);
    throw error;
  }
}

export async function buscarMesaService(uuid) {
  try {
    const mesasRef = doc(db, "mesas", uuid);

    const resultado = await getDoc(mesasRef);
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

export function listarMesaService(idRestaurante, onMesaChange) {
  try {
    const mesasRef = collection(db, "mesas");

    const consulta = query(
      mesasRef,
      where("idRestaurante", "==", idRestaurante),
    );

    const unsubscribe = onSnapshot(
      consulta,
      (resultado) => {
        const mesas = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));
        onMesaChange(mesas);
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

export async function deletarMesaService(uuid) {
  try {
    const mesasRef = doc(db, "mesas", uuid);

    const resultado = await deleteDoc(mesasRef);
    console.log("deletado com sucesso");
  } catch (error) {}
}

export async function gerarCódigoMesa() {
  try {
    const mesasRef = collection(db, "mesas");

    const consulta = query(mesasRef, orderBy("codigo", "desc"), limit(1));

    const mesas = await getDocs(consulta);

    if (mesas.empty) {
      return 100;
    }
    const maiorCodigo = mesas.docs[0].data().codigo;
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
    const mesasRef = doc(db, "mesas", uuid);

    const mesa = await buscarMesaService(uuid);

    if (!mesa) {
      return null;
    }

    const resultas = await updateDoc(mesasRef, {
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
    const mesaRef = collection(db, "mesas");
    const codigoNumero = Number(codigo);

    const consulta = query(mesaRef, where("codigo", "==", codigoNumero));

    const results = await getDocs(consulta);
    if (results.empty) {
      return null;
    }
    const documento = results.docs[0];

    return {
      id: documento.id,
      ...documento.data(),
    };
  } catch (error) {
    console.error("Erro ao consultar o banco:", error);
    throw error;
  }
}
