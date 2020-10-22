import { Rover, Direction } from '../mars-rover'

test("it works", () => {});

describe("Mars Rover", () => { 

  describe("It is given the initial starting point (x,y) and the direction (N,S,E,W) a rover is facing.", () => {

    it("should set starting point", () => {
      const rover = Rover(10, 10);

      let expectedPosition = { x: 10, y: 10 };
      expect(rover.state().position).toEqual(expectedPosition);
    });

    it("should use default (x: 0, y: 0) position", () => {
      const rover = Rover();

      let expectedPosition = { x: 0, y: 0 };
      expect(rover.state().position).toEqual(expectedPosition);
    })

    it("should set direction (N,S,E,W)", () => {
      const rover = Rover(0, 0, "E");

      let expectedDirection: Direction = "E";
      expect(rover.state().direction).toEqual(expectedDirection);
    })

    it("should set default direction to N when not assigned", () => {
      const rover = Rover();

      let expectedDirection: Direction = "N";
      expect(rover.state().direction).toEqual(expectedDirection);
    })
  })



})