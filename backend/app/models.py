from sqlalchemy import Column, Integer, String, ForeignKey, Table, Boolean, Text, DateTime, Float, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

enrollments = Table("enrollments", Base.metadata,
    Column("student_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("course_id", Integer, ForeignKey("courses.id"), primary_key=True))

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    login = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    courses = relationship("Course", back_populates="teacher")
    enrolled = relationship("Course", secondary=enrollments, back_populates="students")

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    theory = Column(Text, nullable=True)
    coding_task = Column(Text, nullable=True)
    coding_solution = Column(Text, nullable=True)
    teacher_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    teacher = relationship("User", back_populates="courses")
    students = relationship("User", secondary=enrollments, back_populates="enrolled")
    test_cases = Column(Text, nullable=True)  # JSON: тесты для проверки кода


class CodeSubmission(Base):
    """Попытка студента выполнить практическое задание"""
    __tablename__ = "code_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    
    # Код студента
    code = Column(Text, nullable=False)
    language = Column(String, default="python")
    
    # Результаты
    is_correct = Column(Boolean, default=False)
    test_results = Column(Text, nullable=True)  # JSON: [{"test": "...", "passed": true/false}]
    error_message = Column(Text, nullable=True)
    
    # Метаданные
    created_at = Column(DateTime, default=datetime.utcnow)
    execution_time = Column(Float, nullable=True)
    
    # Связи
    student = relationship("User")
    course = relationship("Course")
    
    __table_args__ = (UniqueConstraint("student_id", "course_id", name="uq_student_course_code"),)
