# JavaScript Revision Notes — The Empty Report

These notes cover the JavaScript syntax and concepts you've practised in your `qa-gym` repository, from variables and functions to asynchronous requests, `map()`, `Promise.all()`, and execution-time measurement.

The goal is not just to memorize syntax. You should be able to read a line of code, understand what it does, and explain why it is needed.

## 1. Variables — `const`, `let`, and `var`

A variable is a name used to refer to a value.

```
const name = "Murali";
let age = 25;

console.log(name);
console.log(age);
```

Output:

```
Murali
25
```

| Keyword | Meaning                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------- |
| `const` | Cannot be reassigned to a different value.                                                          |
| `let`   | Can be reassigned.                                                                                  |
| `var`   | Older variable declaration; behaves differently with scope and is generally avoided in modern code. |

Example:

```
let score = 10;
score = 20; // Allowed

const city = "Hyderabad";
// city = "Delhi"; // TypeError
```

Important: `const` prevents reassignment, not all changes to an object or array.

```
const numbers = [1, 2];
numbers.push(3); // Allowed

// numbers = [4, 5]; // Not allowed
```

Here, `numbers` still refers to the same array, but that array's contents have changed.

## 2. Data types — strings, numbers, booleans, arrays, and objects

JavaScript values can have different types.

```
const name = "Murali";       // String
const age = 25;              // Number
const isLearning = true;     // Boolean
const result = null;         // Intentional empty value
const user = { name: "Sam" };// Object
const ids = [1, 2, 3];       // Array
```

- String: Text, written inside quotes.
- Number: Numeric values such as `10`, `3.5`.
- Boolean: `true` or `false`.
- Array: An ordered collection of values.
- Object: A collection of key-value pairs.
- `undefined`: A value that hasn't been assigned or provided.

Example:

```
let city;
console.log(city); // undefined
```

## 3. Arrays — storing multiple values

An array stores multiple values in one variable.

```
const ids = [1, 2, 3];

console.log(ids[0]); // 1
console.log(ids[1]); // 2
console.log(ids[2]); // 3
console.log(ids.length); // 3
```

Array indexes start at `0`, not `1`.

### Common array operations

```
const report = [];

report.push("Leanne Graham");
report.push("Ervin Howell");

console.log(report);
```

Output:

```
["Leanne Graham", "Ervin Howell"]
```

- creates an empty array.
- `.push(value)` adds a value to the end.
- `.length` returns the number of elements.
- `[0]` accesses the first element.

In your report challenge, `report.push(user.name)` added each user's name to the report array.

## 4. Objects and properties

An object stores related information as key-value pairs.

```
const user = {
  id: 1,
  name: "Leanne Graham",
  email: "leanne@example.com"
};
```

Here, `id`, `name`, and `email` are properties.

You can read a property using dot notation:

```
console.log(user.name);  // Leanne Graham
console.log(user.id);    // 1
```

You can also use bracket notation:

```
console.log(user["name"]); // Leanne Graham
```

Both access the same property in this example.

### Why is `user.name` important?

When you write:

```
const user = await res.json();
return user.name;
```

`res.json()` gives you the parsed response data, usually a JavaScript object. Then `user.name` reads its `name` property.

A common pattern is:

```
object.property
```

For example, `user.email`, `response.status`, and `user.name`.

## 5. Operators and expressions

Operators let you perform calculations, comparisons, and logical checks.

### Arithmetic operators

```
console.log(5 + 2); // 7
console.log(5 - 2); // 3
console.log(5 * 2); // 10
console.log(6 / 2); // 3
console.log(5 % 2); // 1 (remainder)
```

### Comparison operators

```
console.log(5 > 3);   // true
console.log(5 < 3);   // false
console.log(5 === 5); // true
console.log(5 !== 3); // true
```

- `===` checks strict equality.
- `!==` checks strict inequality.
- `>` and `<` compare values.

Prefer `===` over `==` in most everyday code because `==` can convert types before comparing.

### Logical operators

```
const age = 25;

console.log(age > 18 && age < 60); // true
console.log(age < 18 || age > 60); // false
console.log(!true);                // false
```

