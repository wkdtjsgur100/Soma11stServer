
var HeaderGnb = {};

HeaderGnb.getChannel = function() {
	var url = document.URL;
	if (url.indexOf("http://www.11st.co.kr/browsing/BrandHomeAction") != -1 || url.indexOf("http://www.11st.co.kr/browsing/BrandSearchAction") != -1 || url.indexOf("&gnbType=brand11") != -1){
		return 'BRAND11';
	} else if (url.indexOf("www.11st.co.kr/mart/") != -1 || url.indexOf("&gnbType=mart") != -1){
		return 'MART';
	} else if (url.indexOf("deal.11st.co.kr") != -1){
	 	return 'DEAL';
	} else if (url.indexOf("soho.11st.co.kr") != -1){
	 	return 'SOHO';
	} else if (url.indexOf("DTAction.tmall?ID=STARSOHO") != -1 || url.indexOf("DTAction.tmall?ID=TOPSOHO") != -1 || url.indexOf("DTAction.tmall?ID=FASHIONDNA") != -1 || url.indexOf("DTAction.tmall?ID=KOREASPA") != -1 ||url.indexOf("DTAction.tmall?ID=MISSY") != -1 ){
		return 'SOHO';
	} else if (url.indexOf("tour.11st.co.kr/html/vertical/tourMain.html") != -1 || url.indexOf("tour.11st.co.kr/tour/") != -1 || typeof(TOUR_HEADER) != 'undefined' ){
	 	return 'TOUR';
	} else if (url.indexOf("www.11st.co.kr/html/HyundaiDepart.html") != -1 || url.indexOf("HyundaiDeptAction.tmall") != -1){
	 	return 'DEPARTHD';
	} else if (url.indexOf("FashionDept") != -1){
	 	return 'DEPARTFS';
	} else if (url.indexOf("shop.11st.co.kr") != -1){
	 	return 'SHOP';
	} else if (url.indexOf("ticket.11st.co.kr") != -1){
	 	return 'TICKET';
	} else if (url.indexOf("books.11st.co.kr") != -1){
	 	return 'BOOKS';
	} else {
		return '11ST';
	}
};

