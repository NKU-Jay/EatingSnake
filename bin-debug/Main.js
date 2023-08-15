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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 50;
        _this.token = 0;
        _this.sinangle1 = 1;
        _this.cosangle1 = 0;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }
        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")
                            //this.startAnimation(result);
                        ];
                    case 2:
                        result = _a.sent();
                        //this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        //this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    // private start(){
    //     //console.log(this.background.joystick.mark);
    //     this.mark = this.background.joystick.mark;
    //     if(this.mark){
    //         this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    //     }
    // }
    // 设置网格背景,candy
    Main.prototype.BgAddtoStage = function () {
        //console.log(this.background.width);
        this.background = new Background();
        this.addChild(this.background);
        this.background.setGridBackground(this.stage.stageWidth, this.stage.stageHeight, 0x000000, 0.5);
    };
    Main.prototype.changeSpeed = function () {
        if (this.background.mybutton.isSpeedUp) {
            this.snake.speedUp();
        }
        if (this.background.mybutton.isSpeedUp == false) {
            this.snake.restore();
        }
    };
    Main.prototype.isEnd = function () {
        //console.log(this.background.mytimer.isend);
        if (this.background.mytimer.isend == true) {
            this.snake.isdead = true;
            this.aisnake1.isdead = true;
            this.background.endcreatecandy();
        }
    };
    //设置蛇
    Main.prototype.respawn = function () {
        if (this.snake.isdead) {
            this.snake.isdead = false;
            this.snake.isCollision = false;
            this.snake.createBody();
            this.snake.head.visible = true;
            this.snake.head.x = 100;
            this.snake.head.y = 100;
        }
    };
    Main.prototype.SnakeDie = function () {
        var _this = this;
        //产生糖豆
        this.snake.isdead = true;
        var candy = new Candy();
        candy.x = this.snake.head.x;
        candy.y = this.snake.head.y;
        this.background.candyList.push(candy);
        this.background.candyContainer.addChild(candy);
        //移除蛇的身体
        for (var i = 0; i < this.snake.length; i++) {
            console.log(this.snake.bodyList[i]);
            this.snake.removeChild(this.snake.bodyList[i]);
        }
        this.snake.bodyList = [];
        this.snake.head.visible = false;
        //this.snake.removeChild(this.snake.head);
        this.snake.length = 0;
        setTimeout(function () {
            _this.respawn(); // 重生
        }, 1000);
    };
    Main.prototype.SnakeAddtoStage = function () {
        this.snake = new Snake();
        this.aisnake1 = new AISnake();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addChild(this.snake);
        this.addChild(this.aisnake1);
    };
    Main.prototype.SnakeCollision = function () {
        if (this.snake.isCollision == false && this.snake.isdead == false) {
            for (var i = 0; i < this.aisnake1.length; i++) {
                var dis = this.getDistance(this.snake.head.x, this.snake.head.y, this.aisnake1.bodyList[i].x, this.aisnake1.bodyList[i].y);
                var dis2 = this.getDistance(this.snake.head.x, this.snake.head.y, this.aisnake1.head.x, this.aisnake1.head.y);
                if (dis < 20 || dis2 < 20) {
                    console.log("撞上了");
                    this.snake.isCollision = true;
                    this.SnakeDie();
                    return;
                }
            }
        }
    };
    Main.prototype.onEnterFrame = function () {
        this.angle = this.background.joystick.angle;
        console.log(this.angle);
        this.sinangle = this.background.joystick.sinangle;
        this.cosangle = this.background.joystick.cosangle;
        // 远端的话使用下面的三行代码，注释上面
        // this.angle = this.background.angle;
        // this.sinangle = Math.sin(this.background.angle);
        // this.cosangle = Math.cos(this.background.angle);
        //撞墙函数
        if (this.snake.head.x > this.background.width || this.snake.head.y > this.background.height || this.snake.head.x < 0 || this.snake.head.y < 0) {
            if (!this.snake.isdead)
                this.SnakeDie();
        }
        //吃糖果函数
        this.checkCollision();
        //撞蛇函数
        this.SnakeCollision();
        this.changeSpeed();
        this.snake.update(this.sinangle, this.cosangle);
        if (this.token == 40) {
            //改变方向
            var randomAngle = this.getRandomNumber(0, 2 * Math.PI);
            this.sinangle1 = Math.sin(randomAngle);
            this.cosangle1 = Math.cos(randomAngle);
            this.token = 0;
        }
        if (this.aisnake1.head.x > this.background.width || this.aisnake1.head.y > this.background.height || this.aisnake1.head.x < 0 || this.aisnake1.head.y < 0) {
            this.sinangle1 = -this.sinangle1;
            this.cosangle1 = -this.cosangle1;
        }
        this.token++;
        if (!this.background.mytimer.isend) {
            this.aisnake1.removeChild(this.aisnake1.textLabel);
        }
        this.aisnake1.update(this.sinangle1, this.cosangle1);
        this.isEnd();
    };
    // 主函数
    Main.prototype.getRandomNumber = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Main.prototype.createGameScene = function () {
        // 进入绘制网格的函数
        this.BgAddtoStage();
        this.SnakeAddtoStage();
        //this.start();
    };
    Main.prototype.checkCollision = function () {
        if (this.background.candyList == null) {
            return;
        }
        for (var i = 0; i < this.background.candyList.length; i++) {
            var distance = this.getDistance(this.snake.head.x, this.snake.head.y, this.background.candyList[i].x, this.background.candyList[i].y);
            //ai蛇的吃糖豆
            var distance1 = this.getDistance(this.aisnake1.head.x, this.aisnake1.head.y, this.background.candyList[i].x, this.background.candyList[i].y);
            if (distance < 20) {
                this.background.candyContainer.removeChild(this.background.candyList[i]);
                this.background.candyList.splice(i, 1);
                this.snake.addBody();
                return;
            }
            else if (distance1 < 20) {
                this.background.candyContainer.removeChild(this.background.candyList[i]);
                this.background.candyList.splice(i, 1);
                this.aisnake1.addBody();
                return;
            }
        }
    };
    Main.prototype.getDistance = function (x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map