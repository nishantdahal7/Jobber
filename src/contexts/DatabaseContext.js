import { getFirestore } from "firebase/firestore";
import React, { useContext } from "react";

const DatabaseContext = React.createContext();

function DatabaseProvider({ children }) {
  const db = getFirestore();
  const value = {
    db,
  };
  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

function useDatabase() {
  return useContext(DatabaseContext);
}

export { DatabaseProvider, useDatabase };
