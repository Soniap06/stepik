# Step 00: MVP Foundation

**Статус:** ✅ Завершён  
**Дата:** 01-28 апреля 2026 г.  
**Версия:** 0.2.0-beta

---

## 📋 Описание

Основной этап разработки: создание MVP с core features для платформы обучения.

## ✅ Выполнено

### Backend (FastAPI)
- ✅ Инициализация FastAPI приложения
- ✅ Подключение SQLAlchemy ORM
- ✅ Создание моделей данных (User, Course, Question, Answer, etc.)
- ✅ Реализация аутентификации (bcrypt + passlib)
- ✅ 20+ endpoints для студентов и преподавателей
- ✅ REST API для управления курсами и вопросами
- ✅ Расчёт прогресса (compute_student_course_progress)
- ✅ CORS middleware для frontend

### Frontend (React)
- ✅ Инициализация React приложения
- ✅ React Router с маршрутизацией
- ✅ Context API для управления состоянием
- ✅ Login страница с аутентификацией
- ✅ Dashboard для студента (Home.jsx)
- ✅ Learning страница для прохождения курсов
- ✅ TeacherDashboard для преподавателя
- ✅ Компоненты: StudentLayout, ThemeToggle, AddStudentModal, CreateCourseModal
- ✅ Тёмный режим (ThemeContext)

### Database
- ✅ SQLite база (course_platform.db)
- ✅ 7 таблиц с корректной схемой
- ✅ 4 тестовых пользователя (1 преподаватель + 3 студента)
- ✅ 3 тестовых курса с вопросами

### Фиксы (28.04.2026)
- ✅ Git merge upstream/main (11 новых коммитов)
- ✅ Решена проблема с bcrypt (установлен bcrypt<5)
- ✅ Синхронизирована база данных
- ✅ Проверена работа логина teacher/teacher123

## 📊 Статистика

| Метрика | Значение |
|---------|----------|
| Backend LOC | ~750 |
| Frontend LOC | ~1620 |
| Итого | 2370 |
| Компоненты | 15+ |
| Endpoints | 20+ |
| Модели BD | 8 |
| Таблицы BD | 7 |

## 🔗 Основные файлы

- `backend/app/main.py` - все endpoints
- `backend/app/models.py` - ORM модели
- `frontend/src/App.jsx` - маршруты
- `frontend/src/pages/` - все страницы
- `course_platform.db` - база данных

## 🚀 Следующий шаг

[Step 01: Tests for Practice](../step-01-tests/README.md)
