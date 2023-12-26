<template>
  <div>
    <h2>Slots</h2>
    <prism-code lang="html">
      {{
        `&lt;sidebar-menu>
  &lt;template v-slot:header>header&lt;/template>
  &lt;template v-slot:footer>footer&lt;/template>
  &lt;template v-slot:toggle-icon>toggle-icon&lt;/template>
  &lt;template v-slot:dropdown-icon="{ isOpen }">
    &lt;span v-if="!isOpen">+&lt;/span>
    &lt;span v-else>-&lt;/span>
  &lt;/template>
&lt;/sidebar-menu>`
      }}
    </prism-code>
  </div>
</template>

<script>
export default {
  name: 'DocsSlots',
}
</script>
