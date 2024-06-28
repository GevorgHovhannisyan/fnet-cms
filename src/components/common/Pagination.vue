<template>
  <div class="paging">
    <paginate
      :page-count="totalPages"
      :click-handler="setPage"
      active-class="selected"
      :container-class="'pagination'"
      :prev-text="`<a  class='icon_arrowStroke prev_page inactive'></a>`"
      :next-text="`<a  class='icon_arrowStroke'></a>`"
    >
    </paginate>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setPage(event) {
      this.$emit("setPage", event);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  .disabled {
    a {
      background: none !important;
      cursor: unset;
    }
  }
  .selected {
    display: inline-block;
    min-width: 28px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 18px;
    background: #4c17d0;
    a {
      color: #ffffff;
    }
  }
}
</style>
