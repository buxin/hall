/*推广申请界面 */
class PromotionScene6 extends WinBase{

	private scroller: eui.Scroller;
	private dataList: eui.List;
	private rectBack: eui.Rect;

	private promotionScene7:PromotionScene7;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PromotionWnd6.exml";
	}

	private onComplete():void{
		this.init();
  		this.initListener();
  }
	private initListener():void
	{
		this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
	}

	protected release():void
	{
		this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
	}
	private HandleBack(){
		this.visible=false
	}
	private init():void
	{
		this.addEventListener("withdrawItemClick",this.withdrawItemClick,this);

		this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;

		this.dataList.itemRenderer = WithdrawItemRender;

		this.scroller.viewport = this.dataList;

		this.promotionScene7 = new PromotionScene7();
		this.promotionScene7.visible = false;
		this.addChild(this.promotionScene7);
	}

	//打开单个提现记录界面
	private withdrawItemClick(e:egret.Event):void
	{
		var itemId:number = Number(e.data);
		var wData:any = WndManager.root.main.dataManager.MyPlayer.getWithdrawDataById(itemId);

		if(null != wData)
		{
			this.promotionScene7.show(true,wData);
		}
	}

	private initData():void
	{
		this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.MyPlayer.withdrawArr);
	}

	public setVisible(value:boolean):void
	{
		this.visible=value;
        if(value)
		{
			this.initData();
		}
	}
}