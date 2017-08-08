class ShareScene extends WinBase{

	private shareBg:eui.Image

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/ShareWnd.exml";
	}

	private onComplete():void{
		this.bindElement();
    }

	private bindElement():void
	{
		this.shareBg = this["shareBg"];

		 this.shareBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnReturnClick,this);
	}

	private btnReturnClick(e: egret.TouchEvent): void { 
		this.visible = false;
    }
}