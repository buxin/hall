class ChargeItemRender extends eui.ItemRenderer{
	    
    private lDiamondNum: eui.Label;
    private lMoney: eui.Label;
    private rectTouch: eui.Rect;

    private id:number =-1;
  
    public constructor() {
        super();
        this.name="chargeitemrender"
        this.touchChildren = true;
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     this.skinName = "resource/items/ChargeItem.exml";
    }

    private onComplete():void{
        this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleItemClick,this);
    }
    
    public dataChanged():void{
        // 将数据对应到组件上
        this.lDiamondNum.text = this.data.jewel;
        this.lMoney.text = this.data.money + "元";
        this.id = this.data.id;
    }

    private handleItemClick(e:egret.TouchEvent):void
    {
        //充值
        	WndManager.root.main.protocol.addEventListener("Onpay", this.Onpay, this);
        WndManager.root.main.protocol.getPay(this.id);
        this.rectTouch.touchEnabled=false;
    }
    private Onpay()
        {
        this.rectTouch.touchEnabled=true;
           payment({appId:WndManager.root.main.protocol.dataManager.MyPlayer.AppId,
           timeStamp:WndManager.root.main.protocol.dataManager.MyPlayer.TimeStamp,
           nonceStr: WndManager.root.main.protocol.dataManager.MyPlayer.NonceStr,
           prepay_id: WndManager.root.main.protocol.dataManager.MyPlayer.Prepay_id,
           signType:  WndManager.root.main.protocol.dataManager.MyPlayer.SignType,
           paySign: WndManager.root.main.protocol.dataManager.MyPlayer.PaySign})
        }
      public fundcz(str:string){
           egret.log(str)
        	WndManager.root.main.protocol.addEventListener("onzuanshiNum", this.onzuanshiNum, this);
          
          WndManager.root.main.protocol.zuanshiNum();
      }

      private onzuanshiNum(){
          
      }
    
}