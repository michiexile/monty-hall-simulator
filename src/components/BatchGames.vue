<template>
  <q-page class="column justify-start items-center q-pa-lg q-gutter-lg">
    <q-card>
      <q-tabs
        v-model="panel"
        dense
      >
        <q-tab name="standard" label="Standard Game" />
        <q-tab name="alternate" label="Alternate Game" />
      </q-tabs>
      <q-tab-panels v-model="panel">
        <q-tab-panel name="standard" class="q-px-lg q-py-sm">
          <h6>Batch Simulation of Standard Game</h6>
          <q-separator />
          <div>
            <q-badge>
              Randomized first door strategy:
              L {{ openStrategy.min }}%
              M {{ openStrategy.max - openStrategy.min }}%
              R {{ 100-openStrategy.max }}%
            </q-badge>
            <q-range
              v-model="openStrategy"
              :min="0"
              :max="100"
              label switch-label-side
              drag-range
            />
          </div>
          <div>
            <q-badge>
              Randomized swap/stay strategy:
              swap {{ swapStrategy }}%
              stay {{ 100-swapStrategy }}%
            </q-badge>
            <q-slider
              v-model="swapStrategy"
              :min="0"
              :max="100"
              label switch-label-side
            />
          </div>
          <q-separator />
          <div class="text">
            Simulate:
            <q-btn v-for="n in [1,10,100,1000]"
                   :key="n"
                   flat
                   @click="simulateStandard(n)">{{ n }} steps</q-btn>
          </div>
        </q-tab-panel>
        <q-tab-panel name="alternate" class="q-px-lg q-py-sm">
          <h6>Batch Simulation of Alternate Game</h6>
          <q-separator />
          <div>
            <q-badge>
              Randomized swap/stay strategy:
              swap {{ swapStrategy }}%
              stay {{ 100-swapStrategy }}%
            </q-badge>
            <q-slider
              v-model="swapStrategy"
              :min="0"
              :max="100"
              label switch-label-side
            />
          </div>
          <q-separator />
          <div class="text">
            Simulate:
            <q-btn v-for="n in [1,10,100,1000]"
                   :key="n"
                   flat
                   @click="simulateAlternate(n)">{{ n }} steps</q-btn>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <q-ajax-bar
        size="1vh"
        ref="bar"
        position="top"
        color="accent"
        skip-hijack
      />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from 'stores/GameState';
import { Door } from 'components/models';
import { QAjaxBar } from 'quasar';

const game = useGameStore();
const panel = ref('standard');
const openStrategy = ref({min: 33, max: 66});
const swapStrategy = ref(50);
const bar = ref(null as QAjaxBar | null);

function pickDoor() : Door {
  const
    t1 = openStrategy.value.min / 100.0,
    t2 = openStrategy.value.max / 100.0,
    r = Math.random();
  if(r < t1)
    return Door.Left;
  if(r < t2)
    return Door.Middle;
  return Door.Right;
}
function simulateStandard(n : number) {
  if(bar.value)
    bar.value.start(0);
  for (let i = 0; i < n; i++) {
    game.setupGame();
    game.chooseDoor(pickDoor());
    if(Math.random() < swapStrategy.value / 100.0)
      game.swap();
    else
      game.stay();
    if(bar.value)
      bar.value.increment(100*i/n);
  }
  if(bar.value)
    bar.value.stop();
}
function simulateAlternate(n : number) {
  if(bar.value)
    bar.value.start(0);
  for (let i = 0; i < n; i++) {
    game.setupGame();
    game.chooseDoor(Door.Left);
    if(Math.random() < swapStrategy.value / 100.0)
      game.swap();
    else
      game.stay();
    if(bar.value)
      bar.value.increment(100*i/n);
  }
  if(bar.value)
    bar.value.stop();
}
</script>
