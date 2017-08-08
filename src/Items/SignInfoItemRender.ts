class SignInfoItemRender extends eui.ItemRenderer{
	    
   private lInfo: eui.Label;
  
    public constructor() {
        super();
        this.touchChildren = true;
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     this.skinName = "resource/items/SignInfoItem.exml";
    }

    private onComplete():void{
    }
    
    public dataChanged():void{
        // 将数据对应到组件上

        this.lInfo.text = this.data.info;
    }
}