<template>
  <div id="wrap">
    <div id="validate_box">
      <h2>请拖动黑块完成验证</h2>
      <div id="box" @mousedown="move"></div>
      <div id="inser" :style="classObject"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: 0,
      classObject: {
        right: Math.ceil(Math.random() * (60 - 20) + 20) + "px"
      }
    };
  },
  methods: {
    move(e) {
      e.preventDefault();
      //获取目标元素
      let odiv = e.target;
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      console.log(
        `第一次获取：鼠标位置${e.clientX}黑色方块距离父元素left${odiv.offsetLeft}`
      );

      let temp = function(e) {
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置(鼠标坐标不断在变，每变一次触发事件)
        this.left = e.clientX - disX;
        //判断是否越界
        if (this.left >= 330) {
          this.left = 330;
        } else if (this.left <= 10) {
          this.left = 20;
        }
        //移动当前元素
        odiv.style.left = this.left + "px";
      };

      document.onmousemove = temp.bind(this);
      document.onmouseup = () => {
        let standrad = 400 - 50 - this.classObject.right.slice(0, -2);
        if (this.left >= standrad - 5 && this.left <= standrad + 5) {
          this.$message.success("验证成功");
          this.$store.commit({ type: "VALIDATE" });
        } else {
          odiv.style.left = "20px";
        }

        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>

<style lang="stylus" scoped>
#wrap
  position: fixed
  left: 0
  top: 0
  margin: auto
  height: 1000px
  width: 100%
  background-color: rgba(0, 0, 0, 0.4)
  z-index: 9
h2
  color: black
  width: 200px
  margin: 0 auto
#validate_box
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  width: 400px
  height: 300px
  margin: auto
  background-color: rgb(255, 255, 255)
  z-index: 999999
  #box
    position: absolute
    left: 20px
    top: 0
    bottom: 0
    width: 50px
    height: 50px
    margin: auto 0
    cursor: pointer
    background-color: black
  #inser
    position: absolute
    top: 0
    bottom: 0
    width: 50px
    height: 50px
    margin: auto 0
    z-index: -99999
    border: 1px solid black
</style>