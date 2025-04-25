<!--
    Layout that mimics position: fixed for pop-overs,
    but allows to use position: absolute instead
    for user-friendly zooming on mobile devices.

    Check assets/layout.css for details
-->
<template>
  <div class="app">
    <header class="header"><slot name="header"></slot></header>
    <main class="main">
      <slot></slot>
    </main>
    <footer class="footer"><slot name="footer"></slot></footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  min-height: 100px;
  background-color: black;
}

.main {
  flex: 1 0 auto;
  min-height: 1000px;
}

.footer {
  min-height: 100px;
  background-color: black;
}
</style>
