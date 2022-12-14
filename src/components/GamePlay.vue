<template>
  <q-page class="column justify-start items-center q-pa-lg q-gutter-lg">
    <div class="text col-1">
      Welcome to the classic Monty Hall Problem setup. You are in a game show,
      and get to pick one of three doors. One has a car for you to win,
      two doors have goats signifying a loss. Once you have chosen, another door
      is opened and reveals a goat - and you can decide whether to stick with
      your original choice, or to swap door.
    </div>
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
              <text x="0" y="45">{{game.gameState.winningDoor === door ? '🚗' : '🐐'}}</text>
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
      <div class="row inline col justify-center items-baseline q-gutter-md" v-if="game.gameState.gamePhase === GamePhase.swapOrStay">
        <q-btn @click="game.swap" class="col">
          <q-icon left name="change_circle" /> Swap
        </q-btn>
        <q-btn @click="game.stay" class="col">
          <q-icon left name="check" /> Stay
        </q-btn>
      </div>
      <div class="row inline col flex-center q-gutter-md"
           v-if="game.gameState.gamePhase === GamePhase.result">
        <div class="text-center col-8">
          Result of this game: player chose {{Door[game.gameState.finalDoor]}} and
          {{game.gameState.finalDoor === game.gameState.winningDoor ? "won" : "lost"}}.
          Swapping would have {{game.gameState.chosenDoor !== game.gameState.winningDoor ? "won" : "lost"}} and
          staying would have {{game.gameState.chosenDoor === game.gameState.winningDoor ? "won" : "lost"}}.
        </div>
        <q-btn @click="game.setupGame" class="col-4">
          <q-icon left name="restart_alt" /> New Game?
        </q-btn>
      </div>
    </div>
  </q-page>
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
  box-shadow: 0 0 5px 5px lightsteelblue;
}
.final {
  box-shadow: 0 0 5px 5px gold;
}
</style>
