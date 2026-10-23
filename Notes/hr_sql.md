# SQL Revision Notes — HR Challenge
## From confusion to understanding

These notes cover what I learned through practice: `SELECT`, `WHERE`, aggregate functions, `GROUP BY`, `HAVING`, subqueries, `JOIN`, `LEFT JOIN`, `RIGHT JOIN`, self-joins, `NULL`, and how to think through SQL problems.

The goal is not to memorise queries. The goal is to understand the logic well enough to write them again without looking at the answers.

---

# 1. Understand the database first

Our HR challenge has three tables.

## 1.1 Employees table

| id | name | dept_id | manager_id | salary | joined |
|---:|---|---:|---:|---:|---|
| 1 | Asha | 1 | NULL | 180000 | 2019-04-01 |
| 2 | Ravi | 1 | 1 | 120000 | 2021-06-15 |
| 3 | Meena | 1 | 1 | 195000 | 2020-01-10 |
| 4 | John | 2 | NULL | 90000 | 2018-09-01 |
| 5 | Priya | 2 | 4 | 70000 | 2022-03-20 |
| 6 | Karthik | 3 | NULL | 110000 | 2019-11-11 |
| 7 | Sara | 3 | 6 | 115000 | 2023-02-01 |
| 8 | Vikram | 3 | 6 | 60000 | 2024-07-01 |

Important columns:

- `id`: each employee's unique ID.
- `dept_id`: the ID of the department where the employee works.
- `manager_id`: the ID of the employee's manager.
- `salary`: the employee's salary.
- `NULL` in `manager_id`: no manager is recorded.

## 1.2 Departments table

| id | name |
|---:|---|
| 1 | Engineering |
| 2 | HR |
| 3 | Sales |
| 4 | Legal |

Notice that Legal has no employees.

Relationships:

- `departments.id` matches `employees.dept_id`.
- `employees.id` matches another employee's `manager_id`.

## 1.3 Leaves table

| id | emp_id | type | days | start_date |
|---:|---:|---|---:|---|
| 1 | 2 | Sick | 1 | 2026-01-12 |
| 2 | 2 | Casual | 0.5 | 2026-02-03 |
| 3 | 3 | Earned | 5 | 2026-03-01 |
| 4 | 5 | Sick | 2 | 2026-01-20 |
| 5 | 7 | Casual | 1 | 2026-02-14 |
| 6 | 7 | Earned | 3 | 2026-04-10 |

Important column:

- `emp_id`: the ID of the employee who took leave.

The relationship is `employees.id = leaves.emp_id`.

---

# 2. Basic SQL — the foundation

## 2.1 SELECT: choose what to display

```sql
SELECT name, salary
FROM employees;
```

Meaning:

- `SELECT` tells SQL which columns to display.
- `FROM` tells SQL which table to read.

If I write:

```sql
SELECT name
FROM employees;
```

Only employee names appear.

**Remember:** `SELECT` controls the columns shown in the output. It does not necessarily determine which columns the database can use internally.

## 2.2 WHERE: filter individual rows

```sql
SELECT name, salary
FROM employees
WHERE salary > 100000;
```

Meaning: show employees whose salary is greater than 100000.

Common operators:

| Operator | Meaning |
|---|---|
| `=` | Equal to |
| `!=` or `<>` | Not equal to |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal to |
| `<=` | Less than or equal to |
| `IN (...)` | Matches one of the listed values |
| `NOT IN (...)` | Does not match any listed value |

Example:

```sql
SELECT name
FROM employees
WHERE dept_id IN (1, 3);
```

Returns employees in Engineering or Sales.

## 2.3 ORDER BY: sort the result

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC;
```

- `ASC`: smallest to largest, or alphabetical order.
- `DESC`: largest to smallest, or reverse alphabetical order.

## 2.4 LIMIT: restrict the number of rows

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC
LIMIT 1;
```

Returns the employee with the highest salary.

Important: `LIMIT 1` returns one row, not necessarily every row tied for first place.

---

# 3. Aggregate functions — calculate information from rows

Aggregate functions calculate a value from multiple rows.

| Function | Purpose | Example |
|---|---|---|
| `COUNT(*)` | Count rows | Number of employees |
| `AVG(salary)` | Average salary | Average employee salary |
| `MAX(salary)` | Highest salary | Highest individual salary |
| `MIN(salary)` | Lowest salary | Lowest individual salary |
| `SUM(salary)` | Total salary | Total salary paid |

