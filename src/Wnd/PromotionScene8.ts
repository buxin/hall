/*推广申请界面 */
class PromotionScene8 extends WinBase{

	private lRule: eui.Label;
	private rectBack: eui.Rect;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PromotionWnd8.exml";
	}

	private onComplete():void{
		this.init();
   		this.initListener();
 }

	private init():void
	{
		this.initData();
	}

	private initData():void
	{
		this.lRule.text = "提现为充值的"+WndManager.root.main.dataManager.SystemData.commission+"%，每周"+
		WndManager.root.main.dataManager.SystemData.getWithdrawWeekDays()+"的"+
		WndManager.root.main.dataManager.SystemData.getWithdrawstarttime()+"-"+
		WndManager.root.main.dataManager.SystemData.getWithdrawendtime()+"为提现时间，最低可提现"+
		WndManager.root.main.dataManager.SystemData.withdrawminimum+"元,有问题可以随时咨询。。。";
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
	public setVisible(value:boolean):void
	{
		this.visible=value;
        if(value)
		{
			this.initData();
		}
	}
}