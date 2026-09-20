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
} from "firebase/firestore";

import { signInWithdescricaoAndPassword } from "firebase/auth";

export async function criarProduto(produto, restauranteId) {
  try {
    await addDoc(collection(db, "produtos"), {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      categoriaId: produto.categoriaId,
      idRestaurante: restauranteId,
      dataCriacao: serverTimestamp(),
      dataAtualizacao: serverTimestamp(),
      ativo: true,
    });

    console.log("produto criaddo com sucesso");
  } catch (error) {
    console.error("Erro ao criar Authentication:", error);
    throw error;
  }
}

export async function buscarProdutoService(uuid) {
  try {
    const produtosRef = doc(db, "produtos", uuid);

    const resultado = await getDoc(produtosRef);
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

export function listarProdutosService(idRestaurante, onprodutosChange) {
  try {
    const produtosRef = collection(db, "produtos");

    const consulta = query(
      produtosRef,
      where("idRestaurante", "==", idRestaurante),
    );

    const unsubscribe = onSnapshot(
      consulta,
      (resultado) => {
        const produtos = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));
        onprodutosChange(produtos);
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

export async function listarProdutosPorCategoriaService(
  idRestaurante,
  idCategoria,

  onprodutosChange,
) {
  try {
    const produtosRef = collection(db, "produtos");

    const consulta = query(
      produtosRef,
      where("idRestaurante", "==", idRestaurante),
      where("categoriaId", "==", idCategoria),
    );

    const unsubscribe = onSnapshot(
      consulta,
      (resultado) => {
        const produtos = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));
        onprodutosChange(produtos);
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
export async function deletarProdutoService(uuid) {
  try {
    const produtosRef = doc(db, "produtos", uuid);

    const resultado = await deleteDoc(produtosRef);
    console.log("deletado com sucesso");
  } catch (error) {}
}
