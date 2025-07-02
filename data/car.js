class Car {
  #brand;//undefined
  #model;//undefined
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand =  carDetails.brand;
    this.#model = carDetails.model;

    // You can set a default value for a property
    // here or directly in the property above.
    // this.speed = 0;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}`);
    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Is the Trunk Open: ${this.isTrunkOpen}`
    );
  }

  go() { 
      this.speed += 5;

    // Limit the speed to 200
    if (this.speed > 200) {
      this.speed = 200;
    }

  }

  brake() {
    this.speed -= 5;

    //Limit this speed to 0
    if (this.speed < 0) {
      this.speed = 0;
    } 
  }

  openTrunk() {
    this.isTrunkOpen = true;
    this.speed = 0;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla',
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});
console.log(car1);
console.log(car2);

car1.displayInfo();
car1.go();// speed = 5
car1.go();// speed = 10
car1.go();// speed = 15
car1.brake();// speed = 10
car1.openTrunk();//speed = 0 boolean = true
car1.closeTrunk();
car1.go();// speed = 5
car1.go();// speed = 10
car1.go();// speed = 15
car1.displayInfo();

car2.displayInfo();
car2.go();// speed = 5
car2.go();// speed = 10
car2.go();// speed = 15
car2.brake();// speed = 10
car2.brake();// speed = 5
car2.closeTrunk();
car2.displayInfo();

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration
  }

  go() { 
      this.speed += this.acceleration;//private properties can only be accessed in the same class. They can't be accessed in a child class.

    // Limit the speed to 200
    if (this.speed > 300) {
      this.speed = 300;
    }

  }

  brake() {
    this.speed -= 5;

    //Limit this speed to 0
    if (this.speed < 0) {
      this.speed = 0;
    } 
  }

  openTrunk() {
    this.isTrunkOpen = false;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car3 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});

console.log(car3);
car3.go();// speed = 20
car3.go();// speed = 40
car3.displayInfo();
car3.brake();// speed = 35
car3.displayInfo();