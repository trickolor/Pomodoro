import express from "express";
import React from "react";
import ReactDOM from "react-dom/server";
import { App } from "../shared/App.tsx";
import { indexTemplate } from "./indexTemplate";
import { StaticRouter } from "react-router-dom/server";
const app = express();

app.use("/static", express.static("./dist/client"));

app.get("*", (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  )));
});

app.listen(3000, () => {
  console.log("server started on port http://localhost:3000");
}); 
