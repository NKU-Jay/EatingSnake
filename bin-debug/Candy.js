var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Candy = (function (_super) {
    __extends(Candy, _super);
    function Candy() {
        var _this = _super.call(this) || this;
        _this.texture = RES.getRes("circle_png");
        _this.scaleX = _this.scaleY = 0.05;
        var colorMatrixFilter = new egret.ColorMatrixFilter([
            1, 0, 0, 0, 200,
            0, 1, 0, 0, 10,
            0, 0, 1, 0, 10,
            0, 0, 0, 1, 0 // 不修改透明度
        ]);
        _this.filters = [colorMatrixFilter]; // 将颜色滤镜应用到糖果上
        return _this;
    }
    return Candy;
}(egret.Bitmap));
__reflect(Candy.prototype, "Candy");
//# sourceMappingURL=Candy.js.map