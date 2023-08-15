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
var JoystickEvent = (function (_super) {
    __extends(JoystickEvent, _super);
    function JoystickEvent(type, bubbles, cancelable, angle) {
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.angle = angle;
        return _this;
    }
    JoystickEvent.CHANGE = "joystick_change";
    return JoystickEvent;
}(egret.Event));
__reflect(JoystickEvent.prototype, "JoystickEvent");
//# sourceMappingURL=JoystickEvent.js.map