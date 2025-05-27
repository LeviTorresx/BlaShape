import Button from "../button/Button";
import "./NavBarStyle.css";
export default function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img src="src\assets\images\icon_1-removebg-preview.png" className="nav-icon"/>
          <h1>BlaShape</h1>
        </div>
        <div className="nav-links">
          <div>
            <Button text={"btn 1"} />
          </div>
          <div>
            <Button text={"btn 1"} />
          </div>
        </div>
      </nav>
    </>
  );
}
