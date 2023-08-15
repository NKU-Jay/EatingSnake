class MyTimer extends egret.DisplayObjectContainer {
    private gameTimer: egret.Timer;
    private timerText: egret.TextField;
    private startTime: number;
    private totalTime: number = 60;
    private gameEndPanel: eui.Panel; // 游戏结束弹窗
    public isend:boolean = false;
    public endtimestamp: number;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init(): void {
        // 创建计时器文本框
        this.timerText = new egret.TextField();
        this.timerText.text = "1:00";
        this.timerText.textColor = 0xFFFFFF; // 设置文本颜色
        this.timerText.size = 40; // 设置文本大小
        this.timerText.x = (this.stage.stageWidth - this.timerText.width) / 2; // 设置文本位置在舞台中心
        this.timerText.y = 50; // 设置文本位置在背景上方
        this.addChild(this.timerText);

        // 创建计时器对象
        this.gameTimer = new egret.Timer(1000, this.totalTime); // 设置计时间隔为1秒，总共执行300次（5分钟）
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);

        // 开始计时器
        this.startTime = egret.getTimer(); // 记录开始时间
        this.gameTimer.start();

        this.gameEndPanel = new eui.Panel();
        this.gameEndPanel.title = "游戏结束"; // 设置弹窗标题
        this.gameEndPanel.horizontalCenter = 0; // 设置水平居中
        this.gameEndPanel.verticalCenter = 0; // 设置垂直居中
        this.gameEndPanel.x = this.stage.width/2-200;
        this.gameEndPanel.y = this.stage.height/2-50;
        //this.gameEndPanel.addEventListener(egret.Event.CLOSE, this.onGameEndClose, this); // 监听弹窗关闭事件
    }

    private onTimer(event: egret.TimerEvent): void {
        // 更新计时器文本
        let currentTime = Math.max(this.totalTime - Math.floor((egret.getTimer() - this.startTime) / 1000), 0);
        let minutes = Math.floor(currentTime / 60);
        let seconds = currentTime % 60;
        this.timerText.text = minutes.toString() + ":" + (seconds < 10 ? "0" : "") + seconds.toString();
    }

    private onTimerComplete(event: egret.TimerEvent): void {
        // 游戏结束逻辑
        this.gameTimer.stop();
        this.addChild(this.gameEndPanel);
        this.endtimestamp = Date.now();
        this.isend = true;
        

        //结束的时候发送一次时间戳
        let gameSocket = Background.gameSocket;
        console.log("发送结束的时间戳到服务器！");
        let str_endtimestamp = "endtime:" + this.endtimestamp.toString();
        //发送时间戳到服务器;
        gameSocket.writeUTF(str_endtimestamp);
        gameSocket.flush();

    }
}