Examples:

```sql
SELECT COUNT(*)
FROM employees;
```

Result: `8`.

```sql
SELECT MAX(salary)
FROM employees;
```

Result: `195000`.

```sql
SELECT MIN(salary)
FROM employees;
```

Result: `60000`.

```sql
SELECT AVG(salary)
FROM employees;
```

Calculates the average salary across all employees.

### Important distinction: MAX versus AVG

`MAX(salary)` finds the highest individual salary.

`AVG(salary)` calculates the average salary.

If the question asks for the department with the highest average salary, we must calculate averages by department and compare those averages. Finding the maximum individual salary is a different task.

---

# 4. GROUP BY — calculate separately for each group

Suppose I want to know how many employees belong to each department.

```sql
SELECT dept_id, COUNT(*)
FROM employees
GROUP BY dept_id;
```

Conceptually, SQL creates groups:

- Department 1: Asha, Ravi, Meena.
- Department 2: John, Priya.
- Department 3: Karthik, Sara, Vikram.

Then it counts the rows in each group.

Result:

| dept_id | COUNT(*) |
|---:|---:|
| 1 | 3 |
| 2 | 2 |
| 3 | 3 |

Notice that I selected `dept_id` as well as `COUNT(*)`. Without the department ID, I would see the counts but wouldn't know which department each count belonged to.

## Average salary by department

```sql
SELECT dept_id, AVG(salary)
FROM employees
GROUP BY dept_id;
```

This calculates three averages, one per department.

**Mental model:**

- `GROUP BY` decides how rows are grouped.
- `AVG`, `COUNT`, `MAX`, and `SUM` calculate values for those groups.

---

# 5. WHERE versus HAVING

This was one of the important distinctions in the challenge.

## WHERE filters individual rows

```sql
SELECT name, salary
FROM employees
WHERE salary > 100000;
```

SQL filters employees before grouping.

## HAVING filters groups

```sql
SELECT dept_id, COUNT(*)
FROM employees
GROUP BY dept_id
HAVING COUNT(*) >= 3;
```

Result:

| dept_id | COUNT(*) |
|---:|---:|
| 1 | 3 |
| 3 | 3 |

Only departments with at least three employees remain.

### Remember this

- `WHERE`: Is this row allowed?
- `HAVING`: Is this group allowed?

A common mistake is writing `WHERE AVG(salary) > ...` when trying to filter grouped averages. Aggregate conditions usually belong in `HAVING`, because the average is calculated for a group.

---

# 6. Subqueries — a query inside another query

A subquery is a query whose result is used by another query.

Think of it as asking SQL a smaller question first.

## Example: employees who never took leave

```sql
SELECT name
FROM employees
WHERE id NOT IN (
    SELECT emp_id
    FROM leaves
);
```

Inner query:

```sql
SELECT emp_id
FROM leaves;
```

This returns the employee IDs that appear in the leaves table:

`2, 2, 3, 5, 7, 7`

Outer query:

```sql
SELECT name
FROM employees
WHERE id NOT IN (...);
```

It selects employees whose IDs do not appear in that list.

Result:

- Asha
- John
- Karthik
- Vikram

### How to think about a subquery

1. Identify the smaller question.
2. Work out what it returns.
3. Understand how the outer query uses that result.

A subquery can return one value, multiple values, or a result table, depending on its structure.

---

# 7. JOIN — connect related rows

This was the concept that took the most effort to understand. Remember the Excel-style row comparisons we practised.

A JOIN combines information from rows that satisfy a matching condition.

## Example: connect employees to departments

```sql
SELECT e.name, d.name
FROM employees AS e
JOIN departments AS d
    ON e.dept_id = d.id;
```

For Asha:

- `e.dept_id = 1`.
- SQL finds `d.id = 1`.
- Department 1 is Engineering.
- The joined row contains Asha and Engineering.

Conceptually:

| Employee name | Employee dept_id | Department id | Department name |
|---|---:|---:|---|
| Asha | 1 | 1 | Engineering |
| Ravi | 1 | 1 | Engineering |
| Meena | 1 | 1 | Engineering |

The department information is repeated because several employees belong to the same department.

### The matching condition is the key

```sql
ON e.dept_id = d.id
```

This tells SQL how the rows relate to each other.

