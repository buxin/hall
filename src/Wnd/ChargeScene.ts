class ChargeScene extends WinBase{

	private scroller: eui.Scroller;
	private dataList: eui.List;


	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/ChargeWnd.exml";
	}

	private onComplete():void{
		this.init();
    }

	private init():void
	{
		this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;

		this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.ChargeData);
		this.dataList.itemRenderer = ChargeItemRender;

		this.scroller.viewport = this.dataList;
	}
}