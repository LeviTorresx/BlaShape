/* eslint-disable react/prop-types */
import Button from "../../../../components/button/Button";
import "./ProductsStyle.css";
import { FaPencil } from "react-icons/fa6";
import { FaRotateLeft } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { rotatePart, deletePart } from "../../../../redux/features/PartsSlice";

export default function Products({ products }) {
  const dispatch = useDispatch();

  //const handleEdit = (product) => {};

  const handleRotate = (product) => {
    const sizes = {
      width: product.height,
      height: product.width,
    };
    dispatch(rotatePart({ key: product.key, sizes }));
  };
  const handleDelete = (product) => {
    dispatch(deletePart(product.key));
  };

  return (
    <div className="products-container">
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.key} className="product-item">
              <div>
                <div>
                  <Button text={<FaPencil />} />
                </div>
                <div>
                  <Button
                    text={<FaRotateLeft />}
                    onClick={() => handleRotate(product)}
                  />
                </div>
                <div>
                  <Button
                    text={<FaRegTrashCan />}
                    onClick={() => handleDelete(product)}
                  />
                </div>
              </div>

              <div
                className="product-box"
                style={{
                  width: `${product.width}px`,
                  height: `${product.height}px`,
                  backgroundColor: product.color.hex,
                  borderTop: product.edges.top
                    ? "4px solid var(--color-primary)"
                    : "none",
                  borderRight: product.edges.right
                    ? "4px solid var(--color-primary)"
                    : "none",
                  borderBottom: product.edges.bottom
                    ? "4px solid var(--color-primary)"
                    : "none",
                  borderLeft: product.edges.left
                    ? "4px solid var(--color-primary)"
                    : "none",
                  borderRadius: "5px",
                }}
              ></div>
              <div className="product-info">
                <strong>Quantity:</strong> {product.quantity} <br />
                <strong>Height:</strong> {product.height} cm <br />
                <strong>Width:</strong> {product.width} cm <br />
                <strong>Color:</strong> {product.color.name} (
                {product.color.hex}) <br />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
