const array = [
    {category: "perro"},
    {category: "perro"},
    {category: "gato"},
    {category: "perro"}
]

const onlyArray = []

const arrayNew = array.filter(item=>{
    if(onlyArray.includes(item.category)){
        return false;
    }else{
        onlyArray.push(item.category);
        return true;
    }
})

console.log(arrayNew)