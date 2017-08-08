class FwutiaokuangScene extends WinBase{
	
	private rectBack: eui.Rect;
	private lTtitle: eui.Label;
	private lInfo: eui.Label;


	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/FWTKWnd.exml";
	}
	private onComplete():void{
		this.init();
		this.initListener();
    }
	private init():void{
	this.lInfo.lineSpacing = 5;
	this.lInfo.textFlow = [	{ text: "       欢迎使用哪里去游戏平台的服务，请您（以下可称“用户”或“您”）仔细阅读以下条款；如果您未满18周岁，请在法定监护人的陪同下阅读本协议。本协议系您与前宇之间就哪里去游戏平台服务所订立的权利义务规范。如果您对本协议的任何条款表示异议，您可以选择不进入哪里去游戏平台或使用前宇游戏服务；进入哪里去游戏平台或使用前宇游"+"戏服务则意味着您同意遵守本协议全部约定，并完全服从前宇的统一管理。\n\n"+
"一、定义\n"+
"1.1 本协议：指本协议正文、各款游戏的游戏规则及其修订版本。本协议同时还包括文化部依据《网络游戏管理暂行办法》（文化部令第49号）制定的《网络游戏服务格式化协议必备条款》（详见附录）。\n"+
"1.2 前宇游戏：指由前宇负责运营的游戏的统称，包括计算机客户端游戏、网页游戏、移动终端游戏等形式的游戏。\n"+
"1.3 前宇游戏服务：指前宇向您提供的与游戏相关的各项在线运营服务。\n"+
"1.4 游戏厂商：指向哪里去游戏平台提供各款游戏的游戏合作厂商。\n"+
"1.5 游戏规则：指游戏厂商不时发布并修订的关于游戏的用户守则、玩家条例、游戏公告及通知等内容。\n"+
"1.6 您：又称“玩家”或“用户”，指接受前宇游戏服务的自然人。\n"+
"1.7 游戏数据：指您在使用前宇游戏服务过程中产生的并存储于服务器的各种数据信息，包括游戏日志、安全日志等。\n\n"+
"二、游戏账号\n"+
"2.1 您如果需要使用和享受前宇游戏服务，您需要将您享有使用权的前宇账号作为游戏账号，并按照《网络游戏管理暂行规定》及文化部《网络游戏服务格式化协议必备条款》的要求，登陆实名注册系统并进行实名注册。您对该账号的申请、使用等行为应符合前宇不时修订并公布的《前宇用户协议》的规范。\n"+
"2.2 您充分理解并同意：前宇会按照国家相关要求将您的实名注册信息运用于防沉迷系统之中，即前宇可能会根据您的实名注册信息判断您是否年满18周岁，从而决定是否对您的游戏账号予以防沉迷限制。并且，若您未满18周岁，前宇会根据有关规则及您家长的要求对您的帐号进行限制。\n"+
"2.3 您应妥善保管您的游戏账号，您应在知晓您的游戏账号被盗用后第一时间通知前宇。\n"+
"2.4 如果您长期连续未登陆且从未充值（视游戏厂商的规则而定），您在游戏内的游戏数据可能会由于合服等原因被删除，对此前宇不承担任何责任。\n\n"+
"三、前宇游戏服务\n"+
"3.1 在您遵守本协议及相关法律法规的前提下，前宇给予您一项不可转让及非排他性的许可，以使用前宇游戏服务。您使用前宇游戏服务仅可以非商业目的使用，包括：\n"+
"（1） 接收、下载、安装、启动、升级、登陆、显示、运行前宇游戏；\n"+
"（2） 创建游戏角色，设置角色名，查阅游戏规则、用户个人资料、游戏对局结果，开设游戏房间、设置游戏参数，在游戏中购买、使用游戏道具、游戏装备、游戏币等，使用聊天功能、社交分享功能；\n"+
"（3） 使用前宇游戏支持并允许的其他某一项或几项功能。\n"+
"3.2 您充分理解并同意：游戏中的各种虚拟物品（包括但不限于元宝、铜钱、礼金、金币、银两、游戏道具、游戏装备、游戏币等）是前宇游戏服务的一部分，您可以通过付费或依据游戏规则而获得其使用权。您购买、使用游戏道具、游戏装备、游戏币等应遵循本协议、游戏规则的要求。一旦购买完成，您将不得撤销或要求将上述服务回兑成相应的现金或虚拟货币。\n"+
"3.3 您充分理解并同意：前宇不提供用户间交易前宇点券的平台化服务。用户间交易前宇点券构成对本协议的违反，前宇有权在未经通知的情况下，采取相应适当措施，以确保前宇不提供用户间交易前宇点券的平台化服务。\n"+
"3.4 为保障玩家的正当利益，前宇对盗号及盗号相关行为（包括但不限于盗取账号、游戏数据、玩家个人资料、协助盗号者操作及转移游戏道具等）予以严厉打击和处罚。一经查证属实或应有权机关要求，前宇有权视具体情况立即采取封号等处罚措施，情节严重的，前宇保留对涉案玩家追究法律责任的权利。\n"+
"3.5 如果前宇发现或收到他人举报或投诉用户违反本协议约定的，经查证属实，前宇有权不经通知随时对相关内容进行删除，并视行为情节对违规游戏账号处以包括但不限于警告、限制或禁止使用全部或部分功能、封号甚至终止服务的处罚。\n"+
"3.6 您充分理解并同意，因您违反本协议或相关规则的规定，导致或产生第三方主张的任何索赔、要求或损失，您应当独立承担责任；前宇因此遭受损失的，您也应当一并赔偿。\n\n"+
"四、用户行为规范\n"+
"4.1 您充分了解并同意，您必须为自己游戏账号下的一切行为负责，包括您所发表的任何内容以及由此产生的任何后果。您应对前宇游戏中的内容自行加以判断，并承担因使用前宇游戏服务而引起的所有风险，包括因对前宇游戏内容的正确性、完整性或实用性的依赖而产生的风险。前宇无法且不会对因前述风险而导致的任何损失或损害承担责任。\n"+
"4.2 除非法律允许或前宇书面许可，您不得从事下列行为：\n"+
"（1） 通过非前宇开发、授权的第三方软件、插件、外挂、系统，使用前宇游戏及前宇游戏服务，或制作、发布、传播非前宇开发、授权的第三方软件、插件、外挂、系统；\n"+
"（2） 建立有关前宇游戏的镜像站点，或者进行网页（络）快照，或者利用架设服务器等方式，为他人提供与前宇游戏服务完全相同或者类似的服务；\n"+
"（3） 对游戏软件进行反向工程、反向汇编、反向编译或者以其他方式尝试获取软件的源代码；\n"+
"（4） 使用前宇游戏的名称、商标或其它知识产权；\n"+
"（5） 其他未经前宇明示授权的行为。\n"+
"4.3 您在使用前宇游戏服务过程中有如下行为的，前宇将视情节严重程度，依据本协议及相关游戏规则的规定，对您暂时或永久性地做出禁言（关闭聊天功能）、强制离线、封号（暂停游戏帐号）、终止服务等处理措施，情节严重的将移交有关机关给予行政处罚，甚至追究您的刑事责任：\n"+
"（1） 假冒管理员（GM）或其他客户服务人员；\n"+
"（2） 传播非法言论或不当信息，包括使用非法或不当词语、字符等用于角色命名；\n"+
"（3） 对GM或其他玩家进行辱骂、人身攻击等；\n"+
"（4） 不断吵闹、重复发言、不断发布广告、恶意刷屏等；恶意封堵狭窄的路口造成 其他玩家不便，以及恶意连续骚扰他人，影响他人游戏等其他行为；\n"+
"（5） 以任何方式破坏前宇游戏或影响前宇游戏服务的正常进行；\n"+
"（6） 各种非法外挂行为；\n"+
"（7） 利用系统的BUG、漏洞为自己及他人牟利；\n"+
"（8） 盗取他人游戏账号、游戏物品；\n"+
"（9） 私自进行游戏账号交易；\n"+
"（10） 私自进行游戏道具、游戏装备、游戏币等交易；\n"+
"（11） 利用前宇游戏服务进行赌博；\n"+
"（12） 侵犯前宇游戏的知识产权，或者进行其他有损于前宇或第三方合法权益的行为；\n"+
"（13） 其他在行业内被广泛认可的不当行为，无论是否已经被本协议或游戏规则明确列明。\n\n"+
"五、免责声明\n"+
"5.1 前宇游戏可能因游戏软件BUG、版本更新缺陷、第三方病毒攻击或其他任何因素导致您无法登陆游戏账号，或导致您的游戏角色、游戏道具、游戏装备及游戏币等账号数据发生异常。在数据异常的原因未得到查明前，前宇有权暂时冻结该游戏账号；若查明数据异常为非正常游戏行为，游戏厂商将恢复游戏账号数据至异常发生前的原始状态（包括向第三方追回被转移数"+"据），前宇对此免责。\n"+
"5.2 前宇未授权您从任何第三方（包括其他用户）通过购买、接受赠与或者其他的方式获得游戏账号、游戏道具、游戏装备、游戏币等，前宇不对第三方交易的行为负责，并且不受理因任何第三方交易发生纠纷而带来的申诉。\n"+
"5.3 您充分理解到：前宇游戏中可能会设置强制对战区域或玩法，如果您不同意强制对战，请您不要进入该游戏或游戏区域；您的进入，将被视为同意该玩法并接受相应后果。\n"+
"5.4 由于互联网服务的特殊性，前宇游戏有权根据法律法规的规定及相关主管部门的要求、与合作方的合作情况、第三方权利人的投诉举报、以及前宇游戏业务发展情况，随时变更、中断或终止本服务的部分或全部内容。服务终止后，您游戏中的各种虚拟物品（包括但不限于元宝、铜钱、礼金、金币、银两、游戏道具、游戏装备、游戏币等）将不予退还。\n\n"+
"六、知识产权\n"+
"6.1 前宇是哪里去游戏平台的知识产权权利人。相关的著作权、商标权、专利权、商业秘密等知识产权，以及其他信息内容（包括文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受中华人民共和国法律和相应国际条约保护，前宇享有上述知识产权，但相关权利人依照法律规定应享有的权利除外。\n"+
"6.2 您在使用前宇游戏服务中产生的游戏数据的所有权和知识产权归前宇所有，前宇有权处置该游戏数据。\n"+
"6.3 前宇游戏可能涉及第三方知识产权，而该等第三方对您基于本协议在前宇游戏中使用该等知识产权有要求的，您应当一并遵守。\n\n"+
"七、用户信息收集、使用及保护\n"+
"7.1 您同意并授权前宇为履行本协议之目的收集您的用户信息，这些信息包括您在实名注册系统中注册的信息、您游戏账号下的游戏数据以及其他您在使用前宇游戏服务的过程中向前宇提供或前宇基于安全、用户体验优化等考虑而需收集的信息，前宇对您的用户信息的收集将遵循相关法律的规定。\n"+
"7.2 您充分理解并同意：为更好地向您提供前宇游戏服务，前宇可以将您的用户信息提交给关联公司，且前宇有权自行或通过第三方对您的用户信息进行整理、统计、分析及利用。\n"+
"7.3 您充分理解并同意：前宇可以根据您的用户信息，通过短信、电话、邮件等各种方式向您提供关于前宇游戏的活动信息、推广信息等各类信息。\n"+
"7.4 前宇保证不对外公开或向任何第三方提供您的个人信息，但是存在下列情形之一的除外：\n"+
"（1） 公开或提供相关信息之前获得您许可的；\n"+
"（2） 根据法律或政策的规定而公开或提供的；\n"+
"（3） 只有公开或提供您的个人信息，才能向您提供您需要的前宇游戏服务的；\n"+
"（4） 根据国家权力机关要求公开或提供的；\n"+
"（5） 根据本协议其他条款约定而公开或提供的。\n\n"+
"八、管辖与法律适用\n"+
"8.1 本协议签订地为中华人民共和国北京市海淀区。\n"+
"8.2 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律。\n"+
"8.3 若您和前宇之间因本协议发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交至前宇所在地有管辖权的人民法院管辖。\n\n"+
"九、协议的变更和生效\n"+
"9.1 前宇有权根据需要不时修订本协议条款。上述内容一经正式公布即生效。您可以在前宇游戏的相关页面查阅最新版本的协议条款。\n"+
"9.2 本协议条款变更后，如果您继续使用前宇游戏服务，即视为您已接受变更后的协议。如果您不接受变更后的协议，应当立即停止使用前宇游戏服务。\n\n\n"+
"附录：《网络游戏服务格式化协议必备条款》\n\n"+
"1.账号注册\n"+
"1.1 乙方承诺以其真实身份注册成为甲方的用户，并保证所提供的个人身份资料信息真实、完整、有效，依据法律规定和必备条款约定对所提供的信息承担相应的法律责任。 1.2 乙方以其真实身份注册成为甲方用户后，需要修改所提供的个人身份资料信息的，甲方应当及时、有效地为其提供该项服务\n\n"+
"2.用户账号使用与保管\n"+
"2.1 根据必备条款的约定，甲方有权审查乙方注册所提供的身份信息是否真实、有效，并应积极地采取技术与管理等合理措施保障用户账号的安全、有效；乙方有义务妥善保管其账号及密码，并正确、安全地使用其账号及密码。任何一方未尽上述义务导致账号密码遗失、账号被盗等情形而给乙方和他人的民事权利造成损害的，应当承担由此产生的法律责任。\n"+
"2.2乙方对登陆后所持账号产生的行为依法享有权利和承担责任。\n"+
"2.3 乙方发现其账号或密码被他人非法使用或有使用异常的情况的，应及时根据甲方公布的处理方式通知甲方，并有权通知甲方采取措施暂停该账号的登陆和使用\n"+
"2.4 甲方根据乙方的通知采取措施暂停乙方账号的登陆和使用的，甲方应当要求乙方提供并核实与其注册身份信息相一致的个人有效身份信息。\n"+
"2.4.1 甲方核实乙方所提供的个人有效身份信息与所注册的身份信息相一致的，应当及时采取措施暂停乙方账号的登陆和使用。\n"+
"2.4.2 甲方违反2.4.1款项的约定，未及时采取措施暂停乙方账号的登陆和使用，因此而给乙方造成损失的，应当承担其相应的法律责任。\n"+
"2.4.3 乙方没有提供其个人有效身份证件或者乙方提供的个人有效身份证件与所注册的身份信息不一致的，甲方有权拒绝乙方上述请求。\n"+
"2.5 乙方为了维护其合法权益，向甲方提供与所注册的身份信息相一致的个人有效身份信息时，甲方应当为乙方提供账号注册人证明、原始注册信息等必要的协助和支持，并根据需要向有关行政机关和司法机关提供相关证据信息资料。\n\n"+
"3.服务的中止与终止\n"+
"3.1乙方有发布违法信息、严重违背社会公德、以及其他违反法律禁止性规定的行为，甲方应当立即终止对乙方提供服务。\n"+
"3.2乙方在接受甲方服务时实施不正当行为的，甲方有权终止对乙方提供服务。该不正当行为的具体情形应当在本协议中有明确约定或属于甲方事先明确告知的应被终止服务的禁止性行为，否则，甲方不得终止对乙方提供服务。\n"+
"3.3乙方提供虚假注册身份信息，或实施违反本协议的行为，甲方有权中止对乙方提供全部或部分服务；甲方采取中止措施应当通知乙方并告知中止期间，中止期间应该是合理的，中止期间届满甲方应当及时恢复对乙方的服务。\n"+
"3.4 甲方根据本条约定中止或终止对乙方提供部分或全部服务的，甲方应负举证责任。\n\n"+
"4.用户信息保护\n"+
"4.1 甲方要求乙方提供与其个人身份有关的信息资料时，应当事先以明确而易见的方式向乙方公开其隐私权保护政策和个人信息利用政策，并采取必要措施保护乙方的个人信息资料的安全。\n"+
"4.2未经乙方许可甲方不得向任何第三方提供、公开或共享乙方注册资料中的姓名、个人有效身份证件号码、联系方式、家庭住址等个人身份信息，但下列情况除外：\n"+
"4.2.1 乙方或乙方监护人授权甲方披露的；\n"+
"4.2.2 有关法律要求甲方披露的；\n"+
"4.2.3 司法机关或行政机关基于法定程序要求甲方提供的；\n"+
"4.2.4 甲方为了维护自己合法权益而向乙方提起诉讼或者仲裁时；\n"+
"4.2.5 应乙方监护人的合法要求而提供乙方个人身份信息时。", style:{"textColor":0x0,"size":22}}];


	}

	private initListener():void
	{
		this.rectBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBackClick,this);
	}

	//返回
	private HandleBackClick(e:egret.TouchEvent):void
	{
		this.visible = false;
	}

	protected release():void
	{
		this.rectBack.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.HandleBackClick,this);
	}
}