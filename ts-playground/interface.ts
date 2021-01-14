// function printLabel(labeledObj: { label: string }) {
//   console.log(labeledObj.label);
// }
interface LabeledValue {
  label: String;
}
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Objects" };
printLabel(myObj);



interface SquareConfig {
  color?: string;
  width?: number;
}
// BETTER APPROACH
interface SquareConfigExt {
  color?: string;
  width?: number;
  [propName: string]: any;
}
function createSquare(config: SquareConfigExt): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
console.log(mySquare);

// excess property checking, failed: `opacity` not exist
// let squareExtend = createSquare({ width: 100, opacity: 0.5 });

// Fix by type assertion
// let squareExtend = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
// console.log('Type assertion', squareExtend);


let mySquareEx = createSquare({ opacity: 0.5, width: 100 });
console.log('BETTER APPROACH', mySquareEx);

let mySquare2 = createSquare({ opacity: 0.5});



interface Point {
  readonly x: number,
  readonly y: number,
}

let p1: Point = {x: 10, y: 20};
// p1.x = 6; // error



let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// ro[0] = 6; // error
// ro.push(5); // error
// ro.length = 100; // error

// a = ro; // error
a = ro as number[];  // type assertion worked!



// Function types
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
// mySearch = function (source: string, subString: string) { // WORKED
// mySearch = function (src: string, sub: string) { // WORKED
mySearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
}



// Indexable Types
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];


interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

interface NotOkay {
// Property 'name' of type 'string' is not assignable to string index type 'number'.
  // [x: number]: Animal;
  // [x: string]: Dog;
}


interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}


interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let strArray: ReadonlyStringArray = ["Alice", "Bob"];
// strArray[2] = "Mallory"; // error!


/*
// Class Types
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
*/



interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick(): void {
    console.log('woof woof');
  }
};
let clock = new Clock(12, 17);
clock.tick();



// Extending interface
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;



// Hybrid types
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c2 = getCounter();
c2(10);
c2.reset();
c2.interval = 5.0;



class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// ERROR
// class ImageControl implements SelectableControl {
//   private state: any;
//   select() {}
// }
