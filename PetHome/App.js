import React, { useContext, useEffect } from "react";
import { AuthProvider } from "./app/Context/AuthContext";
import Navigator from "./app/Components/Navigator";

const App = () => {
  return (<AuthProvider>
    <Navigator></Navigator>
  </AuthProvider>
  )
}

export default App;