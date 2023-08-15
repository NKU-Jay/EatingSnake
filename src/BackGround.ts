class Background extends egret.DisplayObjectContainer {
    private bgImg: egret.Bitmap;
    public candyContainer: egret.DisplayObjectContainer;
    private timer: egret.Timer;
    public angle;
    public joystick:Joystick;
    public candyList=[];
    public mytimer: MyTimer;
    public mybutton: MyButton;
    private userText: egret.TextField = new egret.TextField();
    private passwordText: egret.TextField = new egret.TextField();
    //服务器传递来的参数
    
    public static gameSocket: egret.WebSocket = null;

    constructor() {
        super();
        this.init();
    }
//--------------------------------------------------------------------------------------
    private sendEndTime(){
        let endtimestamp = this.mytimer.endtimestamp;
        let gameSocket = Background.gameSocket;
        if (gameSocket != null && gameSocket.connected == true){
            console.log("发送结束的时间戳到服务器！");
            let str_endtimestamp = "endtime:" + endtimestamp.toString();
            //发送时间戳到服务器;
            gameSocket.writeUTF(str_endtimestamp);
            gameSocket.flush();
        }

    }

    
    private getSeverInfo(){
        let url = "localhost";
        let port = 8205;

        let gameSocket = Background.gameSocket;
        gameSocket = new egret.WebSocket(); //构造socket
        //赋值给this.socket
        Background.gameSocket = gameSocket;
        gameSocket.connect(url, port);//链接socket 
        gameSocket.addEventListener(egret.Event.CONNECT, this.connectHandler, this); //socket连接 

        if(!this.mytimer.isend) {
            gameSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this); //接收数据
        }
        //结束的时候发送消息

    }

    private webSocketDataHandler(event: egret.ProgressEvent): void {
        //this.socketDataHandler(this.gameSocket.readUTF());
        console.log("接收到服务器的消息");
        //this.gameSocket.readUTF() 是angle
        let str = Background.gameSocket.readUTF();
        if(str.indexOf("/")==-1){
            this.angle = str;
            // console.log("angle:" + this.angle);
        }
        else{
            //接收到username and password
            console.log(str);
            let part = str.split("/");
            let username = part[0];
            let password = part[1];
            this.userText.text = username;
            this.passwordText.text = password;
            this.userText.textColor = this.passwordText.textColor = 0xFFFFFF;
            this.userText.size = this.passwordText.size = 20;
            this.addChild(this.userText);
            this.addChild(this.passwordText);
            this.passwordText.y = 50;
        }
    }
    private connectHandler(event: egret.Event): void {
        console.log("连接成功");
        
        //连接成功的时候发送一次时间戳：
        let gameSocket = Background.gameSocket;
        let str_starttimestamp = "starttime:" + Date.now();
        gameSocket.writeUTF(str_starttimestamp);
        gameSocket.flush();
    }
//--------------------------------------------------------------------------------------
    private init() {
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
    }

    public endcreatecandy(){
        this.timer.stop();
    }

    public setGridBackground(width: number, height: number, color: number, alpha: number) {
        let bgShape: egret.Shape = new egret.Shape();
        bgShape.graphics.beginFill(color, alpha);
        bgShape.graphics.drawRect(0, 0, width, height);
        bgShape.graphics.endFill();
        this.addChild(bgShape);

        let gridShape: egret.Shape = new egret.Shape();
        gridShape.graphics.lineStyle(1, 0xFFFFFF, 0.2);
        for (let i = 0; i < width; i += 25) {
            gridShape.graphics.moveTo(i, 0);
            gridShape.graphics.lineTo(i, height);
        }
        for (let j = 0; j < height; j += 25) {
            gridShape.graphics.moveTo(0, j);
            gridShape.graphics.lineTo(width, j);
        }
        this.addChild(gridShape);
    }
    
    private createJoyStick(){
        this.joystick = new Joystick();

        this.addChild(this.joystick); // 添加摇杆到背景，如果使用远端传递参数可以将这一行删掉

        this.angle = this.joystick.angle;
    }
    private createButton(){
        this.mybutton = new MyButton;
        this.addChild(this.mybutton);
        
    }
    private createTimer() {
        this.timer = new egret.Timer(2000, 0); // 创建每5秒触发一次的计时器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerComplete, this);
        this.timer.start();
    }

    private onTimerComplete(event: egret.TimerEvent) {
        this.spawnCandies(1); // 每次计时器触发事件时产生1个糖豆
    }

    private createCandyContainer() {
        this.candyContainer = new egret.DisplayObjectContainer();
        this.addChild(this.candyContainer);
    }

    private spawnCandies(count: number) {
        const bgwidth = this.stage.stageWidth;
        const bgheight = this.stage.stageHeight;
        for (let i = 0; i < count; i++) {
            let candy: Candy = new Candy();
            this.candyList.push(candy);
            candy.x = Math.random() * (bgwidth-candy.width*0.05);
            candy.y = Math.random() * (bgheight-candy.height*0.05);
            this.candyContainer.addChild(candy);
        }
    }

}