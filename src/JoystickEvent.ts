class JoystickEvent extends egret.Event {
    public static CHANGE: string = "joystick_change";
    public angle: number;

    public constructor(type: string, bubbles?: boolean, cancelable?: boolean, angle?: number) {
        super(type, bubbles, cancelable);
        this.angle = angle;
    }
}