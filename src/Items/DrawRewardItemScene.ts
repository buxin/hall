class DrawRewardItemScene extends eui.Component{

	private gReward: eui.Group;
	private lDiamondNum: eui.Label;
	private gNoReward: eui.Group;
	private rectSelect: eui.Rect;


	private diamondNum:number = 0;

	public constructor(diamondNum:number) {
		super();
		this.diamondNum = diamondNum;
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/items/DrawRewardItem.exml";
	}

	private onComplete():void{
        this.init();
    }

	private init():void
	{
		this.gReward.visible = (this.diamondNum>0);
		this.gNoReward.visible = (this.diamondNum<=0);

		this.lDiamondNum.text = this.diamondNum + "钻";

		this.rectSelect.visible = false;
	}

	public setRectSelectVisible(value:boolean):void
	{
		this.rectSelect.visible = value;
	}
}