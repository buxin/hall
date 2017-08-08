/*单局游戏数据*/

class GameRoundData {
	public constructor() {
		this.construtTestData();
	}

	private construtTestData():void
	{
		// this.roundBeginTime = (new Date()).valueOf();// - (Math.floor(Math.random()*7))*86400;

		// // var date:Date = new Date(this.roundBeginTime);

		// // console.log("日期:"+date.toDateString());
		// // console.log("时间:"+date.toTimeString());

		// // console.log("月:"+date.getMonth());
		// // console.log("日:"+date.getDate());
		// // console.log("时:"+date.getHours());
		// // console.log("分:"+date.getMinutes());



		// this.roomId = 10000 + Math.floor(Math.random()*10000);

		// this.gameStatus = GameConstant.GAME_ROOM_STATUS_FINISHED;

		// this.gameLastTime = 15;

		// var prd1:PlayerRoundData = new PlayerRoundData();
		// prd1.Name = "么么哒的兔";
		// //prd1.Avatar = "";
		// prd1.Point = 5;
		// prd1.Rank = 0;

		// var prd2:PlayerRoundData = new PlayerRoundData();
		// prd2.Name = "皑皑";
		// //prd2.Avatar = "";
		// prd2.Point = 3;
		// prd2.Rank = 1;

		// var prd3:PlayerRoundData = new PlayerRoundData();
		// prd3.Name = "岁月如风";
		// //prd3.Avatar = "";
		// prd3.Point = 2;
		// prd3.Rank = 2;

		// var prd4:PlayerRoundData = new PlayerRoundData();
		// prd4.Name = "夜的黑";
		// //prd4.Avatar = "";
		// prd4.Point = -8;
		// prd4.Rank = 3;
		
		// this.playerRoundDataArr.push(prd1);
		// this.playerRoundDataArr.push(prd2);
		// this.playerRoundDataArr.push(prd3);
		// this.playerRoundDataArr.push(prd4);
	}
	

	private roundBeginTime:number //本局开局时间
	private roomId:number //房间号
	private gameType:number;//游戏类型
	private gameStatus:number;//游戏状态，结束或者正在进行
	private gameLastTime:number;//游戏持续时间,15,20,30,60
	private roomCreater:string ="笑眯眯";//房间创建人昵称
	private createrAvatar:string = "http://www.amo9.com/photos/ysld/20161114/2b95f9f674ea4af0b4204e1e5a164299.jpeg";//房主头像

	private playerRoundDataArr:Array<PlayerRoundData> = [];//本局玩家数据集，默认为按照名次排序，在接受服务器的地方进行排序操作

	public exploit:string;//战绩

	private myPlayerRoundData:PlayerRoundData;//我的本局数据

	private playerRoundDataJsonStr:Array<any> = [];

	
	//本局开局时间
	public get RoundBeginTime():number 
	{
       return this.roundBeginTime;
    }

	public set RoundBeginTime(value:number)
	{
		this.roundBeginTime = value;
	}

	public get RoundBeginTimeStr():string
	{
		var tf:TimeFormat = new TimeFormat(this.roundBeginTime);
		return tf.Month+"-"+tf.Days + " " + tf.Hours+":"+tf.Minutes;
	}

	//房间号
	public get RoomId():number 
	{
       return this.roomId;
    }

	public set RoomId(value:number)
	{
		this.roomId = value;
	}

	//游戏类型
	public get GameType():number 
	{
       return this.gameType;
    }

	public set GameType(value:number)
	{
		this.gameType = value;
	}

	//游戏状态
	public get GameStatus():number 
	{
       return this.gameStatus;
    }

	public set GameStatus(value:number)
	{
		this.gameStatus = value;
	}

	//游戏持续时间
	public get GameLastTime():number 
	{
       return this.gameLastTime;
    }

	public set GameLastTime(value:number)
	{
		this.gameLastTime = value;
	}

	
	//房间创建人昵称
	public get RoomCreater():string 
	{
       return this.roomCreater;
    }

	public set RoomCreater(value:string)
	{
		this.roomCreater = value;
	}

	//房主头像
	public get CreaterAvatar():string 
	{
       return this.createrAvatar;
    }

	public set CreaterAvatar(value:string)
	{
		this.createrAvatar = value;
	}

	//本局玩家数据集
	public get PlayerRoundDataArr():Array<PlayerRoundData> 
	{
       return this.playerRoundDataArr;
    }

	public set PlayerRoundDataArr(value:Array<PlayerRoundData>)
	{
		this.playerRoundDataArr = value;
	}

	//获得本局数据的简要
	public toJsonString():any
	{
		var prd:PlayerRoundData = this.MyPlayerRoundData;

		var timeFormatArr:Array<TimeFormat> = [];

		var tf:TimeFormat = new TimeFormat(this.roundBeginTime);

		var point:number = 0;
		
		if(null != prd)
		{
			point = prd.Point;
		}		

		return {gameType:this.gameType,gameLastTime:this.gameLastTime,roomCreater:this.roomCreater,
		avatar:this.createrAvatar,point:point,gameDate:tf.Month+"-"+tf.Days,gameTime:tf.Hours+":"+tf.Minutes,roomId:this.roomId};
	}

	//本局玩家详细数据
	public get PlayerRoundDataJsonStr():Array<any>
	{
		if(this.playerRoundDataJsonStr.length == 0)
		{
			for(var i=0;i<this.playerRoundDataArr.length;i++)
			{
				if(null != this.playerRoundDataArr[i])
					this.playerRoundDataJsonStr.push(this.playerRoundDataArr[i].toJsonString());
			}
		}

		return this.playerRoundDataJsonStr;
	}

	//我的本局数据
	public get MyPlayerRoundData():PlayerRoundData
	{
       var prd:PlayerRoundData = null;

	   for(var i=0;i<this.playerRoundDataArr.length;i++)
	   {
		   var temp:PlayerRoundData = this.playerRoundDataArr[i];
		   if(null != temp && temp.Nick == WndManager.root.main.dataManager.MyPlayer.Name)
		   {
		   		prd = temp;
				   break;
		   }
	   }

	   return prd;	   
    }

	public get RoundMvpData():PlayerRoundData
	{
		var prd:PlayerRoundData = null;

		var noMvp:boolean = false;

		if(this.playerRoundDataArr.length>0 && null != this.playerRoundDataArr[0])
		{
			prd = this.playerRoundDataArr[0];
			for(var i=1;i<this.playerRoundDataArr.length;i++)
			{
				var temp:PlayerRoundData = this.playerRoundDataArr[i];
				if(null != temp)
				{
					if(temp.Point> prd.Point)
					{
						noMvp = false;
						prd = temp;
					}
					else if(temp.Point == prd.Point)
					{
						noMvp = true;
					}
				}
			}
		}

		if(noMvp)
			return null;
		else
			return prd;
	}

	public get RoundWeakData():PlayerRoundData
	{
		var prd:PlayerRoundData = null;

		var noWeak:boolean = false;

		if(this.playerRoundDataArr.length>0 && null != this.playerRoundDataArr[0])
		{
			prd = this.playerRoundDataArr[0];
			for(var i=1;i<this.playerRoundDataArr.length;i++)
			{
				var temp:PlayerRoundData = this.playerRoundDataArr[i];
				if(null != temp)
				{
					if(temp.Point < prd.Point)
					{
						noWeak = false;
						prd = temp;
					}
					else if(temp.Point == prd.Point)
					{
						noWeak = true;
					}
				}
			}
		}

		if(noWeak)
			return null;
		else
			return prd;
	}
}