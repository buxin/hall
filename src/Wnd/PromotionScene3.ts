/*推广申请界面 */
class PromotionScene3 extends WinBase{

	private lReason: eui.Label;
	private rectBack: eui.Rect;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PromotionWnd3.exml";
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
		this.lReason.text = "";
	

		if(null != WndManager.root.main.dataManager.MyPlayer.promotion)
		{
			this.lReason.text =  WndManager.root.main.dataManager.MyPlayer.promotion.denyreason;
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