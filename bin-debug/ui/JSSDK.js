var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JSSDK = (function (_super) {
    __extends(JSSDK, _super);
    function JSSDK(protocol, main) {
        var _this = _super.call(this) || this;
        _this.CLASS_NAME = "JSSDK";
        _this.playMusic = false;
        _this.protocol = protocol;
        _this.main = main;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    JSSDK.prototype.onAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //初始化
        //this.init();
    };
    Object.defineProperty(JSSDK.prototype, "Title", {
        get: function () {
            return this.title;
        },
        set: function (str) {
            this.title = str;
            this.getSignPackage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JSSDK.prototype, "Desc", {
        get: function () {
            return this.desc;
        },
        set: function (str) {
            this.desc = str;
            this.getSignPackage();
        },
        enumerable: true,
        configurable: true
    });
    JSSDK.prototype.Desc2 = function (str) {
        this.title = str;
        this.getSignPackage();
    };
    //拍照
    JSSDK.prototype.selectImageWX = function (_sourceType) {
        var self = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: _sourceType,
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                //  alert(localIds)
                // alert(localIds[0])
                // this._t._f(localIds,localIds[0]);
                self.uploadImage(localIds[0]);
            }
        });
    };
    //上传照片到微信服务器
    JSSDK.prototype.uploadImage = function (imgIdx) {
        // alert("上传:" + code);
        var self = this;
        wx.uploadImage({
            localId: imgIdx,
            isShowProgressTips: 1,
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                // alert(serverId);
                //   WndManager.prototype.
                //WndManager.root._proto.getImageWX(serverId, "runlife");
            }
        });
    };
    /**
     * 初始化
     **/
    JSSDK.prototype.init = function () {
        //定义皮肤
        //   this.skinName = "skins.jssdk.ShareSkin";
        console.log("jssdkinit");
        //初始化分享内容
        this.title = this.protocol.dataManager.MyPlayer.Gname;
        egret.log("分享title:" + this.title);
        this.desc = this.protocol.dataManager.MyPlayer.Name + "分享了微信打牌神器，邀你一起来浪";
        egret.log("分享desc:" + this.desc);
        if (this.protocol.isOurServer) {
            if (this.protocol.dataManager.MyPlayer.ghtid > 0)
                this.link = "http://www.amo9.com/games/mar/naliqu/hall/oauth2.do?ghtid=" + this.protocol.dataManager.MyPlayer.ghtid;
            else
                this.link = "http://www.amo9.com/games/mar/naliqu/hall/oauth2.do";
        }
        else {
            if (this.protocol.dataManager.MyPlayer.ghtid > 0)
                this.link = "http://www.naliqu.net/hall/oauth2.do?ghtid=" + this.protocol.dataManager.MyPlayer.ghtid;
            else
                this.link = "http://www.naliqu.net/hall/oauth2.do";
        }
        egret.log("分享link:" + this.link);
        this.imgUrl = this.protocol.dataManager.MyPlayer.Avatar;
        egret.log("分享头像:" + this.imgUrl);
        //你的后端数据JSON入口
        //this.url = "你的后端数据入口，自行配置JSON串，后端语言不限，可以参照PHP/NET程序";
        //egret.log(location.href.split("#")[0]);
        if (this.protocol.isOurServer) {
            this.url = "http://www.amo9.com/jssdk/sign.do?url=" + encodeURIComponent(location.href.split("#")[0]);
        }
        else {
            this.url = "http://www.naliqu.net/jssdk/sign.do?url=" + encodeURIComponent(location.href.split("#")[0]);
        }
        //获取签名
        this.getSignPackage();
    };
    /**
     * 获取签名分享
     */
    JSSDK.prototype.getSignPackage = function () {
        var _this = this;
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(this.url);
        urlloader.load(req);
        req.method = egret.URLRequestMethod.GET;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            _this.signPackage = JSON.parse(e.target.data);
            //........................................................
            //基本配置
            _this.getWeiXinConfig();
            var self = _this;
            var funcSucceed = function () {
                //下面可以加更多接口,可自行扩展
                egret.log("接jssdk成功！!!");
                self.getWeiXinShareTimeline(); //分享朋友圈
                self.getWeiXinShareAppMessage(); //分享朋友
                self.getWeiXinShareQQ(); //分享QQ
                self.getWeiXinShareWeiBo(); //分享到腾讯微博
                // if(!this.playMusic)
                // {
                //     this.main.mainScene.onSoundLoadOK(null); 
                //     this.playMusic = true; 
                // }
                // egret.log("play music");
            };
            var funcError = function (res) {
                self.init();
                egret.log("jssdk链接失败!!!");
                //egret.log("失败返回："+res);
            };
            wx.ready(funcSucceed);
            wx.error(funcError);
            // this.getWeixinShowMenuItems(["menuItem:share:timeline"]);//显示菜单项
            // this.getWeixinHideMenuItems();//隐藏菜单项
            //........................................................
        }, this);
    };
    /**
     * 获取微信配置
     */
    JSSDK.prototype.getWeiXinConfig = function () {
        /*
         * 注意：
         * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
         * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
         * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
         *
         * 如有问题请通过以下渠道反馈：
         * 邮箱地址：weixin-open@qq.com
         * 邮件主题：【微信JS-SDK反馈】具体问题
         * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
         */
        //配置参数
        var bodyConfig = {};
        bodyConfig.debug = false; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appId; // 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp; // 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr; // 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature; // 必填，签名，见附录1
        bodyConfig.jsApiList = [
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard' //查看微信卡包中的卡券接口
        ];
        wx.config(bodyConfig);
    };
    /**
     * 获取微信分享到朋友圈
     */
    JSSDK.prototype.getWeiXinShareTimeline = function () {
        // this.btn_sharetimeline.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = this.desc;
        bodyMenuShareTimeline.link = this.link;
        bodyMenuShareTimeline.imgUrl = this.imgUrl;
        bodyMenuShareTimeline.trigger = function () {
            // alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = function () {
            //  alert('已分享');
            //WndManager.root._proto.onShare(1);
            // egret.log("已分享");
            // if(null != WndManager.root)
            //     WndManager.root.showShareScene(false);
        };
        bodyMenuShareTimeline.cancel = function () {
            //  alert('已取消');
        };
        bodyMenuShareTimeline.fail = function (res) {
            //  alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
        // alert('已注册获取“分享到朋友圈”状态事件');
        // }, this);
    };
    /**
     * 获取微信分享到朋友
     */
    JSSDK.prototype.getWeiXinShareAppMessage = function () {
        // this.btn_shareappmessage.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = this.title;
        bodyMenuShareAppMessage.desc = this.desc;
        bodyMenuShareAppMessage.link = this.link;
        bodyMenuShareAppMessage.imgUrl = this.imgUrl;
        bodyMenuShareAppMessage.trigger = function () {
            //   alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = function () {
            // alert('已分享');
            //WndManager.root._proto.onShare(2);
            //    egret.log("已分享");
            //    if(null != WndManager.root)
            //         WndManager.root.showShareScene(false);
        };
        bodyMenuShareAppMessage.cancel = function () {
            // alert('已取消');
        };
        bodyMenuShareAppMessage.fail = function (res) {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        // alert('已注册获取“发送给朋友”状态事件');
        //   }, this);
    };
    /**
     * 获取微信分享到QQ
     */
    JSSDK.prototype.getWeiXinShareQQ = function () {
        // this.btn_shareqq.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
        var bodyMenuShareQQ = new BodyMenuShareQQ();
        bodyMenuShareQQ.title = this.title;
        bodyMenuShareQQ.desc = this.desc;
        bodyMenuShareQQ.link = this.link;
        bodyMenuShareQQ.imgUrl = this.imgUrl;
        bodyMenuShareQQ.trigger = function () {
            //  alert('用户点击分享到QQ');
        };
        bodyMenuShareQQ.complete = function (res) {
            //  alert(JSON.stringify(res));
        };
        bodyMenuShareQQ.success = function () {
            // alert('已分享');
        };
        bodyMenuShareQQ.cancel = function () {
            // alert('已取消');
        };
        bodyMenuShareQQ.fail = function (res) {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareQQ(bodyMenuShareQQ);
        //alert('已注册获取“分享到QQ”状态事件');
        //  }, this);
    };
    /**
     * 获取微信分享到腾讯微博
     */
    JSSDK.prototype.getWeiXinShareWeiBo = function () {
        var bodyMenuShareWeibo = new BodyMenuShareWeibo();
        bodyMenuShareWeibo.title = this.title;
        bodyMenuShareWeibo.desc = this.desc;
        bodyMenuShareWeibo.link = this.link;
        bodyMenuShareWeibo.imgUrl = this.imgUrl;
        bodyMenuShareWeibo.trigger = function () {
            //  alert('用户点击分享到微博');
        };
        bodyMenuShareWeibo.complete = function (res) {
            // alert(JSON.stringify(res));
        };
        bodyMenuShareWeibo.success = function () {
            // alert('已分享');
        };
        bodyMenuShareWeibo.cancel = function () {
            // alert('已取消');
        };
        bodyMenuShareWeibo.fail = function (res) {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareWeibo(bodyMenuShareWeibo);
        //alert('已注册获取“分享到微博”状态事件');
    };
    /**
    * 批量显示菜单项
    */
    JSSDK.prototype.getWeixinShowMenuItems = function (arr_menu) {
        if (arr_menu === void 0) { arr_menu = null; }
        var _arr_menu = [
            //传播类
            "menuItem:share:appMessage",
            "menuItem:share:timeline",
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:favorite",
            "menuItem:share:facebook",
            "menuItem:share:QZone",
            //保护类
            "menuItem:editTag",
            "menuItem:delete",
            "menuItem:copyUrl",
            "menuItem:originPage",
            "menuItem:readMode",
            "menuItem:openWithQQBrowser",
            "menuItem:openWithSafari",
            "menuItem:share:email",
            "menuItem:share:brand" //一些特殊公众号
        ];
        if (arr_menu != null) {
            _arr_menu = arr_menu;
        }
        ;
        wx.showMenuItems({
            menuList: _arr_menu,
            success: function (res) {
                // alert('已显示“分享到朋友圈”等按钮');
            },
            fail: function (res) {
                // alert(JSON.stringify(res));
            }
        });
    };
    /**
    * 批量隐藏菜单项
    */
    JSSDK.prototype.getWeixinHideMenuItems = function (arr_menu) {
        if (arr_menu === void 0) { arr_menu = null; }
        var _arr_menu = [
            //传播类
            "menuItem:share:appMessage",
            "menuItem:share:timeline",
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:favorite",
            "menuItem:share:facebook",
            "menuItem:share:QZone",
            //保护类
            "menuItem:editTag",
            "menuItem:delete",
            "menuItem:copyUrl",
            "menuItem:originPage",
            "menuItem:readMode",
            "menuItem:openWithQQBrowser",
            "menuItem:openWithSafari",
            "menuItem:share:email",
            "menuItem:share:brand" //一些特殊公众号
        ];
        if (arr_menu != null) {
            _arr_menu = arr_menu;
        }
        ;
        //  this.btn_hideMenuItems.addEventListener(egret.TouchEvent.TOUCH_TAP,(e) => { 
        wx.hideMenuItems({
            menuList: _arr_menu,
            success: function (res) {
                //  alert('已隐藏所有传播和保护类按钮');
            },
            fail: function (res) {
                ///  alert(JSON.stringify(res));
            }
        });
        //  },this);
    };
    return JSSDK;
}(egret.DisplayObjectContainer));
__reflect(JSSDK.prototype, "JSSDK");
//# sourceMappingURL=JSSDK.js.map