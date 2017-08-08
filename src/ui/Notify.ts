/**
 *
 * @author 
 *
 */
class Notify extends WinBase{
	public constructor() {
        super();
	}
	
    static root:MainScene;
    static NotifyMsg(msg: string): void{
        //Notify.root.notify.NotifyMsg(msg);
    }
    private NotifyMsg(msg: string):void{
        
        var sp = new egret.Sprite;
        this.addChild(sp);

        var txt: egret.TextField = new egret.TextField;
        txt.text = msg;
        txt.size = 25;
        this.addChild(txt);
        txt.textColor = 0xff0000;
        txt.x = Notify.root.stage.stageWidth;
        txt.stroke = 1;
        txt.strokeColor = 0xfcc800;
        txt.y = 200;
        var nX = (Notify.root.stage.stageWidth - txt.width) / 2;
        txt.bold = true;
        var self = this;

        sp.graphics.beginFill(0xffffff, 1);
        sp.graphics.drawRoundRect(0, 0, txt.width + 40, txt.height + 10, 10, 10);
        sp.graphics.endFill();
        
        sp.x = txt.x - 20;
        sp.y = txt.y - 5;
        
        
        egret.Tween.get(txt).to({ x: nX },400).wait(1000).to({ x: -Notify.root.stage.stageWidth },400).call(() => { 
            self.removeChild(txt);
        }, this);

        egret.Tween.get(sp).to({ x: nX-20 }, 400).wait(1000).to({ x: -Notify.root.stage.stageWidth-20 }, 400).call(() => {
            self.removeChild(sp);
        }, this);
    }
}
