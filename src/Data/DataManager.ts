class DataManager {
	public constructor() {
	}

	private myPlayer:MyPlayer = new MyPlayer();//当前玩家数据
	private systemData:SystemData = new SystemData();//系统数据信息
	private myExploit:MyExploit = new MyExploit();//我的战绩
	private drawData:DrawData = new DrawData();//抽奖信息

	private stageWidth:number = 0;//舞台宽度
	private stageHeight:number = 0;//舞台高度

	private screenWidth:number = 640;
	private screenHeight:number = 1036;

	//当前玩家数据
	public get MyPlayer():MyPlayer {
       return this.myPlayer;
    }

	public set MyPlayer(value:MyPlayer)
	{
		this.myPlayer = value;
	}

	//系统数据
	public get SystemData():SystemData {
       return this.systemData;
    }

	public set SystemData(value:SystemData)
	{
		this.systemData = value;
	}

	//我的战绩
	public get MyExploit():MyExploit {
       return this.myExploit;
    }

	public set MyExploit(value:MyExploit)
	{
		this.myExploit = value;
	}

	//抽奖信息
	public get DrawData():DrawData {
       return this.drawData;
    }

	public set DrawData(value:DrawData)
	{
		this.drawData = value;
	}

	//舞台宽度
	public get StageWidth():number {
       return this.stageWidth;
    }

	public set StageWidth(value:number)
	{
		this.stageWidth = value;
	}

	//舞台高度
	public get StageHeight():number {
       return this.stageHeight;
    }

	public set StageHeight(value:number)
	{
		this.stageHeight = value;
	}

	//屏幕高度
	public get ScreenHeight():number {
		// if(this.stageWidth > this.stageHeight)
       	// 	return this.screenWidth;
		// else
		// 	return this.screenHeight;

		return this.screenHeight;
    }

	//屏幕宽度
	public get ScreenWidth():number {
		// if(this.stageWidth > this.stageHeight)
       	// 	return this.screenHeight;
		// else
		// 	return this.screenWidth;

		return this.screenWidth;
    }

}