<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="analytics"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Monty Hall Simulator
        </q-toolbar-title>

        <q-tabs>
          <q-route-tab shrink exact to="/" label="Main Game" />
          <q-route-tab shrink exact to="/alternate" label="Alternate Game" />
          <q-route-tab shrink exact to="/batch" label="Batch Simulation" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <game-stats />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GameStats from 'components/GameStats.vue';

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
