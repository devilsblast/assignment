import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [dataa, setDataa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setDataa(jsonData);
        setIsLoading(false);
        
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { dataa, isLoading, error };
};

export default useFetch;
