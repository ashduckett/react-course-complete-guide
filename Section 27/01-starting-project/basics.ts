// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

// let age: number;
let age: number = 24;
age = 12;

let userName: string | string[];
userName = 'Max';

let isInstructor: boolean;
isInstructor = true;

// let hobbies: null;
// hobbies = 12;

let hobbies: string[];
hobbies = ['Sports', 'Cooking'];


type Person = {
    name: string;
    age: number;
};

let person: Person;

person = {
    name: 'Max',
    age: 32
}

// person = {
//     isEmployee: true
// }

let people: Person[];

// Type inference
// let course: string = 'React - The Complete Guide';
let course: string | number = 'React - The Complete Guide';
course = 12341;

// Functions & types
function add(a: number, b: number): number {
    return a + b;
}

function printOutput(value: any) {
    console.log(value);
}

function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1);
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');

// No error without generics!
updatedArray[0].split(' ');