const res = await fetch("http://localhost:8000/scores", {
    method: "POST", headers: {
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({name:"Zerobear",seconds:100}),
})
const response= await res.json();
console.log(response);