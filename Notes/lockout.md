
Revision notebook · Approach 1: Object grouping · Approach 2: Map and Set · Arrays, references, loops and sliding windows

# Part 1 — Understand the original data

Our challenge starts with an array of objects.

```
const attempts = [
  { user: "asha",  t: 1,  ok: false },
  { user: "ravi",  t: 2,  ok: false },
  { user: "asha",  t: 3,  ok: false },
  { user: "asha",  t: 9,  ok: false },
  { user: "ravi",  t: 6,  ok: false },
  { user: "ravi",  t: 4,  ok: false },
  { user: "meena", t: 7,  ok: false },
  { user: "meena", t: 8,  ok: true  },
  { user: "meena", t: 10, ok: false },
  { user: "meena", t: 9,  ok: false },
];
```

## 1.1 Visualize the original array

`attempts`

One array containing 10 objects

0

{ user: "asha", t: 1, ok: false }

1

{ user: "ravi", t: 2, ok: false }

2

{ user: "asha", t: 3, ok: false }

3

{ user: "asha", t: 9, ok: false }

4

{ user: "ravi", t: 6, ok: false }

5

{ user: "ravi", t: 4, ok: false }

6

{ user: "meena", t: 7, ok: false }

7

{ user: "meena", t: 8, ok: true }

8

{ user: "meena", t: 10, ok: false }

9

{ user: "meena", t: 9, ok: false }

Each object has three properties:

| Property | Meaning                 | Example  |
| -------- | ----------------------- | -------- |
| `user`   | Username                | `"ravi"` |
| `t`      | Timestamp               | `6`      |
| `ok`     | Whether login succeeded | `false`  |

Important distinctions:

- The outer `[]` creates an array.
- Each `{ ... }` creates an object.
- `attempts[0]` accesses the first object.
- `attempts[0].user` accesses `"asha"`.
- `attempts[0].t` accesses `1`.

The array index starts at `0`, not `1`.

# Part 2 — Sorting the attempts

```
attempts.sort((a, b) => a.t - b.t);
```

### What is this syntax?

- `.sort()` sorts an array.
- `a` and `b` are two objects that the sorting callback compares.
- `a.t` reads the timestamp from object `a`.
- `b.t` reads the timestamp from object `b`.
- `a.t - b.t` tells JavaScript which timestamp comes first.

If the result is negative, `a` comes before `b`. If positive, `b` comes before `a`. If zero, their timestamps are equal.

The arrow function `(a, b) => a.t - b.t` is a callback passed to `.sort()`.

### Before sorting

```
[
  { user: "ravi", t: 6, ok: false },
  { user: "ravi", t: 4, ok: false }
]
```

### After sorting

```
[
  { user: "ravi", t: 4, ok: false },
  { user: "ravi", t: 6, ok: false }
]
```

The objects themselves are not converted into something else. Only their order changes.

Also, `.sort()` modifies the original array.

# Part 3 — Approach 1: Group objects using a regular object

This was your first working approach.

## 3.1 Create an empty object

```
const users = {};
```

Before:

```
users
  |
  v
{}
```

This creates an empty object. It has no username properties yet.

## 3.2 Loop through the attempts

```
attempts.forEach((element) => {
  if (!users[element.user]) {
    users[element.user] = [];
  }

  users[element.user].push(element);
});
```

Let's break this into three operations.

### Operation A — Get the username

Suppose the first object is:

```
element = { user: "asha", t: 1, ok: false };
```

This expression:

```
element.user
```

returns:

```
"asha"
```

### Operation B — Create an array for a new user

```
if (!users[element.user]) {
  users[element.user] = [];
}
```

For Asha, `users["asha"]` doesn't exist yet.

Therefore, the condition is true, and JavaScript creates an empty array.

Before:

```
users = {};
```

After:

```
users = {
  asha: []
};
```

### Operation C — Push the entire object

```
users[element.user].push(element);
```

Notice that we're pushing `element`, not `element.t`.

So the entire object goes into the array.

Before:

```
users = {
  asha: []
};
```

After:

```
users = {
  asha: [
    { user: "asha", t: 1, ok: false }
  ]
};
```

