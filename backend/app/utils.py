from passlib.context import CryptContext
import subprocess
import json
import tempfile
import os
import time
import sys

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def run_tests(student_code: str, test_cases_json: str) -> tuple:
    """
    Запустить тесты для кода студента.
    Возвращает: (результаты тестов, все ли прошли, время выполнения)
    """
    try:
        test_cases = json.loads(test_cases_json or "[]")
    except:
        return [], False, 0, "Invalid test cases JSON"
    
    if not test_cases:
        return [], True, 0, None  # нет тестов = успех
    
    results = []
    all_passed = True
    total_time = 0
    
    # Создать временный файл с кодом студента
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
        f.write(student_code)
        code_file = f.name
    
    try:
        for i, test in enumerate(test_cases):
            test_input = str(test.get("input", ""))
            expected_output = str(test.get("expected_output", "")).strip()
            
            try:
                start_time = time.time()
                
                # Запустить код с input'ом
                result = subprocess.run(
                    [sys.executable, code_file],
                    input=test_input,
                    capture_output=True,
                    text=True,
                    timeout=5  # 5 секунд таймаут
                )
                
                exec_time = time.time() - start_time
                total_time += exec_time
                
                actual_output = result.stdout.strip()
                passed = actual_output == expected_output
                
                if not passed:
                    all_passed = False
                
                results.append({
                    "test_number": i + 1,
                    "input": test_input,
                    "expected": expected_output,
                    "actual": actual_output,
                    "passed": passed,
                    "error": result.stderr if result.returncode != 0 else None,
                    "time": round(exec_time, 3)
                })
            
            except subprocess.TimeoutExpired:
                all_passed = False
                results.append({
                    "test_number": i + 1,
                    "passed": False,
                    "error": "Timeout: code execution took too long (>5s)"
                })
            
            except Exception as e:
                all_passed = False
                results.append({
                    "test_number": i + 1,
                    "passed": False,
                    "error": str(e)
                })
    
    finally:
        # Удалить временный файл
        if os.path.exists(code_file):
            os.unlink(code_file)
    
    return results, all_passed, total_time, None
