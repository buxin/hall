/*推广申请界面 */
class PromotionScene1 extends WinBase{

	private inputName: eui.TextInput;
	private inputContact: eui.TextInput;
	private inputGameName: eui.TextInput;
	private inputWechat: eui.TextInput;
	private rectTouch: eui.Rect;
	private rectBack: eui.Rect;

	private myInfoScene:MyInfoScene;

	public constructor(myInfoScene:MyInfoScene) {
		super();
		this.myInfoScene = myInfoScene;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PromotionWnd1.exml";
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
		this.inputName.prompt = "请输入您的姓名";
		this.inputContact.prompt = "请输入您的手机号";
		this.inputGameName.prompt = "请输入您的游戏名称";
		this.inputWechat.prompt = "请输入您的微信号";

		this.inputName.text = "";
		this.inputContact.text = "";
		this.inputGameName.text = "";
		this.inputWechat.text = "";
	}

	private initListener():void
	{
		this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleSubmitClick,this);
		this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
	}

	protected release():void
	{
		this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleSubmitClick,this);
		this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
	}
	private HandleBack(){
		this.visible=false
	}
	private HandleSubmitClick(e:egret.TouchEvent):void
	{
		if(!MyUtils.checkStringIsNotNulll(this.inputName.text) )
		{
			WndManager.root.notifyWnd.show("请输入您的姓名",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}


		if(!MyUtils.checkStringIsNotNulll(this.inputContact.text) )
		{
			WndManager.root.notifyWnd.show("请输入您的手机号",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}
		else
		{
			// var rb: RegExp = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
			// if (rb.test(this.inputContact.text) == false)
			if(!MyUtils.verifyPhone(this.inputContact.text))
			{
				WndManager.root.notifyWnd.show("请正确输入您的手机号",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
				return;
			}
		}

		if(!MyUtils.checkStringIsNotNulll(this.inputGameName.text) )
		{
			WndManager.root.notifyWnd.show("请输入您的游戏名称",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}

		if(!MyUtils.checkStringIsNotNulll(this.inputWechat.text) )
		{
			WndManager.root.notifyWnd.show("请输入您的微信号",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}

		//提交
		WndManager.root.main.protocol.addEventListener("onPromotionApply",this.onPromotionApply,this);
		WndManager.root.main.protocol.promotionApply(this.inputName.text,this.inputContact.text,this.inputGameName.text,this.inputWechat.text);
	}


		private onPromotionApply(e:egret.Event):void
		{
			var ret:string=e.data as string;
			if(MyUtils.checkStringIsNotNulll(ret))
			{
				 var jsObj = JSON.parse(ret);
				if (jsObj) {
					var code:number = Number(jsObj.code);

					switch(code)
					{
						case -1:
						    WndManager.root.notifyWnd.show("您之前已经提交过申请了，请勿重复提交",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
							return;
						case -2:
							WndManager.root.notifyWnd.show("游戏名重复，请再取名",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
							return;
						case -3:
							WndManager.root.notifyWnd.show("提交资料有缺漏，请填写完整",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
							return;
						case -4:
							WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
							return;
						case 1:
							WndManager.root.notifyWnd.show("提交成功",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);


							WndManager.root.main.dataManager.MyPlayer.promotion = new Promotion(jsObj);

							//跳转到推广页面2
							this.myInfoScene.jumpPromotionScene2();
							
							return;
					}

				}
			}
			else{
				WndManager.root.notifyWnd.show("上传失败",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);	
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