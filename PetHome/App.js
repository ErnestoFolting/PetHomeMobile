import React from "react";
import { StoreProvider } from "./app/Context/StoreContext";
import Navigator from "./app/Components/Navigator";

const App = () => {
  return (<StoreProvider>
    <Navigator></Navigator>
  </StoreProvider>
  )
}

export default App;