If the matching condition is wrong, the results can also be wrong.

---

# 8. INNER JOIN, LEFT JOIN and RIGHT JOIN

## 8.1 INNER JOIN

```sql
FROM departments AS d
JOIN employees AS e
    ON d.id = e.dept_id
```

`JOIN` by itself means `INNER JOIN`.

It returns only matching rows. Departments without employees are excluded.

## 8.2 LEFT JOIN

```sql
FROM departments AS d
LEFT JOIN employees AS e
    ON d.id = e.dept_id
```

**LEFT JOIN preserves every row from the table before `LEFT JOIN`.**

Here, the left table is `departments`, so every department remains, including Legal.

When Legal has no matching employee, SQL produces a result row like this:

| d.id | d.name | e.id | e.name | e.dept_id |
|---:|---|---:|---|---:|
| 4 | Legal | NULL | NULL | NULL |

The department information is preserved. The missing employee information is represented by `NULL`.

## 8.3 RIGHT JOIN

```sql
FROM departments AS d
RIGHT JOIN employees AS e
    ON d.id = e.dept_id
```

**RIGHT JOIN preserves every row from the table after `RIGHT JOIN`.**

Here, the right table is `employees`.

If an employee has no matching department, the employee remains in the result and the department columns become `NULL`.

### The rule I must remember

| Join type | Which table's rows are preserved? |
|---|---|
| `INNER JOIN` | Only matching rows |
| `LEFT JOIN` | All rows from the left table |
| `RIGHT JOIN` | All rows from the right table |

LEFT and RIGHT refer to the position of the table in the query, not the order of the columns in the result.

---

# 9. What actually happens during a JOIN?

Let's use the employee-manager relationship.

```sql
FROM employees AS e
JOIN employees AS m
    ON e.manager_id = m.id
```

Imagine two working views of the same table.

- `e`: the employee.
- `m`: the possible manager.

Both views have the same original columns. The aliases do not remove or create columns.

## Example: Ravi and Asha

Ravi's row:

| e.id | e.name | e.manager_id | e.salary |
|---:|---|---:|---:|
| 2 | Ravi | 1 | 120000 |

Manager candidate rows include:

| m.id | m.name | m.manager_id | m.salary |
|---:|---|---:|---:|
| 1 | Asha | NULL | 180000 |
| 2 | Ravi | 1 | 120000 |
| 3 | Meena | 1 | 195000 |

The JOIN condition is:

```sql
ON e.manager_id = m.id
```

For Ravi:

- `e.manager_id = 1`.
- Asha has `m.id = 1`.
- The values match, so Ravi and Asha form a matching pair.

Conceptually, the combined row contains columns from both rows:

| e.id | e.name | e.manager_id | e.salary | m.id | m.name | m.manager_id | m.salary |
|---:|---|---:|---:|---:|---|---:|---:|
| 2 | Ravi | 1 | 120000 | 1 | Asha | NULL | 180000 |

The database can then use this joined data to apply additional conditions.

For example:

```sql
WHERE e.salary > m.salary
```

This checks whether the employee earns more than their manager.

### Important details

- SQL matches `e.manager_id` with `m.id`.
- It does not match `e.manager_id` with `m.manager_id`.
- A matching pair combines information from both rows.
- The database does not necessarily create and save a permanent joined table.
- The database engine may use a more efficient algorithm than checking every possible pair. Our row-by-row comparison is a learning model.

---

# 10. Self-join — joining a table to itself

A self-join is useful when rows in a table refer to other rows in that same table.

Our employee table contains both:

- Each employee's `id`.
- Each employee's `manager_id`.

Both employees and managers are recorded in the same table.

That's why we use the table twice with different aliases.

```sql
FROM employees AS e
JOIN employees AS m
    ON m.id = e.manager_id
```

Here:

- `e` is the employee.
- `m` is the manager.

Example:

| Employee | Employee ID | Manager ID |
|---|---:|---:|
| Ravi | 2 | 1 |
| Meena | 3 | 1 |
| Sara | 7 | 6 |

The matching rows tell us:

- Ravi's manager is Asha, whose ID is 1.
- Meena's manager is Asha, whose ID is 1.
- Sara's manager is Karthik, whose ID is 6.

### Does alias order matter?

Yes, the roles matter.

This condition:

```sql
ON m.id = e.manager_id
```

means: match each employee to their manager.

The equivalent comparison can be written in reverse order:

