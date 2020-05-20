<template>
  <div id="404">
    <h1>Uuuuuups. Diese Seite existiert nicht.</h1>
    <router-link
      class="router-link"
      :to="{name: 'products'}"
    >
      <h2>Zurück zu den Produkten</h2>
    </router-link>
  </div>
</template>
