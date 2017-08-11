/*加盟 */

class JoinScene extends WinBase{

	private inputName: eui.TextInput;
	private inputPhone: eui.TextInput;
	private inputArea: eui.TextInput;
	private inputExplanation: eui.TextInput;
	private rectTouch: eui.Rect;


	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/JoinWnd.exml";
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
		this.inputPhone.prompt = "请输入您的手机号";
		this.inputArea.prompt = "请输入您的省份地址";
		this.inputExplanation.prompt = "请描述您加盟本平台的优势";

		this.inputExplanation.textDisplay.multiline = true;
	}

	private initListener():void
	{
		this.rectTouch.once(egret.TouchEvent.TOUCH_TAP,this.HandleSubmitClick,this);
	}

	protected release():void
	{
		this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleSubmitClick,this);
	}

	private HandleSubmitClick(e:egret.TouchEvent):void
	{
		if(!MyUtils.checkStringIsNotNulll(this.inputName.text) )
		{
			WndManager.root.notifyWnd.show("请输入您的姓名",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}


		if(!MyUtils.checkStringIsNotNulll(this.inputPhone.text) )
		{
			WndManager.root.notifyWnd.show("请输入您的手机号",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}
		else
		{
			// var rb: RegExp = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
			// if (rb.test(this.inputPhone.text) == false)
			if(!MyUtils.verifyPhone(this.inputPhone.text))
			{
				WndManager.root.notifyWnd.show("请正确输入您的手机号",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
				return;
			}
		}

		if(!MyUtils.checkStringIsNotNulll(this.inputArea.text) )
		{
			WndManager.root.notifyWnd.show("请输入您的省份地址",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}

		if(!MyUtils.checkStringIsNotNulll(this.inputExplanation.text) )
		{
			WndManager.root.notifyWnd.show("请描述您加盟本平台的优势",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			return;
		}

		//提交
		WndManager.root.main.protocol.addEventListener("OnJoinback",this.OnJoinback,this)
		WndManager.root.main.protocol.Joinback(this.inputName.text,this.inputPhone.text,this.inputArea.text,this.inputExplanation.text)
	}


		private OnJoinback(e:egret.Event):void
			{
			var ret:string=e.data as string;
			if(ret=="1"){
			WndManager.root.notifyWnd.show("申请成功,我们会尽快和您联系！",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
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
			this.initListener();
		}
	}
	
}
