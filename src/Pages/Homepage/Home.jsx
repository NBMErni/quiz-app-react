import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import vector from "../../assets/images/bg-vector.svg";
import { useNavigate } from "react-router-dom";

//IMAGES
import landingPagePic from "../../assets/images/landing-page-pic.svg";

const Home = () => {
  //SELECTORS
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  console.log(isAuthenticated);

  const navigate = useNavigate();

  const handleStartExam = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/examinee");
    }
  };

  return (
    <>
      <div className="h-screen">
        <Header />
        <section className="flex flex-col md:h-screen md:flex-row items-center justify-center md:mt-[-150px] lg:mt-[-152px]   ">
          <div className="left md:w-3/4 lg:w-1/2 flex flex-col ">
            <h1 className="text-3xl lg:text-5xl xl:text-6xl text-gray-800 font-semibold mx-5 mb-5 mt-10 tracking-wide leading-10">
              Learn <br />
              new concepts <br />
              for each question
            </h1>
            <h3 className="mx-5 text-md lg:my-10 border-l-2 lg:text-xl lg:pl-5 border-black pl-2 text-gray-400 my-5">
              We help you prepare for exams and quizzes
            </h3>

            <div className="flex lg:gap-20 justify-center md:justify-start md:items-center md:ml-1 ">
              <button
                className="mx-5 px-3 py-2  md:mx-3  lg:px-8 lg:py-3  lg:font-semibold bg-amber-400 text-white rounded-md"
                onClick={handleStartExam}
              >
                Start solving
              </button>
              <a
                href="/works"
                className="py-2  text-amber-400 font-semibold hover:bg-amber-400 hover:text-white md:px-4 lg:px-8 lg:py-3 rounded-md lg:transition lg:ease-in-out lg:duration-300"
              >
                Know more
              </a>
            </div>
          </div>
          <div className="">
            <img
              src={landingPagePic}
              alt="Landing Page"
              className="w-[500px]"
            />
          </div>
        </section>
      </div>
      <div className="md:mt-[-60px] lg:mt-[-75px]">
        <img src={vector} alt="vector-bg" className="hidden md:block" />
      </div>
    </>
  );
};

export default Home;
