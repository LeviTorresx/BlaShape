import { useSelector } from "react-redux";
import { useState } from "react";
import "./ProductsStyle.css";
import Products from "./Products";
import ProductOrganizer from "./ProductOrganizer";

export default function ListProducts() {
  const products = useSelector((state) => state.parts);

  // Obtener todos los materiales únicos
  const uniqueMaterials = [
    ...new Set(products.map((product) => product.material)),
  ];

  // Estado para el material y color seleccionados
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Filtrar productos por material seleccionado
  const filteredByMaterial = selectedMaterial
    ? products.filter((product) => product.material === selectedMaterial)
    : [];

  // Obtener colores únicos del material seleccionado
  const uniqueColors = selectedMaterial
    ? [...new Set(filteredByMaterial.map((product) => product.color.name))]
    : [];

  // Filtrar productos por color seleccionado
  const filteredProducts = selectedColor
    ? filteredByMaterial.filter(
        (product) => product.color.name === selectedColor
      )
    : filteredByMaterial; // Asegura que no se pierdan productos si no hay color seleccionado

  return (
    <div className="material-container">
      <div>
        <h2 className="tittle-section">Materiales Agregados</h2>
        <div className="list-container">
          {/* Selección de material */}
          <div className="radio-container">
            <h3>Material</h3>
            {uniqueMaterials.map((material) => (
              <label
                key={material}
                className={`radio-label ${
                  selectedMaterial === material ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="material"
                  value={material}
                  checked={selectedMaterial === material}
                  onChange={() => {
                    setSelectedMaterial(material);
                    setSelectedColor(null); // Reiniciar color al cambiar material
                  }}
                />
                {material}
              </label>
            ))}
          </div>

          <div className="radio-container ">
            <h3>Color</h3>
            {uniqueColors.map((color) => (
              <label
                key={color}
                className={`radio-label section-color ${
                  selectedColor === color ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                />
                {color}
              </label>
            ))}
          </div>

          {/* Mostrar productos filtrados */}
          <div>
            <Products
              key={`${selectedMaterial}-${selectedColor}`}
              products={filteredProducts}
            />
          </div>
        </div>
      </div>
      <div>
        {/* Mostrar productos organizados dentro del material */}
        <h2 className="tittle-section">Zona de despiece</h2>
        {filteredProducts.length > 0 && (
          <ProductOrganizer
            key={`${selectedMaterial}`}
            products={filteredProducts}
          />
        )}
      </div>
    </div>
  );
}
