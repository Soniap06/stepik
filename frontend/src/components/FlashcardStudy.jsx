import React, { useState, useEffect } from "react";
import { API_BASE } from "../api/config";
import "../styles/flashcard.css";

export default function FlashcardStudy({ courseId, studentId }) {
  const [cards, setCards] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    loadFlashcards();
  }, [courseId]);

  const loadFlashcards = async () => {
    try {
      setLoading(true);
      const [cardsRes, progressRes] = await Promise.all([
        fetch(`${API_BASE}/courses/${courseId}/flashcards`),
        fetch(
          `${API_BASE}/student/${studentId}/courses/${courseId}/flashcard-progress`
        ),
      ]);

      if (!cardsRes.ok) throw new Error("Ошибка загрузки карточек");
      if (!progressRes.ok) throw new Error("Ошибка загрузки прогресса");

      const cardsData = await cardsRes.json();
      const progressData = await progressRes.json();

      setCards(cardsData.cards || []);

      // Преобразовать массив прогресса в объект
      const progressMap = {};
      progressData.progress?.forEach((p) => {
        progressMap[p.card_index] = p.confidence;
      });
      setProgress(progressMap);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки карточек"
      );
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (confidence) => {
    try {
      const res = await fetch(
        `${API_BASE}/student/${studentId}/courses/${courseId}/flashcard-progress`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            card_index: currentIndex,
            confidence,
          }),
        }
      );

      if (!res.ok) throw new Error(await res.text());

      setProgress((prev) => ({
        ...prev,
        [currentIndex]: confidence,
      }));
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  const handleConfidence = (confidence) => {
    saveProgress(confidence);
    moveNext();
  };

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const moveNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const resetCards = () => {
    if (window.confirm("Сбросить результаты и начать заново?")) {
      setProgress({});
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  if (loading) {
    return <div className="flashcard-study__loading">Загрузка карточек...</div>;
  }

  if (error) {
    return <div className="flashcard-study__error">{error}</div>;
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="flashcard-study__empty">
        <span className="material-symbols-outlined">style</span>
        <p>Для этого курса нет карточек</p>
      </div>
    );
  }

  const card = cards[currentIndex];
  const masteredCount = Object.values(progress).filter((p) => p === "mastered").length;
  const percentComplete = Math.round((masteredCount / cards.length) * 100);
  const currentProgress = progress[currentIndex] || null;

  return (
    <div className="flashcard-study">
      {/* Progress Header */}
      <div className="flashcard-study__header">
        <div className="flashcard-study__info">
          <h3 className="flashcard-study__title">
            Карточка {currentIndex + 1} из {cards.length}
          </h3>
        </div>
        <div className="flashcard-study__meta">
          <span className="flashcard-study__percent">{percentComplete}% завершено</span>
          {Object.keys(progress).length > 0 && (
            <button
              className="flashcard-study__reset-btn"
              onClick={resetCards}
              title="Начать заново"
            >
              Начать заново
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flashcard-study__progress-bar">
        <div
          className="flashcard-study__progress-fill"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      {/* Card Container */}
      <div className="flashcard-study__card-container">
        <div
          className={`flashcard-study__card ${isFlipped ? "flipped" : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-study__card-inner">
            {/* Front */}
            <div className="flashcard-study__card-front">
              <div className="flashcard-study__card-content">{card.question}</div>
              <div className="flashcard-study__flip-hint">Нажмите для ответа</div>
            </div>

            {/* Back */}
            <div className="flashcard-study__card-back">
              <div className="flashcard-study__card-content">{card.answer}</div>
              <div className="flashcard-study__flip-hint">Нажмите для вопроса</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Actions */}
      {!isFlipped ? (
        <div className="flashcard-study__controls">
          <button
            className="flashcard-study__nav-btn"
            onClick={movePrev}
            disabled={currentIndex === 0}
            title="Назад"
          >
            Назад
          </button>

          <button
            className="flashcard-study__flip-btn"
            onClick={() => setIsFlipped(true)}
          >
            Показать ответ
          </button>

          <button
            className="flashcard-study__nav-btn"
            onClick={moveNext}
            disabled={currentIndex === cards.length - 1}
            title="Вперед"
          >
            Вперед
          </button>
        </div>
      ) : (
        <div className="flashcard-study__confidence">
          <p className="flashcard-study__confidence-label">
            Знали ли вы ответ?
          </p>
          <div className="flashcard-study__confidence-buttons">
            <button
              className="flashcard-study__confidence-btn confidence-learning"
              onClick={() => handleConfidence("still_learning")}
              title="Совершенно нет"
            >
              <span>Совершенно нет</span>
            </button>

            <button
              className="flashcard-study__confidence-btn confidence-almost"
              onClick={() => handleConfidence("almost_there")}
              title="Частично"
            >
              <span>Частично</span>
            </button>

            <button
              className="flashcard-study__confidence-btn confidence-mastered"
              onClick={() => handleConfidence("mastered")}
              title="Да!"
            >
              <span>Да!</span>
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flashcard-study__stats">
        <div className="flashcard-study__stat-item">
          <div>
            <div className="flashcard-study__stat-label">Знаю</div>
            <div className="flashcard-study__stat-value">
              {Object.values(progress).filter((p) => p === "mastered").length}
            </div>
          </div>
        </div>
        <div className="flashcard-study__stat-item">
          <div>
            <div className="flashcard-study__stat-label">Частично</div>
            <div className="flashcard-study__stat-value">
              {Object.values(progress).filter((p) => p === "almost_there").length}
            </div>
          </div>
        </div>
        <div className="flashcard-study__stat-item">
          <div>
            <div className="flashcard-study__stat-label">Совершенно нет</div>
            <div className="flashcard-study__stat-value">
              {Object.values(progress).filter((p) => p === "still_learning").length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
