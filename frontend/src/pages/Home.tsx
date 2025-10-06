import { useState } from "react";
import { redirect } from "react-router-dom";

const Home = () => {
  const [count, setCount] = useState(0);

  redirect("/login");

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          sad{" "}
        </a>
        <a href="https://react.dev" target="_blank">
          sad
        </a>
      </div>

      <h1>Vite + React APP</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Home;
