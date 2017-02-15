require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert
const Elevator = require('../elevator').default
const Person = require('../person').default

describe('Elevator', function() {
  const elevator = new Elevator()
  const alex = new Person("Alex", 2)
  const bob = new Person("Bob", 3)
  const sue = new Person("Sue", 6)


  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    
    // Alex requests the elevator to take him from 2 to 5
    elevator.requestFloor(alex, 5)
  
    // Assert the current floor of the elevator is the drop off floor
    assert.equal(elevator.currentFloor, 5)
    // Assert the current status of the elevator is idle after drop off
    assert.equal(elevator.state, 'idle')
    // Assert the total number of stops is 2 after drop off
    assert.equal(elevator.stops, 2)
    // Assert the total number of floors traversed
    assert.equal(elevator.floors, 5)
  });

  it('should bring a rider to a floor below their current floor', () => {
    elevator.requestFloor(alex, 1)
    
    assert.equal(elevator.currentFloor, 1)
    assert.equal(elevator.state, 'idle')
    assert.equal(elevator.stops, 2)
    assert.equal(elevator.floors, 3)
    assert.equal(elevator.riders, 0)
    assert.equal(elevator.totalRequests, 1)
    assert.equal(elevator.requests.length, 0)
  });
  

  it('should bring Bob and Sue to desired floors in order', () => {
    elevator.requestFloor(bob, 9)
    elevator.requestFloor(sue, 2)

    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.state, 'idle')
    assert.equal(elevator.stops, 4)
    assert.equal(elevator.floors, 16)
    assert.equal(elevator.riders, 0)
    assert.equal(elevator.totalRequests, 2)
    assert.equal(elevator.requests.length, 0)
  });
  
  it('should bring both Bob and Sue up', () => {
    elevator.requestFloor(bob, 5)
    elevator.requestFloor(sue, 10)
    
    assert.equal(elevator.currentFloor, 10)
    assert.equal(elevator.state, 'idle')
    assert.equal(elevator.stops, 4)
    assert.equal(elevator.floors, 10)
    assert.equal(elevator.riders, 0)
    assert.equal(elevator.totalRequests, 2)
    assert.equal(elevator.requests.length, 0)
  })
  
  it('should bring both Bob and Sue down', () => {
    elevator.requestFloor(bob, 1)
    elevator.requestFloor(sue, 3)
    
    assert.equal(elevator.currentFloor, 3)
    assert.equal(elevator.state, 'idle')
    assert.equal(elevator.stops, 4)
    assert.equal(elevator.floors, 13)
    assert.equal(elevator.riders, 0)
    assert.equal(elevator.totalRequests, 2)
    assert.equal(elevator.requests.length, 0)
  })
  
  it('should bring Bob down and Sue up', () => {
    elevator.requestFloor(bob, 1)
    elevator.requestFloor(sue, 10)
    
    assert.equal(elevator.currentFloor, 10)
    assert.equal(elevator.state, 'idle')
    assert.equal(elevator.stops, 4)
    assert.equal(elevator.floors, 14)
    assert.equal(elevator.riders, 0)
    assert.equal(elevator.totalRequests, 2)
    assert.equal(elevator.requests.length, 0)
  })
  
  it('should bring Bob up and Sue down', () => {
    elevator.requestFloor(bob, 7)
    elevator.requestFloor(sue, 2)
    
    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.state, 'idle')
    assert.equal(elevator.stops, 4)
    assert.equal(elevator.floors, 12)
    assert.equal(elevator.riders, 0)
    assert.equal(elevator.totalRequests, 2)
    assert.equal(elevator.requests.length, 0)
  })

});
