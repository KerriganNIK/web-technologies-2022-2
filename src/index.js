//Задание 1
function pickPropArray(students, property){
    let result = [];

    students.forEach(item => item[property] && result.push(item[property]));

    return result;
}

const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
]

const result = pickPropArray(students, 'name')

console.log(result)
// [ 'Павел', 'Иван', 'Эдем', 'Денис', 'Виктория' ]

//Задание 2
function createCounter() {
    let count = 0;

    return function () {
        return ++count;
    }
}

const counter1 = createCounter()
console.log(counter1()) // 1
console.log(counter1()) // 2

const counter2 = createCounter()
console.log(counter2()) // 1
console.log(counter2()) // 2


//Задание 3
function spinWords(str){
    let array = [];
    array = str.split(' ');

    array.forEach((item, index) => {
        if(item.length >= 5){
            array[index] = item.split('').reverse().join('');
        }
    });

    return array.join(' ');
}

const result1 = spinWords( "Привет от Legacy" )
console.log(result1) // тевирП от ycageL

const result2 = spinWords( "This is a test" )
console.log(result2) // This is a test

//Задание 4
function getIndex(nums, target){
    for(let i = 0; i < nums.length; i++) {
        for(let j = 0; j < nums.length; j++) {
            if(nums[i] + nums[j] === target){
                return [i, j];
            }
        }
    }

    return null;
}

const nums = [2,7,11,15];
const target = 9;

const resultIndex = getIndex(nums, target)
console.log(resultIndex)