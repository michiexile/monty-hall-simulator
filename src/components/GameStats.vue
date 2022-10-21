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
        </tr>
      </thead>
      <tbody>
        <tr v-for="stat in stats" :key="stat">
          <td>{{stat}}</td>
          <td>{{game.gameStats[stat]}}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-list>
</template>

<script setup lang="ts">
import { useGameStore } from "stores/GameState";

const game = useGameStore();
const stats = ['totalCount', 'win', 'swapWin', 'stayWin'];
stats.forEach(s => { console.log(game.gameStats[s]); return;})
</script>
