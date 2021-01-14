let isDone: boolean = false



let decimal: number = 6
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
// let bigint: bigint = 100n;



let color: string = "blue";
color = 'red';
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;



let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];



// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
// x = [10, "hello"]; // Error

console.log(x[0].substring(1)); // OK
// console.log(x[1].substring(1)); // Error



enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum IndexedColor {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = Color[2];
console.log(colorName);



// Type assertions
let someVal: unknown = "String";
let strLen: number = (someVal as string).length;
let strLen2: number = (<string> someVal).length;



function reverse(s: String): String {
  return s.split('').reverse().join('');
}
const rv1 = reverse('HELLO WORLD');

function reverse2(s: string): string {
  return s.split('').reverse().join('');
}
const rv2 = reverse2('hello world');
console.log(rv1, rv2);
