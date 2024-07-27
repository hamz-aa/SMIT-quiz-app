import { useEffect, useState } from "react";
import axios from "axios";
import RadialChart from "./charts/RadialChart";

const QuizPerformance = () => {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/quizzes")
      .then((response) => {
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          const labels = data.map((quiz) => quiz.title);
          const scores = data.map((quiz) => {
            const totalScore = quiz.questions.reduce(
              (acc, q) => acc + (q.score || 0),
              0
            );
            return totalScore / quiz.questions.length;
          });

          setQuizData({
            labels,
            datasets: [
              {
                label: "Quiz Performance",
                data: scores,
                backgroundColor: [
                  "rgba(44, 62, 80, 0.6)",
                  "rgba(39, 174, 96, 0.6)",
                  "rgba(142, 68, 173, 0.6)",
                  "rgba(41, 128, 185, 0.6)",
                  "rgba(243, 156, 18, 0.6)",
                  "rgba(192, 57, 43, 0.6)",
                ],
                borderColor: [
                  "rgba(44, 62, 80, 1)",
                  "rgba(39, 174, 96, 1)",
                  "rgba(142, 68, 173, 1)",
                  "rgba(41, 128, 185, 1)",
                  "rgba(243, 156, 18, 1)",
                  "rgba(192, 57, 43, 1)",
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the quiz data!", error);
      });
  }, []);

  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Quiz Performance</h2>
      {quizData ? (
        <RadialChart data={quizData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizPerformance;
