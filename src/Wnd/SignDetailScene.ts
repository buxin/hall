/*签到详情*/

class SignDetailScene extends WinBase{

	private g1: eui.Group;
	private g2: eui.Group;
	private g3: eui.Group;
	private g4: eui.Group;
	private g5: eui.Group;
	private g6: eui.Group;
	private g7: eui.Group;
	private lDate1: eui.Label;
	private lDate2: eui.Label;
	private lDate3: eui.Label;
	private lDate4: eui.Label;
	private lDate5: eui.Label;
	private lDate6: eui.Label;
	private lDate7: eui.Label;
	private scroller: eui.Scroller;
	private dataList: eui.List;
	private lSignNum: eui.Label;
	private rectRefresh: eui.Rect;


	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/SignDetailWnd.exml";
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

		for(var i=0;i<GameConstant.GAME_SIGN_DURATION;i++)
		{
			var gId:number = i+1;
			this["g"+gId].visible = i<WndManager.root.main.dataManager.MyPlayer.SignDays;
		}

		var dateStrArr:Array<string> = WndManager.root.main.dataManager.MyPlayer.DataArr;

		for(var i=0;i<GameConstant.GAME_SIGN_DURATION;i++)
		{
			var lDateId:number = i+1;
			this["lDate"+lDateId].text = dateStrArr[i];
		}

		this.lSignNum.text = WndManager.root.main.dataManager.SystemData.SignTodayNum.toString()+"人";

		this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;

	//	this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.SignInfo);
	WndManager.root.main.protocol.once("ongetSignNpc", this.ongetSignNpc, this);
		WndManager.root.main.protocol.getSignNpc();
		this.dataList.itemRenderer = SignInfoItemRender;

		this.scroller.viewport = this.dataList;
	}
	private ongetSignNpc(){
			this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.SignInfo);
	}
	public setVisible(value:boolean):void
	{
		this.visible = value;

        if(value)
		{
			//重置数据
			this.initData();
		}
	}

	private initListener():void
	{
		this.rectRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleRefreshClick,this);
	}

	protected release():void
	{
		this.rectRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleRefreshClick,this);
	}

	//刷新
	private HandleRefreshClick(e:egret.TouchEvent):void
	{
		
	}
}