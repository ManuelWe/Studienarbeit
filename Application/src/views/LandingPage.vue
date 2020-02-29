<template>
  <router-link
    class="router-link"
    :to="{name: 'dashboard'}"
    aria-label="Dashboard"
  >
    <div class="wrapper">
      <div class="message">
        <h1 class="is-size-1">
          Kundeninformationssystem
        </h1>
        <h2 class="is-size-3">
          Tippen um zu beginnen
        </h2>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.wrapper {
  background-image: url(http://images.ctfassets.net/kfibk3xh1vwb/50Rg8FNwpVwosH38jvbfNa/3a67b516fc1ac65224f13470322d7b60/filename_english.jpg) ;
  background-position: center center;
  background-repeat:  no-repeat;
  background-attachment: fixed;
  background-size:  cover;
  background-color: #999;
}

div{
  margin: 0;
  padding: 0;
  font-family: exo, sans-serif;
}

.wrapper {
  height: 100%;
  width: 100%;
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
