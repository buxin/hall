class SignScene extends WinBase{

	private touchRect: eui.Rect;
	private yesBtn2: eui.Image;
	private yesBtn3: eui.Image;
	private lSignReward: eui.Label;
	private lSignDays: eui.Label;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/SignWnd.exml";
	}

	private onComplete():void{
		this.initData();
		this.initListener();
    }

	private initData():void
	{
		this.yesBtn3.visible = WndManager.root.main.dataManager.MyPlayer.SignToday;

		//签到天数
		this.lSignDays.text = "已成功签到"+WndManager.root.main.dataManager.MyPlayer.SignDays.toString()+"天";

		//今日签到奖励
		this.lSignReward.text = "+"+WndManager.root.main.dataManager.MyPlayer.SignDiamond.toString();
	}

	private initListener():void
	{
		this.yesBtn2.once(egret.TouchEvent.TOUCH_TAP,this.HandleYesBtn2Click,this);

		this.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleCloseClick,this);
	}

	//签到
	private HandleYesBtn2Click(e:egret.TouchEvent):void
	{
		WndManager.root.main.protocol.sign();
	}

	protected release():void
	{
		//this.yesBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleYesBtn2Click,this);

		this.touchRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleCloseClick,this);
	}

	public setVisible(value:boolean):void
	{
		this.visible = value;
		//初始化
		if(value)
			this.initData();
	}

		//签到
	private HandleCloseClick(e:egret.TouchEvent):void
	{
		this.visible = false;
	}
}