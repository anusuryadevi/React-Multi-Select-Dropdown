Fully configurable and lightweight multi select dropdown component using React and Typescript

## ✨ Features

- 🕶 Zero Dependency
- 🍃 Lightweight
- 💅 Themeable / Configurable
- ✌ Written w/ TypeScript

## 🔧 Installation

```bash
npm i react-multiselect-dropdown-configurable   # npm
yarn add react-multiselect-dropdown-configurable # yarn
```

## 📦 Simple Example - Direct usage

```tsx
import React, { useState } from "react";
import MultiSelect from "react-multiselect-dropdown-configurable";
const options = [
  { label: "Grapes", value: "grapes" },
  { label: "Mango", value: "mango" },
  { label: "Strawberry", value: "strawberry", disabled: true },
  { label: "Pinapple", value: "Pinapple", disabled: true },
  { label: "Pomogranate", value: "Pomogranate" },
  { label: "Papaya", value: "Papaya" },
  { label: "Sapota", value: "Sapota" },
];
const Example = () => {
  //you can optionally add preselected options and pass to value
  // or you can just keep it empty array []
  const [selected, setSelected] = useState([
    { label: "Grapes", value: "grapes" },
    { label: "Papaya", value: "Papaya" },
  ]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <div style={{ width: "400px" }}>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="multiselect for fruits"
        />
      </div>
    </div>
  );
};
```

## 📦 Detailed Example - fully configured

