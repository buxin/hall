class FirstPageScene extends WinBase{

	private topScene:TopScene;
	private broadcastScene:BroadcastScene;
	private gameScene:GameScene;
	private selectGameScene:SelectGameScene;
	private signScene:SignScene;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/FirstPageWnd.exml";
	}

	private onComplete():void{
		this.init();
    }

	private init():void
	{
		this.initScene();
	}

	private initScene():void
	{
		this.topScene = new TopScene(GameConstant.TOPSCENE_LAYOUT_HALL);
		this.addChild(this.topScene);

	

		this.gameScene = new GameScene(this);
		this.gameScene.y = 88;
		this.addChild(this.gameScene);

		this.selectGameScene = new SelectGameScene();
		this.selectGameScene.visible = false;
		this.addChild(this.selectGameScene);

		this.signScene = new SignScene();
		this.signScene.visible = false;
		this.addChild(this.signScene);

		this.broadcastScene = new BroadcastScene();
		this.broadcastScene.y = 88;
		this.broadcastScene.visible = false;
		this.addChild(this.broadcastScene);
	}

	//打开广播
	public broadcast(value:boolean):void
	{
		this.broadcastScene.visible = value;

		if(value)
		{
			this.gameScene.y = 88 + 35;
			this.broadcastScene.broadcast();
		}
		else
			this.gameScene.y = 88;
	}

	 public screenAdapt():void
	{
		for(var i=0;i<this.numChildren;i++)
		{
			var dis:egret.DisplayObject = this.getChildAt(i);
			if(dis instanceof WinBase)
			{
				var win:WinBase = dis as WinBase;
				if(null != win)
					win.screenAdapt();
			}
		}
	}

	public selectGame(gameId:number):void
	{
		if(gameId>=GameConstant.GAME_TYPE_MAJIANG && gameId<=GameConstant.GAME_TYPE_NIUNIU)
			this.selectGameScene.showSelectGameScene(true,gameId);
		// switch(gameId)
		// {
		// 	case GameConstant.GAME_TYPE_MAJIANG:
		// 		this.selectGameScene.setVisible(true)
		// 		break;
		// 	case GameConstant.GAME_TYPE_NIUNIU:
		// 		break;
		// 	default:
		// 		break;
		// }
	}

	public openSignScene():void
	{
		this.signScene.setVisible(true);
	}


	public closeSignScene():void
	{
		this.signScene.setVisible(false);
		this.topScene.initUI();
	}
}