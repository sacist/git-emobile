const Request1 = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success request1');
	}, 100)
});

const Request2 = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success request2');
	}, 1010)
});

// через async/await
(async()=>{
	const res1=await Request1()
	console.log(res1);
	const res2=await Request2()
	console.log(res2);
	
})()
// Через .then
Request1().then((data)=>{
	console.log(data);
	Request2().then((data)=>{
		console.log(data);
	})
})
