class DiscoveryScene extends WinBase{

	private scroller: eui.Scroller;
	private dataList: eui.List;

	private drawScene:DrawScene;

	private signDetailScene:SignDetailScene;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/DiscoveryWnd.exml";
	}

	private onComplete():void{
		this.init();
    }

	private init():void
	{
		this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;

		this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.DiscoveryData);
		this.dataList.itemRenderer = DiscoveryItemRender;

		this.scroller.viewport = this.dataList;

		this.drawScene = new DrawScene(this);
		this.drawScene.visible = false;
		this.addChild(this.drawScene);

		this.signDetailScene = new SignDetailScene();
		this.signDetailScene.visible = false;
		this.addChild(this.signDetailScene);
	}

	public openDrawScene():void
	{
		this.drawScene.setVisible(true);
	}

	public openSignDetailScene():void
	{
		this.signDetailScene.setVisible(true);
	}

	public agindis(){
		this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.DiscoveryData);
	}
}