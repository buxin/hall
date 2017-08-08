 class EffectsImg extends eui.Component{

	private img:egret.Bitmap;

	private imgWidth:number;

	//摇晃相关变量
	private maxAngle:number;
	private stepAngle:number;
	private shakeTime:number;

	//流星坠落相关变量
	private startX:number;
	

	public constructor(img:egret.Bitmap) {
		super();
		this.img = img;

		if(null != this.img)
			this.addChild(this.img);
			
	}

	//横向遮罩显示
	public continueShowHorizontal(color:number,alpha:number,maskX:number,maskY:number,maskWidth:number,
	maskHeight:number,rot:number,targetScaleX:number,moveTime:number):void
	{
		
			var maskRect:egret.Shape = new egret.Shape();
			maskRect.graphics.beginFill(color,this.alpha);
			maskRect.graphics.drawRect(maskX,maskY,maskWidth,maskHeight);
			maskRect.graphics.endFill();
			maskRect.rotation = rot;
			this.addChild(maskRect);

			this.img.mask = maskRect;
			
			egret.Tween.get(maskRect).to({scaleX:targetScaleX},moveTime);
	}

	//竖向遮罩显示
	public continueShowVertical(color:number,alpha:number,maskX:number,maskY:number,maskWidth:number,
	maskHeight:number,rot:number,targetScaleY:number,moveTime:number):void
	{
		
			var maskRect:egret.Shape = new egret.Shape();
			maskRect.graphics.beginFill(color,this.alpha);
			maskRect.graphics.drawRect(maskX,maskY,maskWidth,maskHeight);
			maskRect.graphics.endFill();
			maskRect.rotation = rot;
			this.addChild(maskRect);

			this.img.mask = maskRect;
			
			egret.Tween.get(maskRect).to({scaleY:targetScaleY},moveTime);
	}

	//吊钟摇摆效果
	public tickShaking(maxAngle:number,stepAngle:number,shakeTime:number)
	{
		this.maxAngle = maxAngle;
		this.stepAngle = stepAngle;
		this.shakeTime = shakeTime;
		this.startShaking();
	}

	private startShaking():void
	{
		if(this.maxAngle>=0)
		{		
			egret.Tween.get(this.img).to({rotation:0-this.maxAngle},this.shakeTime).to({rotation:this.maxAngle},this.shakeTime).call(this.startShaking,this);
			this.maxAngle -= this.stepAngle;
		}
	}

	/*
	**流星坠落
	*/
	public starFalling(startTime:number,flyWidth:number,imgWidth,imgHeight,targetX:number,targetY):void
	{
		this.imgWidth = imgWidth;
		this.startX = this.x + imgWidth;
		this.scaleX = 0;
		this.scaleY = 0;
		this.visible = true;
	
		// var targetX:number = this.x-flyWidth;
		// var targetY:number = this.y + flyWidth*(imgHeight/imgWidth);
		egret.Tween.get(this,{onChange:this.onTweenMoveChange,onChangeObj:this}).wait(startTime).to({scaleX:1,scaleY:1},800);
		egret.Tween.get(this).wait(startTime+800).to({x:targetX,y:targetY,alpha:0},800);
	}

	private onTweenMoveChange():void
	{
		this.x = this.startX-this.imgWidth*this.scaleX;
	}

}