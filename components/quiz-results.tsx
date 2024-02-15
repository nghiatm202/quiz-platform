import Button from "@/components/button";

interface QuizResultsProps {
  result: {
    score: number;
    correctAnswers: number;
    wrongAnswers: number;
  };
  questions: { length: number };
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  result,
  questions,
  onRestart,
}) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <h3 className="text-xl font-bold mb-4">Results</h3>
    <h4 className="text-lg mb-2">Overall {result.score}%</h4>
    <p className="mb-2">
      Total Questions: <span className="font-bold">{questions.length}</span>
    </p>
    <p className="mb-2">
      Correct Answers:{" "}
      <span className="font-bold text-green-500">{result.correctAnswers}</span>
    </p>
    <p className="mb-4">
      Wrong Answers:{" "}
      <span className="font-bold text-red-500">{result.wrongAnswers}</span>
    </p>
    <Button onClick={onRestart} className="w-full">
      Restart
    </Button>
  </div>
);

export default QuizResults;