- `&&` means both conditions must be true.
- `||` means at least one condition must be true.
- `!` reverses a boolean value.

You haven't needed these much in the report challenge, but they are fundamental JavaScript syntax.

## 6. Strings, concatenation, and template literals

A string is text. You can combine strings with `+` or insert variables into a template literal.

### Using `+`

```
const name = "Murali";
const message = "Hello, " + name;

console.log(message); // Hello, Murali
```

### Using backticks and `${}`

```
const id = 3;
const url = `https://jsonplaceholder.typicode.com/users/${id}`;

console.log(url);
```

Output:

```
https://jsonplaceholder.typicode.com/users/3
```

This syntax is called a template literal.

- Backticks `` ` ` `` define the template literal.
- `${id}` inserts the value of `id`.
- Unlike ordinary quotes, backticks let you insert variables directly into text.

In your challenge, this:

```
`https://jsonplaceholder.typicode.com/users/${id}`
```

creates a different URL for each ID.

## 7. Functions — reusable blocks of code

A function groups instructions so you can execute them when needed.

```
function greet(name) {
  console.log("Hello, " + name);
}

greet("Murali");
```

Output:

```
Hello, Murali
```

Understand each part:

```
function greet(name) {
  console.log("Hello, " + name);
}
```

- `function` declares a function.
- `greet` is the function's name.
- `name` is a parameter: a value the function expects to receive.
- `{}` contains the function's body.
- `console.log()` prints a message.
- Calling `greet("Murali")` passes `"Murali"` as the argument.

Parameter versus argument: `name` is the parameter; `"Murali"` is the argument.

### Returning a value

```
function add(a, b) {
  return a + b;
}

const result = add(2, 3);
console.log(result); // 5
```

`return` sends a value back to the code that called the function. It also ends that function's current execution.

Compare:

```
function first() {
  console.log("Hello");
}

function second() {
  return "Hello";
}
```

`first()` prints text but doesn't explicitly return a value. `second()` returns a string that the caller can store or use.

## 8. Arrow functions — `=>`

Arrow functions are another way to write functions.

Traditional function:

```
function double(n) {
  return n * 2;
}
```

Arrow function:

```
const double = (n) => {
  return n * 2;
};
```

Both calculate twice the supplied number.

An arrow function has this general pattern:

```
(parameters) => {
  // Function body
}
```

For one parameter, parentheses can be omitted:

```
const double = n => {
  return n * 2;
};
```

For a simple expression, you can omit the braces and `return`:

```
const double = n => n * 2;
```

These are different ways to write the same basic calculation.

Remember: `=>` defines an arrow function. It does not mean greater than or equal to; that operator is `>=`.

## 9. Callbacks — passing a function to another function

A callback is a function passed to another function so that it can be called when needed.

Example:

```
function greet(name) {
  console.log("Hello, " + name);
}

function processUser(callback) {
  callback("Murali");
}

processUser(greet);
```

Output:

```
Hello, Murali
```

Here, `greet` is passed as a function. `processUser` calls it with `"Murali"`.

You can also pass an anonymous arrow function directly:

```
processUser((name) => {
  console.log("Hello, " + name);
});
```

This pattern appears frequently in JavaScript, especially in array methods and asynchronous code.

### Parentheses matter

```
processUser(greet);   // Pass the function
processUser(greet()); // Call greet immediately and pass its return value
```

These are not equivalent. In callback-based code, you often pass the function without invoking it.

## 10. `forEach()` — performing an action for each item

`forEach()` calls a callback once for each array element.

```
const ids = [1, 2, 3];

ids.forEach((id) => {
  console.log(id);
});
```

Output:

```
1
2
3
```

The callback receives each element through the parameter `id`.

You can write it with a named function too:

```
function printId(id) {
  console.log(id);
}

ids.forEach(printId);
```

### The important limitation

`forEach()` does not wait for promises returned by an `async` callback.

```
ids.forEach(async (id) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const user = await res.json();

  console.log(user.name);
});
```

This starts the callbacks, but `forEach()` does not wait for their asynchronous work to finish.

That's why your original report could return an empty array before the callbacks had finished pushing names into it.

## 11. `for...of` — looping through values sequentially

A `for...of` loop processes values from an iterable, such as an array.

```
const ids = [1, 2, 3];

