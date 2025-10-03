import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        setData(json.products || []); // store only products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || data.length === 0) return <pre>[]</pre>;

  // print exactly the products array
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default App;
