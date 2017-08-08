class Emitter extends egret.Sprite{

	public allParticlesZones:Array<number> =[1,2,3,4,5,6];


	private timer:egret.Timer;

	private particlesNumSameTime:number;

	private particlesArr:{[id:string]:Particle;} = {};

	private idManager:IdManager = new IdManager();

	private emitTimes:number = 0;

	private repeatCount:number = 0;

	private isPass:boolean = false;

	private delay:number;

	private root:WinBase;

	private maxSpeedY:number;

	private minSpeedY:number;

	public constructor(delay:number,repeatCount:number,particlesNumSameTime:number,maxSpeedY:number,minSpeedY:number,root:WinBase) {
		super();

		if(particlesNumSameTime<=0) return;

		this.particlesNumSameTime = particlesNumSameTime;
		this.maxSpeedY = maxSpeedY;
		this.minSpeedY = minSpeedY;
		this.repeatCount = repeatCount;
		this.delay = delay;
		this.root = root;

		this.initTimer(this.repeatCount);

	}

	public initTimer(repeat:number):void
	{
		  //创建一个计时器对象
		this.repeatCount = repeat;
		this.timer = null;
        this.timer = new egret.Timer(this.delay,repeat);
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        //开始计时
        this.timer.start();

	}


  	private timerFunc()
    {	
		this.checkTouchBottom();

		this.moveParticles();	

		if(this.timer.currentCount%2 == 0)
			this.createParticles();
    }


    public timerComFunc()
    {
		if(this.timer != null)
		{
			this.timer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
			this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);

			this.timer.stop();
			this.timer = null;
		}

		this.clean();
    }



	private createParticles():void
	{
		var i=0;

		var born_zone_width = Math.floor(MainScene.screen_width/this.particlesNumSameTime);

		for(i=0;i<this.particlesNumSameTime;i++)
		{
		//random
	
			var imgSequence:number = Math.floor(Math.random()*this.allParticlesZones.length);
			var imgNo = this.allParticlesZones[imgSequence];
			var id = this.idManager.getNewId();
			var ran:number = Math.random();
			if(ran <0.5)
				ran = 0.5;
			var scale:number = ran;
			var angle:number = 90*Math.floor(Math.random()*4);

			var indexMod:number = this.emitTimes%2;

			

			var startX:number = i*born_zone_width + Math.floor(Math.random()*born_zone_width);//横向平均分布

			var speedY:number = this.minSpeedY + Math.floor(Math.random()*(this.maxSpeedY - this.minSpeedY));

			var par:Particle = new Particle(imgNo,id,startX,scale,angle,speedY);
			this.particlesArr[id] = par;

			this.root.addChild(par);
		}
		this.emitTimes++;
	}

	private moveParticles():void
	{
		var twMove:egret.Tween;
		for(var id in this.particlesArr){
			  twMove = egret.Tween.get(this.particlesArr[id]);
			  var targetY:number = this.particlesArr[id].y + this.particlesArr[id].getSpeedY();
        	  twMove.to({y:(targetY)},1000);
		}
	}

	private clean():void
	{
		for(var id in this.particlesArr){
			this.root.removeChild(this.particlesArr[id]);
			delete this.particlesArr[id];
		}
	}

	//检查触底
	private checkTouchBottom():void
	{
		for(var id in this.particlesArr){
			if(this.particlesArr[id].y >= MainScene.screen_height)
			{	
				this.removeParById(id);
			}
		}
	}

	private removeParById(id:string):void
	{
		if(null != this.particlesArr[id] && null!=this.particlesArr[id].parent)
		{
			console.log("id:"+ id);
			this.particlesArr[id].clean();
			this.root.removeChild(this.particlesArr[id]);
			this.particlesArr[id] = null;
			delete this.particlesArr[id];
		}
	}
}