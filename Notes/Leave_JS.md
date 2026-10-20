# JavaScript Revision Notes — Leave Balance Challenge

## 1. `let` vs `const`

Both declare variables.

```javascript
let score = 10;
score = 20; // Allowed

const EARN_PER_MONTH = 1.5;
// EARN_PER_MONTH = 2; // Error
```

- `let`: Use when you need to reassign a variable.
- `const`: Use when you don't need to reassign a variable.
- Prefer `const` by default; use `let` when reassignment is needed.

## 2. Variable Scope

Scope determines where a variable can be accessed.

### Function scope with `let` and `const`

```javascript
function test() {
    const score = 10;
    console.log(score); // Works
}

test();
// console.log(score); // ReferenceError
```

Variables declared inside a function are local to that function.

### Block scope

```javascript
if (true) {
    let message = "Hello";
    console.log(message); // Works
}

// console.log(message); // ReferenceError
```

Variables declared with `let` and `const` inside a block are accessible only within that block.

**Rule:** Declare a variable in the smallest scope that needs it.

## 3. Where should variables be declared?

Inside a function:

```javascript
function leaveBalance({ monthsWorked, taken }) {
    const earnedLeave = monthsWorked * 1.5;
    return earnedLeave - taken;
}
```

Use this for variables needed only for that calculation.

Outside a function:

```javascript
const EARN_PER_MONTH = 1.5;

function leaveBalance({ monthsWorked, taken }) {
    return monthsWorked * EARN_PER_MONTH - taken;
}
```

Use this for constants or values shared by multiple functions.

## 4. Objects

An object stores related information as key-value pairs.

```javascript
const person = {
    name: "Sam",
    age: 25
};
```

- `name` and `age` are property names (keys).
- `"Sam"` and `25` are their values.

### Accessing properties

```javascript
console.log(person.name); // Sam
console.log(person.age);  // 25
```

Syntax: `objectName.propertyName`

## 5. Passing Objects to Functions

### Create an object separately

```javascript
const leave = {
    monthsWorked: 4,
    carriedForward: 5,
    taken: 3
};

leaveBalance(leave);
```

### Create an object directly in the function call

```javascript
leaveBalance({
    monthsWorked: 4,
    carriedForward: 5,
    taken: 3
});
```

Both create/pass an object. The first is useful when you want to reuse the object; the second is convenient for one-time calls.

## 6. Object Parameters

Without destructuring:

```javascript
function leaveBalance(leave) {
    return leave.monthsWorked * 1.5
        + leave.carriedForward
        - leave.taken;
}
```

The function receives one object called `leave`. Access its properties using `leave.monthsWorked`, etc.

## 7. Object Destructuring

Destructuring extracts properties from an object into variables.

```javascript
const person = { name: "Sam", age: 25 };

const { name } = person;

console.log(name); // Sam
```

This is equivalent to:

```javascript
const name = person.name;
```

Extract multiple properties:

```javascript
const { name, age } = person;
```

### Destructuring in function parameters

```javascript
function leaveBalance({ monthsWorked, carriedForward, taken }) {
    return monthsWorked * 1.5 + carriedForward - taken;
}
```

The function receives an object and extracts the specified properties into local variables.

**Remember:** Object literals create objects; destructuring extracts their properties.

## 8. `Math.min()`

Returns the smallest of the supplied values.

```javascript
Math.min(11, 10); // 10
Math.min(9, 10);  // 9
```

In the challenge:

```javascript
Math.min(carriedForward, 10)
```

This caps the carried-forward leave at 10 days.

## 9. `return`

Returns a value from a function.

```javascript
function add(a, b) {
    return a + b;
}

const result = add(2, 3);
console.log(result); // 5
```

Code after `return` in the same execution path is not executed.

## 10. `if` and `throw new Error()`

```javascript
if (balance < -2) {
    throw new Error("Insufficient leave");
}

return balance;
```

- `if` checks a condition.
- `throw` signals an error.
- `new Error("...")` creates an error object with a message.
- `return` supplies the valid result.

## 11. `try...catch`

Used to catch and handle errors.

```javascript
try {
    throw new Error("Insufficient leave");
} catch (error) {
    console.log(error.message);
}
```

- `try`: Executes code that might throw an error.
- `throw`: Signals the error.
- `catch`: Runs when an error is thrown in the corresponding `try` block.
- `error.message`: Reads the error's message.

`console.log()` displays information. `throw` signals a failure. `try...catch` lets you handle it.

## 12. Testing with `console.assert()`

```javascript
console.assert(2 + 3 === 5, "Incorrect result");
```

- First argument: the condition to check.
- Second argument: a message displayed if the assertion fails.

If the condition is true, it passes silently.

### Testing an expected error

```javascript
let errorCaught = false;

try {
    leaveBalance({
        monthsWorked: 1,
        carriedForward: 0,
        taken: 4
    });
} catch (error) {
    errorCaught = true;

    console.assert(
        error.message === "Insufficient leave",
        "Incorrect error message"
    );
}

console.assert(
    errorCaught === true,
    "Expected error was not thrown"
);
```

The first assertion checks the error message. The second checks that an error was thrown and caught at all.

## 13. Testing Helpers

Instead of repeating assertions:

```javascript
const check = (input, expected) => {
    const actual = leaveBalance(input);

    console.assert(
        actual === expected,
        "Incorrect result"
    );
};
```

Call it for different test cases:

```javascript
check(
    { monthsWorked: 4, carriedForward: 5, taken: 3 },
    8
);
```

Each call runs `leaveBalance()` again. The helper reduces repeated test code, not the number of function executions.

## 14. Boundary Testing

Test values around important limits.

For the carry-forward cap:

- 9 days → 9
- 10 days → 10
- 11 days → 10

For the minimum balance:

- -1.5 → Allowed
- -2 → Allowed
- -2.5 → Throw an error

Boundary tests help detect bugs at the limits of a rule.

## Final Quick Reference

| Concept | Remember |
|---|---|
| `let` | Can be reassigned |
| `const` | Cannot be reassigned |
| Scope | Where a variable is accessible |
| Object | Groups related key-value pairs |
| Destructuring | Extracts object properties into variables |
| `Math.min()` | Returns the smallest value |
| `return` | Returns a function's result |
| `throw` | Signals an error |
| `try...catch` | Handles a thrown error |
| `console.assert()` | Checks whether a condition is true |
| Boundary testing | Tests values around limits |

**Revision tip:** Try writing the leave-balance function from memory, then explain why each variable is inside or outside the function. If you can explain your decisions, you're learning the concepts rather than just memorizing syntax.
