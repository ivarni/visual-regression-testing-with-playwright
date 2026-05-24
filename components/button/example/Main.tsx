import React from "react";
import ReactDOM from "react-dom/client";
import { ComponentExample } from "../../../utils/example/ComponentExample.js";
import ButtonExample from "./ButtonExample.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ComponentExample title="Button" component={ButtonExample} />
);
