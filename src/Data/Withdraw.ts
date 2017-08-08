class Withdraw {
	public constructor(obj:any) {
		this.id = Number(obj.id);
		this.cnum = Number(obj.cnum);
		this.bankname = obj.bankname as string;
		this.accoutno = obj.accoutno as string;
		this.status = Number(obj.status);
		this.time1 = obj.time1 as string;
		this.time2 = obj.time2 as string;
		this.time3 = obj.time3 as string;
		this.time4 = obj.time4 as string;
	}

	public id:number;//id,用于排序
	public cnum:number;//提现金额
	public bankname:string;//银行名字
	public accoutno:string;//银行卡号
	public status:number;//提取状态
	public time1:string;//申请提现时间
	public time2:string;//提交银行时间
	public time3:string;//提现成功时间
	public time4:string;//提现失败时间
}