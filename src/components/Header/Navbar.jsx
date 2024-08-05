import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../redux/authSlice";
import { capitalizeFirstName } from "../../utils/capitalizedFirstName";
import Button from "../Button/Button";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const username = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/admin");
  };

  return (
    <div className="flex items-center justify-between border-gray-400">
      <nav>
        <section className="flex lg:hidden">
          <div
            className="space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/works">How it Works?</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="#">Features</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/contact">About us</Link>
              </li>
              <li>
                {isAuthenticated ? (
                  <div className="relative">
                    <Button
                      type="button"
                      className="w-full flex justify-between border border-transparent text-sm font-medium rounded-md dark:text-white bg-amber-400 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                    >
                      {capitalizeFirstName(username)}
                      <svg
                        className="h-4 w-4 text-white ml-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </Button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                        <ul>
                          <li>
                            <Button
                              type="button"
                              className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                              onClick={handleProfile}
                            >
                              Admin Page
                            </Button>
                          </li>
                          <li>
                            <Button
                              type="button"
                              className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                              onClick={handleLogout}
                            >
                              Sign out
                            </Button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="w-full flex justify-center border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    onClick={handleLogin}
                  >
                    Sign in
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </section>

        <ul className="hidden space-x-10 pr-2 lg:flex lg:items-center">
          <li>
            <Link
              to="/works"
              className="text-gray-400 hover:text-black transition ease-in-out duration-300 hover:shadowlg"
            >
              How it Works?
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-gray-400 hover:text-black transition ease-in-out duration-300"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-400 hover:text-black transition ease-in-out duration-300"
            >
              About us
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  type="button"
                  className="flex items-center border-2 border-amber-400 bg-amber-400 rounded-md text-white text-sm font-bold tracking-wider hover:bg-gray-700 hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  {capitalizeFirstName(username)}
                  <svg
                    className="h-4 w-4 text-white ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
                {isDropdownOpen && (
                  <div className="absolute right-0  w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 ">
                    <ul>
                      <li>
                        {role === "admin" && (
                          <Button
                            type="button"
                            className="w-full  text-gray-700 hover:bg-gray-100 text-left"
                            onClick={handleProfile}
                          >
                            Admin Page
                          </Button>
                        )}
                      </li>
                      <li>
                        <Button
                          type="button"
                          className="w-full  text-gray-700 hover:bg-gray-100 text-left"
                          onClick={handleLogout}
                        >
                          Sign out
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full flex justify-center border-2 rounded-md border-amber-400 font-bold text-amber-400 hover:bg-amber-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                onClick={handleLogin}
              >
                Sign in
              </Button>
            )}
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
};

export default Navbar;
