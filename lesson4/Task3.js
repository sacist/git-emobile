const obj = {
	prop1: null,
	prop2: {},
	prop3: 3,
	prop4: 'str',
	prop5: 100,
	prop6:undefined
}
const result = {};

for(key in obj){
	const type=typeof obj[key]
	console.log(type);
	
	if(obj[key]===null){
		if(!result.null){
			result.null=1
		}else{
			result.null+=1
		}
		continue
	}

	if(!result[type]){
		result[type]=1
	}else{
		result[type]+=1
	}
}

console.log(result); // {null: 1, object: 1, string: 1, number: 2}