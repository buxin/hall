/*某一种游戏的数据记录 */

class GameRecord {
	public constructor() {
		this.construtTestData();
	}

	private construtTestData():void
	{
		// this.mvpNum = Math.floor(Math.random()*200);
		// this.weakNum = Math.floor(Math.random()*50);
		// this.totalRound = Math.floor(200+Math.random()*500);
		// this.winRate = Math.floor(100*(this.mvpNum/this.totalRound));
		// this.totalPoint = Math.floor(Math.random()*300);
	}

	private gameType:number;//游戏类型
	private mvpNum:number;//得到mvp次数
	private weakNum:number;//浪货次数
	private totalRound:number;//总局数
	private winRate:number;//胜率，暂定为得分为正数的一局为胜率
	private totalPoint:number//总积分





	//游戏类型
	public get GameType():number 
	{
       return this.gameType;
    }

	public set GameType(value:number)
	{
		this.gameType = value;
	}

	//得到mvp次数
	public get MvpNum():number 
	{
       return this.mvpNum;
    }

	public set MvpNum(value:number)
	{
		this.mvpNum = value;
	}

	//浪货次数
	public get WeakNum():number 
	{
       return this.weakNum;
    }

	public set WeakNum(value:number)
	{
		this.weakNum = value;
	}

	//总局数
	public get TotalRound():number 
	{
       return this.totalRound;
    }

	public set TotalRound(value:number)
	{
		this.totalRound = value;
	}

	//胜率
	public get WinRate():number 
	{
       return this.winRate;
    }

	public set WinRate(value:number)
	{
		this.winRate = value;
	}

	//总积分
	public get TotalPoint():number 
	{
       return this.totalPoint;
    }

	public set TotalPoint(value:number)
	{
		this.totalPoint = value;
	}

	public toJsonString():any
	{
		return {gameType:this.gameType,mvpNum:this.mvpNum,weakNum:this.weakNum 
			,totalRound:this.totalRound,winRate:this.winRate};
	}
}