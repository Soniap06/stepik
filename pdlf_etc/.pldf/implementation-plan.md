# 🛠️ План реализации SprepikIn - Implementation Plan

**Версия:** 0.2.0-beta  
**Последнее обновление:** 28 апреля 2026 г.  
**Статус:** MVP готов, начало Sprint 1

---

## 📌 Текущая фаза: Beta Release

Приложение находится в режиме beta (v0.2.0), все core features работают:
- ✅ Аутентификация
- ✅ Управление курсами  
- ✅ Вопросы и ответы
- ✅ Отслеживание прогресса
- ✅ Панели студента и преподавателя

---

## 🎯 Sprint 1: Practice Tests (Tests for Practice)

**Длительность:** 3-4 дня  
**Статус:** Планируется  
**Приоритет:** 🔴 Критический

### Задачи:

#### Backend (app/models.py, app/main.py):
- [ ] Создать модели:
  - `Test` - основной тест
  - `TestQuestion` - вопросы теста (отличаются от обычных)
  - `TestAnswer` - ответы на вопросы теста
  - `StudentTestResult` - результаты сдачи теста студентом
  
- [ ] Создать endpoints:
  - `POST /teacher/{id}/courses/{id}/tests` - создать тест
  - `GET /courses/{id}/tests` - получить тесты курса
  - `GET /student/{id}/courses/{id}/test/{id}` - получить тест для решения
  - `POST /student/{id}/courses/{id}/test/{id}/submit` - отправить ответы теста
  - `GET /student/{id}/courses/{id}/test-results` - просмотр результатов
  
- [ ] Логика расчёта:
  - Оценка за тест (% правильных ответов)
  - Время решения теста
  - Фиксация даты попытки

#### Frontend (frontend/src/):
- [ ] Создать компоненты:
  - `components/TestEditor.jsx` - редактор для создания теста (для преподавателя)
  - `pages/TestPage.jsx` - страница с интерфейсом сдачи теста
  - `components/TestResults.jsx` - отображение результатов теста
  
- [ ] Функциональность:
  - Форма создания теста (с вопросами и ответами)
  - Режим "сдача теста" с вариантами ответов
  - Отображение результатов после сдачи
  - Отслеживание времени решения (опционально)
  - Интеграция в CoursePage.jsx

### Ожидаемый результат:
Преподаватели могут создавать тесты, студенты их проходят, результаты сохраняются и отображаются.

---

## 🎯 Sprint 2: Flashcards (Study Cards)

**Длительность:** 3-4 дня  
**Статус:** Планируется после Sprint 1  
**Приоритет:** 🔴 Критический

### Задачи:

#### Backend (app/models.py, app/main.py):
- [ ] Создать модели:
  - `StudyCard` - карточка (вопрос + ответ)
  - `CardReview` - факт повторения карточки
  - `CardSchedule` - расписание повторений (для spaced repetition)
  
- [ ] Создать endpoints:
  - `POST /teacher/{id}/courses/{id}/cards` - создать карточку
  - `GET /courses/{id}/cards` - получить все карточки курса
  - `GET /student/{id}/cards/due` - получить готовые к повторению
  - `POST /student/{id}/cards/{id}/review` - отметить повторение
  - `GET /student/{id}/cards/stats` - статистика повторений
  
- [ ] Логика:
  - Простая spaced repetition (повтор через 1 день, 3 дня, неделю)
  - Отслеживание даты последнего повторения
  - Вычисление "готовности" карточки к повторению

#### Frontend (frontend/src/):
- [ ] Создать компоненты:
  - `components/FlashcardView.jsx` - отображение карточки с переворотом
  - `pages/FlashcardsPage.jsx` - страница с режимами Learn/Review
  - `components/CardEditor.jsx` - редактор для создания карточек
  - `components/CardStats.jsx` - статистика повторений
  
- [ ] Функциональность:
  - Вид карточки с кнопкой "показать ответ"
  - Режим Learn (все карточки подряд)
  - Режим Review (только готовые к повторению)
  - Интеграция в Learning.jsx или отдельная страница

### Ожидаемый результат:
Студенты могут учить материалы с помощью карточек, система отслеживает повторения.

---

## 🎯 Sprint 3: Advanced Analytics

**Длительность:** 2-3 дня  
**Статус:** Планируется после Sprint 2  
**Приоритет:** 🟠 Средний

### Задачи:
- [ ] История попыток (AttempHistory таблица)
- [ ] Графики прогресса по времени
- [ ] Детальная статистика (время, точность)
- [ ] Экспорт результатов

---

## 📊 Метрики успеха

- **Code Coverage:** ≥ 80%
- **API Response Time:** < 200ms
- **Frontend Lighthouse:** ≥ 90
- **User Satisfaction:** (после бета-тестирования)

---

## 📅 Timeline

| Дата | Событие | Статус |
|------|---------|--------|
| 28.04.2026 | MVP v0.2.0 (git merge, bcrypt fix) | ✅ Done |
| 29-02.05 | Sprint 1: Tests | ⏳ In Progress |
| 03-06.05 | Sprint 2: Flashcards | 📋 Planned |
| 07-09.05 | Sprint 3: Analytics | 📋 Planned |
| 10.05+ | Additional Features | 📋 Planned |

---

## 🔗 Ссылки

- [Progress JSON](./.pldf/memory/progress.json)
- [Project Context](./.pldf/project-context.md)
- [Main Plan](./pldf.plan)
