class MaintScene extends WinBase{

	private maintBg:eui.Image
	private TimeLable:eui.Label

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/MaintWnd.exml";
	}

	private onComplete():void{
		this.bindElement();
    }

	private bindElement():void
	{
		this.maintBg = this["maintBg"];
		this.TimeLable.text=WndManager.root.main.dataManager.SystemData.maintendtime+"开放，敬请稍候";
		
	}

	
}