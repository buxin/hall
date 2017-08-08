/*推广申请界面 */
class PromotionScene2 extends WinBase{

	private imgStatus0: eui.Image;
	private imgStatus1: eui.Image;
	private imgStatus2: eui.Image;
	private rectBack: eui.Rect;



	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PromotionWnd2.exml";
	}

	private onComplete():void{
		this.init();
		this.initListener();
    }

	private init():void
	{
		this.initData();
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
	private initData():void
	{
		this.imgStatus0.visible = false;
		this.imgStatus1.visible = false;
		this.imgStatus2.visible = false;

		if(null != WndManager.root.main.dataManager.MyPlayer.promotion)
		{
			switch(WndManager.root.main.dataManager.MyPlayer.promotion.status)
			{
				case GameConstant.PROMOTION_STATUS_SUBMIT:
					this.imgStatus0.visible = true;
					break;
				case GameConstant.PROMOTION_STATUS_CHECKING:
					this.imgStatus1.visible = true;
					break;
				case GameConstant.PROMOTION_STATUS_PASS:
					this.imgStatus2.visible = true;
					break;

			}
		}
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