<template>
  <div class="column justify-start items-center">
    <div class="row col-10">
      <q-card class="door-card row justify-evenly items-center"
              v-for="door in doorValues"
              :key="door"
              :class="doorClass(door)"
              @click="game.chooseDoor(door)">
        <Transition mode="out-in"
        enter-active-class="animated flipInY"
        leave-active-class="animated flipOutY">
          <q-card-section v-if="game.gameState.openDoors.includes(door)">
            <svg viewBox="0 0 50 50" width="100%" height="100%">
              <text x="0" y="45">{{game.gameState.winningDoor == door ? '🚗' : '🐐'}}</text>
            </svg>
          </q-card-section>
          <q-card-section v-else>
            <svg viewBox="0 0 50 50" width="100%" height="100%">
              <text x="0" y="45">🚪</text>
            </svg>
          </q-card-section>
        </Transition>
      </q-card>
    </div>
    <div class="row col-2">
      <div class="row inline col justify-center items-baseline q-gutter-md" v-if="game.gameState.gamePhase == GamePhase.swapOrStay">
        <q-btn @click="game.swap" class="col">
          <q-icon left name="change_circle" /> Swap
        </q-btn>
        <q-btn @click="game.stay" class="col">
          <q-icon left name="check" /> Stay
        </q-btn>
      </div>
      <div class="row inline col flex-center q-gutter-md" v-if="game.gameState.gamePhase == GamePhase.result">
        <div class="text-center col-8">
          Result of this game: player chose {{Door[game.gameState.finalDoor]}} and
          {{game.gameState.finalDoor == game.gameState.winningDoor ? "won" : "lost"}}.
          swapping would have {{game.gameState.chosenDoor != game.gameState.winningDoor ? "won" : "lost"}} and
          staying would have {{game.gameState.chosenDoor == game.gameState.winningDoor ? "won" : "lost"}}.
        </div>
        <q-btn @click="game.setupGame" class="col-4">
          <q-icon left name="restart_alt" /> New Game?
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Door, doorValues } from 'components/models';
import { useGameStore, GamePhase } from 'stores/GameState';

const game = useGameStore();

game.setupGame();
function doorClass(door : Door) : string {
  if(door == game.gameState.finalDoor) return 'final';
  if(door == game.gameState.chosenDoor) return 'chosen';
  return '';
}
</script>

<style lang="scss" scoped>
.door-card {
  width: 30%;
  max-width: 300px;
  aspect-ratio: 1/1;
  margin: 1%;
  font-size: xxx-large;
  & svg { height: 100%; }
}
.chosen {
  box-shadow: 0px 0px 5px 5px lightsteelblue;
}
.final {
  box-shadow: 0px 0px 5px 5px gold;
}
</style>
