class IncomeItemRender extends eui.ItemRenderer{
	    
  
    private lInfo: eui.Label;
    private lTime: eui.Label;
    private lMoneny: eui.Label;
    private rectTouch: eui.Rect;


    private itemId:number = 0;
  
    public constructor() {
        super();
        this.touchChildren = true;
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     this.skinName = "resource/items/IncomeItem.exml";
    }

    private onComplete():void{
        // this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleItemClick,this);
    }
    
    public dataChanged():void{
        // 将数据对应到组件上

  //      this.itemId = Number(this.data.id);
        // this.lInfo.text = this.data.chargenick+" 充值"+this.data.chargenum;
        var yuan1:string=(Number(this.data.cnum)/100) +"";
        var yuan:string=(Number(this.data.chargenum)/100) +"";
        	this.lInfo.textFlow =  [	{ text: this.data.chargenick+" 充值", style:{"textColor":0x0,"size":24}},
			{ text:yuan, style:{"textColor":0xff0000,"size":24}},
            { text:"元", style:{"textColor":0x0,"size":24}}]
            this.lTime.text = this.data.ctime;
            this.lMoneny.textFlow =  [
			{ text:yuan1, style:{"textColor":0x11bf80,"size":20}},
            { text:"元", style:{"textColor":0x0,"size":20}}]
    }

    // private handleItemClick(e:egret.TouchEvent):void
    // {
    //     var event = new egret.Event("withdrawItemClick",true,false,this.itemId);
    //     this.dispatchEvent(event);
    // }
    
}