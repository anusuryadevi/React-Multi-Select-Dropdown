import "../style.css";

import { SelectProps } from "../lib/interfaces";
import Dropdown from "./dropdown";
import { MultiSelectProvider } from "../hooks/useMultiSelect";

const MultiSelect = (props: SelectProps) => {
  console.log("props ",props)
 return  <>
 <MultiSelectProvider props={props}>
    <div className={`rmsc ${props.className || "multi-select"}`}>
      <Dropdown />
    </div>
   </MultiSelectProvider>
   </>
}

export default MultiSelect;
