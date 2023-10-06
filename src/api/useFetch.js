import { useEffect, useState } from "react";
import fetchData from "./fetchData";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    fetchData(url)
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          setData(res);
        }, 0);
      })
      .catch((err) => {
        setError("something went wrong");
      });
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
