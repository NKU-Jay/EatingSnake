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
var MyButton = (function (_super) {
    __extends(MyButton, _super);
    function MyButton() {
        var _this = _super.call(this) || this;
        _this.isSpeedUp = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    MyButton.prototype.onAddToStage = function (event) {
        this.initJoystick();
    };
    MyButton.prototype.initJoystick = function () {
        // 创建摇杆背景
        this.bg = new egret.Bitmap(RES.getRes("button_png"));
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.bg.y = 2750;
        this.bg.scaleX = this.scaleY = 0.2;
        this.bg.x = 600;
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTap, this);
    };
    MyButton.prototype.onButtonTap = function (event) {
        this.isSpeedUp = !this.isSpeedUp;
    };
    return MyButton;
}(egret.Sprite));
__reflect(MyButton.prototype, "MyButton");
//# sourceMappingURL=Button.js.map