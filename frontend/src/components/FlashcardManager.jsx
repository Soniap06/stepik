import React, { useState, useEffect } from "react";
import { API_BASE } from "../api/config";
import "../styles/flashcard.css";

export default function FlashcardManager({ courseId, teacherId, courseName }) {
  const [cards, setCards] = useState([{ question: "", answer: "" }]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadFlashcards();
  }, [courseId]);

  const loadFlashcards = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE}/courses/${courseId}/flashcards`
      );
      if (!response.ok) throw new Error("Ошибка загрузки");

      const data = await response.json();
      setCards(data.cards?.length > 0 ? data.cards : [{ question: "", answer: "" }]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки карточек"
      );
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

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

    setSaving(true);

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
      setSuccess(`✅ ${result.message} (${result.count} карточек)`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "16px" }}>Загрузка карточек...</div>;
  }

  return (
    <div className="flashcard-manager">
      <div className="flashcard-editor">
        <div className="flashcard-editor__header">
          <h3 className="flashcard-editor__title">Управление карточками</h3>
          <p className="flashcard-editor__subtitle">{courseName}</p>
        </div>

        {error && <div className="flashcard-editor__error">{error}</div>}
        {success && (
          <div style={{
            padding: "12px 16px",
            background: "#10b981",
            color: "white",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
            fontWeight: "500",
          }}>
            {success}
          </div>
        )}

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
                    onChange={(e) =>
                      updateCard(index, "answer", e.target.value)
                    }
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
          <span style={{ color: "var(--fc-text-secondary)", fontSize: "12px" }}>
            {cards.length} карточек
          </span>
          <button
            type="button"
            className="flashcard-editor__save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Сохранение..." : "Сохранить карточки"}
          </button>
        </div>
      </div>
    </div>
  );
}
