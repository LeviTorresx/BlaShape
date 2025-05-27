import PartsForms from "./components/forms/PartsForms";
import "./Styles.css";
import ListProducts from "./components/products/ListProducts";
import NavBar from "../../components/navbar/NavBar";

export default function LayoutPage() {
  return (
    <div>
      <NavBar />
      <div className="layout-page">
        <PartsForms />
        <ListProducts />
      </div>
    </div>
  );
}
