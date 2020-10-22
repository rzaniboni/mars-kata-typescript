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
    test.each`
      direction | axis   | x    | y
      ${"N"}    | ${"y"} | ${5} | ${6}
      ${"E"}    | ${"x"} | ${6} | ${5}
      ${"S"}    | ${"y"} | ${5} | ${4}
      ${"W"}    | ${"x"} | ${4} | ${5}
    `(
      `when oriented $direction moves towards $direction on $axis`,
      ({ direction, axis, x, y }) => {
        const rover = Rover(5, 5, direction);
        rover.execute("F");

        let expectedPosition = { x, y };
        let expectedDirection = direction;
        expect(rover.state().position).toEqual(expectedPosition);
        expect(rover.state().direction).toEqual(expectedDirection);
      }
    );

  });


  describe("it can move backward when receiving command B", () => {

    test.each`
      direction | axis   | x    | y
      ${"N"}    | ${"y"} | ${5} | ${4}
      ${"E"}    | ${"x"} | ${4} | ${5}
      ${"S"}    | ${"y"} | ${5} | ${6}
      ${"W"}    | ${"x"} | ${6} | ${5}
    `(
      `when oriented $direction moves towards $direction on $axis`,
      ({ direction, axis, x, y }) => {
        const rover = Rover(5, 5, direction);
        rover.execute("B")

        let expectedPosition = { x, y };
        let expectedDirection = direction;
        expect(rover.state().position).toEqual(expectedPosition);
        expect(rover.state().direction).toEqual(expectedDirection);
      }
    );

  })
});
