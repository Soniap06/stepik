# Step 02: Flashcards (Study Cards)

**Статус:** 📋 Планируется  
**Дата начала:** После Step 01  
**Срок:** 3-4 дня  
**Версия:** 0.4.0

---

## 📋 Описание

Реализация системы карточек для повторения материала. Студенты учат материалы, система отслеживает повторения по алгоритму Spaced Repetition.

## ⏳ To Do

### Этап 1: Backend Models & Spaced Repetition Logic (1-1.5 дня)

- [ ] Создать модели в `app/models.py`:
  ```python
  class StudyCard(Base):
      __tablename__ = "study_cards"
      id = Column(Integer, primary_key=True)
      course_id = Column(Integer, ForeignKey("courses.id"))
      front = Column(String, nullable=False)  # вопрос/термин
      back = Column(Text, nullable=False)  # ответ/определение
      created_at = Column(DateTime, default=datetime.utcnow)
  
  class CardReview(Base):
      __tablename__ = "card_reviews"
      id = Column(Integer, primary_key=True)
      student_id = Column(Integer, ForeignKey("users.id"))
      card_id = Column(Integer, ForeignKey("study_cards.id"))
      last_reviewed = Column(DateTime)
      interval_days = Column(Integer, default=1)  # дни до следующего повтора
      ease_factor = Column(Float, default=2.5)  # сложность (для Supermemo)
      repetitions = Column(Integer, default=0)
  ```

- [ ] Реализовать алгоритм Spaced Repetition:
  - Первое повторение: 1 день
  - Второе: 3 дня
  - Третье: 7 дней
  - Далее: удвоение интервала
  
- [ ] Функции в `app/utils.py`:
  - `get_due_cards()` - получить карточки готовые к повторению
  - `schedule_next_review()` - запланировать следующее повторение
  - `calculate_ease()` - пересчитать сложность карточки

### Этап 2: Backend API Endpoints (1 день)

- [ ] `POST /teacher/{teacher_id}/courses/{course_id}/cards` - создать карточку
- [ ] `GET /courses/{course_id}/cards` - все карточки курса
- [ ] `GET /student/{student_id}/cards/due` - готовые к повторению
- [ ] `POST /student/{student_id}/cards/{card_id}/review` - отметить повторение
- [ ] `GET /student/{student_id}/cards/stats` - статистика по каждой карточке

### Этап 3: Frontend Components (1-1.5 дня)

- [ ] `components/FlashcardView.jsx` - карточка с переворотом
- [ ] `pages/FlashcardsPage.jsx` - страница с режимами Learn/Review
- [ ] `components/CardEditor.jsx` - редактор для создания карточек
- [ ] `components/CardStats.jsx` - статистика повторений
- [ ] Режимы:
  - Learn Mode - все карточки подряд
  - Review Mode - только готовые к повторению
  - Stats Mode - просмотр истории

### Этап 4: Integration & Testing (0.5 дня)

- [ ] Интеграция в `pages/Learning.jsx`
- [ ] Или отдельная страница `/cards`
- [ ] Тестирование Spaced Repetition алгоритма

## 🎯 Ожидаемый результат

- ✅ Преподаватели создают карточки
- ✅ Студенты учат материалы (режим Learn)
- ✅ Студенты повторяют (режим Review)
- ✅ Система отслеживает прогресс повторений
- ✅ Алгоритм правильно вычисляет интервалы

## 📝 Заметки

- **Spaced Repetition** - ключевой алгоритм для эффективного обучения
- Можно использовать библиотеку `fsrs.py` для более сложного алгоритма
- Визуализация: прогресс по каждой карточке, календарь повторений
- Мобильная версия критична для карточек (пользуются везде)

## 🔗 Файлы для изменения

- `backend/app/models.py` - добавить модели
- `backend/app/main.py` - добавить endpoints
- `backend/app/utils.py` - алгоритм Spaced Repetition
- `frontend/src/pages/Learning.jsx` - интеграция
- `frontend/src/components/` - новые компоненты

## 🚀 Следующий шаг

[Step 03: Analytics & Advanced Features](../step-03-analytics/README.md)
