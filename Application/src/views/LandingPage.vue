<template>
  <router-link
    class="router-link"
    :to="{name: 'dashboard'}"
    aria-label="Dashboard"
  >
    <section class="hero is-info is-fullheight">
      <div class="message">
        <h1 class="is-size-1">
          Kundeninformationssystem
        </h1>
        <h2 class="is-size-3">
          Tippen um zu beginnen
        </h2>
      </div>
    </section>
  </router-link>
</template>


<style scoped>
.hero.is-info {
  background: url(https://images.ctfassets.net/kfibk3xh1vwb/5KLSxiI4gh36GiMAanN4JK/25097d4b65234f79b19ace82050c14ad/ales-krivec-QnNqGoCnBg0-unsplash.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

div{
  margin: 0;
  padding: 0;
  font-family: exo, sans-serif;
}
.message {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 55%;
  height: 30%;
  top: 5rem;
  left: 2rem;
  display: block;
  position: absolute;
  background-color: rgba(0,0,0,0.6);
  color: #fff;
  padding: 0.5em;
}
</style>
