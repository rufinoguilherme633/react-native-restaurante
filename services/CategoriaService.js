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

export async function criarCategoria(Categoria, restauranteId) {
  try {
    await addDoc(collection(db, "categorias"), {
      nome: Categoria.nome,
      descricao: Categoria.descricao,
      idRestaurante: restauranteId,
      ativo: true,
      dataCriacao: serverTimestamp(),
      dataAtualizacao: serverTimestamp(),
    });

    console.log("Categoria criaddo com sucesso");
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
}

export async function buscarCategoriaService(uuid) {
  try {
    const CategoriasRef = doc(db, "categorias", uuid);

    const resultado = await getDoc(CategoriasRef);
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

export function listarCategoriasService(idRestaurante, onCategoriasChange) {
  try {
    const CategoriasRef = collection(db, "categorias");

    const consulta = query(
      CategoriasRef,
      where("idRestaurante", "==", idRestaurante),
    );

    const unsubscribe = onSnapshot(
      consulta,
      (resultado) => {
        const Categorias = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));
        onCategoriasChange(Categorias);
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

export async function deletarCategoriaService(uuid) {
  try {
    const CategoriasRef = doc(db, "categorias", uuid);

    const resultado = await deleteDoc(CategoriasRef);
    console.log("deletado com sucesso");
  } catch (error) {}
}
