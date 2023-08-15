class Candy extends egret.Bitmap{
    constructor(){
        super();
        this.texture = RES.getRes("circle_png");
        this.scaleX = this.scaleY = 0.05;
        const colorMatrixFilter = new egret.ColorMatrixFilter([
            1, 0, 0, 0, 200,    // 设置红色通道偏移值（范围在0到255之间）
            0, 1, 0, 0, 10,  // 设置绿色通道偏移值（范围在0到255之间）
            0, 0, 1, 0, 10,   // 设置蓝色通道偏移值（范围在0到255之间）
            0, 0, 0, 1, 0            // 不修改透明度
        ]);
        this.filters = [colorMatrixFilter]; // 将颜色滤镜应用到糖果上
    }
}