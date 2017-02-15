export default class Elevator {
  constructor() {
  this.state = 'idle';
  this.currentFloor = 0;
  this.riders = [];
  this.requests = [];
  this.totalRequests = 0;
  this.stops = 0;
  this.floors = 0;
  }

  reset() {
    this.constructor()
  }
  
  requestFloor(person, floor) {
    this.requests.push({person: person.name, startFloor: person.currentFloor, reqFloor: floor})
    
    this.handleRequests()
  
  }
  
  
  elevatorToPickup(request) {
    let numOfFloors = Math.abs(this.currentFloor - request.startFloor)
    this.floors += numOfFloors;
    this.stops += 1;
    this.riders +=1;
    this.totalRequests += 1;
    this.currentFloor = request.startFloor;
  }
  
  elevatorToDropoff(request) {
    let numOfFloors = Math.abs(request.startFloor - request.reqFloor)
    this.floors += numOfFloors;
    this.stops += 1;
    this.riders -=1;
    this.currentFloor = request.reqFloor;
  }
  
  
  handleRequests() {
    this.elevatorToPickup(this.requests[0])
    this.elevatorToDropoff(this.requests[0])
    this.requests.shift()
    if(this.requests.length > 0) {
      this.handleRequests()
    }
  }

}

