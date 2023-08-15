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
var SnakeBody = (function (_super) {
    __extends(SnakeBody, _super);
    function SnakeBody() {
        var _this = _super.call(this) || this;
        _this.texture = RES.getRes("circle_png"); // 设置圆圈图片资
        return _this;
    }
    return SnakeBody;
}(egret.Bitmap));
__reflect(SnakeBody.prototype, "SnakeBody");
//# sourceMappingURL=Snakebody.js.map