/*抽奖数据 */

class DrawData {
	public constructor() {
	}

	private drawPrice:number =10;//单次抽奖花费钻石

	private rewardArr:Array<number> = [30,5,16888,0,15,3,10,100,0,1];//所有奖励

	// private drawInfo:Array<any> = [{nick:"代上帝的眼",jewel:200},{nick:"聪明的坏蛋",jewel:80},
	// 							{nick:"代上帝的眼",jewel:1500},{nick:"天下无伤",jewel:100},
	// 							{nick:"逗比",jewel:200},{nick:"天下无伤",jewel:100}];//抽奖记录

	private drawInfo:Array<any> = [];//抽奖记录

	private result:number=0;


	public get Idx():number {
       	if(this.drawInfo.length>0)
			return Number(this.drawInfo[0].idx);
		else
			return -1;
    }

	//最新中奖者
	public get DrawWinner():string 
	{
		if(this.drawInfo.length>0)
			return this.drawInfo[0].nick as string;
		else
			return "";
	}

	//最新中奖金额
	public get DrawWinNum():number
	{
		if(this.drawInfo.length>0)
			return Number(this.drawInfo[0].jewel);
		else
			return 0;
	}
//抽奖结果
	public get Result():number {
       return this.result;
    }

	public set Result(value:number)
	{
		this.result = value;
	}


	//单次抽奖花费钻石
	public get DrawPrice():number {
       return this.drawPrice;
    }

	public set DrawPrice(value:number)
	{
		this.drawPrice = value;
	}

	//所有奖励
	public get RewardArr():Array<number> {
       return this.rewardArr;
    }

	public set RewardArr(value:Array<number>)
	{
		this.rewardArr = value;
	}

	//抽奖记录
	public getDrawInfo():Array<any> {

		var ret:Array<any> = [];
		for(var i=0;i<this.drawInfo.length;i++)
		{
			var reward:number = Number(this.drawInfo[i].jewel);
			if(reward<=0)
				continue;

			// 	var nickname:string=this.drawInfo[i].nick;
			// if(i==0 &&nickname==WndManager.root.main.dataManager.MyPlayer.Name){
			// 	WndManager.root.main.dataManager.MyPlayer.DiamondNum+=reward;
			// }


			ret.push({name:this.drawInfo[i].nick,
			rewardInfo:[	{ text:"获得", style:{"textColor":0xffffff}},
			{ text:this.drawInfo[i].jewel, style:{"textColor":0xffe303}},
			{ text:"钻", style:{"textColor":0xffffff}}]});
		}

       return ret;
    }
		
		public get DrawInfo():Array<any> {

       return this.drawInfo;
    }

	public set DrawInfo(value:Array<any>)
	{
		this.drawInfo = value;
	}
}