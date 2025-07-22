const obj = { prop1: 1, prop2: 2, prop3: true, prop4: 'test', prop5: 10 }


let resultObj = {}

for(key in obj){
    if(typeof obj[key]==='number'&&obj[key]%2===0){
        resultObj[key]=obj[key]
    }
}

console.log(resultObj); // { prop2: 2, prop5: 10 }