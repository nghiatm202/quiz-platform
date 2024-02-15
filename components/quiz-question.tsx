import Accordion from "@/components/accordion";
import Button from "@/components/button";
import cn from "classnames";

interface QuizQuestionProps {
  question: string;
  answers: string[];
  correctAnswer: string;
  hint: string;
  checked: boolean;
  selectedAnswerIndex: number | null;
  accordionOpen: boolean;
  activeQuestion: number;
  totalQuestions: number;
  onAnswerSelected: (answer: string, idx: number) => void;
  onNextQuestion: () => void;
  onToggleAccordion: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answers,
  correctAnswer,
  hint,
  checked,
  selectedAnswerIndex,
  accordionOpen,
  activeQuestion,
  totalQuestions,
  onAnswerSelected,
  onNextQuestion,
  onToggleAccordion,
}) => (
  <>
    <h3 className="font-bold text-lg mb-5">{question}</h3>

    <ul className="mb-10 flex gap-2 flex-col">
      {answers.map((answer, idx) => (
        <li
          key={idx}
          onClick={() => onAnswerSelected(answer, idx)}
          className={cn(
            "flex flex-col text-sm h-16 border cursor-pointer transition-colors px-2 justify-center",
            {
              "border-red-600 text-red-600":
                checked &&
                idx === selectedAnswerIndex &&
                answer !== correctAnswer,
              "border-primary text-primary":
                checked &&
                idx === selectedAnswerIndex &&
                answer === correctAnswer,
            }
          )}
        >
          <span>{answer}</span>

          {checked && idx === selectedAnswerIndex && (
            <span
              className={cn("text-xs", {
                "fade-in-up-animation": answer !== correctAnswer,
              })}
            >
              {answer !== correctAnswer && "Please try again"}
            </span>
          )}
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
      <Button onClick={onNextQuestion} className="w-full">
        {activeQuestion === totalQuestions - 1 ? "Finish" : "Next"}
      </Button>
    ) : (
      <Button
        onClick={onNextQuestion}
        disabled
        variant="disabled"
        className="w-full"
      >
        {activeQuestion === totalQuestions - 1 ? "Finish" : "Next"}
      </Button>
    )}
  </>
);

export default QuizQuestion;
