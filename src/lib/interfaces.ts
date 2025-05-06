import React, { ReactNode } from "react";

export interface Option {
  value: string | number;
  label: string;
  key?: string;
  disabled?: boolean;
  checked?: boolean;
  data?: any;
}

export interface ItemRendererProps {
  checked: boolean;
  option: {
    value: string | number;
    label: string;
    data?:any;
  };
  onClick: () => void;
  disabled: boolean;
}

export interface PillRendererProps {
  selectedOption : any
  handlePillClose : any
}

export interface SelectProps {
  options: Option[];
  value: Option[];
  onChange?;
  PillRenderer?: ({selectedOption, handlePillClose}) => React.JSX.Element;
  ItemRenderer?: (props:ItemRendererProps) => React.JSX.Element;
  showCheckedOnSelectedItems?:boolean;
  ArrowRenderer?: ({ expanded }) => React.JSX.Element;
  isLoading?: boolean;
  disabled?: boolean;
  disableSearch?: boolean;
  shouldToggleOnHover?: boolean;
  searchFilterFunction?: (
    options: Option[],
    filterString: string
  ) => Promise<Option[]> | Option[];
  overrideStrings?: { [key: string]: string };
  labelledBy: string;
  className?: string;
  onMenuToggle?;
  ClearIcon?: ReactNode;
  debounceDuration?: number;
  HideClearIcon?: ReactNode;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  isCreatable?: boolean;
  onCreateOption?:(createText:string)=>Option;
  closeOnChangedValue?: boolean;
  isError?: boolean;
  maxPillsToRender?:number;
  hidePickedOptions?:boolean;
}
