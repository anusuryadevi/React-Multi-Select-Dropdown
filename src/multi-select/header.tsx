import React, { useCallback, useRef } from "react";
import { useMultiSelect } from "../hooks/useMultiSelect";
import { debounce } from "../lib/debounce";
import { Option } from "../lib/interfaces";
import Pill from "./pill";

const DropdownHeader = () => {
  const { store, dispatch } = useMultiSelect();
  const {
    t,
    value,
    options,
    PillRenderer,
    disableSearch,
    debounceDuration,
    disabled,
    searchText,
    maxPillsToRender = 2,
    onChange,
  } = store;

  const searchInputRef = useRef<any>(null);
  const noneSelected = value?.length === 0;
  const allSelected = value?.length === options?.length;
  
  enum FocusType {
    SEARCH = 0,
    NONE = -1,
  }

  const debouncedSearch = useCallback(
    debounce(
      (query) =>
        dispatch({
          type: "dispatch",
          payload: { searchTextForFilter: query },
        }),
      debounceDuration
    ),
    []
  );
  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
    dispatch({ type: "dispatch", payload: { searchText: e.target.value } });
    dispatch({ type: "dispatch", payload: { focusIndex: FocusType.SEARCH } });
  };

  const handleSearchFocus = () => {
    dispatch({ type: "dispatch", payload: { focusIndex: FocusType.SEARCH } });
  };

  const handlePillClose = (option: Option) => {
    if (disabled) return;
    onChange(value.filter((o: any) => o.value !== option.value));
  };

  return (
    <div className="rmsc pillcontainer">
      <>
        {allSelected ? (
          t("allItemsAreSelected")
        ) : (
          <>
            {PillRenderer
              ? value.slice(0, maxPillsToRender).map((option) => {
                  return (
                    <PillRenderer
                      selectedOption={option}
                      handlePillClose={() => handlePillClose(option)}
                    />
                  );
                })
              : value.slice(0, maxPillsToRender).map((option) => {
                  return (
                    <Pill option={option} handlePillClose={handlePillClose} />
                  );
                })}
            {value?.length - maxPillsToRender > 0 && (
              <span className="pillmore">
                {" "}
                {`+${value.length - maxPillsToRender} more`}
              </span>
            )}
          </>
        )}
      </>

      {!disableSearch && !disabled && (
        <input
          placeholder={noneSelected ? t("selectItems") : ""}
          type="text"
          aria-describedby={t("search")}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          value={searchText}
          ref={searchInputRef}
          tabIndex={0}
          className="searchinputactive"
        />
      )}
    </div>
  );
};

export default React.memo(DropdownHeader);
