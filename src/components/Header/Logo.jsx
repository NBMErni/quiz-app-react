import logo from "../../assets/images/logo.svg";

const Logo = () => {
  return (
    <div className="flex items-center">
      <a href="/">
        <img src={logo} alt="grad hat" className="w-[150px]" />
      </a>
    </div>
  );
};

export default Logo;