for (const id of ids) {
  console.log(id);
}
```

Output:

```
1
2
3
```

Break down the syntax:

- `for` starts a loop.
- `const id` declares a variable for the current item.
- `of ids` means the loop takes values from `ids`.
- `{}` contains the instructions repeated for each item.

### Why it worked in your challenge

```
async function report1(ids) {
  const report = [];

  for (const id of ids) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const user = await res.json();

    report.push(user.name);
  }

  return report;
}
```

Because each `await` pauses the current async function until its awaited operation settles, the loop waits for the current request and JSON parsing before moving to the next iteration.

That makes this implementation sequential.

## 12. `map()` — transforming an array into a new array

`map()` runs a callback for each array item and collects the callback's returned values into a new array.

```
const numbers = [1, 2, 3];

const results = numbers.map((n) => {
  return n * 2;
});

console.log(results); // [2, 4, 6]
```

The callback returns `2`, then `4`, then `6`. `map()` collects those values into a new array.

You can also use it to transform IDs into URLs:

```
const ids = [1, 2, 3];

const urls = ids.map((id) => {
  return `https://example.com/users/${id}`;
});

console.log(urls);
```

### `forEach()` versus `map()`

| Method      | Main purpose                         | Returns     |
| ----------- | ------------------------------------ | ----------- |
| `forEach()` | Perform an action for each item      | `undefined` |
| `map()`     | Transform each item into a new value | A new array |

For example, use `forEach()` to print every number, but use `map()` to create a new array containing every number multiplied by two.

### The key detail with `async`

```
const results = ids.map(async (id) => {
  return id * 2;
});
```

This does not directly produce `[2, 4, 6]`. Because the callback is `async`, each callback returns a Promise. So `results` is an array of Promises.

That leads us to the next concept.

## 13. Promises — pending, fulfilled, and rejected

A Promise represents the eventual outcome of an asynchronous operation.

For example, a network request takes time. JavaScript needs a way to represent the result that will become available later.

A Promise has three possible states:

- Pending: The operation hasn't settled yet.
- Fulfilled: The operation succeeded and has a result.
- Rejected: The operation failed.

You don't need to master Promise internals to understand your challenge. For now, remember that a Promise represents a result that may not be ready yet.

## 14. `async` and `await`

These keywords make asynchronous code easier to read.

### `async`

The `async` keyword declares an asynchronous function.

```
async function getName() {
  return "Murali";
}
```

Even though the function returns a string in its code, calling an `async` function returns a Promise that fulfills with that string.

### `await`

`await` waits for an awaited Promise to settle and gives you its fulfilled value. If the Promise rejects, `await` throws an error.

```
async function example() {
  const result = await Promise.resolve("Hello");

  console.log(result);
}

example();
```

Output:

```
Hello
```

In this example, `Promise.resolve("Hello")` creates a Promise that is already fulfilled with `"Hello"`.

Important: `await` pauses the current async function, not the entire JavaScript program.

### Your report pattern

```
const res = await fetch(url);
const user = await res.json();

return user.name;
```

Read it in this order:

1. Request the URL.
2. Wait for the response.
3. Parse the response body as JSON.
4. Wait for parsing to finish.
5. Return the user's name.

## 15. `fetch()` and `res.json()`

These two lines have different responsibilities.

```
const res = await fetch(url);
const user = await res.json();
```

- `fetch(url)` makes a network request and returns a Promise for a `Response`.
- `await` waits for that response.
- `res.json()` reads and parses the response body as JSON, returning a Promise.
- The second `await` waits for the parsed result.

For your challenge, the API returns user information. After parsing, `user` contains an object with properties such as `id`, `name`, and `email`.

One practical note: `fetch()` generally doesn't reject just because the server responds with an HTTP error status such as 404. For robust code, check `res.ok` before parsing the response.

```
const res = await fetch(url);

if (!res.ok) {
  throw new Error(`Request failed: ${res.status}`);
}

