<template>
  <header class="header"><slot name="header"></slot></header>
  <main class="main">
    <slot></slot>
  </main>
  <footer class="footer"><slot name="footer"></slot></footer>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0.5rem 1rem;
  background: var(--color-background);
}

.main {
  flex: 1 0 auto;
  padding: 1rem 1rem;
  width: 100%;
  max-width: 60rem;
  margin: auto;
}

.footer {
  padding: 0.5rem 1rem;
}

@media screen and (min-width: 40rem) {
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
