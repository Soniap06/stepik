import React, { useEffect, useState } from "react";
import { API_BASE } from "../api/config";

function initialQuestions() {
  return [0, 1, 2].map((qi) => ({
    text: "",
    answers: [0, 1, 2, 3].map((ai) => ({
      text: "",
      is_correct: qi === 0 && ai === 0,
    })),
  }));
}

export default function CreateCourseModal({
  isOpen,
  onClose,
  teacherId,
  onCourseCreated,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState(initialQuestions);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setQuestions(initialQuestions());
      setSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const setQuestionText = (qi, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qi ? { ...q, text: value } : q))
    );
  };

  const setAnswerText = (qi, ai, value) => {
    setQuestions((prev) =>
      prev.map((q, qIdx) =>
        qIdx !== qi
          ? q
          : {
              ...q,
              answers: q.answers.map((a, aIdx) =>
                aIdx === ai ? { ...a, text: value } : a
              ),
            }
      )
    );
  };

  const setCorrectAnswer = (qi, ai) => {
    setQuestions((prev) =>
      prev.map((q, qIdx) =>
        qIdx !== qi
          ? q
          : {
              ...q,
              answers: q.answers.map((a, aIdx) => ({
                ...a,
                is_correct: aIdx === ai,
              })),
            }
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) {
      window.alert("Укажите название курса");
      return;
    }
    for (let qi = 0; qi < questions.length; qi++) {
      const q = questions[qi];
      if (!q.text.trim()) {
        window.alert(`Заполните текст вопроса ${qi + 1}`);
        return;
      }
      const correct = q.answers.filter((a) => a.is_correct).length;
      if (correct !== 1) {
        window.alert(`Выберите один правильный ответ для вопроса ${qi + 1}`);
        return;
      }
      for (let ai = 0; ai < q.answers.length; ai++) {
        if (!q.answers[ai].text.trim()) {
          window.alert(`Заполните все варианты ответа для вопроса ${qi + 1}`);
          return;
        }
      }
    }

    const body = {
      title: t,
      description: description.trim(),
      questions: questions.map((q) => ({
        text: q.text.trim(),
        answers: q.answers.map((a) => ({
          text: a.text.trim(),
          is_correct: a.is_correct,
        })),
      })),
    };

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/teacher/${teacherId}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      window.alert("Курс создан");
      onClose();
      onCourseCreated();
    } catch (err) {
      window.alert(
        err instanceof Error ? err.message : "Не удалось создать курс"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="add-student-modal"
      role="presentation"
      onMouseDown={handleBackdropMouseDown}
    >
      <div
        className="add-student-modal__panel create-course-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-course-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="add-student-modal__head">
          <h2 id="create-course-modal-title" className="add-student-modal__title">
            Новый курс
          </h2>
          <button
            type="button"
            className="add-student-modal__close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
        <form className="add-student-modal__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="course-title">
              Название курса <span aria-hidden="true">*</span>
            </label>
            <input
              id="course-title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="course-desc">
              Описание
            </label>
            <textarea
              id="course-desc"
              className="form-input create-course-modal__textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {questions.map((q, qi) => (
            <div key={qi} className="create-course-modal__question">
              <p className="create-course-modal__question-label">
                Вопрос {qi + 1}
              </p>
              <div className="form-group">
                <label className="form-label" htmlFor={`course-q-${qi}`}>
                  Текст вопроса <span aria-hidden="true">*</span>
                </label>
                <input
                  id={`course-q-${qi}`}
                  className="form-input"
                  value={q.text}
                  onChange={(e) => setQuestionText(qi, e.target.value)}
                />
              </div>
              <fieldset className="create-course-modal__answers">
                <legend className="form-label">Варианты ответа (отметьте верный)</legend>
                {q.answers.map((a, ai) => (
                  <label
                    key={ai}
                    className="create-course-modal__answer-row"
                  >
                    <input
                      type="radio"
                      name={`course-q${qi}-correct`}
                      checked={a.is_correct}
                      onChange={() => setCorrectAnswer(qi, ai)}
                    />
                    <input
                      type="text"
                      className="form-input"
                      value={a.text}
                      onChange={(e) => setAnswerText(qi, ai, e.target.value)}
                      placeholder={`Ответ ${ai + 1}`}
                    />
                  </label>
                ))}
              </fieldset>
            </div>
          ))}

          <div className="add-student-modal__actions">
            <button
              type="button"
              className="teacher-btn teacher-btn--secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="teacher-btn teacher-btn--primary"
              disabled={submitting}
            >
              {submitting ? "Сохранение…" : "Создать курс"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