HeaderGnb.makeGnb = {
	area : '',
	isLogin : funcCheckIsLogin(),
	channel : HeaderGnb.getChannel(),
	areaCodePre : 'MAINS',

	//��� �ٷΰ��� �׺���̼�
	makeSkipNaviElement : function() {
		var element = [];
		if(this.area == 'main') {
			element.push('<nav id="skipNavi">');
		} else {
			element.push('<div id="skipNavi">');
		}
			element.push('	<a href="#tSearch"><span>���հ˻� �ٷΰ���</span></a>');
			element.push('	<a href="#layBodyWrap"><span>���� �ٷΰ���</span></a>');
		if(this.area == 'main') {
			element.push('</nav>');
		} else {
			element.push('</div>');
		}
		return element.join('');
	},
	//�ؿ�IP �� �ȳ����̾�, Ű���θ�� ���
	makeGnbPromoElement : function() {
		var element = [];

		element.push('<div class="global_top_cntr" id="global_top_cntr" style="display:none;">');
		element.push( '	<div>');
		element.push('		<p>Please select your preferred language. <em class="c_gbl"><a href="http://english.11st.co.kr/html/en/main.html" onclick="StartPageManager.english(); return false;">English</a></em> or <em class="c_kor"><a href="http://www.11st.co.kr/html/main.html" onclick="StartPageManager.korean(); return false;">Korean</a></em></p>');
		element.push('		<input type="button" value="close layer" onclick="StartPageManager.hide();">');
		element.push('	</div>');
		element.push('	<div class="choice_ko_en">For International Shipping service, click here <span>(<a href="http://english.11st.co.kr/en/commons/CommonAbout.tmall?method=getInternationalSS&tab=1">English</a>, <a href="http://www.11st.co.kr/html/browsing/worldDelivery/worldDeliveryMain.html">Korean</a>)</span></div>');
		element.push('</div>');

		element.push('<div class="global_deliv_top lang_ko" id="global_deliv_top" style="display:none;">');
		element.push('	<div class="inner">');
		element.push('		<h2><span><span>�������� ����</span></span></h2>');
		element.push('		<ul>');
		element.push('			<li class="glb_serv1"><a href="http://www.11st.co.kr/browsing/WorldDeliverySubAction.tmall?method=getWorldDeliveryInfo&viewFlag=info1"><span><span>�������� �̿� ���̵�</span></span></a></li>');
		element.push('			<li class="glb_serv2"><a href="http://www.11st.co.kr/browsing/WorldDeliverySubAction.tmall?method=getWorldDeliveryInfo&viewFlag=info4"><span><span>�ؿܹ�ۺ� �ȳ�</span></span></a></li>');
		element.push('			<li class="glb_serv3"><a href="http://www.11st.co.kr/html/browsing/worldDelivery/worldDeliveryNatiRnk1Img.html"><span><span>������ �Ǹŷ�ŷ</span></span></a></li>');
		element.push('		</ul>');
		element.push('		<label for="noView"><input type="checkbox" id="noView" onclick="StartPageManager.hideDlvInfoLayer(true);">�� �̻� ������ �ʱ�</label>');
		element.push('		<button class="btn_close" onclick="StartPageManager.hideDlvInfoLayer(false);"><span>�������� ���� ���̾� �ݱ�</span></button>');
		element.push('	</div>');
		element.push('</div>');

		//Ű���θ�� ���
		element.push('<div class="key_promotion" id="mainPromotion_area" style="display:none"></div>');

		element.push('<script type="text/javascript">');
		element.push('	jQuery(document).ready(function() {');
		element.push('		setTimeout("StartPageManager.init()", 1000);');
		element.push('	});');
		element.push('</script>');

		return element.join('');
	},
	//GNB ��� ���� �޴�
	makeMenuLUtilElement : function() {
		var _this = this;

		//�޴� ���̶���Ʈ ����
		var setChannel = function(){

			if ( _this.channel == 'BRAND11' ){
				jQuery("#lUtilBrand11").html('<strong>�귣��</strong>');
			} else if ( _this.channel == 'MART' ){
				jQuery("#lUtilMart").html('<strong>��Ʈ</strong>');
			} else if ( _this.channel == 'TOUR'){
				jQuery("#lUtilTour").html('<strong>����</strong>');
			} else if ( _this.channel == 'TICKET' ){
			 	jQuery("#lUtilTicket").html('<strong>Ƽ��</strong>');
			} else if ( _this.channel == 'BOOKS' ){
			 	jQuery("#lUtilBook").html('<strong>����</strong>');
			} else {
				jQuery("#lUtil11st").html('<strong>11����</strong>');
			}
		}

		//�ٷΰ��� ON/OFF
		var setDirectOnOff = function(){
			var $obj = jQuery("#go11st_wrap");
			if(getBookMarkYn()) {
				$obj.addClass("direct_11st_on");
			}
			jQuery("#go11st_wrap").show();
		}

		//11���� �ΰ� ������ ���� ����������
		var logoUtilChannel = ['SOHO', 'DEPARTHD', 'DEPARTFS', 'SHOP', 'DEAL'];
		var logoClassName = 'navi_11st';
		var element = [];
		element.push('	<ul class="main_menu">');
		element.push('		<li><a id="lUtil11st" href="http://www.11st.co.kr/html/main.html" onclick="goStatUrl(this.href, \'' + _this.areaCodePre + 'CT0101\');return false;" class="'+logoClassName+'">11����</a></li>');
		element.push('		<li><a id="lUtilBook" href="http://books.11st.co.kr" onclick="goStatUrl(this.href, \'' + _this.areaCodePre + 'CT0103\');return false;" class="navi_book">����</a></li>');
		element.push('		<li><a id="lUtilTour" href="http://tour.11st.co.kr/html/vertical/tourMain.html" onclick="goStatUrl(this.href, \'' + _this.areaCodePre + 'CT0104\');return false;" class="navi_tour">����</a></li>');
		element.push('		<li><a id="lUtilTicket" href="http://ticket.11st.co.kr/11st/Main.asp" onclick="goStatUrl(this.href, \'' + _this.areaCodePre + 'CT0105\');return false;" class="navi_ticket">Ƽ��</a></li>');
		element.push('		<li><a id="lUtilMart" href="http://www.11st.co.kr/mart/MartCatalogMainAction.tmall?method=showMain" onclick="goStatUrl(this.href, \'' + _this.areaCodePre + 'CT0106\');return false;" class="navi_mart">��Ʈ</a></li>');
		element.push('		<li><a id="lUtilBrand11" href="http://www.11st.co.kr/browsing/BrandHomeAction.tmall?method=getBrandTrendMain" onclick="goStatUrl(this.href, \'' + _this.areaCodePre + 'CT0107\');return false;" class="navi_brand11st">�귣��</a></li>');
		element.push('	</ul>');

		//�ٷΰ���
		element.push('	<div class="direct_11st2" id="go11st_wrap" style="display:none">');
		element.push('		<button type="button"><span id="direct_txt">�ٷΰ���</span></button>');
		element.push('		<div class="inner_conts" id="lay_direct"></div>');
		element.push('	</div>');

		// �� �ٿ�ε�
		element.push('	<a href="http://www.11st.co.kr/contents/Contents.tmall?method=dispContents&spceid=2103" '
						+'onclick="goStatUrl(this.href, \'' + _this.areaCodePre + 'UT0108\');return false;" class="app_down" title="��â����" target="_blank">�۴ٿ�ε�</a>');

		jQuery(function($){
			setDirectOnOff();
			setChannel();

			jQuery('#go11st_wrap > button').bind('click', function(){
				var element = [];

				if(getBookMarkYn()) {
					element.push('			<div class="dir_top">11���� <em id="gbox_text">�ٷΰ��� ������</em>�Դϴ�.</div>');
				} else {
					element.push('			<div class="dir_top">11���� <em id="gbox_text">�ٷΰ��� ��������</em>�Դϴ�.</div>');
				}
				if( _this.channel != 'TOUR' ) {
					element.push('			<div id="divDirectBenefit">');
					if(FooterData.directLayerBenefit != undefined) { //�ٷΰ��� ��������
						element.push(FooterData.directLayerBenefit);
					}
					element.push('			</div>');
					element.push('			<h2 class="tit">�ٷΰ���� �湮�ϴ� ���</h2>');
					element.push('			<ul class="dir_method">');
					element.push('				<li><a href="#" onclick="FooterComm.installDirectVisit(\'' + _this.areaCodePre + 'UT0103\');return false">�ٷΰ���<br>��ġ�ϱ�</a></li>');
					element.push('				<li><a href="#" onclick="setHomePage();doCommonStat(\'' + _this.areaCodePre + 'UT0104\');return false">����������<br>�����ϱ�</a></li>');
					element.push('				<li><a href="#" onclick="FooterComm.addFavorite();doCommonStat(\'' + _this.areaCodePre + 'UT0105\');return false">���ã��<br>�߰��ϱ�</a></li>');
					element.push('				<li><a href="#" onclick="FooterComm.clip11stUrl();doCommonStat(\'' + _this.areaCodePre + 'UT0106\');return false">URL����<br>�Է��ϱ�</a></li>');
					element.push('			</ul>');
					element.push('			<div class="btn_wrap">');
					element.push('				<a href="http://www.11st.co.kr/browsing/MallPlanDetail.tmall?method=getMallPlanDetail&planDisplayNumber=905236" onclick="doCommonStat(\''+_this.areaCodePre+'UT0107\')" class="defbtn_med mdtype4"><span>���� �󼼺���</span></a>');
					element.push('			</div>');
				} else {
					element.push('			<p>�ٷΰ������� �� �پ��� �߰�������<br> ������ �� �ֽ��ϴ�.</p>');
					element.push('			<a href="#" onclick="ShortcutGnb(\'' + _this.areaCodePre + 'UT0103\');return false" class="defbtn_sm dtype4"><span>�ٷΰ��� ��ġ�ϱ�</span></a>');
					jQuery('#lay_direct').addClass('inner_tour');
				}

				element.push('			<button type="button" class="btn_close" onclick="jQuery(\'#go11st_wrap\').toggleClass(\'selected\');">�ٷΰ��� ���̾� �ݱ�</button>');
				jQuery('#lay_direct').html(element.join(''));
				jQuery('#go11st_wrap').toggleClass('selected');

				if(getBookMarkYn()) {
					doCommonStat(_this.areaCodePre + 'UT0101');
				} else {
					doCommonStat(_this.areaCodePre + 'UT0102');
				}
			});
		});
		return element.join('');
	},
	//GNB ��� ������ �޴�
	makeMenuRUtilElement : function() {
		var _this = this;
		var element = [];
		var loginReturnURL = "";

		if ( typeof _ORDER_URL_ == 'undefined' ) {
			_ORDER_URL_ = _GNB_CONTEXT_PATH_;
		}
		if ( typeof(_ORDER_HIS_URL_) == 'undefined' ) {
			_ORDER_HIS_URL_ = _ORDER_URL_ + '/order/OrderList.tmall';
		}

		if(typeof(_RETURN_URL_) != 'undefined') {
			loginReturnURL = _RETURN_URL_;
		}

		element.push('	<ul class="utilmenu2">');
		if(this.isLogin) {
			element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/login/Logout.tmall" onclick="logout(\''+_this.areaCodePre+'UT0202\', \''+loginReturnURL+'\');return false;">�α׾ƿ�</a></li>');
			element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/register/memInfoEditForm.tmall?method=getMemberInfo&protocol=https" onclick="goMemberInfoPages();return false;">ȸ������</a></li>');
		} else {
			element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/login/Login.tmall" onclick="login(\''+_this.areaCodePre+'UT0201\', \''+loginReturnURL+'\');return false;">�α���</a></li>');
			element.push('		<li><a href="'+_GNB_CONTEXT_PATH_+'/register/memberSubscribeOneIDForm.page" onclick="join(\''+_this.areaCodePre+'UT0301\');return false;">ȸ������</a></li>');
		}

		if(this.channel == 'TOUR') {
			element.push('		<li id="utMy11st"><a href="http://www.11st.co.kr/vertical/TourReservationSettleList.tmall?method=displayTourReservationSettleList" onclick="goStatUrl(this.href, \'TOA0201\');return false;">���� ����11����</a>');
			element.push('		<li><a href="http://help.11st.co.kr" onclick="goStatUrl(this.href, \'TOA0110\');">������</a></li>');
		} else {
			element.push('		<li class="ut_my11st" id="utMy11st"><a href="'+ _MY11ST_URL_ +'" onclick="doCommonStat(\''+_this.areaCodePre+'UT0401\');">����11����</a>');
			element.push('		<div>');
			element.push('			<ul id="mYInFo_11st">');
			element.push('				<li><a href="'+_ORDER_HIS_URL_ +'" onclick="doCommonStat(\''+_this.areaCodePre+'UT0402\');">�ֹ������ȸ</a></li>');
			element.push('				<li><a href="'+_GNB_CONTEXT_PATH_ +'/loyalty/AuthCouponGiftDtls.tmall" onclick="doCommonStat(\''+_this.areaCodePre+'UT0403\');">����</a></li>');
			element.push('				<li><a href="'+_GNB_CONTEXT_PATH_ +'/register/getGradeInfo.tmall?method=getGrade" onclick="doCommonStat(\''+_this.areaCodePre+'UT0404\');">����� ��� ����</a></li>');
			element.push('				<li><a href="'+_GNB_CONTEXT_PATH_ +'/minimall/MyMiniMallAction.tmall?method=getMyMiniMall" onclick="doCommonStat(\''+_this.areaCodePre+'UT0406\');">�ܰ�̴ϸ�</a></li>');
			element.push('			</ul>');
			element.push('		</div>');
			element.push('		</li>');
			element.push('		<li><a href="'+ _SHOPPINGCART_URL_ +'" onclick="doCommonStat(\''+_this.areaCodePre+'UT0501\');">��ٱ���</a></li>');
			element.push('		<li><a href="http://help.11st.co.kr" onclick="doCommonStat(\''+_this.areaCodePre+'UT0601\');">������</a></li>');
		}

		element.push('		<li class="ut_insub"><a href="'+_SOFFICE_URL_+'" onclick="goStatUrl(this.href, \''+_this.areaCodePre+'UT0702\');return false;">�������ǽ�</a>');
		element.push('		<div>');
		element.push('			<ul id="sellerOfficeLayer">');
		element.push('				<li><a href="'+_SOFFICE_URL_ + '/adcentre/AdvertMain.tmall" onclick="goStatUrl(this.href, \''+_this.areaCodePre+'UT0704\');return false;">�Ǹ��ڱ�����</a></li>');
		element.push('				<li><a href="'+_GNB_CONTEXT_PATH_ + '/brandadcenter/Main.tmall" onclick="goStatUrl(this.href, \''+_this.areaCodePre+'UT0705\');return false;">�귣�層����</a></li>');
		element.push('				<li><a href="'+_SELLER_URL_+'" onclick="goStatUrl(this.href, \''+_this.areaCodePre+'UT0706\');return false;"><em>�Ǹ��ڼ��񽺼���</em></a></li>');
		element.push('				<li><a href="http://shop.11st.co.kr/minimall/AuthMiniMallAction.tmall?method=goRepMinimallMng" onclick="goStatUrl(this.href, \''+_this.areaCodePre+'UT0707\');return false;">�̴ϸ�����</a></li>');
		element.push('			</ul>');
		element.push('		</div>');
		element.push('		</li>');
		
		element.push('		<li><a href="http://english.11st.co.kr/html/en/main.html" onclick="goStatUrl(this.href, \''+_this.areaCodePre+'UT0801\');">English</a></li>');
		element.push('		<li><a href="http://www.11street.com.cn" target="_blank" onclick="doCommonStat(\''+_this.areaCodePre+'UT0802\');">&#x4E2D;&#x56FD;&#x8BED;</a></li>');
		element.push('	</ul>');
		jQuery(function() {
			_this.buttonEvent();
		});
		return element.join('');
	},
	//GNB 11���� BI
	makeBIElement : function() {
		var _this = this;
		var element = [];

		if (_this.area=="main") {

			/*if (VIEW_BI == "dualBI") {
				element.push('<a href="'+_GNB_CONTEXT_PATH_+'/html/main.html" onclick="doCommonStat(\''+_this.areaCodePre+'GN0101\');">');
				element.push('	<img src="' + _UPLOAD_URL_ + BI_R_IMG + '" border="0" alt="11����">');
				element.push('</a>');
				element.push('<a href="' + BI_L_URL + '" onclick="doCommonStat(\''+_this.areaCodePre+'GN0102\');">');
				element.push('<img src="' + _UPLOAD_URL_ + BI_L_IMG + '" border="0" alt="11����">');
				element.push('</a>');
			} else if (VIEW_BI == "imgSeasonBI") {
				element.push('<a href="'+_GNB_CONTEXT_PATH_+'/html/main.html" onclick="doCommonStat(\''+_this.areaCodePre+'GN0101\');">');
				element.push('<img src="' + _UPLOAD_URL_ + BI_R_IMG + '" border="0" alt="11����">');
				element.push('</a>');
			} else {
				element.push('<a href="'+_GNB_CONTEXT_PATH_+'/html/main.html" onclick="doCommonStat(\''+_this.areaCodePre+'GN0101\');"><span id="typeBack">11����</span></a>');
			}

			if (VIEW_BI=="dualBI" || VIEW_BI=="imgSeasonBI") {
				element.push('<script type="text/javascript">');
				element.push('	jQuery("#gnbBILogo").addClass("season_type");');
				element.push('</script>');
			}*/

			element.push('<a href="'+_GNB_CONTEXT_PATH_+'/html/main.html" onclick="doCommonStat(\''+_this.areaCodePre+'GN0101\');">11����</a>');
		}else {
			element.push('<a href="'+_GNB_CONTEXT_PATH_+'/html/main.html" onclick="doCommonStat(\''+_this.areaCodePre+'GN0101\');">11����</a>');
		}

		return element.join('');
	},
	//�˻�â ��� �ڳ�
	makeCornerNaviElement : function() {
		var _this = this;
		var element = [];
		var k = 0;

		element.push('	<ul class="best_link">');
		element.push('		<li><a href="#" onclick="cupnZone(\''+_this.areaCodePre+'GN0201\');return false">����/������</a></li>');
		element.push('		<li><a href="#" onclick="best(\''+_this.areaCodePre+'GN0202\');return false">����Ʈ</a></li>');
		element.push('		<li><a href="#" onclick="deal(\''+_this.areaCodePre+'GN0205\');return false">��ŷ��</a></li>');
		element.push('		<li><a href="#" onclick="nowDelivery(\''+_this.areaCodePre+'GN0210\');return false">NOW���</a></li>');
		element.push('	</ul>');

		return element.join('');
	},
	//GNB �˻� ����
	makeSearchElement : function() {
		var _this = this;
		var element = [];

		element.push('<fieldset id="tSearch">');
		element.push('<legend><label for="AKCKwd">���հ˻�</label></legend>');
		element.push('		<form name="GNBSearchForm" id="AKCFrm" autocomplete="off" action="http://search.11st.co.kr/SearchPrdAction.tmall" method="get" onSubmit="goSearchFromGNB(); return false;" target="_top">');
		element.push('			<input type="hidden" name="method" value="getTotalSearchSeller">');
	if (this.area == "search") {
		element.push('			<input type="hidden" name="targetTab" value=' + TARGET_TAB + '>');
		element.push('			<input type="hidden" name="semanticKeyword" id="semanticKeyword" value=' + SEMANTIC_KEYWORD + '>');
		element.push('			<input type="hidden" name="search" value="">');
	}else {
		element.push('			<input type="hidden" name="targetTab" value="T">');
	}
		element.push('			<input type="hidden" name="isGnb" value="Y">');
		element.push('			<input type="hidden" name="prdType" value="">');
		element.push('			<input type="hidden" name="category" value="">');
		element.push('			<input type="hidden" name="cmd" value="">');
		element.push('			<input type="hidden" name="pageSize">');
		element.push('			<input type="hidden" name="lCtgrNo" value="">');
		element.push('			<input type="hidden" name="mCtgrNo" value="">');
		element.push('			<input type="hidden" name="sCtgrNo" value="">');
		element.push('			<input type="hidden" name="dCtgrNo" value="">');
		element.push('			<input type="hidden" name="fromACK" value="">');
		element.push('			<input type="hidden" name="semanticFromGNB" value="">');
		element.push('			<input type="hidden" name="gnbTag" value="TO">');
		element.push('			<input type="hidden" name="schFrom" value="">');
		element.push('			<input type="hidden" name="ID" value="">');
		element.push('			<input type="hidden" name="ctgrNo" value="">');
		element.push('			<input type="hidden" name="srCtgrNo" value="">');

	if (this.area == "extra") {
		element.push('			<input type="hidden" name="charset" value="' + getHtmlCharset() + '">');
	}

		element.push('			<div class="search_inner">');
		element.push('				<div class="inner_wrap">');
		element.push('					<div class="choice_menu" id="headSearchTypeTab">');
	if (this.area == "search") {
		element.push('						<input type="button" value="' + TARGET_TAB_NM + '" class="choice_tit">');
	}else {
		element.push('						<input type="button" value="���հ˻�" class="choice_tit">');
	}
		element.push('						<ul>');
		element.push('							<li><a href="#" onclick="setSearchTarget(\'T\');return false"><em>���հ˻�</em></a>');
		element.push('							<ul>');
		element.push('								<li><a href="#" onclick="setSearchTarget(\'N\');return false"><em>��ǰ��ȣ</em></a>');
		element.push('								<li><a href="#" onclick="setSearchTarget(\'SL\');return false"><em>�Ǹ���</em></a>');
		element.push('							</ul>');
		element.push('							<li><a href="#" onclick="setSearchTarget(\'CONTENTS\');return false"><em>���θ���</em></a></li>');
		element.push('							<li class="site_line"><a href="#" onclick="setSearchTarget(\'MO\');return false"><em>����11����</em></a></li>');
		element.push('							<li><a href="#" onclick="setSearchTarget(\'TOUR11ST\');return false"><em>����11����</em></a></li>');
		element.push('							<li><a href="#" onclick="setSearchTarget(\'TICKET\');return false"><em>Ƽ��11����</em></a></li>');
		element.push('						</ul>');

	if (this.area != "extra") {
		element.push('						<div class="layer_def_a3 have_close" style="display:none;"  id="noResultMsgLayer">');
		element.push('							<div class="layer_conts" id="noResultMsgLayerCont"></div>');
		element.push('							<button class="btn_layclose" onclick="jQuery(\'#noResultMsgLayer\').hide();" type="button">���̾� �ݱ�</button>');
		element.push('						</div>');
	}
		element.push('					</div>');

	if (this.area=="search") {
		element.push('					<input type="text" class="text_search" name="kwd" value="' + SRCH_KWD + '" id="AKCKwd" onfocus="clearAdUrl();searchManager.init(true);">');
	}else if (this.area=="extra") {
		element.push('					<input type="text" class="text_search placetx" name="kwd" value="" id="AKCKwd" onFocus="clearAdUrl();" onKeyPress="if ( event.keyCode == 13) goSearchFromGNB(); " style="ime-mode:active;">');
	}else {
		element.push('					<input type="text" class="text_search placetx" name="kwd" value="" id="AKCKwd" onfocus="clearAdUrl();searchManager.init(true);">'); //tInSearch AKCKwd
	}
		element.push('					<input type="hidden" name="keyword" value=""/>');
		element.push('					<input type="hidden" name="adUrl" id="adUrl" value="">');
		element.push('					<input type="hidden" name="adKwdTrcNo" id="adKwdTrcNo" value="">');
		element.push('					<input type="hidden" name="adPrdNo" id="adPrdNo" value="">');

	if (this.area != "extra") {
		element.push('					<div id="auto_seachTopDiv" class="auto_tree" style="display:none">');
		element.push('						<button type="button" class="defbtn_sm dtype7" id="btnRecentKwd" style="display:none"><span>�ֱ� �˻���</span></button>');
		element.push('						<iframe id="autoArea" src="/html/blank.html" frameborder="0" scrolling="no" title="�˻� �ڵ� �ϼ� �� �˻��� Ʈ��" style="display:inline; height: 0px; "></iframe>');
		element.push('					</div>');
	}

		element.push('				</div>');
		element.push('			</div>');
		element.push('		</form>');
		element.push('		<div id="gnbTxtAd_divId" title="MA01I"><button type="button" class="btn_search" id="gnbTxtAd" onclick="goSearchFromGNB(); return false;"><span>�˻�</span></button></div>');
		element.push('</fieldset>');

		if (this.area == 'search') {
			if (noSemanticResult || noModelResult || noContentsResult) {
				var pageText = '�ø�ƽ';
				if(noContentsResult) pageText = '���θ���';
				jQuery(function() {
					jQuery("#noResultMsgLayerCont").html("�ش� Ű���忡 ���� "+pageText+" �˻� <br>����� �����ϴ�.");
					jQuery("#noResultMsgLayer").show();
					setTimeout("jQuery('#noResultMsgLayer').hide();", 10000);
				})
			}
		}
		jQuery(function() {

			var $selTab = jQuery('#headSearchTypeTab');

			jQuery('input', $selTab).bind('click', function() {
				jQuery(this).parents().find('.choice_menu').toggleClass('selected');
			});

			$selTab.find('em').each(function(idx) {
				jQuery(this).bind('click', function() {
					jQuery('input', $selTab).val(jQuery(this).text());
					$selTab.removeClass('selected');
				})
			})
		});

		return element.join('');
	},
	// ������� ���
	makeRBannerElement : function() {
		var element = [];

		element.push('		<div class="promotion_wrap2" id="gnbRBannerWrapper">');
		if (this.area == "main") {
			element.push('			<a name="bcb_conts" href="#"></a>');
			element.push('			<div class="btnctr_pn">');
			element.push('				<em name="bcb_seq"></em>/'+R_BANNER_SIZE);
			element.push('				<button type="button" class="in_prev">���� ����</button>');
			element.push('				<button type="button" class="in_next">���� ����</button>');
			element.push('			</div>');

			element.push('		<script type="text/javascript">');
			element.push('		var gnbRBnnr = new Main.gnb.rightBanner();');
			element.push('		gnbRBnnr.setData("gnbRBannerWrapper", R_BANNER_LIST);');
			element.push('		gnbRBnnr.init();');
			element.push('		</script>');
		} else {
			element.push('			<div id="dsGnbBanner" onclick="doCommonStat(\'MAINSGN0401\')"></div>');
			if (this.area=="extra") {
				element.push('			<div class="btnctr_pn" id="gnbRBannerBtn"></div>');
			}

			if (typeof(IS_AD_BNNR) != 'undefined' && IS_AD_BNNR == "Y") {
				element.push('		<script type="text/javascript">');
				element.push('		var rightBanner = new AdBanner_headerCommonJs();');
				if (typeof PRE_FIX_URL != "undefined"){
					element.push('rightBanner.setPreFixUrl(\''+PRE_FIX_URL+'\');');
				}else{
					element.push('rightBanner.setPreFixUrl(\''+ISSSL_ACTION_CONTEXT_URL+'\');');
				}

				element.push('		rightBanner.setUseAdSwitch('+_dsSeverMode+');');
				element.push('		rightBanner.setIsPriorityDisp(true);');
				element.push('		rightBanner.setAdUrl(\''+AD_URL+'\');');
				element.push('		rightBanner.init();');
				element.push('		</script>');
			}
		}
		element.push('		</div>');
		return element.join('');
	},
	//���� �������
	makeLWingBannerElement : function() {
		var _this = this;
		var element = [];

		var getAdServerBanner = function(prefixUrl, adUrl) {
			var adBanner = new AdBanner_headerCommonJs();
			adBanner.setPreFixUrl(prefixUrl);
			adBanner.setUseAdSwitch(_dsSeverMode);
			adBanner.setAdUrl(adUrl);
			adBanner.init();
			jQuery("#leftWingBanner").show();
		};

		var secondLeftWingBanner = function(){
			try {
				var element = [];
				var data = eval("LeftWingBanner");

				if(data != undefined) {
					element.push("<a href=\""+ data.URL1+"\" target=_blank>");
					element.push("<img src=\""+data.IMG1+"\" width=\"80\" height=\"150\" alt=\"" +data.TXT1+ "\" border=\"0\"></a>");
					document.getElementById("dispLeftWingBannerMiddle").innerHTML = element.join('');
				}
				jQuery("#dispLeftWingBannerMiddle").show();
			} catch(e) {}
		};

		element.push('<div class="prom_wingbnr2" id="leftWingBanner" style="display:none">');
		element.push('		<div id="dsLeftWingBannerMiddle" onclick="doCommonStat(\''+_this.areaCodePre+'LW0101\')"></div>');
		element.push('		<div id="dsLeftWingBannerBottom" onclick="doCommonStat(\''+_this.areaCodePre+'LW0102\')"></div>');
		element.push('		<div id="dispLeftWingBannerMiddle" onclick="doCommonStat(\''+_this.areaCodePre+'LW0201\')" style="display:none"></div>');
		element.push('</div>');

		if (this.area == "main") {
			jQuery(function(){
				var adUrl = '/NetInsight/text/11st/11st_all/11st_all@left_wing' + getNitmusParam(false);
				getAdServerBanner('http://ds.11st.co.kr', adUrl);
				secondLeftWingBanner();
			});
		} else {
			if (typeof(IS_LEFT_BNNR)!="undefined" && IS_LEFT_BNNR) {

				var prefixUrl;
				if (typeof PRE_FIX_URL != "undefined"){
					prefixUrl = PRE_FIX_URL;
				}else{
					prefixUrl = ISSSL_ACTION_CONTEXT_URL;
				}

				getAdServerBanner(prefixUrl, LEFT_WING_URL); //Middle Banner
				getAdServerBanner(prefixUrl, LEFT_WING_UNDER_URL); //Bottom Banner

				jQuery(function(){
					if(appVer==6.0) return; // ie 6 ������ ȭ���� ���� (appVer = headerCommonJs.js �� ����Ǿ� ����)
					var $window = jQuery(window), $leftBnnrObj = jQuery("#leftWingBanner");
					var $divTop = jQuery("#layer_wingRTop");
					var _host = document.location.host;
					var _initTop = 179;

					$window.scroll(function(){
						var position = $window.scrollTop();
						if(_host == 'deal.11st.co.kr') {
							_initTop = 41;
							if(typeof($divTop ) != 'undefined' && $divTop.position() != null){
								_initTop = $divTop.position().top;
							}
							_initTop += 137;
							position -= jQuery('#layBodyWrap').position().top-137;
						}else if(jQuery("#pageNm").val()=='martFreshCorner' || jQuery("#pageNm").val()=='martFrequentlyCorner') {//��Ʈ �ڳ�
							_initTop = 391;
						}else if(jQuery("#pageNm").val()=='martBestCorner' || jQuery("#pageNm").val()=='martPromotionCorner' || jQuery("#pageNm").val()=='myMartSub') {//��Ʈ �ڳ�
							_initTop = 439;
						} else if(jQuery('#plusZoneNavi').size() > 0){		// ������/������
							_initTop = jQuery('#plusZoneNavi').attr('flag') == 'cpn' ? 323 : 375;
						}

						//����
						if(jQuery('#trip_header').data('page') == 'MAIN'){
							_initTop = 736;
						}else if(jQuery('#trip_header').data('page') == 'PLN'){
							_initTop = 410;
						}else if(jQuery('#trip_header').data('page') == 'BE'){
							_initTop = 406;
						}else if(jQuery('#trip_header').data('page') == 'DE'){
							_initTop = 226;
						}else if(jQuery('#trip_header').data('page') == 'SUB'){
							_initTop = 199;
						}

						//�귣��11
						if(jQuery('#brand_header').data('page') == 'BR'){
							_initTop = 299;
							position += 110
						}

						var isFixed = position>_initTop ? ( typeof isLeftBnnrMove == 'undefined' || isLeftBnnrMove == true ) : false;
						var hasHScroll = $window.scrollLeft() > 0 ? true : false;
						var defaultCss = isFixed ? {position:"fixed", top:8+"px"} : {position:"absolute", top:_initTop+"px"};

						if(isFixed && hasHScroll){
							defaultCss = {position:"absolute", top: (position+8)+"px"}
						}

						$leftBnnrObj.css(defaultCss);
					});

					if(jQuery('#locationWrap').size() > 0) {
						_initTop += jQuery('#locationWrap').height() + 10;
					}
					if(_this.channel == 'SOHO') _initTop += 16;
					if(_this.channel == 'DEAL') _initTop += 5;
					if(jQuery("#pageNm").val()=='martFreshCorner' || jQuery("#pageNm").val()=='martFrequentlyCorner') {//��Ʈ �ڳ�
						_initTop = 391;
					}else if(jQuery("#pageNm").val()=='martBestCorner' || jQuery("#pageNm").val()=='martPromotionCorner' || jQuery("#pageNm").val()=='myMartSub') {//��Ʈ �ڳ�
						_initTop = 439;
					} else if(jQuery('#plusZoneNavi').size() > 0){		// ������/������
						_initTop = jQuery('#plusZoneNavi').attr('flag') == 'cpn' ? 323 : 375;
					}

					//����
					if(jQuery('#trip_header').data('page') == 'MAIN'){
						_initTop = 736;
					}else if(jQuery('#trip_header').data('page') == 'PLN'){
						_initTop = 410;
					}else if(jQuery('#trip_header').data('page') == 'BE'){
						_initTop = 406;
					}else if(jQuery('#trip_header').data('page') == 'DE'){
						_initTop = 226;
					}else if(jQuery('#trip_header').data('page') == 'SUB'){
						_initTop = 199;
					}

					//�귣��11
					if(jQuery('#brand_header').data('page') == 'BR'){
						_initTop = 299;
					}

					jQuery('#leftWingBanner')
					.css({'top':_initTop+'px'})	//��
					.show();
				});
			}
		}
		return element.join('');
	},
	makeDispLineMap : function() {
		var element = [];

		element.push('<div class="prdc_navigation" id="prdTopLineBanner" style="display:none"></div>');

		return element.join('');
	},
	//make html
	makeHtml : function() {
		var headerElement = [];

		headerElement.push(this.makeSkipNaviElement());
		headerElement.push('<hr />');
		headerElement.push('<div id="wrapBody">');	// start wrapBody

		if(this.area == 'main') {
			headerElement.push(this.makeGnbPromoElement());
		}
		if(this.area == 'main') {
			headerElement.push('	<header id="headWrap2">');	// start headWrap
		} else {
			headerElement.push('	<div id="headWrap2">');	// start headWrap
		}
		headerElement.push('		<div class="util_wrap2" id="util_area">');
		headerElement.push(this.makeMenuLUtilElement());
		headerElement.push(this.makeMenuRUtilElement());
		headerElement.push('		</div>');
		headerElement.push('		<hr>');

		headerElement.push('		<div id="defaultHeader2" class="isHere2">');
		headerElement.push('			<h1 id="gnbBILogo">');
		headerElement.push(this.makeBIElement());
		headerElement.push('			</h1>');
		
		headerElement.push('			<div class="search_wrap2">');
		headerElement.push(this.makeSearchElement());
		if(this.area != "mini") {
			headerElement.push(this.makeCornerNaviElement());
		}
		headerElement.push('			</div>');
		
		headerElement.push(this.makeRBannerElement());
		headerElement.push('		</div>');
		headerElement.push('		<hr>');

		if (isWingBnnr) {
			headerElement.push(this.makeLWingBannerElement());
		}

		if(this.area == "main") {
			headerElement.push('<script type="text/javascript">');
			headerElement.push('	jQuery("#defaultHeader2").addClass(MID_CLASS_NM);');  //gnbRow2=>defaultHeader
			headerElement.push('</script>');
		}

		if(this.area == 'main') {
			headerElement.push('	</header>');	// end headWrap
		} else {
			headerElement.push('	</div>');	// end headWrap
		}

		// Meta Category
		if(this.area != "mini" && this.area != "main") {
			headerElement.push('<hr>');
			headerElement.push(HeaderGnb.categoryNavi.makeNaviElement(this.area));
		}
		if (this.area == "sub" ) {
			headerElement.push(this.makeDispLineMap());
		}
		document.write(headerElement.join(''));
	},
	buttonEvent : function() {
		jQuery('.ut_my11st, .ut_insub').each(function(idx) {
			jQuery(this).bind({
				mouseenter : function(e) {
					jQuery(this).addClass('selected');
				},
				mouseleave : function(e) {
					jQuery(this).removeClass('selected');
				}
			});
		});
	},
	/**
	 * area : main(����), sub(����), mini(�̴�, �׺���̼ǹ� ����), search(�˻�), extra(���� ȣ���)
	 * */
	init : function(area) {
		this.area = typeof(area) == "undefined" ? "common" : area;		// GNB ���� (main, sub)
		if(this.area == 'main') {
			this.areaCodePre = 'MAINM';
		}
		this.makeHtml();
	}
}

