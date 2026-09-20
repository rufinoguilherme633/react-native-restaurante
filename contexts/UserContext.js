import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    email: "",
    idRestaurante: "",
    nomeCompleto: "",
    tipoUsuario: "",
    token: "",
  });

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
