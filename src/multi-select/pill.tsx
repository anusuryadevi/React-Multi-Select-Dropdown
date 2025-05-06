import { Cross } from "../lib/cross";

const Pill = ({option, handlePillClose}) =>{
    return  <div
    className={`rmsc pill ${option.disabled ? "disabledpill" : ""}`}
  >
    <span className="pilltext">{option.label}</span>
    {!option.disabled && (
      <button
        className="pillcrossbutton"
        onClick={() => {
          handlePillClose(option);
        }}
      >
        <Cross />
      </button>
    )}
  </div>
}

export default Pill