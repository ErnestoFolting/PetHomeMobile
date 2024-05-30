import { useState } from "react";
import axios from "axios";

const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e) {
      const errData = e?.response?.data;
      if (errData?.title) {
        setError(errData?.title);
      } else {
        setError(errData);
      }
      if (axios.isAxiosError(e) && errData == '') setError("Axios Error")
      throw e;
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};

export default useFetching;