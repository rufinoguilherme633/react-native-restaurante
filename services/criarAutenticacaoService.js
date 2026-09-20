import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
export async function criarAutenticacaoService(email, senha) {
  try {
    const results = await createUserWithEmailAndPassword(auth, email, senha);
    console.log("autenticacao criada");
    console.log("UID:", results.user.uid);

    return results.user;
  } catch (error) {
    console.error("Erro ao criar Authentication:", error);
    throw error;
  }
}
