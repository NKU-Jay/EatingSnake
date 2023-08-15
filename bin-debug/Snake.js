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
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake() {
        var _this = _super.call(this) || this;
        _this.length = 7;
        _this.bodyList = [];
        _this.speed = 5;
        _this.bodyWidth = 18;
        _this.bodyHeight = 15;
        _this.isdead = false;
        _this.framerate = 100;
        _this.isCollision = false;
        _this.init();
        _this.width = 200;
        _this.height = 200;
        return _this;
    }
    Snake.prototype.speedUp = function () {
        this.speed = 10;
        this.framerate = 50;
    };
    Snake.prototype.restore = function () {
        this.speed = 5;
        this.framerate = 100;
    };
    Snake.prototype.init = function () {
        this.createHead();
        this.createBody();
        //this.addEventListener(JoystickEvent.CHANGE, this.onJoystickChange, this);
    };
    //处理蛇的死亡逻辑
    Snake.prototype.createHead = function () {
        var skeletonData = RES.getRes("liruolingxiao_dbbin"); // 设置龙骨骼动画资源
        var textureData = RES.getRes("liruolingxiao_json");
        var texture = RES.getRes("liruolingxiao_png");
        var factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        this.head = factory.buildArmatureDisplay("MovieClip"); // 根据龙骨骼动画资源中的骨架名创建蛇头的龙骨骼动画
        this.head.animation.play("MovieClip"); // 根据龙骨骼动画资源中的动画名播放蛇头的动画
        this.addChild(this.head);
        this.head.animation.play("1", 0); // 播放动画，循环次数设为0（表示无限循环）
        this.head.animation.timeScale = 0.6; // 设置动画播放速度，默认为1（正常速度）
        this.head.x = 100;
        this.head.y = 100;
        this.head.scaleX = this.head.scaleY = 0.6;
    };
    Snake.prototype.createBody = function () {
        console.log("createBody");
        this.length = 7;
        for (var i = 0; i < this.length; i++) {
            var body = new SnakeBody();
            body.width = 20;
            body.height = 20;
            body.x = 100 + this.bodyWidth * (i + 1);
            body.y = 100;
            this.bodyList.push(body);
            this.addChild(body);
        }
    };
    Snake.prototype.update = function (sinangle, cosangle) {
        if (this.isdead) {
            return;
        }
        if (sinangle == 0 && cosangle == 0) {
            return;
        }
        this.head.x = this.head.x + this.speed * cosangle;
        this.head.y = this.head.y + this.speed * sinangle;
        var tween;
        tween = egret.Tween.get(this.bodyList[0]).to({ x: this.head.x, y: this.head.y }, this.framerate);
        for (var i = this.bodyList.length - 1; i >= 1; i--) {
            tween = egret.Tween.get(this.bodyList[i])
                .to({ x: this.bodyList[i - 1].x, y: this.bodyList[i - 1].y }, this.framerate);
        }
    };
    Snake.prototype.addBody = function () {
        if (this.isdead) {
            return;
        }
        this.length++;
        console.log(this.length);
        var body = new SnakeBody();
        body.width = 20;
        body.height = 20;
        this.bodyList.push(body);
        this.addChild(body);
        //console.log(this.bodyList[this.length-2].x);
        body.x = this.bodyList[this.length - 1].x + (this.bodyList[this.length - 1].x - this.bodyList[this.length - 2].x);
        body.y = this.bodyList[this.length - 1].y + (this.bodyList[this.length - 1].y - this.bodyList[this.length - 2].y);
    };
    return Snake;
}(egret.DisplayObjectContainer));
__reflect(Snake.prototype, "Snake");
//# sourceMappingURL=Snake.js.map