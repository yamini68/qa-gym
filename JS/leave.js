// const leave = {
//     monthsWorked : 4 ,
//     carriedForward : 5 ,
//     taken : 3 
// }

function leaveBalance ({ monthsWorked ,carriedForward , taken }){

    let earnedLeave = monthsWorked*1.5
    let carryforwardCap = 10

    let carryforwardValue = carriedForward


    let finalBalance = earnedLeave + Math.min(carryforwardValue,10 ) - taken 

    if (finalBalance < -2){
        
        throw new Error("Insufficient leave");
    
    }
    else{
        return finalBalance 
    }
    
 
}

console.assert(
    leaveBalance({ monthsWorked: 4, carriedForward: 5, taken: 3 }) === 8
);

console.assert(
    leaveBalance({ monthsWorked: 0, carriedForward: 5, taken: 3 }) === 2
);

console.assert(
    leaveBalance({ monthsWorked: 3, carriedForward: 2, taken: 2 }) === 4.5
);

console.assert(
    leaveBalance({ monthsWorked: 2, carriedForward: 10, taken: 3 }) === 10
);

console.assert(
    leaveBalance({ monthsWorked: 2, carriedForward: 11, taken: 3 }) === 10
);

console.assert(
    leaveBalance({ monthsWorked: 0, carriedForward: 0, taken: 2 }) === -2
);

console.assert(
    leaveBalance({ monthsWorked: 6, carriedForward: 0, taken: 2 }) === 7
);

let errorCaught = false;

try {
    leaveBalance({
        monthsWorked: 1,
        carriedForward: 0,
        taken: 4
    });
} catch (error) {
    errorCaught = true;

    console.log(error.message);

    console.assert(
        error.message === "Insufficient leave",
        "Incorrect error message"
    );
}

console.assert(
    errorCaught === true,
    "Expected Insufficient leave error was not thrown"
);

console.log("Tests finished!");