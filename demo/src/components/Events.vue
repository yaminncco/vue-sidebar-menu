<template>
  <div>
    <h2>Events</h2>
    <prism-code lang="html">
      {{
        `&lt;sidebar-menu @update:collapsed="onToggleCollapse" @item-click="onItemClick" />
...
methods: {
  onToggleCollapse(collapsed) {},
  onItemClick(event, item) {}
}`
      }}
    </prism-code>
    <p><b>@update:collapsed(collapsed)</b> Trigger on toggle btn click</p>
    <p><b>@item-click(event, item)</b> Trigger on item link click</p>
  </div>
</template>
