import Accordion from "@/components/accordion";
import Button from "@/components/button";
import cn from "classnames";

interface QuizQuestionProps {
  question: string;
  answers: string[];
  selectedAnswers: boolean[];
  correctAnswer: string[];
  hint: string;
  checked: boolean;
  showModal: boolean;
  accordionOpen: boolean;
  activeQuestion: number;
  totalQuestions: number;
  onAnswerSelected: (idx: number) => void;
  onToggleAccordion: () => void;
  onSubmit: () => void;
  onCloseModal: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answers,
  selectedAnswers,
  correctAnswer,
  hint,
  checked,
  showModal,
  accordionOpen,
  activeQuestion,
  totalQuestions,
  onAnswerSelected,
  onToggleAccordion,
  onSubmit,
  onCloseModal,
}) => (
  <div>
    <h3 className="font-bold text-lg mb-5">
      {question} {correctAnswer.length > 1 && "(Choose one or more)"}
    </h3>

    <ul className="mb-10 flex gap-2 flex-col">
      {answers.map((answer, idx) => (
        <li
          key={idx}
          onClick={() => onAnswerSelected(idx)}
          className={cn(
            "flex flex-col text-sm h-16 border cursor-pointer transition-colors px-2 justify-center hover:border-gray-600",
            {
              "border-gray-600": checked && selectedAnswers[idx],
            }
          )}
        >
          <span>{answer}</span>
        </li>
      ))}
    </ul>

    <div className="mb-10">
      <Accordion
        isOpen={accordionOpen}
        onToggle={onToggleAccordion}
        content={hint}
      />
    </div>

    {checked ? (
      <Button onClick={onSubmit} className="w-full">
        Submit
      </Button>
    ) : (
      <Button onClick={onSubmit} disabled variant="disabled" className="w-full">
        Submit
      </Button>
    )}

    {showModal && (
      <div className="absolute inset-0 w-full flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white m-4 w-full p-4 rounded-lg shadow-lg">
          <>
            <p className="text-lg font-bold mb-4">
              {selectedAnswers.every(
                (selected, idx) =>
                  selected === correctAnswer.includes(answers[idx])
              )
                ? "Correct Answer!"
                : "Incorrect Answer"}
            </p>
            {selectedAnswers.every(
              (selected, idx) =>
                selected === correctAnswer.includes(answers[idx])
            ) ? (
              <p className="mb-4">You answered correctly!</p>
            ) : (
              <>
                <p className="mb-4">
                  The correct answer is: {correctAnswer.join(", ")}.
                </p>
              </>
            )}
          </>

          <Button onClick={onCloseModal} className="w-full">
            {activeQuestion === totalQuestions ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    )}
  </div>
);

export default QuizQuestion;
