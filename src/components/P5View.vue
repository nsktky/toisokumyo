<template>
  <div class="p5" id="p5Canvas">
    <vue-p5
        @setup="setup"
        @draw="draw"
        @windowresized="windowresized"
    >
    </vue-p5>
  </div>
</template>

<script>
// 表示するGenArtをp5.jsで作成.vue-p5を使用.
import VueP5 from "vue-p5";
export default {
  name: "p5-example",
  components: {
    "vue-p5": VueP5
  },
  // 各変数をdata内で定義
  data: () => ({
    // 半径
     radius : 0,
    //  各点
     x : 0,
     y : 0,
     newX : 0,
     newY : 0,
  }),
  methods: {
    setup(sketch) {
      // canvasのサイズはwindow準拠.
      sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
      // 背景など各種基本設定
      sketch.background(200);
      sketch.stroke(0);
      sketch.colorMode(sketch.HSB, 360, 100, 100, 100);
      sketch.noFill();
      sketch.angleMode(sketch.DEGREES);
      //半径を設定
      this.radius = sketch.min(sketch.width, sketch.height);
    },
    draw(sketch) {
      // 背景の透過率を下げる
      sketch.background(200, 0.1);
      //中央で表示させる
      sketch.translate(sketch.width / 2, sketch.height / 2);

      // vertexで波を描画
      sketch.beginShape();
      for(let i = 0; i < 360; i++) {
        // rの値をnoiseで決定する.noiseの変数はxoff, yoff, frameCountの3値
        let xoff = sketch.map(sketch.sin(i), -1, 1, 0, 1);
        let yoff = sketch.map(sketch.sin(i), -1, 1, 0, 1);
        let r = sketch.map(sketch.noise(xoff, yoff, sketch.frameCount * 0.0003), 0, 1, 0, 720);
        // rを元に三角波作成.
        this.x = this.radius * 0.5 * sketch.cos(i);
        this.y = this.radius * 0.5 * sketch.sin(i);
        // 描画の点であるnewX,newYを計算する.
        this.newX = this.x * sketch.sin(r / 1) * sketch.cos(r / 2)
        this.newY = this.y * sketch.cos(r / 2) * sketch.sin(r / 1)
        sketch.stroke(r, 50, 80)
        sketch.fill(r, 30, 100, 2)
        sketch.vertex(this.newX, this.newY)
      }
      sketch.endShape(sketch.CLOSE);
    },
    // ウィンドウリがリサイズされたらcanvasもリサイズする
    windowresized(sketch) {
      sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }
  }
};
</script>

<style>
.p5 {
    margin: 0;
    padding: 0;
    line-height:0;
    /* position: relative; */
}
</style>