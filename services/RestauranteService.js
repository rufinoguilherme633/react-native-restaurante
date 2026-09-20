import { db } from "../config/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
export default async function cadastrarRestaurante(restaurante) {
  try {
    const restauranteRef = await addDoc(collection(db, "restaurantes"), {
      nome: restaurante.nomeRestaurante,
      endereco: restaurante.endereco,
      telefone: restaurante.telefone,
    });

    console.log("criado com sucesso");
    console.log("ID do restaurante:", restauranteRef.id);

    return restauranteRef;
  } catch (error) {
    console.error("Erro ao criar restaurante:", error);
    throw error;
  }
}
