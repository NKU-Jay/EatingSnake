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
var Joystick = (function (_super) {
    __extends(Joystick, _super);
    function Joystick() {
        var _this = _super.call(this) || this;
        _this.radius = 80; // 摇杆半径
        _this.initPosX = 0;
        _this.initPosY = 0;
        _this.angle = 0;
        _this.cosangle = 0;
        _this.sinangle = 0;
        _this.mark = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Joystick.prototype.onAddToStage = function (event) {
        this.initJoystick();
    };
    Joystick.prototype.initJoystick = function () {
        // 创建摇杆背景
        this.bg = new egret.Bitmap(RES.getRes("joystick_bg_png"));
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        // 创建摇杆拇指
        this.thumb = new egret.Bitmap(RES.getRes("joystick_png"));
        this.thumb.anchorOffsetX = this.thumb.width / 2;
        this.thumb.anchorOffsetY = this.thumb.height / 2;
        this.addChild(this.thumb);
        // 注册摇杆事件
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.thumb.x = this.bg.x = 100;
        this.thumb.y = this.bg.y = 600;
        this.thumb.scaleX = this.thumb.scaleY = 0.2;
    };
    Joystick.prototype.onTouchBegin = function (event) {
        this.onTouchMove(event);
        this.initPosX = event.stageX;
        this.initPosY = event.stageY;
    };
    Joystick.prototype.onTouchMove = function (event) {
        // 计算摇杆的位置和角度
        var dx = event.stageX - this.initPosX;
        var dy = event.stageY - this.initPosY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        this.angle = Math.atan2(dy, dx);
        this.cosangle = dx / distance;
        this.sinangle = dy / distance;
        //    this.cosangle = Math.cos(this.angle);
        //    this.sinangle = Math.sin(this.angle);
        //console.log(this.angle);
        // 限制摇杆的范围
        if (distance > this.radius) {
            dx = this.radius * Math.cos(this.angle);
            dy = this.radius * Math.sin(this.angle);
        }
        // 更新摇杆的位置
        this.thumb.x = this.bg.x + dx;
        this.thumb.y = this.bg.y + dy;
        // 派发摇杆事件
        //    let joystickEvent = new JoystickEvent(JoystickEvent.CHANGE);
        //    joystickEvent.angle = angle;
        //    this.dispatchEvent(joystickEvent);
    };
    Joystick.prototype.onTouchEnd = function (event) {
        // 摇杆回到初始位置
        this.thumb.x = this.bg.x;
        this.thumb.y = this.bg.y;
        // 派发摇杆事件
        //    let joystickEvent = new JoystickEvent(JoystickEvent.CHANGE);
        //    joystickEvent.angle = null;
        //    this.dispatchEvent(joystickEvent);
    };
    return Joystick;
}(egret.Sprite));
__reflect(Joystick.prototype, "Joystick");
//# sourceMappingURL=JoyStick.js.map