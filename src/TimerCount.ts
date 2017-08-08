class TimerCount extends egret.DisplayObjectContainer
{
    //private time:egret.TextField;
    private timer:egret.Timer;
    private leftTimes:number;
    private showCount:boolean;
    public constructor(delay:number,repeatCount:number,showCount:boolean)
    {
        super();

        this.showCount = showCount

        if(this.showCount)
        {
            // this.time = new egret.TextField();
            // this.time.x = 0;
            // this.time.y = 0;
            // this.addChild(this.time);

           
        }

         this.leftTimes = repeatCount;

        //创建一个计时器对象
        this.timer = new egret.Timer(delay,repeatCount);
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        //开始计时
        this.timer.start();

        
    }
    private timerFunc()
    {
        //console.log("计时");
        if(this.showCount)
        {
            //this.time.text =  this.leftTimes.toString();
           
        }

		this.leftTimes--;
		this.dispatchEvent(new egret.Event("count_update",true,false,this.leftTimes));

    }
    private timerComFunc()
    {
        //console.log("计时结束");
        this.dispatchEvent(new egret.Event("count_finish",true));
     
    }
}