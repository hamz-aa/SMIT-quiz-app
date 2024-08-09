import logo from "../../assets/smit-logo.png";
import avatar from "../../assets/avatar.png";

function Navbar() {
  return (
    <nav className="p-4 flex items-center justify-between h-24">
      <div className="flex items-center">
        <img src={logo} className="w-36" alt="Logo" />
      </div>
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-3"
          src={avatar}
          alt="Avatar"
        />
        <span>Sher Muhammad</span>
      </div>
    </nav>
  );
}

export default Navbar;
