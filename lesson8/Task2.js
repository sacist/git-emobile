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

(async()=>{
	try {
		const [res1,res2]=Promise.all([Request1(),Request2()])
		console.log(res1,res2);
	} catch (e) {
		console.log(e);
	}
})()