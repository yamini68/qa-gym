/* 
1. I will make a register of users with there data of attemts both passed and failed 
2. for each user i will sort the times array 
3. for each user i will check wheather the attempt one is passed or failed . if failed i will put in one other box 
if passed i will reset the box i mean i will remove the earlier entry
4. i will reapeat this for all users
5, Then i will check the difference between eacg attempt time and store that results in array and finally
i will add the eleemnts in tha array then find out the attems less than 5 or not 

*/

// Approach -1 [ using loops]

/*
function lockedUsers(attempts) {

  attempts.sort((a,b)=> a.t - b.t)

    const users = {};
    const Locked_Users = [];

    attempts.forEach(
      
      (element) => {

   if(!users[element.user]){
     users[element.user] = []
   }

   users[element.user].push(element)
 

    }
  
  );


for (const [user, attempts] of Object.entries(users)) {
  const failures = [];

  for (const attempt of attempts) {
    if (attempt.ok === true) {
      failures.length = 0;
    } 
    else {

      while (failures.length > 0 && attempt.t - failures[0] > 5) {
              failures.shift();
       }


            failures.push(attempt.t);

            if (failures.length >= 3 && !Locked_Users.includes(user)){
              Locked_Users.push(user)
            }
    
    }
  }
}

return Locked_Users 

}



const attempts = [
  { user: "asha",  t: 1,  ok: false }, { user: "ravi",  t: 2,  ok: false },
  { user: "asha",  t: 3,  ok: false }, { user: "asha",  t: 9,  ok: false },
  { user: "ravi",  t: 6,  ok: false }, { user: "ravi",  t: 4,  ok: false },
  { user: "meena", t: 7,  ok: false }, { user: "meena", t: 8,  ok: true  },
  { user: "meena", t: 10, ok: false }, { user: "meena", t: 9,  ok: false },
];   // t = minutes

console.log(lockedUsers(attempts));   // expected: ["ravi"]

*/

// Approach 2 - using maps and sets 

function lockedUsers(attempts) {
  // Process attempts in chronological order
  attempts.sort((a, b) => a.t - b.t);

  const failuresByUser = new Map();
  const lockedUsers = new Set();

  for (const attempt of attempts) {
    const { user, t, ok } = attempt;

    // Create an empty failure array for a new user
    if (!failuresByUser.has(user)) {
      failuresByUser.set(user, []);
    }

    // Get this user's existing failure array
    const failures = failuresByUser.get(user);

    // Successful login resets recent failures
    if (ok === true) {
      failures.length = 0;
      continue;
    }

    // Remove failures older than 5 minutes
    while (failures.length > 0 && t - failures[0] > 5) {
      failures.shift();
    }

    // Record the current failure
    failures.push(t);

    // Three failures within 5 minutes means locked
    if (failures.length >= 3) {
      lockedUsers.add(user);
    }
  }

  // Convert the Set into a normal array
  return [...lockedUsers];
}

// Without resetting failures on success, the result would be:
// ["ravi", "meena"]


const attempts = [
  { user: "asha",  t: 1,  ok: false }, { user: "ravi",  t: 2,  ok: false },
  { user: "asha",  t: 3,  ok: false }, { user: "asha",  t: 9,  ok: false },
  { user: "ravi",  t: 6,  ok: false }, { user: "ravi",  t: 4,  ok: false },
  { user: "meena", t: 7,  ok: false }, { user: "meena", t: 8,  ok: true  },
  { user: "meena", t: 10, ok: false }, { user: "meena", t: 9,  ok: false },
];   // t = minutes

console.log(lockedUsers(attempts));