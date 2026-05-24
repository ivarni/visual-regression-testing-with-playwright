import React from "react";
import ReactDOM from "react-dom/client";
import { ComponentExample } from "../../../utils/example/ComponentExample.js";
import CheckboxExample from "./CheckboxExample.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ComponentExample title="Checkbox" component={CheckboxExample} />
);
