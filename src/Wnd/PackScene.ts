class PackScene extends WinBase{

	private lTitle: eui.Label;
	private lTime: eui.Label;
	private gPack: eui.Group;
	private lDay: eui.Label;
	private lPrice1: eui.Label;
	private lWeek: eui.Label;
	private lPrice2: eui.Label;
	private lMonth: eui.Label;
	private lPrice3: eui.Label;
	private btnPackDay: eui.Rect;
	private btnPackWeek: eui.Rect;
	private btnPackMonth: eui.Rect;
	private rectUntouch: eui.Rect;

	private chargeScene:ChargeScene;

	public constructor(chargeScene:ChargeScene) {
		super();
		this.chargeScene = chargeScene;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PackWnd.exml";
	}

	private onComplete():void{

		this.initUI();
		this.initData();
		this.initListener();
    }

	public initUI():void
	{
		this.rectUntouch.touchEnabled = false;
	}

	private initData():void
	{
		this.lPrice1.text =WndManager.root.main.dataManager.SystemData.getPackPriceStrBySubType1(1);
		this.lPrice2.text =WndManager.root.main.dataManager.SystemData.getPackPriceStrBySubType1(2);
		this.lPrice3.text =WndManager.root.main.dataManager.SystemData.getPackPriceStrBySubType1(3);

		this.lDay.text = WndManager.root.main.dataManager.SystemData.getPackShowNameBySubType1(1);
		this.lWeek.text = WndManager.root.main.dataManager.SystemData.getPackShowNameBySubType1(2);
		this.lMonth.text = WndManager.root.main.dataManager.SystemData.getPackShowNameBySubType1(3);

		this.updateData();
	}

	public updateData():void
	{
		this.lTitle.visible = WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0;
		this.lTime.visible = WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0;

		//this.rectUntouch.visible = WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0;

		//this.gPack.alpha = WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0?0.5:1;

		if(WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0)
		{
			var leftTime:number = WndManager.root.main.dataManager.MyPlayer.PackLeftTime;		
			this.lTime.text = MyUtils.formatDuring(leftTime);
		}
	}

	private initListener():void
	{
		this.btnPackDay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnPackDayClick,this);
		this.btnPackWeek.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnPackWeekClick,this);
		this.btnPackMonth.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnPackMonthClick,this);
	}

	private HandleBtnPackDayClick(e:egret.TouchEvent):void
	{
		if(WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0)
		{
			WndManager.root.notifyWnd.show("您已经是套餐用户",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}
		else
		{
			// WndManager.root.main.protocol.addEventListener("onShopping", this.onShopping, this);
			// WndManager.root.main.protocol.shopping(1);
			this.chargeScene.shopping(1);
		}
	}

	private HandleBtnPackWeekClick(e:egret.TouchEvent):void
	{
		if(WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0)
		{
			WndManager.root.notifyWnd.show("您已经是套餐用户",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}
		else
		{
			// WndManager.root.main.protocol.addEventListener("onShopping", this.onShopping, this);
			// WndManager.root.main.protocol.shopping(2);
			this.chargeScene.shopping(2);
		}	
	}

	private HandleBtnPackMonthClick(e:egret.TouchEvent):void
	{
		if(WndManager.root.main.dataManager.MyPlayer.PackLeftTime>0)
		{
			WndManager.root.notifyWnd.show("您已经是套餐用户",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}
		else
		{
			// WndManager.root.main.protocol.addEventListener("onShopping", this.onShopping, this);
			// WndManager.root.main.protocol.shopping(3);
			this.chargeScene.shopping(3);
		}
	}

	protected release():void
	{
		this.btnPackDay.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnPackDayClick,this);
		this.btnPackWeek.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnPackWeekClick,this);
		this.btnPackMonth.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnPackMonthClick,this);
	}

	private onShopping(e:egret.Event):void
	{
		this.chargeScene.onShopping(e);
	}
}