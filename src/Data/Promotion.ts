class Promotion {
	public constructor(jsObj:any) {

		this.id = Number(jsObj.promotion.id);
		this.nick = jsObj.promotion.nick as string;
		this.name = jsObj.promotion.name as string;
		this.contact = jsObj.promotion.contact as string;
		this.gName = jsObj.promotion.gName as string;
		this.wechatNo = jsObj.promotion.wechatNo as string;
		this.sTime = jsObj.promotion.sTime as string;
		this.status = Number(jsObj.promotion.status);
		this.viewresult = Number(jsObj.promotion.viewresult);
		this.denyreason = jsObj.promotion.denyreason as string;
	}

	public id:number;
	public nick:string;
	public name:string;//申请人
	public contact:string;//联系方式
	public gName:string;//群名字
	public wechatNo:string;//微信号
	public sTime:string;//申请时间
	public status:number;//申请状态
	public viewresult:number;//申请人是否查看审核结果
	public denyreason:string;//否决原因
}