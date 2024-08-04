import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetQuizzesQuery } from "../../redux/questionSliceAPI";
import CountdownTimer from "../../features/CountdowntTimer";
import Header from "../../components/Header/Header";
import Breadcrumbs from "../../features/Breadcrumbs";
import ScoreModal from "../../features/ScoreModal";

function Examinee() {
  // STATES
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [timerDuration, setTimerDuration] = useState(15000);
  const [showModal, setShowModal] = useState(false);

  // NAVIGATE
  const navigate = useNavigate();

  // RTK Query
  const { data: quizData = [], error, isLoading } = useGetQuizzesQuery();

  // HANDLE TIMER AND QUESTION CHANGES
  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => {
        setSelectedAnswerIndex(null);
        setCorrectAnswerIndex(null);
        setIsAnswered(false);

        if (currentQuestionIndex >= quizData.length - 1) {
          setShowModal(true);
        } else {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAnswered, currentQuestionIndex, correctAnswersCount, quizData.length]);

  // HANDLE ANSWER CLICK
  const handleAnswerClick = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswerIndex(answerIndex);
    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.listOfPossibleAnswers.indexOf(
      currentQuestion.answer
    );

    setCorrectAnswerIndex(correctIndex);

    if (answerIndex === correctIndex) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }

    setIsAnswered(true);
  };

  // RTK ERROR HANDLERS
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading quizzes!</div>;
  if (quizData.length === 0) return <div>No quizzes available</div>;

  // Breadcrumbs
  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;
  const progressCurrent = currentQuestionIndex + 1;
  const progressTotal = totalQuestions;

  return (
    <>
      <Header />
      <div className="my-10 hidden md:block">
        <Breadcrumbs
          currentStep={progressCurrent}
          totalSteps={totalQuestions}
        />
      </div>

      <div className="md:text-xl md:hidden flex items-center justify-center mt-10">
        <h1 className="mb-12 text-gray-500 italic">
          Question {currentQuestionIndex + 1} out of {totalQuestions}
        </h1>
      </div>

      <div className="md:justify-center md:gap-24 lg:mt-20 md:mt-24">
        <div className="flex md:justify-between flex-col justify-center ">
          <div className="h-[150px] flex items-center justify-center bg-amber-400 py-5 mb-10">
            <h1 className="text-white mx-3 text-xl md:text-2xl md:font-semibold">
              {currentQuestion.question}
            </h1>
          </div>
          <div className="flex w-full lg:mb-10">
            {/* <ProgressBar current={progressCurrent} total={progressTotal} /> */}
          </div>
        </div>

        {/* Add the CountdownTimer component here */}
        <div className="flex justify-center my-5">
          <CountdownTimer
            key={currentQuestionIndex} // Ensure the timer resets on question change
            duration={timerDuration}
            onComplete={() => {
              setIsAnswered(true); // Proceed to next question when timer completes
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 content-center lg:gap-28 md:gap-3 mx-10">
          {currentQuestion.listOfPossibleAnswers.map((answer, i) => {
            const isSelected = selectedAnswerIndex === i;
            const isCorrect = i === correctAnswerIndex;
            const borderColor = isSelected
              ? isCorrect
                ? "border-4 border-green-500"
                : "border-4 border-red-500"
              : "border-gray-300";

            const answerColor = isSelected
              ? isCorrect
                ? "text-green-500"
                : "text-red-500"
              : "text-gray-700";

            return (
              <div
                key={i}
                className={`shadow-xl rounded-md mb-5 md:mb-0 cursor-pointer border-2  bg-gray-200 pb-4 md:pb-4 lg:pb-4 ${borderColor}`}
                onClick={() => handleAnswerClick(i)}
              >
                <h1>{String.fromCharCode(65 + i)}.</h1>
                <div className={`items-center`}>
                  <div></div>
                  <div
                    className={`font-extrabold md:text-lg ${answerColor} text-center`}
                  >
                    {answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ScoreModal
        correctAnswers={correctAnswersCount}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

export default Examinee;