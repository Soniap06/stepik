# Step 01: Practice Tests

**Статус:** 📋 Планируется  
**Дата начала:** 29 апреля 2026 г.  
**Срок:** 3-4 дня  
**Версия:** 0.3.0

---

## � Связь с Code Execution

Tests используют систему CodeSubmission для проверки:

```
Course.coding_task ← Преподаватель пишет задание
Course.test_cases ← Тесты для проверки кода
    ↓
Student пишет код в CodeEditor
    ↓
run_tests() запускает код против test_cases
    ↓
CodeSubmission сохраняет результаты
    ↓
StudentTestResult проверяет результаты (если тесты прошли)
```

**Важно:** CodeSubmission должна быть реализована ДО tests (Этап 0)

## 📋 Описание

## ⏳ To Do

### Этап 0: Code Execution Engine (НОВОЕ! - 0.5 дня)

⚠️ **Это нужно сделать ДО тестов**, потому что тесты будут использовать систему выполнения кода

- [ ] Добавить модель `CodeSubmission` в `app/models.py`:
  - Хранение кода студента
  - Результаты тестов
  - История попыток
  
- [ ] Реализовать `run_tests()` в `app/utils.py`:
  - Запуск Python кода в изолированной среде
  - Сравнение output с expected
  - Обработка ошибок и timeouts
  
- [ ] Endpoints для кода:
  - `POST /student/{id}/courses/{id}/submit-code` - отправить код
  - `GET /courses/{id}/coding` - получить задание и тесты
  - `GET /student/{id}/courses/{id}/submissions` - история попыток
  - `POST /teacher/{id}/courses/{id}/tests/update` - обновить тесты
  
- [ ] Frontend компонент `CodeEditor.jsx`:
  - Текстовое поле для кода
  - Кнопка "Отправить"
  - Отображение результатов тестов
  - История попыток

📖 **Подробный гайд:** см. `/pldf.implement`

### Этап 1: Backend Models & Database (1 день)

- [ ] Создать модели в `app/models.py`:
  ```python
  class Test(Base):
      __tablename__ = "tests"
      id = Column(Integer, primary_key=True)
      course_id = Column(Integer, ForeignKey("courses.id"))
      title = Column(String, nullable=False)
      description = Column(Text)
      time_limit = Column(Integer, nullable=True)  # в минутах
      created_at = Column(DateTime, default=datetime.utcnow)
  
  class TestQuestion(Base):
      __tablename__ = "test_questions"
      id = Column(Integer, primary_key=True)
      test_id = Column(Integer, ForeignKey("tests.id"))
      text = Column(String, nullable=False)
      order = Column(Integer)
  
  class TestAnswer(Base):
      __tablename__ = "test_answers"
      id = Column(Integer, primary_key=True)
      test_question_id = Column(Integer, ForeignKey("test_questions.id"))
      text = Column(String, nullable=False)
      is_correct = Column(Boolean, default=False)
  
  class StudentTestResult(Base):
      __tablename__ = "student_test_results"
      id = Column(Integer, primary_key=True)
      student_id = Column(Integer, ForeignKey("users.id"))
      test_id = Column(Integer, ForeignKey("tests.id"))
      score = Column(Integer)  # 0-100
      submitted_at = Column(DateTime, default=datetime.utcnow)
  ```

- [ ] Миграция БД (Alembic или ручная ALTER TABLE)

### Этап 2: Backend API Endpoints (1-1.5 дня)

- [ ] `POST /teacher/{teacher_id}/courses/{course_id}/tests` - создать тест
- [ ] `GET /courses/{course_id}/tests` - список тестов курса
- [ ] `GET /student/{student_id}/courses/{course_id}/test/{test_id}` - получить тест для решения
- [ ] `POST /student/{student_id}/courses/{course_id}/test/{test_id}/submit` - сдать тест
- [ ] `GET /student/{student_id}/test-results` - все результаты студента
- [ ] `GET /teacher/{teacher_id}/test-results` - все результаты для преподавателя

### Этап 3: Frontend Components (1-1.5 дня)

- [ ] `components/TestEditor.jsx` - форма создания теста
- [ ] `pages/TestPage.jsx` - страница с интерфейсом решения теста
- [ ] `components/TestResults.jsx` - отображение результатов
- [ ] Интеграция в `pages/CoursePage.jsx` (вкладка Tests)

### Этап 4: Testing & QA (0.5 дня)

- [ ] Ручное тестирование функционала
- [ ] Проверка edge cases (неправильные ответы, таймер истёк)
- [ ] Исправление багов

## 🎯 Ожидаемый результат

- ✅ Преподаватели могут создавать тесты
- ✅ Студенты видят тесты в курсе
- ✅ Студенты могут проходить тесты
- ✅ Результаты сохраняются и отображаются
- ✅ Оценка считается корректно

## 📝 Заметки

- Тесты отличаются от обычных вопросов (`Question`)
- Можно добавить таймер (опционально)
- Результаты должны сохраняться со временем решения
- Нужна валидация на backend (проверка ответов)

## 🔗 Файлы для изменения

- `backend/app/models.py` - добавить модели
- `backend/app/main.py` - добавить endpoints
- `frontend/src/components/` - новые компоненты
- `frontend/src/pages/CoursePage.jsx` - интеграция

## 🚀 Следующий шаг

[Step 02: Flashcards](../step-02-flashcards/README.md)
