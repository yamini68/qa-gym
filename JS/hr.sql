
-- HR SQL Challenge


-- Q1: Employees who never took leave

SELECT e.name
from employees AS e
left join leaves AS l
on l.emp_id = e.id 
WHERE l.emp_id is NULL



-- Q2: Department with the highest average salary

SELECT d.name
FROM departments AS d
LEFT JOIN employees AS e
    ON d.id = e.dept_id
GROUP BY d.name
ORDER BY AVG(e.salary) DESC
LIMIT 1;




-- Q3: Second-highest salary

SELECT MAX(salary)
from employees
WHERE salary < (
  SELECT MAX(salary)
  FROM employees
  )


SELECT MAX(e.salary) AS second_highest_salary
FROM employees AS e
JOIN employees AS t
    ON e.salary < t.salary;




-- Q4: Employees who earn more than their managers

SELECT e.name
FROM employees as e 
join employees as m 
on m.id = e.manager_id
WHERE m.salary > e.salary


-- Q5: Departments with no employees
SELECT d.name 
FROM departments as d 
LEFT JOIN employees as e 
ON d.id = e.dept_id
WHERE e.id is NULL


