import { createContext, useContext, useState } from "react";

export const CadastroRestauranteContext = createContext();

export function CadastroRestauranteProvider({ children }) {
  const [cadastroRestaurante, setCadastroRestaurante] = useState({
    nomeRestaurante: "",
    endereco: "",
    telefone: "",
    nomeCompleto: "",
    email: "",
    senha: "",
  });

  return (
    <CadastroRestauranteContext.Provider
      value={{
        cadastroRestaurante,
        setCadastroRestaurante,
      }}
    >
      {children}
    </CadastroRestauranteContext.Provider>
  );
}

export function useCadastroRestaurante() {
  return useContext(CadastroRestauranteContext);
}
