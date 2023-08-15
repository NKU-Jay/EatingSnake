class MyButton extends egret.Sprite {
    private bg: egret.Bitmap;
    public isSpeedUp: boolean = false;

     public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }
    private onAddToStage(event: egret.Event) {
        this.initJoystick();
    }
    private initJoystick() {
        // 创建摇杆背景
        this.bg = new egret.Bitmap(RES.getRes("button_png"));
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        

        this.bg.y =2750;
        this.bg.scaleX = this.scaleY = 0.2;

        this.bg.x = 600;
        
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTap, this)
    }

    private onButtonTap(event: egret.TouchEvent) : void{
         this.isSpeedUp = !this.isSpeedUp;
    }
}