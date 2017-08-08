/*推广申请界面 */
class PromotionScene7 extends WinBase{

	private lTime11: eui.Label;
	private lTime12: eui.Label;
	private lTime2: eui.Label;
	private lTime3: eui.Label;
	private lTime4: eui.Label;
	private lCnum: eui.Label;
	private lStatus3: eui.Label;
	private lBankname: eui.Label;
	private lAccountno: eui.Label;
	private imgStatus1: eui.Image;
	private imgStatus2: eui.Image;
	private imgStatus3: eui.Image;
	private rectBack: eui.Rect;

	private withdrawData:any = null;


	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/PromotionWnd7.exml";
	}

	private onComplete():void{
		this.init();
  		this.initListener();
  }

	private init():void
	{
	}
private initListener():void
	{
		this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
	}

	protected release():void
	{
		this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBack,this);
	}
	private HandleBack(){
		this.visible=false
	}
	private initData():void
	{
		if(null != this.withdrawData)
		{
			this.lTime11.text = this.withdrawData.time1 as string;
			this.lTime12.text = this.lTime11.text;
			this.lTime2.text = this.withdrawData.time2 as string;
			this.lTime3.text = this.withdrawData.time3 as string;
			this.lTime4.text = this.withdrawData.time4 as string;
			        var cNub:number=(Number(this.withdrawData.cnum )/100)

			this.lCnum.text =""+cNub ;

			var status:number = Number(this.withdrawData.status);

			this.imgStatus1.visible = MyUtils.checkStringIsNotNulll(this.lTime11.text);
			this.imgStatus2.visible = MyUtils.checkStringIsNotNulll(this.lTime12.text);
			this.imgStatus3.visible = (status == 3 || status == 4);

			if(status == 3)//提现成功
			{
				this.lStatus3.text = "提现成功";
			}
			else if(status == 4)//提现失败
			{
				this.lStatus3.text = "提现失败";
			}


			this.lBankname.text = this.withdrawData.bankname;
			this.lAccountno.text = this.withdrawData.accoutno;
		}
		
	}

	public show(value:boolean,withdrawData:any):void
	{
		this.withdrawData = withdrawData;
		this.visible=value;
        if(value)
		{
			this.initData();
		}
	}
}