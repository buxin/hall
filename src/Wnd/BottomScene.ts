class BottomScene extends WinBase{


	private btnCharge1: eui.Image;
	private btnCharge2: eui.Image;
	private btnExploit1: eui.Image;
	private btnExploit2: eui.Image;
	private btnHall1: eui.Image;
	private btnHall2: eui.Image;
	private btnDiscovery1: eui.Image;
	private btnDiscovery2: eui.Image;
	private btnMyInfo1: eui.Image;
	private btnMyInfo2: eui.Image;
	private rectCharge: eui.Rect;
	private rectExploit: eui.Rect;
	private rectHall: eui.Rect;
	private rectDiscovery: eui.Rect;
	private rectMyInfo: eui.Rect;


	private btnSelectImgs:Array<eui.Image> = [];

	private btnUnSelectImgs:Array<eui.Image> = [];

	public selectId:number = 2;

	private lastSelectId:number = 2;

	private chargeWebScene:ChargeWebScene = null;


	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/BottomWnd.exml";
	}

	private onComplete():void{

		this.initUI();
		this.initListener();
    }

	private initUI():void
	{
		this.initImgs();
		this.updateSelectShow();
	}

	private initImgs():void
	{
		this.btnSelectImgs.push(this.btnCharge1);
		this.btnSelectImgs.push(this.btnExploit1);
		this.btnSelectImgs.push(this.btnHall1);
		this.btnSelectImgs.push(this.btnDiscovery1);
		this.btnSelectImgs.push(this.btnMyInfo1);

		this.btnUnSelectImgs.push(this.btnCharge2);
		this.btnUnSelectImgs.push(this.btnExploit2);
		this.btnUnSelectImgs.push(this.btnHall2);
		this.btnUnSelectImgs.push(this.btnDiscovery2);
		this.btnUnSelectImgs.push(this.btnMyInfo2);
	}

	
	private updateSelectShow():void
	{
		for(var i=0;i<this.btnSelectImgs.length;i++)
		{
			this.btnSelectImgs[i].visible = (this.selectId == i);
			this.btnUnSelectImgs[i].visible = (this.selectId != i);
		}
	}

	private initListener():void
	{
		//this.addEventListener("backHall",this.backHall,this);
		this.rectCharge.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnChargeClick,this);
		this.rectExploit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnExploitClick,this);
		this.rectHall.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnHallClick,this);
		this.rectDiscovery.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnDiscoveryClick,this);
		this.rectMyInfo.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnMyInfoClick,this);
	}

	//返回大厅
	public backHall(e:egret.Event):void
	{
		this.HandleBtnHallClick(null);
	}

	//显示我的战绩
	public backExploit(e:egret.Event):void
	{
		this.HandleBtnExploitClick(null);
	}


	//返回我的信息窗口
	public backMyInfo(e:egret.Event):void
	{
		this.HandleBtnMyInfoClick(null);
	}

	//充值
	public HandleBtnChargeClick(e:egret.TouchEvent):void
	{
		this.SelectId = 0;
		this.updateSelectShow();
		this.switchScene();      
	}
	
	//战绩
	private HandleBtnExploitClick(e:egret.TouchEvent):void
	{
		// if(WndManager.root.main.protocol.jumpGametypeId >0)
		// {
		// 		this.SelectId = 1;
		// 	this.updateSelectShow();
		// 	this.switchScene();
		// }
		// else
		// {
			WndManager.root.main.protocol.addEventListener("OngetExploit",this.OngetExploit,this)
			WndManager.root.main.protocol.getExploit();
		//}
	}

	private OngetExploit(){
		this.SelectId = 1;
		this.updateSelectShow();
		this.switchScene();
	}
	//大厅
	private HandleBtnHallClick(e:egret.TouchEvent):void
	{
		this.SelectId = 2;
		this.updateSelectShow();
		this.switchScene();
	}

	//发现
	private HandleBtnDiscoveryClick(e:egret.TouchEvent):void
	{
			WndManager.root.main.protocol.addEventListener("Ongetdraw",this.Ongetdraw,this)
			WndManager.root.main.protocol.getDrawInfo()

	}
	private Ongetdraw(){
		this.SelectId = 3;
		this.updateSelectShow();
		this.switchScene();
		//	this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.DrawData.getDrawInfo());
	}
	//我的
	private HandleBtnMyInfoClick(e:egret.TouchEvent):void
	{
		this.SelectId = 4;
		this.updateSelectShow();
		this.switchScene();
	}

	protected release():void
	{
		//this.removeEventListener("backHall",this.backHall,this);
		this.rectCharge.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnChargeClick,this);
		this.rectExploit.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnExploitClick,this);
		this.rectHall.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnHallClick,this);
		this.rectDiscovery.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnDiscoveryClick,this);
		this.rectMyInfo.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBtnMyInfoClick,this);
	}

	private switchScene():void
	{
		this.closeScene();
		this.openScene();
	}

	private openScene():void
	{
		switch(this.selectId)
		{
			case 0:
				WndManager.root.openWnd(ChargeScene);//调试充值页面
				//this.openChargePage();
				break;
			case 1:
				WndManager.root.openWnd(ExploitScene);
				break;
			case 2:
				WndManager.root.openWnd(FirstPageScene);
				break;
			case 3:
				WndManager.root.openWnd(DiscoveryScene);	
				break;
			case 4:
				WndManager.root.openWnd(MyInfoScene);	
				break;
		}
	}

	private closeScene():void
	{
		switch(this.lastSelectId)
		{
			case 0:
				WndManager.root.closeWnd(ChargeScene);
				//this.hideChargePage();
				break;
			case 1:
				WndManager.root.closeWnd(ExploitScene);
				break;
			case 2:
				WndManager.root.closeWnd(FirstPageScene);
				break;
			case 3:
				WndManager.root.closeWnd(DiscoveryScene);	
				break;
			case 4:
				WndManager.root.closeWnd(MyInfoScene);	
				break;
		}
	}

	private set SelectId(value:number)
	{
		this.lastSelectId = this.selectId;
		this.selectId = value;
	}

	public setClicked(value:boolean):void
	{
		this.touchEnabled = value;
		this.touchChildren = value;
	}

	public openChargePage():void
	{
		WndManager.root.main.protocol.getChargeAddr();
	}

	public onGetChargeAddr(e:egret.Event):void
	{
		var ret:string=e.data as string;

	}

	public showChargePage():void
	{
		this.hideChargePage();

		this.chargeWebScene = new ChargeWebScene();
		this.chargeWebScene.setVisible(true);
		this.addChild(this.chargeWebScene);
	}

	public hideChargePage():void
	{
		if(null !=this.chargeWebScene)
		{
			this.chargeWebScene.setVisible(false);
			this.removeChild(this.chargeWebScene);
			this.chargeWebScene = null;
		}
	}
}