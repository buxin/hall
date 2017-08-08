class FeedbackItemRender extends eui.ItemRenderer{
	    
  
    private lTime: eui.Label;
    private lIssues: eui.Label;
    private lReply: eui.Label;

    private itemId:number = 0;
  
    public constructor() {
        super();
        this.touchChildren = true;
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     this.skinName = "resource/items/FeedbackItem.exml";
    }

    private onComplete():void{
        // this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleItemClick,this);
    }
    
    public dataChanged():void{
        // 将数据对应到组件上

        this.lTime.text = this.data.fbtime;
        this.lIssues.text = this.data.issues;
        this.lReply.text = this.data.reply;

    }

    // private handleItemClick(e:egret.TouchEvent):void
    // {
    //     var event = new egret.Event("withdrawItemClick",true,false,this.itemId);
    //     this.dispatchEvent(event);
    // }
    
}