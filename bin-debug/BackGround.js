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
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.candyList = [];
        _this.userText = new egret.TextField();
        _this.passwordText = new egret.TextField();
        _this.init();
        return _this;
    }
    //--------------------------------------------------------------------------------------
    Background.prototype.sendEndTime = function () {
        var endtimestamp = this.mytimer.endtimestamp;
        var gameSocket = Background.gameSocket;
        if (gameSocket != null && gameSocket.connected == true) {
            console.log("发送结束的时间戳到服务器！");
            var str_endtimestamp = "endtime:" + endtimestamp.toString();
            //发送时间戳到服务器;
            gameSocket.writeUTF(str_endtimestamp);
            gameSocket.flush();
        }
    };
    Background.prototype.getSeverInfo = function () {
        var url = "localhost";
        var port = 8205;
        var gameSocket = Background.gameSocket;
        gameSocket = new egret.WebSocket(); //构造socket
        //赋值给this.socket
        Background.gameSocket = gameSocket;
        gameSocket.connect(url, port); //链接socket 
        gameSocket.addEventListener(egret.Event.CONNECT, this.connectHandler, this); //socket连接 
        if (!this.mytimer.isend) {
            gameSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this); //接收数据
        }
        //结束的时候发送消息
    };
    Background.prototype.webSocketDataHandler = function (event) {
        //this.socketDataHandler(this.gameSocket.readUTF());
        console.log("接收到服务器的消息");
        //this.gameSocket.readUTF() 是angle
        var str = Background.gameSocket.readUTF();
        if (str.indexOf("/") == -1) {
            this.angle = str;
            // console.log("angle:" + this.angle);
        }
        else {
            //接收到username and password
            console.log(str);
            var part = str.split("/");
            var username = part[0];
            var password = part[1];
            this.userText.text = username;
            this.passwordText.text = password;
            this.userText.textColor = this.passwordText.textColor = 0xFFFFFF;
            this.userText.size = this.passwordText.size = 20;
            this.addChild(this.userText);
            this.addChild(this.passwordText);
            this.passwordText.y = 50;
        }
    };
    Background.prototype.connectHandler = function (event) {
        console.log("连接成功");
        //连接成功的时候发送一次时间戳：
        var gameSocket = Background.gameSocket;
        var str_starttimestamp = "starttime:" + Date.now();
        gameSocket.writeUTF(str_starttimestamp);
        gameSocket.flush();
    };
    //--------------------------------------------------------------------------------------
    Background.prototype.init = function () {
        this.bgImg = new egret.Bitmap();
        this.mytimer = new MyTimer();
        this.addChild(this.mytimer);
        this.addChild(this.bgImg);
        this.createCandyContainer();
        this.createTimer();
        this.createJoyStick();
        this.createButton();
        //连接服务器
        this.getSeverInfo();
    };
    Background.prototype.endcreatecandy = function () {
        this.timer.stop();
    };
    Background.prototype.setGridBackground = function (width, height, color, alpha) {
        var bgShape = new egret.Shape();
        bgShape.graphics.beginFill(color, alpha);
        bgShape.graphics.drawRect(0, 0, width, height);
        bgShape.graphics.endFill();
        this.addChild(bgShape);
        var gridShape = new egret.Shape();
        gridShape.graphics.lineStyle(1, 0xFFFFFF, 0.2);
        for (var i = 0; i < width; i += 25) {
            gridShape.graphics.moveTo(i, 0);
            gridShape.graphics.lineTo(i, height);
        }
        for (var j = 0; j < height; j += 25) {
            gridShape.graphics.moveTo(0, j);
            gridShape.graphics.lineTo(width, j);
        }
        this.addChild(gridShape);
    };
    Background.prototype.createJoyStick = function () {
        this.joystick = new Joystick();
        this.addChild(this.joystick); // 添加摇杆到背景，如果使用远端传递参数可以将这一行删掉
        this.angle = this.joystick.angle;
    };
    Background.prototype.createButton = function () {
        this.mybutton = new MyButton;
        this.addChild(this.mybutton);
    };
    Background.prototype.createTimer = function () {
        this.timer = new egret.Timer(2000, 0); // 创建每5秒触发一次的计时器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerComplete, this);
        this.timer.start();
    };
    Background.prototype.onTimerComplete = function (event) {
        this.spawnCandies(1); // 每次计时器触发事件时产生1个糖豆
    };
    Background.prototype.createCandyContainer = function () {
        this.candyContainer = new egret.DisplayObjectContainer();
        this.addChild(this.candyContainer);
    };
    Background.prototype.spawnCandies = function (count) {
        var bgwidth = this.stage.stageWidth;
        var bgheight = this.stage.stageHeight;
        for (var i = 0; i < count; i++) {
            var candy = new Candy();
            this.candyList.push(candy);
            candy.x = Math.random() * (bgwidth - candy.width * 0.05);
            candy.y = Math.random() * (bgheight - candy.height * 0.05);
            this.candyContainer.addChild(candy);
        }
    };
    //服务器传递来的参数
    Background.gameSocket = null;
    return Background;
}(egret.DisplayObjectContainer));
__reflect(Background.prototype, "Background");
//# sourceMappingURL=BackGround.js.map