const user = await res.json();
```

You don't need to add this to your original exercise unless you're extending it, but it's useful to know.

## 16. `Promise.all()` — waiting for multiple Promises

`Promise.all()` accepts an array or other iterable of Promises and returns a Promise for an array of their fulfilled results.

Example:

```
const promises = [
  Promise.resolve(2),
  Promise.resolve(4),
  Promise.resolve(6)
];

const results = await Promise.all(promises);

console.log(results); // [2, 4, 6]
```

### How it works with `map()`

```
const results = await Promise.all(
  ids.map(async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const user = await res.json();

    return user.name;
  })
);
```

Read the structure from the inside out:

1. `ids.map(...)` runs the callback for each ID and creates an array of Promises.
2. `Promise.all(...)` waits for those Promises to fulfill.
3. `await` waits for the combined Promise.
4. `results` receives an array of names.

If any Promise rejects, `Promise.all()` rejects too. It doesn't cancel the other operations.

### Sequential versus concurrent

### Sequential — `for...of`

Request 1

Request 2

Request 3

Each request waits for the previous one to finish.

### Concurrent — `map()` + `Promise.all()`

Request 1

Request 2

Request 3

Requests can overlap in time. `Promise.all()` waits for all successful results.

Your measurements were:

| Version    | Time       |
| ---------- | ---------- |
| Sequential | 776.619 ms |
| Concurrent | 435.180 ms |

The concurrent version was about 44% faster in that run. Network timings vary, so this isn't a guarantee for every run.

## 17. `.then()` — handling a Promise's result

You used this syntax to call your report function:

```
getReport([1, 2, 3]).then((r) => {
  console.log("Report:", r);
});
```

Break it down:

- `getReport([1, 2, 3])` calls the function.
- `.then(...)` registers a callback to run when the returned Promise fulfills.
- `r` receives the fulfilled value.
- `console.log()` prints that value.

The callback does not block the next line while the Promise is pending.

For example:

```
console.log("A");

Promise.resolve("B").then((value) => {
  console.log(value);
});

console.log("C");
```

Output:

```
A
C
B
```

The `.then()` callback runs later as a microtask, after the current synchronous code finishes.

You can also use `await` instead of `.then()` inside an async function:

```
async function main() {
  const result = await getReport([1, 2, 3]);
  console.log("Report:", result);
}

main();
```

Both approaches can handle the result of a Promise.

## 18. `console.log()`, `console.time()`, and `console.timeEnd()`

You used these to inspect the output and compare performance.

### Print a value

```
console.log("Hello");
console.log(10);
console.log([1, 2, 3]);
```

### Measure elapsed time

```
console.time("sequential");

// Run the operation here

console.timeEnd("sequential");
```

Both timer calls must use the same label.

For asynchronous operations, end the timer only after the work has completed:

```
console.time("report");

getReport([1, 2, 3]).then((result) => {
  console.log(result);
  console.timeEnd("report");
});
```

If you put `console.timeEnd()` immediately after calling `getReport()`, it may stop the timer before the network requests finish.

## 19. JavaScript punctuation and syntax symbols

These symbols appear throughout the code you've written. Learn what each one means.

| Symbol      | Name and purpose                                                         | Example                            |
| ----------- | ------------------------------------------------------------------------ | ---------------------------------- |
| `()`        | Parentheses; pass arguments, define parameters, group expressions        | `getReport([1, 2, 3])`             |
| `{}`        | Curly braces; define function bodies and code blocks, or object literals | `if (true) { console.log("Hi"); }` |
| `[]`        | Square brackets; create arrays or access an indexed item                 | `ids[0]`                           |
| `.`         | Dot; access a property or method                                         | `user.name`, `ids.map()`           |
| `,`         | Comma; separate arguments or array items                                 | `[1, 2, 3]`                        |
| `;`         | Semicolon; marks the end of a statement                                  | `const age = 25;`                  |
| `=`         | Assignment; assigns a value                                              | `const id = 1;`                    |
| `=>`        | Arrow function syntax                                                    | `(id) => id * 2`                   |
| `...`       | Spread/rest syntax, depending on context                                 | `[...ids]`                         |
| `` ` ` ``   | Backticks; create template literals                                      | `` `User ${id}` ``                 |
| `${}`       | Insert an expression into a template literal                             | `` `ID: ${id}` ``                  |
| `//`        | Single-line comment                                                      | `// Fetch the user`                |
| `/* ... */` | Multiline comment                                                        | `/* Explanation */`                |

