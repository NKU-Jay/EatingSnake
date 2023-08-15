class AISnake extends egret.DisplayObjectContainer {
    public head: dragonBones.EgretArmatureDisplay;
    public length: number = 7;
    public bodyList: SnakeBody[] = [];
    private soundChannel:egret.SoundChannel;
    private speed = 5;
    private direction: number;
    private bodyWidth = 18;
    private bodyHeight = 15;
    public isdead = false;
    public framerate = 100;
    public textLabel:egret.TextField =new egret.TextField();
    public posList=[];


    private token = 0;
    

    constructor() {
        super();
        this.init();
    }


    private init() {
        this.createHead();
        this.createBody();
        //this.addEventListener(JoystickEvent.CHANGE, this.onJoystickChange, this);
    }
    //处理蛇的死亡逻辑

    private createHead() {

        const skeletonData = RES.getRes("liruolingxiao_dbbin"); // 设置龙骨骼动画资源
        const textureData = RES.getRes("liruolingxiao_json");
        const texture = RES.getRes("liruolingxiao_png");

        let factory = new dragonBones.EgretFactory();

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
    }

    public createBody() {
        this.length = 7;
        for (let i = 0; i < this.length; i++) {
            let body: SnakeBody = new SnakeBody();
            body.width = 20;
            body.height = 20;
            body.x = 400 + this.bodyWidth*(i+1);
            body.y = 400;
            this.bodyList.push(body);
            this.addChild(body);
        }
    }

    public update(sinangle: number, cosangle: number){
        if(this.isdead){
            return;
        }
        

        // console.log("sinagnle:"+sinangle);
        // console.log("cosangle:"+cosangle );

        this.head.x = this.head.x + this.speed*cosangle;
        this.head.y = this.head.y + this.speed*sinangle;
        var tween: egret.Tween;
        tween = egret.Tween.get(this.bodyList[0]).to({x:this.head.x, y:this.head.y}, this.framerate);

        for(let i = this.bodyList.length-1;i>=1;i--){
            tween = egret.Tween.get(this.bodyList[i])
            .to({x: this.bodyList[i-1].x, y: this.bodyList[i-1].y}, this.framerate);
        }

        this.textLabel = new egret.TextField();
        this.textLabel.text = "AI蛇";
        this.textLabel.textColor = 0xFFFFFF; // 白色
        this.textLabel.size = 20;
        this.textLabel.x = this.head.x + (this.head.width - this.textLabel.width) / 2;
        this.textLabel.y = this.head.y - this.textLabel.height;
        this.addChild(this.textLabel);
    }
    public addBody(){
        if(this.isdead){
            return;
        }
        this.length++;
        //console.log(this.length);
        let body: SnakeBody = new SnakeBody();
        body.width = 20;
        body.height = 20;
        this.bodyList.push(body);
        this.addChild(body);
        //console.log(this.bodyList[this.length-2].x);
        body.x = this.bodyList[this.length-1].x+(this.bodyList[this.length-1].x-this.bodyList[this.length-2].x);
        body.y = this.bodyList[this.length-1].y+(this.bodyList[this.length-1].y-this.bodyList[this.length-2].y);
    }
}