This is a key distinction:

```
array.push(element);   // Adds the entire object
array.push(element.t); // Adds only the timestamp
```

## 3.3 Visualize the grouping over several iterations

Starting state

```
{}
```

After iteration 1: Asha, time 1

```
{
  asha: [
    { user: "asha", t: 1, ok: false }
  ]
}
```

After iteration 2: Ravi, time 2

```
{
  asha: [
    { user: "asha", t: 1, ok: false }
  ],
  ravi: [
    { user: "ravi", t: 2, ok: false }
  ]
}
```

After iteration 3: Asha, time 3

```
{
  asha: [
    { user: "asha", t: 1, ok: false },
    { user: "asha", t: 3, ok: false }
  ],
  ravi: [
    { user: "ravi", t: 2, ok: false }
  ]
}
```

When Asha appears again, this condition is false:

```
if (!users[element.user])
```

Asha already exists, so we do not create a new array. We push into her existing array.

The final grouped object looks like this:

```
{
  asha: [
    { user: "asha", t: 1, ok: false },
    { user: "asha", t: 3, ok: false },
    { user: "asha", t: 9, ok: false }
  ],
  ravi: [
    { user: "ravi", t: 2, ok: false },
    { user: "ravi", t: 4, ok: false },
    { user: "ravi", t: 6, ok: false }
  ],
  meena: [
    { user: "meena", t: 7, ok: false },
    { user: "meena", t: 8, ok: true },
    { user: "meena", t: 9, ok: false },
    { user: "meena", t: 10, ok: false }
  ]
}
```

The object now has one property per username, and each property's value is an array of that user's complete attempt objects.

# Part 4 — What does `Object.entries()` do?

This was one of the most important concepts in your first approach.

```
Object.entries(users)
```

`Object.entries()` converts an object's enumerable properties into an array of key-value pairs.

It does not change the original object.

## 4.1 Before conversion

```
const users = {
  asha: [{ user: "asha", t: 1, ok: false }],
  ravi: [{ user: "ravi", t: 2, ok: false }]
};
```

Visual structure:

Object: `users`

`"asha"`

Array of Asha's objects

`"ravi"`

Array of Ravi's objects

## 4.2 After conversion

```
Object.entries(users);
```

Returns:

```
[
  [
    "asha",
    [{ user: "asha", t: 1, ok: false }]
  ],
  [
    "ravi",
    [{ user: "ravi", t: 2, ok: false }]
  ]
]
```

Visualize the nested array:

Outer array — index 0

`"asha"`

Index 0: username

`[{ user: "asha", t: 1, ok: false }]`

Index 1: value

Outer array — index 1

`"ravi"`

Index 0: username

`[{ user: "ravi", t: 2, ok: false }]`

Index 1: value

Every entry is a two-item array:

```
[ key, value ]
```

Here:

- Index `0` contains the username.
- Index `1` contains the array of attempt objects.

## 4.3 Unpacking the entries with a loop

```
for (const [user, userAttempts] of Object.entries(users)) {
```

This uses array destructuring.

Imagine the loop receives this pair:

```
["ravi", [{ user: "ravi", t: 2, ok: false }]]
```

Destructuring assigns the pair's first and second values to variables:

```
const user = "ravi";
const userAttempts = [{ user: "ravi", t: 2, ok: false }];
```

`userAttempts` is an array of objects, not a single object.

The outer loop handles each user. The inner loop then handles each attempt for that user.

```
for (const [user, userAttempts] of Object.entries(users)) {
  const failures = [];

  for (const attempt of userAttempts) {
    // Process one attempt
  }
}
```

The outer loop creates a fresh `failures` array for each user. The inner loop processes that user's attempts one by one.

That means Approach 1 has a grouping pass, followed by processing grouped users and their attempts.

# Part 5 — Approach 2: Map and Set

The second approach avoids creating a separate grouped object of full attempt objects. Instead, it processes each chronologically sorted attempt and stores only the recent failure timestamps.

## 5.1 Create a Map

```
const failuresByUser = new Map();
```

Initially:

```
failuresByUser
       |
       v
    Map {}
```

