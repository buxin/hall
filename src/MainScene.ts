
	class MainScene extends eui.UILayer{

		public wndmanager: WndManager;

		private soundPlay: Boolean = true;//声音是否播放
		private musicChannel: egret.SoundChannel;//背景音频道
		
		private musicBg;

		private soundChannel: egret.SoundChannel;//音效频道
		private soundScore:egret.Sound;
		private soundBoom:egret.Sound;

		public static screen_width:number = 640;
    	public static screen_height:number = 1036;

		public main:Main;	

		public soundImg:eui.Image;

		private soundTw:egret.Tween;
		private maintscene:MaintScene;


		private this_X:number;
	//	private pageObject: Array<any> = [Page3Scene,Page4Scene];
		private static pageCode:number = 0;
		public wndSlideOpenDelay:boolean = true;

		public notifyWnd:NotityWnd;

		private logoImg:eui.Image;

		private bottomScene:BottomScene;
		private timer: egret.Timer= null;

		public constructor(main:Main) {
			super();
			this.main = main;
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this._int,this);
		}

		private _int(e: egret.Event): void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE,this._int,this);

			//this.main._jssdk.init();

			WndManager.root = this;
        	this.wndmanager = new WndManager;
        	this.addChild(this.wndmanager);

	
			WndManager.root.openWnd(FirstPageScene,false);
	
			// this.shareScene = new ShareScene();
			// this.shareScene.visible = false;
			// this.addChild(this.shareScene);

			this.bottomScene = new BottomScene();
			this.bottomScene.y = 942;
			this.addChild(this.bottomScene);

			this.notifyWnd = new NotityWnd();
			this.addChild(this.notifyWnd);
	
			//  this.musicBg = document.getElementById("bgMusic");
			//  this.initSoundIcon();
		

			this.initLogo();

			this.addListener();	


			if(WndManager.root.main.protocol.defaultPage==1){
				this.openExploitSubScene(null);
			}

			this.requestBc();
						WndManager.root.main.protocol.getSignInfo();

		this.maintscene = new MaintScene();
		this.addChild(this.maintscene);
		this.maintscene.visible = WndManager.root.main.protocol.isMaint;
			

			// this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onControlMe, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_END, this.onControlMe, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onControlMe, this);
    	}

		private requestBc():void
		{
			WndManager.root.main.protocol.addEventListener("Onheartbeat",this.Onheartbeat,this)
			WndManager.root.main.protocol.heartbeat();
			this.timer = new egret.Timer(10000, -1);
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);//启动时间
			this.timer.start();
		}
		private Onheartbeat(){
			if(this.bottomScene.selectId==2){
				var fps:FirstPageScene = WndManager.getWnd(FirstPageScene) as FirstPageScene;
				if(null != fps){
					fps.broadcast(MyUtils.checkStringIsNotNulll(WndManager.root.main.dataManager.SystemData.Inform ));

				}
			}

			//维护
			
				this.maintscene.visible = WndManager.root.main.protocol.isMaint;

		}
		private timerFunc(){
			WndManager.root.main.protocol.heartbeat();
		}
		private initLogo():void
		{
			this.logoImg = new eui.Image(RES.getRes("logo_png"));
			this.logoImg.x = 408;
            this.logoImg.y = 24;
			this.addChild(this.logoImg);
		}

		public initSound():void
		{
			//得分
			this.soundScore = RES.getRes("score_wav");

			//爆炸
			this.soundBoom = RES.getRes("boom_mp3");
		}

		//播放得分
		public playSoundScore():void
		{
			if(this.soundPlay)
			{
				if(null != this.soundChannel)
					this.soundChannel.stop();

				this.soundChannel = this.soundScore.play(0,1);		       
			}
		}

			//播放爆炸
		public playSoundBoom():void
		{
			if(this.soundPlay)
			{
				if(null != this.soundChannel)
					this.soundChannel.stop();

				this.soundChannel = this.soundBoom.play(0,1);		       
			}
		}

		private initSoundIcon():void
		{
			this.soundImg = new eui.Image(RES.getRes("bt3_png"));
            this.soundImg.anchorOffsetX = 62 / 2;
            this.soundImg.anchorOffsetY = 64 / 2;
            this.soundImg.x = 40;
            this.soundImg.y = 42;
            this.soundImg.touchEnabled = true;
            this.soundImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.soundEvent,this);
			 this.soundTw = egret.Tween.get(this.soundImg,{ loop: true }).to({ rotation: 360 },1000); 
			 this.addChild(this.soundImg);
		}

		public onSoundLoadOK(data):void
		{
			this.soundImg = new eui.Image(RES.getRes("bt3_png"));
            this.soundImg.anchorOffsetX = 62 / 2;
            this.soundImg.anchorOffsetY = 64 / 2;
            this.soundImg.x = 40;
            this.soundImg.y = 42;
            this.soundImg.touchEnabled = true;
            this.soundImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.soundEvent,this);
            this.soundTw = egret.Tween.get(this.soundImg,{ loop: true }).to({ rotation: 360 },1000); 
            this.addChild(this.soundImg);

			if(!this.soundPlay)
			{
				if(this.musicChannel)
					this.musicChannel.stop();	 
				this.soundTw.pause();
			}

			this.initMusic(data);
		}

		private addListener():void
		{
			this.addEventListener("backHall",this.backHall,this);
			this.addEventListener("discoveryJump",this.discoveryJump,this);
			this.addEventListener("openChargeScene",this.openChargeScene,this);
			this.addEventListener("openSignScene",this.openSignScene,this);
			this.main.protocol.addEventListener("closeSignScene",this.closeSignScene,this);
			this.addEventListener("openMyInfoSubScene",this.openMyInfoSubScene,this);
			this.addEventListener("backMyInfo",this.openMyInfoScene,this);
			this.addEventListener("gotopay",this.gotopay,this);
			this.main.protocol.addEventListener("onGetChargeAddr",this.onGetChargeAddr,this);

			this.main.protocol.addEventListener("onGetSignInfo",this.onGetSignInfo,this);

			this.addEventListener("bottomClickStatus",this.setBottomClick,this);
	
			// this.addEventListener("onNewRoom",this.onNewRoom,this);
			this.main.protocol.addEventListener("onNewRoom",this.onNewRoom,this);
		}


		private setBottomClick(e:egret.Event):void
		{
			var clicked:boolean = Boolean(e.data);
			this.bottomScene.setClicked(clicked);
		}

		//跳转pay

		public gotopay(){
			
					this.bottomScene.HandleBtnChargeClick(null);

		}
		//开房返回
		public onNewRoom(e:egret.Event):void
		{
			var ret:string = e.data as string
			if(ret == "-2")
			{
				//弹窗，不存在此类型的房间
				WndManager.root.notifyWnd.show("请选择正确的房间",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			}
			else if(ret == "-1")
			{
				//弹窗，钻石不足
				WndManager.root.notifyWnd.show("钻石不足，请充值",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
				
			}
			else if(ret == "-3")
			{
				//弹窗，分配服务器失败
				WndManager.root.notifyWnd.show("访问失败，请重新连接",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
				
			}
			else if(ret == "-4")
			{
				WndManager.root.notifyWnd.show("开房数量不能超过3个哦！",0xff0000,2,0x0000ff,NotityWnd.MOVE_HORIZONTAL,0,80,MainScene.screen_width,80,3000);
			}
			else
			{
				var jsObj = JSON.parse(ret);
                if (jsObj) {

                    var ip:string = jsObj.ip;
					var port:string = jsObj.port;
					var roomKey:string = jsObj.roomkey;
					var path:string = jsObj.path;
					var gameurl:string = jsObj.gameurl;

					if(WndManager.root.main.protocol.dataManager.MyPlayer.ghtid>0){
					window.location.href=gameurl+"?ip="+ip+"&port="+port  +"&path="+path + "&roomkey="+roomKey+"&key="+WndManager.root.main.dataManager.MyPlayer.Key+
					"&ghtid="+WndManager.root.main.protocol.dataManager.MyPlayer.ghtid;// + "&gname="+WndManager.root.main.protocol.dataManager.MyPlayer.Gname;
					// console.log("内容ip"+ip+"&port="+port  +"&path="+path+ "&roomKey="+roomKey+"&key="+WndManager.root.main.dataManager.MyPlayer.Key+
					// "&ghtid="+WndManager.root.main.protocol.dataManager.MyPlayer.ghtid + "&gname="+WndManager.root.main.protocol.dataManager.MyPlayer.EncodeGname)
					}
					else{
					window.location.href=gameurl+"?ip="+ip+"&port="+port  +"&path="+path + "&roomkey="+roomKey+"&key="+WndManager.root.main.dataManager.MyPlayer.Key;
					console.log("内容ip"+ip+"&port="+port  +"&path="+path+ "&roomKey="+roomKey+"&key="+WndManager.root.main.dataManager.MyPlayer.Key)
					}
					//打开江江地址
				//	window.open(WndManager.root.main.protocol.gameurl+"?ip="+ip+"&port="+port  +"&path="+path + "&roomkey="+roomKey+"&key="+WndManager.root.main.dataManager.MyPlayer.Key,"_blank");
					
                }
			}

		}

		//打开我的信息窗口
		public openMyInfoScene(e:egret.Event):void
		{
			this.bottomScene.backMyInfo(e);					
		}


	
		//显示我的战绩
		public openExploitSubScene(e:egret.Event):void
		{
			this.bottomScene.backExploit(e);			
		}

		//打开我的子窗口
		public openMyInfoSubScene(e:egret.Event):void
		{
			var itemId:number = Number(e.data);
			this.bottomScene.backMyInfo(e);
			var mis:MyInfoScene = WndManager.getWnd(MyInfoScene) as MyInfoScene;
			if(null != mis)
				mis.showSubScene(itemId);					
		}

		//充值
		public openChargeScene(e:egret.Event):void
		{
			this.bottomScene.HandleBtnChargeClick(null);
		}

		//打开充值窗口
		public onGetChargeAddr(e:egret.Event):void
		{
			this.bottomScene.showChargePage();
		}

		//返回大厅
		public backHall(e:egret.Event):void
		{
			this.bottomScene.backHall(e);
		}

		//签到
		public openSignScene(e:egret.Event):void
		{
			this.bottomScene.backHall(e);
			var fps:FirstPageScene = WndManager.getWnd(FirstPageScene) as FirstPageScene;
			if(null != fps)
				fps.openSignScene();
		}

			//关闭签到
		public closeSignScene(e:egret.Event):void
		{
			this.bottomScene.backHall(e);
			var fps:FirstPageScene = WndManager.getWnd(FirstPageScene) as FirstPageScene;
			if(null != fps)
				fps.closeSignScene();
		}

				//刷新签到按钮状态
		public onGetSignInfo(e:egret.Event):void
		{
			var fps:FirstPageScene = WndManager.getWnd(FirstPageScene) as FirstPageScene;
			if(null != fps)
				fps.closeSignScene();
		}

		//发现页跳转
		public discoveryJump(e:egret.Event):void
		{
			var itemId:number = Number(e.data);

			switch(itemId)
			{
				case GameConstant.ITEM_SIGN:
					{
							var dcs:DiscoveryScene = WndManager.getWnd(DiscoveryScene) as DiscoveryScene;
							if(null != dcs)
								dcs.openSignDetailScene();
							
							break;
					}

				case GameConstant.ITEM_DRAW:
					{
							var dcs:DiscoveryScene = WndManager.getWnd(DiscoveryScene) as DiscoveryScene;
							if(null != dcs)
								dcs.openDrawScene();
							
							break;
					}
			}			
		
		}

		public openWnd(wndClazz: any,data:any = null)
		{
			WndManager.switchWnd(wndClazz, WIN_OPERATOR.WIN_OPEN_NEW);			
		}

		public closeWnd(wndClazz: any)
		{
			WndManager.switchWnd(wndClazz, WIN_OPERATOR.WIN_CLOSE_DELETE);			
		}

		public openWndAndMove(wndClazz: any,data:any = null)
		{	
			WndManager.switchWnd(wndClazz, WIN_OPERATOR.WIN_OPEN_NEW);
		}

		public closeWndAndMove(wndClazz: any)
		{
			WndManager.switchWnd(wndClazz, WIN_OPERATOR.WIN_CLOSE_DELETE,WIN_EFFECT.EFFECT_WIN_CLOSE_MOVE_UP);				
		}

		private initMusic(data):void
    	{
	//		this.soundHorseRun = RES.getRes("");
			if(null != data)
				this.musicBg = data;
			else
				this.musicBg = RES.getRes("bg_mp3");

			this.playMusic();
    	}


		private soundEvent(e:egret.TouchEvent):void
		{
			this.soundPlay = !this.soundPlay;

			if(this.soundPlay)
			{
				this.soundTw = egret.Tween.get(this.soundImg,{ loop: true }).to({ rotation: 360 },1000); 
				//this.musicChannel = this.musicBg.play(0,0);	
				this.musicBg.play();
			}
			else
			{
				//this.musicChannel.stop();	 
				this.musicBg.pause();
				this.soundTw.pause();
			} 
		}

		private playMusic():void
		{
			if(this.soundPlay)
			{
				this.musicChannel = this.musicBg.play(0,0);		       
			}
		}


		public updateLeftPageCode():void
		{
			// MainScene.pageCode--;
			// if(MainScene.pageCode < 0)
			// 	MainScene.pageCode += this.pageObject.length;
		}

		public updateRightPageCode():void
		{	
			// MainScene.pageCode++;
			// if(MainScene.pageCode >= this.pageObject.length)
			// 	MainScene.pageCode -= this.pageObject.length;
		}


		private onControlMe(event: egret.TouchEvent): void { 
        if(event.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.this_X = event.stageX;
			//egret.log("localY:" + event.localY);
        } else if(event.type == egret.TouchEvent.TOUCH_END) {

        } else if(event.type == egret.TouchEvent.TOUCH_MOVE) {

			// var curWin:WinBase = WndManager.getWnd(this.pageObject[MainScene.pageCode]) as WinBase;
			// if(curWin!=null && this.wndSlideOpenDelay && (curWin instanceof Page3Scene || curWin instanceof Page4Scene))
			// {
			// 	if (event.stageX - this.this_X > (this.stage.width>>2)) { //上一页

			// 		this.this_X = event.stageX;
			
			// 			this.wndSlideOpenDelay = false;
			// 			egret.setTimeout(()=>{
            //               this.wndSlideOpenDelay = true;
			// 			},this,200);
					
			// 			this.closeWnd(this.pageObject[MainScene.pageCode]);
						
			// 			this.updateLeftPageCode();
					
			// 			this.openWnd(this.pageObject[MainScene.pageCode]);
								
			// 	}

			// 	if (this.this_X - event.stageX > (this.stage.width>>2 )) { //下一页
			
			// 		this.this_X = event.stageX;			
				
			// 			this.wndSlideOpenDelay = false;
			// 			egret.setTimeout(()=>{
            //               this.wndSlideOpenDelay = true;
			// 			},this,200);
				
			// 			this.closeWnd(this.pageObject[MainScene.pageCode]);
						
			// 			this.updateRightPageCode();
					
			// 			this.openWnd(this.pageObject[MainScene.pageCode]);
					
			// 	}
			// }
        }

		
    }

	public screenAdapt():void
	{
		var win:WinBase = this.wndmanager.getTopWnd();
		if(null != win)
			win.screenAdapt();
	}

}