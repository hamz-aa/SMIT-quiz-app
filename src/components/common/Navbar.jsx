import logo from "../../assets/smit-logo.png";

const Navbar = () => {
  return (
    <div className="container px-12 py-4 w-[100vw] flex items-center justify-between shadow-lg">
      <img src={logo} alt="logo" className="w-[120px]" />
      <p className="text-xl">username</p>
    </div>
  );
};

export default Navbar;
