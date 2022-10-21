import { defineStore } from 'pinia';
import { Door, chooseDoor, doorValues } from 'components/models';

export enum GamePhase {
  selectDoor,
  swapOrStay,
  result
}
export interface GameState {
  gamePhase : GamePhase,
  winningDoor : Door | null,
  chosenDoor : Door | null,
  finalDoor : Door | null,
  openDoors : Door[]
}
export interface GameStats {
  totalCount : number,
  win : number,
  swapWin : number,
  stayWin : number
}
interface State {
  gameState : GameState,
  gameStats : GameStats
}
export const useGameStore = defineStore('game', {
  state: () : State => ({
    gameState: {
      gamePhase: GamePhase.selectDoor,
      winningDoor: null,
      chosenDoor: null,
      finalDoor: null,
      openDoors: []
    },
    gameStats: {
      totalCount: 0,
      win: 0,
      swapWin: 0,
      stayWin: 0
    }
  }),
  actions: {
    setupGame() {
      this.gameState.gamePhase = GamePhase.selectDoor;
      this.gameState.winningDoor = chooseDoor(doorValues);
      this.gameState.chosenDoor = null;
      this.gameState.finalDoor = null;
      this.gameState.openDoors = [];
    },
    chooseDoor(door : Door) {
      if(this.gameState.gamePhase != GamePhase.selectDoor) {
        console.log('Can only chooseDoor in the first game phase');
        return;
      }
      if(this.gameState.winningDoor === null)
        throw Error('Started game without a winning door');
      this.gameState.chosenDoor = door;
      const goatDoors = new Set(doorValues);
      goatDoors.delete(door)
      goatDoors.delete(this.gameState.winningDoor);
      this.gameState.openDoors.push(chooseDoor(Array.from(goatDoors.values())));
      this.gameState.gamePhase = GamePhase.swapOrStay;
    },
    swap() {
      if(this.gameState.gamePhase != GamePhase.swapOrStay)
        throw Error('Can only swap in the second game phase');
      const closedDoors = new Set(doorValues);
      if(this.gameState.chosenDoor)
        closedDoors.delete(this.gameState.chosenDoor);
      this.gameState.openDoors.forEach(d => closedDoors.delete(d));
      if(closedDoors.size > 1)
        throw Error('Too many doors to choose from in swap');
      this.gameState.finalDoor = Array.from(closedDoors.values())[0];
      this.score();
    },
    stay() {
      if(this.gameState.gamePhase != GamePhase.swapOrStay)
        throw Error('Can only stay in the second game phase');
      this.gameState.finalDoor = this.gameState.chosenDoor;
      this.score();
    },
    score() {
      if(this.gameState.gamePhase != GamePhase.swapOrStay)
        throw Error('Can only score after finishing either swap or stay');
      if(this.gameState.finalDoor == null)
        throw Error('Must have chosen a final door before scoring');
      this.gameStats.totalCount++;
      if(this.gameState.finalDoor == this.gameState.winningDoor)
        this.gameStats.win++;
      if(this.gameState.chosenDoor == this.gameState.winningDoor)
        this.gameStats.stayWin++;
      else
        this.gameStats.swapWin++;
      this.gameState.openDoors = [...doorValues];
      this.gameState.gamePhase = GamePhase.result;
    }
  }
});
