/*我的信息 */

class MyInfoScene extends WinBase{


	private scroller: eui.Scroller;
	private dataList: eui.List;

	//private topScene:TopScene;
	private playerInfoScene:PlayerInfoScene;

	private joinScene:JoinScene;

	private feedbackScene:FeedbackScene;

	private feedbackScene1:FeedbackScene1;

	private feedbackScene2:FeedbackScene2;

	private fwutiaokuangScene:FwutiaokuangScene;

	private promotionScene1:PromotionScene1;

	private promotionScene2:PromotionScene2;

	private promotionScene3:PromotionScene3;

	private promotionScene4:PromotionScene4;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/MyInfoWnd.exml";
	}

	private onComplete():void{
		this.init();
		this.initListener();
    }

	private init():void
	{
		this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;

		this.dataList.dataProvider = new eui.ArrayCollection(WndManager.root.main.dataManager.SystemData.MyInfoListData);
		this.dataList.itemRenderer = MyInfoItemRender;

		this.scroller.viewport = this.dataList;

		// this.topScene = new TopScene(GameConstant.TOPSCENE_LAYOUT_MYINFO);
		// this.addChild(this.topScene);
		this.playerInfoScene = new PlayerInfoScene(GameConstant.PLAYER_INFO_SCENE_LAYOUT_MYINFO);
		this.playerInfoScene.y = 30;
		this.addChild(this.playerInfoScene);

		this.joinScene = new JoinScene();
		this.joinScene.visible = false;
		this.addChild(this.joinScene);

		this.feedbackScene = new FeedbackScene(this);
		this.feedbackScene.visible = false;
		this.addChild(this.feedbackScene);

		this.feedbackScene1 = new FeedbackScene1(this);
		this.feedbackScene1.visible = false;
		this.addChild(this.feedbackScene1);

		this.feedbackScene2 = new FeedbackScene2(this);
		this.feedbackScene2.visible = false;
		this.addChild(this.feedbackScene2);

		this.fwutiaokuangScene = new FwutiaokuangScene();
		this.fwutiaokuangScene.visible = false;
		this.addChild(this.fwutiaokuangScene);

		this.promotionScene1 = new PromotionScene1(this);
		this.promotionScene1.visible = false;
		this.addChild(this.promotionScene1);

		this.promotionScene2 = new PromotionScene2();
		this.promotionScene2.visible = false;
		this.addChild(this.promotionScene2);

		this.promotionScene3 = new PromotionScene3();
		this.promotionScene3.visible = false;
		this.addChild(this.promotionScene3);

		this.promotionScene4 = new PromotionScene4();
		this.promotionScene4.visible = false;
		this.addChild(this.promotionScene4);
	}

	private initListener():void
	{
		this.addEventListener("myInfoItemClick",this.HandleOpenSubSceneClick,this);
	}

	protected release():void
	{
		this.removeEventListener("myInfoItemClick",this.HandleOpenSubSceneClick,this);
	}

	private HandleOpenSubSceneClick(e:egret.Event):void
	{
		var itemId:number = Number(e.data);

		this.showSubScene(itemId);
	}

	public showSubScene(itemId:number):void
	{
		switch(itemId)
		{
			case 0:
				this.feedbackScene.setVisible(true);
				break;
			case 1:
				this.fwutiaokuangScene.visible = true;
				break;
			case 2:
				this.joinScene.setVisible(true);
				break;
			case 3:
			    if(WndManager.root.main.dataManager.MyPlayer.promoter == 1)//是推广员
				{
					//显示推广员页面
					this.promotionScene4.setVisible(true);
				}
				else
				{
					WndManager.root.main.protocol.addEventListener("onPromotionInfo",this.onPromotionInfo,this);
					WndManager.root.main.protocol.getMyPromotionApply();
				}
				break;
			case 4://反馈成功
			   	this.feedbackScene1.visible = true;
				break;
			case 5://反馈记录
				{
						WndManager.root.main.protocol.addEventListener("onGetFeedback",this.onGetFeedback,this);
						WndManager.root.main.protocol.getFeedbacks();
				}
				break;
		}
	}

	private onPromotionInfo(e:egret.Event):void
	{
		var ret:string=e.data as string;
		if(MyUtils.checkStringIsNotNulll(ret))
		{
				var jsObj = JSON.parse(ret);
			if (jsObj) {
				var code:number = Number(jsObj.code);

				switch(code)
				{
					case -1:
						WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
						return;
					case -2://没有申请，则显示申请页面
						this.promotionScene1.setVisible(true);
						return;
					case 1://之前已经有申请，则显示申请状态页面
						WndManager.root.main.dataManager.MyPlayer.promotion = new Promotion(jsObj);

						WndManager.root.main.dataManager.MyPlayer.promoter = jsObj.playerClient.promoter;
						WndManager.root.main.dataManager.MyPlayer.Gname = jsObj.playerClient.gname;
						WndManager.root.main.dataManager.MyPlayer.income = (Number(jsObj.playerClient.income))/100;
						WndManager.root.main.dataManager.MyPlayer.DiamondNum = jsObj.playerClient.jewel;
						WndManager.root.main.dataManager.MyPlayer.ghtid = jsObj.playerClient.ghtid;
						WndManager.root.main._jssdk.init();
						title(WndManager.root.main.dataManager.MyPlayer.Gname)

						 if(WndManager.root.main.dataManager.MyPlayer.promoter == 1)//是推广员
						{
							//显示推广员页面
							this.promotionScene4.setVisible(true);
						}
						else
						{
							//如果申请被拒绝
							if(WndManager.root.main.dataManager.MyPlayer.promotion.status == GameConstant.PROMOTION_STATUS_REJECT)
								this.promotionScene3.setVisible(true);
							else
								this.promotionScene2.setVisible(true);
						}

						return;
				}

			}
		}
		else{
			WndManager.root.notifyWnd.show("上传失败",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);	
		}
	}	

	public jumpPromotionScene2():void
	{
		this.promotionScene1.setVisible(false);
		this.promotionScene2.setVisible(true);
	}

	private onGetFeedback(e:egret.Event):void
	{
		var ret:string=e.data as string;
		if(MyUtils.checkStringIsNotNulll(ret))
		{
				var jsObj = JSON.parse(ret);
			if (jsObj) {
				var code:number = Number(jsObj.code);

				switch(code)
				{
					case -1:
						WndManager.root.notifyWnd.show("你的游戏身份出错，请重新登陆",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
						return;
					case 1://获得反馈记录
						WndManager.root.main.dataManager.MyPlayer.feedbackArr = jsObj.data;

						this.feedbackScene2.setVisible(true);

						return;
				}

			}
		}
		else{
			WndManager.root.notifyWnd.show("获取反馈失败",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);	
		}
	}

	public updateData():void
	{
		if(null != this.playerInfoScene)
			this.playerInfoScene.updateData();
	}	
}