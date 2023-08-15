
class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        //this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }
//------------------------------------------------------------------------------------------------------------------------
    private textfield: egret.TextField;
    private background: Background;
    private snake: Snake;
    private angle;
    private sinangle;
    private cosangle;
    private mark;
    private count = 50;

    private aisnake1: AISnake;
    private token = 0;
    private sinangle1 = 1;
    private cosangle1 = 0;

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
    private BgAddtoStage(){
        //console.log(this.background.width);
        this.background = new Background();
        this.addChild(this.background);
        this.background.setGridBackground(this.stage.stageWidth, this.stage.stageHeight, 0x000000, 0.5);
        
    }
    private changeSpeed(){
        if(this.background.mybutton.isSpeedUp){
            this.snake.speedUp();
        }
        if(this.background.mybutton.isSpeedUp == false){
            this.snake.restore();
        }
    }

    private isEnd(){
        //console.log(this.background.mytimer.isend);
        if(this.background.mytimer.isend == true){
            this.snake.isdead = true;
            this.aisnake1.isdead = true;
            this.background.endcreatecandy();
        }
    }
    //设置蛇

    private respawn(){
        if(this.snake.isdead){
            this.snake.isdead = false;
            this.snake.isCollision = false;
            this.snake.createBody();
            this.snake.head.visible = true;
            this.snake.head.x = 100;
            this.snake.head.y = 100;
        }
        
    }
    private SnakeDie(){
        //产生糖豆
        this.snake.isdead = true;
        let candy = new Candy();
        candy.x = this.snake.head.x;
        candy.y = this.snake.head.y;
        this.background.candyList.push(candy);
        this.background.candyContainer.addChild(candy);

        //移除蛇的身体
        for(let i =0 ;i<this.snake.length;i++){
            console.log(this.snake.bodyList[i]);
            this.snake.removeChild(this.snake.bodyList[i]);
            
        }
        this.snake.bodyList = [];
        this.snake.head.visible = false; 
        //this.snake.removeChild(this.snake.head);
        this.snake.length = 0;
        setTimeout(() => {
            this.respawn(); // 重生
        }, 1000);
    }

    private SnakeAddtoStage(){
        this.snake = new Snake();
        this.aisnake1 = new AISnake();
        
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

        this.addChild(this.snake);
        this.addChild(this.aisnake1);
    }

    private SnakeCollision(){

        if(this.snake.isCollision==false && this.snake.isdead == false){//没有撞上才可能判断
            for(let i=0;i<this.aisnake1.length;i++){

                let dis = this.getDistance(this.snake.head.x, this.snake.head.y, this.aisnake1.bodyList[i].x,this.aisnake1.bodyList[i].y);
                let dis2 = this.getDistance(this.snake.head.x, this.snake.head.y, this.aisnake1.head.x,this.aisnake1.head.y);
                if(dis<20||dis2<20){
                    console.log("撞上了");
                    this.snake.isCollision = true;
                    this.SnakeDie();
                    return;
                }
            }
        }
    }
    

    private onEnterFrame(){
       
        this.angle = this.background.joystick.angle;
        console.log(this.angle);
        this.sinangle = this.background.joystick.sinangle;
        this.cosangle = this.background.joystick.cosangle;

        // 远端的话使用下面的三行代码，注释上面
        // this.angle = this.background.angle;
        // this.sinangle = Math.sin(this.background.angle);
        // this.cosangle = Math.cos(this.background.angle);
        
        
        //撞墙函数
        if(this.snake.head.x>this.background.width||this.snake.head.y>this.background.height||this.snake.head.x<0||this.snake.head.y<0){
            if(!this.snake.isdead)
                this.SnakeDie();
        }
        //吃糖果函数
        this.checkCollision();
        //撞蛇函数
        this.SnakeCollision();

        this.changeSpeed();
        this.snake.update(this.sinangle, this.cosangle);


        if(this.token==40){
            //改变方向
            let randomAngle = this.getRandomNumber(0, 2 * Math.PI);
            this.sinangle1 = Math.sin(randomAngle);
            this.cosangle1 = Math.cos(randomAngle);

            this.token = 0;
        }

        if(this.aisnake1.head.x>this.background.width||this.aisnake1.head.y>this.background.height||this.aisnake1.head.x<0||this.aisnake1.head.y<0)
        {
            this.sinangle1 = -this.sinangle1;
            this.cosangle1 = -this.cosangle1;
        }

        this.token++;
        if(!this.background.mytimer.isend){
            this.aisnake1.removeChild(this.aisnake1.textLabel);
        }
        this.aisnake1.update(this.sinangle1, this.cosangle1);   

        this.isEnd();
    }
    // 主函数
    private getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    
    protected createGameScene(): void {
        // 进入绘制网格的函数
        this.BgAddtoStage();
        this.SnakeAddtoStage();
        //this.start();
    }

    private checkCollision(){
        if(this.background.candyList==null){
            return;
        }
        for (let i =0;i<this.background.candyList.length;i++){
            let distance = this.getDistance(this.snake.head.x, this.snake.head.y, this.background.candyList[i].x, this.background.candyList[i].y);
            //ai蛇的吃糖豆
            let distance1 = this.getDistance(this.aisnake1.head.x, this.aisnake1.head.y, this.background.candyList[i].x, this.background.candyList[i].y);
            if (distance < 20) {
                this.background.candyContainer.removeChild(this.background.candyList[i]);
                this.background.candyList.splice(i,1);
                this.snake.addBody();
                return;
            }

            else if (distance1< 20){
                this.background.candyContainer.removeChild(this.background.candyList[i]);
                this.background.candyList.splice(i,1);
                this.aisnake1.addBody();
                return;
            }
        }

    }
    private getDistance(x1: number, y1: number, x2: number, y2: number): number {
        let dx = x2 - x1;
        let dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
