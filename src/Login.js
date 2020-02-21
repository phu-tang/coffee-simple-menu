import React, { useState } from "react";
import { host } from "./constant";

export default ({ updateToken }) => {
  const [username, updateUsername] = useState(null);
  const [password, updatePassword] = useState(null);
  const login = async () => {
    const response = await fetch(`${host}/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    updateToken(data.tokenData);
    return data;
  };
  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={e => {
          login()
            .then(data => {
              console.log(data);
            })
            .catch(e => console.log(e));
          e.preventDefault();
        }}
      >
        <input
          type="text"
          id="username"
          name="username"
          onChange={event => updateUsername(event.target.value)}
          value={username}
        />
        <br />
        <input
          type="password"
          id="password"
          name="password"
          onChange={event => updatePassword(event.target.value)}
          value={password}
        />
        <br />
        <button type={"submit"}>Login</button>
      </form>
    </div>
  );
};
