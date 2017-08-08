class SelectGameScene extends WinBase{

	private lTIme: eui.Label;
	private lTitle: eui.Label;
	private gSubType: eui.Group;
	private text2: eui.Image;
	private text3: eui.Image;
	private imgSelect0: eui.Image;
	private imgSelect1: eui.Image;
	private checkRect0: eui.Rect;
	private checkRect1: eui.Rect;
	private yesBtn: eui.Image;
	private noBtn: eui.Image;
	private closeRect: eui.Rect;
	private timeSlider: eui.HSlider;


	private cutOffPointArr:Array<number> = [];

	private gameType:number = 0;

	private currentGameSetting:GameSetting;


	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/SelectGame1Wnd.exml";
	}

	private onComplete():void{
		this.initListener();
    }

	private init():void
	{
		this.lTIme.text = this.currentGameSetting.timeArr[this.currentGameSetting.TimeId] + "分钟";

		this.lTitle.text = WndManager.root.main.dataManager.MyPlayer.Name + "-" + this.currentGameSetting.gameName;

		// this.timeSlider = new MyHSlider(3);
		// this.timeSlider.x  = 165;
		// this.timeSlider.y = 426;
		// this.addChild(this.timeSlider);
		this.timeSlider.addEventListener(egret.Event.CHANGE,this.onControlMe,this)
		// this.timeSlider.addEventListener(egret.TouchEvent.ENTER_FRAME,this.onControlMe,this)
				// console.log("宽度"+this.timeSlider.width+" x:"+this.timeSlider.thumb.x);
			this.timeSlider.maximum = 100;
			this.timeSlider.minimum = 0;
		
	}

	private getCutOffPointArr():void
	{
		var len:number = this.currentGameSetting.timeArr.length;
		var average= Math.floor(100/(len-1));
		for(var i=0;i<len;i++)
		{
			var cutOffPoint:number = i*average;
			if(i==len-1)
				cutOffPoint= 100;

			this.cutOffPointArr.push(cutOffPoint);
		}
	}


	private onControlMe(event: egret.Event):void{
				// console.log("宽度"+this.timeSlider.width+" x:"+this.timeSlider.thumb.x);

				for(var i=0;i<this.cutOffPointArr.length;i++)
				{
					if(i<this.cutOffPointArr.length-1)
					{
						if(this.timeSlider.value>=this.cutOffPointArr[i]&& this.timeSlider.value<this.cutOffPointArr[i+1])
							this.currentGameSetting.TimeId=i;
					}
					else
					{
						if(this.timeSlider.value == this.cutOffPointArr[i])
							this.currentGameSetting.TimeId=i;
					}
				}

				// if(this.timeSlider.value>=0&& this.timeSlider.value<50){
				// WndManager.root.main.dataManager.GameSetting1.TimeId=0
					
				// }
				// if(this.timeSlider.value >=50 && this.timeSlider.value<100){
				// WndManager.root.main.dataManager.GameSetting1.TimeId=1
				// }
				// if(this.timeSlider.value ==100){
				// WndManager.root.main.dataManager.GameSetting1.TimeId=2
				// }

		
		this.lTIme.text = this.currentGameSetting.timeArr[this.currentGameSetting.TimeId] + "分钟";

		this.lTitle.text = WndManager.root.main.dataManager.MyPlayer.Name + "-" + this.currentGameSetting.gameName;
	}

	private initListener():void
	{
		this.addEventListener("updateSlider",this.updateSliderShow,this);
		this.checkRect0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleSelect0Click,this);
		this.checkRect1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleSelect1Click,this);

		this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleYesBtnClick,this);
		this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleNoBtnClick,this);
		this.closeRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleCloseBtnClick,this);
	} 

	private updateSliderShow(e:egret.Event):void
	{
		this.currentGameSetting.TimeId = Number(e.data);
		this.lTIme.text = this.currentGameSetting.timeArr[this.currentGameSetting.TimeId] + "分钟";
	}

	public showSelectGameScene(value:boolean,gameType:number):void
	{
		this.visible = value;
		this.gameType = gameType;
		//初始化
		if(value)
		{
			this.currentGameSetting = WndManager.root.main.dataManager.SystemData.getGameSetting(gameType-1);

			if(null != this.currentGameSetting)
			{
				this.getCutOffPointArr();
				this.init();

				//if(this.gameType == GameConstant.GAME_TYPE_MAJIANG || this.gameType == GameConstant.GAME_TYPE_NIUNIU)
				if(this.gameType == GameConstant.GAME_TYPE_MAJIANG)
				{
					this.gSubType.visible = true;
					this.currentGameSetting.Type = GameConstant.GAME_SUBTYPE1;
					this.showSubTypeText();
					this.updateSelectShow();
				}
				else
					this.gSubType.visible = false;
			}		
			// WndManager.root.main.dataManager.GameSetting1.Type = GameConstant.MAJIANG_TYPE1;
			
		}
	}

	public showSubTypeText():void
	{
		this.text2.visible = (this.gameType ==  GameConstant.GAME_TYPE_MAJIANG);
		this.text3.visible = (this.gameType ==  GameConstant.GAME_TYPE_NIUNIU);
	}

	protected release():void
	{
		this.removeEventListener("updateSlider",this.updateSliderShow,this);
		this.checkRect0.touchEnabled = true;
		this.checkRect1.touchEnabled = true;
		this.checkRect0.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.handleSelect0Click,this);
		this.checkRect1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.handleSelect1Click,this);

		this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.handleYesBtnClick,this);
		this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.handleNoBtnClick,this);
		this.closeRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.handleCloseBtnClick,this);
	}

	//选择清12混8
	private handleSelect0Click(e:egret.TouchEvent):void
	{
		if(this.currentGameSetting.Type != GameConstant.GAME_SUBTYPE1)
		{
			this.currentGameSetting.setType();
			this.updateSelectShow();
		}
	}

	//选择清10混8
	private handleSelect1Click(e:egret.TouchEvent):void
	{
		if(this.currentGameSetting.Type != GameConstant.GAME_SUBTYPE2)
		{
			this.currentGameSetting.setType();
			this.updateSelectShow();
		}
	}

	private updateSelectShow():void
	{
		this.imgSelect0.visible = (this.currentGameSetting.Type == GameConstant.GAME_SUBTYPE1);
		this.imgSelect1.visible = (this.currentGameSetting.Type == GameConstant.GAME_SUBTYPE2);
	}

	//确定
	private handleYesBtnClick(e:egret.TouchEvent):void
	{
		if(this.gameType == GameConstant.GAME_TYPE_NIUNIU)//牛牛锁死轮庄
		{
			WndManager.root.main.protocol.newRoom(this.gameType,2,
			this.currentGameSetting.timeArr[this.currentGameSetting.TimeId]);
		}
		else
		{
			WndManager.root.main.protocol.newRoom(this.gameType,this.currentGameSetting.Type,
			this.currentGameSetting.timeArr[this.currentGameSetting.TimeId]);
		}
	}

	//取消
	private handleNoBtnClick(e:egret.TouchEvent):void
	{
		this.setVisible(false);
	}

	//关闭
	private handleCloseBtnClick(e:egret.TouchEvent):void
	{
		this.setVisible(false);
	}

	
}