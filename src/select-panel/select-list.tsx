import React from "react";
import { useMultiSelect } from "../hooks/useMultiSelect";
import { Option } from "../lib/interfaces";
import SelectItem from "./select-item";

interface ISelectListProps {
  options: Option[];
  onClick;
  skipIndex: number;
}

const SelectList = ({ options, onClick, skipIndex }: ISelectListProps) => {
  const { store, dispatch } = useMultiSelect();
  const {disabled, value, onChange, ItemRenderer,hidePickedOptions,showCheckedOnSelectedItems} = store
  const handleSelectionChanged = (option: Option, checked: boolean) => {
    if (disabled) return;

    onChange(
      checked
        ? [...value, option]
        : value.filter((o: any) => o.value !== option.value)
    );
    dispatch({ type: "dispatch", payload: { searchText: "" } });
    dispatch({ type: "dispatch", payload: { searchTextForFilter: "" } });
  };

  const getOptionsToRender = () =>{
    return hidePickedOptions ?
     options.filter((o)=>{return !(value.some((v)=>v.value === o.value))})
     : options
  }
  return (
    <>
      {getOptionsToRender().map((o: any, i) => {
        const tabIndex = i + skipIndex;

        return (
          <li key={o?.key || i}>
            <SelectItem
              tabIndex={tabIndex}
              option={o}
              onSelectionChanged={(c) => handleSelectionChanged(o, c)}
              checked={!!value.find((s) => s.value === o.value)}
              onClick={() => onClick(tabIndex)}
              itemRenderer={ItemRenderer}
              disabled={o.disabled || disabled}
              showCheckedOnSelectedItems={showCheckedOnSelectedItems}
            />
          </li>
        );
      })}
    </>
  );
};

export default React.memo(SelectList);
