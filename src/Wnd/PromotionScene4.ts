/*推广申请界面 */
class PromotionScene4 extends WinBase{

	private rectBack: eui.Rect;
	private rectCreateQr: eui.Rect;
	private lgname: eui.Label;
	private lincome: eui.Label;
	private ltip: eui.Label;
	private btnWithDraw: eui.Rect;
	private btnTellFriend: eui.Rect;
	private btnWithDrawRecord: eui.Rect;
	private btnWithDrawRule: eui.Rect;
	private goto9: eui.Image;


	private promotionScene5:PromotionScene5;

	private promotionScene6:PromotionScene6;

	private promotionScene8:PromotionScene8;
	private shareScene:ShareScene;


	private promotionScene9:PromotionScene9;

	private qrScene:QrScene;



	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PromotionWnd4.exml";
	}

	private onComplete():void{
		this.init();
    }

	private init():void
	{
		this.goto9.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gotop9,this)
		this.initData();
		this.initListener();

		this.promotionScene5 = new PromotionScene5(this);
		this.promotionScene5.visible = false;
		this.addChild(this.promotionScene5);

		this.promotionScene6 = new PromotionScene6();
		this.promotionScene6.visible = false;
		this.addChild(this.promotionScene6);

		this.promotionScene8 = new PromotionScene8();
		this.promotionScene8.visible = false;
		this.addChild(this.promotionScene8);

		this.promotionScene9 = new PromotionScene9();
		this.promotionScene9.visible = false;
		this.addChild(this.promotionScene9);
	}



	
	private gotop9(){
		WndManager.root.main.protocol.addEventListener("ongetincomes",this.ongetincomes,this)
		WndManager.root.main.protocol.getincomes(0)
	}
	private ongetincomes(e:egret.Event):void{
		var ret:string=e.data as string;
		if(MyUtils.checkStringIsNotNulll(ret))
		{
			if(ret == "-1")
			{
				WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
				return;
			}

			if(ret == "-2")
			{
				WndManager.root.notifyWnd.show("你不是推广员",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
				return;
			}
			if(ret == "-3")
			{
				WndManager.root.notifyWnd.show("查询类型不对",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
				return;
			}
			var jsObjArr = JSON.parse(ret);
			if (null != jsObjArr) 
			{
				WndManager.root.main.dataManager.MyPlayer.incomeArr = jsObjArr.incomeList;
				var year:string=jsObjArr.year
				var month:string=jsObjArr.month
				WndManager.root.main.dataManager.MyPlayer.income=(Number(jsObjArr.income)/100);

				this.promotionScene9.show(true,year,month);	

				// for(var i=0;i<jsObjArr.length;i++)
				// {
				// 	var w:Withdraw = new Withdraw(jsObjArr[i]);
				// 	WndManager.root.main.dataManager.MyPlayer.withdrawArr.push(w);
				// }

			}
		}
		else{
			WndManager.root.notifyWnd.show("提交上传失败",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);	
		}
	}

	public initData():void
	{

		this.lgname.text = WndManager.root.main.dataManager.MyPlayer.Gname;
		var incomeStr:string = WndManager.root.main.dataManager.MyPlayer.income.toString();
		this.lincome.textFlow = [	{ text:"余额:", style:{"textColor":0x0,"size":40}},
			{ text:incomeStr, style:{"textColor":0xff6968,"size":40}}]
		var timestring:string="(每周"+
		WndManager.root.main.dataManager.SystemData.getWithdrawWeekDays()+"的"+
		WndManager.root.main.dataManager.SystemData.getWithdrawstarttime()+"-"+
		WndManager.root.main.dataManager.SystemData.getWithdrawendtime()+"可提现）";

		this.ltip.textFlow =  [	{ text:"提现:", style:{"textColor":0xffffff,"size":40}},
			{ text:timestring, style:{"textColor":0xffffff,"size":30}}]
	}

	private initListener():void
	{
		this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
		this.rectCreateQr.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleCreateQr,this);
		this.btnWithDraw.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleWithDrawClick,this);
		this.btnWithDrawRecord.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleRecordClick,this);
		this.btnWithDrawRule.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleRuleClick,this);
		this.btnTellFriend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gotofriend,this);
		this.btnTellFriend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gotofriend,this);
		this.shareScene = new ShareScene();
		this.addChild(this.shareScene);
		this.shareScene.visible = false;
	}
	
