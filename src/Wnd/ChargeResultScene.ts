class ChargeResultScene extends WinBase{

	private lTitle: eui.Label;
	private lContent: eui.Label;
	private imgClose: eui.Image;
	private btnClose: eui.Rect;
	private yesBtn4: eui.Image;
	private btnBack: eui.Image;
	private yesBtn5: eui.Image;

	private param1:number = 0;

	public static  APP_SHOPPING:string = "APP_SHOPPING";

	private appCons:string = "";

	private chargeScene:ChargeScene;

	public constructor(chargeScene:ChargeScene) {
		super();
		this.chargeScene = chargeScene;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/ChargeResultWnd.exml";
	}

	private onComplete():void{

		this.initUI();
		this.initData();
		this.initListener();
    }

	public initUI():void
	{
	}

	private initData():void
	{
	}

	public updateData(title:string,content:string,param1:number,appCons:string):void
	{
		this.lTitle.text = title;
		this.lContent.text = content;
		this.visible = true;
		this.param1 = param1;
		this.appCons = appCons;

		if(this.appCons == ChargeResultScene.APP_SHOPPING)
		{
			this.btnClose.visible = true;
			this.imgClose.visible = true;
		}
		else
		{
			this.btnClose.visible = false;
			this.imgClose.visible = false;
		}

		if(MyUtils.checkStringIsNotNulll(content))
			this.lTitle.y = 450;
		else
			this.lTitle.y = 470;

		
		if(MyUtils.checkStringIsNotNulll(WndManager.root.main.protocol.serverInfo.gameweb) && this.appCons != ChargeResultScene.APP_SHOPPING)
		{
			this.yesBtn5.visible = false;

			this.yesBtn4.visible = true;

			this.btnBack.visible = true;
		}
		else
		{
			this.yesBtn5.visible = true;

			this.yesBtn4.visible = false;

			this.btnBack.visible = false;
		}
	}

	private initListener():void
	{
		this.yesBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnYesClick,this);
		this.yesBtn5.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnYesClick,this);

		this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnBackClick,this);

		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnCloseClick,this);
	}

	private HandleBtnYesClick(e:egret.TouchEvent):void
	{
		this.visible = false;
		
		if(this.appCons == ChargeResultScene.APP_SHOPPING)
		{
			this.chargeScene.confirmShoping(this.param1);
		}
	}

	private HandleBtnCloseClick(e:egret.TouchEvent):void
	{
		this.visible = false;
	}

	private HandleBtnBackClick(e:egret.TouchEvent):void
	{
		WndManager.root.backGame();
	}

	protected release():void
	{
		this.yesBtn4.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnYesClick,this);
		this.yesBtn5.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnYesClick,this);

		this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnCloseClick,this);
	}

}