class GameScene extends WinBase{

	private game1: eui.Image;
	private game2: eui.Image;
	private hideImg2: eui.Image;
	private game3: eui.Image;
	private hideImg3: eui.Image;


	private firstPageScene:FirstPageScene;


	public constructor(firstPageScene:FirstPageScene) {
		super();
		this.firstPageScene = firstPageScene;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/GameWnd.exml";
	}

	private onComplete():void{
		this.init();
    }

	private init():void
	{
	//	this.hideImg2.visible = (WndManager.root.main.dataManager.MyPlayer.roles == 0);
	//	this.hideImg3.visible = (WndManager.root.main.dataManager.MyPlayer.roles == 0);

		this.initListener();
	}

	private initListener():void
	{
		this.game1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleGame1Click,this);
		this.game2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleGame2Click,this);
		this.game3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleGame3Click,this);
	}

	//进入麻将游戏
	private handleGame1Click(e:egret.TouchEvent):void
	{
		this.firstPageScene.selectGame(GameConstant.GAME_TYPE_MAJIANG);
	}

	//进入西周麻将
	private handleGame2Click(e:egret.TouchEvent):void
	{
		this.firstPageScene.selectGame(GameConstant.GAME_TYPE_XIZHOU);
	}

	//进入牛牛
	private handleGame3Click(e:egret.TouchEvent):void
	{
		this.firstPageScene.selectGame(GameConstant.GAME_TYPE_NIUNIU);
	}
	protected release():void
	{
		this.game1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.handleGame1Click,this);
		this.game2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.handleGame2Click,this);
		this.game3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.handleGame3Click,this);
	}
}