private HandleBack(){
		this.visible=false
	}
	protected release():void
	{
		this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
		this.rectCreateQr.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleCreateQr,this);
		this.btnWithDraw.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleWithDrawClick,this);
		this.btnWithDrawRecord.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleRecordClick,this);
		this.btnWithDrawRule.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleRuleClick,this);
		
		
	}

	private gotofriend(){
				this.shareScene.visible = true;

	}

	//提现
	private HandleWithDrawClick(e:egret.TouchEvent):void
	{	
		this.promotionScene5.setVisible(true);	
	}

	//提现记录
	private HandleRecordClick(e:egret.TouchEvent):void
	{
		WndManager.root.main.protocol.addEventListener("onWithdrawInfo",this.onWithdrawInfo,this);
		WndManager.root.main.protocol.getMyWithdrawApply();
		
	}

	//提现规则
	private HandleRuleClick(e:egret.TouchEvent):void
	{
		this.promotionScene8.setVisible(true);
	}


	private onWithdrawInfo(e:egret.Event):void
	{
		var ret:string=e.data as string;
		if(MyUtils.checkStringIsNotNulll(ret))
		{
			if(ret == "-1")
			{
				WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
				return;
			}

			if(ret == "-2")
			{
				WndManager.root.notifyWnd.show("你不是推广员",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
				return;
			}

			var jsObjArr:any[] = JSON.parse(ret);
			if (null != jsObjArr) 
			{
				WndManager.root.main.dataManager.MyPlayer.withdrawArr = jsObjArr;

				this.promotionScene6.setVisible(true);	

				// for(var i=0;i<jsObjArr.length;i++)
				// {
				// 	var w:Withdraw = new Withdraw(jsObjArr[i]);
				// 	WndManager.root.main.dataManager.MyPlayer.withdrawArr.push(w);
				// }

			}
		}
		else{
			WndManager.root.notifyWnd.show("提交上传失败",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);	
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

	private HandleCreateQr(){

		if(MyUtils.checkStringIsNotNulll(WndManager.root.main.protocol.dataManager.MyPlayer.qrPath))
		{
			this.showQr();
		}
		else
		{
			WndManager.root.main.protocol.once("getQrImg", this.getQrImg, this);
			WndManager.root.main.protocol.getQrImgPath();
		}
	}

	private getQrImg(e:egret.Event):void
    {
		var ret:string=e.data as string;
		if(MyUtils.checkStringIsNotNulll(ret))
		{
			var jsObj = JSON.parse(ret);

			if(null != jsObj)
			{
				var code = Number(jsObj.code);
				if(code == -1)
				{
					WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
					return;
				}

				if(code == -2)
				{
					WndManager.root.notifyWnd.show("你不是推广员",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
					return;
				}

					WndManager.root.main.protocol.dataManager.MyPlayer.qrPath = jsObj.qrpath as string;

					this.showQr();
			}
			else
			{
				WndManager.root.notifyWnd.show("获取二维码失败",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);	
			}
			
		}
		else{
			WndManager.root.notifyWnd.show("获取二维码失败",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);	
		}
    }

	private showQr():void
	{
		if(null !=this.qrScene)
		{
			this.removeChild(this.qrScene);
			this.qrScene = null;
		}

		this.qrScene = new QrScene();
		this.qrScene.setVisible(true);
		this.addChild(this.qrScene);
	}
}