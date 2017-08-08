class TopScene extends WinBase{

	private rectPanel: eui.Rect;
	private imgAvatar: eui.Image;
	private rectMask: eui.Rect;
	private lName: eui.Label;
	private imgDiamond: eui.Image;
	private lDiamondNum: eui.Label;
	private btnCharge: eui.Image;
	private btnSign: eui.Image;
	private btnSign1: eui.Image;
	private btnFeedback: eui.Image;
	private btnLogout: eui.Image;
	private rectAvatar: eui.Rect;
	
	private uiStyle:number = GameConstant.TOPSCENE_LAYOUT_HALL;

	//初始化窗口高度，组件宽，高
	public initSize():void
	{
	}

	public screenAdapt():void
	{
	}


	public constructor(uiStyle:number) {
		super();
		this.uiStyle = uiStyle;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/TopWnd.exml";
	}

	private onComplete():void{

		this.initUI();
		this.initData();
		this.modUI();
		this.initListener();
    }

	public initUI():void
	{
		this.imgAvatar.mask = this.rectMask;

		this.btnLogout.visible = (this.uiStyle == GameConstant.TOPSCENE_LAYOUT_MYINFO);
		this.btnFeedback.visible = (this.uiStyle == GameConstant.TOPSCENE_LAYOUT_HALL);

		if(this.uiStyle == GameConstant.TOPSCENE_LAYOUT_HALL)
		{
			this.btnSign.visible=!WndManager.root.main.dataManager.MyPlayer.SignToday;
			this.btnSign1.visible=WndManager.root.main.dataManager.MyPlayer.SignToday;
		}
		else{
			this.btnSign.visible=false
			this.btnSign1.visible=false
		}



		//this.screenAdapt();
	}

	private initData():void
	{
		this.imgAvatar.source = WndManager.root.main.dataManager.MyPlayer.Avatar;
		this.lName.text = WndManager.root.main.dataManager.MyPlayer.Name;
		this.lDiamondNum.text = WndManager.root.main.dataManager.MyPlayer.DiamondNum.toString();
	}

	private initListener():void
	{
		this.btnLogout.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnLogoutClick,this);
		this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnChargeClick,this);
		this.btnSign.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnSignClick,this);
		this.btnFeedback.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnFeedbackClick,this);
		this.rectAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnAvatarClick,this);
	}

	private HandleBtnLogoutClick(e:egret.TouchEvent):void
	{
		// var event = new egret.Event("openChargeScene",true);
        // this.dispatchEvent(event);
	}

	//充值
	private HandleBtnChargeClick(e:egret.TouchEvent):void
	{
		WndManager.root.gotopay()
	}

	//签到
	private HandleBtnSignClick(e:egret.TouchEvent):void
	{
		var event = new egret.Event("openSignScene",true);
        this.dispatchEvent(event);
		// WndManager.root.main.protocol.getSignInfo();
	}

	//反馈
	private HandleBtnFeedbackClick(e:egret.TouchEvent):void
	{
		var event = new egret.Event("openMyInfoSubScene",true,false,0);
        this.dispatchEvent(event);
	}

	//点击头像
	private HandleBtnAvatarClick(e:egret.TouchEvent):void
	{
		var event = new egret.Event("backMyInfo",true);
        this.dispatchEvent(event);
	}

	protected release():void
	{
		this.btnLogout.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnLogoutClick,this);
		this.btnCharge.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnChargeClick,this);
		this.btnSign.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnSignClick,this);
		this.btnFeedback.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnFeedbackClick,this);

		this.rectAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnAvatarClick,this);
	}


	private modUI():void
	{
		if(this.lDiamondNum.text!="")
		{
			var charNum:number = this.lDiamondNum.text.length;
			if(charNum <4)
				charNum == 4;

			this.btnCharge.x = this.lDiamondNum.x + 14*(charNum+1);
		}
	}
}