class TimeFormat {
	public constructor(time:number) {
		this.getTimeData(time);
	}

	private getTimeData(time:number)
	{
		var date:Date = new Date(time);
		var mon:number = date.getMonth()+1;//月份从0开始
		this.month = (mon<10?"0":"") + mon;
		this.days = date.getDate();
		var h:number = date.getHours();
		this.hours =  (h<10?"0":"") + h;
		var m:number = date.getMinutes();
		this.minutes = (m<10?"0":"") + m;
	}

	private time:number;//时间，单位，毫秒
	private month:string;//月份
	private days:number;//日
	private hours:string;//时
	private minutes:string;//分

	public get Month():string {
       return this.month;
    }

	public get Days():number {
       return this.days;
    }

	public get Hours():string {
       return this.hours;
    }

	public get Minutes():string {
       return this.minutes;
    }

	public isSameDays(tf:TimeFormat):boolean
	{
		if(null != tf && tf.Month == this.Month && tf.Days == this.Days)
			return true;
		else
			return false;
	}
}