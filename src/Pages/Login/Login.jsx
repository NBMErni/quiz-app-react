import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Logo from "../../assets/images/logo.svg";
import gradhat from "../../assets/images/gradhat.png";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input"; // Import the reusable Input component

const Login = () => {
  // STATES
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();

  // SELECTORS

  // ENV
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(BASE_URL);

  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}User/login`, data);

      const { user, role } = response.data;

      console.log(response.data);

      dispatch(login({ user, role }));

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="h-screen pt-20 lg:pt-0 lg:flex lg:flex-row-reverse lg:items-center lg:justify-center">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:gap-32 md:bg-white-200">
        <div className="left">
          <div className="flex justify-center mb-10">
            <Link to="/">
              <img
                src={Logo}
                alt="logo"
                className="w-[250px] sm:w-[200px] md:w-[250px] lg:w-[350px]"
              />
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="mb-3">Welcome back!</h1>
            <h1>Please login to your account.</h1>
          </div>

          <div className="px-6 py-5 rounded-md mx-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Username"
                type="text"
                register={register}
                validation={{ required: "Username is required" }}
                error={errors.username}
              />

              <Input
                label="Password"
                type="password"
                register={register}
                validation={{ required: "Password is required" }}
                error={errors.password}
              />

              {loginError && (
                <div className="text-red-500 text-center mb-3">
                  {loginError}
                </div>
              )}

              <div className="mb-8">
                <Button
                  type="submit"
                  className="bg-amber-400 hover:bg-gray-700 w-full rounded-full hover:text-white"
                >
                  Sign in
                </Button>
              </div>
            </form>

            {/* <input {...register("username",  {required: true, maxLength:20})}/> */}

            <h1 className="text-center ">
              Don't have an account yet?{" "}
              <Link to="/register" className="text-blue-600">
                Register Here
              </Link>
            </h1>
          </div>
        </div>
        <div className="right ">
          <img
            src={gradhat}
            alt="grad-hat"
            className="hidden sm:hidden lg:block lg:w-[350px] lg:mt-28 w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
