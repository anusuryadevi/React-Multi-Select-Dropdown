import React, {
  useContext,
  useEffect,
  useReducer,
} from "react";

import { Option, SelectProps } from "../lib/interfaces";
import MultiSelectContext from "./MultiSelectContext";

const defaultStrings = {
  allItemsAreSelected: "All items are selected.",
  clearSearch: "Clear Search",
  clearSelected: "Clear Selected",
  noResults: "No options",
  search: "Search",
  selectAll: "Select All",
  selectAllFiltered: "Select All (Filtered)",
  selectItems: "Pick all you want",
  create: "Create",
};

const defaultProps: Partial<SelectProps> = {
  value: [],
  className: "multi-select",
  debounceDuration: 200,
  options: [] as Option[],
  labelledBy: "Select",
  showCheckedOnSelectedItems:false,
  isLoading: false,
  shouldToggleOnHover: false,
  isCreatable: true,
  HideClearIcon: false,
  hidePickedOptions: true,
  maxPillsToRender: 2,
  disabled: false,
  disableSearch: false,
  defaultIsOpen: false,
  closeOnChangedValue: false,
  isError: false,
};

interface MultiSelectProviderProps {
  props: SelectProps;
  children;
}

export const MultiSelectProvider = ({
  props,
  children,
}: MultiSelectProviderProps) => {

  const t = (key) => props.overrideStrings?.[key] || defaultStrings[key];

  const defaultStore = {
    searchText: "",
    filteredOptions: [],
    searchTextForFilter: "",
    focusIndex: 0,
    ...defaultProps,
    ...props,
    options: props.options,
    t,
  };
  const reducer = (state, action) => {
    console.log("dispatching ", action.payload, state);
    switch (action.type) {
      case "dispatch":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  const [store, dispatch] = useReducer(reducer, defaultStore);

  useEffect(() => {
    dispatch({ type: "dispatch", payload: { 
      options : props.options,
      filteredOptions: props.options } });
  }, [props.options]);

  useEffect(()=>{
    dispatch({ type: "dispatch", payload: { 
      value : props.value}})
  },[props.value])


  return (
    <MultiSelectContext.Provider
      value={{
        store,
        dispatch,
      }}
    >
      {children}
    </MultiSelectContext.Provider>
  );
};

MultiSelectProvider.displayName = "MultiSelectProvider";

export const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("useMultiSelect must be used within a UserProvider");
  }
  return context;
};