A `Map` stores key-value pairs. Here, the key is a username and the value is an array of failure timestamps.

```
failuresByUser.set("ravi", []);
```

After this line:

```
Map
 |
 +-- "ravi" ------> []
```

The value is an empty array.

## 5.2 Check whether the user exists

```
if (!failuresByUser.has(user)) {
  failuresByUser.set(user, []);
}
```

For Ravi's first attempt:

```
failuresByUser.has("ravi"); // false
```

So we create the entry:

```
Map {
  "ravi" => []
}
```

For Ravi's next attempt:

```
failuresByUser.has("ravi"); // true
```

The `if` block is skipped. We don't replace Ravi's array with a new one.

## 5.3 Retrieve the existing array

```
const failures = failuresByUser.get(user);
```

Suppose the Map contains:

```
Map {
  "ravi" => [2, 4]
}
```

Then:

```
const failures = failuresByUser.get("ravi");
```

The variable `failures` refers to the existing array `[2, 4]`.

It does not create a copy.

### The memory visualization

Map entry

`"ravi"`

Array A: `[2, 4]`

Same array reference

Variable `failures`

Also refers to Array A

Now:

```
failures.push(6);
```

Array A becomes `[2, 4, 6]`.

Since the Map entry still refers to Array A, the Map now shows:

```
Map {
  "ravi" => [2, 4, 6]
}
```

This is reference behavior. The variable and the Map entry give you two ways to access the same array.

## 5.4 Mutation versus reassignment

These two operations are different.

Mutation — changing the existing array

```
failures.push(6);
```

The existing array changes. Anyone referring to that array sees the change.

Reassignment — making a variable refer to another array

```
let failures = failuresByUser.get("ravi");
failures = [7, 8];
```

Now `failures` refers to a new array. The Map still points to the original array.

| Operation                        | What happens?                                  |
| -------------------------------- | ---------------------------------------------- |
| `failures.push(6)`               | Modifies the existing array                    |
| `failures.shift()`               | Removes the first item from the existing array |
| `failures.length = 0`            | Clears the existing array                      |
| `failures = [7, 8]`              | Reassigns the variable to a different array    |
| `failuresByUser.set("ravi", [])` | Stores a new empty array under Ravi's key      |

Also, `const` prevents reassignment of the variable, not mutation of the array it refers to.

# Part 6 — The sliding window

The sliding window keeps only failure timestamps that are within five minutes of the current attempt.

```
while (failures.length > 0 && t - failures[0] > 5) {
  failures.shift();
}
```

Let's inspect each part.

- `failures.length > 0` checks that the array is not empty.
- `failures[0]` reads the oldest timestamp.
- `t - failures[0] > 5` checks whether the oldest timestamp is more than five minutes old.
- `shift()` removes the oldest timestamp.
- `while` repeats the check until no old timestamps remain.

### Example

Current attempt time:

```
const t = 12;
```

Existing failures:

```
failures = [2, 3, 8];
```

Before the loop

t = 12

## 2

10 min ago

## 3

9 min ago

## 8

4 min ago

Check 1

`12 - 2 = 10`, greater than 5. Remove `2`.

2

3

8

Check 2

`12 - 3 = 9`, greater than 5. Remove `3`.

2, 3

8

Check 3

`12 - 8 = 4`, not greater than 5. Stop.

After the loop

```
failures = [8];
```

Then the next line runs:

```
failures.push(t);
```

It adds `12`, giving:

```
failures = [8, 12];
```

Note the boundary rule: a failure exactly five minutes old is retained. We use `> 5`, not `>= 5`.

# Part 7 — Success resets the array

```
if (ok === true) {
  failures.length = 0;
  continue;
}
```

Suppose Meena's recent failures are:

```
Map {
  "meena" => [7]
}
```

Then she succeeds at time `8`.

The code retrieves her array and clears it:

```
failures.length = 0;
```

The result is:

```
Map {
  "meena" => []
}
```

The array is cleared in place, so the Map reflects the change.

The `continue` statement skips the rest of the current iteration. We don't push a timestamp for a successful login.

If the next failure is at time `9`, Meena's array becomes `[9]`, not `[7, 9]`.