### `?`, `?.`, and `??`

These symbols are easy to confuse because they look similar.

A. Ternary operator — `? :`

This is a short way to choose between two values based on a condition.

```
const age = 25;
const category = age >= 18 ? "Adult" : "Minor";

console.log(category); // Adult
```

The expression before `?` is the condition. If true, the expression before `:` is selected; otherwise, the expression after `:` is selected.

B. Optional chaining — `?.`

This lets you access a property or call a method without throwing an error if the value immediately before `?.` is `null` or `undefined`.

```
const user = null;

console.log(user?.name); // undefined
```

Without optional chaining, `user.name` would throw a `TypeError`.

C. Nullish coalescing — `??`

This supplies a fallback only when the value on the left is `null` or `undefined`.

```
const name = null;
const displayName = name ?? "Guest";

console.log(displayName); // Guest
```

Unlike `||`, `??` doesn't replace valid values such as `0`, `false`, or an empty string.

You haven't needed these operators in the report challenge, but they're useful syntax to recognize when reading JavaScript.

## 20. Comments — documenting your logic

Comments explain the code to people reading it. JavaScript ignores them during normal execution.

```
// Single-line comment

/*
  Multiline comment
  Can span several lines
*/
```

For your challenge, this is a useful comment:

```
// Use for...of when each async iteration must finish before the next begins.
// forEach doesn't wait for promises returned by async callbacks.
// Use map() with Promise.all() for independent operations that can run concurrently.
```

A good comment explains why a decision was made, not just what every line does.

## 21. Putting everything together — your completed challenge

This is the combined pattern you learned. It measures the sequential and concurrent implementations separately.

```

async function report1(ids) {
  const report = [];

  // Process IDs sequentially.
  for (const id of ids) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const user = await res.json();

    report.push(user.name);
  }

  return report;
}

async function report2(ids) {
  // Process independent requests concurrently.
  return Promise.all(
    ids.map(async (id) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const user = await res.json();

      return user.name;
    })
  );
}

// Measure the sequential version.
console.time("sequential");

report1([1, 2, 3]).then((result) => {
  console.log("Report 1:", result);
  console.timeEnd("sequential");

  // Measure the concurrent version after the first finishes.
  console.time("concurrent");

  report2([1, 2, 3]).then((result) => {
    console.log("Report 2:", result);
    console.timeEnd("concurrent");
  });
});

```

This example brings together variables, arrays, functions, arrow functions, callbacks, template literals, object properties, `for...of`, `map()`, `async/await`, `fetch()`, `Promise.all()`, `.then()`, and timing.

## 22. Quick revision checklist

Use this checklist to test whether you understand each topic rather than merely recognize the syntax.

### Revision progress

0 of 10

Variables and data types

Explain const, let, arrays, objects, and strings.

Properties and arrays

Explain user.name, ids[0], length, and push().

Functions and return

Explain parameters, arguments, return, and arrow functions.

Callbacks

Explain why forEach() and map() accept functions.

Loops

Explain forEach() versus for...of with asynchronous code.

Async and await

Explain what an async function returns and what await does.

Fetching data

Explain fetch(), res.json(), and user.name.

map() and Promise.all()

Explain why map(async ...) creates Promises and how Promise.all() collects results.

.then() and timers

Explain when a callback runs and why the timer must stop after completion.

Syntax symbols

Recognize (), {}, [], ., =>, ?, ?., ??, backticks, and comments.

The most important takeaway from your challenge: `for...of` with `await` gives you sequential execution. `map()` with an `async` callback creates an array of Promises, and `Promise.all()` lets you await their results together. That distinction explains both the original empty-report bug and why your concurrent version was faster in your measured run.&#x20;

