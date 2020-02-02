<template>
  <div id="404">
    <h1>Uuuuuups. Diese Seite existiert nicht.</h1>
    <router-link
      class="router-link"
      :to="{name: 'dashboard'}"
    >
      <h2>Zurück zur Startseite</h2>
    </router-link>
  </div>
</template>
