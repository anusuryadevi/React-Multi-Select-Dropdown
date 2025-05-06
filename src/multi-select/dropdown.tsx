import React, { useEffect, useRef, useState } from "react";
import { useDidMountEffect } from "../hooks/useDidMountEffect";
import { useKey } from "../hooks/use-key";
import { useMultiSelect } from "../hooks/useMultiSelect";
import { KEY } from "../lib/constants";
import SelectPanel from "../select-panel";
import { Cross } from "../lib/cross";
import { Arrow } from "../lib/arrow";
import DropdownHeader from "./header";
import { Loading } from "../lib/loading";

const Dropdown = () => {
  const { store, dispatch } = useMultiSelect();

  const {
    t,
    onMenuToggle,
    ArrowRenderer,
    shouldToggleOnHover,
    ClearIcon,
    isLoading,
    disabled,
    onChange,
    labelledBy,
    value,
    isOpen,
    defaultIsOpen,
    HideClearIcon,
    closeOnChangedValue,
    isError,
  } = store;

  useEffect(() => {
    if (closeOnChangedValue) {
      setExpanded(false);
    }
  }, [value, closeOnChangedValue]);

  const [isInternalExpand, setIsInternalExpand] = useState(true);
  const [expanded, setExpanded] = useState(defaultIsOpen);
  const [hasFocus, setHasFocus] = useState(false);
  const FinalArrow = ArrowRenderer || Arrow;

  const wrapper: any = useRef(null);

  useDidMountEffect(() => {
    onMenuToggle && onMenuToggle(expanded);
  }, [expanded]);

  useEffect(() => {
    if (defaultIsOpen === undefined && typeof isOpen === "boolean") {
      setIsInternalExpand(false);
      setExpanded(isOpen);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    // allows space and enter when focused on input/button
    if (
      ["text", "button"].includes(e.target.type) &&
      [KEY.SPACE, KEY.ENTER].includes(e.code)
    ) {
      return;
    }

    if (isInternalExpand) {
      if (e.code === KEY.ESCAPE) {
        setExpanded(false);
        wrapper?.current?.focus();
      } else {
        setExpanded(true);
      }
    }
    e.preventDefault();
  };

  useKey([KEY.ENTER, KEY.ARROW_DOWN, KEY.SPACE, KEY.ESCAPE], handleKeyDown, {
    target: wrapper,
  });

  const handleHover = (iexpanded: boolean) => {
    isInternalExpand && shouldToggleOnHover && setExpanded(iexpanded);
  };

  const handleFocus = () => !hasFocus && setHasFocus(true);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget) && isInternalExpand) {
      setHasFocus(false);
      setExpanded(false);
    }
  };

  const handleMouseEnter = () => handleHover(true);

  const handleMouseLeave = () => handleHover(false);

  const toggleExpanded = () => {
    isInternalExpand && setExpanded(isLoading || disabled ? false : !expanded);
  };

  const handleClearSelected = (e) => {
    e.stopPropagation();
    onChange(value.filter((o: any) => o.disabled && o.checked));
    isInternalExpand && setExpanded(false);
    dispatch({ type: "dispatch", payload: { searchText: "" } });
    dispatch({ type: "dispatch", payload: { searchTextForFilter: "" } });
  };

  return (
    <div
      tabIndex={0}
      className={`dropdown-container ${isError ? "error" : ""}`}
      aria-labelledby={labelledBy}
      aria-expanded={expanded}
      aria-readonly={true}
      aria-disabled={disabled}
      ref={wrapper}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dropdown-heading" onClick={toggleExpanded}>
        <div className="dropdown-heading-value">
          <DropdownHeader />
        </div>

        {isLoading && <Loading />}
        {value?.length > 0 && HideClearIcon !== null ? (
          <button
            type="button"
            className="clear-selected-button"
            onClick={handleClearSelected}
            disabled={disabled}
            aria-label={t("clearSelected")}
          >
            {!HideClearIcon && <> {ClearIcon ? ClearIcon : <Cross />} </>}
          </button>
        ) : (
          <FinalArrow expanded={expanded} />
        )}
      </div>
      {expanded && (
        <div className="dropdown-content">
          <div className="panel-content">
            <SelectPanel />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
