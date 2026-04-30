#!/bin/bash
# Flashcard Feature Testing Guide
# This script demonstrates how to test the flashcard feature

echo "=== Flashcard Feature Testing Guide ==="
echo ""
echo "Prerequisites:"
echo "- Backend running at http://127.0.0.1:8000"
echo "- Frontend running at http://127.0.0.1:3000"
echo "- Student and Teacher accounts created"
echo ""

API_BASE="http://127.0.0.1:8000"
TEACHER_ID=1  # Replace with your teacher ID
STUDENT_ID=2  # Replace with your student ID
COURSE_ID=1   # Replace with your course ID

echo "=== Step 1: Create Flashcards ==="
echo "POST /teacher/$TEACHER_ID/courses/$COURSE_ID/flashcards"
echo ""

curl -X POST "$API_BASE/teacher/$TEACHER_ID/courses/$COURSE_ID/flashcards" \
  -H "Content-Type: application/json" \
  -d '{
    "cards": [
      {
        "question": "Что такое переменная в программировании?",
        "answer": "Переменная - это именованное место в памяти компьютера, которое хранит значение данных"
      },
      {
        "question": "Какие основные типы данных в Python?",
        "answer": "int (целое число), float (число с плавающей точкой), str (строка), bool (логическое значение), list (список)"
      },
      {
        "question": "Что такое функция?",
        "answer": "Функция - это блок кода, который выполняет определённую задачу и может быть вызван множество раз"
      }
    ]
  }'

echo ""
echo ""
echo "=== Step 2: Retrieve Flashcards ==="
echo "GET /courses/$COURSE_ID/flashcards"
echo ""

curl "$API_BASE/courses/$COURSE_ID/flashcards"

echo ""
echo ""
echo "=== Step 3: Student Studies Flashcards ==="
echo "1. Open browser and navigate to course page"
echo "2. Scroll to 'Карточки для запоминания' section"
echo "3. Click cards to flip and reveal answers"
echo "4. Select confidence level (Нужно учить / Почти там / Знаю!)"
echo ""

echo "=== Step 4: Save Flashcard Progress ==="
echo "POST /student/$STUDENT_ID/courses/$COURSE_ID/flashcard-progress"
echo ""

curl -X POST "$API_BASE/student/$STUDENT_ID/courses/$COURSE_ID/flashcard-progress" \
  -H "Content-Type: application/json" \
  -d '{
    "card_index": 0,
    "confidence": "mastered"
  }'

echo ""
echo ""
echo "=== Step 5: Retrieve Student Progress ==="
echo "GET /student/$STUDENT_ID/courses/$COURSE_ID/flashcard-progress"
echo ""

curl "$API_BASE/student/$STUDENT_ID/courses/$COURSE_ID/flashcard-progress"

echo ""
echo ""
echo "=== Testing Complete ==="
echo ""
echo "Frontend Testing Checklist:"
echo "☐ Flashcards appear in course page"
echo "☐ Cards flip smoothly with animation"
echo "☐ Progress bar updates correctly"
echo "☐ Statistics show correct counts"
echo "☐ Confidence buttons work"
echo "☐ Navigation arrows work"
echo "☐ Light theme displays correctly"
echo "☐ Dark theme displays correctly"
echo "☐ Mobile responsive on small screens"
echo ""
