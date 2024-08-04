import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import gradhat from "../../assets/images/gradhat.png";

const HowItWorks = () => (
  <>
    <Header />
    <img src="" alt="" />
    <div className="h-full flex justify-center flex-col items-center mx-4">
      <img src={gradhat} alt="gradhat" className="w-1/2 md:w-1/4" />
      <main className="flex justify-center flex-col mx-auto lg:p-8 rounded-lg  mt-6 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to QuizGrad! Here's a quick overview of how it works:
        </p>
        <ul className="list-disc list-inside pl-6 space-y-4">
          <li className="text-lg text-gray-800">
            <a href="/register" className="text-blue-600 font-bold">
              Register: &nbsp;
            </a>
            Create an account to get started with QuizGrad.
          </li>
          <li className="text-lg text-gray-800">
            <a href="/login" className="text-blue-600 font-bold">
              Login: &nbsp;
            </a>{" "}
            Access your quizzes and track your progress.
          </li>
          <li className="text-lg text-gray-800">
            <a className="text-blue-600 font-bold">Quiz App: &nbsp;</a> Take
            quizzes and review your results.
          </li>
        </ul>
      </main>
    </div>
  </>
);

export default HowItWorks;
