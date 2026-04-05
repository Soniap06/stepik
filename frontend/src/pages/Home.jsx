import React from "react";
import { useOutletContext } from "react-router-dom";
import { getActiveCourses, getAverageProgress } from "../data/mockStudent";

function Home() {
  const data = useOutletContext();
  const courses = data?.courses ?? [];
  const stats = data?.stats ?? {};
  const displayName = data?.display_name ?? "Студент";
  const active = getActiveCourses(courses);
  const avgProgress = getAverageProgress(courses);
  const featured = courses.filter((c) => c.featured).slice(0, 3);

  return (
    <>
      <header className="dashboard-main-header">
        <h1 className="dashboard-welcome">Добро пожаловать, {displayName}</h1>
        <p className="dashboard-subtitle">
          Главный экран с приоритетом на ежедневные действия и контроль прогресса.
        </p>
      </header>

      <section className="dashboard-section" aria-labelledby="home-overview">
        <h2 id="home-overview" className="dashboard-section-title">
          Ключевые показатели
        </h2>
        <div className="stats-row stats-row--4">
          <div className="stat-tile">
            <span className="stat-tile__value">{active.length}</span>
            <span className="stat-tile__label">Активные курсы</span>
          </div>
          <div className="stat-tile">
            <span className="stat-tile__value">{stats.completed_courses ?? 0}</span>
            <span className="stat-tile__label">Завершенные курсы</span>
          </div>
          <div className="stat-tile">
            <span className="stat-tile__value">{avgProgress}%</span>
            <span className="stat-tile__label">Средний прогресс</span>
          </div>
          <div className="stat-tile">
            <span className="stat-tile__value">{stats.study_hours ?? 0}</span>
            <span className="stat-tile__label">Часы обучения</span>
          </div>
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="home-featured">
        <h2 id="home-featured" className="dashboard-section-title">
          Рекомендуемые курсы
        </h2>
        <div className="featured-grid">
          {featured.map((course) => (
            <article key={course.id} className="featured-card">
              <h3 className="featured-card__title">{course.title}</h3>
              <p className="featured-card__desc">{course.description}</p>
              <div className="progress-row">
                <span className="progress-label">Прогресс: {course.progress}%</span>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-valuenow={course.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Прогресс: ${course.progress}%`}
              >
                <div className="progress-fill" style={{ width: `${course.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="home-planning">
        <h2 id="home-planning" className="dashboard-section-title">
          Планирование и рекомендации
        </h2>
        <div className="insight-grid">
          <article className="insight-card">
            <p className="priority-pill priority-pill--p2">P2</p>
            <h3 className="insight-card__title">Умные рекомендации</h3>
            <ul className="insight-list">
              <li>Завершите модуль "React компоненты" до пятницы</li>
              <li>Повторите SQL join перед следующей проверкой</li>
            </ul>
          </article>
          <article className="insight-card">
            <p className="priority-pill priority-pill--p3">P3</p>
            <h3 className="insight-card__title">Личные цели</h3>
            <ul className="insight-list">
              <li>Цель недели: 6 часов практики</li>
              <li>Цель недели: 2 завершенных теста</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

export default Home;