# Part 8 — Why use a Set for locked users?

```
const lockedUsers = new Set();
```

Initially:

```
Set {}
```

When Ravi reaches three recent failures:

```
lockedUsers.add("ravi");
```

The Set becomes:

```
Set { "ravi" }
```

If the code encounters Ravi again and runs:

```
lockedUsers.add("ravi");
```

the Set still contains only one `"ravi"`.

A Set stores unique values.

To check if a user is already locked:

```
lockedUsers.has("ravi"); // true
```

To convert the Set into a normal array:

```
return [...lockedUsers];
```

Result:

```
["ravi"]
```

The square brackets create an array, and the spread syntax places the Set's values into it.

# Part 9 — Important JavaScript syntax cheat sheet

| Syntax                               | Meaning                                       |
| ------------------------------------ | --------------------------------------------- |
| `function lockedUsers(attempts)`     | Declares a function with a parameter          |
| `attempts.sort((a, b) => a.t - b.t)` | Sorts objects by timestamp                    |
| `attempts.forEach(callback)`         | Calls a callback for each array element       |
| `for (const attempt of attempts)`    | Iterates over array values                    |
| `if (!condition)`                    | Runs the block when the condition is false    |
| `const { user, t, ok } = attempt`    | Object destructuring                          |
| `const [user, userAttempts] = entry` | Array destructuring                           |
| `Object.entries(users)`              | Converts object properties to key-value pairs |
| `map.has(key)`                       | Checks whether a Map contains a key           |
| `map.set(key, value)`                | Adds or updates a Map entry                   |
| `map.get(key)`                       | Retrieves the stored value                    |
| `array.push(value)`                  | Adds a value to the end                       |
| `array.shift()`                      | Removes the first value                       |
| `array.length = 0`                   | Clears an existing array                      |
| `continue`                           | Skips to the next loop iteration              |
| `set.add(value)`                     | Adds a unique value to a Set                  |
| `set.has(value)`                     | Checks whether a value exists in a Set        |
| `[...set]`                           | Creates an array from Set values              |
| `===`                                | Strict equality comparison                    |
| `&&`                                 | Logical AND; both conditions must be true     |
| `!`                                  | Logical NOT; reverses a boolean               |

# Part 10 — Compare the two approaches

| Topic                             | Approach 1                                 | Approach 2                                                          |
| --------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Grouping structure                | Regular object                             | Map                                                                 |
| What each user's array stores     | Complete attempt objects                   | Failure timestamps                                                  |
| Processing                        | Group first, then process each user        | Process each sorted attempt                                         |
| Loops                             | Grouping loop plus nested processing loops | One loop with a `while` for expired failures                        |
| Preventing duplicate locked users | Array and `.includes()`                    | Set                                                                 |
| Retrieving data                   | `users[user]`                              | `failuresByUser.get(user)`                                          |
| Checking whether a user exists    | `users[user]`                              | `failuresByUser.has(user)`                                          |
| Main benefit                      | Makes grouping easy to visualize           | Processes attempts directly and keeps the state needed for the rule |

Both approaches are valid for this challenge. Approach 2 avoids storing the full attempt objects in separate user arrays.

One performance detail: sorting takes \\(O(n \log n)\\) time. After sorting, Approach 2 processes the attempts in a single pass conceptually, although repeated `shift()` operations can add cost. You can optimize the sliding window further with a queue and a head index later.

# Final memory map

Sorted `attempts` array

Each element is an attempt object

Loop over each attempt

Extract `user`, `t`, and `ok`

`failuresByUser` — Map

Username → array of recent failure timestamps

```
Map {
  "asha"  => [9],
  "ravi"  => [2, 4, 6],
  "meena" => [9, 10]
}
```

`lockedUsers` — Set

Users with three failures within five minutes

```
Set { "ravi" }
```

Return array

# `["ravi"]`

Your most important takeaways from this challenge are how nested data is structured, how `Object.entries()` transforms an object into key-value pairs, how Map lookups return existing array references, how mutation differs from reassignment, and how a sliding window removes old timestamps. These concepts will be useful in many future JavaScript challenges.&#x20;