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
} from "firebase/firestore";

import { signInWithEmailAndPassword } from "firebase/auth";

export async function criarUsuario(usuario, uuid, restauranteId, tipoUsuario) {
  try {
    await setDoc(doc(db, "usuarios", uuid), {
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      tipoUsuario: tipoUsuario,
      idRestaurante: restauranteId,
      dataCriacao: serverTimestamp(),
      dataAtualizacao: serverTimestamp(),
    });

    console.log("usuario criaddo com sucesso");
  } catch (error) {
    console.error("Erro ao criar Authentication:", error);
    throw error;
  }
}

export async function loginService(email, senha) {
  try {
    const results = await signInWithEmailAndPassword(auth, email, senha);

    return results.user;
  } catch (error) {
    console.error("Erro ao criar Authentication:", error);
    throw error;
  }
}

export async function buscarUsuarioService(uuid) {
  try {
    const usuariosRef = doc(db, "usuarios", uuid);

    const resultado = await getDoc(usuariosRef);
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

export function listarUsuariosService(idRestaurante, onUsuariosChange) {
  try {
    const usuariosRef = collection(db, "usuarios");

    const consulta = query(
      usuariosRef,
      where("idRestaurante", "==", idRestaurante),
    );

    const unsubscribe = onSnapshot(
      consulta,
      (resultado) => {
        const usuarios = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));
        onUsuariosChange(usuarios);
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

export async function deletarUsuarioService(uuid) {
  try {
    const usuariosRef = doc(db, "usuarios", uuid);

    const resultado = await deleteDoc(usuariosRef);
    console.log("deletado com sucesso");
  } catch (error) {}
}
