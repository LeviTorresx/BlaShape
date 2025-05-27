import { useSelector } from "react-redux";
import Card from "../../../../components/card/Card";
import "./ElementStyle.css";

export default function Elements() {
  const parts = useSelector((state) => state.parts);

  console.log(parts);
  return (
    <div className="elements-container">
      <h3 className="tittle">Despiece agregado</h3>
      <div className="elements">
        {parts.map((part) => (
          <Card key={part.key} part={part} />
        ))}
      </div>
    </div>
  );
}
