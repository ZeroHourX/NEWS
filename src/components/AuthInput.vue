<template>
  <div>
    <input
      :class="status"
      :placeholder="placeholder"
      :type="type"
      :rule="rule"
      :value="value"
      @input="handleInput"
      @change="inputChange"
    />
  </div>
</template>

<script>
export default {
  props: ["placeholder", "type", "rule", "value", "err_message"],
  data() {
    return {
      status: ""
    };
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);

      if (this.rule) {
        if (this.rule.test(event.target.value)) {
          this.status = "success";
        } else {
          this.status = "error";
        }
      }
    },
    inputChange() {
      if (this.err_message && this.status == "error") {
        this.$toast.fail(this.err_message);
      }
    }
  }
};
</script>

<style scoped lang="less">
input {
  width: 100%;
  height: 3.5rem;
  padding: 20px 0;
  border: none;
  box-sizing: border-box;
  border-bottom: 2px #666 solid;
  outline: none;
  background: #fff;
  font-size: 1.25rem;
  background: #f2f2f2;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>