<template>
  <div class="paging_way">
    <ul>
      <li>
        <div class="selected">
          {{ $t(`Services`) }}
          <span class="icon_checked"></span>
        </div>
      </li>
      <li>
        <div :class="{ selected: allChecked }">
          {{ $t(`Payment`) }}
          <span :class="{ icon_checked: allChecked }"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    allChecked: {
      type: Boolean,
    },
  },
};
</script>
