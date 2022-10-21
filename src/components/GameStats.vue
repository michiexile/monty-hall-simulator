<template>
  <q-list>
    <q-item>
      <q-item-section>
        <q-item-label header>Game Statistics</q-item-label>
      </q-item-section>
    </q-item>
    <q-markup-table>
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stat in stats" :key="stat">
          <td>{{stat}}</td>
          <td>{{game.gameStats[stat]}}</td>
          <td>{{game.gameStats.totalCount == 0 ? 0 : Math.round(100*game.gameStats[stat]/game.gameStats.totalCount)}}</td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-btn @click="resetStats">Reset Stats</q-btn>
  </q-list>
</template>

<script setup lang="ts">
import { useGameStore } from 'stores/GameState';

const game = useGameStore();
const stats = ['totalCount', 'win', 'swapWin', 'stayWin'];
function resetStats() {
  game.gameStats.totalCount = 0;
  game.gameStats.win = 0;
  game.gameStats.swapWin = 0;
  game.gameStats.stayWin = 0;
}
</script>
