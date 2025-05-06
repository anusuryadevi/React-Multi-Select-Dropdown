import { useEffect, useMemo, useRef } from "react";

import { useKey } from "../hooks/use-key";
import { useMultiSelect } from "../hooks/useMultiSelect";
import { KEY } from "../lib/constants";
import { searchFilterFunction } from "../lib/simple-match-utils";
import SelectList from "./select-list";

const SelectPanel = () => {
  const { store, dispatch } = useMultiSelect();
  const {
    t,
    onChange,
    options,
    value,
    searchFilterFunction: customFilterOptions,
    disableSearch,
    isCreatable,
    onCreateOption,
  } = store;
  const { searchText, searchTextForFilter, focusIndex, filteredOptions } =
    store;
  const listRef = useRef<any>(null);
  const skipIndex = useMemo(() => {
    let start = 0;

    if (!disableSearch) start += 1; // if search is enabled then +1 to skipIndex

    return start;
  }, [disableSearch]);

  const handleItemClicked = (index: number) => {
    dispatch({ type: "dispatch", payload: { focusIndex: index } });
  };
  // Arrow Key Navigation
  const handleKeyDown = (e) => {
    switch (e.code) {
      case KEY.ARROW_UP:
        updateFocus(-1);
        break;
      case KEY.ARROW_DOWN:
        updateFocus(1);
        break;
      default:
        return;
    }
    e.stopPropagation();
    e.preventDefault();
  };

  useKey([KEY.ARROW_DOWN, KEY.ARROW_UP], handleKeyDown, {
    target: listRef,
  });

  const handleOnCreateOption = async () => {
    let newOption = { label: searchText, value: searchText, __isNew__: true };

    // if custom `onCreateOption` is given then this will call this
    if (onCreateOption) {
      newOption = await onCreateOption(searchText);
    }

    // adds created value to existing options
    onChange([...value, newOption]);
    dispatch({ type: "dispatch", payload: { searchText: "" ,
      searchTextForFilter :"",
      option:[newOption, ...options]
    } });
    dispatch({ type: "dispatch", payload: { searchTextForFilter: "" } });
  };

  const getFilteredOptions = async () =>
    customFilterOptions
      ? await customFilterOptions(options, searchTextForFilter)
      : searchFilterFunction(options, searchTextForFilter);

  const updateFocus = (offset: number) => {
    let newFocus = focusIndex + offset;
    newFocus = Math.max(0, newFocus);
    newFocus = Math.min(newFocus, options.length + Math.max(skipIndex - 1, 0));
    dispatch({ type: "dispatch", payload: { focusIndex: newFocus } });
  };

  useEffect(() => {
    listRef?.current?.querySelector(`[tabIndex='${focusIndex}']`)?.focus();
  }, [focusIndex]);

  useEffect(() => {
    getFilteredOptions().then((options) => {
      dispatch({ type: "dispatch", payload: { filteredOptions: options } });
    });
  }, [searchTextForFilter, options]);

  const creationRef: any = useRef(null);
  useKey([KEY.ENTER], handleOnCreateOption, { target: creationRef });

  const showCreatable =
    isCreatable &&
    searchText &&
    !filteredOptions.some((e) => e?.value === searchText);

  return (
    <div className="select-panel" role="listbox" ref={listRef}>
      <ul className="options">
        {filteredOptions.length ? (
          <SelectList
            skipIndex={skipIndex}
            options={filteredOptions}
            onClick={(index) => handleItemClicked(index)}
          />
        ) : showCreatable ? (
          <li
            onClick={handleOnCreateOption}
            className="select-item creatable"
            tabIndex={1}
            ref={creationRef}
          >
            {`${t("create")} "${searchText}"`}
          </li>
        ) : (
          <li className="no-options">{t("noResults")}</li>
        )}
      </ul>
    </div>
  );
};

export default SelectPanel;