```sql
ON e.manager_id = m.id
```

The two expressions are equivalent.

But if I change which alias represents the employee and which represents the manager, I must adjust the condition and salary comparison accordingly.

---

# 11. NULL and IS NULL

`NULL` means missing or unknown data. It is not the same as zero or an empty string.

Incorrect:

```sql
WHERE e.id = NULL
```

Correct:

```sql
WHERE e.id IS NULL
```

To find rows where a value is missing, use `IS NULL`.

To find rows where a value exists, use `IS NOT NULL`.

## Why does NULL matter with LEFT JOIN?

Suppose a department has no matching employee.

The LEFT JOIN preserves the department, and the employee-side columns become `NULL`.

Then:

```sql
WHERE e.id IS NULL
```

keeps departments without employees.

Important: check a column that would normally be present on a matching row, such as an employee's primary key `e.id`.

---

# 12. MAX, MIN and finding the second-highest salary

## Highest salary

```sql
SELECT MAX(salary)
FROM employees;
```

Result: `195000`.

## Lowest salary

```sql
SELECT MIN(salary)
FROM employees;
```

Result: `60000`.

## Second-highest distinct salary using a subquery

```sql
SELECT MAX(salary)
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);
```

Think about the steps:

1. The inner query finds the highest salary: `195000`.
2. The outer query keeps salaries below `195000`.
3. `MAX(salary)` finds the largest salary among those remaining.
4. The result is `180000`.

This method finds the second-highest **distinct** salary, even if the highest salary is shared by multiple employees.

## Another approach: self-join

```sql
SELECT MAX(e.salary) AS second_highest_salary
FROM employees AS e
JOIN employees AS t
    ON e.salary < t.salary;
```

Here:

- `e.salary` is the candidate salary.
- `t.salary` is the salary being compared against it.
- The JOIN keeps pairs where the candidate is lower than another salary.
- `MAX(e.salary)` finds the highest qualifying candidate.

For this dataset, the result is `180000`.

Both approaches are valid for this data. The subquery is more direct for the second-highest distinct salary.

---

# 13. ORDER BY an aggregate without displaying it

One confusion was whether the average salary must appear in the final output if we use it to sort departments.

It does not.

```sql
SELECT d.name
FROM departments AS d
LEFT JOIN employees AS e
    ON d.id = e.dept_id
GROUP BY d.id, d.name
ORDER BY AVG(e.salary) DESC
LIMIT 1;
```

This query displays only the department name.

- `AVG(e.salary)` calculates the average salary for each department.
- `ORDER BY AVG(e.salary) DESC` sorts the department groups by average salary, highest first.
- `LIMIT 1` returns the first result.

The `AVG(e.salary)` expression does not have to appear in `SELECT`.

For this dataset, the answer is Engineering.

---

# 14. The five HR challenge solutions

These are the five queries to save in `qa-gym/sql/hr.sql`.

## Q1. Employees who never took leave

```sql
SELECT e.name
FROM employees AS e
LEFT JOIN leaves AS l
    ON e.id = l.emp_id
WHERE l.emp_id IS NULL;
```

**Logic:**

1. Start with all employees.
2. Match each employee to their leave records.
3. Keep employees for whom no matching leave record was found.

Result: Asha, John, Karthik and Vikram.

Why does this use `LEFT JOIN`? Because we want to preserve every employee, including those without a leave record.

## Q2. Department with the highest average salary

```sql
SELECT d.name
FROM departments AS d
LEFT JOIN employees AS e
    ON d.id = e.dept_id
GROUP BY d.id, d.name
ORDER BY AVG(e.salary) DESC
LIMIT 1;
```

**Logic:**

1. Connect departments to employees.
2. Group employees by department.
3. Calculate the average salary per group.
4. Sort the averages from highest to lowest.
5. Return the first department.

Result: Engineering.

## Q3. Second-highest distinct salary

```sql
SELECT MAX(salary)
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);
```

**Logic:**

1. Find the highest salary.
2. Exclude that salary from consideration.
3. Find the maximum salary among the remaining values.

Result: `180000`.

## Q4. Employees who earn more than their managers

```sql
SELECT e.name
FROM employees AS e
JOIN employees AS m
    ON m.id = e.manager_id
WHERE e.salary > m.salary;
```

**Logic:**

