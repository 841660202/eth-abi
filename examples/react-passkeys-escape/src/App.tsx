import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const handleClick = async () => {
    if ("credentials" in navigator) {
      const challenge = Uint8Array.from([
        105, 171, 180, 181, 160, 222, 75, 198, 42, 42, 32, 31, 141, 37, 186,
        233,
      ]);
      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          userVerification: "preferred",
        },
      });

      console.log("assertion", assertion);
    } else {
      console.log("不支持");
    }
  };
  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1> */}
      <div className="card">
        <button onClick={handleClick}>escape</button>
        {/* <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
