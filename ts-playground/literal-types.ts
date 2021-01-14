/**
 * String Literal Types
 */
type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // It's possible that someone could reach this
      // by ignoring your types though.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy");  // error




/**
 * Numeric Literal Types
 */
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}
const result = rollDice();


interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}
function setupMap(info:MapConfig) {
  //
}
setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });




/**
 * Boolean Literal Types
 */
interface ValidationSuccess {
  isValid: true;
  reason: null;
}

interface ValidationFailure {
  isValid: false;
  reason: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;
