class MyInfoItemRender extends eui.ItemRenderer{
	    
  
    private icon: eui.Image;
    private lItemName: eui.Label;
    private rectTouch: eui.Rect;


    private itemId:number = 0;
  
    public constructor() {
        super();
        this.touchChildren = true;
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     this.skinName = "resource/items/MyInfoItem.exml";
    }

    private onComplete():void{
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleItemClick,this);
    }
    
    public dataChanged():void{
        // 将数据对应到组件上

        this.itemId = Number(this.data.id);
        this.icon.source = RES.getRes(this.data.imgSource);
        this.lItemName.text = this.data.name;
    }

    private handleItemClick(e:egret.TouchEvent):void
    {					

        var event = new egret.Event("myInfoItemClick",true,false,this.itemId);
        this.dispatchEvent(event);
    }
    
}