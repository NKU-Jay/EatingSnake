class Joystick extends egret.Sprite {
    private bg: egret.Bitmap;
    private thumb: egret.Bitmap;
    private radius: number = 80; // 摇杆半径
    private initPosX = 0;
    private initPosY = 0;
    public angle = 0;
    public cosangle =0 ;
    public sinangle = 0;
    public mark =0 ;



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }

    private onAddToStage(event: egret.Event) {
        this.initJoystick();
    }

    private initJoystick() {
        // 创建摇杆背景
        this.bg = new egret.Bitmap(RES.getRes("joystick_bg_png"));
        this.addChild(this.bg);
        this.bg.touchEnabled = true;

        // 创建摇杆拇指
        this.thumb = new egret.Bitmap(RES.getRes("joystick_png"));
        this.thumb.anchorOffsetX = this.thumb.width / 2;
        this.thumb.anchorOffsetY = this.thumb.height / 2;
        this.addChild(this.thumb);
   
           // 注册摇杆事件
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.thumb.x = this.bg.x = 100;
        this.thumb.y = this.bg.y = 600;
        this.thumb.scaleX = this.thumb.scaleY = 0.2;


    }
   
       private onTouchBegin(event: egret.TouchEvent) {
           this.onTouchMove(event);
           this.initPosX = event.stageX;
           this.initPosY = event.stageY;
          
       }
   
       public onTouchMove(event: egret.TouchEvent) {
           // 计算摇杆的位置和角度
           let dx = event.stageX - this.initPosX;
           let dy = event.stageY - this.initPosY;
           let distance = Math.sqrt(dx*dx + dy*dy);
           this.angle = Math.atan2(dy, dx);
           this.cosangle = dx / distance;
           this.sinangle = dy / distance;
        //    this.cosangle = Math.cos(this.angle);
        //    this.sinangle = Math.sin(this.angle);
           //console.log(this.angle);
        
   
           // 限制摇杆的范围
           if (distance > this.radius) {
               dx = this.radius * Math.cos(this.angle);
               dy = this.radius * Math.sin(this.angle);
           }
   
           // 更新摇杆的位置
           this.thumb.x = this.bg.x + dx;
           this.thumb.y = this.bg.y + dy;
           
           // 派发摇杆事件
        //    let joystickEvent = new JoystickEvent(JoystickEvent.CHANGE);
        //    joystickEvent.angle = angle;
        //    this.dispatchEvent(joystickEvent);
       }
   
       private onTouchEnd(event: egret.TouchEvent) {
           // 摇杆回到初始位置
           this.thumb.x = this.bg.x;
           this.thumb.y = this.bg.y;
   
           // 派发摇杆事件
        //    let joystickEvent = new JoystickEvent(JoystickEvent.CHANGE);
        //    joystickEvent.angle = null;
        //    this.dispatchEvent(joystickEvent);
       }
   }