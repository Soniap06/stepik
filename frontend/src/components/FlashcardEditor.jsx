import React, { useState } from "react";
import { API_BASE } from "../api/config";
import "../styles/flashcard.css";

export default function FlashcardEditor({ courseId, teacherId, onClose, onSuccess }) {
  const [cards, setCards] = useState([{ question: "", answer: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };

  const removeCard = (index) => {
    if (cards.length > 1) {
      setCards(cards.filter((_, i) => i !== index));
    }
  };

  const updateCard = (index, field, value) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Валидация
    if (cards.length === 0) {
      setError("Добавьте минимум одну карточку");
      return;
    }

    const validCards = cards.every(
      (card) => card.question.trim() && card.answer.trim()
    );
    if (!validCards) {
      setError("Заполните вопрос и ответ для каждой карточки");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/teacher/${teacherId}/courses/${courseId}/flashcards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cards: cards.map((card) => ({
              question: card.question.trim(),
              answer: card.answer.trim(),
            })),
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const result = await response.json();
      onSuccess && onSuccess(result);
      onClose && onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения карточек");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flashcard-editor">
      <form onSubmit={handleSubmit}>
        <div className="flashcard-editor__header">
          <h3 className="flashcard-editor__title">Создание карточек для запоминания</h3>
          <p className="flashcard-editor__subtitle">
            Добавьте вопрос и ответ для каждой карточки
          </p>
        </div>

        {error && <div className="flashcard-editor__error">{error}</div>}

        <div className="flashcard-editor__cards">
          {cards.map((card, index) => (
            <div key={index} className="flashcard-editor__card-row">
              <div className="flashcard-editor__card-number">{index + 1}</div>
              <div className="flashcard-editor__fields">
                <div className="flashcard-editor__field">
                  <label className="flashcard-editor__label">Вопрос</label>
                  <textarea
                    className="flashcard-editor__textarea"
                    value={card.question}
                    onChange={(e) =>
                      updateCard(index, "question", e.target.value)
                    }
                    placeholder="Введите вопрос..."
                    rows="2"
                  />
                </div>
                <div className="flashcard-editor__field">
                  <label className="flashcard-editor__label">Ответ</label>
                  <textarea
                    className="flashcard-editor__textarea"
                    value={card.answer}
                    onChange={(e) => updateCard(index, "answer", e.target.value)}
                    placeholder="Введите ответ..."
                    rows="2"
                  />
                </div>
              </div>
              <button
                type="button"
                className="flashcard-editor__remove-btn"
                onClick={() => removeCard(index)}
                disabled={cards.length === 1}
                title="Удалить карточку"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ))}
        </div>

        <div className="flashcard-editor__actions">
          <button
            type="button"
            className="flashcard-editor__add-btn"
            onClick={addCard}
          >
            <span className="material-symbols-outlined">add</span>
            Добавить карточку
          </button>
        </div>

        <div className="flashcard-editor__footer">
          <button
            type="button"
            className="flashcard-editor__cancel-btn"
            onClick={() => onClose && onClose()}
            disabled={loading}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="flashcard-editor__save-btn"
            disabled={loading}
          >
            {loading ? "Сохранение..." : `Сохранить (${cards.length})`}
          </button>
        </div>
      </form>
    </div>
  );
}
