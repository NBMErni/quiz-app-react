import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/Header/Header";
import QuestionModal from "../../features/QuestionModal";
import axios from "axios";

const AdminDashboard = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch quizzes
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}QuizApp`);
      setQuestions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      answer: "",
      listOfPossibleAnswers: ["", "", "", ""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "listOfPossibleAnswers",
  });

  const handleCreateQuestion = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}QuizApp`, data);
      setQuestions([...questions, response.data]);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const handleUpdateQuestion = async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}QuizApp/${id}`, data);
      setQuestions(questions.map((q) => (q.quizId === id ? response.data : q)));

      fetchQuizzes();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}QuizApp/${id}`);
        setQuestions(questions.filter((q) => q.quizId !== id));
        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (currentQuestionId) {
        await handleUpdateQuestion(currentQuestionId, data);
        setCurrentQuestionId(null);
      } else {
        await handleCreateQuestion(data);
      }
      reset();
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleEditQuestion = (id) => {
    console.log(id);
    const questionToEdit = questions.find((q) => q.quizId === id);
    if (questionToEdit) {
      setValue("question", questionToEdit.question);
      setValue("answer", questionToEdit.answer);
      questionToEdit.listOfPossibleAnswers.forEach((answer, index) => {
        setValue(`listOfPossibleAnswers.${index}`, answer);
      });
      setCurrentQuestionId(id);
      setShowModal(true);
    } else {
      console.error("Question not found:", id);
    }
  };

  return (
    <>
      <Header />
      <div className="h-full sm:h-full md:h-full lg:h-screen">
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

          <div className="flex justify-around items-center">
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                setCurrentQuestionId(null);
                reset();
                setShowModal(true);
              }}
            >
              Add Question
            </button>
            <Link
              to="/examinee"
              className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
            >
              Take Exam
            </Link>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Questions List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {questions.map((q, i) => (
                <div key={i} className="p-4 border border-gray-300 rounded">
                  <div className="mb-2">
                    <strong>Question:</strong> {q.question}
                  </div>
                  <div className="mb-2">
                    <strong>Answer:</strong> {q.answer}
                  </div>
                  <div className="mb-2">
                    <strong>Possible Answers:</strong>{" "}
                    {q.listOfPossibleAnswers
                      ? q.listOfPossibleAnswers.join(", ")
                      : "N/A"}
                  </div>
                  <button
                    onClick={() => handleEditQuestion(q.quizId)}
                    className="bg-amber-400 text-white active:bg-amber-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(q.quizId)}
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <QuestionModal
        showModal={showModal}
        setShowModal={setShowModal}
        currentQuestionId={currentQuestionId}
        setValue={setValue}
        reset={reset}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        fields={fields}
        append={append}
        remove={remove}
        control={control}
      />
    </>
  );
};

export default AdminDashboard;
