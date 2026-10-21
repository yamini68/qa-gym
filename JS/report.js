
async function report1(ids) {
  const report = [];

 for(const id of ids){
  const res = await fetch (`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();
  report.push(user.name)
}
  return report;
}




//we need to use for..of instead of foreach because foreach doesn't wait for async callbacks to completes it will simply pass the values 

async function report2(ids){
  
 return Promise.all( ids.map(async (id)=>{
    const res = await fetch (`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();
  
  return user.name
  })
)
}

console.time("sequential");

report1([1, 2, 3]).then((r) => {
  console.log("Report 1:", r);
  console.timeEnd("sequential");

  console.time("concurrent");

  report2([1, 2, 3]).then((r) => {
    console.log("Report 2:", r);
    console.timeEnd("concurrent");
  });
});

  



