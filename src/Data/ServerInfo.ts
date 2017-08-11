class ServerInfo {
	public constructor() {
	}

	public ip:string ="";
	public port:string ="";
	public roomkey:string = "";
	public gametype:number = 0;

	public gameweb:string = "";

	public analysis(url:string):void
	{
		 if(MyUtils.checkStringIsNotNulll(this.getUrlParamer("gameweb",url)))
		 {
             this.gameweb = decodeURIComponent(MyUtils.getMyParamer("gameweb"));

			 this.ip = this.getUrlParamer("ip",this.gameweb);

			 this.port = this.getUrlParamer("port",this.gameweb);

			 this.roomkey = this.getUrlParamer("roomkey",this.gameweb);
		 }


		 if(MyUtils.checkStringIsNotNulll(this.getUrlParamer("gametype",url)))
		 {
			 this.gametype = this.getUrlParamer("gametype",url);
		 }

	}

	private GetRequest(url:string) {

        var url = document.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if(url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0;i < strs.length;i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

	private getUrlParamer(param,url) {
        var oRequest = new Object();
        oRequest = this.GetRequest(url);
        return oRequest[param];
    }
}