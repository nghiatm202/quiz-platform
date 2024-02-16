"use client";

import Loading from "@/components/loading";
import QuizQuestion from "@/components/quiz-question";
import QuizResults from "@/components/quiz-results";
import { useEffect, useState } from "react";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string[];
  hint: string;
}

interface Result {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const QuizPage = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<boolean[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<Result>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/quizzes");
        const data = await res.json();
        setQuestions(data.questions);
        setSelectedAnswers(
          new Array(data.questions[0].answers.length).fill(false)
        );
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    })();
  }, []);

  const onToggleAccordion = () => {
    setAccordionOpen((prev) => !prev);
  };

  const onAnswerSelected = (idx: number) => {
    setChecked(true);

    const newSelectedAnswers = [...selectedAnswers];

    if (correctAnswer.length === 1) {
      newSelectedAnswers.fill(false);
      newSelectedAnswers[idx] = true;
    } else {
      newSelectedAnswers[idx] = !newSelectedAnswers[idx];
    }

    setSelectedAnswers(newSelectedAnswers);
  };

  const onSubmit = () => {
    setShowModal(true);
  };

  const onNextQuestion = () => {
    setAccordionOpen(false);
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers.fill(false);
    setSelectedAnswers(newSelectedAnswers);

    const maxScore = 100;
    const questionWeight = maxScore / questions.length;
    const isCorrect = selectedAnswers.every(
      (selected, idx) => selected === correctAnswer.includes(answers[idx])
    );

    setResult((prev) => ({
      ...prev,
      score: isCorrect
        ? Math.round((prev.score + questionWeight) * 10) / 10
        : prev.score,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: isCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1,
    }));

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  const onCloseModal = () => {
    setShowModal(false);
    onNextQuestion();
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
          <div className="h-1 w-full z-[60] absolute top-0 left-0 bg-neutral-200 dark:bg-neutral-600">
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
          hint={hint}
          totalQuestions={questions.length - 1}
          accordionOpen={accordionOpen}
          selectedAnswers={selectedAnswers}
          correctAnswer={correctAnswer}
          showModal={showModal}
          checked={checked}
          activeQuestion={activeQuestion}
          onAnswerSelected={onAnswerSelected}
          onCloseModal={onCloseModal}
          onSubmit={onSubmit}
          onToggleAccordion={onToggleAccordion}
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
