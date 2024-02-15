"use client";

import Loading from "@/components/loading";
import QuizQuestion from "@/components/quiz-question";
import QuizResults from "@/components/quiz-results";
import { useEffect, useState } from "react";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
  hint: string;
}

interface Result {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const QuizPage = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<Result>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/quizzes");
        const data = await res.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    })();
  }, []);

  const onToggleAccordion = () => {
    setAccordionOpen((prev) => !prev);
  };

  const onAnswerSelected = (answer: string, idx: number) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const onNextQuestion = () => {
    setAccordionOpen(false);
    setSelectedAnswerIndex(null);

    const maxScore = 100;
    const questionWeight = maxScore / questions.length;
    const questionScore = selectedAnswer ? questionWeight : 0;

    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: Math.min(prev.score + questionScore, maxScore),
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  const onRestart = () => {
    window.location.reload();
  };

  if (
    !questions ||
    !questions.length ||
    activeQuestion < 0 ||
    activeQuestion >= questions.length
  ) {
    return <Loading />;
  }

  const { question, answers, correctAnswer, hint } = questions[activeQuestion];
  const progressPercent = ((activeQuestion + 1) / questions.length) * 100;

  return (
    <div className="pt-4">
      {!showResult && (
        <>
          <div className="h-1 w-full absolute top-0 left-0 bg-neutral-200 dark:bg-neutral-600">
            <div
              className="h-1 bg-primary"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <h2 className="text-primary font-bold pt-6">Q{activeQuestion + 1}</h2>
        </>
      )}

      {!showResult ? (
        <QuizQuestion
          question={question}
          answers={answers}
          correctAnswer={correctAnswer}
          hint={hint}
          checked={checked}
          selectedAnswerIndex={selectedAnswerIndex}
          onAnswerSelected={onAnswerSelected}
          onNextQuestion={onNextQuestion}
          accordionOpen={accordionOpen}
          onToggleAccordion={onToggleAccordion}
          activeQuestion={activeQuestion}
          totalQuestions={questions.length}
        />
      ) : (
        <QuizResults
          result={result}
          questions={questions}
          onRestart={onRestart}
        />
      )}
    </div>
  );
};

export default QuizPage;
