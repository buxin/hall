var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataManager = (function () {
    function DataManager() {
        this.myPlayer = new MyPlayer(); //当前玩家数据
        this.systemData = new SystemData(); //系统数据信息
        this.myExploit = new MyExploit(); //我的战绩
        this.drawData = new DrawData(); //抽奖信息
        this.stageWidth = 0; //舞台宽度
        this.stageHeight = 0; //舞台高度
        this.screenWidth = 640;
        this.screenHeight = 1036;
    }
    Object.defineProperty(DataManager.prototype, "MyPlayer", {
        //当前玩家数据
        get: function () {
            return this.myPlayer;
        },
        set: function (value) {
            this.myPlayer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "SystemData", {
        //系统数据
        get: function () {
            return this.systemData;
        },
        set: function (value) {
            this.systemData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "MyExploit", {
        //我的战绩
        get: function () {
            return this.myExploit;
        },
        set: function (value) {
            this.myExploit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "DrawData", {
        //抽奖信息
        get: function () {
            return this.drawData;
        },
        set: function (value) {
            this.drawData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "StageWidth", {
        //舞台宽度
        get: function () {
            return this.stageWidth;
        },
        set: function (value) {
            this.stageWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "StageHeight", {
        //舞台高度
        get: function () {
            return this.stageHeight;
        },
        set: function (value) {
            this.stageHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "ScreenHeight", {
        //屏幕高度
        get: function () {
            // if(this.stageWidth > this.stageHeight)
            // 	return this.screenWidth;
            // else
            // 	return this.screenHeight;
            return this.screenHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "ScreenWidth", {
        //屏幕宽度
        get: function () {
            // if(this.stageWidth > this.stageHeight)
            // 	return this.screenHeight;
            // else
            // 	return this.screenWidth;
            return this.screenWidth;
        },
        enumerable: true,
        configurable: true
    });
    return DataManager;
}());
__reflect(DataManager.prototype, "DataManager");
//# sourceMappingURL=DataManager.js.map