
const arr=[1, 2, 3, 4, 10, 11, 3, 15, 20]

const sortedOdd=arr.filter((num)=>num%2!==0).sort((a,b)=>a-b)

let oddIndex=0

const res=arr.map((el)=>{
    if(el%2!==0){
        oddIndex++
        return sortedOdd[oddIndex-1]
    }
    return el
})

console.log(res);
