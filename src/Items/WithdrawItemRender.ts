class WithdrawItemRender extends eui.ItemRenderer{
	    
  
    private lInfo: eui.Label;
    private lTime: eui.Label;
    private lStatus: eui.Label;
    private rectTouch: eui.Rect;


    private itemId:number = 0;
  
    public constructor() {
        super();
        this.touchChildren = true;
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     this.skinName = "resource/items/WithdrawItem.exml";
    }

    private onComplete():void{
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleItemClick,this);
    }
    
    public dataChanged():void{
        // 将数据对应到组件上

        this.itemId = Number(this.data.id);
        var cNub:number=(Number(this.data.cnum)/100)
        this.lInfo.text = "提现"+cNub+"元";
        this.lTime.text = this.data.time1 as string;
        var status:number = Number(this.data.status);
        switch(status)
        {
            case 1:
                this.lStatus.text = "发起申请";
                break;
            case 2:
                this.lStatus.text = "提交银行";
                break;
            case 3:
                this.lStatus.text = "提现成功";
                break;
            case 4:
                this.lStatus.text = "提现失败";
                break;
        }
    }

    private handleItemClick(e:egret.TouchEvent):void
    {
        var event = new egret.Event("withdrawItemClick",true,false,this.itemId);
        this.dispatchEvent(event);
    }
    
}