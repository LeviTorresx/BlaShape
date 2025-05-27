import { useState } from "react";
import "./PartsStyles.css";
import Button from "../../../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addPart } from "../../../../redux/features/PartsSlice";

export default function PartsForms() {
  const materials = useSelector((state) => state.material);

  const dispatch = useDispatch();

  const [part, setPart] = useState({
    material: materials[0]?.material || "",
    thickness: materials[0]?.thickness[0] || "",
    color: materials[0]?.colors[0] || { name: "", hex: "" },
    height: "",
    width: "",
    quantity: "1",
    price: materials[0]?.price || "",
    edges: {
      top: false,
      right: false,
      bottom: false,
      left: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPart((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaterialChange = (e) => {
    const selectedMaterial = materials.find(
      (m) => m.material === e.target.value
    );
    setPart((prev) => ({
      ...prev,
      material: selectedMaterial.material,
      thickness: selectedMaterial.thickness[0],
      color: selectedMaterial.colors[0],
      price: selectedMaterial.price,
    }));
  };

  const handleThicknessChange = (e) => {
    setPart((prev) => ({ ...prev, thickness: e.target.value }));
  };

  const handleColorChange = (e) => {
    const selectedMaterial = materials.find(
      (m) => m.material === part.material
    );
    const selectedColor = selectedMaterial.colors.find(
      (c) => c.hex === e.target.value
    );
    setPart((prev) => ({ ...prev, color: selectedColor }));
  };

  const toggleEdge = (edge) => {
    setPart((prev) => ({
      ...prev,
      edges: { ...prev.edges, [edge]: !prev.edges[edge] },
    }));
  };

  const handleAddPart = (e) => {
    e.preventDefault();

    dispatch(addPart(part));

    const selectedMaterial = materials.find(
      (m) => m.material === part.material
    );
    setPart({
      material: part.material || "",
      thickness: part.thickness || "",
      color: selectedMaterial.colors[0] || { name: "", hex: "" },
      height: "",
      width: "",
      quantity: "",
      price: materials[0]?.price || "",
      edges: {
        top: false,
        right: false,
        bottom: false,
        left: false,
      },
    });
  };

  return (
    <div className="container-form">
      <h2 className="tittle-section">Agrega una Pieza</h2>
      <div className="form-group">
        <div className="form-row">
          <div className="form-content">
            <label className="label-form">Material</label>
            <select
              className="input-form"
              name="material"
              value={part.material}
              onChange={handleMaterialChange}
            >
              {materials.map((material) => (
                <option key={material.material} value={material.material}>
                  {material.material}
                </option>
              ))}
            </select>
          </div>

          <div className="form-content">
            <label className="label-form">Espesor <span>(mm)</span></label>
            <select
              className="input-form"
              name="thickness"
              value={part.thickness}
              onChange={handleThicknessChange}
            >
              {materials
                .find((m) => m.material === part.material)
                ?.thickness.map((thickness) => (
                  <option key={thickness} value={thickness}>
                    {thickness}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-content">
            <label className="label-form">Color</label>
            <select
              className="input-form"
              name="color"
              value={part.color.hex}
              onChange={handleColorChange}
            >
              {materials
                .find((m) => m.material === part.material)
                ?.colors.map((color) => (
                  <option key={color.hex} value={color.hex}>
                    {color.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-content">
            <div className="form-content">
              <label className="label-form">Cantidad</label>
              <input
                type="number"
                className="input-form"
                min={1}
                name="quantity"
                value={part.quantity}
                onChange={handleChange}
                placeholder="Ej: 2"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-content">
            <label className="label-form">
              Alto <span>(cm)</span>
            </label>
            <input
              className="input-form"
              type="number"
              min={0}
              name="height"
              value={part.height}
              onChange={handleChange}
              placeholder="Ej: 30"
            />
          </div>

          <div className="form-content">
            <label className="label-form">
              Ancho <span>(cm)</span>
            </label>
            <input
              className="input-form"
              type="number"
              min={0}
              name="width"
              value={part.width}
              onChange={handleChange}
              placeholder="Ej: 50"
            />
          </div>
        </div>

        <div className="cube-container">
          <label className="label-form label-cube">Bordes</label>
          <div className="cube">
            <div
              className={`edge top ${part.edges.top ? "selected" : ""}`}
              onClick={() => toggleEdge("top")}
            />
            <div
              className={`edge right ${part.edges.right ? "selected" : ""}`}
              onClick={() => toggleEdge("right")}
            />
            <div
              className={`edge bottom ${part.edges.bottom ? "selected" : ""}`}
              onClick={() => toggleEdge("bottom")}
            />
            <div
              className={`edge left ${part.edges.left ? "selected" : ""}`}
              onClick={() => toggleEdge("left")}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-content">
            <label className="label-form">Precio (COP)</label>
            <input
              className="input-form"
              type="text"
              name="price"
              value={part.price}
              disabled
            />
          </div>
        </div>

        <div className="button-container">
          <Button text="Agrega Pieza" onClick={handleAddPart} />
        </div>
      </div>
    </div>
  );
}
