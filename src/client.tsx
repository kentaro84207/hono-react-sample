import { createRoot } from "react-dom/client";
import { useState } from "react";

function App() {
  return (
    <>
      <h1>Hello, Hono</h1>
      <h2>Example of useState()</h2>
      <Counter />
      <h2>Example of API fetch()</h2>
      <ClockButton />
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

function ClockButton() {
  const [response, setResponse] = useState<string | null>(null);

  const handleClick = async () => {
    const reponse = await fetch("/api/clock");
    const data = await reponse.json();
    const headers = Array.from(reponse.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
    const fullResponse = {
      url: reponse.url,
      status: reponse.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <div>
      <button onClick={handleClick}>Get server time</button>
      {response && <pre>{response}</pre>}
    </div>
  )
}

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);
root.render(<App />);
