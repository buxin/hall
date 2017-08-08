class BroadcastScene extends WinBase{

	private rectPanel: eui.Rect;
	private lSystemInfo: eui.Label;
	private laba: eui.Image;

	private tweenMove:egret.Tween;

	private broadcastTimes:number = 0;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/BroadcastWnd.exml";
	}

	private onComplete():void{

		this.init();
    }

	private init():void
	{
		this.lSystemInfo.multiline = false;
		this.lSystemInfo.wordWrap = false;

	}

	private updateText():void
	{
		this.lSystemInfo.text = WndManager.root.main.dataManager.SystemData.Inform;
		this.lSystemInfo.width=this.lSystemInfo.textWidth+5;
	}

	public broadcast():void
	{
		this.updateText();
		this.broadcastTimes = 0;
		this.playTweenAni();
	}

	private playTweenAni():void
	{
		//根据公告内容有没有，来确定是否要播放，或者停止播放
		if(null != this.lSystemInfo.text && this.lSystemInfo.text!="")
		{
			if(null == this.tweenMove)
			{
				this.tweenMove = egret.Tween.get(this.lSystemInfo,{loop:true});
				this.tweenMove.to({ x:-this.lSystemInfo.width }, WndManager.root.main.dataManager.SystemData.broadcastInterval);
			}
		}
		else
		{
			if(null != this.tweenMove)
			{
				egret.Tween.removeTweens(this.lSystemInfo);
				this.tweenMove = null;
			}
		}
	}
}