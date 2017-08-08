class NotityWnd extends eui.Component{

	private msgLabel:eui.Label;

	public static MOVE_HORIZONTAL:string = "MOVE_HORIZONTAL";

	private twMove:egret.Tween;

	public constructor() {
		super();
		this.msgLabel = new eui.Label();
		this.msgLabel.x = 0;
		this.msgLabel.y = 0;
		this.addChild(this.msgLabel);
	}

		public show(msg:string,textColor:number,stroke:number,strokeColor:number,move:string,startX:number,startY:number,endX:number,endY:number,duration:number):void{

	 var sp = new egret.Sprite;
        this.addChild(sp);

        var txt: egret.TextField = new egret.TextField;
        txt.text = msg;
        txt.size = 25;
        this.addChild(txt);
        txt.textColor = 0x666666;
        txt.x = 640;
     //   txt.stroke = 1;
     //   txt.strokeColor = 0x666666;
        txt.y = 200;
        var nX = (640 - txt.width) / 2;
        txt.bold = true;
        var self = this;

        sp.graphics.beginFill(0xffffff, 1);
        sp.graphics.drawRoundRect(0, 0, txt.width + 40, txt.height + 10, 10, 10);
        sp.graphics.endFill();
        
        sp.x = txt.x - 20;
        sp.y = txt.y - 5;
		//
		egret.Tween.get(txt).to({ x: nX },400).wait(1000).to({ x: -640 },400).call(() => { 
            self.removeChild(txt);
        }, this);

        egret.Tween.get(sp).to({ x: nX-20 }, 400).wait(1000).to({ x: -640-20 }, 400).call(() => {
            self.removeChild(sp);
        }, this);
	}

	 private onTweenComplete():void {
		 this.visible = false;
    }
}