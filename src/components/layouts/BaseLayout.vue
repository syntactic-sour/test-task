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
  padding: 0.5rem 1rem;
}

.main {
  flex: 1 0 auto;
  padding: 1rem 2rem;
  width: 100%;
  max-width: 50rem;
  margin: auto;
}

.footer {
  padding: 0.5rem 1rem;
}

@media screen and (min-width: 480px) {
  .header {
    padding: 1rem 2rem;
  }

  .main {
    padding: 2rem 4rem;
  }

  .footer {
    padding: 1rem 2rem;
  }
}
</style>
