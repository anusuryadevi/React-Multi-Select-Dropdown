import React from "react";

import { Option } from "../lib/interfaces";
// import { Tick } from "../lib/tick";

interface IDefaultItemRendererProps {
  checked: boolean;
  option: Option;
  disabled?: boolean;
  onClick;
}

const DefaultItemRenderer = ({
  checked,
  option,
  onClick,
  disabled,
}: IDefaultItemRendererProps) => (
  <div className={`item-renderer ${disabled ? "disabled" : ""}`} onClick={onClick} tabIndex={-1}>
    <span>{option.label}</span>
  </div>
);

export default DefaultItemRenderer;
