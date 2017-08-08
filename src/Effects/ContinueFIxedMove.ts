class ContinueFIxedMove {

	private img:egret.Bitmap;

	private points:Array<number> = [];

	private timeArr:Array<number> = [];

	private moveTimes:number = 0;

	private visibleEnd:boolean = true;

	public constructor(img:egret.Bitmap,points:Array<number>,timeArr:Array<number>,visilbeEnd:boolean) {
		this.img = img;
		this.points = points;
		this.timeArr = timeArr;
		this.moveTimes = 0;
		this.visibleEnd = visilbeEnd;
	}

	public move():void
	{
		if(null != this.img && null != this.points && this.points.length>0 && null != this.timeArr && this.timeArr.length>0)
		{
			var len:number = this.points.length;
			if(len % 2 == 0)
			{
				this.startMove();
			}
		}
	}

	private startMove():void
	{
		if(this.points.length >= (this.moveTimes*2)+4)
		{
			this.img.x = this.points[this.moveTimes*2 +0];
			this.img.y = this.points[this.moveTimes*2 +1];
			var targetX:number = this.points[this.moveTimes*2 +2];
			var targetY:number = this.points[this.moveTimes*2 + 3];

			egret.Tween.get(this.img).to({x:targetX,y:targetY},this.timeArr[this.moveTimes]).call(this.startMove,this);

			this.moveTimes ++;
		}
		else
		{
			this.img.visible = this.visibleEnd;
		}
	}
}