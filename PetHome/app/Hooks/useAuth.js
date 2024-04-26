import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const useStore = () => {
    return useContext(StoreContext);
}

export default useStore