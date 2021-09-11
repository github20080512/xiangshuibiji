<template>
  <div class="note-wrap">
    <div class="btnarea">
      <button v-on:click="writefn" class="btn">write</button>
    </div>
    <textarea
      name=""
      id=""
      cols="30"
      rows="10"
      v-model="noteStr"
      v-bind:class="{ active: isActive }"
    ></textarea>
  </div>
</template>
<script>
export default {
  name: "note",

  data() {
    return {
      noteStr: ``,
      writeTimer: null,
      isActive: false,
    };
  },
  created() {
    this.$http.post("http://localhost:56565/read").then((response) => {
      this.noteStr = response.data;
    });
  },
  mounted() {},
  watch: {
    noteStr(val, oldVal) {
      clearTimeout(this.writeTimer);
      var _this = this;
      // console.log("should be vue")
      // console.log(this)
      this.writeTimer = setTimeout(function() {
        _this.$http
          .post("http://localhost:56565/write", { str: val })
          .then((response) => {
            _this.isActive = true;
            setTimeout(function() {
              _this.isActive = false;
            }, 500);
          });
      }, 1000 * 5);
    },
  },
  methods: {
    writefn() {
      this.$http
        .post("http://localhost:56565/write", { str: this.noteStr })
        .then((response) => {});

      // this.axios.get(api).then((response) => {
      //   console.log(response.data)
      // })

      // this.$http.get(api).then((response) => {
      //   console.log(response.data)
      // })
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.active {
  color: #42ba88;
}
.btnarea {
  border-bottom: 1px solid #42ba88;
}
textarea {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  padding: 25px;
  font-size: 21px;
  background: rgb(241 241 240 / 40%);
  font-weight: 500;
  line-height: 28px;
  font-family: math;
}
.note-wrap {
  height: 500px;
}
.btn {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  cursor: pointer;
}
.btn:active {
  color: yellowgreen;
}
</style>
