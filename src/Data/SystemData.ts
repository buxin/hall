class SystemData {
	public constructor() {
	}

	private inform:string ="抵制不良游戏，拒绝盗版游戏。注意自我保护。谨防受骗上当。适当游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。游戏的目的是休闲娱乐，禁止赌博！";//系统公告

	public broadcastInterval:number = 20000;

	private serverTime:number=0;

	// private chargeData:Array<any> = [{id:1,diamondNum:100,money:1},{id:2,diamondNum:1050,money:10},
	// 							{id:3,diamondNum:5500,money:50},{id:4,diamondNum:13000,money:100},{id:5,diamondNum:120000,money:1000}];
		private chargeData:Array<any> = [];//充值列表

	private myInfoListData:Array<any> = [{id:0,name:"意见反馈",imgSource:"imgFeedBack_png"},{id:1,name:"服务条款",imgSource:"imgTermService_png"},
								{id:2,name:"加盟合作",imgSource:"imgJoin_png"},{id:3,name:"申请推广",imgSource:"imgApplyPromotion_png"}];

	private discoveryData:Array<any> = [];

	private signTodayNum:number = 1093;//今日签到人数

	private signInfo:Array<any> = [{name:"代上帝的眼",diamondNum:200},{name:"聪明的坏蛋",diamondNum:80},
								{name:"代上帝的眼",diamondNum:1500},{name:"天下无伤",diamondNum:100},
								{name:"代上帝的眼",diamondNum:1500},{name:"天下无伤",diamondNum:100},
								{name:"代上帝的眼",diamondNum:1500},{name:"天下无伤",diamondNum:100},
								{name:"逗比",diamondNum:200},{name:"天下无伤",diamondNum:100}];//系统签到记录，取前10条

	private allsignInfo:Array<any> =[]

	public static WEEK_DAYS:Array<string> =["日","一","二","三","四","五","六"];

	public withdrawweekdays: string="";//每周那几天可以提现 0,1,2
	public withdrawstarttime: string="";//提现日开始时间
	public withdrawendtime: string="";//提现日结束时间
	public withdrawminimum:number = 0;//提现最小值
	public maintweekdays: string="";//每周哪几天可以维护
	public maintstarttime: string="";//维护开始时间
	public maintendtime: string="";//维护结束时间
	public commission: string="";//充值抽成百分比
	public gameInfoList: Array<GameInfo> =[];//游戏信息

	public gameSettingArr:Array<GameSetting> = null;//游戏时间设置

	public analyseGameInfo():void
	{
		if(null != this.gameInfoList)
		{
			this.gameSettingArr = new Array<GameSetting>();

			for(var i=0;i<this.gameInfoList.length;i++)
			{
				var gi:GameInfo = this.gameInfoList[i];

				if(null != gi)
				{
					var gs:GameSetting = new GameSetting();
			
					var timeArr:Array<number> = [];
					for(var j=0;j<gi.priceList.length;j++)
					{
						timeArr.push(gi.priceList[j].gamelasttime);
					}
					gs.timeArr = timeArr;
					gs.gameName = gi.name;

					this.gameSettingArr.push(gs);
				}
			}
		}
	}

	//游戏设置
	public getGameSetting(id:number):GameSetting {
		if(null!=this.gameSettingArr && id<this.gameSettingArr.length && id>=0)
      		 return this.gameSettingArr[id];
		else
			 return null;
    }

	
	public getWithdrawWeekDays():string
	{
		var arrStr:Array<string> = this.withdrawweekdays.split(",");
		var ret:string ="";
		for(var i=0;i<arrStr.length;i++)
		{
			var day:number = Number(arrStr[i]);
			if(i!=arrStr.length-1)
			{
				
				ret += SystemData.WEEK_DAYS[day] + ",";
			}
			else
			{
				ret += SystemData.WEEK_DAYS[day];
			}
		}
		return ret;
	}

	public getWithdrawstarttime():string
	{
		return MyUtils.formatTimeStr(this.withdrawstarttime);
	}

	public getWithdrawendtime():string
	{
		return MyUtils.formatTimeStr(this.withdrawendtime);
	}


	public get Inform():string {
       return this.inform;
    }

	public set Inform(value:string)
	{
		this.inform = value;
	}

	public get AllsignInfo():Array<any> {
       return this.allsignInfo
    }

	public set AllsignInfo(value:Array<any>)
	{
		this.allsignInfo = value;
	}

	public get BroadcastInterval():number {
       return this.broadcastInterval;
    }

	public set BroadcastInterval(value:number)
	{
		this.broadcastInterval = value;
	}

	public get ChargeData():Array<any> {
       return this.chargeData;
    }

	public set ChargeData(value:Array<any>)
	{
		this.chargeData = value;
	}

	public get MyInfoListData():Array<any> {
       return this.myInfoListData;
    }

	public set MyInfoListData(value:Array<any>)
	{
		this.myInfoListData = value;
	}

	//发现页面数据
	public get DiscoveryData():Array<any> {

		this.discoveryData = [];

		var signDays:number = WndManager.root.main.dataManager.MyPlayer.SignDays;
		var leftSignDays:number = GameConstant.GAME_SIGN_DURATION - signDays;
		var signDaysStr:string = signDays.toString();
		var leftSignDaysStr:string = leftSignDays.toString();
		this.discoveryData.push({itemId:GameConstant.ITEM_SIGN,imgSource:"imgSign_png",itemName:"签到",itemDesc:"神人16888等你来拿",
			itemNews:[	{ text:"已签", style:{"textColor":0x585858}},
			{ text:signDaysStr, style:{"textColor":0xff9392}},
			{ text:"天,还有", style:{"textColor":0x585858}},
			{ text:leftSignDaysStr, style:{"textColor":0x12bf7f}},
			{ text:"天就抽大奖", style:{"textColor":0x585858}}]});

		var drawWinner:string = WndManager.root.main.dataManager.DrawData.DrawWinner;
		var drawWinNum:number = WndManager.root.main.dataManager.DrawData.DrawWinNum;
		if(drawWinNum>0){
		this.discoveryData.push({itemId:GameConstant.ITEM_DRAW,imgSource:"imgDraw_png",itemName:"抽奖",itemDesc:"海量钻石送不停",
			itemNews:[	{ text:drawWinner, style:{"textColor":0xff9392}},
			{ text:"抽取了", style:{"textColor":0x585858}},
			{ text:drawWinNum, style:{"textColor":0x12bf7f}},
			{ text:"钻", style:{"textColor":0x585858}}
			]
		
	});
		}
		else{
			this.discoveryData.push({itemId:GameConstant.ITEM_DRAW,imgSource:"imgDraw_png",itemName:"抽奖",itemDesc:"海量钻石送不停"
	});
		}
		this.discoveryData.push({itemId:GameConstant.ITEM_EXP_SHARE,imgSource:"imgExpShare_png",itemName:"经验分享",itemDesc:"三人行必有我师,去看看师傅吧！",
			itemNews:[	{ text:"正在研发中...", style:{"textColor":0x585858}}
			]});

       return this.discoveryData;
    }

	public set DiscoveryData(value:Array<any>)
	{
		this.discoveryData = value;
	}

	public get ServerTime():number
	{
		//实际上，应该在打开签到页面的时候，更新一下系统时间
		return  this.serverTime;

	}

	public set ServerTime(value:number)
	{
		//实际上，应该在打开签到页面的时候，更新一下系统时间
		this.serverTime=value;
		
	}
	//今日签到人数
	public get SignTodayNum():number
	{
		return this.signTodayNum;
	}

	public set SignTodayNum(value:number)
	{
		this.signTodayNum = value;
	}

	//签到记录
	public get SignInfo():Array<any> {

		

		var ret:Array<any> = [];
		for(var i=0;i<this.signInfo.length;i++)
		{
			// ret.push({info:WndManager.root.main.protocol.+" 获得"+this.signInfo[i].diamondNum+"钻"});
			ret.push({info:WndManager.root.main.protocol.dataManager.SystemData.signInfo[i].name
				+" 获得"+WndManager.root.main.protocol.dataManager.SystemData.signInfo[i].diamondNum+"钻"});

		}

       return ret;
    }
	private ongetSignNpc(){
		
	}
	public set SignInfo(value:Array<any>)
	{
		this.signInfo = value;
	}
}