/*抽奖界面 */

class DrawScene extends WinBase{

	private rectBack: eui.Rect;
	private imgAvatar: eui.Image;
	private rectMask: eui.Rect;
	private lName: eui.Label;
	private g1: eui.Group;
	private g2: eui.Group;
	private gDraw: eui.Group;
	private btnDraw: eui.Image;
	private lDrawPrice: eui.Label;
	private rectDraw: eui.Rect;
	private scroller: eui.Scroller;
	private dataList: eui.List;


	private drisArr:Array<DrawRewardItemScene> = [];
	private drisPosArr:Array<number> = [36,304,36+142,304,36+142*2,304,36+142*3,304,
									 									36+142*3,304+113,
										36+142*3,304+113*2,36+142*2,304+113*2,36+142,304+113*2,36,304+113*2,
																		36,304+113 ];

	private moveTimes:number = 0;
	private selectId:number = 0;
	private winId:number = -1;
	private tweenGDraw:egret.Tween;

	private dis:DiscoveryScene;

	public constructor(dis:DiscoveryScene) {
		super();
		this.dis=dis;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/DrawWnd.exml";
	}

	private onComplete():void{
		this.init();
    }

	private init():void
	{
		this.initUI();
		this.initData();
		this.initListener();
	}

	private initUI():void
	{
		var rewardArr:Array<number> = WndManager.root.main.dataManager.DrawData.RewardArr;
		var len:number = this.drisPosArr.length>>1;
		for(var i=0;i<rewardArr.length && i<len;i++)
		{
			var dris:DrawRewardItemScene = new DrawRewardItemScene(rewardArr[i]);
			dris.x = this.drisPosArr[i*2];
			dris.y = this.drisPosArr[i*2+1];
			this.addChild(dris);
			this.drisArr.push(dris);
		}

		this.resetLights();
		this.setDrisArrSelected(-1);

		this.imgAvatar.mask = this.rectMask;
	}

	private setDrisArrSelected(value:number):void
	{
		for(var i=0;i<this.drisArr.length;i++)
		{
			this.drisArr[i].setRectSelectVisible(value == i);
		}
	}

	private resetLights():void
	{
		this.g1.visible = true;
		this.g2.visible = false;
	}

	private initData():void
	{
		this.imgAvatar.source = WndManager.root.main.dataManager.MyPlayer.Avatar;
		this.lName.text = WndManager.root.main.dataManager.MyPlayer.Name;

		this.lDrawPrice.text = WndManager.root.main.dataManager.DrawData.DrawPrice.toString()+"钻1次";

		this.resetData();

		this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
			this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.DrawData.getDrawInfo());


		this.dataList.itemRenderer = DrawInfoItemRender;

		this.scroller.viewport = this.dataList;
	}

	private resetData():void
	{
		this.moveTimes = 0;
		this.selectId = 0;
		this.winId = -1;
	}

	private initListener():void
	{
		this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBackClick,this);
		this.rectDraw.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleDrawClick,this);
	}

	protected release():void
	{
		this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBackClick,this);
		this.rectDraw.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleDrawClick,this);
	}

	//返回
	private HandleBackClick(e:egret.TouchEvent):void
	{
		this.visible = false;
		this.dis.agindis();
	}

	//抽奖
	private HandleDrawClick(e:egret.TouchEvent):void
	{
		console.log("抽奖开始");
		this.rectDraw.touchEnabled = false;
		this.setBottomClicked(false);
		WndManager.root.main.dataManager.DrawData.Result=0;
		WndManager.root.main.protocol.addEventListener("Ondraw",this.Ondraw,this)
		WndManager.root.main.protocol.draw();

		//this.winId = Math.floor(Math.random()*this.drisArr.length);
		//this.playDrawAni(this.winId);
	}

	private Ondraw(){
		WndManager.root.main.protocol.addEventListener("onzuanshiNum",this.onzuanshiNum,this)
		WndManager.root.main.protocol.zuanshiNum();
		this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.DrawData.getDrawInfo());
		if(WndManager.root.main.dataManager.DrawData.Result==1){
		this.winId = WndManager.root.main.dataManager.DrawData.Idx;
		this.playDrawAni(this.winId);
		}
		else if(WndManager.root.main.dataManager.DrawData.Result==-1){
			WndManager.root.notifyWnd.show("钻石不足，请充值",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
		}
		
	}

	private onzuanshiNum(){
		
	}
	public setVisible(value:boolean):void
	{

		this.visible = value;

        if(value)
		{
		
			this.resetLights();
			this.setDrisArrSelected(-1);
			this.resetData();
		}
	}



	public playDrawAni(value:number):void
	{
		this.moveTimes = this.getMoveTimes(value);
		
		this.setDrisArrSelected(this.selectId);
		
		this.tweenGDraw = egret.Tween.get(this.gDraw,{loop:true});
		this.tweenGDraw.to({scaleX:0.8,scaleY:0.8},500).to({scaleX:1,scaleY:1},500);
		this.rotate();
	}

	private rotate():void
	{
		if(this.moveTimes>0)
		{	
			this.selectId = (this.selectId+1)%this.drisArr.length;

			var time:number = 50;
			if(this.moveTimes<8)
				time = 100;

			this.g1.visible = (this.moveTimes%2 ==1);
			this.g2.visible = (this.moveTimes%2 ==0);


			egret.setTimeout(()=>{
				this.setDrisArrSelected(this.selectId);
				this.rotate();
			},this,time);

			this.moveTimes--;
		}
		else
		{
			console.log("抽奖结束");
			this.tweenGDraw.pause();
			this.tweenGDraw = null;
			if( WndManager.root.main.dataManager.DrawData.RewardArr[this.winId]>0){

			var str:string = "恭喜获得"+ WndManager.root.main.dataManager.DrawData.RewardArr[this.winId]+ "钻";
			WndManager.root.notifyWnd.show(str,0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			}
			else{
			WndManager.root.notifyWnd.show("长得这么帅下次肯定会中哦！",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			}

			this.resetData();
			this.rectDraw.touchEnabled = true;	
			this.setBottomClicked(true);
		}

	}

	private getMoveTimes(value:number):number
	{
		return 100 + value;
	}

	private setBottomClicked(value:boolean):void
	{
		var event = new egret.Event("bottomClickStatus",true,false,value);
		this.dispatchEvent(event);
	}
}