HeaderGnb.categoryNavi = {
	$allLayerWrap :  '',
	$allLayerCont : '',
	allLayerLoaded : false,
	area : 'main',
	areaCodePre : 'MAINS',
	//GNB �׺���̼�
	makeNaviElement : function(area) {
		var element = [];
		var _this = this;
		_this.area = area;

		element.push('	<div id="navigateWrap" class="navigateWrap">');
		element.push('		<div class="navi">');
		element.push('			<div class="totalcate_wrap" id="gnbCateAllLayerWrap">');
		element.push('				<button type="button" class="btn_totalcate"><span>ī�װ� ��ü����</span></button>');
		element.push('				<div class="inner_totalcate" id="gnbCateAllLayer">');
		element.push('					<h2><button type="button" class="btn_totalcate"><span>ī�װ� ��ü����</span></button></h2>');
		element.push('				</div>');
		element.push('			</div>');
		element.push('			<div class="gnb_menu" id="gnbMenu3">');
		element.push('				<h2>�� �޴�</h2>');
		element.push('				<ul>');
		element.push('					<li class="gnbm1"><a href="#gnb_cate_layer1" onClick="return false;"><span><span>�귣���м�</span></span></a>');
		element.push('						<div class="gnb_inner_wrap2" id="gnb_cate_layer1" style="display:none"><div class="gnb_inner"></div></div>');
		element.push('					</li>');
		element.push('					<li class="gnbm2"><a href="#gnb_cate_layer2" onClick="return false;"><span><span>�Ƿ�</span></span></a>');
		element.push('						<div class="gnb_inner_wrap2" id="gnb_cate_layer2" style="display:none"><div class="gnb_inner"></div></div>');
		element.push('					</li>');
		element.push('					<li class="gnbm3"><a href="#gnb_cate_layer3" onClick="return false;"><span><span>��ȭ/��Ƽ</span></span></a>');
		element.push('						<div class="gnb_inner_wrap2" id="gnb_cate_layer3" style="display:none"><div class="gnb_inner"></div></div>');
		element.push('					</li>');
		element.push('					<li class="gnbm4"><a href="#gnb_cate_layer4" onClick="return false;"><span><span>��ǰ/���Ƶ�</span></span></a>');
		element.push('						<div class="gnb_inner_wrap2" id="gnb_cate_layer4" style="display:none"><div class="gnb_inner"></div></div>');
		element.push('					</li>');
		element.push('					<li class="gnbm5"><a href="#gnb_cate_layer5" onClick="return false;"><span><span>����/��Ȱ</span></span></a>');
		element.push('						<div class="gnb_inner_wrap2" id="gnb_cate_layer5" style="display:none"><div class="gnb_inner"></div></div>');
		element.push('					</li>');
		element.push('					<li class="gnbm6"><a href="#gnb_cate_layer6" onClick="return false;"><span><span>����/�ڵ���</span></span></a>');
		element.push('						<div class="gnb_inner_wrap2" id="gnb_cate_layer6" style="display:none"><div class="gnb_inner"></div></div>');
		element.push('					</li>');
		element.push('					<li class="gnbm7"><a href="#gnb_cate_layer7" onClick="return false;"><span><span>������/����</span></span></a>');
		element.push('						<div class="gnb_inner_wrap2" id="gnb_cate_layer7" style="display:none"><div class="gnb_inner"></div></div>');
		element.push('					</li>');
		element.push('					<li class="gnbm8"><a href="#gnb_cate_layer8" onClick="return false;"><span><span>����/����</span></span></a>');
		element.push('						<div class="gnb_inner_wrap2" id="gnb_cate_layer8" style="display:none"><div class="gnb_inner"></div></div>');
		element.push('					</li>');
		element.push('					<li class="gnbm9"><a href="#gnb_cate_layer9" onClick="return false;"><span><span>SOHO11</span></span></a>');
		element.push('						<div class="gnb_inner_wrap2" id="gnb_cate_layer9" style="display:none"><div class="gnb_inner"></div></div>');
		element.push('					</li>');
		element.push('					<li class="gnbm10"><a href="#gnb_cate_layer10" onClick="return false;"><span><span>��ȭ��</span></span></a>');
		element.push('						<div class="gnb_inner_wrap2" id="gnb_cate_layer10" style="display:none"><div class="gnb_inner"></div></div>');
		element.push('					</li>');
		element.push('				</ul>');
	if(_this.area == 'main') {
		element.push('				<span class="arrow"></span>');
	}
		element.push('			</div>');
		element.push('		</div>');

		element.push('	<script type="text/javascript">');
	    element.push('		if(appVer == 6.0) document.write(\'<iframe src="/html/blank.html" title="��������" id="gnb_cate_layer1_ifrm" style="display:none;height:0px;width:0px;"></iframe>\');');
	    element.push('	</script>');

	    element.push('	<script type="text/javascript">');
	    element.push('		if(appVer == 6.0) document.write(\'<iframe src="/html/blank.html" title="��������" id="gnb_cate_layer_sub_ifrm" style="display:none;position:absolute;top:70px;left:0px;z-index:1;width:0px;height:0px;filter:alpha(style=0,opacity=0,finishopacity=0);"></iframe>\');');
	    element.push('	</script>');
	    element.push('	<div class="gnb_cate_layer11" id="gnb_cate_layer11"></div>');
	    element.push('	<script type="text/javascript">');
	    element.push('		if(appVer == 6.0) document.write(\'<iframe src="/html/blank.html" title="��������" id="gnb_cate_layer11_ifrm" style="display:none;height:0px;width:0px;"></iframe>\');');
	    element.push('	</script>');

		element.push('	</div>');

		jQuery(function(){
			_this.init();
		});

		return element.join('');
	},
	//ī�װ� ��ü���� ���̾� - remove promotion category
	makeCategoryAllLayer : function() {
		var element = [];
		var _this = this;
		var $ctgrWrap = jQuery('<div class="category">');
		var grpData = FooterData.totalLayer;
		var metaCtgrCount = 0;
		var $row = jQuery('<div/>');
		var $meta = jQuery('<div/>');
		var $list = jQuery('<ul/>');
			
		if( grpData ) {
			
			for( var idx=0; idx < grpData.length; idx++ ){
				var data = grpData[idx];
				
				if( data.CtgrLv === 2 ){
					metaCtgrCount ++;
					
					if( metaCtgrCount >= 19){
						break;
					}
					
					if( idx !== 0 ){
						if( metaCtgrCount % 6 === 2){
							if( $row.length > 0 && $row.html() !== '' ){
								$ctgrWrap.append($row);
								$row = jQuery('<div/>');
							}
						}
						$meta.append($list);
						$row.append($meta);
					}
					
					$meta = jQuery('<div/>');
					$meta.append('<h3>' + data.CtgrNm + '</h3>');
					$list = jQuery('<ul/>');
				}else if( data.CtgrLv === 3 ){
					$list.append(this.setCtgrNmStyle(data));
				}
			}
			
			$meta.append($list);
			$row.append($meta);
			$ctgrWrap.append($row);
			_this.$allLayerCont.append($ctgrWrap);
		}
		
		//�����ڵ�
		jQuery('li', $wrap).bind('click', function() {
			doCommonStat(_this.areaCodePre + 'CG0102');
		});
		
		//�α��ڳ�
		if( FooterData.popularCornerList || FooterData.popularMallList ) {
			var $wrap = jQuery('<div class="popular_corner" />');
			
			if( FooterData.popularCornerList ){
				for( var grpIdx = 0 ; grpIdx < FooterData.popularCornerList.length ; grpIdx++) {
					var cornerList = FooterData.popularCornerList[grpIdx];
					var $title = jQuery('<h3><span>'+cornerList.title.DispObjNm+'</span></h3>');
					var $ul = jQuery('<ul/>');
					for(var idx = 0 ; idx < cornerList.ctgrList.length && idx<20; idx++){
						var data = cornerList.ctgrList[idx];
						$ul.append('<li><a href="'+data.DispObjLnkUrl+'" onclick="doCommonStat(\''+_this.areaCodePre+'CG0103\')">'+data.DispObjNm+'</a></li>');
					}
					$wrap.append($title);
					$wrap.append($ul);
				}
			}
			
			if( FooterData.popularMallList ) {
				for( var grpIdx = 0 ; grpIdx < FooterData.popularMallList.length ; grpIdx++) {
					var cornerList = FooterData.popularMallList[grpIdx];
					var $title = jQuery('<h3><span>'+cornerList.title.DispObjNm+'</span></h3>');
					var $ul = jQuery('<ul/>');
					for(var idx = 0 ; idx < cornerList.ctgrList.length && idx<20; idx++){
						var data = cornerList.ctgrList[idx];
						$ul.append('<li><a href="'+data.DispObjLnkUrl+'" onclick="doCommonStat(\''+_this.areaCodePre+'CG0105\')">'+data.DispObjNm+'</a></li>');
					}
					$wrap.append($title);
					$wrap.append($ul);
				}
			}
			
			if( FooterData.soho11List ) {
				for( var grpIdx = 0 ; grpIdx < FooterData.soho11List.length ; grpIdx++) {
					var cornerList = FooterData.soho11List[grpIdx];
					var $title = jQuery('<h3><span>'+cornerList.title.DispObjNm+'</span></h3>');
					var $ul = jQuery('<ul/>');
					for(var idx = 0 ; idx < cornerList.ctgrList.length && idx<20; idx++){
						var data = cornerList.ctgrList[idx];
						$ul.append('<li><a href="'+data.DispObjLnkUrl+'" onclick="doCommonStat(\''+_this.areaCodePre+'CG0105\')">'+data.DispObjNm+'</a></li>');
					}
					$wrap.append($title);
					$wrap.append($ul);
				}
			}

			$wrap.append('<div class="btn_area"><a href="'+_GNB_CONTEXT_PATH_+'/commons/CommonAbout.tmall?method=serviceMap" onclick="doCommonStat(\''+_this.areaCodePre+'CG0104\')" class="defbtn_med mdtype6"><span>���񽺸� ��ü����</span></a></div>');
			_this.$allLayerCont.append($wrap);
		}

		_this.$allLayerCont.append('<button type="button" class="btn_close"><span>ī�װ� ��ü���� �ݱ�</span></button>');
		_this.allLayerLoaded = true;
	},
	//��Ÿ �׷캰 ���̾�
	makeGrpCtgrLayer : function(grpIdx) {
		var _this = this;
		var $layerWrap = jQuery('#gnb_cate_layer' + (grpIdx+1));
		var $layerCont = jQuery('.gnb_inner', $layerWrap);
		var $wrap = jQuery('<div class="grouping" />');
		var categoryContents = [];

		var codeIdx = (grpIdx+2) >= 10 ?(grpIdx+2) : '0' + (grpIdx+2);
		
		var metaCtgrGroupCount = 0;
		var quotient = 0;
		var remain = 0;
		
		var $firstGroup = jQuery('<div class="grouping" />');
		var $secontGroup = jQuery('<div class="grouping" />');
		
		//ī�װ�
		var grpData = eval("FooterData.metaCtgrGrp" + (grpIdx+1));
		if(grpData != undefined) {
			var $content = jQuery('<div/>');
			
			for(var idx = 0 ; idx < grpData.length ; idx++) {
				var data = grpData[idx];
				if( data.CtgrLv === 2 ) {
					
					if( idx > 1 ){
						categoryContents.push($content);
					}
					$content = jQuery('<div/>');
					$content.append('<h3>' + data.CtgrNm + '</h3>').append('<ul/>');
				} else if( data.CtgrLv === 3 ) {
					jQuery('ul:last-child', $content).append(this.setCtgrNmStyle(data));
				}
			}
			
			categoryContents.push($content);
			
			//����ڵ�
			jQuery('ul > li', $content).bind('click', function() {
				doCommonStat(_this.areaCodePre + 'CG'+codeIdx+'02');
			});
		}
		
		//�׸� ī�װ�
		var popMallListCtgr = eval("FooterData.popularMallListCtgr" + (grpIdx+1));
		if(popMallListCtgr != undefined) {
			var $area = jQuery('<div class="special">');
			for(var idx = 0 ; idx < popMallListCtgr.length ; idx++) {
				var data = popMallListCtgr[idx];
				var ctgrList = data.ctgrList;
				$area.append('<h3>' + data.title.DispObjNm + '</h3>').append('<ul/>');
				for(var ctgrIdx = 0 ; ctgrIdx < ctgrList.length ; ctgrIdx++) {
					jQuery('ul:last-child', $area).append('<li><a href="'+ctgrList[ctgrIdx].DispObjLnkUrl+'">' + ctgrList[ctgrIdx].DispObjNm + '</a></li>');
				}
			}
			
			categoryContents.push($area);
			
			//����ڵ�
			jQuery('ul > li', $area).bind('click', function() {
				doCommonStat(_this.areaCodePre + 'CG'+codeIdx+'06');
			});
			
		}
		
		if( categoryContents && categoryContents.length > 0 ){
			metaCtgrGroupCount = categoryContents.length;
			quotient = Math.ceil( metaCtgrGroupCount / 2 );
			remain = metaCtgrGroupCount % 2;
			
			for(var metaIdx = 0; metaIdx < metaCtgrGroupCount; metaIdx++){
				
				if( metaIdx < quotient){
					$firstGroup.append(categoryContents[metaIdx]);
				}else{
					$secontGroup.append(categoryContents[metaIdx]);
				}
			}
			
			if( $firstGroup.children().size() > 0 ){
				$layerCont.append($firstGroup);
			}
			
			if( $secontGroup.children().size() > 0 ){
				$layerCont.append($secontGroup);
			}
		}

		//������� BIG, ���� ���, AD���
		var businessBannerBig = eval("FooterData.businessBannerListBig" + (grpIdx+1)); //����-Big
		var businessBanner = eval("FooterData.businessBannerList" + (grpIdx+1)); //����
		var adBanner = FooterData.gnbMetaCtgrAdBanner.DATA[grpIdx]; //AD
		var $wrap = jQuery('<div class="banner"><div>');
		if(businessBannerBig != undefined) {
			var data = businessBannerBig[0];
			var statCode = _this.areaCodePre + 'CG'+codeIdx+'03';
			jQuery('div', $wrap)
			.append('<a href="'+data.DispObjLnkUrl+'" onclick="doCommonStat(\''+statCode+'\')"><img src="'+getCommonImgUrl(_UPLOAD_URL_ + data.LnkBnnrImgUrl)+'" alt="'+data.DispObjNm+'"></a>')
			.addClass('ban01');
			$layerCont.append($wrap);
		} else {
			//���� ���� ��ʰ� ������ ����
			if(adBanner.IMG1 != undefined) {
				var img = new Image();
				var imgSrc = adBanner.OURL;
				img.src = getCommonImgUrl(imgSrc);
				var statCode = adBanner.CODE;
				if(_this.area != 'main'){
					statCode = adBanner.SUBCODE;
				}
				jQuery('div', $wrap).append('<a href="'+adBanner.LURL1+'" onclick="doCommonStat(\''+statCode+'\')"><img src="'+getCommonImgUrl(adBanner.IMG1)+'" alt="'+adBanner.ALT+'"></a>');
			}

			// �������
			if(businessBanner != undefined) {
				var maxCnt = (adBanner.IMG1 != undefined) ? 1 : 2;
				for(var idx = 0 ; idx < businessBanner.length && idx < maxCnt ; idx++) {
					var data = businessBanner[idx];
					var statCode = _this.areaCodePre + 'CG'+codeIdx+'04';
					jQuery('div', $wrap).append('<a href="'+data.DispObjLnkUrl+'" onclick="doCommonStat(\''+statCode+'\')"><img src="'+getCommonImgUrl(_UPLOAD_URL_ + data.LnkBnnrImgUrl)+'" alt="'+data.DispObjNm+'"></a>');
				}
			}

			jQuery('div', $wrap).addClass('ban02');
			if(businessBanner != undefined || adBanner.IMG1 != undefined) {
				$layerCont.append($wrap);
			} else {
				$layerWrap.addClass('non_ban');
			}
		}

		//�ݱ��ư(��ʰ� ������츸)
		if(jQuery('.banner', $layerWrap).size() > 0) {
			$closeBtn = jQuery('<button type="button" class="btn_close">ī�װ����̾� �ݱ�</button>');
			$layerCont.append($closeBtn);
			$closeBtn.bind('click', function() {
				jQuery('#gnbMenu3 > ul > li > div').mouseleave();

			});
		}

	},
	//ī�װ��� ��Ÿ�� ó��
	setCtgrNmStyle : function(ctgrInfo) {
		var $li = jQuery('<li/>');
		var $a = jQuery('<a/>');

		var ctgrLink = ctgrInfo.CtgrLinkUrl;
		
		if( ctgrInfo.CtgrKindCd === '03' ) { 
			$li.addClass('point');
		}else{
			ctgrLink = 'http://www.11st.co.kr/html/category/' + ctgrInfo.RefCtgrNo + '.html';
		}
		
		$a.attr('href', ctgrLink);
		//�ؽ�Ʈ �÷�
		if(ctgrInfo.CtgrTxtColor != '') {
			$a.css('color', ctgrInfo.CtgrTxtColor);
		}
		//�˾� ��ũ
		if(ctgrInfo.CtgrLinkPopupYn == 'Y') {
			$a.attr('target', '_blank');
		}
		$a.text(ctgrInfo.CtgrNm)
		$li.append($a)

		//�������ڵ�
		if( ctgrInfo.CtgrIconCd == '01' ) {
			$li.append('<span class="gicon ico_new">�ű��ڳ�</span>');
		}else if( ctgrInfo.CtgrIconCd == '02' ) {
			$li.append('<span class="gicon ico_hot">�α��ڳ�</span>');
		}

		//�ΰ����� ����
		if( ctgrInfo.AddInfoUseYn == 'Y' ) {
			var $addInfo = jQuery('<span class="gnb_ico" />');
			//CLASS��
			if( ctgrInfo.AddInfoClassNm != '' ) {
				$addInfo.addClass(ctgrInfo.AddInfoClassNm);
				//��ü�ؽ�Ʈ
				if( ctgrInfo.AddInfoClassNm != '' ) {
					$addInfo.append("<span>" + ctgrInfo.AddInfoClassText + "</span>");
				}
			}

			//��ũ����
			if( ctgrInfo.AddInfoLinkUseYn == 'Y' ) {
				var $addInfoLink = jQuery('<a/>');
				$addInfoLink.attr('href', ctgrInfo.AddInfoLinkUrl);
				if( ctgrInfo.AddInfoLinkPopupYn == 'Y' ) {
					$addInfoLink.attr('target', '_blank');
				}
				$addInfo = $addInfoLink.append($addInfo);
			}
			$li.append($addInfo);
		}
		return $li;
	},
	menuControl : function(targetDiv, targetSub, classType){
		if(classType == 'add'){
			targetDiv.addClass('selected');
			targetSub.show();
		}else if(classType == 'remove'){
			targetDiv.removeClass('selected');
			targetSub.hide();
		}
	},
	initEvent : function() {

		var _this = this;

		//��Ÿī�װ� �׷� ��ư
		var $menuList = jQuery('#gnbMenu3 > ul > li');
		var $menuTitle = jQuery('#gnbMenu3 > ul > li > a');
		var $menuSubList = jQuery('#gnbMenu3 > ul > li > div');
		var $gnbArrow = jQuery('#gnbMenu3 .arrow');
		var _currentMenuNum = 0;

		//ī�װ� ��ü���� ��ư
		jQuery('button.btn_totalcate', _this.$allLayerWrap)
			.bind('click', function(e) {
					if(!_this.allLayerLoaded) {
						_this.makeCategoryAllLayer();
						doCommonStat(_this.areaCodePre+'CG0101');
					}
					_this.$allLayerWrap.addClass('selected');
					jQuery('h2 button.btn_totalcate', _this.$allLayerCont).one('click', function(e) {
						_this.$allLayerWrap.removeClass("selected");
					});
					jQuery('button.btn_close', _this.$allLayerCont).one('click', function(e) {
						_this.$allLayerWrap.removeClass('selected');
					});
				}
			)
			.bind('focusin', function(e) {
					_this.menuControl( jQuery($menuList[0]), jQuery($menuSubList[0]),'remove');
					$gnbArrow.hide();
				}
			);


		$menuList.each(function(idx) {
			var $metaLi = jQuery(this);
			var $metaA = jQuery('a', $metaLi);
			var $ctgrDiv = jQuery('div', $metaLi );
			var $ctgrDivInner = jQuery('.gnb_inner', $ctgrDiv);


			var showCtgrLayer = function() {
				if ( $ctgrDivInner.is(':empty') ) {
					_this.makeGrpCtgrLayer(idx);
				}

				_this.menuControl( $metaLi, $ctgrDiv,'add');

				// �ٸ� �ǿ� ���� ó��
				for ( var idxLi = 0 ; idxLi < $menuList.size(); idxLi++ ) {
					if ( idxLi != idx ) {
						_this.menuControl( jQuery($menuList[idxLi]), jQuery($menuSubList[idxLi]), 'remove');
					}
				}

				if(_this.area == 'main') {
					$gnbArrow.show();
					TweenMax.to($gnbArrow, 0.3, {y:idx * 36, ease:Quint.easeOut});
				} else {
					$ctgrDiv.slideDown(200);
				}
			}

			var hideCtgrLayer = function() {
				$gnbArrow.hide();
				_this.menuControl( $metaLi, $ctgrDiv,'remove');
			}

			$metaLi.bind(
				{
					'mouseenter' : function(evt) {
							if ( idx != _currentMenuNum) {
								_currentMenuNum = idx;
							}
							showCtgrLayer();
						}
					, 'mouseleave' : function(evt) {
							hideCtgrLayer();
						}
				}
			);

			$metaA.bind(
				{
					'focusin' : function(evt) {
						showCtgrLayer();
					}
				}
			)
		});

		$menuSubList.each(function(idx){
			var $this = jQuery(this).parent();
			var $sub = $this.find('.gnb_inner_wrap2');

			$this.bind({
				focusout : function(e){
					var rayerObj = $sub.find("button").filter(":last");
					var obj = $sub.find("a").filter(":last");

					if(rayerObj.length > 0){ //��ʰ� ���� ��쿡 �ش� ������ ����(�������, ������)
						jQuery(event.srcElement).is('button') == true ? _this.menuControl($this, $sub,'remove') : '';
					}else{ //��ʰ� �������� ������ Ÿ��Ʋ ��(�׸�ī�װ�, ī�װ� text�� ����)
						jQuery(event.srcElement).text() == obj.text() ? _this.menuControl($this, $sub,'remove') : '';
					}
				}
			});
		});

		//���� LNB ȭ��ǥ �̺�Ʈ
		$gnbArrow.bind({
			mouseenter : function(e){
				$menuList.eq(_currentMenuNum).mouseenter();
			}
		});
	},
	init : function(area){
		var _this = this;
		_this.$allLayerWrap = jQuery("#gnbCateAllLayerWrap");
		_this.$allLayerCont = jQuery("#gnbCateAllLayer");
		if(_this.area == 'main') {
			_this.areaCodePre = 'MAINM';
		}
		_this.initEvent();
	}

};

