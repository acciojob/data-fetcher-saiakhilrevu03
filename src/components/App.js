import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Optional: for loading state
  const [error, setError] = useState(null);     // Optional: for error handling

  useEffect(() => {
    let isMounted = true; // Avoids setting state if the component is unmounted
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false; // Clean-up flag in case the component unmounts
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <pre>
      {data ? JSON.stringify(data, null, 2) : 'No data found.'}
    </pre>
  );
}

export default App;
