import React from "react";
import ReactDOM from "react-dom/client";
import { ComponentExample } from "../../../utils/example/ComponentExample.js";
import InputExample from "./InputExample.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ComponentExample title="Input" component={InputExample} />
);
