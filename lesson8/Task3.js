const Request1 = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success');
	}, 100)
});

const Request2 = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		reject('Ошибка');
	}, 100)
});


Promise.any([Request1(),Request2()]).then((data)=>{
	console.log(data);
}).catch((error)=>{
	console.log(error);
})