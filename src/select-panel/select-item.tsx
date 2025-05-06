/**
 * This component represents an individual item in the multi-select drop-down
 */
import React, { useRef } from "react";

import { useKey } from "../hooks/use-key";
import { KEY } from "../lib/constants";
import { Option } from "../lib/interfaces";
import DefaultItemRenderer from "./default-item";
import { Tick } from "../lib/tick";

interface ISelectItemProps {
  itemRenderer;
  option: Option;
  checked?: boolean;
  tabIndex?: number;
  disabled?: boolean;
  onSelectionChanged: (checked: boolean) => void;
  onClick;
  showCheckedOnSelectedItems?:boolean;
}

const SelectItem = ({
  itemRenderer: ItemRenderer = DefaultItemRenderer,
  option,
  checked,
  tabIndex,
  disabled,
  onSelectionChanged,
  onClick,
  showCheckedOnSelectedItems = false
}: ISelectItemProps) => {
  const itemRef: any = useRef(null);

  const onOptionCheck = (e) => {
    toggleChecked();
    e.preventDefault();
  };

  const toggleChecked = () => {
    if (!disabled) {
      onSelectionChanged(!checked);
    }
  };

  const handleClick = (e) => {
    toggleChecked();
    onClick(e);
  };

  useKey([KEY.ENTER, KEY.SPACE], onOptionCheck, { target: itemRef });

  return (
    <label
      className={`select-item ${checked ? "selected" : ""} ${disabled ? "disabled" : ""}`} 
      role="option"
      aria-selected={checked}
      tabIndex={tabIndex}
      ref={itemRef}
      onClick={handleClick}
    >
      { showCheckedOnSelectedItems && checked && <Tick color={'gray'}/>}
      <ItemRenderer
        option={option}
        checked={checked}
        disabled={disabled}
      />
    </label>
  );
};

export default SelectItem;
