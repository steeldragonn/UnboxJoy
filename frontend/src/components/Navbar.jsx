import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/gifts">
        <button>Home</button>
      </Link>
      {isLoggedIn && (
        <>
          <Link to="/favorites">
            <button>Favorites</button>
          </Link>
          <Link to="/cart">
            <button>Cart</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
