/* eslint-disable react/prop-types */
import "./CardStyle.css";
import Button from "../button/Button";
export default function Card({ part }) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>
            Key: <span> {part.key}</span>
          </h3>
          <div>
            <span className="badge">
              Cantidad <strong> {part.quantity} </strong>{" "}
            </span>
            <span className="badge">Color: {part.color.name} </span>
          </div>
        </div>
        <div className="card-body">
          <span>
            Alto: <strong> {part.height}</strong> (cm)
          </span>
          <p> x </p>
          <span>
            Ancho: <strong> {part.width}</strong> (cm)
          </span>

          <div
            style={{
              borderTop: part.edge.top ? "4px solid var(--primary) " : "none",
              borderRight: part.edge.right
                ? "4px solid var(--primary)"
                : "none",
              borderBottom: part.edge.bottom
                ? "4px solid var(--primary)"
                : "none",
              borderLeft: part.edge.left ? "4px solid var(--primary)" : "none",
              width: "50px",
              height: "50px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: part.color.hex,
                borderRadius: "5px",
              }}
            ></div>
          </div>
          <div>
            <Button text={"+"} />
            <Button text={"-"} />
          </div>
        </div>
      </div>
    </>
  );
}
