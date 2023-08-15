class SnakeBody extends egret.Bitmap {
    private circle: egret.Bitmap;
    constructor() {
        super();
        this.texture = RES.getRes("circle_png"); // 设置圆圈图片资
    }
}