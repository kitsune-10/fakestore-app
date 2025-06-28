import { Link } from "react-router-dom";
import logOutIcon from "../images/logout-icon.png";
import brandLogo from "../images/hs-logo.png"
import bagIcon from "../images/bag-icon.png";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/homepage">
          <img src={brandLogo} alt="fakeStore Logo" className="logo-img" />
        </Link>
        <span><strong>hot</strong><em>&</em>Sale</span>
        
      </div>

      <nav className="nav-links">
        <Link to="/homepage">Home</Link>
        <Link to="/marketplace">Products</Link>    
        <Link to="/cart">Cart</Link>
      </nav>

      <div className="icons">
        <Link to="/">
          <img src={logOutIcon} alt="Search" className="icon" aria-label="logout" />
        </Link>    
      </div>
    </header>
  );
}

export default Header;
