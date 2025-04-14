export class Ship {
  constructor(length){
    this.length = length;
    this.hit = 0
    this.sunk = false;
  }

  shipHit() {
    this.hit++
  }

  isSunk(){
    if(this.hit >= this.length){
      this.sunk = true;
      return true;
    }
    return false;
  }
}