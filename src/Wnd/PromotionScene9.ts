class PromotionScene9 extends WinBase{

	private Tijiaobnt: eui.Image;
	private Rightbnt: eui.Image;
	private Leftbnt: eui.Image;
	private zongjin: eui.Label;
	private riqi: eui.Label;
	private yuefen: eui.Label;
	private scroller: eui.Scroller;
	private dataList1: eui.List;
	private rectBack: eui.Rect;

	private monthNum:number=0;
	private nextMonthNum:number = 0;

	private myInfoScene:MyInfoScene;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PromotionWnd9.exml";
	}

	private onComplete():void{
		this.init();
    		this.initListener();
}

	private init():void
	{
		this.Rightbnt.addEventListener(egret.TouchEvent.TOUCH_TAP,this._right,this)
		this.Leftbnt.addEventListener(egret.TouchEvent.TOUCH_TAP,this._left,this)
		this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;

		this.dataList1.itemRenderer = IncomeItemRender;

		this.scroller.viewport = this.dataList1;

}

private initListener():void
	{
		this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
	}

	protected release():void
	{
		this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
	}
	private HandleBack(){
		this.visible=false
	}
	private _right(){
		this.nextMonthNum-=1;
		if(this.nextMonthNum<0){
			this.nextMonthNum=0;
			this.Rightbnt.touchEnabled=false;
		}

		if(this.nextMonthNum!= this.monthNum)
		{
			this.monthNum = this.nextMonthNum;
			WndManager.root.main.protocol.addEventListener("ongetincomes1",this.ongetincomes,this)
			WndManager.root.main.protocol.getincomes1(this.monthNum);
		}
	}
	private _left(){
		this.nextMonthNum+=1;
		if(this.nextMonthNum>3){
			this.nextMonthNum=3;
			this.Leftbnt.touchEnabled=false;
		}

		if(this.nextMonthNum!= this.monthNum)
		{
			this.monthNum = this.nextMonthNum;
			WndManager.root.main.protocol.addEventListener("ongetincomes1",this.ongetincomes,this)
			WndManager.root.main.protocol.getincomes1(this.monthNum);
		}
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

				this.initData();
				this.yuefen.text =month+"月明细";
				this.riqi.text =year+".0"+month;
				this.zongjin.text=""+WndManager.root.main.dataManager.MyPlayer.income;

				this.Leftbnt.touchEnabled=true;
				this.Rightbnt.touchEnabled=true;
			}
		}
		else{
			WndManager.root.notifyWnd.show("提交上传失败",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);	
		}
	}

	private initData():void
	{
		this.dataList1.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.MyPlayer.incomeArr);
	}

	public show(value:boolean,year:string,month:string):void
	{
		this.visible=value;
        if(value)
		{
			this.initData();
		this.yuefen.text =month+"月明细";
		this.riqi.text =year+".0"+month;
		this.zongjin.text=""+WndManager.root.main.dataManager.MyPlayer.income;
			
		}
	}
}