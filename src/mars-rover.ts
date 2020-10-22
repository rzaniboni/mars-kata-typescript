export type Direction = 'N' | 'E' | 'S' | 'W';

export type Coordinate = { x: number; y: number };

interface RoverState {
  x: number;
  y: number;
  direction: Direction;
}

export type ExecutedStatus = 'OK' | 'OBSTACLE';

export interface Result {
  position: Coordinate;
  direction: Direction;
  grid: Grid;
  executedStatus: ExecutedStatus;
}

export type Command = 'F' | 'B' | 'L' | 'R';

export type Grid = {
  width: number;
  height: number;
};

const moveForwardMap: Record<Direction, (state: RoverState) => RoverState> = {
  N: (state) => ({ ...state, y: state.y + 1 }),
  E: (state) => ({ ...state, x: state.x + 1 }),
  S: (state) => ({ ...state, y: state.y - 1 }),
  W: (state) => ({ ...state, x: state.x - 1 }),
};

const moveBackwardMap: Record<Direction, (state: RoverState) => RoverState> = {
  N: (state) => ({ ...state, y: state.y - 1 }),
  E: (state) => ({ ...state, x: state.x - 1 }),
  S: (state) => ({ ...state, y: state.y + 1 }),
  W: (state) => ({ ...state, x: state.x + 1 }),
};

const getDirection: Record<Direction, { left: Direction; right: Direction }> = {
  N: { left: 'W', right: 'E' },
  E: { left: 'N', right: 'S' },
  S: { left: 'E', right: 'W' },
  W: { left: 'S', right: 'N' },
};

function exhaustiveCheck(_: never) {}

const reducer = (state: RoverState, command: Command): RoverState => {
  switch (command) {
    case 'F':
      return moveForwardMap[state.direction](state);
    case 'B':
      return moveBackwardMap[state.direction](state);
    case 'L':
      return {
        ...state,
        direction: getDirection[state.direction].left,
      };
    case 'R':
      return {
        ...state,
        direction: getDirection[state.direction].right,
      };
  }
};

export function positionInGrid(rover: RoverState, grid: Grid): RoverState {
  const { width, height } = grid;
  return {
    ...rover,
    x: (rover.x + width) % width,
    y: (rover.y + height) % height,
  };
}

function isOccupied(x: number, y: number, obstacles: Coordinate[]): Boolean {
  return obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);
}

export function Rover(
  x = 0,
  y = 0,
  direction: Direction = 'N',
  grid: Grid = { width: 10, height: 10 },
  obstacles: Coordinate[] = []
) {
  let roverState: RoverState = {
    x,
    y,
    direction,
  };

  let executedStatus: ExecutedStatus;

  const commands = (commandSequence: string): string[] => {
    return commandSequence.split('');
  };

  const execute = (commandSequence: string): void => {
    executedStatus = 'OK';
    for (const command of commands(commandSequence)) {
      const rover = positionInGrid(
        reducer(roverState, command as Command),
        grid
      );
      const isObstacle = isOccupied(rover.x, rover.y, obstacles);
      if (isObstacle) {
        executedStatus = 'OBSTACLE';
        break;
      }
      roverState = { ...rover };
    }
  };

  const state = (): Result => ({
    direction: roverState.direction,
    position: { x: roverState.x, y: roverState.y },
    grid,
    executedStatus,
  });

  return {
    state,
    commands,
    execute,
  };
}