Good question. The confusing part is that `Promise.resolve(2)` looks like you're just putting a number inside a function. But the real purpose is to create a Promise that succeeds with a particular value.

Let's build this from the beginning, using actual examples.

## 1. First, understand what a Promise represents

Imagine you're fetching a user's details from a server. The request takes time, so you don't have the result immediately.

A Promise represents that operation and its eventual outcome.

It can be in three states:

Pending

The operation hasn't finished yet.

Example: Waiting for a user API request.

Fulfilled (resolved successfully)

The operation succeeded and produced a value.

Example: The server returned the user details.

Rejected

The operation failed with a reason, usually an error.

Example: A request fails because the network is unavailable.

One terminology detail: pending, fulfilled, and rejected are the three Promise states. `resolve()` and `reject()` are functions used to settle a Promise; they are not states themselves.

## 2. What does `Promise.resolve()` actually do?

Look at this:

```
const promise = Promise.resolve(25);
```

Read it as:

> Create a Promise that is already fulfilled with the value `25`.

You can pass different kinds of values to it:

```
Promise.resolve(25);            // A number
Promise.resolve("Hello");       // A string
Promise.resolve(true);          // A boolean
Promise.resolve([1, 2, 3]);     // An array
Promise.resolve({ id: 1 });     // An object
```

So yes, `Promise.resolve(true)` is valid. It creates a Promise fulfilled with `true`.

But why would we use it? Let's see.

## 3. How do we get the value back?

We can use `.then()` to receive the fulfilled value.

```
const promise = Promise.resolve(25);

promise.then((value) => {
  console.log(value);
});
```

Output:

```
25
```

Follow the flow:

`Promise.resolve(25)`

Creates a fulfilled Promise

`.then((value) => ...)`

Receives the fulfilled value

`value = 25`

Notice that `value` is just a parameter name. You could call it `result` instead:

```
Promise.resolve(25).then((result) => {
  console.log(result); // 25
});
```

The name doesn't matter; the fulfilled value is passed to the callback.

## 4. What about `resolve()` and `reject()` inside a real Promise?

This is the part that usually makes everything click.

JavaScript lets you create your own Promise using the `new Promise()` constructor:

```
const promise = new Promise((resolve, reject) => {
  resolve("Task completed!");
});
```

Here is what each part means:

- `new Promise(...)` creates a Promise.
- The function inside is called the executor. JavaScript runs it immediately.
- `resolve` is a function that fulfills the Promise with a value.
- `reject` is a function that rejects the Promise with a reason.

In this example:

```
resolve("Task completed!");
```

The string `"Task completed!"` becomes the Promise's fulfilled value.

You can receive it with `.then()`:

```
const promise = new Promise((resolve, reject) => {
  resolve("Task completed!");
});

promise.then((result) => {
  console.log(result);
});
```

Output:

```
Task completed!
```

### What if the operation fails?

```
const promise = new Promise((resolve, reject) => {
  reject(new Error("Task failed!"));
});

promise.catch((error) => {
  console.log(error.message);
});
```

Output:

```
Task failed!
```

Here, `reject()` receives the reason for failure. We use `.catch()` to handle that rejection.

Important: You don't need to create every Promise manually with `new Promise()`. Functions like `fetch()` already return Promises for you.

## 5. Now let's connect this to your report challenge

Suppose you have three tasks, and each task produces a result:

```
const task1 = Promise.resolve("Leanne Graham");
const task2 = Promise.resolve("Ervin Howell");
const task3 = Promise.resolve("Clementine Bauch");
```

Each variable contains a Promise that has already fulfilled with a name.

Now combine them:

```
const results = await Promise.all([
  task1,
  task2,
  task3
]);

console.log(results);
```

Output:

```
["Leanne Graham", "Ervin Howell", "Clementine Bauch"]
```

`Promise.all()` takes the three Promises and gives you one Promise that fulfills with an array of their results.

Why is this useful? In your real report challenge, you didn't manually create these Promises. Instead, the `async` callbacks passed to `map()` produced them.

```
const results = await Promise.all(
  ids.map(async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const user = await res.json();
    return user.name;
  })
);
```

