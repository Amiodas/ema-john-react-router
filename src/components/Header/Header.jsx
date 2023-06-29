import "./Header.css";
import ActiveLink from "../ActiveLink/ActiveLink";

const Header = () => {
  return (
    <div className="Header">
      <div>
        <h3>Producty</h3>
      </div>
      <div>
        <ActiveLink to="/">
          <span className="nav-item">Shop</span>
        </ActiveLink>
        <ActiveLink to="/orders">
          <span className="nav-item">Orders</span>
        </ActiveLink>
        <ActiveLink to="/checkout">
          <span className="nav-item">Checkout</span>
        </ActiveLink>
        <ActiveLink to="/inventory">
          <span className="nav-item">Inventory</span>
        </ActiveLink>
        <ActiveLink to="/login">
          <span className="nav-item">Login</span>
        </ActiveLink>
      </div>
    </div>
  );
};

export default Header;
