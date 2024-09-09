import Confetti from "react-confetti";
import score from "../assets/images/score-bg.svg";
import { getScoreMessage } from "../utils/scoreMessage";
import { useNavigate } from "react-router-dom";

const ScoreModal = ({ correctAnswers, showModal, setShowModal }) => {
  const message = getScoreMessage(correctAnswers);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      {showModal && (
        <>
          {correctAnswers > 0 && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={500}
              gravity={0.1}
            />
          )}
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-md mx-5 my-6 md:h-1/2 ">
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-center justify-center p-5 border-solid border-gray-300 rounded-t">
                  <img
                    src={score}
                    alt="score"
                    className="absolute top-0 left-0 h-full z-1 w-[350px] sm:w-full mx-auto right-0 "
                  />
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none z-10"
                    onClick={() => handleCloseModal()}
                  >
                    <span className="text-black text-xl h-6 w-6 block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/* Body */}
                <div className="relative p-6 flex-auto md:mt-10 mb-5 xl:mx-auto">
                  <div className="text-center">
                    <p className="text-xl mb-4">You've completed the quiz.</p>
                    <p className="text-2xl font-semibold md:my-5 ">{message}</p>
                    <p className="text-3xl font-extrabold text-green-600">
                      Your Score: {correctAnswers}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default ScoreModal;
