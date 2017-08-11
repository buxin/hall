class MyPlayer {
	public constructor() {
		//    this.openId = (Math.floor(Math.random()*10000)).toString();
		//    this.name ="测试name"+ (Math.floor(Math.random()*10000)).toString();
		this.openId = "o39HWv_i8M2U94Fv2PusU3NYmImwvd1nvvv"
		   this.name ="test124";
	}

	private name:string ="";//微信昵称
	private avatar:string ="";//微信头像
	private sex:number = 1;
	private key:string = "";//代替openid,存在服务器 session里
	private diamondNum:number = 900000;//钻石数量
	private openId:string = "";//openId
	private signToday:boolean = false;//今日签到
	private signDiamond:number = 100;//今日签到奖励钻石
	private signDays:number = 5;//连续签到日

	//推广员
	public promoter:number;//是否推广员，1是，0否
	public income:number;//收益
	private gname:string ="哪里去棋牌";//我的群名字
	public ghtid:number = 0;//如果有群，则返回群主真实tid,否则返回0
	public qrPath:string = "";//二维码路径

	//身份
	public roles:number =0;//玩家角色 0-普通玩家 1-内部测试人员

	//套餐数据
	private packstype1:number = 0;//套餐类型
	private packLeftTime:number =0;//套餐剩余时间
	private updatePackDataTime:number = 0;//更新套餐时间

	//提现记录
	public withdrawArr:Array<any> = [];
	//收入记录
	public incomeArr:Array<any> = [];
	//反馈记录
	public feedbackArr:Array<any> = [];

	//充值
	public appId:string
	private timeStamp:string
	private nonceStr:string
	private prepay_id:string
	private signType:string
	private paySign:string

	//推广申请
	public promotion:Promotion = null;
	
	public get Gname():string 
	{
       return this.gname;
    }

	// public set EncodeGname(value:string)
	// {
	// 	egret.log("链接gname1:"+value);
	// 	var str:string = decodeURIComponent(value);
	// 	egret.log("链接gname2:"+str);
	// 	this.gname = str;
	// }

	public set Gname(value:string)
	{
		this.gname = value;
	}

	// public get EncodeGname()
	// {
	// 	var str:string = encodeURIComponent(this.gname);
	// 	return str;
	// }


//游戏类型
	public get AppId():string 
	{
       return this.appId;
    }

	public set AppId(value:string)
	{
		this.appId = value;
	}
//
	public get TimeStamp():string 
	{
       return this.timeStamp;
    }

	public set TimeStamp(value:string)
	{
		this.timeStamp = value;
	}
	//
		public get NonceStr():string 
	{
       return this.nonceStr;
    }

	public set NonceStr(value:string)
	{
		this.nonceStr = value;
	}
	//
		public get Prepay_id():string 
	{
       return this.prepay_id;
    }

	public set Prepay_id(value:string)
	{
		this.prepay_id = value;
	}

	//
		public get SignType():string 
	{
       return this.signType;
    }

	public set SignType(value:string)
	{
		this.signType = value;
	}


//
		public get PaySign():string 
	{
       return this.paySign;
    }

	public set PaySign(value:string)
	{
		this.paySign = value;
	}



//////////


	public get Name():string {
       return this.name;
    }

	public set Name(value:string)
	{
		this.name = value;
	}


	public get Avatar():string {
		if(MyUtils.checkStringIsNotNulll(this.avatar))
		return this.avatar;
		else
		return "http://www.naliqu.net/hall/resource/icon.jpg";
}

	public set Avatar(value:string)
	{
		this.avatar = value;
	}

	public get Sex():number {
       return this.sex;
    }

	public set Sex(value:number)
	{
		this.sex = value;
	}

	public get Key():string {
       return this.key;
    }

	public set Key(value:string)
	{
		this.key = value;
	}

	public get DiamondNum():number {
       return this.diamondNum;
    }

	public set DiamondNum(value:number)
	{
		this.diamondNum = value;
	}

	public get OpenId():string {
       return this.openId;
    }

	public set OpenId(value:string)
	{
		this.openId = value;
	}

	public get SignToday():boolean {
       return this.signToday;
    }

	public set SignToday(value:boolean)
	{
		this.signToday = value;
	}

	//今日签到奖励钻石
	public get SignDiamond():number {
       return this.signDiamond;
    }

	public set SignDiamond(value:number)
	{
		this.signDiamond = value;
	}

	//连续签到日
	public get SignDays():number {
       return this.signDays;
    }

	public set SignDays(value:number)
	{
		this.signDays = value;
	}

	//获得签到页面日期
	public get DataArr():Array<string>
	{
		var serverTime:number = WndManager.root.main.dataManager.SystemData.ServerTime;
		var todayId:number = this.signDays;
		if(this.signToday)
			todayId = todayId-1;
		var ret:Array<string> = [];
		for(var i=0;i<GameConstant.GAME_SIGN_DURATION;i++)
		{
			if(i == todayId)
				ret.push("今日");
			else
			{
				var time:number = serverTime + (i-todayId)*86400*1000;
				var date:Date = new Date(time);
				var mon:number = date.getMonth() + 1;
				ret.push(mon +"."+date.getDate());
			}	
		}

		return ret;
	}

	//根据提现记录id,获得对应提现记录
	public getWithdrawDataById(id:number):any
	{
		
		if(null != this.withdrawArr && this.withdrawArr.length>0)
		{
			for(var i=0;i<this.withdrawArr.length;i++)
			{

				if(null != this.withdrawArr[i])
				{
					var wid:number = Number(this.withdrawArr[i].id);
					if(wid == id)
						return this.withdrawArr[i];
				}
			}
		}


		return null;
	}

	private setUpdatePackDataTime():void
	{
		this.updatePackDataTime = (new Date()).valueOf();
	}

	public set PackLeftTime(value:number)
	{
		this.packLeftTime = value;
		this.setUpdatePackDataTime();
	}

	public get PackLeftTime():number
	{
		var curMill:number = (new Date()).valueOf();
		return this.packLeftTime - (curMill - this.updatePackDataTime);
	}

	public set Packstype1(value:number)
	{
		this.packstype1 = value;
	}

	public get Packstype1():number
	{
		return this.packstype1;
	}
}