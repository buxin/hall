class Particle extends egret.Sprite{
	
	private imgNo:number;
	private id:number;
	private img:eui.Image;
	private startX:number;
	private scale:number;
	private angle:number;
	private speedY:number;

	private collideRect:Array<number> = [];

	public constructor(imgNo:number,id:number,startX:number,scale:number,angle:number,speedY:number) {
		super();

		this.imgNo = imgNo;
		this.id = id;
		this.startX = startX;
		this.scale = scale;
		this.angle = angle;
		this.speedY = speedY;

		this.initImg();
	}

	private initImg()
	{
		this.img = new eui.Image(RES.getRes("star"+this.imgNo+"_png"));
		this.img.scaleX = this.scale;
		this.img.scaleY = this.scale;
		this.img.rotation = this.angle;
		this.addChild(this.img);
		this.x = this.startX;
		this.y = 50;
	
	}

	public getSpeedY():number
	{
		return this.speedY;
	}

	public clean():void
	{
		if(null != this.img.parent)
			this.removeChild(this.img);
		
		this.img = null;
	}
}