```tsx
import React, { useState } from "react";
import MultiSelect from "react-multiselect-dropdown-configurable";
import { Cross, ChevronUp, ChevronDown } from "./lib";

const apiData = [
  {
    id: 2,
    firstName: "Michael",
    lastName: "Williams",
    image: "https://dummyjson.com/icon/michaelw/128",
    company: {
      department: "Support",
      name: "Spinka - Dickinson",
      title: "Support Specialist",
    },
  },
  {
    id: 3,
    firstName: "Sophia",
    lastName: "Brown",
    image: "https://dummyjson.com/icon/sophiab/128",
    company: {
      department: "Research and Development",
      name: "Schiller - Zieme",
      title: "Accountant",
    },
  },
  {
    id: 4,
    firstName: "James",
    lastName: "Davis",
    image: "https://dummyjson.com/icon/jamesd/128",
    company: {
      department: "Support",
      name: "Pagac and Sons",
      title: "Research Analyst",
    },
  },
  {
    id: 5,
    firstName: "Emma",
    lastName: "Miller",
    image: "https://dummyjson.com/icon/emmaj/128",
    company: {
      department: "Human Resources",
      name: "Graham - Gulgowski",
      title: "Quality Assurance Engineer",
    },
  },
  {
    id: 6,
    firstName: "Olivia",
    lastName: "Wilson",
    image: "https://dummyjson.com/icon/oliviaw/128",
    company: {
      department: "Product Management",
      name: "Pfannerstill Inc",
      title: "Research Analyst",
    },
  },
  {
    id: 7,
    firstName: "Alexander",
    lastName: "Jones",
    image: "https://dummyjson.com/icon/alexanderj/128",
    company: {
      department: "Engineering",
      name: "Dickens - Beahan",
      title: "Web Developer",
    },
  },
];

const Example = () => {
  const apiOptions = apiData.map((user, index) => {
    return {
      label: user.firstName + " " + user.lastName,
      value: user.username,
      disabled: index === 2,
      data: {
        image: user.image,
        firstName: user.firstName,
        lastName: user.lastName,
        description: user.company.department + " " + user.company.title,
      },
    };
  });
  const [selected, setSelected] = useState([]);
  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={apiOptions}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        isLoading={false}
        className="dropdown"
        shouldToggleOnHover={false}
        ClearIcon={<Cross />}
        overrideStrings={{
          selectItems: "Pick all that you like",
        }}
        isCreatable={true}
        HideClearIcon={false}
        ItemRenderer={({ checked, option, onClick, disabled }) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "15px",
            }}
            onClick={onClick}
          >
            <div>
              <img
                src={option.data.image}
                style={{
                  width: "30px",
                  height: "30px",
                }}
                alt="user avatar"
              />{" "}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "16px",
                  lineHeight: "1.55",
                  color: "black",
                }}
              >
                {option.data.firstName} {option.data.lastName}
              </span>
              <span
                style={{
                  color: "rgb(134, 142, 150)",
                  fontSize: "12px",
                  lineHeight: "1.55",
                  textDecoration: "none",
                }}
              >
                {option.data.description}
              </span>
            </div>
          </div>
        )}
        showCheckedOnSelectedItems={true}
        hidePickedOptions={false}
        PillRenderer={({ selectedOption, handlePillClose }) => {
          return (
            <div
              style={{
                backgroundColor: "lightgray",
                borderRadius: "3px",
                padding: "5px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
              }}
              onClick={handlePillClose}
            >
              <img
                src={selectedOption.data.image}
                style={{
                  width: "15px",
                  height: "15px",
                }}
                alt="user avatar"
              />{" "}
              {selectedOption.label}
              <Cross />
            </div>
          );
        }}
        maxPillsToRender={1}
        ArrowRenderer={({ expanded }) => {
          return expanded ? <ChevronUp /> : <ChevronDown />;
        }}
        disabled={false}
        disableSearch={false}
        searchFilterFunction={(options, filterString) => {
          return options.filter((option) =>
            option.data.description.includes(filterString)
          );
        }}
        defaultIsOpen={false}
        closeOnChangedValue={false}
        isError={false}
        onCreateOption={(searchText) => {
          return {
            label: searchText,
            value: searchText,
            data: {
              image: null,
              firstName: "",
              lastName: searchText,
              description: searchText,
            },
          };
        }}
      />
    </div>
  );
};
```
## ✨ Possible props
```tsx
interface Option {
  value: string | number;
  label: string;
  key?: string;
  disabled?: boolean;
  data?: any; //can be utilized in Item Renderer or Pill Renderer
}

interface MultiSelect {
  options: Option[]; //array of objects with mandatory label and value properties
  value: Option[]; //selected array of objects
  onChange?; //you need to map this with your setOptions setState function
  PillRenderer?: ({selectedOption, handlePillClose}) => React.JSX.Element; //how selected item should render in the header
  ItemRenderer?: (props:ItemRendererProps) => React.JSX.Element; //how options should render in the dropdown popper
  showCheckedOnSelectedItems?:boolean; //should selected items have check icon in the dropdown popper
  ArrowRenderer?: ({ expanded }) => React.JSX.Element; //custom icon in the header to toggle dropdown popper
  isLoading?: boolean; //adds a loading icon in the header and disables selection temporarily
  disabled?: boolean; // completly disables the dropdown - no user action is permitted
  disableSearch?: boolean; //by default enabled, user can search the options by typing text in the header
  shouldToggleOnHover?: boolean; //by default false, if enabled then dropdown toggles on mouse hover
  searchFilterFunction?: (
    options: Option[],
    filterString: string
  ) => Promise<Option[]> | Option[]; //by default search is done on the label field, it can be changed by passing custom function that returns filtered options using filterString and options
  overrideStrings?: { [key: string]: string }; //enables you to overwrite existing text, helps for translation
  labelledBy: string; //mandatory to pass a descriptive text here
  className?: string; //used on the main wrapper
  debounceDuration?: number; //default is 300ms (number considered in ms)
  HideClearIcon?: ReactNode; //by default clear icon is visible and functional (helps to clear all selected values), it can be hidden by passing true here.
  defaultIsOpen?: boolean; //when rendered for the first time, the dropdown popper is open
  isCreatable?: boolean; //enables user to create a new option, by default the createText is assigned to label and value
  onCreateOption?:(createText:string)=>Option; //custom function can return new option object based on the input createText, useful when you used data property in options and using to render pills and items
  closeOnChangedValue?: boolean; //by default false, enabling it will close the dropdown popper as soon as user selects or deselects any one value from dropdown popper
  isError?: boolean; //by default false, enabling it will show red border instead of gray
  maxPillsToRender?: number; //by default 2. it defines how many pills are shown in the header, when more than 2 items selected it shows +{n}more along with 2 pills.
  hidePickedOptions?:boolean; //removes selected options from the dropdown popper
}
```