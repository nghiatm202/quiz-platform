import { NextResponse } from "next/server";

const quizzes = [
  {
    title: "JavaScript Fundamentals",
    totalQuestions: 5,
    questions: [
      {
        id: 1,
        question: "What is closure in JavaScript?",
        answers: [
          "A function inside another function that has access to its parent scope",
          "A way to close a browser window",
          "A built-in method to close files",
          "An event in JavaScript",
        ],
        correctAnswer:
          "A function inside another function that has access to its parent scope",
        hint: "It helps in preserving the scope chain",
      },
      {
        id: 2,
        question: "What is the output of typeof null?",
        answers: ["object", "null", "undefined", "string"],
        correctAnswer: "object",
        hint: "Despite being a primitive type, typeof null returns object",
      },
      {
        id: 3,
        question: "What does the '===' operator do in JavaScript?",
        answers: [
          "Checks for equality without type conversion",
          "Assigns a value to a variable",
          "Performs strict type conversion",
          "Checks for equality with type conversion",
        ],
        correctAnswer: "Checks for equality without type conversion",
        hint: "It's the strict equality operator",
      },
      {
        id: 4,
        question: "What is event bubbling in JavaScript?",
        answers: [
          "The propagation of events from child to parent elements",
          "The propagation of events from parent to child elements",
          "Stopping the propagation of events",
          "Handling events asynchronously",
        ],
        correctAnswer:
          "The propagation of events from child to parent elements",
        hint: "Events bubble up from the target element to its ancestors",
      },
      {
        id: 5,
        question:
          "What is the purpose of the 'use strict' directive in JavaScript?",
        answers: [
          "To enforce stricter syntax rules",
          "To enable ECMAScript 6 features",
          "To restrict the use of certain keywords",
          "To allow asynchronous code execution",
        ],
        correctAnswer: "To enforce stricter syntax rules",
        hint: "It helps to write cleaner and more secure code",
      },
    ],
  },
  {
    title: "Data Structures and Algorithms",
    totalQuestions: 5,
    questions: [
      {
        id: 1,
        question: "What is the time complexity of binary search?",
        answers: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        correctAnswer: "O(log n)",
        hint: "It halves the search space at each step",
      },
      {
        id: 2,
        question:
          "What data structure is typically used for implementing LIFO behavior?",
        answers: ["Queue", "Heap", "Stack", "Array"],
        correctAnswer: "Stack",
        hint: "Think about the Last-In-First-Out principle",
      },
      {
        id: 3,
        question: "What is the purpose of a hash table?",
        answers: [
          "To store data in a sorted order",
          "To efficiently search, insert, and delete data",
          "To implement recursive algorithms",
          "To perform arithmetic operations",
        ],
        correctAnswer: "To efficiently search, insert, and delete data",
        hint: "It offers constant-time operations for these operations on average",
      },
      {
        id: 4,
        question:
          "What is the main advantage of using a linked list over an array?",
        answers: [
          "Faster random access",
          "Constant-time insertion and deletion at any position",
          "Better cache locality",
          "Lower memory consumption",
        ],
        correctAnswer: "Constant-time insertion and deletion at any position",
        hint: "Linked lists have dynamic memory allocation and can grow without resizing",
      },
      {
        id: 5,
        question: "What is a priority queue?",
        answers: [
          "A queue that dequeues elements based on their arrival time",
          "A queue where elements are arranged in random order",
          "A queue where elements are arranged based on their priority",
          "A queue that allows duplicate elements",
        ],
        correctAnswer:
          "A queue where elements are arranged based on their priority",
        hint: "Higher priority elements are dequeued before lower priority ones",
      },
    ],
  },
  // Add more collections as needed
];

function getRandomQuiz() {
  const randomIndex = Math.floor(Math.random() * quizzes.length);
  return quizzes[randomIndex];
}

export async function GET() {
  const randomQuiz = getRandomQuiz();

  return NextResponse.json(randomQuiz);
}
