/* eslint-disable react/prop-types */
import "./ProductsStyle.css";
import { useSelector } from "react-redux";
import GuillotinePacking from "./GuillotinePacking";

export default function ProductOrganizer({ products }) {
  const materials = useSelector((state) => state.material);

  if (!materials || materials.length === 0) {
    return <p>No materials available</p>;
  }

  const firstProductMaterial =
    products.length > 0 ? products[0].material : null;
  const selectedMaterial = materials.find(
    (mat) => mat.material === firstProductMaterial
  );

  if (!selectedMaterial) {
    return <p>No matching material found</p>;
  }

  const selectedSize = selectedMaterial.sizes[0]; // Usamos el primer tamaño disponible
  const materialWidth = Number(selectedSize?.width);
  const materialHeight = Number(selectedSize?.height);

  // Expandir la lista de productos considerando la cantidad de cada uno
  const expandedProducts = products.flatMap((product) =>
    Array.from({ length: product.quantity }, () => ({ ...product }))
  );

  return (
    <GuillotinePacking
      width={materialWidth}
      height={materialHeight}
      items={expandedProducts}
    />
  );
}
