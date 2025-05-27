/* eslint-disable react/prop-types */
import "./ButtonStyle.css";

export default function Button({ text, onClick }) {
  return (
    <>
      <button className="btn" onClick={onClick}>
        <span className="text">{text}</span>
      </button>
    </>
  );
}
