import Navbar from "./Navbar";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="flex  justify-between px-4 py-5 lg:py-2 border-b-2 rounded-b-md shadow-md sticky  bg-slate-50">
      <Logo />
      <Navbar />
    </div>
  );
};

export default Header;
