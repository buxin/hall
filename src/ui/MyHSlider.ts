class MyHSlider extends WinBase {

	private rectFront: eui.Rect;
	private rectMask: eui.Rect;
	private myThumb: eui.Image;
	private rectTouch: eui.Rect;

	private stepNum:number = 0;

	private checkPointArr:Array<number> = [];

	private pressThumb:boolean =false;

	private radiusThumb:number = 0;

	public constructor(stepNum:number = 1) {
		super();
		this.stepNum = stepNum;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/MyHSliderWnd.exml";
	}

	private onComplete():void{
		this.init();
		this.initCheckPoints();
    }

	private init():void
	{
		this.rectFront.mask = this.rectMask;
		this.rectMask.scaleX = 0;
		this.initListener();
	}

	private initListener():void
	{
		this.rectTouch.touchEnabled = true;
		this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onControlMe, this);
		this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_END, this.onControlMe, this);
		this.rectTouch.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onControlMe, this);
	} 

	private initCheckPoints():void
	{
		console.log("宽度"+this.rectFront.width+ " x:"+this.rectFront.x);

		this.radiusThumb = this.myThumb.width>>1;

		var stepDuration:number = Math.floor(this.rectFront.width/(this.stepNum-1));

		for(var i=0;i<this.stepNum;i++)
		{
			var checkPointX:number = this.radiusThumb + i*stepDuration;

			this.checkPointArr.push(checkPointX);
		}
	}

	private onControlMe(event: egret.TouchEvent): void { 
	

        if(event.type == egret.TouchEvent.TOUCH_BEGIN) {
			
			if(event.localX > this.myThumb.x && event.localX<this.myThumb.x + this.myThumb.width
			&& event.localY > this.myThumb.y && event.localY<this.myThumb.x + this.myThumb.height)

			//console.log("滑动锁定");
			this.pressThumb = true;

        } else if(event.type == egret.TouchEvent.TOUCH_END) {
			
			//console.log("滑动位置"+event.localX);
			this.updateSliderShow(event.localX);
			this.pressThumb = false;


        } else if(event.type == egret.TouchEvent.TOUCH_MOVE) {

			//console.log("滑动位置"+event.localX);
			this.updateSliderShow(event.localX);
        }
    }

	private updateSliderShow(slideX:number):void
	{
		var checkPointId:number = -1;
		for(var i=this.checkPointArr.length;i>=0;i--)
		{
			if(slideX >= this.checkPointArr[i])
			{
				this.rectMask.scaleX = (this.checkPointArr[i]-this.radiusThumb)/this.rectFront.width;
				this.myThumb.x = this.checkPointArr[i]-this.radiusThumb;
				var event = new egret.Event("updateSlider",true,false,i);
                this.dispatchEvent(event);
				return;
			}
		}
	}

	private releaseListener():void
	{
		this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onControlMe, this);
		this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_END, this.onControlMe, this);
		this.rectTouch.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onControlMe, this);
	}
}