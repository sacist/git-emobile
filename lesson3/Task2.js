const array = [1,2,3,5,7,9]

const sorted=[...array].sort((a,b)=>a-b)

let isSortedArray = true

for(let i =0;i<array.length;i++){
    if(sorted[i]!==array[i]){
        isSortedArray=false
        break
    }
}

console.log(isSortedArray);

