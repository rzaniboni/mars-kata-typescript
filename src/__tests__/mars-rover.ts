import { Rover, Direction, Grid } from "../mars-rover";

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

  describe("it can turn left when receiving command L", () => {
    test.each`
      direction | newDirection
      ${"N"}    | ${"W"}
      ${"E"}    | ${"N"}
      ${"S"}    | ${"E"}
      ${"W"}    | ${"S"}
    `(
      `when oriented $direction turn on $direction`,
      ({ direction, newDirection }) => {
        const rover = Rover(0, 0, direction);
        rover.execute("L")
 
        let expectedPosition = { x: 0, y: 0 };
        let expectedDirection = newDirection;
        expect(rover.state().position).toEqual(expectedPosition);
        expect(rover.state().direction).toEqual(expectedDirection);
      }
    );
  });


  describe("it can turn right when receiving command R", () => {
    test.each`
      direction | newDirection
      ${"N"}    | ${"E"}
      ${"E"}    | ${"S"}
      ${"S"}    | ${"W"}
      ${"W"}    | ${"N"}
    `(
      `when oriented $direction turn on $direction`,
      ({ direction, newDirection }) => {
        const rover = Rover(0, 0, direction);
        rover.execute("R")

        let expectedPosition = { x: 0, y: 0 };
        let expectedDirection = newDirection;
        expect(rover.state().position).toEqual(expectedPosition);
        expect(rover.state().direction).toEqual(expectedDirection);
      }
    );
  });

  describe("Rover moves from one edge of the grid to another.", () => {
    it("should assign a grid size", () => {
      const grid: Grid = { width: 5, height: 5}
      const rover = Rover(0, 0, 'N', grid);

      let expectedGrid: Grid =  { width: 5, height: 5}
      expect(rover.state().grid).toEqual(expectedGrid);
    })

    it("should use default value 10x10 when grid is not assigned", () => {
      const rover = Rover(0, 0, 'N');

      let expectedGrid: Grid = { width: 10, height: 10}
      expect(rover.state().grid).toEqual(expectedGrid);
    })

    it('should return X to 0 when grid is passed from east', function() {
      const grid: Grid = { width: 5, height: 5}
      const rover = Rover(4, 4, 'E', grid);
      rover.execute("F")

      let expectedPosition = { x: 0, y: 4 };
      expect(rover.state().position).toEqual(expectedPosition);  
    });

    it('should return Y to grid end when grid is passed from north', function() {
      const grid: Grid = { width: 5, height: 5}
      const rover = Rover(4, 4, 'N', grid);
      rover.execute("F")

      let expectedPosition = { x: 4, y: 0 };
      expect(rover.state().position).toEqual(expectedPosition);  
    });

    it('should return to grid width  when grid is passed from west', function() {
      const grid: Grid = { width: 5, height: 5}
      const rover = Rover(0, 0, 'W', grid);
      rover.execute("F")

      let expectedPosition = { x: 4, y: 0 };
      expect(rover.state().position).toEqual(expectedPosition);  
    });

    it('should return to grid height when grid is passed from south', function() {
      const grid: Grid = { width: 5, height: 5}
      const rover = Rover(0, 0, 'S', grid);
      rover.execute("F")

      let expectedPosition = { x: 0, y: 4 };
      expect(rover.state().position).toEqual(expectedPosition);  
    });
  })


});
