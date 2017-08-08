class DrawInfoItemRender extends eui.ItemRenderer{
	    
    private lName: eui.Label;
    private lReward: eui.Label;
  
    public constructor() {
        super();
        this.touchChildren = true;
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     this.skinName = "resource/items/DrawInfoItem.exml";
    }

    private onComplete():void{
    }
    
    public dataChanged():void{
        // 将数据对应到组件上

        this.lName.text = this.data.name;
        this.lReward.textFlow =  this.data.rewardInfo; 
    }
}