1. Use the employees table in two roles.
2. Match each employee to their manager.
3. Compare employee salary with manager salary.
4. Keep employees whose salary is greater.

Result: Meena and Sara.

## Q5. Departments with no employees

```sql
SELECT d.name
FROM departments AS d
LEFT JOIN employees AS e
    ON d.id = e.dept_id
WHERE e.id IS NULL;
```

**Logic:**

1. Start with all departments.
2. Match departments to employees.
3. Keep departments with no matching employee.

Result: Legal.

---

# 15. Common mistakes to avoid

### Mistake 1: Reversing the LEFT JOIN logic

Wrong assumption: the table after `LEFT JOIN` is preserved.

Correct: the table before `LEFT JOIN` is preserved.

### Mistake 2: Checking the wrong side for NULL

To find departments without employees:

```sql
WHERE e.id IS NULL
```

To find employees without leave records:

```sql
WHERE l.emp_id IS NULL
```

First decide which entity you want to preserve, then check the matching table for missing values.

### Mistake 3: Reversing the manager relationship

Correct:

```sql
ON m.id = e.manager_id
```

This matches an employee to their manager.

If the task asks who earns more:

```sql
WHERE e.salary > m.salary
```

Do not reverse the salary comparison accidentally.

### Mistake 4: Using MAX when the question asks for an average

`MAX(salary)` finds the highest individual salary.

`ORDER BY AVG(salary) DESC LIMIT 1` finds the department with the highest average salary.

### Mistake 5: Using WHERE for an aggregate condition

Use `WHERE` for individual rows. Use `HAVING` for conditions on groups, such as `HAVING COUNT(*) >= 3`.

### Mistake 6: Assuming JOIN physically creates a permanent table

Think of a JOIN as a conceptual combined result. The database engine chooses how to execute the query.

---

# 16. My problem-solving checklist

Before writing a query, ask these questions.

1. **What exactly must I return?** Names, salaries, departments or counts?
2. **Which table contains the entity I need?** Start there.
3. **Do I need another table?** Identify the relationship between the tables.
4. **Do I need every row from one side?** If yes, consider `LEFT JOIN`.
5. **Am I looking for missing matches?** Use `LEFT JOIN` and check the other side for `NULL`.
6. **Am I comparing employees to managers in the same table?** Consider a self-join.
7. **Am I filtering individual rows or groups?** Use `WHERE` or `HAVING` accordingly.
8. **Am I calculating a value?** Consider `COUNT`, `AVG`, `MAX`, `MIN` or `SUM`.
9. **Am I finding the highest or lowest result?** Consider `ORDER BY ... DESC/ASC` and `LIMIT`.
10. **Can I explain every line in plain English?** If not, understand that line before moving forward.

---

# 17. A practical revision plan

Don't reread everything repeatedly in one sitting. Use active recall: try to explain the idea before looking at the answer.

### Revision 1 — Today

- Explain `WHERE` versus `HAVING` without looking.
- Explain why `LEFT JOIN` preserves the left table.
- Draw the employee-manager self-join using Ravi and Asha.
- Rewrite the five queries from memory.

### Revision 2 — Tomorrow

- Write the five queries again without looking at the solutions.
- Run them against the HR dataset.
- Check which ones you couldn't reconstruct and revisit only those concepts.

### Revision 3 — After three days

Try to solve each question by describing the logic first, then writing SQL.

For example, before writing Query 5, say:

"I need all departments, including departments with no employees. I will preserve departments with a LEFT JOIN, match department IDs to employee department IDs, then find missing employee matches using IS NULL."

Then write the query.

### Revision 4 — After one week

Try solving the five questions from a blank file without these notes. Check your answers only after attempting them.

---

# Final takeaway

SQL becomes easier when I stop treating it as a collection of commands and start treating it as a set of questions about data.

- `SELECT`: What should I display?
- `WHERE`: Which individual rows qualify?
- `GROUP BY`: How should I group the rows?
- `HAVING`: Which groups qualify?
- `JOIN`: How are related rows connected?
- `LEFT JOIN`: Which left-side rows must remain?
- `IS NULL`: Which expected match is missing?
- `MAX` and `MIN`: What is the largest or smallest value?
- `ORDER BY` and `LIMIT`: How do I rank the results and choose the top result?
- A subquery: What smaller question must I answer first?

**The goal isn't to memorise all five queries. It's to remember the reasoning that allows me to rebuild them.**