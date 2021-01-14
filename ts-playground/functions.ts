function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function (x: number, y: number): number {
  return x + y;
};

let myAddLong: (baseValue: number, increment: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};



function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}
function buildNameOptional(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}
function buildNameDefault(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}
function buildNameRest(firstName: string, ...restOfName: string[]) {
  console.log(restOfName);
  return firstName + " " + restOfName.join(" ");
}

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildNameRest("Joseph", "Samuel", "Lucas", "MacKinzie");




interface Card {
  suit: string,
  card: number,
}

interface Deck {
  suits: string[],
  cards: number[],
  createCardPicker(this: Deck): () => Card;
}

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit);




// Overloads
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } 
  // Otherwise just let them pick the card
  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}
let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("pickedCard1: " + pickedCard1.card + " of " + pickedCard1.suit);
