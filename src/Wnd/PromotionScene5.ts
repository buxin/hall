/*推广申请界面 */
class PromotionScene5 extends WinBase{

	private inputCnum: eui.TextInput;
	private inputBankname: eui.TextInput;
	private inputAccoutno: eui.TextInput;
	private inputAccoutname: eui.TextInput;
	private rectTouch: eui.Rect;
	private rectBack: eui.Rect;

	private promotionScene4:PromotionScene4;

	public constructor(promotionScene4:PromotionScene4) {
		super();
		this.promotionScene4 = promotionScene4;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PromotionWnd5.exml";
	}

	private onComplete():void{
		this.init();
    }

	private init():void
	{
		this.initData();
		this.initListener();
	}

	private initData():void
	{
		this.inputCnum.prompt = "可提现"+WndManager.root.main.dataManager.MyPlayer.income+"元";
		
		this.inputCnum.text = "";
		this.inputBankname.text = "";
		this.inputAccoutno.text = "";
		this.inputAccoutname.text = "";
	}

	private initListener():void
	{
		this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
		this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleSubmitClick,this);
	}

	protected release():void
	{
		this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
		this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleSubmitClick,this);
	}
private HandleBack(){
		this.visible=false
	}
	private HandleSubmitClick(e:egret.TouchEvent):void
	{	
		var inp:number=Number(this.inputCnum.text)
		var inpstr:string=String(inp*100);
		if(!MyUtils.checkStringIsNotNulll(inpstr) )
		{
			WndManager.root.notifyWnd.show("请输入提现金额",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}
		else
		{
			var rb: RegExp = /^\d+(\.\d{1,2})?$/;
			if (rb.test(this.inputCnum.text) == false)
			{
				WndManager.root.notifyWnd.show("请正确输入提取金额",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
				return;
			}
		}

		if(inp<WndManager.root.main.dataManager.SystemData.withdrawminimum)
		{
			WndManager.root.notifyWnd.show("最低可提现"+WndManager.root.main.dataManager.SystemData.withdrawminimum+"元",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}


		if(!MyUtils.checkStringIsNotNulll(this.inputBankname.text) )
		{
			WndManager.root.notifyWnd.show("请输入开户银行名字",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}
	

		

		if(!MyUtils.checkStringIsNotNulll(this.inputAccoutno.text) )
		{
			WndManager.root.notifyWnd.show("请输入银行卡号",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}

		if(!MyUtils.checkStringIsNotNulll(this.inputAccoutname.text) )
		{
			WndManager.root.notifyWnd.show("请输入银行户名",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}
		

		//提交
		WndManager.root.main.protocol.addEventListener("onWithdrawApply",this.onWithdrawApply,this);
		WndManager.root.main.protocol.withdrawApply(inpstr,this.inputBankname.text,this.inputAccoutno.text,this.inputAccoutname.text);
	}


		private onWithdrawApply(e:egret.Event):void
		{
			var ret:string=e.data as string;
			if(MyUtils.checkStringIsNotNulll(ret))
			{
				var retValue:number = Number(ret);

				if(retValue>0)
				{
					WndManager.root.main.dataManager.MyPlayer.income = (Number(retValue)/100);
					WndManager.root.notifyWnd.show("提交成功",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
					this.promotionScene4.initData();
					this.visible = false;
				}
				else
				{
					switch(retValue)
					{
					case -1:
						WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
						return;
					case -2:
						WndManager.root.notifyWnd.show("提现金额错误",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
						return;
					case -3:
						WndManager.root.notifyWnd.show("请正确填写开户银行名称",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
						return;
					case -4:
						WndManager.root.notifyWnd.show("请正确填写开户银行卡号",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
						return;
					case -5:
						WndManager.root.notifyWnd.show("请正确填写开户人姓名",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
						return;
					case -6:
						WndManager.root.notifyWnd.show("您不是推广员，不可以提现",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
						return;
					case -7:
						WndManager.root.notifyWnd.show("提现金额超出账户余额",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
						return;
					case -8:
						WndManager.root.notifyWnd.show("当前不是提现时间",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
						return;
					}
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
}