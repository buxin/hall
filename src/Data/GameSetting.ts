/*各种游戏开房设置*/ 

class GameSetting {
	public constructor() {
	}

	public timeArr:Array<number> = [15,30,60];

	private timeId:number = 0;
	private type:number = GameConstant.GAME_SUBTYPE1;

	public gameName:string = "";

	public get TimeId():number {
       return this.timeId;
    }

	public set TimeId(value:number)
	{
		if(value >=0 && value< this.timeArr.length)
			this.timeId = value;
	}

	public get Type():number {
       return this.type;
    }

	public set Type(value:number)
	{
		this.type = value;
	}

	public setType()
	{
		if(this.type == GameConstant.GAME_SUBTYPE1)
			this.type = GameConstant.GAME_SUBTYPE2;
		else
			this.type = GameConstant.GAME_SUBTYPE1;
	}
}