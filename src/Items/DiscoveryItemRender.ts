class DiscoveryItemRender extends eui.ItemRenderer{
	    
    private icon: eui.Image;
    private lItemName: eui.Label;
    private lItemDesc: eui.Label;
    private lItemNews: eui.Label;
    private rectTouch: eui.Rect;

    private itemId:number = 0;
  
    public constructor() {
        super();
        this.touchChildren = true;
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     this.skinName = "resource/items/DiscoveryItem.exml";
    }

    private onComplete():void{
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleItemClick,this);
    }
    
    public dataChanged():void{
        // 将数据对应到组件上

        this.itemId = Number(this.data.itemId);
        this.icon.source = RES.getRes(this.data.imgSource);
        this.lItemName.text = this.data.itemName;
        this.lItemDesc.text = this.data.itemDesc;
        this.lItemNews.textFlow =  this.data.itemNews; 
    }

    private handleItemClick(e:egret.TouchEvent):void
    {
        var event = new egret.Event("discoveryJump",true,false,this.itemId);
        this.dispatchEvent(event);
    }
    
}