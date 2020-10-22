export type Direction = "N" | "E" | "S" | "W";

export type Coordinate = { x: number; y: number };

interface RoverState {
  x: number,
  y: number,
  direction: Direction;
}

export interface Result {
  position: Coordinate,
  direction: Direction;
}

export function Rover(
  x = 0,
  y = 0,
  direction: Direction = 'N'
)
{
  let roverState: RoverState = {
    x,
    y,
    direction
  }

  const state = (): Result => ({
    direction: roverState.direction,
    position: { x: roverState.x, y: roverState.y}
  })

  return {
    state
  }
}

