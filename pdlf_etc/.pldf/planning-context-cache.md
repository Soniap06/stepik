# 📋 Planning Context Cache

**Дата создания:** 28 апреля 2026 г.  
**Статус:** Active  
**Режим:** initial mode

---

## 🎯 Главная цель проекта

Создать полнофункциональную платформу дистанционного обучения (LMS) с поддержкой:
- Управления курсами и студентами
- Тестирования и практики
- Отслеживания прогресса
- Интерактивных элементов обучения (карточки, вопросы)

---

## 📌 Ключевые контексты

### Стек технологий
- **Backend:** FastAPI (Python) + SQLAlchemy ORM + SQLite
- **Frontend:** React + React Router + CSS
- **Auth:** bcrypt (пароли), локальное хранилище (токены)
- **Database:** SQLite с готовыми данными для 4 пользователей

### Текущее состояние (v0.2.0-beta)
- MVP полностью функционален
- Все core features работают
- Проблема bcrypt решена (bcrypt<5)
- База данных синхронизирована

### Архитектура БД
```
User (преподаватель + студенты)
├── Course (courses)
│   ├── Question
│   │   └── Answer
│   ├── CourseProgress
│   └── StudentQuestionResult (результаты ответов)
└── Enrolled (m2m: студент → курс)
```

---

## 🚀 Приоритеты разработки

1. **Тесты для практики** - необходимы для полноценной платформы
2. **Карточки для повторения** - key feature для обучения
3. **Аналитика и прогресс** - поддержка преподавателей
4. **UI/UX улучшения** - адаптивность, мобильность
5. **Оптимизация** - масштабируемость, performance

---

## 🛠️ Технические ограничения и долги

### Текущие ограничения:
- CORS только для localhost (нужно расширить для production)
- Нет rate limiting на endpoints
- Нет пагинации для больших наборов
- Нет логирования на backend
- Нет обработки ошибок в frontend (нет Error Boundary)

### Решённые проблемы:
- ✅ bcrypt: установлен bcrypt<5 в requirements.txt
- ✅ База данных: скопирована правильная DB в корень проекта
- ✅ Git: подтянуты последние изменения из upstream

---

## 📁 Структура проекта (для быстрого навигации)

```
OS_project/
├── backend/
│   ├── app/
│   │   ├── main.py (750 строк - все endpoints)
│   │   ├── models.py (модели ORM)
│   │   ├── database.py (подключение к БД)
│   │   ├── schemas.py (Pydantic models)
│   │   └── utils.py (утилиты)
│   ├── seed.py (инициализация тестовых данных)
│   └── requirements.txt (зависимости)
│
├── frontend/
│   └── src/
│       ├── pages/ (Login, Home, Learning, Statistics, etc.)
│       ├── components/ (StudentLayout, ThemeToggle, etc.)
│       ├── context/ (ThemeContext, StudentDataContext)
│       ├── App.jsx (маршруты)
│       └── index.jsx (точка входа)
│
├── pldf.plan (этот файл - план работ)
├── .pldf/ (PLDF система для планирования)
│   ├── memory/progress.json (отслеживание прогресса)
│   ├── project-context.md (актуальный контекст)
│   ├── planning-context-cache.md (этот файл)
│   └── steps/ (шаги реализации)
│
├── pldf/
│   └── implementation-plan.md (детальный план спринтов)
│
└── course_platform.db (база данных с тестовыми данными)
```

---

## 👥 Тестовые пользователи

| Login | Password | Role | Status |
|-------|----------|------|--------|
| teacher | teacher123 | teacher | ✅ Работает |
| stpkn | password123 | student | ✅ Работает |
| sfx | (пароль) | student | ✅ Работает |
| karina | (пароль) | student | ✅ Работает |

---

## 🎯 Что нужно помнить при разработке

1. **Тесты** отличаются от обычных вопросов - нужна отдельная таблица
2. **Spaced Repetition** для карточек - алгоритм повторений по времени
3. **Progress** уже отслеживается, но нужна история попыток
4. **Frontend** использует Context API для управления состоянием
5. **Backend** - все endpoints в одном файле main.py (можно рефакторить)

---

## 📚 Ссылки на документацию

- [Fast API Docs](https://fastapi.tiangolo.com/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [React Documentation](https://react.dev/)
- [Spaced Repetition Algorithm](https://en.wikipedia.org/wiki/Spaced_repetition)

---

## ✅ Чек-лист перед разработкой новой фичи

- [ ] Прочитана эта кэш-файл
- [ ] Понимаю архитектуру БД
- [ ] Знаю какие модели нужно добавить
- [ ] Спланировал endpoints
- [ ] Спланировал React компоненты
- [ ] Обновлю progress.json после завершения
