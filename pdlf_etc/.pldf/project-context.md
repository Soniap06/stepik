# Project Context

**Project:** StepikIn - Course Platform LMS  
**Repository:** OS_project  
**Version:** 0.2.0-beta  
**Last Update:** 28 апреля 2026 г.  
**Status:** ✅ MVP Ready, Entering Sprint 1

---

## 📊 Stage Status

| Stage | Status | Date | Notes |
|-------|--------|------|-------|
| Design | ✅ Completed | 05.04.2026 | Полный дизайн системы |
| Implementation | ✅ Completed | 15.04.2026 | MVP с core features |
| Integration | ✅ Completed | 28.04.2026 | Git merge upstream, компоненты объединены |
| Bug Fix | ✅ Completed | 28.04.2026 | Bcrypt issue решён, база синхронизирована |
| Stabilization | ⏳ In Progress | 28.04.2026 | Подготовка к Sprint 1 |

---

## 📱 Product Summary

### Что это?
Web-платформа для дистанционного обучения с поддержкой:
- Управления курсами (преподавателем)
- Прохождения курсов (студентами)
- Отслеживания прогресса (в реальном времени)
- Тестирования и практики (в разработке)

### Функционал (MVP - v0.2.0)

#### Для студентов:
- ✅ Login / Registration (имеет 3+ тестовых студента)
- ✅ Dashboard с расписанием курсов
- ✅ Страница Learning для прохождения вопросов
- ✅ Отслеживание прогресса по курсу
- ✅ Statistics страница (подготовлена)
- ✅ Activity страница
- ✅ Тёмный режим

#### Для преподавателей:
- ✅ Teacher Dashboard с обзором студентов
- ✅ Управление студентами (добавление)
- ✅ Создание курсов
- ✅ Просмотр прогресса студентов
- ⏳ Создание тестов (Sprint 1)
- ⏳ Создание карточек (Sprint 2)

### Текущие ограничения:
- ❌ Нет тестов для практики
- ❌ Нет карточек для повторения
- ❌ Нет детальной аналитики
- ❌ Нет мобильной адаптации (в плане)
- ❌ Нет экспорта результатов

---

## 🏗️ Architecture

### Backend
```
FastAPI app (main.py)
├── SQLAlchemy ORM
├── SQLite Database
├── Auth: bcrypt password hashing
├── CORS: localhost:3000
└── Endpoints: 20+ (login, courses, questions, progress, etc.)
```

### Frontend
```
React App
├── React Router (маршруты)
├── Context API (состояние)
├── CSS Modules (стили)
├── 15+ компонентов
└── 5+ страниц
```

### Database Schema
```
users (id, login, hashed_password, role, first_name, last_name)
courses (id, title, description, theory, coding_task, coding_solution, teacher_id)
questions (id, course_id, text)
answers (id, question_id, text, is_correct)
enrollments (student_id, course_id) - m2m
course_progress (student_id, course_id, progress)
student_question_results (id, student_id, question_id, is_correct)
```

---

## 🔧 Tech Stack

- **Backend:** Python 3.14.2 + FastAPI 0.115.0 + SQLAlchemy 2.0.49
- **Frontend:** React + React Router + CSS
- **Database:** SQLite (57KB, 4 тестовых пользователя)
- **Auth:** bcrypt<5 (fixed), passlib
- **Other:** uvicorn, python-dotenv, pydantic

---

## 📂 Source References

| Компонент | Файл | LOC |
|-----------|------|-----|
| Backend Core | backend/app/main.py | 750 |
| Models | backend/app/models.py | 30 |
| Database | backend/app/database.py | 15 |
| Seed Data | backend/seed.py | 40 |
| Frontend Routes | frontend/src/App.jsx | 50 |
| Student Dashboard | frontend/src/pages/Home.jsx | 200 |
| Learning Page | frontend/src/pages/Learning.jsx | 150 |
| Teacher Dashboard | frontend/src/pages/TeacherDashboard.jsx | 180 |
| Components | frontend/src/components/ | 500+ |

---

## 🚀 Recent Changes (28.04.2026)

1. **Git Merge** - подтянуты последние 11 коммитов из upstream/main
   - Новые компоненты (AddStudentModal, CreateCourseModal)
   - Отображение прогресса по курсам
   - Возможность проходить курсы из личного кабинета
   
2. **Bcrypt Fix** - решена критическая проблема с логином
   - Установлен bcrypt<5 в requirements.txt
   - Обновлена база данных в корне проекта
   - Проверена работа teacher/teacher123
   
3. **Documentation** - созданы PLDF файлы для управления разработкой
   - pldf.plan - основной план работ
   - pldf/implementation-plan.md - детальный план спринтов
   - .pldf/planning-context-cache.md - кэш контекста
   - .pldf/memory/progress.json - отслеживание прогресса

---

## 📋 Test Users

```
teacher / teacher123 (role: teacher)
stpkn / password123 (role: student, Мария Степкина)
sfx / password (role: student, София Пескова)
karina / password (role: student, Карина Халикова)
```

---

## ⚠️ Known Issues

| Issue | Status | Severity |
|-------|--------|----------|
| No practice tests | To Do | High |
| No flashcards | To Do | High |
| No detailed analytics | To Do | Medium |
| No mobile responsive | To Do | Medium |
| CORS hardcoded | To Do | Low |
| No rate limiting | To Do | Low |
| No error boundaries | To Do | Low |

---

## 🎯 Next Steps (Sprint 1)

1. Implement Practice Tests
   - Backend: Test, TestQuestion, TestAnswer models
   - Backend: 5+ endpoints for test management
   - Frontend: TestEditor, TestPage, TestResults components
   
2. Expected timeline: 3-4 дня

---

## 📚 Related Files

- Main Plan: [pldf.plan](../../pldf.plan)
- Implementation: [pldf/implementation-plan.md](../implementation-plan.md)
- Progress: [.pldf/memory/progress.json](memory/progress.json)
- UI Design: [.pldf/ui-design.md](ui-design.md)
