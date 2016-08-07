var IncFooter = {};

//Search Area
IncFooter.search = { 
	bShowFooterSearch : 'N',
	searchTabNm : '���հ˻�',
	searchActionUrl : 'http://search.11st.co.kr/SearchPrdAction.tmall',
	searchMethodUrl : 'getTotalSearchSeller',
	searchTargetTab : 'T',
	areaCode : 'FO0101',
	area : (typeof(HeaderGnb) == 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.area,
	areaCodePre : (typeof(HeaderGnb) == 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.areaCodePre,
	noSearchResult : true,
	searchKeywd : '',
	setParam : function() {
		var _this = this;

		if ( typeof(noSearchReault) == 'undefined' ) {
			_this.noSearchResult = false;
		};
		if (  typeof(footerKwd) != 'undefined' ) {
			_this.searchKeywd = footerKwd;
		}

		if ( (typeof(bFooterSearch) != 'undefined' && bFooterSearch == 'Y') || _this.area == 'extra' ) {
			_this.bShowFooterSearch = 'Y';
		};

		if( _this.area == 'mini' ) {
			_this.bShowFooterSearch = 'N';
		}

		if( typeof(TARGET_TAB) != 'undefined' ) {
			_this.searchTargetTab = TARGET_TAB;
		}

		if (_this.searchTargetTab == "CONTENTS"){ //�������˻�
			_this.searchTabNm = "�������˻�";
			_this.searchActionUrl = "http://search.11st.co.kr/ContentsSearchAction.tmall";
			_this.searchMethodUrl = "getContentsSearch";
		}else if (_this.searchTargetTab == "BRAND"){ //�귣�� �˻�
			_this.searchTabNm = "�귣��˻�";
			_this.searchActionUrl = "http://search.11st.co.kr/BrandSearchAction.tmall";
			_this.searchMethodUrl = "getBrandSearch";
		};
	},
	drawFooterSearch : function() {
		var _this = this;
		var strFSrch = [];
		var k = 0;
		strFSrch.push('<form name="FooterSearchForm" action="' + _this.searchActionUrl + '">');
		strFSrch.push('<input type="hidden" name="method" value="' + _this.searchMethodUrl + '">');
		strFSrch.push('<input type="hidden" name="targetTab" value="' + _this.searchTargetTab + '">');
		strFSrch.push('<input type="hidden" name="isGnb" value="Y">');
		strFSrch.push('<input type="hidden" name="category">');
		strFSrch.push('<input type="hidden" name="cmd">');
		strFSrch.push('<input type="hidden" name="pageSize">');
		strFSrch.push('<input type="hidden" name="semanticFromGNB" value="">');

		strFSrch.push('<div class="footer_search2">');
		strFSrch.push('<fieldset class="total_search">');
		strFSrch.push('<legend><label for="bottomKwd">�ϴ� ���� �˻�</label></legend>');
		strFSrch.push('<h4>' +_this.searchTabNm + '</h4>');
		strFSrch.push('<input name="kwd" type="text" class="text" value="'+_this.searchKeywd+'" id="bottomKwd"');
		strFSrch.push('" onKeyPress="if(event.keyCode == 13) {goFooterSearch(\''+ _this.areaCodePre + _this.areaCode +'\'); return false;}" style="ime-mode:active;">');
		strFSrch.push('<input type="button" value="�˻�" onclick="javascript:goFooterSearch(\''+ _this.areaCodePre + _this.areaCode +'\');" class="search">');
		strFSrch.push('</fieldset>');

		if(_this.searchKeywd != '' && !_this.noSearchResult) {
			strFSrch.push('<a class="btn_research" onclick="IncFooter.search.searchResearchPop()"><span class="ico_rsch"><em>����������</em></span>�˻���� ��������</a>');
		}

		strFSrch.push('</div>');
		strFSrch.push('</form>');

		try {
			if($ID("footerSearch")) {
				$ID("footerSearch").innerHTML = strFSrch.join('');
			}else{
				document.write(strFSrch.join(''));
			}
		} catch(e) {}
	},
	//�˻���� �������� �˾�
	searchResearchPop : function() {
		var _this = this;

		var url = "http://search.11st.co.kr/jsp/search/include/searchSurveyPop.jsp?kwd=" + _this.searchKeywd + "&targetTab=" + _this.searchTargetTab;
		window.open(url, 'searchResearchPop', 'width=430,height=430,scrollbars=no,status=no,resizable=no');
	},
	init : function() {
		this.setParam();

		if(this.bShowFooterSearch == 'Y') {
			this.drawFooterSearch();
		}
	}
};
IncFooter.search.init();

/*
 * OM Footer
 */
IncFooter.footer = {
	area : (typeof(HeaderGnb) == 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.area,
	areaCodePre : (typeof(HeaderGnb) == 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.areaCodePre,
	drawExtraArea : function() {
		var strExtraArea = [];
		strExtraArea.push('<div id="myHistoryArea" style="display:none"></div>'); // My History Div
		strExtraArea.push('<div id="newFooterAdArea" class="ftr_banner_wrap" style="display:none"></div>'); // Footer AD Banner Area
		document.write(strExtraArea.join(''));
	},
	drawFooter : function() {
		var _this = this;
		var element = [];

		if(_this.area == 'main') {
			element.push('<footer id="footerWrap2" class="footer_wrap2">');
		} else {
			element.push('<div id="footerWrap2" class="footer_wrap2">');
		}

		element.push('	<h2>�ϴ� �޴�</h2>');
		element.push('	<button type="button" class="defbtn_sm dtype7 imgstop" onClick="FooterComm.prdImgToggle.init(this);doCommonStat(\''+_this.areaCodePre+'FO0501\');"><span>�̹��� ����</span></button>');
		element.push('	<ul class="foot_menu">');
		element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/commons/CommonAbout.tmall?method=corp1_1" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0201\');return false;" target="_blank" title="��â ����"><span>ȸ��Ұ�</span></a></li>');
		element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/annc/AnncMainPreview.tmall?method=getProvision&anncCd=01" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0202\');return false;" target="_blank" title="��â ����"><span>�̿���</span></a></li>');
		element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/annc/AnncMainPreview.tmall?method=getProvision&anncCd=06" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0203\');return false;" target="_blank" title="��â ����"><span>���ڱ����ŷ����</span></a></li>');
		element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/annc/AnncMainPreview.tmall?method=getProvision&anncCd=03" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0204\');return false;" target="_blank" title="��â ����"><strong>��������ó����ħ</strong></a></li>');
		element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/commons/CommonAbout.tmall?method=corp1_2" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0205\');return false;" target="_blank" title="��â ����"><span>��������</span></a></li>');
		element.push('		<li><a href="'+_SELLER_URL_+'" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0206\');return false;" target="_blank" title="��â ����"><span>�Ǹ��ڼ��񽺼���</span></a></li>');
		element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/brandadcenter/Main.tmall" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0207\');return false;" target="_blank" title="��â ����"><span>�귣�層����</span></a></li>');
		element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/safety/SafetyMain.tmall" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0208\');return false;" target="_blank" title="��â ����"><span>�����ŷ�����</span></a></li>');
		element.push('		<li><a href="http://openapi.11st.co.kr/openapi/OpenApiIndex.tmall" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0210\');return false;" target="_blank" title="��â ����"><span>Open API</span></a></li>');
		element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/commons/CommonAbout.tmall?method=serviceMap" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0211\');return false;" target="_blank" title="��â ����"><span>���񽺸�</span></a></li>');
		element.push('	</ul>');

		element.push('	<div class="foot_info_wrap">');
		element.push('	<div>');
		element.push('		<div class="ftr_customer">');
		element.push('			<h3>������</h3>');
		element.push('			<div class="inner_wrap">');
		element.push('				<address>(08378) ����Ư���� ���α� �����з� 306 (���ε�)</address>');
		element.push('				<ul>');
		element.push('					<li>Tel : <em>1599-0110</em><a href="http://help.11st.co.kr/11st/faq/FaqIndex.jsp" onclick="doCommonStat(\''+_this.areaCodePre+'FO0301\');" class="link_arr_956c4e">��ȭ��Ŭ��</a></li>');
		element.push('					<li>Fax : 02-849-4962</li>');
		element.push('					<li>E-mail : <a href="http://help.11st.co.kr/11st/mail/MailQuestion.jsp" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;">customerservice@11st.co.kr</a></li>');
		element.push('				</ul>');
		element.push('			</div>');
		element.push('		</div>');
		element.push('		<div class="ftr_trouble">');
		element.push('			<h3>���ڱ����ŷ�������</h3>');
		element.push('			<div class="inner_wrap">');
		element.push('				<ul>');
		element.push('					<li>Tel : 1599-0110</li>');
		element.push('					<li>Fax : 02-849-4962</li>');
		element.push('					<li>E-mail : <a href="http://help.11st.co.kr/11st/mail/MailQuestion.jsp" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;">customerservice@11st.co.kr</a></li>');
		element.push('				</ul>');
		element.push('			</div>');
		element.push('		</div>');
		element.push('		<div class="ftr_sk_planet">');
		element.push('			<h3>SK�÷���(��)</h3>');
		element.push('			<div class="inner_wrap">');
		element.push('			<address>(13487) ��⵵ ������ �д籸 �Ǳ��� 264 (����)</address>');
		element.push('			<ul>');
		element.push('				<li>��ǥ�̻�:������</li>');
		element.push('				<li class="sty_none">����ڵ�Ϲ�ȣ:104-86-36968 <a href="http://www.ftc.go.kr/info/bizinfo/communicationView.jsp?apv_perm_no=2014378021930200030&area1=&area2=&currpage=1&searchKey=04&searchVal=1048636968&stdate=&enddate=" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0302\');return false;" class="link_arr_956c4e">���������Ȯ��</a></li>');
		element.push('				<li>����Ǹž��Ű�:2014-��⼺��-0036</li>');
		element.push('				<li>Tel: 1599-0110</li>');
		element.push('				<li>Fax: 02-849-4962</li>');
		element.push('			</ul>');
		element.push('			</div>');
		element.push('		</div>');
		element.push('	</div>');
		element.push('	</div>');
		element.push('	<div class="foot_btnwrap">');
		element.push('		<a href="' + _GNB_CONTEXT_PATH_ + '/browsing/MembershipBenefitPlace.tmall?method=getCompensationBenefit&addCtgrNo=952005" class="defbtn_sm dtype7" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0401\');return false;" target="_blank" title="��â ����"><span>������110%������</span></a>');
		element.push('		<a href="' + _GNB_CONTEXT_PATH_ + '/browsing/MembershipBenefitPlace.tmall?method=getCompensationBenefit&addCtgrNo=952020&tabIdx=2" class="defbtn_sm dtype7" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0402\');return false;" target="_blank" title="��â ����"><span>����ǰ110%������</span></a>');
		element.push('		<a href="' + _GNB_CONTEXT_PATH_ + '/browsing/MembershipBenefitPlace.tmall?method=getCompensationBenefit&addCtgrNo=952021&tabIdx=3" class="defbtn_sm dtype7" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0403\');return false;" target="_blank" title="��â ����"><span>���Ǽ� ���󼭺�</span></a>');
		element.push('		<a href="http://help.11st.co.kr" class="defbtn_sm dtype7" onclick="popupFromFooter(this.href,\'FOOTER_POP\');doCommonStat(\''+_this.areaCodePre+'FO0404\');return false;" target="_blank" title="��â ����"><span>24�ð� �ݼ���</span></a>');
		element.push('	</div>');
		element.push('	<div class="foot_familysite">');
		element.push('		<h4><span>SK�÷��� Family Site</span></h4>');
		element.push('		<div>');
		element.push('		<button type="button" onClick="familyLink();doCommonStat(\''+_this.areaCodePre+'FO0601\')">Family Site</button>');
		element.push('		<ul id="familyLink_sub" style="display:none">');
		element.push('			<li><a href="http://www.sktelecom.com" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="��â ����">SK Telecom</a></li>');
		element.push('			<li><a href="http://www.skplanet.com" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="��â ����">SK Planet</a></li>');
		element.push('			<li><a href="http://www.sksports.net/index.asp" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="��â ����">SK��������</a></li>');
		element.push('			<li><a href="http://www.skbroadband.com" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="��â ����">SK��ε���</a></li>');
		element.push('			<li><a href="http://www.nate.com" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="��â ����">NATE</a></li>');
		element.push('			<li><a href="http://www.melon.com" onclick="popupFromFooter(this.href,\'FOOTER_POP\');return false;" target="_blank" title="��â ����">MelOn</a></li>');
		element.push('		</ul>');
		element.push('		</div>');
		element.push('	</div>');
		element.push('	<div class="foot_copyright">');
		element.push('		<p>SK�÷���(��)�� ����Ǹ��߰��ڷμ� ���¸��� 11������ �ŷ�����ڰ� �ƴϸ�, �����Ǹ��ڰ� ����� ��ǰ���� �� �ŷ��� ���� SK�÷���(��)�� ��ü å���� ���� �ʽ��ϴ�.</p>');
		element.push('		<p>Copyright SK planet. All rights reserved.</p>');
		element.push('	</div>');

		if(_this.area == 'main') {
			element.push('</footer>');
			//init Award List
			element.push(Main.footer.MainAwardArea());
		} else {
			element.push('</div>');
		}

		try{
			if(isMobile){
				var mobileLink = 'http://m.11st.co.kr/MW/';
				if ( this.isBookDomain() ) {
					mobileLink = 'http://books.m.11st.co.kr/MW/';
				}

				element.push('<a href="' + mobileLink + '" class="go_mobileW"><span>����� �������� ����</span></a>');
			}
		}catch(e){}
		document.write(element.join(''));
	},
	isBookDomain : function() {
		return window.location.host == 'books.11st.co.kr';
	},
	drawEndBodyWrap : function() {
		document.write('</div>');	// end wrapBody
	},
	init : function() {
		this.drawExtraArea();
		this.drawFooter();
		this.drawEndBodyWrap();
	}
};
IncFooter.footer.init();

/*
 * Right Wing Banner
 */
//IS_OVER_1024 = false;
IncFooter.rightWingBanner = {
	area : (typeof(HeaderGnb) == 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.area,
	areaCodePre : (typeof(HeaderGnb) == 'undefined') ? 'MAINS' : HeaderGnb.makeGnb.areaCodePre,
	baseURL : "http://i.011st.com",
	imgErrURL : "http://image.11st.co.kr",
	protocol : window.location.protocol,
	isLogin : funcCheckIsLogin(),
	defaultData : '',
	//prdDispCnt : (typeof(IS_OVER_1024) != 'undefined' && IS_OVER_1024) ? 3 : 12,
	prdDispCnt : 3,
	myInfoDataLoaded : false,
	makeBasicWingBnnr : function(){
		var _this = this;
		var basicElements = [];

		/* 20150111 SR-41743 ONE ID ���� ����
		basicElements.push('		<div class="oneid_wrap">');
		basicElements.push('			<div class="oneid"><a id="wb_oneid" href="https://www.skplanetoneid.com" onclick="doCommonStat(\''+_this.areaCodePre+'RW0101\')" title="SK Planet ONE ID" target="_blank">SK Planet ONE ID</a></div>');
		basicElements.push('			<div id="wb_oneidOCB" class="okcash" style="display:none"></div>');
		basicElements.push('		</div>'); */

		basicElements.push('		<div class="deal_bnr">');
		basicElements.push('			<a href="http://www.11st.co.kr/browsing/MallPlanDetail.tmall?method=getMallPlanDetail&planDisplayNumber=916177" target="_blank" onclick="doCommonStat(\''+_this.areaCodePre+'RW0103\')"><img src="' + this.baseURL + '/ui_img/wingbanner/bnr_superpass.png" alt="�����н�"></a>');
		basicElements.push('		</div>');
		basicElements.push('		<div class="wing_hgroup" id="wingHgroup">');
		basicElements.push('			<h3 id="wb_link_shopInfo">���Ǽ�������</h3>');
		basicElements.push('			<ul>');
		basicElements.push('				<li class="hg_cupoint"><a href="#my_benefit" onclick="doCommonStat(\''+_this.areaCodePre+'RW0201\');return false;">����/����Ʈ</a></li>');
		if(_this.isLogin){
			basicElements.push('				<li class="hg_special"><a href="#special_benefit" onclick="doCommonStat(\''+_this.areaCodePre+'RW0205\');return false;">Ư���� ���� <span class="count" id="wb_benefitCount"></span></a></li>');
		}
		basicElements.push('				<li class="hg_cart"><a href="#my_cart" onclick="doCommonStat(\''+_this.areaCodePre+'RW0202\'); return false;">��ٱ��� <span class="count" id="wb_cartCount"></span></a></li>');
		basicElements.push('			</ul>');
		basicElements.push('			<div class="winglayer_wrap" id="shoppingInfoLayerWrap"></div>'); //��ħ ���̾�
		basicElements.push('		</div>');
		basicElements.push('		<div class="wing_viewprd" name="wb_MainView_layer" id="wb_recent_MainLayer">');
		basicElements.push('			<h4><a href="#neView">�ֱٺ� ��ǰ</a><span class="count" id="wb_sp_recentPrd_Cnt" style="display:none"></span></h4>');
		basicElements.push('			<div id="neView" class="viewport">');
		basicElements.push('				<ul class="prd_list" id="wb_recentPrd_list" style="display:none">');
	for (var i = 0 ; i < this.prdDispCnt ; i++){
		basicElements.push('					<li id="wb_recent_prd'+(i+1)+'">');
		basicElements.push('						<a href="#" target="_blank" title="��â ����">');
		basicElements.push('							<img src="'+ this.baseURL +'/img/common/blank.gif" alt="" onError="javascript:this.src=\''+ this.imgErrURL +'/img/product/no_image_60.gif\'" width="60" height="60">');
		basicElements.push('							<span class="prd_info"><span class="prd_tit"></span>');
		basicElements.push('								<em><span>��</span></em>');
		basicElements.push('							</span>');
		basicElements.push('						</a>');
		basicElements.push('						<button  name="wb_recent_deletePrd" type="button" class="btn_del" title="��ǰ ����">��ǰ ����</button>');
		basicElements.push('					</li>');
	}
		basicElements.push('				</ul>');
		basicElements.push('			</div>');
		basicElements.push('			<p class="no_prd" id="wb_recentPrd_noList" style="display:none">�ֱ� �� ��ǰ��<br>�����ϴ�.</p>');
		basicElements.push('			<div class="btnctr_pn" id="wb_recentPrdBtn" style="display:none">');
		basicElements.push('				<span id="wb_recentPrdPg"><em></em>/<span></span></span>');
		basicElements.push('				<button type="button" class="in_prev" id="wb_btn_recentPrd_prev">����</button>');
		basicElements.push('				<button type="button" class="in_next" id="wb_btn_recentPrd_next">����</button>');
		basicElements.push('			</div>');
		basicElements.push('		</div>');
		basicElements.push('		<div class="wing_prdwrap" name="wb_MainView_layer" id="wb_recomm_MainLayer">');
		basicElements.push('			<div class="had_wrap">');
		basicElements.push('				<h4><a href="#recomPrd">��õ��ǰ<\/a><\/h4>');
		basicElements.push('				<div onclick="jQuery(this).children(\'p\').toggle(\'fast\');" onmouseout="jQuery(this).children(\'p\').hide(\'fast\');">');
		basicElements.push('					<button class="h_ad hadtype2" type="button">���� ���� ����<\/button>');
		basicElements.push('					<p style="display: none;">11���� �Ǹ����� ��õ��ǰ����<br>��õ��ǰ�� ���� �������� ������<br>��ǰ�Դϴ�.<\/p>');
		basicElements.push('				<\/div>');
		basicElements.push('			<\/div>');
		basicElements.push('			<div id="wb_recomPrd" class="viewport">');
		basicElements.push('				<ul class="prd_list" id="wb_recommPrd_list" style="display:none">');
	for( var i = 0 ; i < this.prdDispCnt ; i++){
		basicElements.push('					<li id="wb_recomm_prd'+(i+1)+'">');
		basicElements.push('						<a href="#" target="_blank" title="��â ����">');
		basicElements.push('							<img src="'+ this.baseURL +'/img/common/blank.gif" alt="" onError="javascript:this.src=\''+ this.imgErrURL +'/img/product/no_image_60.gif\'" width="60" height="60">');
		basicElements.push('							<span class="prd_info"><span class="prd_tit"></span>');
		basicElements.push('								<em><span>��</span></em>');
		basicElements.push('							</span>');
		basicElements.push('						</a>');
		basicElements.push('					</li>');
	}
		basicElements.push('				</ul>');
		basicElements.push('			</div>');
		basicElements.push('			<p id="wb_recommPrd_noList" class="no_prd" style="display:none">��õ ��ǰ��<br>�����ϴ�.</p>');
		basicElements.push('			<div id="wb_recommPrdBtn" class="btnctr_pn" style="display:none">');
		basicElements.push('				<span id="wb_recommPrdPg" ><em></em>/<span></span></span>');
		basicElements.push('				<button id="wb_btn_recomm_prev" type="button" class="in_prev">����</button>');
		basicElements.push('				<button id="wb_btn_recomm_next" type="button" class="in_next">����</button>');
		basicElements.push('			</div>');
		basicElements.push('		</div>');
		basicElements.push('		<div class="wing_btn">');
		basicElements.push('			<a href="#" class="go_top" onClick="FooterComm.scrollControl.goTop();doCommonStat(\''+this.areaCodePre+'RW0501\');return false;"><span>TOP</span></a>');
		basicElements.push('			<a href="#" class="go_down" onClick="FooterComm.scrollControl.goBottom();doCommonStat(\''+this.areaCodePre+'RW0502\');return false;"><span>DOWN</span></a>');
		basicElements.push('		</div>');

		return basicElements.join('');
	},
	makeShoppingInfoLayer : function(){
		var layerElement = [];
		var k = 0;

		layerElement.push('<div class="winglayer" id="wingLayer">');
		layerElement.push('<div class="winglayer_conts">');
		layerElement.push('	<div class="my_info">');
		layerElement.push('		<em class="ico_grade" id="myGrade" style="display:none">vvip</em>');
		layerElement.push('		<span class="my_order" id="rwing_order_cnt">�ֹ��Ǽ� 0��</span>');
		layerElement.push('		<ul>');
		layerElement.push('			<li><a href="http://buy.11st.co.kr/order/OrderList.tmall" onclick="doCommonStat(\''+this.areaCodePre+'RW0203\');" class="link_arr_4d6ccd">���� �ֹ����� ����</a></li>');
		layerElement.push('			<li><a href="http://www.11st.co.kr/register/getGradeInfo.tmall?method=getGrade" onclick="doCommonStat(\''+this.areaCodePre+'RW0204\');" class="link_arr_dirtgo">����� ��� ���� ����</a></li>');
		layerElement.push('		</ul>');
		layerElement.push('	</div>');
		layerElement.push('<div class="special_benefit" id="special_benefit_layer" style="display:none">');
		layerElement.push('	<h4 id="special_benefit" class="winglayer_tit tfirst">Ư���� ���� �ޱ� <span>(<a id="special_benefit_size" href="http://www.11st.co.kr/loyalty/loyaltyCmsDtls.tmall?method=cmsDtlsList" onclick="doCommonStat(\''+this.areaCodePre+'RW0217\');" title="Ư���� ���� �ޱ� �ٷΰ���"></a>)</span></h4>');
		layerElement.push('	<div id="special_benefit_txt"></div>');
		layerElement.push('	<a href="http://www.11st.co.kr/loyalty/loyaltyCmsDtls.tmall?method=cmsDtlsList" onclick="doCommonStat(\''+this.areaCodePre+'RW0218\');" title="Ư���� ���� �ޱ� ������" class="defbtn_more">������</a>');
		layerElement.push('</div>');
		layerElement.push('	<ul class="my_benefit">');
		layerElement.push('		<li><span class="th_coupon">MY����</span> <a href="http://www.11st.co.kr/loyalty/AuthCouponGiftDtls.tmall" onclick="doCommonStat(\''+this.areaCodePre+'RW0206\');"><em id="myCoupon">0��</em></a></li>');
		layerElement.push('		<li><span class="th_mileage">���ϸ���</span> <a href="http://www.11st.co.kr/loyalty/AuthMileageGiftDtls.tmall" onclick="doCommonStat(\''+this.areaCodePre+'RW0207\');"><em id="myMileage">0M</em></a></li>');
		layerElement.push('		<li><span class="th_point">����Ʈ</span> <a href="http://www.11st.co.kr/loyalty/AuthMallPointGiftDtls.tmall" onclick="doCommonStat(\''+this.areaCodePre+'RW0208\');"><em id="myPoint">0P</em></a></li>');
		layerElement.push('	</ul>');
		layerElement.push('	<h4 id="my_cart" class="winglayer_tit tfirst">��ٱ��Ͽ� ��� ��ǰ <span id="wb_cartPrd_cnt">(<a href="http://www.11st.co.kr/cart/CartAction.tmall?method=getCartList&xzone=accountbarcart&xfrom=wingbannercart" onclick="doCommonStat(\''+this.areaCodePre+'RW0209\');" title="��ٱ��� �ٷΰ���">0</a>)</span></h4>');
		layerElement.push('	<div class="detail_inner">');
		layerElement.push('		<ul id="wb_myCart_list"  style="display:none"></ul>'); //��ٱ���
		layerElement.push('		<p class="no_list" id="wb_cart_NoList" style="display:none">��ٱ��Ͽ� ��� ��ǰ�� �����ϴ�.</p>');
		layerElement.push('		<a href="http://www.11st.co.kr/cart/CartAction.tmall?method=getCartList&xzone=accountbarcart&xfrom=wingbannercart" onclick="doCommonStat(\''+this.areaCodePre+'RW0209\');" title="��ٱ��� ������" class="defbtn_more">������</a>');
		layerElement.push('	</div>');
		layerElement.push('	<h4 class="winglayer_tit">�ܰ�̴ϸ�</h4>');
		layerElement.push('	<div class="minimall">');
		layerElement.push('		<div class="viewport" id="wb_miniMall_List" style="display:none">');
		layerElement.push('			<ul>');
		layerElement.push('				<li id="WingFavorShop">');
		layerElement.push('					<strong><a href="#" target="_blank" title="��â ����">�̴ϸ�</a></strong>');
		layerElement.push('					<a href="#" target="_blank" title="��â ����">');
		layerElement.push('						<img src="'+ this.baseURL +'/img/common/blank.gif" onError="javascript:this.src=\''+ this.imgErrURL +'/img/product/no_image_80.gif\'" alt="" width="70" height="70">');
		layerElement.push('						<div class="minicoupon">');
		layerElement.push('							<span id="WingFavorShopPrdNm"></span>');
		layerElement.push('							<em id="WingFavorShopDscPrc"></em>');
		layerElement.push('							<span class="coupon">�ܰ����� <strong></strong></span>');
		layerElement.push('						</div>');
		layerElement.push('					</a>');
		layerElement.push('				</li>');
		layerElement.push('			</ul>');
		layerElement.push('		</div>');
		layerElement.push('		<div class="btnctr_pn" id="wb_miniMall_btn" style="display:none">');
		layerElement.push('			<button type="button" class="in_prev" id="btn_wb_miniMall_prev">����</button>');
		layerElement.push('			<button type="button" class="in_next" id="btn_wb_miniMall_next">����</button>');
		layerElement.push('		</div>');
		layerElement.push('		<p class="no_list" id="wb_miniMall_NoList" style="display:none">�ܰ�̴ϸ��� �����ϴ�.</p>');
		layerElement.push('		<a href="http://www.11st.co.kr/minimall/MyMiniMallAction.tmall?method=getMyMiniMall" onclick="doCommonStat(\''+this.areaCodePre+'RW0213\');" title="�ܰ�̴ϸ� ������" class="defbtn_more">������</a>');
		layerElement.push('	</div>');
		layerElement.push('</div>');
		layerElement.push('<button type="button" class="rwing_btn_layclose" id="rwingBtnLayClose">���̾� �ݱ�</button>');
		layerElement.push('</div>');

		return layerElement.join('');
	},
	makeHeaderElement : function(){
		var headerElements = [];
		headerElements.push('<div id="wingHidden" style="display:none">');
		if(this.area == 'main') {
			headerElements.push('	<aside id="wingBnr2"></aside>');
		} else {
			headerElements.push('	<div id="wingBnr2"></div>');
		}
		headerElements.push('</div>');
		return headerElements.join('');
	},
	displayWB : function(){
		var wb_cssURL = '';
		var _this = this;

		if(_this.protocol == "https:"){
			_this.baseURL = 'https://image.11st.co.kr';
			_this.imgErrURL = _this.baseURL;
			wb_cssURL = _SSL_CSS_URL_;
		} else{
			wb_cssURL = _CSS_URL_;
		}

		//����� �߰��� ���̾ƿ��� �ٸ���� wingBnnrLayout�� �ش� ���̾ƿ� id�� �Է��Ͽ� �ش� ���̾ƿ��� ����ʸ� �߰�
		var layoutId = "layBodyWrap";

		if(typeof(wingBnnrLayoutId)!="undefined" && wingBnnrLayoutId != ''){
			layoutId = wingBnnrLayoutId;
		}

		jQuery('#layBodyWrap').append(_this.makeHeaderElement());
		jQuery("#wingHidden #wingBnr2").appendTo("#" + layoutId);
		jQuery("#wingHidden").remove();

		// if(IS_OVER_1024){
			jQuery("#wingBnr2").append(_this.makeBasicWingBnnr());
			jQuery("#shoppingInfoLayerWrap").append(_this.makeShoppingInfoLayer());
/*
		} else {
			jQuery("#wingBnr2").append(_this.makeMiniWingBnnr());
			jQuery("#shoppingInfoLayerWrap").append(_this.makeShoppingInfoLayer());
		}
*/

	},
	makeBasePrdURL : function(prdNo, zone){ 	//xzon �߰� URL
		var _basePrdURL =  'http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=' + prdNo;

		if(zone == "cart"){
			var _cartUrl = _basePrdURL + '&xzone=wb^cart';
			return _cartUrl;
		}else if (zone == "recent"){
			var _recentUrl = _basePrdURL +  '&xzone=wb^today';
			return _recentUrl;
		}else if (zone == "recomm"){
			var _recommUrl = _basePrdURL +  '&xzone=wb^today';
			return _recommUrl;
		}
	},
	recentProduct : {
		totalPrdCount : 0,
		currentPage : 1,
		maxPage : 0,
		delProcess : false,
		getPrd : function() { //�ֱ� �� ��ǰ
			//�ֱ� �� ��ǰ ����
			var recentPrd = null;
			var _this = this;
			var _outer = IncFooter.rightWingBanner;

			var dataUrl = _outer.protocol + '//www.11st.co.kr/wingR/WingRBannerAction.tmall?method=getRecentPrd&json=Y&callback=?&currentPage='+_this.currentPage + '&showCount='+_outer.prdDispCnt ;
			jQuery.ajax({
				url : dataUrl,
				dataType : 'jsonp',
				scriptCharset : 'utf-8',
				success : function(data){
					recentPrd = data;
					_outer.setPrd(1, recentPrd, '#wb_recent_prd', _outer.prdDispCnt, 'recent');

					if( recentPrd.totalCount == 0) {
						jQuery("#wb_recentPrdBtn").css("display","none");
						jQuery("#wb_recentPrd_list").css("display","none");
						jQuery("#wb_recentPrd_noList").css("display","block");
					} else {
						jQuery("#wb_recentPrdBtn").css("display","");
						jQuery("#wb_recentPrd_list").css("display","block");
						jQuery("#wb_recentPrd_noList").css("display","none");
					}

					//if(IS_OVER_1024){
						jQuery("#wb_recentPrdPg").html("<em>"+(_this.currentPage)+"</em>/<span>"+ _this.maxPage +"</span>");
					//}
					if(_this.maxPage == 1) {
						jQuery("#wb_recentPrdBtn").css("display","none");
					}
					_this.delProcess = false;
				}
			});
		},
		deletePrd : function(prdNo){ // �ֱ� �� ��ǰ ����
			var _outer = IncFooter.rightWingBanner;
			var _this = this;

			if(!HeaderComm.isEmpty(prdNo) && !_this.delProcess) {
				_this.delProcess = true;
				var dataUrl = _outer.protocol +  '//www.11st.co.kr/wingBanner/WingBannerAjaxAction.tmall?method=deleteRecentViewProductJSON&callback=?&prdNo=' + prdNo;
				var result = null;
				jQuery.ajax({
					url : dataUrl,
					dataType : 'jsonp',
					scriptCharset : 'utf-8',
					sync : true,
					success : function(data){
						_this.getPrd();

						_this.totalPrdCount -= 1;
						_this.maxPage = Math.ceil(_this.totalPrdCount / _outer.prdDispCnt );

						if(  _this.currentPage > _this.maxPage ) {
							_this.prevPage();
						}

						//if(IS_OVER_1024){
							jQuery("#wb_sp_recentPrd_Cnt").html("<em>" +  (_this.totalPrdCount) + "</em>");
						//}
					}
				});
			}

		},
		nextPage : function(){
			var _outer = IncFooter.rightWingBanner;
			this.currentPage++;
			if(this.currentPage > this.maxPage){
				this.currentPage = 1;
			}
			this.getPrd();
			doCommonStat(_outer.areaCodePre+'RW0306');
		},
		prevPage : function() {
			var _outer = IncFooter.rightWingBanner;
			this.currentPage--;
			if(this.currentPage <= 0){
				this.currentPage = this.maxPage;
			}
			this.getPrd();
			doCommonStat(_outer.areaCodePre+'RW0305');
		}
	},
	recommProduct : {
		totalPrdCount : 0,
		currentPage : 1,
		maxPage : 0,
		getPrd : function() {
			var _this = this;
			var _outer = IncFooter.rightWingBanner;

			_outer.setPrd(this.currentPage, wingRBnnrRecomm , '#wb_recomm_prd', _outer.prdDispCnt, 'recomm');

			if(wingRBnnrRecomm.totalCount == 0){
				jQuery("#wb_recommPrdBtn").css("display","none");
				jQuery("#wb_recommPrd_list").css("display","none");
				jQuery("#wb_recommPrd_noList").css("display","block");
			}else{
				jQuery("#wb_recommPrdBtn").css("display","");
				jQuery("#wb_recommPrd_list").css("display","block");
				jQuery("#wb_recommPrd_noList").css("display","none");
			}
			//if(IS_OVER_1024){
				jQuery("#wb_recommPrdPg").html("<em>"+(_this.currentPage)+"</em>/<span>"+ _this.maxPage +"</span>");
			//}
			if(_this.maxPage == 1) {
				jQuery("#wb_recentPrdBtn").css("display","none");
			}
		},
		nextPage : function(){
			var _outer = IncFooter.rightWingBanner;
			this.currentPage++;
			if(this.currentPage > this.maxPage){
				this.currentPage = 1;
			}
			this.getPrd();
			doCommonStat(_outer.areaCodePre+'RW0406');
		},
		prevPage : function() {
			var _outer = IncFooter.rightWingBanner;
			this.currentPage--;
			if(this.currentPage <= 0){
				this.currentPage = this.maxPage;
			}
			this.getPrd();
			doCommonStat(_outer.areaCodePre+'RW0405');
		}
	},
	setPrd : function(idx, prdData, liID, showcount, urlType){ // ��õ��ǰ, �ֱٺ� ��ǰ ����

		var _this = this;
		var minIdx = (idx-1) * showcount;
		var maxIdx = (idx-1) * showcount + showcount;

		if(maxIdx > prdData.totalCount){
			maxIdx = prdData.totalCount;
		}

		var modMax = maxIdx % showcount;

		if(modMax != 0 ){
			for(var n = modMax ; n < showcount ; n++){
				jQuery(liID+(n+1)).css('display', 'none');
			}
		}
		
		var strTRCNO = '';
		for(var i = minIdx ; i < maxIdx ; i++){
			var objId = liID +((i%showcount)+1);

			jQuery(objId+' a').data({
				index : i,
				trcNo : prdData.DATA[i].TRCNO,
				typGubn : prdData.DATA[i].TYPGUBN,
				areaGubn : prdData.DATA[i].AREAGUBN
			});

			jQuery(objId+' a').attr({
				prdNo : prdData.DATA[i].PRD_NO,
				href : _this.makeBasePrdURL(prdData.DATA[i].PRD_NO, urlType)
		 	})
		 	.one('click',function(){
		 		//Area Code
		 		var idx = jQuery(this).data('index');
		 		var codeIdx = (idx+2) >= 10 ?(idx+2) : '0' + (idx+2);
				if(urlType == 'recent'){
					doCommonStat(_this.areaCodePre+'RW03'+codeIdx);
				}else if (urlType == 'recomm'){
					var trcNo = jQuery(this).data('trcNo');
					var typGubn = jQuery(this).data('typGubn');
					var areaGubn = jQuery(this).data('areaGubn');
					var prdNo = jQuery(this).attr('prdNo');

					doCommonStat(_this.areaCodePre+'RW04'+codeIdx);
					stck(typGubn, areaGubn, trcNo);
					ad_headerCommonJs.util.instance.ConversionCookieQueue.add(trcNo, prdNo, (typGubn + '' + areaGubn));
				}
			});
			jQuery(objId+' img').attr({
				src : this.baseURL + prdData.DATA[i].IMG1,
				alt : prdData.DATA[i].TXT1
			});
			jQuery(objId+' a span.prd_tit').text(prdData.DATA[i].TXT1);
			jQuery(objId+' a em').html(prdData.DATA[i].PRC1+'<span>��</span>');

			jQuery(objId).css('display', '');
			
			strTRCNO += prdData.DATA[i].TYPGUBN + prdData.DATA[i].AREAGUBN + 'I';
			strTRCNO += prdData.DATA[i].TRCNO + '^';
		}
		if(strTRCNO != ''){
			var img = new Image();
			img.src =  'http://st.11st.co.kr/a.st?a='+strTRCNO;
		}
	},
	setMyShoppingInfo : function() {
		var _this = this;
		var cartPrd = null;
		var favorShop = null;

		if(_this.myInfoDataLoaded) return;

		var setCartPrd = function() {
			var maxPrdCnt = cartPrd.totalCount < 3 ? cartPrd.totalCount : 3;
			var prdHtml = [];

			for(var i = 0 ; i < maxPrdCnt ; i++){
				var prdData = cartPrd.DATA[i];
				prdHtml.push('	<li>');
				prdHtml.push('		<a href="'+ _this.makeBasePrdURL(prdData.PRD_NO, 'cart') +'" onclick="doCommonStat(\''+_this.areaCodePre+'RW02'+(i+10)+'\');">');
				prdHtml.push('		<img src="'+ _this.baseURL + prdData.IMG1 + '" onError="javascript:this.src=\''+ _this.imgErrURL +'/img/product/no_image_80.gif\'" alt="'+ prdData.TXT1 +'" width="70" height="70">');
				prdHtml.push(' 	<em>'+ prdData.PRC1 +'<span>��</span></em></a>');
				prdHtml.push('	</li>');
			}
			jQuery('#wb_myCart_list').html(prdHtml.join(''));
		};

		//�ܰ� �̴ϸ� ����
		var setFavorShop = function(idx) {
			if(idx == undefined || idx >= favorShop.DATA.length) idx = 0;
			if(idx < 0) idx = favorShop.DATA.length-1;
			var shopData = favorShop.DATA[idx];
			var shopHtml = [];
			var $shopObj = jQuery('#WingFavorShop');

			$shopObj.find('img').attr({
				src : _this.baseURL + shopData.PRDIMG,
				alt : shopData.TXT1
			});
			$shopObj.find('#WingFavorShopPrdNm').html(shopData.PRDNM);
			$shopObj.find('#WingFavorShopDscPrc').html(shopData.DSCPRC + '<span>��</span>');
			$shopObj.find("a")
			.attr({
				href : favorShop.DATA[idx].URL
			})
			.one("click",function(){
				doCommonStat(_this.areaCodePre + 'RW0214');
			});

			$shopObj.find('strong a').html(shopData.TXT1);
			if(shopData.CUPN != "����") {
				$shopObj.find('.coupon strong').text(shopData.CUPN);
				$shopObj.find('.coupon').show();
			} else {
				$shopObj.find('.coupon').hide();
			}

			jQuery('#wb_miniMall_cnt a').text(favorShop.totalCount);
			jQuery("#btn_wb_miniMall_prev").one("click",function(){
				setFavorShop(idx-=1);
				doCommonStat(_this.areaCodePre + 'RW0215');
			});
			jQuery("#btn_wb_miniMall_next").one("click",function(){
				setFavorShop(idx+=1);
				doCommonStat(_this.areaCodePre + 'RW0216');
			});
		};

		jQuery.ajax({
			type : 'get',
			url : _this.protocol +  '//www.11st.co.kr/wingR/WingRBannerAction.tmall?method=getShoppingInfo&json=Y&callback=?',
			dataType : 'jsonp',
			scriptCharset : 'utf-8',
			success : function(data){

				cartPrd = data.CARTITEM;
				favorShop = data.MY_FAVOR_SHOP;

				var couponCnt = data.COUPON_CNT;
				var point = data.POINT;
				var mileage = data.MILEAGE;
				var myGrade = data.BUYGRDCD;
				var gradeCss = '';
				var orderCnt = data.ORDER_CNT;
				var benefitTxt = data.BENEFITTEXT;
				var benefitSize = data.BENEFITSIZE;
				
				switch(myGrade) {
					case "1" :
						gradeCss = "vvip";
						break;
					case "2" :
						gradeCss = "vip";
						break;
					case "3" :
						gradeCss = "family";
						break;
					default :
						gradeCss = "welcome";
						break;
				}

				jQuery("#myCoupon").html(couponCnt + "��");
				jQuery("#myPoint").html(point + "P");
				jQuery("#myMileage").html(mileage + "M");
				jQuery("#rwing_order_cnt").html('�ֹ��Ǽ� '+orderCnt+'��');

				jQuery("#myGrade").addClass(gradeCss);
				jQuery("#myGrade").html(gradeCss);
				jQuery("#myGrade").show();
				if(cartPrd.totalCount > 0){
					setCartPrd(cartPrd);
					jQuery("#wb_myCart_list").show();
					jQuery("#wb_cart_NoList").hide();
				} else {
					jQuery("#wb_cartPrd_cnt").text("");
					jQuery("#wb_myCart_list").hide();
					jQuery("#wb_cart_NoList").show();
				}

				if(favorShop.totalCount > 0){
					setFavorShop();
					jQuery("#wb_miniMall_btn").show();
					jQuery("#wb_miniMall_List").show();
					jQuery("#wb_miniMall_NoList").hide();
				}else{
					jQuery("#wb_miniMall_cnt").html("");
					jQuery("#wb_miniMall_btn").hide();
					jQuery("#wb_miniMall_List").hide();
					jQuery("#wb_miniMall_NoList").show()

				}

				if(benefitSize > 0 && benefitTxt != ""){
					jQuery("#special_benefit_layer").show();
					jQuery("#special_benefit_size").html(benefitSize);
					jQuery("#special_benefit_txt").html(benefitTxt);
				}else{
					jQuery("#special_benefit_layer").hide();
					jQuery("#special_benefit_size").html(0);
					jQuery("#special_benefit_txt").html("");
				}



				// ����Ÿ �ѹ��� ȣ��
				_this.myInfoDataLoaded = true;
			}
		});
	},
	setWingData : function() {
		var dataUrl = this.protocol + '//www.11st.co.kr/wingR/WingRBannerAction.tmall?method=getInitInfo&json=Y&callback=?&st=T';
		var _this = this;
		var defaultInfo = null;

		jQuery.ajax({
			url : dataUrl,
			dataType : 'jsonp',
			scriptCharset : 'utf-8',

			success : function(data){
				defaultInfo = data.DEFAULT_INFO;
				_this.defaultData = defaultInfo;
				_this.recentProduct.totalPrdCount = defaultInfo.TODAYNUM;
				_this.recentProduct.maxPage = Math.ceil(defaultInfo.TODAYNUM / _this.prdDispCnt );
				_this.recommProduct.totalPrdCount = wingRBnnrRecomm.totalCount;
				_this.recommProduct.maxPage = Math.ceil(wingRBnnrRecomm.totalCount / _this.prdDispCnt);

				//if(IS_OVER_1024){

					/* 20150111 SR-41743 ONE ID ���� ����
					//SKP ONE ID ����
					jQuery("#wb_oneid").attr("href", defaultInfo.isSKPReturnURL);

					var _ocbStatus = defaultInfo.isOCBStatusChk;
					var _isOCBReturnURL = defaultInfo.isOCBReturnURL;
					var _ocbPoint = TMCookieUtil.getSubCookie(0, 'OCBP');

					if (typeof _ocbStatus != 'undefined' && _ocbStatus != ""){
						_this.setMyOcbPoint(_ocbStatus, _ocbPoint, _isOCBReturnURL);
					}*/

					if(_this.isLogin){
						jQuery("#wb_cartCount").html("<em>" + defaultInfo.CARTNUM + "</em>");
						if(defaultInfo.BENEFITNUM > 0){
							jQuery(".hg_special").show();
							jQuery("#wingHgroup").addClass("special_h");
							jQuery("#wb_benefitCount").html("<em>" + defaultInfo.BENEFITNUM + "</em>");
						}else{
							jQuery(".hg_special").hide();
							jQuery("#wingHgroup").removeClass("special_h");
						}

						jQuery("#wb_cartPrd_cnt a").text(defaultInfo.CARTNUM);
					};

					if(defaultInfo.TODAYNUM > 0) {
						jQuery("#wb_sp_recentPrd_Cnt").css("display","block");
						jQuery("#wb_sp_recentPrd_Cnt").html("<em>" +  defaultInfo.TODAYNUM + "</em>");
					}

					// default ����â
					var wbMenuType = TMCookieUtil.getSubCookie(0,'WB_MENU');
					if (wbMenuType == "T"){ //�ֱٺ���ǰ
						_this.showRecentPrdList();
					}else{
						_this.showRecommPrdList();
					}

					if(  _this.recentProduct.currentPage > _this.recentProduct.maxPage ) {
						_this.recentProduct.currentPage = _this.recentProduct.maxPage;
					}
				/*
				} else {
					jQuery("#wb_cartPrd_cnt a").text(defaultInfo.CARTNUM);
				}
				*/
			}
		});
	},
	/* 20150111 SR-41743 ONE ID ���� ����
	//SKP One ID ���� ������� OK cashbag ��ȸ
	loadMyOCBPoint : function(){
		var _this = this;
		var dataUrl = _this.protocol + '//www.11st.co.kr/wingR/WingRBannerAction.tmall?method=getLoadMyOCBPoint';

		jQuery.ajax({
			url: dataUrl,
			dataType : 'jsonp',
			scriptCharset : 'utf-8',
			timeout : 5000,			//OCB ���� 5��
			success: function(result) {
				defaultInfo = result.SKP_OCBPOINT;
				var ocbAmount = defaultInfo.ocSAmount;
				TMCookieUtil.add(0, 'OCBP', ocbAmount);
				_this.setMyOcbPoint('P', ocbAmount, '', defaultInfo.ocMsg);
			},
			error: function() {
				_this.setMyOcbPoint('P', 'ERROR', '', '');
			}
		});
	},
	setMyOcbPoint : function(ocStatus, point, isOCBReturnURL, ocMsg) {
		var $ocbObj = jQuery('#wb_oneidOCB');

		if ( !ocStatus ) {
			ocStatus = 'P';
		}

		switch ( ocStatus ) {
			case 'P' :
				switch( point )
				{
					case 'ERROR' :
						window.open('https://www.skplanetoneid.com','skpPortal');
					case 'STOP' :
						if ( ocMsg ) {
							alert(ocMsg.split("|").join('\n'));
						}
					case '' :
						$ocbObj.html('<a href="#" onclick="IncFooter.rightWingBanner.loadMyOCBPoint();doCommonStat(\''+this.areaCodePre+'RW0102\');return false" ><span>OK cashbag</span>����Ʈ��ȸ</a>');	//������ �߰�
						break;
					default :
						$ocbObj.html(
								'<span>OK cashbag</span><em><a href="http://www.okcashbag.com/mycashbag/point/myPointDetail.do" target="_blank" title="��â ����">'
								+getCommaSplit(point) +
								'P</a></em></a><button type="button" onclick="IncFooter.rightWingBanner.loadMyOCBPoint(); return false;">����Ʈ ���ΰ�ħ</button></a>'
						);
						break;
				}
				break;
			case 'U' :
				$ocbObj.html('<a href="'+ isOCBReturnURL +'" onclick="SKPlaunchCenter(this.href, \'oneIDPortal\', 1024, 768, \'yes\'); return false;"><span>OK cashbag</span>�̿��ϱ�</a>');
				break;
			case 'S' :
				$ocbObj.html('<a href="javascript:alert(\'�����ȸ���� ��� OKĳ���� ��å�� ���� One ID����� �ܾ���ȸ�� �Ұ��մϴ�. �ֹ������� ī���ȣ ������ OKĳ���� �ܾ���ȸ�� �����մϴ�.\');"><span>OK cashbag</span>�̿��ϱ�</a>');
				break;
		}

		if ( $ocbObj.html() != '' )
		{
			$ocbObj.show();
		}
	},*/
	wingBannerPosition : function() {
		// �ʱ� ���� �� ���� ����
		var _initTop = 10;
		if(this.area == 'main') {
			_initTop = 0;
		}
		if ( jQuery("#locationWrap").size() > 0) {
			if  ( document.location.host == 'beauty.11st.co.kr' ) {	// ��Ƽ11���� �߰�����
				_initTop = -32;
			} else if (jQuery("#inHeader_v3").size() == 0 && jQuery("#fashion_deptW").size() == 0) { //�����ȭ��, �мǹ�ȭ�� ���� ó��
				_initTop = 10;
			}
		} else if ( document.location.host == 'shop.11st.co.kr' ) {
			var _miniTop = jQuery('#mini_top');
			if ( _miniTop.size() > 0  ) {
				_initTop = _miniTop.height()+15;
			} else {
				_initTop = 109;
			}
		} else if ( document.location.host == 'deal.11st.co.kr' ) {
			var $divTop = jQuery("#layer_wingRTop");
			if(typeof($divTop ) != 'undefined' && $divTop.position() != null) {
				_initTop = $divTop.position().top;
			}else{
				_initTop = 11;
			}
		} else if(jQuery("#shocking_deal_navi").size() > 0) {		//��ŷ�� �߰� ����
			_initTop = 11;
		} else if(HeaderGnb.getChannel == 'DEPARTFS') {//�мǹ�ȭ��
			_initTop = 20;
		}else if(jQuery("#pageNm").val()=='martFreshCorner' || jQuery("#pageNm").val()=='martFrequentlyCorner') {//��Ʈ �ڳ�
			_initTop = 231;
		}else if(jQuery("#pageNm").val()=='martBestCorner' || jQuery("#pageNm").val()=='martPromotionCorner' || jQuery("#pageNm").val()=='myMartSub') {//��Ʈ �ڳ�
			_initTop = 279;
		} else if(jQuery('#plusZoneNavi').size() > 0){		// ������/������
			_initTop = jQuery('#plusZoneNavi').attr('flag') == 'cpn' ? 154 : 206;
		}else if(jQuery('#trip_header').data('page') == 'MAIN'){
			_initTop = 578;
		}else if(jQuery('#trip_header').data('page') == 'PLN'){
			_initTop = 251;
		}else if(jQuery('#trip_header').data('page') == 'BE'){
			_initTop = 247;
		}else if(jQuery('#trip_header').data('page') == 'DE'){
			_initTop = 37;
		}

		jQuery(window).scroll(function() {
			var sct = (document.body.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
			if(isIE6){
				if(sct <= WBTopPosition){
					jQuery("#wingBnr2").css("position","absolute");
					jQuery("#wingBnr2").css("top",_initTop);
				}
				else{
					jQuery("#wingBnr2").css("position","absolute");
					jQuery("#wingBnr2").css("top",sct - WBTopPosition);
				}
			}else{
				if(sct <= WBTopPosition  + _initTop){
					jQuery("#wingBnr2").css("position","absolute");
					jQuery("#wingBnr2").css("top",_initTop);
				}
				else
				{
					if(document.body.scrollWidth <= 1160){
						jQuery("#wingBnr2").css("position","absolute");
						jQuery("#wingBnr2").css("top",sct - WBTopPosition);
					}else{
						jQuery("#wingBnr2").css("position","fixed");
						jQuery("#wingBnr2").css("top",WBMINUS+8);
					}
				}
			}
		});

		if ( _initTop != 0 ) {
			jQuery('#wingBnr2').css('top', _initTop);
		}
	},
	initInfoLayer : function() {
		var _this = this;
		var $wrap;
		var $btns;
		var $layerCloseBtn;

		var data = {
			isShowInfo : false,
			clickData : -1,
			cntlayer : -1
		};

		//if(IS_OVER_1024) {
			$wrap = jQuery('#wingBnr2');
			$btns = jQuery('#wingHgroup > ul > li', $wrap);
			$layerCloseBtn =  jQuery('.rwing_btn_layclose', jQuery('#shoppingInfoLayerWrap'));
		/*
		} else {
			$wrap = jQuery('#wingMini');
			$btns = jQuery('div > h3', $wrap);
			$layerCloseBtn =  jQuery('.rwing_btn_layclose', jQuery('#wingMini'));
		}
		*/

		$btns.each(function(idx){
			var $this = jQuery(this);
			$this.find('a').bind({
				click : function(e){
					if(_this.isLogin) {
						e = e ? e : window.event;
						e.stopPropagation ? e.stopPropagation() : e.cancelBubble= true;
						e.preventDefault();
						//if(IS_OVER_1024) {
							$btns.removeClass('selected');
						/*
						} else {
							jQuery('div', $wrap).removeClass('selected');
						}
						*/
						if (data.clickData != idx) {
							data.clickData = idx;
							//if(IS_OVER_1024) {
								$this.addClass('selected');
								_this.setMyShoppingInfo();
							/*
							} else {
								$this.parent().addClass('selected');

								if(idx ==0) { //���Ǽ�������
									_this.setMyShoppingInfo();
								} else if(idx == 1 ) { // �ֱٺ� ��ǰ
									_this.recentProduct.getPrd();
									doCommonStat(_this.areaCodePre+'RW0301');
								} else if(idx == 2) { // ��õ��ǰ
									_this.recommProduct.getPrd();
									doCommonStat(_this.areaCodePre+'RW0401');
								}

								data.cntlayer = data.clickData;
							}
							*/
							showInfoLayer(true);

						} else {
							data.clickData = -1;
							showInfoLayer(false);
						}
					} else {
						//open Login Popup
						openLogin('1');
						doCommonStat('MAZ0101');
						return;
					}
				}
			});
		});
		$layerCloseBtn.each(function(idx) {
			jQuery(this).bind({
			click : function(e){
				e = e ? e : window.event;
				e.stopPropagation ? e.stopPropagation() : e.cancelBubble= true;
				e.preventDefault();
				data.clickData = -1;
				showInfoLayer(false);
				//if(IS_OVER_1024) {
					$btns.removeClass('selected');
				/*
				} else {
					$btns.parent().removeClass('selected');
				}
				*/
			}
			});
		});

		var showInfoLayer = function(bool){
			//if(IS_OVER_1024) {
				if (data.isShowInfo != bool) {
					data.isShowInfo = bool;
					var $layer = jQuery('#wingBnr2 > #wingHgroup > #shoppingInfoLayerWrap');
					if (bool) {
						$layer.toggleClass('layview');
						TweenMax.to($layer.find('#wingLayer'), 0.3, {left:0, ease:Quint.easeOut});
					} else {
						TweenMax.to($layer.find('#wingLayer'), 0.3, {left:280, ease:Quint.easeOut, onComplete:function(){$layer.toggleClass('layview');}});
					}
				}
			/*
			} else {
				// �̴� ����ʴ� ��ü���̾� �̺�Ʈ ó��
				var $miniLayer = null;
				if (bool) {
					jQuery('#wingMini > div').find('.winglayer_wrap').removeClass('layview').find('.winglayer').css('left','280px');
					$miniLayer = jQuery('#wingMini > div').eq(data.cntlayer).find('.winglayer_wrap').addClass('layview');
					TweenMax.to($miniLayer.find('.winglayer'), 0.3, {left:0, ease:Quint.easeOut});
				} else {
					$miniLayer = jQuery('#wingMini').find('.winglayer_wrap');
					TweenMax.to($miniLayer.find('.winglayer'), 0.3, {left:280, ease:Quint.easeOut, onComplete:function(){$miniLayer.removeClass('layview');}});
				}
			}
			*/
		}

	},
	initEvent : function() {

		var _this = this;

		//��õ��ǰ,�ֱٺ���ǰ Ŭ��(ū�����)
		jQuery('div[name=wb_MainView_layer] h4').bind("click",function(evt){
			evt.preventDefault();
			var _menuTxt = jQuery(this).text();

			if(_menuTxt.indexOf("�ֱ�") >= 0){
				_this.showRecentPrdList();
				doCommonStat(_this.areaCodePre+'RW0301');

			} else if(_menuTxt.indexOf("��õ") >= 0 ) {
				_this.showRecommPrdList();
				doCommonStat(_this.areaCodePre+'RW0401');
			}
		});

		jQuery("button[name=wb_recent_deletePrd]").bind("click",function(){
			_this.recentProduct.deletePrd(jQuery(this).parent().children("a").attr("prdNo"));
		});
		jQuery("#wb_btn_recentPrd_next").bind("click",function(){
			_this.recentProduct.nextPage();
		});
		jQuery("#wb_btn_recentPrd_prev").bind("click",function(){
			_this.recentProduct.prevPage();
		});
		jQuery("#wb_btn_recomm_next").bind("click",function(){
			_this.recommProduct.nextPage();
		});
		jQuery("#wb_btn_recomm_prev").bind("click",function(){
			_this.recommProduct.prevPage();
		});
	},
	showRecentPrdList : function() {
		var _this = this;
		_this.recentProduct.getPrd();

		jQuery('#wb_recent_MainLayer').addClass('selected');
		jQuery('#wb_recomm_MainLayer').removeClass('selected');
		jQuery("#wb_recommPrd_list").css("display","none");
		jQuery("#wb_recommPrd_noList").css("display","none");
		TMCookieUtil.add(0,'WB_MENU', 'T');
	},
	showRecommPrdList : function() {
		var _this = this;
		_this.recommProduct.getPrd();

		jQuery('#wb_recomm_MainLayer').addClass('selected');
		jQuery('#wb_recent_MainLayer').removeClass('selected');
		jQuery("#wb_recentPrd_list").css("display","none");
		jQuery("#wb_recentPrd_noList").css("display","none");
		TMCookieUtil.add(0,'WB_MENU', 'S');
	},
	init : function() {
		try{
			if(!isMobile && isWingBnnr && typeof(IncFooter.rightWingBanner) != "undefined" && typeof(wingRBnnrRecomm) != "undefined"){
				//��õ��ǰ ����Ÿ ��������
				jQuery(function() {
					if(wingRBnnrRecomm && wingRBnnrRecomm.DATA && wingRBnnrRecomm.DATA.length > 0  ){
						wingRBnnrRecomm.DATA = wingRBnnrRecomm.DATA.sort(function(){return 0.5 - Math.random()});
					}
				})

				this.displayWB();
				this.initInfoLayer();
				this.initEvent();
				this.wingBannerPosition();
				this.setWingData();
			}
		}catch(e){}
	}
};
jQuery(function() {
	IncFooter.rightWingBanner.init();
});




var footerPopup = "";
function popupFromFooter(url, popupName){

	if(footerPopup == undefined || footerPopup == ""){
		footerPopup = window.open(url, popupName);
	}else{
		footerPopup = window.open(url, popupName);
		footerPopup.focus();
	}
}

// ============================= �ڵ�������
// ������ ���� ����
//080109_2 �߰�
function	 topLink()	{
	if(document.body.scrollTop)
		document.body.scrollTop = 0;
	else
		document.documentElement.scrollTop = 0;
}
//__080109_2 �߰�

// 0103 ����
function familyLink()	{
	var obj_FM = document.getElementById("familyLink_sub");
	if(obj_FM.style.display=="none") {
		jQuery("#footerWrap2").css("z-index",100);
		obj_FM.style.display="block";
	}
	else	{
		jQuery("#footerWrap2").css("z-index","");
		obj_FM.style.display="none";
	}
}
//_ 0103 ����
var divAccount = document.getElementById("layAccount");
function setY(open,classV){

	if(!classV) classV="acHeight1";
	if (classV=="acHeight1")		H=27;
	else							H=145;

	divAccount.style.height=H + "px";
}
// ============================= �ڵ�������
/** xtractor_cookie.js Start *****/
function makeXTVIDCookie() {
    if (! isXTVID()) {
        setXTVIDCookie();
	}
}

function isXTVID() {
	var vid = getXTCookie("XTVID");
	if(vid != null && vid != "") {
		return true;
	}
	return false;
}

function getXTCookie(name) {
    var cookies = document.cookie.split("; ");
    for (var i=0; i < cookies.length; i++)  {
        var cPos = cookies[i].indexOf( "=" );
        var cName = cookies[i].substring( 0, cPos );
        if ( cName == name ) {
            return unescape( cookies[i].substring( cPos + 1 ) );
        }
    }
    return "";
}

function setXTVIDCookie(){
    var randomid = Math.floor(Math.random()* 1000);
    var xtvid = "A" + makeXTVIDValue() + randomid;
	expireDate = new Date();
	expireDate.setYear(expireDate.getYear()+ 10);

	setXTCookie("XTVID", xtvid, 365*10, "/", getXDomain());
}

function setXTLIDCookie(userNo){
    setXTCookie("XTLID", userNo, -1, "/", getXDomain());
}

function removeXTCookie(name){
    setXTCookie(name, "", 0, "/", getXDomain());
}

function setXTCookie(name, value, expires, path, domain){
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expires);
    var expiresInfo = (expires < 0)? '' : todayDate.toGMTString();
    document.cookie = name + "=" +escape(value) + ";" + "path=" + path + ";domain=" + domain + ";expires="+ expiresInfo;
}

function getXDomain() {
	var host = document.domain;
	var tokens = host.split('.');
	var xdomain = tokens[tokens.length-2] + '.' + tokens[tokens.length-1];
	return (tokens[tokens.length-1].length == 2) ? tokens[tokens.length-3] + '.' + xdomain : xdomain;
}

function makeXTVIDValue() {
    var str = '';
    nowdate = new Date();
    digit = nowdate.getYear();
    if (digit < 2000) {
		digit = digit - 1900;
    } else {
		digit = digit - 2000;
	}
	str += paddingNo(digit);

    digit = nowdate.getMonth() + 1;
	str += paddingNo(digit);

    digit = nowdate.getDate();
	str += paddingNo(digit);

    digit = nowdate.getHours();
	str += paddingNo(digit);

	digit = nowdate.getMinutes();
	str += paddingNo(digit);

    digit = nowdate.getSeconds();
	str += paddingNo(digit);

    digit = nowdate.getMilliseconds();
	if ((digit <= 99) && (digit > 9)) {
        str += '0' + digit;
    } else if (digit <= 9) {
        str += '00' + digit;
    } else {
		str += '' + digit;
	}
    return str;
}

function paddingNo(val) {
	var st = '';
	if (val <= 9) {
		st += '0' + val;
	} else {
		st = '' + val;
	}
	return st;
}

try  {
	var t_prd_list = "";
	var t_cells = document.getElementsByTagName("a");
	var prdNoReg = new RegExp("prdNo=[0-9]*","g");
	var t_prePrdNo = ""
	for (var i = 0; i < t_cells.length; i++) {
		var t_link = t_cells[i].getAttribute("href");
		if ( t_link == null ) continue;
		var t_prdNos = t_link.match( prdNoReg );
		var t_prdNo = ""
		if ( t_prdNos != null && t_prdNos.length > 0 ) {
			if ( t_link.indexOf("SellerProductDetail.tmall") > 0 && t_prdNos[0].length > 6 ) {
				t_prdNo = t_prdNos[0].substring( 6 );
				if ( t_prePrdNo != t_prdNo ) {
					t_prd_list = t_prd_list + t_prdNo +"^";
					t_prePrdNo = t_prdNo;
				}
			}
		}
	}
} catch (t_ex) {}

function Nethru_getCookieVal(offset)
{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function Nethru_SetCookie(name, value)
{
	var argv = Nethru_SetCookie.arguments;
	var argc = Nethru_SetCookie.arguments.length;
	var expires = (2 < argc) ? argv[2] : null;
	var path = (3 < argc) ? argv[3] : null;
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;

	document.cookie = name + "=" + escape (value)
	                                + ((expires == null) ? "" : ("; expires="+expires.toGMTString()))
	                                + ((path == null) ? "" : ("; path=" + path))
	                                + ((domain == null) ? "" : ("; domain=" + domain))
	                                + ((secure == true) ? "; secure" : "");
}

function Nethru_GetCookie(name)
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;

	while (i < clen) {
 		var j = i + alen;
 		if (document.cookie.substring(i, j) == arg)
    			return Nethru_getCookieVal (j);

 		i = document.cookie.indexOf(" ", i) + 1;
 		if (i == 0)
    			break;
 	}

	return null;
}

function Nethru_makePersistentCookie(name,length,path,domain)
{
	var today = new Date();
	var expiredDate = new Date(2020,1,1);
	var cookie;
	var value;

	cookie = Nethru_GetCookie(name);
	if ( cookie ) {		//�̹� �����ϴ��� Ȯ��
   		return 1;
	}

	var values = new Array();
	for ( i=0; i < length ; i++ ) {
		values[i] = "" + Math.random();
	}

	value = today.getTime();

	// use first decimal
	for ( i=0; i < length ; i++ ) {
		value += values[i].charAt(2);
	}

	Nethru_SetCookie(name,value,expiredDate,path,domain);
}

function Nethru_getDomain() {
	var _host   = document.domain;
	var so = _host.split('.');
	var dm  = so[so.length-2] + '.' + so[so.length-1];

	return (so[so.length-1].length == 2) ? so[so.length-3] + '.' + dm : dm;
}

var Nethru_domain  = Nethru_getDomain();

Nethru_makePersistentCookie("PCID",10,"/",Nethru_domain);

// Ư������ ġȯ
function fncRemoveScriptTag(str){
	var specialChars='<>()';
	var result=str;
	var i, j;

	if(result != null){
		if(result.indexOf("script") >= 0 || result.indexOf("iframe") >= 0 || result.indexOf("alert") >= 0)
		for (i = 0; i < result.length; i++) {
			for (j = 0; j < specialChars.length; j++) {
				if (result.charAt(i) == specialChars.charAt(j))
					result = result.replace(result.charAt(i), " ");
			}
		}
	}

	return result;
}

/*
jQuery(document).ready(
	function() {
		var acceptCookie = 'JSESSIONID,WMONID,Pointory,WB_DEFAULT,TMALL_STATIC,TMALL_KEY_VALUE,TMALL_AUTH,XSITE,PCID,PARTNER_CD';
		acceptCookie += ',TP,TD,TT,TM,TW,referer,SAVE_ID,EVNTCDNO,XSITE_DETAIL,SKP_SSO,adC,nfnl';
		acceptCookie = ',' + acceptCookie +',';

		var cookieArr = document.cookie.split(';');
		var date = new Date();
		date.setDate(date.getDate() - 1);

		for (var cIdx = 0; cIdx < cookieArr.length; cIdx++) {
			var cKey = ',' + trim(cookieArr[cIdx].substring(0,cookieArr[cIdx].indexOf("="))) + ',';
			if ( acceptCookie.indexOf( cKey ) < 0 ) {
				document.cookie = cKey + '=; domain=.11st.co.kr; path=/; expires=' + date.toGMTString();
			}
		}
	}
);
*/

//PCID Log
/*
jQuery(document).ready(
	function()
	{
		try
		{
			var pcidActDt = TMCookieUtil.getSubCookie(2, "PCID_ACT_DT");
			if ( pcidActDt.length == 10  )
			{
				var nowDt = new Date();
				var cookie = new Date(
									pcidActDt.substring(0,4)
									, Number(pcidActDt.substring(4,6))-1
									, Number(pcidActDt.substring(6,8))
									, Number(pcidActDt.substring(8,10))
								);
				var timeDiff = (nowDt.getTime() - cookie.getTime()) / 1000 / 60 / 60;

				if ( timeDiff > 12 )
				{
					pcidActDt = "";
				}
			}
			else
			{
				pcidActDt = '';
			}

			if ( pcidActDt == '' )
			{
				var ajaxUrl = "http://www.11st.co.kr/commons/FooterAjaxAction.tmall?method=insertPcidActLog";
				jQuery.ajax(
					{
						url: ajaxUrl,
						dataType: "jsonp",
						success: function(data){}
					}
				);
			}
		} catch(e){}
	}
);
*/

jQuery(document).ready(
		function() {
			try {
				var isCheck = TMCookieUtil.isExist(0, 'scrnChk');

				if ( !isCheck ) {
					var	i =	new	Image();
					var protocol = window.location.protocol;
					var width = window.screen.width;
					var height = window.screen.height;
					i.src =	protocol + '//www.11st.co.kr/st/screen.st?resolution=' + width + 'x' + height + '&isMobile=n';
					TMCookieUtil.add(0, 'scrnChk', 'Y');
				}
			} catch (ex) {}
		}
	);

