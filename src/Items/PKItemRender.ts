class PKItemRender extends eui.ItemRenderer{
	    
    private icon: eui.Image;
    private lItemName: eui.Label;
    private lItemOnline: eui.Label;
    private lItemDesc: eui.Label;
    private lItemCondition: eui.Label;
    private rectTouch: eui.Rect;

    private pkId:number = 0;
  
    public constructor() {
        super();
        this.touchChildren = true;
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     this.skinName = "resource/items/PKItem.exml";
    }

    private onComplete():void{
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleItemClick,this);
    }
    
    public dataChanged():void{
        // 将数据对应到组件上

        this.pkId = Number(this.data.pkId);
        this.icon.source = RES.getRes(this.data.imgSource);
        this.lItemName.textFlow = this.data.itemName;
        this.lItemOnline.textFlow = this.data.itemOnlineNum;
        this.lItemDesc.textFlow = this.data.itemDesc;
        this.lItemCondition.textFlow =  this.data.itemConditionNum;
    }

    private handleItemClick(e:egret.TouchEvent):void
    {
        var event = new egret.Event("discoveryJump",true,false,this.pkId);
        this.dispatchEvent(event);
    }
    
}