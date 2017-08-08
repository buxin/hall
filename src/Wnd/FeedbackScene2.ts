/*反馈成功 */

class FeedbackScene2 extends WinBase{

	private rectFeedback: eui.Rect;
	private scroller: eui.Scroller;
	private dataList: eui.List;

	private myInfoScene:MyInfoScene;

	public constructor(myInfoScene:MyInfoScene) {
		super();
		this.myInfoScene = myInfoScene;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/FeedbackWnd2.exml";
	}

	private onComplete():void{
		this.init();
    }

	private init():void
	{
		this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;

		this.dataList.itemRenderer = FeedbackItemRender;

		this.scroller.viewport = this.dataList;

		this.initListener();
	}


	private initListener():void
	{
		this.rectFeedback.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleFeedbackClick,this);
	}

	protected release():void
	{
		this.rectFeedback.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleFeedbackClick,this);
	}


	//提交反馈
	public HandleFeedbackClick(e:egret.Event):void
	{
		this.visible = false;
		this.myInfoScene.showSubScene(0);
	}

	private initData():void
	{
		this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.MyPlayer.feedbackArr);
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