function gfnCheckSSLHost(url) {
	try {
		var protocol = window.document.location.protocol;

		if ( protocol == "https:" )	{
			// http => https
			if(url.indexOf("http:") > -1) {
				return url.replace("http:", protocol);
			}

		} else if(protocol == "http:") {
			// https => http
			if(url.indexOf("https:") > -1) {
				return url.replace("https:", protocol);
			}
		}
	} catch(e) {}
	return url;
}


/*
 * ���� �̹��� ó��
 */
function getCommonImgUrl(imgUrl)	{
	try	{
		var protocol = window.document.location.protocol;
		if ( protocol == "https:" )	{
			if ( _UPLOAD_IMG_PATH_!= "" && imgUrl.indexOf(_UPLOAD_IMG_PATH_) > -1 )	{
				return imgUrl.replace(_UPLOAD_IMG_PATH_, _SSL_UPLOAD_IMG_PATH_);
			} else if ( _IMG_PATH_ != "" && imgUrl.indexOf(_IMG_PATH_) > -1 )	{
				return imgUrl.replace(_IMG_PATH_, _SSL_IMG_PATH_);
			} else if ( _IMG_URL_ != "" && imgUrl.indexOf(_IMG_URL_) > -1 )	{
				return imgUrl.replace(_IMG_URL_, _SSL_IMG_URL_);
			} else if ( _UPLOAD_URL_ != "" && imgUrl.indexOf(_UPLOAD_URL_) > -1 )	{
				return imgUrl.replace(_UPLOAD_URL_, "https://image.11st.co.kr");
			} else if ( _CSS_URL_ != "" && imgUrl.indexOf(_CSS_URL_) > -1 )	{
				return imgUrl.replace(_CSS_URL_, _SSL_CSS_URL_);
			} else if ( imgUrl.indexOf("http:") > -1 )	{
				return imgUrl.replace("http:", protocol);
			}
		}	else if ( protocol == "http:" )	{
			if ( _SSL_UPLOAD_IMG_PATH_ != "" && imgUrl.indexOf(_SSL_UPLOAD_IMG_PATH_) > -1 )	{
				return imgUrl.replace(_SSL_UPLOAD_IMG_PATH_, _UPLOAD_IMG_PATH_);
			} else if ( _SSL_IMG_PATH_ != "" && imgUrl.indexOf(_SSL_IMG_PATH_) > -1 )	{
				return imgUrl.replace(_SSL_IMG_PATH_, _IMG_PATH_);
			} else if ( _SSL_IMG_URL_ != "" && imgUrl.indexOf(_SSL_IMG_URL_) > -1 )	{
				return imgUrl.replace(_SSL_IMG_URL_, _IMG_URL_);
			} else if ( _SSL_UPLOAD_URL_ != "" && imgUrl.indexOf(_SSL_UPLOAD_URL_) > -1 )	{
				return imgUrl.replace(_SSL_UPLOAD_URL_, _UPLOAD_URL_);
			} else if ( _SSL_CSS_URL_ != "" && imgUrl.indexOf(_SSL_CSS_URL_) > -1 )	{
				return imgUrl.replace(_SSL_CSS_URL_, _CSS_URL_);
			} else if ( imgUrl.indexOf("https:") > -1 )	{
				return imgUrl.replace("https:", protocol);
			}
		}
	} catch (e)	{}
	return imgUrl;
}

//alt text ��������
function getAltTxt(etcText, titleText){
    if(!isNaN(etcText)) {
    	etcText = etcText.toString();
    }
    if(etcText == null || etcText.trim() == "" || etcText.trim() == "undefined" || (typeof etcText == "undefined")) {
        return titleText;
    } else {
        return etcText;
    }
}
