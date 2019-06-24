<template>
  <div>
    <h2>Events</h2>
    <pre>&lt;sidebar-menu @collapse="onCollapse" @item-click="onItemClick" /&gt;

...
methods: {
    onCollapse(collapsed) {},
    onItemClick(event, item) {}
}
...
</pre>
    <p><b>@collapse(collapsed)</b> Trigger on btn-collapse click</p>
    <p><b>@item-click(event, item)</b> Trigger on item click</p>
  </div>
</template>
