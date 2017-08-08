/*反馈成功 */

class FeedbackScene1 extends WinBase{

	private rectShowList1: eui.Rect;
	private rectShowList: eui.Rect;

	private myInfoScene:MyInfoScene;

	public constructor(myInfoScene:MyInfoScene) {
		super();
		this.myInfoScene = myInfoScene;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/FeedbackWnd1.exml";
	}

	private onComplete():void{
		this.init();
    }

	private init():void
	{
		this.initListener();
	}

	private initListener():void
	{
		this.rectShowList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleShowListClick,this);
		this.rectShowList1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleShowListClick,this);
	}

	protected release():void
	{
		this.rectShowList.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleShowListClick,this);
		this.rectShowList1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleShowListClick,this);
	}


	//显示我之前的反馈
	public HandleShowListClick(e:egret.Event):void
	{
		this.visible = false;
		this.myInfoScene.showSubScene(5);
	}


}