
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/res/res.js",
	"libs/modules/game/game.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libsrc/bin/weixinapi/weixinapi.js",
	"bin-debug/ui/WinBase.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/Data/DrawData.js",
	"bin-debug/Data/GameConstant.js",
	"bin-debug/Data/GameInfo.js",
	"bin-debug/Data/GamePrice.js",
	"bin-debug/Data/GameRecord.js",
	"bin-debug/Data/GameRoundData.js",
	"bin-debug/Data/GameSetting.js",
	"bin-debug/Data/MyExploit.js",
	"bin-debug/Data/MyPlayer.js",
	"bin-debug/Data/PlayerRoundData.js",
	"bin-debug/Data/Promotion.js",
	"bin-debug/Data/SystemData.js",
	"bin-debug/Data/TimeFormat.js",
	"bin-debug/Data/Withdraw.js",
	"bin-debug/DataJsonParser.js",
	"bin-debug/decorate/Emitter.js",
	"bin-debug/decorate/IdManager.js",
	"bin-debug/decorate/Particle.js",
	"bin-debug/Effects/ContinueFIxedMove.js",
	"bin-debug/Effects/EffectsImg.js",
	"bin-debug/Items/ChargeItemRender.js",
	"bin-debug/Items/DiscoveryItemRender.js",
	"bin-debug/Items/DrawInfoItemRender.js",
	"bin-debug/Items/DrawRewardItemScene.js",
	"bin-debug/Items/FeedbackItemRender.js",
	"bin-debug/Items/IncomeItemRender.js",
	"bin-debug/Items/MyInfoItemRender.js",
	"bin-debug/Items/SignInfoItemRender.js",
	"bin-debug/Items/SKGExploitItemRender.js",
	"bin-debug/Items/SRExploitItemRender.js",
	"bin-debug/Items/SRPlayerExploitItemRender.js",
	"bin-debug/Items/WithdrawItemRender.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/MainScene.js",
	"bin-debug/MyUtils.js",
	"bin-debug/NotityWnd.js",
	"bin-debug/Protocol.js",
	"bin-debug/Data/DataManager.js",
	"bin-debug/TimerCount.js",
	"bin-debug/ui/JSSDK.js",
	"bin-debug/ui/MyHSlider.js",
	"bin-debug/ui/Notify.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/ui/WndManager.js",
	"bin-debug/Wnd/BannerScene.js",
	"bin-debug/Wnd/BottomScene.js",
	"bin-debug/Wnd/BroadcastScene.js",
	"bin-debug/Wnd/ChargeScene.js",
	"bin-debug/Wnd/ChargeWebScene.js",
	"bin-debug/Wnd/DiscoveryScene.js",
	"bin-debug/Wnd/DrawScene.js",
	"bin-debug/Wnd/ExploitScene.js",
	"bin-debug/Wnd/FeedbackScene.js",
	"bin-debug/Wnd/FeedbackScene1.js",
	"bin-debug/Wnd/FeedbackScene2.js",
	"bin-debug/Wnd/FirstPageScene.js",
	"bin-debug/Wnd/FwutiaokuangScene.js",
	"bin-debug/Wnd/GameScene.js",
	"bin-debug/Wnd/JoinScene.js",
	"bin-debug/Wnd/MaintScene.js",
	"bin-debug/Wnd/MyInfoScene.js",
	"bin-debug/Wnd/PromotionScene1.js",
	"bin-debug/Wnd/PromotionScene2.js",
	"bin-debug/Wnd/PromotionScene3.js",
	"bin-debug/Wnd/PromotionScene4.js",
	"bin-debug/Wnd/PromotionScene5.js",
	"bin-debug/Wnd/PromotionScene6.js",
	"bin-debug/Wnd/PromotionScene7.js",
	"bin-debug/Wnd/PromotionScene8.js",
	"bin-debug/Wnd/PromotionScene9.js",
	"bin-debug/Wnd/QrScene.js",
	"bin-debug/Wnd/RoundExploitScene.js",
	"bin-debug/Wnd/SelectGameScene.js",
	"bin-debug/Wnd/ShareScene.js",
	"bin-debug/Wnd/SignDetailScene.js",
	"bin-debug/Wnd/SignScene.js",
	"bin-debug/Wnd/TopScene.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "exactFit",
		contentWidth: 640,
		contentHeight: 1036,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};