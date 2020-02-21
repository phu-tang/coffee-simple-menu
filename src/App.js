import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import CSVReader from "./csvReader";

const App = () => {
  const [token, updateToken] = useState(null);
  if (!token) {
    return <Login updateToken={updateToken} />;
  }
  return (
    <div>
      <CSVReader token={token} />
    </div>
  );
};

export default App;
