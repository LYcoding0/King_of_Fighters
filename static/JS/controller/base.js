export class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;
        this.pressed_keys = new Set();//存储按下的键
        this.start();
    }

    start() {
        let outer = this;
        this.$canvas.keydown(function (e) {
            outer.pressed_keys.add(e.key);//将按下的键存入
        });

        this.$canvas.keyup(function (e) {
            outer.pressed_keys.delete(e.key);//将按下的键删除
        });
    }
}