Each callback's Promise eventually produces a name. `Promise.all()` collects all three names into one array.

## 6. The practical difference to remember

| Syntax                                  | What it does                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------ |
| `Promise.resolve(value)`                | Creates a fulfilled Promise from a value, or adopts a supplied Promise/thenable's outcome. |
| `new Promise((resolve, reject) => ...)` | Lets you create a Promise and explicitly settle it.                                        |
| `resolve(value)`                        | Fulfills that Promise with a value, unless it has already been settled.                    |
| `reject(error)`                         | Rejects that Promise with a reason, unless it has already been settled.                    |
| `.then(callback)`                       | Handles a fulfilled result.                                                                |
| `.catch(callback)`                      | Handles a rejection.                                                                       |
| `Promise.all([...])`                    | Waits for all supplied Promises to fulfill; rejects if one rejects.                        |

One final point: in real application code, don't wrap an operation in `new Promise()` unless you need to convert a callback-based API or manage a custom asynchronous operation. `Promise.resolve()` is especially useful for converting an ordinary value into a Promise-compatible result, while `Promise.all()` is useful when you need the results of several asynchronous operations together.

A Promise has three states:
1. Pending — the operation is still in progress.
2. Fulfilled — the operation completed successfully with a value.
3. Rejected — the operation failed.
There is no separate Promise state called resolved or completed.

For example:
const promise = Promise.resolve("Success");


Here, Promise.resolve() creates a Promise that is fulfilled with "Success".

Remember the difference:
- Resolved describes a Promise whose outcome has been settled or locked in, sometimes by adopting another Promise's outcome.
- Fulfilled is the specific state meaning the Promise succeeded.
- Rejected means it failed.

Here are concise, copy-paste-ready notes for your `Notes/git.md`, based on what you encountered today.

# Git Notes — Today's Learnings

## 1. `git add .` vs `git add -A`

- `git add .` — stages new and modified files under the current directory.
- `git add -A` — stages all changes across the repository's working tree.
- If you're inside a subfolder, `git add .` may not stage files in sibling folders.

**Example:**

```
# Current directory: qa-gym/JS
git add .

# Stage a file in the sibling Notes folder
git add ../Notes/TheEmptyReport.md

# Stage all changes across the repository
git add -A
```

`..` means the parent directory; `.` means the current directory.

## 2. Understand `git status`

```
git status
```

Use this to check:

- Which files are modified.
- Which files are untracked.
- Which files are staged and ready to commit.
- Whether your branch is ahead of or behind its remote branch.

**Untracked** means Git knows the file exists but isn't tracking it yet. Use `git add` to start tracking it.

## 3. Non-fast-forward push error

```
! [rejected] main -> main (non-fast-forward)
```

**Why it happened:** GitHub had commits that my local `main` branch didn't contain. Git rejected the push to protect the remote history.

**Fix:**

```
git pull --rebase origin main
git push -u origin main
```

Rebase replayed my local commit on top of the latest remote commits, allowing the histories to be updated safely.

## 4. Understanding `git log --graph`

```
git log --oneline --graph --decorate --all -10
```

- `--oneline` — displays each commit on one line.
- `--graph` — displays branches and merge relationships.
- `--decorate` — shows branch and remote references.
- `--all` — includes commits reachable from all local references.
- `-10` — displays up to 10 commits.

Useful for understanding why local and remote branches have diverged.

## 5. Rebase changes commit hashes

After running:

```
git pull --rebase origin main
```

My `The empty report` commit changed from `eb08274` to `b98048d`.

This is normal: rebase creates a new commit with the same changes but a different history position, so its hash changes.

## My key takeaways

- Check `git status` before committing or pushing.
- Remember that `git add .` depends on the current directory.
- Use `git add -A` when I want to stage changes throughout the repository.
- If a push is rejected because the remote is ahead, inspect the history and integrate remote changes before pushing.
- Use `git log --oneline --graph --decorate --all` to visualize commit history.

Suggested workflow for your next commit:

```
git status
git add -A
git status
git commit -m "Add JavaScript report challenge notes"
git push
```

One important habit: check `git status` after staging. It confirms exactly which files will be included in your next commit.