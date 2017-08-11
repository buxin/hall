class PlayerInfoScene extends WinBase{

	private imgAvatar: eui.Image;
	private rectMask: eui.Rect;
	private lName: eui.Label;
	private lDiamondNum: eui.Label;
	private imgDiamond1: eui.Image;
	private imgArrow: eui.Image;
	private btnLogout: eui.Image;
	private gTitle0: eui.Group;
	private packTitle0: eui.Image;
	private textTitle0: eui.Label;
	private gTitle1: eui.Group;
	private packTitle1: eui.Image;
	private textTitle1: eui.Label;
	private rectAvatar: eui.Rect;

	private uiStyle:number = GameConstant.PLAYER_INFO_SCENE_LAYOUT_MYINFO;

	public constructor(uiStyle:number) {
		super();
		this.uiStyle = uiStyle;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PlayerInfoWnd.exml";
	}

	private onComplete():void{

		this.initUI();
		this.initData();
		this.initListener();
    }

	public initUI():void
	{
		this.imgAvatar.mask = this.rectMask;

		this.btnLogout.visible = (this.uiStyle == GameConstant.PLAYER_INFO_SCENE_LAYOUT_MYINFO);
		this.imgArrow.visible = (this.uiStyle == GameConstant.PLAYER_INFO_SCENE_LAYOUT_CHARGE);
		this.rectAvatar.visible = (this.uiStyle == GameConstant.PLAYER_INFO_SCENE_LAYOUT_CHARGE);
	}

	private initData():void
	{
		this.imgAvatar.source = WndManager.root.main.dataManager.MyPlayer.Avatar;
		this.lName.text = WndManager.root.main.dataManager.MyPlayer.Name;

		this.updateData();
	}

	public updateData():void
	{
		if(WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0)
		{
			this.gTitle1.visible = true;
			this.gTitle0.visible = false;

			if(WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0)
				this.textTitle1.text = WndManager.root.main.dataManager.SystemData.getPackNameBySubType1(WndManager.root.main.dataManager.MyPlayer.Packstype1);
			else
				this.textTitle1.text = "普通用户";
		}
		else
		{
			this.gTitle1.visible = false;
			this.gTitle0.visible = true;
		}

		this.lDiamondNum.text = WndManager.root.main.dataManager.MyPlayer.DiamondNum.toString();
	}

	private initListener():void
	{
		this.btnLogout.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnLogoutClick,this);
		this.rectAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnAvatarClick,this);
	}

	private HandleBtnLogoutClick(e:egret.TouchEvent):void
	{
		// var event = new egret.Event("openChargeScene",true);
        // this.dispatchEvent(event);
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
		this.rectAvatar.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnAvatarClick,this);
	}
}