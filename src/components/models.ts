export enum Door {
  Left = 1,
  Middle,
  Right
}
export const doorValues : Door[] = Object.keys(Door)
  .map(n => Number.parseInt(n))
  .filter(n => !Number.isNaN(n)) as unknown as Door[];
export function chooseDoor(doors : Door[]) : Door {
  return Array.from(doors)[Math.floor(Math.random() * doors.length)]
}
