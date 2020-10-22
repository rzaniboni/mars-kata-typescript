export type Direction = "N" | "E" | "S" | "W";

export type Coordinate = { x: number; y: number };

interface RoverState {
  x: number;
  y: number;
  direction: Direction;
}

export interface Result {
  position: Coordinate;
  direction: Direction;
}

export type Command = "F" | "B";

const moveForwardMap: Record<Direction, (RoverState) => RoverState> = {
  N: (state) => ({ ...state, y: state.y + 1 }),
  E: (state) => ({ ...state, x: state.x + 1 }),
  S: (state) => ({ ...state, y: state.y - 1 }),
  W: (state) => ({ ...state, x: state.x - 1 }),
};

const moveBackwardMap: Record<Direction, (RoverState) => RoverState> = {
  N: (state) => ({ ...state, y: state.y - 1 }),
  E: (state) => ({ ...state, x: state.x - 1 }),
  S: (state) => ({ ...state, y: state.y + 1 }),
  W: (state) => ({ ...state, x: state.x + 1 }),
};

function exhaustiveCheck(_: never) {}


const reducer = (state: RoverState, command: Command): RoverState => {
  switch (command) {
    case "F":
      return moveForwardMap[state.direction](state);
    case "B":
      return moveBackwardMap[state.direction](state);
    default:
      exhaustiveCheck(command)
  }
};

export function Rover(x = 0, y = 0, direction: Direction = "N") {
  let roverState: RoverState = {
    x,
    y,
    direction,
  };

  const commands = (commandSequence: string): string[] => {
    return commandSequence.split("");
  };

  const execute = (commandSequence: string): void => {
    roverState = commands(commandSequence).reduce((state, command) => {
      return reducer(state, command as Command);
    }, roverState);
  };

  const state = (): Result => ({
    direction: roverState.direction,
    position: { x: roverState.x, y: roverState.y },
  });

  return {
    state,
    commands,
    execute,
  };
}
