<template>
  <div>
    <h2>Events</h2>
    <pre>&lt;sidebar-menu @toggle-collapse="onToggleCollapse" @item-click="onItemClick" /&gt;

...
methods: {
    onToggleCollapse(collapsed) {},
    onItemClick(event, item) {}
}
...
</pre>
    <p><b>@toggle-collapse(collapsed)</b> Trigger on toggle btn click</p>
    <p><b>@item-click(event, item)</b> Trigger on item link click</p>
  </div>
</template>
