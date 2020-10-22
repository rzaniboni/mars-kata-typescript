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

export type Command = "F"

function exhaustiveCheck(_: never) {}

/*
const moveForward = (rover: RoverState): RoverState => {
  const { direction, x, y} = rover
  switch (direction) {
    case "N":
      return { ...rover, y: y + 1 };
    case "E":
      return { ...rover, x: x + 1 };
    case "S":
      return { ...rover, y: y - 1 };
    case "W":
      return { ...rover, x: x - 1 };
    default:
      exhaustiveCheck(direction);
  }
};
*/

const moveForwardMap: Record<Direction, (RoverState) => (RoverState)> = {
  N: (state) => ({...state, y: state.y + 1}),
  E: (state) => ({...state, x: state.x + 1}),
  S: (state) => ({...state, y: state.y - 1}),   
  W: (state) => ({...state, x: state.x - 1}),   
} 


const reducer = (state: RoverState, command: Command): RoverState => {
  switch (command) {
    case "F": 
     return moveForwardMap[state.direction](state)
  } 
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

  const commands = (commandSequence: string): string[] => {
    return commandSequence.split("");
  };


  const execute = (commandSequence: string): void => {
    roverState = commands(commandSequence).reduce((state, command) => {
      return (reducer(state, command as Command))
    }, roverState)
  }


  const state = (): Result => ({
    direction: roverState.direction,
    position: { x: roverState.x, y: roverState.y}
  })



  return {
    state,
    commands,
    execute
  }
}

