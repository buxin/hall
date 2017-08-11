/*玩家单轮数据 */

class PlayerRoundData {
	public constructor() {
	}

	private nick:string ="12312";//微信昵称
	private avatar:string ="";//微信头像
	private point:number = 5;//本局得分
	private rank:number = -1;//本局排名

	public get Nick():string {
       return this.nick;
    }

	public set Nick(value:string)
	{
		this.nick = value;
	}

	public get Avatar():string {
       return this.avatar;
    }

	public set Avatar(value:string)
	{
		this.avatar = value;
	}

	public get Point():number {
       return this.point;
    }

	public set Point(value:number)
	{
		this.point = value;
	}

	public get Rank():number {
       return this.rank;
    }

	public set Rank(value:number)
	{
		this.rank = value;
	}

	public toJsonString():any
	{
		return {rank:this.rank,nick:this.nick,avatar:this.avatar,point:this.point};
	}
}