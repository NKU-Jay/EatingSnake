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
var AISnake = (function (_super) {
    __extends(AISnake, _super);
    function AISnake() {
        var _this = _super.call(this) || this;
        _this.length = 7;
        _this.bodyList = [];
        _this.speed = 5;
        _this.bodyWidth = 18;
        _this.bodyHeight = 15;
        _this.isdead = false;
        _this.framerate = 100;
        _this.textLabel = new egret.TextField();
        _this.posList = [];
        _this.token = 0;
        _this.init();
        return _this;
    }
    AISnake.prototype.init = function () {
        this.createHead();
        this.createBody();
        //this.addEventListener(JoystickEvent.CHANGE, this.onJoystickChange, this);
    };
    //处理蛇的死亡逻辑
    AISnake.prototype.createHead = function () {
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
        this.head.x = 400;
        this.head.y = 400;
        this.head.scaleX = this.head.scaleY = 0.6;
        this.addChild(this.textLabel);
    };
    AISnake.prototype.createBody = function () {
        this.length = 7;
        for (var i = 0; i < this.length; i++) {
            var body = new SnakeBody();
            body.width = 20;
            body.height = 20;
            body.x = 400 + this.bodyWidth * (i + 1);
            body.y = 400;
            this.bodyList.push(body);
            this.addChild(body);
        }
    };
    AISnake.prototype.update = function (sinangle, cosangle) {
        if (this.isdead) {
            return;
        }
        // console.log("sinagnle:"+sinangle);
        // console.log("cosangle:"+cosangle );
        this.head.x = this.head.x + this.speed * cosangle;
        this.head.y = this.head.y + this.speed * sinangle;
        var tween;
        tween = egret.Tween.get(this.bodyList[0]).to({ x: this.head.x, y: this.head.y }, this.framerate);
        for (var i = this.bodyList.length - 1; i >= 1; i--) {
            tween = egret.Tween.get(this.bodyList[i])
                .to({ x: this.bodyList[i - 1].x, y: this.bodyList[i - 1].y }, this.framerate);
        }
        this.textLabel = new egret.TextField();
        this.textLabel.text = "AI蛇";
        this.textLabel.textColor = 0xFFFFFF; // 白色
        this.textLabel.size = 20;
        this.textLabel.x = this.head.x + (this.head.width - this.textLabel.width) / 2;
        this.textLabel.y = this.head.y - this.textLabel.height;
        this.addChild(this.textLabel);
    };
    AISnake.prototype.addBody = function () {
        if (this.isdead) {
            return;
        }
        this.length++;
        //console.log(this.length);
        var body = new SnakeBody();
        body.width = 20;
        body.height = 20;
        this.bodyList.push(body);
        this.addChild(body);
        //console.log(this.bodyList[this.length-2].x);
        body.x = this.bodyList[this.length - 1].x + (this.bodyList[this.length - 1].x - this.bodyList[this.length - 2].x);
        body.y = this.bodyList[this.length - 1].y + (this.bodyList[this.length - 1].y - this.bodyList[this.length - 2].y);
    };
    return AISnake;
}(egret.DisplayObjectContainer));
__reflect(AISnake.prototype, "AISnake");
//# sourceMappingURL=AISnake.js.map