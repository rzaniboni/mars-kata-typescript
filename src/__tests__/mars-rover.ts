import { Rover, Direction } from "../mars-rover";

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
    });

    it("should set direction (N,S,E,W)", () => {
      const rover = Rover(0, 0, "E");

      let expectedDirection: Direction = "E";
      expect(rover.state().direction).toEqual(expectedDirection);
    });

    it("should set default direction to N when not assigned", () => {
      const rover = Rover();

      let expectedDirection: Direction = "N";
      expect(rover.state().direction).toEqual(expectedDirection);
    });
  });

  it("Rover receives a character array of commands.", () => {
    const rover = Rover();
    const result = rover.commands("FFBB");

    let expectedCommands: string[] = ["F", "F", "B", "B"];
    expect(result).toEqual(expectedCommands);
  });

  describe("it can move forward when receiving command F", () => {
    it("when oriented N moves towards N on y", () => {
      const rover = Rover(0, 0, "N");
      rover.execute("F");

      let expectedPosition = { x: 0, y: 1 };
      let expectedDirection = "N";
      expect(rover.state().position).toEqual(expectedPosition);
      expect(rover.state().direction).toEqual(expectedDirection);
    });


    it("when oriented E moves towards E on x", () => {
      const rover = Rover(0, 0, "E");
      rover.execute("FF");

      let expectedPosition = { x: 2, y: 0 };
      let expectedDirection = "E";
      expect(rover.state().position).toEqual(expectedPosition);
      expect(rover.state().direction).toEqual(expectedDirection);
    });
  });
});
