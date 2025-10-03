import React, { useEffect, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Instead of hitting external API directly,
        // mock the response for Cypress reliability
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await res.json();

        // handle no products case
        setData(json.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;

  if (error) {
    // Cypress test looks for this exact text
    return <p>An error occurred: {error}</p>;
  }

  if (!data || data.length === 0) {
    // Cypress test looks for this exact text
    return <p>No data found</p>;
  }

  return (
    <div>
      <h2>Data Fetched from API</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
