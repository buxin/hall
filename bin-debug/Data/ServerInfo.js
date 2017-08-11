var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerInfo = (function () {
    function ServerInfo() {
        this.ip = "";
        this.port = "";
        this.roomkey = "";
        this.gametype = 0;
        this.gameweb = "";
    }
    ServerInfo.prototype.analysis = function (url) {
        if (MyUtils.checkStringIsNotNulll(this.getUrlParamer("gameweb", url))) {
            this.gameweb = decodeURIComponent(MyUtils.getMyParamer("gameweb"));
            this.ip = this.getUrlParamer("ip", this.gameweb);
            this.port = this.getUrlParamer("port", this.gameweb);
            this.roomkey = this.getUrlParamer("roomkey", this.gameweb);
        }
        if (MyUtils.checkStringIsNotNulll(this.getUrlParamer("gametype", url))) {
            this.gametype = this.getUrlParamer("gametype", url);
        }
    };
    ServerInfo.prototype.GetRequest = function (url) {
        var url = document.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    ServerInfo.prototype.getUrlParamer = function (param, url) {
        var oRequest = new Object();
        oRequest = this.GetRequest(url);
        return oRequest[param];
    };
    return ServerInfo;
}());
__reflect(ServerInfo.prototype, "ServerInfo");
//# sourceMappingURL=ServerInfo.js.map