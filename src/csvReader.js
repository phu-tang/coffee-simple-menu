import React, { useState } from "react";
import { map, toNumber } from "lodash/fp";
import CSVReader from "react-csv-reader";
import "./style.css";
import { host } from "./constant";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

export default ({ token }) => {
  const [menuData, updateMenu] = useState([]);
  const [message, updateMessage] = useState("");
  const uploadMenu = async () => {
    const reponse = await fetch(`${host}/menu/add-menus`, {
      method: "POST",
      headers: {
        authentication: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        map(
          item => ({
            name: item.mon,
            category: item.category,
            price: toNumber(item.gia),
            isEnable: true
          }),
          menuData
        )
      )
    });
    return await reponse.json();
  };
  return (
    <div className="container">
      <div>
        <CSVReader
          cssClass="react-csv-input"
          label={message}
          onFileLoaded={updateMenu}
          parserOptions={papaparseOptions}
        />
      </div>
      <div>
        <button
          onClick={e => {
            e.preventDefault();
            uploadMenu()
              .then(e => {
                updateMessage("update success");
              })
              .catch(e => {
                updateMessage("update error");
              });
          }}
        >
          Confirm
        </button>
        <table>
          <thead>
            <tr>
              <th>Mon</th>
              <th>Category</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {map(
              item => (
                <tr>
                  <td>{item.mon}</td>
                  <td>{item.category}</td>
                  <td>{item.gia}</td>
                </tr>
              ),
              menuData
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
