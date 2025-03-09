import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Poemas() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchPoem = async () => {
    try {
      const genAI = new GoogleGenerativeAI("TU_API_AQUI");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt =
        "Escríbeme un poema corto y melancólico sobre la vida.";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPoem(); 

    const poemIntervalId = setInterval(fetchPoem, 30000); 
    const clockIntervalId = setInterval(() => setCurrentTime(new Date()), 1000); 

    return () => {
      clearInterval(poemIntervalId); 
      clearInterval(clockIntervalId); 
    };
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {error ? <p>{error}</p> : <p>{response}</p>}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
}


