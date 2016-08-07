var Main = {};
//common (DataSet 포함)
Main.common = {
	currentData : {},
	currentDataList : {},
	totalCount : 0,
	showCount : 0,
	currentPosition : -1, //첫 데이터 idx
	isRandom : false,
	areaName : "",
	isDataLoad : false,
	_stckImg6 : [],
	_stckImg1 : [],

	init : function (dataName, boolRandom){
		var me = this;
		var randomIndex = 0;
		me.setData(dataName);
		me.isRandom = boolRandom;
		me.mainDataSet();
	},

	setData : function (dataName){
		var me = this;
		me.currentData = eval(dataName); //데이터 명
		me.currentDataList = me.currentData.DATA;
		me.totalCount = me.currentData.totalCount;
		me.showCount = me.currentData.showCount;
		me.areaName = dataName;
	},

	mainDataSet : function (){
		var me = this;
		var $IMG1, $URL1, $JURL1, $TXT1, $DSC1, $TRCNO1, $HTML1, $ETXT1;
		var strTRCNO = "";
		var startIdx = 1;
		var currPageNum = 0;
		var totalPageNum = 0;

		if( me.showCount > me.totalCount ) me.showCount = me.totalCount;
		if( me.isRandom ) {
			me.currentPosition =  Math.floor(Math.random()*Math.ceil(me.totalCount)) - 1;
		}
		for( i = startIdx; i <= me.showCount; i++) {
			me.currentPosition++;
			if( me.currentPosition >= me.totalCount ) me.currentPosition = 0;
			if( me.currentPosition < 0 ) me.currentPosition = me.totalCount - 1;

			try{
				$IMG1 	 = jQuery("#" + me.areaName + i + "_IMG1");
				$TXT1 	 = jQuery("#" + me.areaName + i + "_TXT1");
				$ETXT1 	 = jQuery("#" + me.areaName + i + "_ETXT1");
				$HTML1 	 = jQuery("#" + me.areaName + i + "_HTML1");
				$DSC1 	 = jQuery("#" + me.areaName + i + "_DSC1");
				$TRCNO1  = jQuery("#" + me.areaName + i + "_TRCNO1");
				$URL1 	 = jQuery("a[name=" + me.areaName + i + "_URL1]");
				$JURL1 	 = jQuery("a[name=" + me.areaName + i + "_JURL1]");
			}catch(e){}

			//Product Image Set
			if( $IMG1.length > 0 ) {
				$IMG1.attr("src", me.currentDataList[me.currentPosition].IMG1);
				if( $TXT1 ) {
					$IMG1.attr("alt", getAltTxt(me.currentDataList[me.currentPosition].ETXT1,me.currentDataList[me.currentPosition].TXT1));
				}
			}
			//Product Text Set
			if( $TXT1.length > 0 ) {
				$TXT1.html(me.currentDataList[me.currentPosition].TXT1);
			}
			//Normal Link Set
			if( $URL1.length > 0 ) {
				$URL1.each(function() {
					jQuery(this).attr("href", me.makeDataUrl(me.currentDataList[me.currentPosition]));
				})
			}
			//Javascript Link Set
			if( $JURL1.length > 0 ) {
				$JURL1.each(function() {
					jQuery(this).attr("href", me.makeDataUrl(me.currentDataList[me.currentPosition]));
				})
			}
			//Discount Rate Set
			if( $DSC1.length > 0 ) {
				$DSC1.html(me.currentDataList[me.currentPosition].DSC1);
			}
			//Html Area Set
			if( $HTML1.length > 0 ) {
				$HTML1.html(me.currentDataList[me.currentPosition].HTML1);
			}
			//Ad impression Code Title Set
			if( $TRCNO1.length > 0 ) {
				var trcGubn = $TRCNO1.attr("title");
				if(trcGubn != null & me.currentDataList[me.currentPosition].TRCNO1 > 0) {
					strTRCNO += trcGubn + me.currentDataList[me.currentPosition].TRCNO1 + "^";
				}
			}
		}
		//Impression
		if(strTRCNO != "") {
			var img = new Image();
			me._stckImg6.push(img);
			img.src = 'http://st.11st.co.kr/a.st?a='+strTRCNO;
		}
		me.isDataLoad = true;
	},
	makeDataUrl : function(data){
		var returnURL = "";
		try{
			if( data.JURL1 != undefined ) {
				returnURL = "javascript:" + data.JURL1;
			} else if( data.URL1 != undefined)  {
				returnURL = data.URL1;
			}
		}catch(e){}
		return returnURL;
	},
	goNotc : function(ntecNo,searchGubun){
		goCommonUrl("http://help.11st.co.kr/11st/bbs/Bbs.jsp?ntceNo="+ntecNo+"&searchGubun="+searchGubun);
	},
	setRandomBnr : function(){
		var me = this;
		me.currentPosition =  Math.floor(Math.random()*Math.ceil(me.totalCount));
		var $setBnr = jQuery('#SpecialService_BNR' + me.currentPosition);
		$setBnr.addClass("selected");
	},
	setBnrEventHandler : function (){
		var $layerBnrObjArr = jQuery('li', '.special_service');
		$layerBnrObjArr.live({
			click : function(thisObj){
				var $target = jQuery(thisObj.currentTarget);
				$layerBnrObjArr.removeClass('selected');
				$target.addClass("selected");
			}
		});
	},
	clickCPC : function(typGubn,areaGubn,trcNo){
		var me = this;
		var img2 = new Image();
		me._stckImg1.push(img2);
		img2.src = 'http://aces.11st.co.kr/cpc.do?c='+trcNo+'^'+typGubn+'^'+areaGubn+'&noCache='+new Date().getTime();
	},

	shockingDealPrdChk : function(prdTypCd){
		var chkType = false;
		var arrPrdType = ['09','10','14','19','20','25']; //무형상품 상품 타입 코드

		for ( var idxPrdTypCd = 0 ; idxPrdTypCd < arrPrdType.length; idxPrdTypCd++ ) {
			if ( arrPrdType[idxPrdTypCd] == prdTypCd ) {
				chkType = true;
				break;
			}
		}
		return chkType;
	}
};

//오늘의 찬스
Main.todayChance = (function(){
	var $wrapper = {};
	var data = {};
	var dataSize = 0;
	var showCount = 0;
	var startIdx = 0;
	var $bnrObjArr = {};
	var $nextBtnObj = {};
	var $prevBtnObj = {};
	var randomIndex = 0;
	var _stckImg6 = [];

	var setData = function(){
		data = eval("TodayChanceAD");
		dataSize = data.totalCount;
		showCount = data.showCount;
	};
	var setWrapper = function(){
		$wrapper = jQuery("#todayChanseWrap");
	};
	var setBnrObj = function(){
		$bnrObjArr = jQuery("li[name=todayChanceBnr]", $wrapper);
	};
	var setBtnObj = function(){
		$nextBtnObj = jQuery("button[name=todayChanceNext]", $wrapper);
		$prevBtnObj = jQuery("button[name=todayChancePrev]", $wrapper);
	};
	var setStartIdx = function(){
		randomIndex = getRanNumWeight(data.WEIGHT);
		startIdx = Math.floor(randomIndex / showCount) * showCount;
	};
	var initialize = function(){
		setWrapper();
		setBnrObj();
		setBtnObj();
		setData();
		setStartIdx();
		drawBanner();
		eventHandler();
	};
	var drawBanner = function(){
		try{
			var liIdx = 0;
			var strTRCNO = "";
			for(var i=startIdx; i<startIdx + showCount; i++){
				var currData = data.DATA[i];
				jQuery("img[name=todayChanceImage]", $bnrObjArr[liIdx]).attr({"src": currData.IMG1,"alt" : currData.TXT1});
				jQuery("a[name=todayChanceLink]", $bnrObjArr[liIdx]).attr("href", "javascript:"+currData.JURL1);
				jQuery("p[name=todayChanceTitle]",  $bnrObjArr[liIdx]).html(currData.TXT1);
				jQuery("em[name=todayChancePrice]",  $bnrObjArr[liIdx]).html(currData.PRC1 + "원");
				if(currData.TRCNO1 != "-1"){
					var trcGubn = $bnrObjArr.attr("title");
					if(trcGubn != null & currData.TRCNO1 > 0) {
						strTRCNO += trcGubn + currData.TRCNO1 + "^";
						var img = new Image();
						_stckImg6.push(img);
					}
				}
				liIdx++;
			}
			img.src =  'http://st.11st.co.kr/a.st?a='+strTRCNO;
			jQuery("span[name=todayChancePage]").html("<em>"+((startIdx/showCount)+1)+"<\/em>/"+(dataSize/showCount));
		}catch(e){
		}
	};
	var eventHandler = function(){
		$nextBtnObj.bind({
			click : function(){
				startIdx = startIdx + showCount;
				if(startIdx > dataSize){
					startIdx = 1;
				}else if(startIdx == dataSize){
					startIdx = 0;
				}
				drawBanner();
			}
		});

		$prevBtnObj.bind({
			click : function(){
				startIdx = startIdx - showCount;
				if(startIdx < 0){
					startIdx = dataSize-showCount;
				}
				drawBanner();
			}
		});
	};
	return {
		init : function(){
			initialize();
		}
	}
})();

//메인 주요서비스 영역
Main.majorService = function() {
	var $wrapper = {};
	var data = {};
	var dataSize = 0;
	var curPageIdx = 0 ;
	var maxPageIdx = 0 ;
	var showCnt = 0 ;
	var option = {};

	var setData = function(){
		//set Initial Data
		data = option.jsonData.DATA;
		dataSize = option.jsonData.totalCount;
		showCnt = option.showCount;
		$wrapper = jQuery('#'+ option.wrapper);

		// set Operating Data
		maxPageIdx = Math.floor(dataSize / showCnt) ;
		if(maxPageIdx <= 1){
			jQuery('.btnctr_pn',$wrapper).hide();
		}

		//set paging Elements
		jQuery('.in_prev',$wrapper).before('<em>'+curPageIdx+'<\/em>/'+maxPageIdx);

	};
	var initialize = function(){
		setData();
		drawBanner();
		eventHandler();
	};

	var drawBanner = function(){
		try{
			jQuery('ul' , $wrapper ).hide();
			var $currUL = jQuery('#main_ul_' +option.wrapper+'_'+curPageIdx);
			if($currUL.length < 1){
				jQuery('h1', $wrapper ).after('<ul id="main_ul_' +option.wrapper+'_'+curPageIdx+'">');
				$currUL =jQuery('#main_ul_' +option.wrapper+'_'+curPageIdx);

				var startIdx =  curPageIdx * showCnt ;
				var endIdx = startIdx + showCnt ;
				for( i = startIdx ; i < endIdx ; i++){
					var element = '<li>';
					element += '<a href="'+ data[i].URL1 +'" onclick="doCommonStat(\'MAINMB130101\');" >';
					element += '	<img src="'+data[i].IMG1+'" alt="'+getAltTxt(data[i].ETXT1,data[i].TXT1)+'" >';
					element += '<\/a>';
					element += '<\/li>';
					$currUL.append(element);
				}
			}else{
				$currUL.show();
			}

			jQuery('.btnctr_pn' , $wrapper ).find('em').html(curPageIdx+1);
		}catch(e){
		}
	};

	var eventHandler = function(){
		jQuery('.in_prev', $wrapper).bind({
			click : function(evt){
				curPageIdx--;
				if(curPageIdx < 0){
					curPageIdx = maxPageIdx - 1;
				}
				drawBanner();
			}
		});
		jQuery('.in_next', $wrapper).bind({
			click : function(){
				curPageIdx++;
				if(curPageIdx >= maxPageIdx){
					curPageIdx = 0;
				}
				drawBanner();
			}
		});
	};

	var hideAll = function () {
		jQuery('#'+option.wrapper).parent().hide();
	}

	return {
		init : function(obj){
			option = obj;
			if(option.showCount <= option.jsonData.totalCount){
				initialize();
			}else{
				hideAll();
			}
		}
	};
};

Main.topDeal = {
	dealData : {
		id : 'shockingDeal',
		title : '쇼킹딜',
		curIdx : 0,
		totalCnt  : 0,
		dataList : null,
		defaultUrl : _SHOCKING_DEAL_URL_ + '/html/nc/deal/main.html',
		clickCd : 'MAINMB201',
		limitCnt : 11,	// 최대 데이터 수
		viewCnt : 11	// 노출 데이터 수
	},

	getDeal : function(id) {
		return this.dealData;
	},
	getClickStat : function(url, clickCd) {
		return "javascript:goStatUrl('"+ url +"', '" + clickCd + "');";
	},
	getUrl : function(prdNo, defaultUrl, url) {
		if ( typeof(url) == 'string' && url != '' ) {
			return url;
		} else {
			return defaultUrl + ( defaultUrl.indexOf('?') > -1 ? '&' : '?' ) + 'prdNo=' + prdNo;
		}
	},
	getRandomIdx : function(maxNo) {
		return Number(Math.round(Math.random()*(maxNo-1)));
	},
	getPrdHtml : function(data, prdClickCd) {
		var _html = '';
		var _defaultUrl =  this.dealData.defaultUrl;
		_html += '	<a href="' + this.getClickStat(this.getUrl(data.prdNo, _defaultUrl, data.url), prdClickCd) + '">';

		if(Main.common.shockingDealPrdChk(data.prdTypCd)){
			if(data.autoRfndYn == 'Y'){
				_html += '	<div class="billflag_wrap"><em class="bf_shipping">자동<br>환불<\/em><\/div>';
			}
		}else if ( data.freeDlv == 'Y' ) {
			_html += '		<div class="billflag_wrap"><em class="bf_shipping">무료<br>배송<\/em><\/div>';
		}

		if ( data.img ) {
			_html += '			<img src="' + _UPLOAD_URL_ + data.img + '" alt="' + data.prdNm + '" width="208px" height="167px">';
		}
		if ( Number(data.dscRt) > 5 ) {
			_html += '				<em>' + data.dscRt + '<span>%<\/span><\/em>';
			_html += '				<span>' + data.salePrice + '원'+ (data.opt == 'Y' ? '~' : '') +'<\/span>';
		} else {
			_html += '				<em class="special_price">특별가<\/span><\/em>';;
			_html += '				<span>' + data.salePrice + '원'+ (data.opt == 'Y' ? '~' : '') +'<\/span>';
		}
		_html += '	<\/a>';

		return _html;
	},
	setNaviHtml : function(id) {
		var _deal = this.getDeal(id);
		var _totalCnt = _deal.totalCnt;
		var _viewCnt = _deal.viewCnt;
		var _curIdx = _deal.curIdx;
		var $naviWrapper = jQuery('#' + id + '_navi_wrap');

		var _naviHtml = '';
		if ( _totalCnt > 1 ) {
			_naviHtml += '	<span><em id="' + id +'_curIdx">' + (_curIdx + 1) + '<\/em>/' + _viewCnt+'<\/span>';
			_naviHtml += '	<button type="button" class="in_prev" onclick="Main.topDeal.forward(\'' + id + '\')">이전 상품<\/button>';
			_naviHtml += '	<button type="button" class="in_next" onclick="Main.topDeal.next(\'' + id + '\')">다음 상품<\/button>';
		}
		$naviWrapper.html(_naviHtml);
	},
	setEvent : function(id) {
		var $wrapper = jQuery('#' + id + '_wrap');
		$wrapper.bind({
			mouseenter : function(evt){
				$wrapper.addClass('selected').siblings().removeClass('selected');
			},
			focusin : function(evt){
				$wrapper.addClass('selected').siblings().removeClass('selected');
			}
		});
	},
	setBaseHtml : function(id) {
		var _deal = this.getDeal(id);
		var _dataList = _deal.dataList;
		var _totalCnt = _deal.totalCnt;
		var _viewCnt = _deal.viewCnt;
		var _defaultUrl = _deal.defaultUrl;
		var _clickCd = _deal.clickCd;
		var _curIdx = _deal.curIdx;
		var $wrapper = jQuery('#' + id + '_wrap');

		var _html = '';
		_html += '<h1><a href="' + this.getClickStat(_defaultUrl, _clickCd+'01') + '">' + _deal.title + '<\/a><\/h1>';
		_html += '<div class="viewport">';
		_html += '	<ul id="' + id + '_li_wrap">';
		if ( _totalCnt > 0 ) {
			for ( var idx = 0 ; idx < _viewCnt; idx++ ) {
				if ( idx == _curIdx ) {
					_html += '<li>';
					_html += this.getPrdHtml(_dataList[idx], _clickCd + '02');
					_html += '<\/li>';
				} else {
					_html += '<li style="display:none"><\/li>';
				}
			}
		}
		_html += '	<\/ul>';
		_html += '<\/div>';
		_html += '<div class="btnctr_pn" id="' + id + '_navi_wrap"><\/div>';
		$wrapper.html(_html);
		this.setNaviHtml(id);
	},
	move : function(id, direction) {
		var $liObjList = jQuery('#' + id + '_li_wrap > li');
		var $tgtLiObj;
		var $curIdxObj = jQuery('#' + id + '_curIdx');

		var _deal = this.getDeal(id);
		var _curIdx = _deal.curIdx;
		var _viewCnt = _deal.viewCnt;
		var _clickCd = _deal.clickCd;

		// step1. 대상 Object 확인
		if ( direction == 'forward' ) {
			_curIdx = ( _viewCnt + ( _curIdx - 1) ) % _viewCnt;
			doCommonStat(_clickCd + '03');
		} else {
			_curIdx = ( _curIdx + 1 ) % _viewCnt;
			doCommonStat(_clickCd + '04');
		}
		_deal.curIdx = _curIdx;
		$tgtLiObj = jQuery($liObjList[_curIdx]);

		// step2. 대상 Object 내용 확인
		if ( $tgtLiObj.html() == '' ) {
			$tgtLiObj.html( this.getPrdHtml(_deal.dataList[_curIdx], _clickCd + '03') );
		}

		$liObjList.hide();
		$tgtLiObj.show();
		$curIdxObj.html(_curIdx + 1);
	},
	forward : function(id) {
		this.move(id, 'forward');
	},
	next : function(id) {
		this.move(id, 'next');
	},
	initDeal : function(id, jsObj) {
		var n = new Date();
		ndate = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), 0);
		var s, sdate;
		var e, edate;

		try {
			var _deal = this.getDeal(id);
			var _dataList = jsObj.DATA;
			var _jsonArray = new Array();
			var _limitCnt = _deal.limitCnt;

			if ( _dataList ) {
				var _totalCnt  = _dataList.length;

				for (var _idx = 0 ; _idx < _totalCnt ; _idx++ ){
					s = _dataList[_idx].bgnDt;
		  			e = _dataList[_idx].endDt;
		  			sdate = Date.UTC(s.substr(0,4), Number(s.substr(4,2))-1, s.substr(6,2), s.substr(8,2), s.substr(10,2), 0);
		  			edate = Date.UTC(e.substr(0,4), Number(e.substr(4,2))-1, e.substr(6,2), e.substr(8,2), e.substr(10,2), 0);

		  			if( (ndate-sdate) >= 0 && (ndate-edate) <= 0 ) {
		  				var _data = _dataList[_idx];

		  				var tmpData = {
		  						dealId : id,
		  						prdNo : _data.prdNo,
		  						prdNm : _data.prdNm,
		  						img : _data.img,
		  						url : _data.url,
		  						price : _data.price,
		  						salePrice : _data.salePrice,
		  						opt : _data.opt,
		  						dscRt : _data.dscRt,
		  						freeDlv : _data.freeDlv,
		  						soldOut : _data.soldOut,
		  						autoRfndYn: _data.autoRfndYn,
		  						prdTypCd: _data.prdTypCd
		  				}
		  				_jsonArray.push(tmpData);

			  			if(_idx + 1 == _limitCnt) {
			  				break;
			  			}
		  			}
				}
				_deal.dataList = _jsonArray;
				_deal.totalCnt = _jsonArray.length;
				if ( _deal.viewCnt > _deal.totalCnt ) {
					_deal.viewCnt = _deal.totalCnt;
				}
				var _rndIdx = this.getRandomIdx(_deal.viewCnt);
				_deal.curIdx = _rndIdx;
			}
		} catch (ex) { }

		this.setBaseHtml(id);
		this.setEvent(id);
	},
	focusTab : function(id) {
		try {
			jQuery('#' + id + '_wrap').addClass('selected');
		} catch (ex) {}
	},
	init : function() {
		var _id = 'shockingDeal';
		var _rndIdx = this.getRandomIdx(1);
		this.initDeal(_id, ShockingDealList);
		this.focusTab(_id);
	}
};
Main.oneDay = {
	dealData : {
		id : 'oneDay',
		title : 'oneDay',
		curIdx : 0,
		totalCnt  : 0,
		dataList : null,
		clickCd : 'MAINMB3',
		limitCnt : 12,	// 최대 데이터 수
		viewCnt : 12,	// 노출 데이터 수
		dayIndex : 0	// 요일 인덱스 0은 월요일, 6은 일요일
	},
	getDeal : function(id) {
		return this.dealData;
	},
	getClickStat : function(url, clickCd) {
		return "javascript:goStatUrl('"+ url +"', '" + clickCd + "');";
	},
	getUrl : function(prdNo, url) {
		if ( typeof(url) == 'string' && url != '' ) {
			return url;
		}
	},
	getRandomIdx : function(maxNo) {
		return Number(Math.round(Math.random()*(maxNo-1)));
	},
	getPrdHtml : function(data, prdClickCd) {
		var _html = '';
		_html += '	<a href="' + this.getClickStat(data.url, prdClickCd) + '">';

		if ( data.freeDlv == 'Y' ) {
			_html += '		<div class="billflag_wrap"><em class="bf_shipping">무료<br>배송<\/em><\/div>';
		}

		if ( data.img ) {
			_html += '		<img src="' + _UPLOAD_URL_ + data.img + '" alt="' + data.prdNm + '" width="208px" height="167px">';
		}
		_html += '			<span>' + data.price + '원'+ (data.optYn == 'Y' ? '~' : '') +'<\/span>';
		_html += '	<\/a>';

		return _html;
	},
	setNaviHtml : function(id) {
		var _deal = this.getDeal(id);
		var _totalCnt = _deal.totalCnt;
		var _viewCnt = _deal.viewCnt;
		var _curIdx = _deal.curIdx;
		var $naviWrapper = jQuery('#' + id + '_navi_wrap');

		var _naviHtml = '';
		if ( _totalCnt > 1 ) {
			_naviHtml += '	<span><em id="' + id +'_curIdx">' + (_curIdx + 1) + '<\/em>/' + _viewCnt+'<\/span>';
			_naviHtml += '	<button type="button" class="in_prev" onclick="Main.oneDay.forward(\'' + id + '\')">이전 상품<\/button>';
			_naviHtml += '	<button type="button" class="in_next" onclick="Main.oneDay.next(\'' + id + '\')">다음 상품<\/button>';
		}
		$naviWrapper.html(_naviHtml);
	},
	setEvent : function(id) {
		var $wrapper = jQuery('#' + id + '_wrap');
		$wrapper.bind({
			mouseenter : function(evt){
				$wrapper.addClass('selected').siblings().removeClass('selected');
			},
			focusin : function(evt){
				$wrapper.addClass('selected').siblings().removeClass('selected');
			}
		});
		
		/*

		jQuery('#oneDayTitle').bind({
			mouseenter : function(evt){
				Main.oneDay.showLayer();
				jQuery('#oneDayLayerWrap').addClass('selected').siblings().removeClass('selected');

			},
			focusin : function(evt){
				jQuery('#oneDayLayerWrap').addClass('selected').siblings().removeClass('selected');
				Main.oneDay.showLayer();
			},
			mouseleave : function(evt){
				jQuery('#oneDayLayerWrap').removeClass('selected');
			}
		});

		jQuery('.tit_banner').bind({
			mouseleave : function(evt){
				jQuery('#oneDayLayerWrap').removeClass('selected');
			}
		});

		var $layerWrapper = jQuery('#oneDayLayerWrap');

		$layerWrapper.bind({
			mouseleave : function(evt){
				jQuery('#oneDayLayerWrap').removeClass('selected');
			},
			mouseenter : function(evt){
				jQuery('#oneDayLayerWrap').addClass('selected');
			}
		});

		jQuery('li', $layerWrapper).bind({
			mouseenter : function(evt){
				var $target = jQuery(evt.currentTarget);
				var index = jQuery('li', $layerWrapper).index($target);
				Main.oneDay.showLayer(index);
			},
			focusin : function(evt){
				var $target = jQuery(evt.currentTarget);
				var index = jQuery('li', $layerWrapper).index($target);
				Main.oneDay.showLayer(index);
			}
		});

		jQuery('[name=btn_close]', $layerWrapper).bind({
			click : function(evt){
				jQuery('#oneDayLayerWrap').removeClass('selected');
			},
			focusout : function(evt){
				jQuery('#oneDayLayerWrap').removeClass('selected');
			}
		});
		*/
	},
	setBaseHtml : function(id) {
		var _deal = this.getDeal(id);
		var _dataList = _deal.dataList;
		var _totalCnt = _deal.totalCnt;
		var _viewCnt = _deal.viewCnt;
		var _clickCd = _deal.clickCd;
		var _curIdx = _deal.curIdx;

		var _curTitleDataList = null;
		var _curTitleData = null;

		if(typeof(OneDayTitleList) != 'undefined'){
			_curTitleDataList = OneDayTitleList.DATA;
			if(_curTitleDataList.length > 0){
				for(var titleIdx = 0; titleIdx < _curTitleDataList.length; titleIdx ++){
					var s = _curTitleDataList[titleIdx].bgnDt;
		  			var e = _curTitleDataList[titleIdx].endDt;
		  			var sdate = Date.UTC(s.substr(0,4), Number(s.substr(4,2))-1, s.substr(6,2), s.substr(8,2), s.substr(10,2), 0);
		  			var edate = Date.UTC(e.substr(0,4), Number(e.substr(4,2))-1, e.substr(6,2), e.substr(8,2), e.substr(10,2), 0);
		  			if( (ndate-sdate) >= 0 && (ndate-edate) <= 0 ) {
		  				_curTitleData = _curTitleDataList[titleIdx];
		  				break;
		  			}
				}
			}
		}

		var $wrapper = jQuery('#' + id + '_wrap');
		var _html = '';
		if(_curTitleData && _curTitleData.IMG1){
			_html += '<h1 class="tit_banner">';
			_html += '<a id="oneDayTitle" href="' + _curTitleData.URL1 + '" onclick="doCommonStat(\'MAINMB30201\');"><img src="' + _curTitleData.IMG1 + '" alt="' + _curTitleData.TXT1 + '" width="120px" height="29px"><\/a>';
			_html += '<\/h1>';
			if(_curTitleData.IMG2){
				_html += '<span class="benefit"><img src="' + _curTitleData.IMG2 + '" alt="' + _curTitleData.TXT1 + '" width="35px" height="31px"></span>';
			}
		}
		_html += '<div class="viewport">';
		_html += '	<ul id="' + id + '_li_wrap">';
		if ( _totalCnt > 0 ) {
			for ( var idx = 0 ; idx < _viewCnt; idx++ ) {
				if ( idx == _curIdx ) {
					_html += '<li>';
					_html += this.getPrdHtml(_dataList[idx], _clickCd + '0202');
					_html += '<\/li>';
				} else {
					_html += '<li style="display:none"><\/li>';
				}
			}
		}
		_html += '	<\/ul>';
		_html += '<\/div>';
		_html += '<div class="btnctr_pn" id="' + id + '_navi_wrap"><\/div>';
		$wrapper.html(_html);
		this.setNaviHtml(id);
	},
	showLayer : function(index){
		/*
		if(index == undefined){
			index = this.dealData.dayIndex;
		}

		var $wrapper = jQuery('#oneDayLayerWrap');

		try{
			var $target = jQuery(jQuery('li', $wrapper).get(index));
			jQuery('li', $wrapper).removeClass('selected');
			$target.addClass('selected');
			if(jQuery('a[name=link]', $target).attr('href') == '#'){
				var bnrData = OneDayLayerList.DATA[index];
				jQuery('img[name=image]', $target).attr('src', bnrData.IMG1);
				jQuery('img[name=image]', $target).attr('alt', bnrData.TXT1);
				jQuery('a[name=link]', $target).attr('href', bnrData.URL1);
			}
		}catch(e){
			$wrapper.removeClass('selected');
		}
		*/
	},
	move : function(id, direction) {
		var $liObjList = jQuery('#' + id + '_li_wrap > li');
		var $tgtLiObj;
		var $curIdxObj = jQuery('#' + id + '_curIdx');

		var _deal = this.getDeal(id);
		var _curIdx = _deal.curIdx;
		var _viewCnt = _deal.viewCnt;
		var _clickCd = _deal.clickCd;

		// step1. 대상 Object 확인
		if ( direction == 'forward' ) {
			_curIdx = ( _viewCnt + ( _curIdx - 1) ) % _viewCnt;
			doCommonStat(_clickCd + '0203');
		} else {
			_curIdx = ( _curIdx + 1 ) % _viewCnt;
			doCommonStat(_clickCd + '0204');
		}
		_deal.curIdx = _curIdx;
		$tgtLiObj = jQuery($liObjList[_curIdx]);

		// step2. 대상 Object 내용 확인
		if ( $tgtLiObj.html() == '' ) {
			$tgtLiObj.html( this.getPrdHtml(_deal.dataList[_curIdx], _clickCd + '0202') );
		}

		$liObjList.hide();
		$tgtLiObj.show();
		$curIdxObj.html(_curIdx + 1);
	},
	forward : function(id) {
		this.move(id, 'forward');
	},
	next : function(id) {
		this.move(id, 'next');
	},
	initialize : function(id, jsObj) {
		var n = new Date();
		ndate = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), 0);
		var s, sdate;
		var e, edate;
		try {
			var _deal = this.getDeal(id);
			var _dataList = jsObj.DATA;
			var _jsonArray = new Array();
			var _limitCnt = _deal.limitCnt;

			if ( _dataList ) {
				var _totalCnt  = _dataList.length;
				for (var _idx = 0 ; _idx < _totalCnt ; _idx++ ){
					s = _dataList[_idx].bgnDt;
		  			e = _dataList[_idx].endDt;
		  			sdate = Date.UTC(s.substr(0,4), Number(s.substr(4,2))-1, s.substr(6,2), s.substr(8,2), s.substr(10,2), 0);
		  			edate = Date.UTC(e.substr(0,4), Number(e.substr(4,2))-1, e.substr(6,2), e.substr(8,2), e.substr(10,2), 0);
		  			if( (ndate-sdate) >= 0 && (ndate-edate) <= 0 ) {
		  				var _data = _dataList[_idx];
		  				var tmpData = {
		  						prdNo : _data.NUM1,
		  						prdNm : _data.TXT1,
		  						img : _data.IMG2,
		  						url : _data.URL1,
		  						price : _data.PRC1,
		  						freeDlv : _data.FREE_DLV,
		  						optYn : _data.OPT_YN
		  				}
		  				_jsonArray.push(tmpData);
			  			if(_idx + 1 == _limitCnt) {
			  				break;
			  			}
		  			}
				}
				_deal.dataList = _jsonArray;
				_deal.totalCnt = _jsonArray.length;
				if ( _deal.viewCnt > _deal.totalCnt ) {
					_deal.viewCnt = _deal.totalCnt;
				}
				var _rndIdx = this.getRandomIdx(_deal.viewCnt);
				_deal.curIdx = _rndIdx;
			}
		} catch (ex) {}

		this.setBaseHtml(id);
		this.setEvent(id);
		//this.setDayIndex();
	},
	setDayIndex : function(){
		/*
		//요일 구하기
		var d = new Date();
		var currentday = d.getDay();
		var index = currentday - 1;
		if(index < 0){
			index = jQuery('li', '#oneDayLayerWrap').size() - 1;
		}
		this.dealData.dayIndex = index;
		*/
	},
	init : function() {
		var _rndIdx = this.getRandomIdx(1);
		if(typeof(OneDayPrdList) != 'undefined'){
			this.initialize(this.dealData.id, OneDayPrdList);
		}
	}
};
//랭킹
Main.ranking =  (function(){
	var $wrapper = {};
	var currData = {};
	var currDataSize = 0;
	var currShowCnt = 0;
	var selectedMetaIdx = 0;
	var selectedRankIdx = 0;
	var maxRankIdx = 4;
	var $metaObjArr = {};
	var $metaTitleObjArr = {};
	var $rankObjArr = {};
	var $currMetaObj = {};
	var useTrace = false;
	var regnCdArr = new Array("MAINMB502","MAINMB503","MAINMB504","MAINMB505","MAINMB506","MAINMB507","MAINMB508","MAINMB509","MAINMB510","MAINMB511", "MAINMB501");


	var setWrapper = function(){
		$wrapper = jQuery("#rakingWrap");
	};

	var setMetaIdx = function(){
		selectedMetaIdx = Math.round(Math.random() * (MainRanking.length  - 2 ));
	};
	var setMetaObj = function(){
		$metaObjArr = jQuery("li[name=rankingMeta]", $wrapper);
		$metaTitleObjArr = jQuery("a[name=rankingTitle]", $metaObjArr);
	};
	var setCurrMetaObj = function(){
		$currMetaObj = jQuery($metaObjArr.get(selectedMetaIdx));
	};
	var setRankObj = function(){
		$rankObjArr = jQuery("a[name=page]", $currMetaObj);
	}
	var setCurrData = function(){
		try{
			currData = MainRanking[selectedMetaIdx + 1];
			currDataSize = currData.totalCount;
			currShowCnt = currData.showCount;
		}catch(e){
			currDataSize = 0;
		}
	};

	var changeRankingObj = function(){
		setMetaObj();
		$metaObjArr.removeClass("selected");
		setCurrMetaObj();
		setCurrData();
		setRankObj();
		selectedRankIdx = 0;
		drawMeta();
		drawProduct();
	};
	var eventHandler = function(){
		$metaObjArr.bind("mouseover focusin", function(evt){
				trace("mouseover");
				evt.preventDefault();
				var $thisObj = jQuery(evt.target);
				if($thisObj.is("a[name=rankingTitle]") || $thisObj.is("#Main_link_RankingTotal")){
					selectedMetaIdx = $metaObjArr.index(jQuery(evt.currentTarget));
					changeRankingObj();
				}
		});
		var $rankBtn = jQuery("button[name=rankPrdBtn]",$wrapper);
		$rankBtn.bind({
			click : function(evt){
				evt.preventDefault();
				var $thisObj = jQuery(evt.target);
				if($thisObj.attr("class") == "in_prev"){
					selectedRankIdx -- ;
					if(selectedRankIdx < 0 ){
						selectedRankIdx = maxRankIdx;
					}
					doCommonStat("MAINMB51201");
				}else{
					selectedRankIdx++;
					if(selectedRankIdx > maxRankIdx ){
						selectedRankIdx = 0;
					}
					doCommonStat("MAINMB51202");
				}
				trace("selectedRankIdx" + selectedRankIdx);
				drawProduct();
			}
		});
		var $rankTotal = jQuery("#Main_link_RankingTotal");
		$rankTotal.bind("mouseover focusin" , function(evt){
			trace("total mouseover");
			evt.preventDefault();
			var $thisObj = jQuery(evt.target);

			currData = MainRanking[0];
			currDataSize = currData.totalCount;
			currShowCnt = currData.showCount;

			selectedMetaIdx = 10;
			trace("total mouseover" +  currDataSize);
			drawMeta('total');
			drawProduct();
		});
	};
	var initialize = function(){
		setWrapper();
		setMetaIdx();
		setMetaObj();
		setCurrMetaObj();
		setRankObj();
		setCurrData();
		drawMeta();
		drawProduct();
		eventHandler();
	};
	var drawMeta = function(tab){
		$metaObjArr.removeClass("selected");
		jQuery("div[name=productList]", $wrapper).hide();

		if(tab == 'total'){
			$currMetaObj =jQuery("#Main_layer_RankingTotal") ;
			jQuery("#Main_link_RankingTotal").addClass("selected"); ;
			jQuery("#Main_layer_RankingTotal").show();
			selectedMetaIdx = 10;
		}else{
			jQuery("#Main_layer_RankingTotal").hide();
			jQuery(jQuery("div[name=productList]", $wrapper).get(selectedMetaIdx)).show();
		}
		$currMetaObj.addClass("selected");
		$currMetaObj.show();
	};
	var drawProduct = function(){

		var $currPrdObjArr =jQuery("li[name=product]", $currMetaObj );
		$currPrdObjArr.hide();
		var startIdx = selectedRankIdx * currShowCnt;
		regnCd = regnCdArr[selectedMetaIdx];
		var conerIdx = selectedMetaIdx + 1;
		var prdUrl = 'http://www.11st.co.kr/browsing/BestSeller.tmall?method=getBestSellerCornerMain&cornerNo='+conerIdx +'&viewType=I'
		if(selectedMetaIdx == 10){
			prdUrl = 'http://www.11st.co.kr/html/bestSellerMain.html';
		}
		for(var loopIdx=0; loopIdx<currShowCnt; loopIdx++){
			try{
				var currPrdIdx = startIdx + loopIdx;
				var currPrdData = currData.DATA[currPrdIdx];
				var $targetObj = jQuery($currPrdObjArr.get(currPrdIdx));

				if(jQuery("a[name=link]", $targetObj).attr("href") == "#"){
					var url = "javascript:goStatPrdUrl('" + prdUrl + "','" + currPrdData.NUM1 + "','" +regnCd + "0" +((currPrdIdx % 4 ) +2 ) + "');";
					jQuery("a[name=link]", $targetObj).attr("href", url);
					jQuery("img[name=image]", $targetObj).attr({"src" : currPrdData.IMG1, "alt" : currPrdData.TXT1});
					jQuery("p[name=prdName]", $targetObj).text(currPrdData.TXT1);
					jQuery("em[name=price]", $targetObj).html(currPrdData.PRC1 + "원");
				}
				$targetObj.show();
			}catch(e){
				jQuery(this).remove();
			}
		}

	};

	var trace = function(msg){
		if(window.console && useTrace) console.log("ranking: ", msg);
	};

	return {
		init : function(){
			initialize();
		}
	}
})();


Main.gnb = {
		/*
		 * Main GNB Right Banner
		 * */
		rightBanner : function(){
			var data = [], imgUrlArr = [], imgLinkArr = [], weightArr = [], titleArr = [], target=[],  regnCodeArr = [];
			var totSize = 0, currIdx = 0, options = {}, $wrapper = "", $imgObj = "", useTrace = false;
			var setBnnrData = function(wrapperId, json){
				$wrapper = jQuery("#"+wrapperId);
				data = json;
				totSize = data.length;
				jQuery(data).each(function(){
					imgUrlArr.push(this.imgUrl);
					imgLinkArr.push(this.imgLink);
					weightArr.push(this.weight);
					titleArr.push(this.title);
					target.push(this.target);
					regnCodeArr.push(this.regnCode);
				});
			};
			var initialize = function(){
				dispCtroller();
				setStartIndex();
				dispBanner();
				setEventHandler();
			};
			var dispCtroller = function(){
				if(totSize < 2){
					jQuery("div[class=btnctr_pn]", $wrapper).remove();
				}
				if(totSize === 0){
					$wrapper.html("");
				}
			};
			var imgInjection = function(){
				jQuery("a[name=bcb_conts]").html(jQuery("<img/>", {src:imgUrlArr[currIdx], alt:titleArr[currIdx]}));
			};
			var dispBanner = function(idx){
				if(arguments.length > 0) currIdx = idx;
				imgInjection();
			};
			var setStartIndex = function(){
				currIdx = (weightArr.length > 0) ? getRanNumWeight(weightArr) : ((options.random) ? getRanNum(data.length) : 0);
				jQuery("em[name=bcb_seq]").html(currIdx+1);
			};
			var setCurrentIndex = function(idx){
				currIdx = currIdx + (idx);
				if(currIdx < 0) currIdx = totSize-1;
				else if(currIdx >= totSize) currIdx = 0;
				jQuery("em[name=bcb_seq]").html(currIdx+1);
			};
			var setOptions = function(option){
				if(jQuery.isEmptyObject(options)){
					options = option;
				} else {
					jQuery.extend(options, option);
					useTrace = options.useTrace;
				}
			};
			var setEventHandler = function(){
				var $evntObj = jQuery("div[class=btnctr_pn]", $wrapper);
				if(totSize > 1){
					$evntObj.click(function(event){
						var thisClass = jQuery(event.target).attr("class");
						trace(thisClass);
						if("in_prev" === thisClass) {
							setCurrentIndex(-1);
							doCommonStat('MAINMGN0406');
						} else if("in_next" === thisClass) {
							setCurrentIndex(1);
							doCommonStat('MAINMGN0407')
						}
						dispBanner();
					});
				}
				jQuery("a[name=bcb_conts]").click(function(){
					redirectUrl();
				});
			};
			var redirectUrl = function(){
				var strTarget = target[currIdx];
				trace(strTarget);
				goStatUrl(imgLinkArr[currIdx], regnCodeArr[currIdx], strTarget);
			};
			var trace = function(msg){
				if(useTrace && window.console) console.log("SimpleSmallBnr: ", msg);
			};
			return {
				setData: function(wrapper, jsonArr){
					setBnnrData(wrapper, jsonArr);
				},
				init: function(){
					initialize();
				},
				setOption: function(json){
					setOptions(json);
				}
			}
		},
		/*
		 * Main Key Promotion
		 * */
		initKeyPromotion : function(){
			var $promotionArea = jQuery("#mainPromotion_area");
			if(!TMCookieUtil.isExist(0, 'MAIN_PROMOTION_LAYER')){
				if( typeof(PromotionBnnr) != 'undefined' && PromotionBnnr.totalCount > 0 ) {
					try{
						var DATA_LIST = PromotionBnnr.DATA;
						var crg_num = PromotionBnnr.totalCount;
						var ran = Math.floor(Math.random()*crg_num);
						var bannerData = DATA_LIST[ran];
						var $a = jQuery('<a />').attr('href', 'javascript:goStatUrl(\''+bannerData.URL1+'\', \'MAINMKP0101\')');
						var $img = jQuery('<img />').attr('src', bannerData.IMG1).attr('alt', bannerData.TXT1);
						var $closeBtn = jQuery('<button onclick="doCommonStat(\'MAINMKP0201\');"/>').html('키프로모션 배너 닫기');
						$closeBtn.click(function(e){
							e.preventDefault();
							TMCookieUtil.add(0,'MAIN_PROMOTION_LAYER', '0');
							$promotionArea.hide();
						});
						$promotionArea.css('background', bannerData.ETXT1);
						$promotionArea.append($a.append($img));
						$promotionArea.append($closeBtn);
						$promotionArea.show();
					}
					catch(e) {}
				} else {
					$promotionArea.hide();
				}
			}
		}
	};

//메인 빌보드영역
Main.billboard = {
		center : function(){
			var $wrapper = jQuery("#mainContents");
			var titleData = {};
			var bnrData = {};
			var bnrSize = 0;
			var selectedMenuIdx = -1;
			var selectedTabIdx = 0;
			var $menuObjArr = {};
			var $titleObjArr = {};
			var $btnAdObjArr = {};
			var $btnPrdObjArr = {};
			var $contObjArr = {};
			var options = {};
			var intervalObj = "";
			var maxPageNoArr = new Array(1,1,1,1,1,1,1);
			var currPageIdxArr = new Array(0,0,0,0,0,0,0);
			var currTabIdxArr = new Array(-1,-1,-1,-1,-1,-1,-1);
			var selectedPageNo = 0;
			var useTrace = false;
			var clickCd = 'MAINMB10';

			var setOptionObj = function(option){
				options = option;
			};
			var setTitleData = function(){
				titleData = eval("BillBoardBannerTitleListNew");
			};
			var setBnrData = function(){
				bnrData = getBnrData();
				bnrSize = bnrData.totalCount;
				maxPageNoArr[selectedMenuIdx] = Math.ceil(bnrSize/5);
			};
			var getBnrData = function(idx){

				if(idx == undefined){
					idx = selectedMenuIdx;
				}
				var result = "";
				if(idx > 3){


					try{
						if(typeof(eval("BillBoardAd" + (idx + 1))) == "object" && eval("BillBoardAd" + (idx + 1)).DATA != undefined){
							if(idx == 4){
								var bnrObj5 = eval("BillBoardBannerList" + (idx + 1));
								var bnrObjAd5 = eval("BillBoardAd" + (idx + 1));
								var tot = (bnrObj5.totalCount>2?2:bnrObj5.totalCount)+(bnrObjAd5.totalCount>8?8:bnrObjAd5.totalCount);
								result = {"DATA":[bnrObjAd5.DATA[3],bnrObjAd5.DATA[2],bnrObjAd5.DATA[1],bnrObjAd5.DATA[0],bnrObj5.DATA[Math.round(Math.random() * (bnrObj5.totalCount - 1))]
								                 ,bnrObjAd5.DATA[7],bnrObjAd5.DATA[6],bnrObjAd5.DATA[5],bnrObjAd5.DATA[4],bnrObj5.DATA[Math.round(Math.random() * (bnrObj5.totalCount - 1))]],"showCount":5,"totalCount":tot};
							}else{
								result = eval("BillBoardAd" + (idx + 1));
							}
						}else{
							result = eval("BillBoardBannerList" + (idx + 1));
						}
					}catch(e){
						result = eval("BillBoardBannerList" + (idx + 1));
					}
				}else{
					result = eval("BillBoardBannerList" + (idx + 1));
				}

				return result;
			};
			var setMenuObj = function(){
				$menuObjArr = jQuery("li[name=billMenu]", $wrapper);
			};
			var setTitleObj = function(){
				$titleObjArr = jQuery("li[name=title]", $wrapper);
			};
			var setButtonObj = function(){
				$btnAdObjArr = jQuery("button", $menuObjArr);
				$btnPrdObjArr = jQuery("button", "#Main_layer_BillPrdBtn");
			};
			var setContObj = function(){
				$contObjArr = jQuery("div[name=billCont]", $wrapper);
			}
			var setMenuIdx = function(){
				selectedMenuIdx = getRanNumWeight(titleData.WEIGHT); //초기 랜덤 메뉴 index
			};
			var setTabIdx = function(){
				selectedTabIdx = currTabIdxArr[selectedMenuIdx];
				if(selectedTabIdx == -1 || selectedMenuIdx >= 5){
					selectedTabIdx = Math.round(Math.random() * (bnrSize - 1));
				}

				currTabIdxArr[selectedMenuIdx] = selectedTabIdx;
				currPageIdxArr[selectedMenuIdx] = Math.floor(selectedTabIdx/5);
			};
			var setTabIdxAD = function(){
				var currPageIdx = currPageIdxArr[selectedMenuIdx];
				var minCount = currPageIdx * 5;
				var maxCount = (currPageIdx + 1) * 5;
				if(maxCount > bnrSize -1 ){
					maxCount = bnrSize;
				}
				selectedTabIdx = minCount + Math.round(Math.random() * (maxCount - minCount - 1));
				currTabIdxArr[selectedMenuIdx] = selectedTabIdx;
				currPageIdxArr[selectedMenuIdx] = Math.floor(selectedTabIdx/5);
			};
			var drawTitle = function(){
				$menuObjArr.each(function(menuIdx){
					try{
						if(menuIdx === selectedMenuIdx){
							jQuery(this).addClass("selected");
						}

						var currTitleData = titleData.DATA[menuIdx];
						jQuery("#Main_link_billboardTitle" + menuIdx ).text( currTitleData.TXT1);

						if  ( currTitleData.IMG1 && currTitleData.IMG1 != '' && currTitleData.IMG1 != 'http://i.011st.comnull' ) {
							jQuery("#Main_link_billboardTitle" + menuIdx ).attr( 'style', "background-image:url('" + currTitleData.IMG1 + "');");
							jQuery('#mainContents').removeClass('billboard').addClass('billboard2');
						}

						var _that = this;

						jQuery("li[name=title]", jQuery(_that)).each(function(tabIdx){
							try{
								var currBnrObj = getBnrData(menuIdx);
								var currBnrData = currBnrObj.DATA[tabIdx];
								jQuery("a[name=link]", this).text(currBnrData.TXT1).attr("href", currBnrData.URL1).bind({
									click : function(){
										var titleClickCd = clickCd + (menuIdx+1)  + '0' +(tabIdx +1);
										goStatUrl( currBnrData.URL1 , titleClickCd , '_blank');
									}
								});
							}catch(e){
								jQuery(this).remove();
							}
						});

						if(menuIdx >= 4){

							var currBnrObj = getBnrData(menuIdx);
							var bnrTotalCnt = currBnrObj.totalCount
							if(bnrTotalCnt > 5){
								jQuery("button[idx=" + menuIdx + "]", $wrapper).show();
							}else{
								jQuery("button[idx=" + menuIdx + "]", $wrapper).hide();
							}
						}
					}catch(e){
						jQuery(this).remove();
					}
				});

				$contObjArr.each(function(menuIdx){
					var currTitleData = titleData.DATA[menuIdx];
					jQuery("h3", this).text(currTitleData.TXT1);
				});
			};
			var drawImage = function(){
				var $targetObjList = jQuery(jQuery("li[name=banner]", "#billCont" + selectedMenuIdx));
				var $targetObj = jQuery($targetObjList.get(selectedTabIdx));
				var currBnrObj = getBnrData();
				var currBnrData = currBnrObj.DATA[selectedTabIdx];
				jQuery("li[name=banner]", $wrapper).hide();
				if(jQuery("a[name=link]", $targetObj).attr("href") === "#"){
					jQuery("a[name=link]", $targetObj).attr("href", currBnrData.URL1);
					jQuery("img[name=image]", $targetObj).attr("src", currBnrData.IMG1).attr("alt", getAltTxt(currBnrData.ETXT1,currBnrData.TXT1));
				}

				var $currMenuObj = jQuery("li[idx=" + selectedMenuIdx + "]", $wrapper);
				$currMenuObj.removeClass("selected");
				jQuery($currMenuObj.get(selectedTabIdx)).addClass("selected");
				$targetObjList.removeClass("selected");
				$targetObj.addClass("selected");
				$targetObj.show();
			};
			var drawTab = function(){
				trace("drawTap");
				jQuery("li[page]", $wrapper).each(function(){
					var pageVal = jQuery(this).attr("page");
					if(pageVal == currPageIdxArr[selectedMenuIdx]){
						jQuery(this).addClass("selected");
						jQuery(this).show();
					}else{
						jQuery(this).removeClass("selected");
						jQuery(this).hide();
					}
				});
			};

			var visibleMenuObj = function(evt){
				var $currObj = jQuery(evt.currentTarget);
				trace($menuObjArr.index($currObj));
				selectedMenuIdx = $menuObjArr.index($currObj);
				$menuObjArr.removeClass("selected");
				$menuObjArr.removeClass("focus");
				$currObj.addClass("selected");
				$menuObjArr.find('ul').hide();
				jQuery("ul", $currObj).show();
				setBnrData();
				setTabIdx();
				drawTab();
				drawImage();
			}

			var InvisibleMenuObj = function(evt){
				$menuObjArr.each(function(idx){
					if(idx == selectedMenuIdx){
						jQuery(this).addClass("selected");
						jQuery("ul", this).show();
					}else{
						jQuery(this).removeClass("selected");
						jQuery("ul", this).hide();
					}
				});
			}

			var eventHandler = function(){
				$wrapper.bind({
					mouseenter : function(evt){
						stopRolling();
					},
					mouseleave : function(evt){
						startRolling();
						trace("mouseleave");
						jQuery("ul", $menuObjArr).hide();
					},
					focusin : function(evt){
						stopRolling();
					},
					focusout : function(evt){
						startRolling();
					}
				});

				$menuObjArr.bind({
					mouseenter : function(evt){
						trace("$menuObjArr mouseenter");
						visibleMenuObj(evt);
					},
					focusin : function(evt){
						var $gnbArrow = jQuery('#gnbMenu3 .arrow');
						$gnbArrow.hide();							//lnb 키보드 제어
						trace("$menuObjArr focusin");
						var $target = jQuery(evt.srcElement);
						if($target.attr("id").indexOf("Main_link_billboardTitle") >= 0){
							visibleMenuObj(evt);
						}
					},
					focusout : function(evt){
						trace("$menuObjArr focusout");
						InvisibleMenuObj(evt);
					},
					mouseleave : function(evt){
						InvisibleMenuObj(evt);
					},
					click : function(evt){
						evt.preventDefault();
						return false;
					}
				});

				$titleObjArr.bind({
					mouseenter : function(evt){
						trace("$titleObjArr mouseenter");
						var $currObj = jQuery(evt.currentTarget);
						var $currMenuObj = jQuery("li[idx=" + selectedMenuIdx + "]", $wrapper);
						selectedTabIdx = $currMenuObj.index($currObj);
						currTabIdxArr[selectedMenuIdx] = selectedTabIdx;
						$currMenuObj.removeClass("selected");
						$currObj.addClass("selected");
						drawImage();
					},
					focusin : function(evt){
						trace("$titleObjArr focusin");
						var $currObj = jQuery(evt.currentTarget);
						var $currMenuObj = jQuery("li[idx=" + selectedMenuIdx + "]", $wrapper);
						selectedTabIdx = $currMenuObj.index($currObj);
						currTabIdxArr[selectedMenuIdx] = selectedTabIdx;
						$currMenuObj.removeClass("selected");
						$currObj.addClass("selected");
						drawImage();
						stopRolling();
						return false;
					},
					focusout : function(evt){
						trace("$titleObjArr focusout");
						var $currObj = jQuery(evt.currentTarget);
						var $currMenuObj = jQuery("li[idx=" + selectedMenuIdx + "]", $wrapper);
						selectedTabIdx = $currMenuObj.index($currObj);
						if(selectedTabIdx == $currMenuObj.size() -1){
							$currMenuObj.parent("ul").hide();
						}
						return false;
					}
				});

				$btnAdObjArr.bind({
					click : function(evt){
						trace("$btnAdObjArr click");
						if(evt.stopPropagation){
							evt.stopPropagation();
						}else{
							evt = evt || window.event;
							evt.cancelBubble = true;
						}

						var $currObj = jQuery(evt.currentTarget);
						var currIdx = jQuery($currObj).attr("idx");
						var btnType = jQuery($currObj).attr("name");
						var currPageIdx = currPageIdxArr[currIdx];
						var maxPageIdx = maxPageNoArr[currIdx] -1;

						if(btnType == "prev"){
							if(currPageIdx <= 0){
								currPageIdx = maxPageIdx;
							}else{
								currPageIdx --;
							}
						}else{
							if(currPageIdx >= maxPageIdx){
								currPageIdx = 0;
							}else{
								currPageIdx++;
							}
						}
						trace(currPageIdx);
						currPageIdxArr[currIdx] = currPageIdx;
						setBnrData();
						setTabIdxAD();
						drawTab();
						drawImage();
					}
				});

				$btnPrdObjArr.bind({
					click : function(evt){
						var $currObj = $menuObjArr[selectedMenuIdx];
						var maxMenuSize = $menuObjArr.size() - 1;
						selectedMenuIdx = $menuObjArr.index($currObj);
						var btnType = jQuery(evt.currentTarget).attr("class");
						if(btnType == "in_next"){
							if( bnrSize == selectedTabIdx + 1 ) {
								if(selectedMenuIdx == maxMenuSize ){
									selectedMenuIdx = 0;
								}else{
									selectedMenuIdx++;
								}
								setBnrData();
								drawTab();
								selectedTabIdx = 0;
								$currObj = $menuObjArr[selectedMenuIdx];

							}else{
								selectedTabIdx ++;
							}
							doCommonStat('MAINMB11002');
						}else{
							if(  selectedTabIdx  == 0) {
								if( selectedMenuIdx == 0){
									selectedMenuIdx = maxMenuSize ;
								}else{
									selectedMenuIdx --;
								}
								setBnrData();
								drawTab();
								selectedTabIdx = bnrSize - 1;
								$currObj = $menuObjArr[selectedMenuIdx];

							}else{
								selectedTabIdx --;
							}
							doCommonStat('MAINMB11001');
						}

						trace("selectedTabIdx :" +  selectedTabIdx );
						trace("selectedMenuIdx :" +  selectedMenuIdx );
						currTabIdxArr[selectedMenuIdx] = selectedTabIdx;

						$menuObjArr.removeClass("selected");
						jQuery($currObj).addClass("selected");
						jQuery("ul", $menuObjArr).hide();
						jQuery("ul", $currObj).show();

						drawImage();
					}
				});
			};

			var rolling = function(){
				if(bnrSize > 1){
					if(selectedTabIdx >= bnrSize-1){
						selectedTabIdx = -1;
					}
					selectedTabIdx ++;
					currTabIdxArr[selectedMenuIdx] = selectedTabIdx;
					drawImage();
					trace("Rolling");
				}
			};
			var startRolling = function(){
				if(options.auto){
					if(!intervalObj){
						if(!options.interval){
							options.interval = 5000;
						}
						trace("startRolling");
						intervalObj = setInterval(rolling, options.interval);
					}
				}
			};
			var stopRolling = function(){
				clearInterval(intervalObj);
				intervalObj = "";
				trace("stopRolling");
			};

			var initialize = function(){
				setOptionObj({auto:true});
				setMenuObj();
				setTitleObj();
				setButtonObj();
				setContObj();
				setTitleData();
				setMenuIdx();
				setBnrData();
				setTabIdx();
				drawTitle();
				drawImage();
				startRolling();
				eventHandler();
			};

			var trace = function(msg){
				if(useTrace){
					if(console){
						console.log("[LOG] MainBillBoard: ", msg);
					}
				}
			};

			return {
				init : function(){
					initialize();
				}
			}
		}
};

//메인 하단 카드혜택
Main.cardArea = (function(){
	var $wrapper = {};
	var data = {};
	var dataSize = 0;
	var startIdx = 0;
	var $bnrObjArr = {};
	var $nextBtnObj = {};
	var $prevBtnObj = {};

	var setData = function(){
		data = eval("CardBenefit");
		dataSize = data.totalCount;

		if(dataSize < 3){
			$nextBtnObj.hide();
			$prevBtnObj.hide();
		}
	};
	var setWrapper = function(){
		$wrapper = jQuery("#cardBenefitWrap");
	};
	var setBnrObj = function(){
		$bnrObjArr = jQuery("li[name=cardBnr]", $wrapper);
	};
	var setBtnObj = function(){
		$nextBtnObj = jQuery("button[name=cardNext]", $wrapper);
		$prevBtnObj = jQuery("button[name=cardPrev]", $wrapper);
	};
	var setStartIdx = function(){
		startIdx = getRandom(dataSize);
	};
	var getRandom = function(size){
		return Math.round(Math.random() * (size - 1));
	};
	var initialize = function(){
		setWrapper();
		setBnrObj();
		setBtnObj();
		setData();
		setStartIdx();
		drawBanner();
		eventHandler();
	};

	var drawBanner = function(){
		try{
			for(var i=0; i<$bnrObjArr.length; i++){
				var currIdx = startIdx + i;
				if(currIdx < 0){
					currIdx = dataSize - 1;
				}else if(currIdx == dataSize){
					currIdx = 0;
				}else if(currIdx > dataSize){
					currIdx = 1;
				}
				var currData = data.DATA[currIdx];
				jQuery("img[name=cardImage]", $bnrObjArr[i]).attr({"src": currData.IMG1,"alt" : getAltTxt(currData.ETXT1,currData.TXT1)});
				jQuery("a[name=cardLink]", $bnrObjArr[i]).attr("href", currData.URL1);
			}
		}catch(e){
		}
	}

	var eventHandler = function(){
		$nextBtnObj.bind({
			click : function(){
				startIdx = startIdx + 1;

				if(startIdx > dataSize){
					startIdx = 1;
				}else if(startIdx == dataSize){
					startIdx = 0;
				}
				drawBanner();
			}
		});

		$prevBtnObj.bind({
			click : function(){
				startIdx = startIdx - 1;

				if(startIdx < 0){
					startIdx = dataSize-1;
				}else if(startIdx == 0){
					startIdx = dataSize;
				}
				drawBanner();
			}
		});
	};

	return {
		init : function(){
			initialize();
		}
	}
})();


//물성 카테고리 영역
Main.brandCategory = (function(){
	var $wrapper = {};
	var data = {};
	var startIdx = 0;
	var dataSize = 0;
	var $nextBtnObj = {};
	var $prevBtnObj = {};
	var $bnrObjArr = {};
	var isMove = false;
	var speed = 0.7;
	var viewSize = 0;
	var dataSize = 0;
	var _clickCd = "MAINMB8010";

	var setWrapper = function(){
		$wrapper = jQuery("#brandCateWrap");
	};

	var setBtnObj = function(){
		$nextBtnObj = jQuery('button.in_next', '.bnr_wrap');
		$prevBtnObj = jQuery('button.in_prev', '.bnr_wrap');
	};

	var setBnrObj = function(){
		$bnrObjArr = jQuery('.viewport li', '.bnr_wrap');
	};

	var setData = function(){
		data = eval("BrandFashion");
		if( typeof(data) == "object" ) {
			viewSize = data.showCount;
			dataSize = data.totalCount;

			if(dataSize != 8){
				$nextBtnObj.hide();
				$prevBtnObj.hide();
			}
		}else{
			jQuery("div[name=divBnrCate]").hide();
		}
	};

	var setStartIdx = function(){
		startIdx = getRandom(dataSize);
	};
	var getRandom = function(size){
		return Math.round(Math.random() * (dataSize - 1));
	};

	var drawBanner = function(){
		if (dataSize < 4){
			dataSize = 0;
		}else if ( 4 < dataSize && dataSize< 8){
			dataSize = 4;
		}
		if (dataSize > 0){
			var currIdx = startIdx;
			for(var i=startIdx; i<dataSize+startIdx; i++){
				if(currIdx == dataSize){
					currIdx = 0;
				}else if(currIdx > dataSize){
					currIdx = 1;
				}
				var currData = data.DATA[currIdx];
				$wrapper.append('<li><a href="javascript:goStatUrl(\''+currData.URL1+'\', \''+_clickCd+(i+1)+'\')";><img src="'+currData.IMG1+'" alt="'+currData.TXT1+'" /><\/a><\/li>');
				currIdx++;
			}
			$(".bnr_wrap li:nth-child(4n)").addClass("last_child");
			setBnrObj();
			$wrapper.css({'width': $bnrObjArr.outerWidth(true) * dataSize});
			if ($prevBtnObj){
				dataSize > viewSize ? setBtnHandler(true) : setBtnHandler(false);
			}
		}
	}

	var setBtnHandler = function(flag){
		if (flag){
			$prevBtnObj.bind({
				click : function(e){
					if (!isMove){
						doCommonStat('MAINMB80301');
						e.preventDefault();
						move(-1);
					}
				}
			});
			$nextBtnObj.bind({
				click : function(e){
					if (!isMove){
						doCommonStat('MAINMB80302');
						e.preventDefault();
						move(1);
					}
				}
			});
		} else {
			$prevBtnObj.remove();
			$nextBtnObj.remove();
		}
	};

	var move = function(dir) {
		isMove = true;
		if (dir > 0){
			TweenMax.to($wrapper, speed, {marginLeft:-$bnrObjArr.outerWidth(true) * viewSize, ease:Cubic.easeInOut, onComplete:function(){
				$wrapper.css({'marginLeft':0});
				for (var i = 0; i < viewSize; ++i){ $wrapper.append($bnrObjArr.filter(':first-child')); }
				isMove = false;
			}});
		} else {
			for (var i = 0; i < viewSize; ++i){ $wrapper.prepend($bnrObjArr.filter(':last-child')) }
			TweenMax.fromTo($wrapper, speed, {marginLeft:-$bnrObjArr.outerWidth(true) * viewSize}, {marginLeft:0, ease:Cubic.easeInOut, onComplete:function(){
				$wrapper.css({'marginLeft':0});
				isMove = false;
			}});
		}
	};

	var initialize = function(){
		setWrapper();
		setBtnObj();
		setData();
		setStartIdx();
		drawBanner();
	};

	return{
		init:function(){
			initialize();
		}
	}
})();

Main.footer = {
	//하단 수상내역
	MainAwardArea : function(){
		if(typeof(AwardHtml) != 'undefined' && AwardHtml.totalCount > 0) {
			var data = AwardHtml.DATA[0];
			return "<div class='award_list'>" + data.HTML1 + "<\/div>";
		}
	}
}

//백화점/브랜드 템플릿 영역
Main.deppartmentBrand = {
	data : {
		pageCntNum		: -1,
		pageTotNum		: 2,
		isMove			: false,
		root			: "",
		lists			: "",
		gap				: 980,
		speed			: 0.7,
		intervalObj 	: null
	},
	init : function(){
		this.data.root = $('#tmpWrap');
		this.data.lists = $('#tmpWrap > div');

		var _this = this;
		this.data.root.addClass('loadscript');
		this.data.pageTotNum = this.data.lists.length;
		this.data.lists.each(function(idx){
			var pos = _this.data.gap;
			$(this).css({'left' : pos});
		});

		if(tmpltCnt > 1){
			jQuery("#tmpWrap > button").show();
		}

		var initIdx = Math.floor(Math.random()*Math.ceil(this.data.pageTotNum)) - 1;

		this.data.pageCntNum = initIdx;

		this.setBtnHandler();

		this.move(-1);

		if(this.data.lists.length > 1){
			this.startRolling();
		}
	},

	setBtnHandler : function(){
		var _this = this;

		this.data.root.bind({
			mouseenter : function(evt){
				_this.stopRolling();
			},
			mouseleave : function(evt){
				_this.startRolling();
				trace("mouseleave");
			},
			focusin : function(evt){
				_this.stopRolling();
			},
			focusout : function(evt){
				_this.startRolling();
			}
		});

		this.data.root.find('button.in_prev').bind({
			click : function(e){
				doCommonStat("MAINMB70401");

				if (!_this.data.isMove)
				{
					e.preventDefault();
					_this.move(1);
				}
			}
		});
		this.data.root.find('button.in_next').bind({
			click : function(e){
				doCommonStat("MAINMB70402");

				if (!_this.data.isMove)
				{
					e.preventDefault();
					_this.move(-1);
				}
			}
		});
	},
	move : function(dir) {
		this.data.isMove = true;
		var _this = this;

		if (_this.data.pageCntNum > -1)
		{
			var $oldTarget = this.data.lists.eq(this.data.pageCntNum);
			TweenMax.to($oldTarget, this.data.speed, {left:_this.data.gap * dir, ease:Cubic.easeInOut});
		}
		if (dir > 0)
		{
			this.data.pageCntNum = this.data.pageCntNum == 0 ? this.data.pageTotNum - 1 : this.data.pageCntNum - 1;
		} else {
			this.data.pageCntNum = this.data.pageCntNum == this.data.pageTotNum - 1 ? 0 : this.data.pageCntNum + 1;
		}

		var $target = this.data.lists.eq(this.data.pageCntNum);

		var $linkArr = jQuery("a", $target);
		var $imageArr = jQuery("img", $target);

		if(jQuery($linkArr[0]).attr("href") == "#"){
			if($target.hasClass("temptype_a")){
				var targetData = eval("dptBrdData" + (this.data.pageCntNum + 1));
				if(targetData.DATA.length > 0){
					if(targetData.DATA[0].TXT2 != ""){
						$target.css("background", targetData.DATA[0].TXT2);
					}
				}
			}

			this.drawTmpltData($linkArr, $imageArr, "dptBrdData" + (this.data.pageCntNum + 1));
		}

		$target.css('left', dir * -this.data.gap);
		TweenMax.to($target, this.data.speed, {left:0, ease:Cubic.easeInOut, onComplete:function(){_this.data.isMove = false;}});
	},
	drawTmpltData : function(linkArr, imageArr, dataId){

		var _this = this;

		var targetData = eval(dataId);

		jQuery(targetData.DATA).each(
			function(idx){
				jQuery(linkArr[idx]).bind({
					click : function(e){
						doCommonStat("MAINMB70" + (_this.data.pageCntNum + 1) + "0" + (idx + 1));
					}
				});
				jQuery(linkArr[idx]).attr("href", this.URL1);
				jQuery(imageArr[idx]).attr("src", this.IMG1);
				jQuery(imageArr[idx]).attr("alt", this.TXT1);
			}
		);
	},
	rolling : function(){
		Main.deppartmentBrand.move(-1);
	},
	startRolling : function(){
		if(this.data.intervalObj === null){
			this.data.intervalObj = setInterval(this.rolling, 5000);
		}
	},
	stopRolling : function(){
		if(this.data.intervalObj !== null){
			clearInterval(this.data.intervalObj);
			this.data.intervalObj = null;
		}
	},

	logger : function(str){
		if(console) console.log(str);
	}
}

//개인화 영역
Main.personalArea = {
	data : {
		wrapper : "",
		productData : "",
		productRecommData : "",
		productDataCart : "",
		productRecommDataCart : "",
		productCnt : 0,
		productCntCart : 0,
		personalAreaMode : 0,
		currentPrdIdx : 0,
		currentPrdIdxCart : 0,
		relPrdViewCnt : 5,
		isNowLoading : false
	},

	init : function(){
		this.data.wrapper = jQuery("#psnlArea");
		if(funcCheckIsLogin()){
			this.getAjaxData("method=getPersonalAreaTotalData", "Main.personalArea.initData");
		}
	},

	getAjaxData : function(param, callback){

		this.data.isNowLoading = true;

		var url = "//www.11st.co.kr/browsing/MainAjax.tmall?" + param + "&callback="+callback;

		jQuery.ajax({
			url : url,
			dataType : 'jsonp',
			scriptCharset : 'UTF-8',
			jsonp : false
		});
	},

	initData : function(jsonData){

		var $wrapper = this.data.wrapper;
		if(jsonData.SHOW_AREA){
			if(jsonData.PRODUCT != null && jsonData.PRODUCT != undefined && jsonData.PRODUCT_TCT > 0 ){
				this.data.productData = jsonData.PRODUCT;
				this.data.productCnt = jsonData.PRODUCT_TCT;
				this.data.productRecommData = jsonData.RECOMM_PRODUCT;
			}

			if(jsonData.PRODUCT_CART != null && jsonData.PRODUCT_CART != undefined && jsonData.PRODUCT_TCT_CART > 0 ){
				this.data.productDataCart = jsonData.PRODUCT_CART;
				this.data.productCntCart = jsonData.PRODUCT_TCT_CART;
				this.data.productRecommDataCart = jsonData.RECOMM_PRODUCT_CART;
			}

			if(jsonData.SHOW_AREA){
				jQuery("#psnlNm", $wrapper).text(jsonData.memNm);
				jQuery($wrapper).show();
			}

			// 장바구니 & 최근상품
			if(this.data.productCnt > 0 && this.data.productCntCart > 0){
				this.data.personalAreaMode = 3;

				$wrapper.append(this.getPrdAreaHtml("cart_wrap", "장바구니", this.data.productCntCart, "cart"));

				$wrapper.append(this.getPrdAreaHtml("view_prd", "최근 본 상품", this.data.productCnt, "lately"));

				this.data.relPrdViewCnt = 2;

				if(this.data.productCnt > 1){
					this.setBtnHandler("lately");
				}

				if(this.data.productCntCart > 1){
					this.setBtnHandler("cart");
				}

				this.drawPrd(this.data.productDataCart, this.data.productRecommDataCart, "cart", 0);
				this.drawPrd(this.data.productData, this.data.productRecommData, "lately", 0);

				$wrapper.find("#psnlPrd_cart_0").show();
				$wrapper.find("#psnlPrd_lately_0").show();

				$wrapper.find("#psnlRecommPrd_cart_0").show();
				$wrapper.find("#psnlRecommPrd_lately_0").show();

				jQuery("#psnlPrd_cart_0").attr("dataLoad", "true");
				jQuery("#psnlPrd_lately_0").attr("dataLoad", "true");

				doCommonStat("MAINMB01LD01");
				hdStckPushSimple("WFMR1");

			// 장바구니
			}else if(this.data.productCntCart > 0){
				this.data.personalAreaMode = 2;

				$wrapper.addClass("type_only");

				$wrapper.append(this.getPrdAreaHtml("cart_wrap", "장바구니", this.data.productCntCart, "cart"));

				if(this.data.productCntCart > 1){
					this.setBtnHandler("cart");
				}

				this.drawPrd(this.data.productDataCart, this.data.productRecommDataCart, "cart", 0);

				$wrapper.find("#psnlPrd_cart_0").show();
				$wrapper.find("#psnlRecommPrd_cart_0").show();

				jQuery("#psnlPrd_cart_0").attr("dataLoad", "true");

				doCommonStat("MAINMB01LD02");
				hdStckPushSimple("WFBR1");

			// 최근 상품
			}else if(this.data.productCnt > 0){
				this.data.personalAreaMode = 1;

				$wrapper.addClass("type_only");

				$wrapper.append(this.getPrdAreaHtml("view_prd", "최근 본 상품", this.data.productCnt, "lately"));

				if(this.data.productCnt > 1){
					this.setBtnHandler("lately");
				}

				this.drawPrd(this.data.productData, this.data.productRecommData, "lately", 0);

				$wrapper.find("#psnlPrd_lately_0").show();
				$wrapper.find("#psnlRecommPrd_lately_0").show();

				jQuery("#psnlPrd_lately_0").attr("dataLoad", "true");

				doCommonStat("MAINMB01LD03");
				hdStckPushSimple("WFRR1");
			}

			hdStckFlush();
		}
	},

	drawPrd : function(prdData, recommPrdData, type, index){

		var clickCd1 = "MAINMB10";
		var clickCd2 = "";
		var trcCode = "";

		var recopickCnt = 0;

		if(this.data.personalAreaMode == 3){
			clickCd1 += "01";
			if(type == "cart"){
				trcCode = "WFMR1_";
			}else{
				trcCode = "WF2R1_";
			}
		}
		if(this.data.personalAreaMode == 2){
			clickCd1 += "11";
			trcCode = "WFBR1_";
		}
		if(this.data.personalAreaMode == 1){
			clickCd1 += "21";
			trcCode = "WFRR1_";
		}

		//최근 본 상품
		var prdAreaWrapper = this.data.wrapper.find("#psnlPrdArea_" + type);
		if(this.data.personalAreaMode == 3){
			prdAreaWrapper.find("#psnlPrd_" + type + "_" + index).append(this.getPrdHtml(prdData, clickCd1 + (type == "cart" ? "01" : "04"), ""));
		}else{
			prdAreaWrapper.find("#psnlPrd_" + type + "_" + index).append(this.getPrdHtml(prdData, clickCd1 + "01", ""));
		}

		for(var i = 0; i < this.data.relPrdViewCnt && i < recommPrdData.length; i++){
			if(recommPrdData[i].bReco){
				recopickCnt++;
			}
		}

		trcCode += "0" + recopickCnt;

		hdStckPushSimple(trcCode.replace(/_/gi, ""));

		//최근 본 상품(연관 상품)
		var recommPrdHtml = "";
		for(var i = 0; i < this.data.relPrdViewCnt && i < recommPrdData.length; i++){

			if(recommPrdData[i].bReco){
				clickCd2 = trcCode + "T0" + (i + 1) + "C" + recommPrdData[i].prdNo + "_" + prdData.prdNo;
				hdStckPushSimple(trcCode + "T0" + (i + 1) + "I" + recommPrdData[i].prdNo + "_" + prdData.prdNo);
			}else{
				clickCd2 = trcCode + "F0" + (i + 1) + "C" + recommPrdData[i].prdNo + "_" + prdData.prdNo;
				hdStckPushSimple(trcCode + "F0" + (i + 1) + "I" + recommPrdData[i].prdNo + "_" + prdData.prdNo);
			}

			if(this.data.personalAreaMode == 3){
				recommPrdHtml += "<li>" + this.getPrdHtml(recommPrdData[i], clickCd1 + (type == "cart" ? "0" + (i + 2) : "0" + (i + 5)), clickCd2) + "<\/li>";
			}else{
				recommPrdHtml += "<li>" + this.getPrdHtml(recommPrdData[i], clickCd1 + "0" + (i + 2), clickCd2) + "<\/li>";
			}
		}

		hdStckFlush();

		prdAreaWrapper.find("#psnlRecommPrd_" + type + "_" + index).append(recommPrdHtml);

		this.data.isNowLoading = false;
	},

	setBtnHandler : function(type){
		var _this = this;
		this.data.wrapper.find("#psnlBtn_" + type + "_prev").bind({
			click : function(e){
				if(!_this.data.isNowLoading){
					_this.prevPrdView(this.id);
				}
			}
		});

		this.data.wrapper.find("#psnlBtn_" + type + "_next").bind({
			click : function(e){
				if(!_this.data.isNowLoading){
					_this.nextPrdView(this.id);
				}
			}
		});
	},

	getProductData : function(jsonData){
		this.drawPrd(jsonData.PRODUCT, jsonData.RECOMM_PRODUCT, "lately", this.data.currentPrdIdx);
		jQuery("#psnlPrd_lately_" + this.data.currentPrdIdx).attr("dataLoad", "true");
	},

	getProductDataCart : function(jsonData){
		this.drawPrd(jsonData.PRODUCT_CART, jsonData.RECOMM_PRODUCT_CART, "cart", this.data.currentPrdIdxCart);
		jQuery("#psnlPrd_cart_" + this.data.currentPrdIdxCart).attr("dataLoad", "true");
	},

	getPrdAreaHtml : function(cssName, title, count, type){
		var prdAreaHtml = "";
		// cssName : view_prd -> 최근본 상품, cart_wrap -> 장바구니
		prdAreaHtml += "<div class=\"" + cssName + "\" id=\"psnlPrdArea_" + type + "\">";
		prdAreaHtml += "	<div class=\"main_prd\">";
		prdAreaHtml += "		<h2>" + title + "<span>(" + count + ")<\/span><\/h2>";
		prdAreaHtml += "		<div class=\"viewport\">";
		prdAreaHtml += "			<ul class=\"m_prdlist\">";
		for(var i = 0; i < count; i++){
			prdAreaHtml += "			<li id=\"psnlPrd_" + type + "_" + i + "\" style=\"display:none\" dataLoad=\"false\"><\/li>";
		}
		prdAreaHtml += "			<\/ul>";
		prdAreaHtml += "		<\/div>";
		if(count > 1){
			prdAreaHtml += "		<div class=\"btnctr_pn\">";
			prdAreaHtml += "			<button type=\"button\" class=\"in_prev\" id=\"psnlBtn_" + type + "_prev\">이전 상품<\/button>";
			prdAreaHtml += "			<button type=\"button\" class=\"in_next\" id=\"psnlBtn_" + type + "_next\">다음 상품<\/button>";
			prdAreaHtml += "		<\/div>";
		}
		prdAreaHtml += "	<\/div>";
		prdAreaHtml += "	<div class=\"about_prd\">";
		prdAreaHtml += "		<h3>연관추천상품<\/h3>";
		for(var i = 0; i < count; i++){
			prdAreaHtml += "			<ul class=\"m_prdlist\" id=\"psnlRecommPrd_" + type + "_" + i + "\" style=\"display:none\" dataLoad=\"false\"><\/ul>";
		}
		prdAreaHtml += "	<\/div>";
		prdAreaHtml += "<\/div>";

		return prdAreaHtml;
	},

	getPrdHtml : function(prdData, clickCd1, clickCd2){
		var prdHtml = "";
		prdHtml += "<a href=\"" + prdData.link + "\" onclick=\"doCommonStat('" + clickCd1 + "'); hdStckSimple('" + clickCd2 + "');\">";
		prdHtml += "	<img src=\"" + prdData.imgUrl + "\" alt=\"" + prdData.prdNm + "\" onerror=\"this.src='" + getCommonImgUrl( _IMG_URL_ + "/img/prd_size/noimg_110.gif") + "';\" width=\"110px\" height=\"110px\">";
		prdHtml += "	<p>" + prdData.prdNm + "<\/p>";
		prdHtml += "	<em>" + getCommaString(prdData.finalDscPrc) + "원<\/em>";
		prdHtml += "<\/a>";

		return prdHtml;
	},

	prevPrdView : function(btnId){
		var nowViewIdx = 0;
		var targetViewIdx = 0;

		//장바구니
		if("psnlBtn_cart_prev" == btnId){

			if(this.data.personalAreaMode == 3){
				doCommonStat("MAINMB100201");
			}else{
				doCommonStat("MAINMB101201");
			}

			nowViewIdx = this.data.currentPrdIdxCart;

			if(nowViewIdx == 0){
				targetViewIdx = this.data.productCntCart - 1;
			}else{
				targetViewIdx = this.data.currentPrdIdxCart - 1;
			}

			this.data.currentPrdIdxCart = targetViewIdx;

			if(jQuery("#psnlPrd_cart_" + targetViewIdx).attr("dataLoad") == "false"){
				this.getAjaxData("method=getPersonalProductDataCart&index=" + targetViewIdx + "&mainView=Y", "Main.personalArea.getProductDataCart");
			}

			jQuery("#psnlPrd_cart_" + nowViewIdx, "#psnlPrdArea_cart").hide();
			jQuery("#psnlPrd_cart_" + targetViewIdx, "#psnlPrdArea_cart").show();

			jQuery("#psnlRecommPrd_cart_" + nowViewIdx, "#psnlPrdArea_cart").hide();
			jQuery("#psnlRecommPrd_cart_" + targetViewIdx, "#psnlPrdArea_cart").show();
		}

		//최근 본 상품
		if("psnlBtn_lately_prev" == btnId){

			if(this.data.personalAreaMode == 3){
				doCommonStat("MAINMB100301");
			}else{
				doCommonStat("MAINMB102301");
			}

			nowViewIdx = this.data.currentPrdIdx;

			if(nowViewIdx == 0){
				targetViewIdx = this.data.productCnt - 1;
			}else{
				targetViewIdx = this.data.currentPrdIdx - 1;
			}

			this.data.currentPrdIdx = targetViewIdx;

			if(jQuery("#psnlPrd_lately_" + targetViewIdx).attr("dataLoad") == "false"){
				this.getAjaxData("method=getPersonalProductData&index=" + targetViewIdx + "&mainView=Y", "Main.personalArea.getProductData");
			}

			jQuery("#psnlPrd_lately_" + nowViewIdx, "#psnlPrdArea_lately").hide();
			jQuery("#psnlPrd_lately_" + targetViewIdx, "#psnlPrdArea_lately").show();

			jQuery("#psnlRecommPrd_lately_" + nowViewIdx, "#psnlPrdArea_lately").hide();
			jQuery("#psnlRecommPrd_lately_" + targetViewIdx, "#psnlPrdArea_lately").show();
		}
	},

	nextPrdView : function(btnId){
		var nowViewIdx = 0;
		var targetViewIdx = 0;

		//장바구니
		if("psnlBtn_cart_next" == btnId){

			if(this.data.personalAreaMode == 3){
				doCommonStat("MAINMB100202");
			}else{
				doCommonStat("MAINMB101202");
			}

			nowViewIdx = this.data.currentPrdIdxCart;

			if(nowViewIdx == this.data.productCntCart - 1){
				targetViewIdx = 0;
			}else{
				targetViewIdx = this.data.currentPrdIdxCart + 1;
			}

			this.data.currentPrdIdxCart = targetViewIdx;

			if(jQuery("#psnlPrd_cart_" + targetViewIdx).attr("dataLoad") == "false"){
				this.getAjaxData("method=getPersonalProductDataCart&index=" + targetViewIdx + "&mainView=Y", "Main.personalArea.getProductDataCart");
			}

			jQuery("#psnlPrd_cart_" + nowViewIdx, "#psnlPrdArea_cart").hide();
			jQuery("#psnlPrd_cart_" + targetViewIdx, "#psnlPrdArea_cart").show();

			jQuery("#psnlRecommPrd_cart_" + nowViewIdx, "#psnlPrdArea_cart").hide();
			jQuery("#psnlRecommPrd_cart_" + targetViewIdx, "#psnlPrdArea_cart").show();
		}

		//최근 본 상품
		if("psnlBtn_lately_next" == btnId){

			if(this.data.personalAreaMode == 3){
				doCommonStat("MAINMB100302");
			}else{
				doCommonStat("MAINMB102302");
			}

			nowViewIdx = this.data.currentPrdIdx;

			if(nowViewIdx == this.data.productCnt - 1){
				targetViewIdx = 0;
			}else{
				targetViewIdx = this.data.currentPrdIdx + 1;
			}

			this.data.currentPrdIdx = targetViewIdx;

			if(jQuery("#psnlPrd_lately_" + targetViewIdx).attr("dataLoad") == "false"){
				this.getAjaxData("method=getPersonalProductData&index=" + targetViewIdx + "&mainView=Y", "Main.personalArea.getProductData");
			}

			jQuery("#psnlPrd_lately_" + nowViewIdx, "#psnlPrdArea_lately").hide();
			jQuery("#psnlPrd_lately_" + targetViewIdx).show();

			jQuery("#psnlRecommPrd_lately_" + nowViewIdx).hide();
			jQuery("#psnlRecommPrd_lately_" + targetViewIdx).show();
		}
	}
}

//쇼킹딜 영역(16개)
Main.shockingDeal = {
	wrapper : "",
	prdWrapper : "",
	printPrdCnt : 0,
	startIdx : 0,
	randomIndex : 0,
	totalCount: 0,

	data : {
		viewPort : ""
		,btn : ""
		,btnIn : ""
		,totCnt : 3 // 총 횟수
		,count : 0
		,viewNum : 4
		,gap : 728 // 클릭 할 때마다 늘어나야 할 높이
		,initH : 1456 // 초기 높이
	},

	init : function(){
		try {
			var _this = this;
			this.totalCount  = ShockingDealSlideList.totalCount;

			if(this.totalCount < 8 || this.totalCount > 16) {
				$('.shockingdeal_wrap').css('display','none');
				$('.shockingdeal').css('display','none');
			}else{
				this.data.viewPort = $('.shockingdeal > .viewport');
				this.data.btn = $('#main_btn_dealMorePrd');
				this.data.btnIn = $('#main_span_dealMorePrdTxt');

				this.wrapper = jQuery("#shockingDealWrap");
				this.prdWrapper = jQuery("#shockingDealPrdWrap");

				this.data.viewPort.css('height',this.data.initH);

				this.btnHandler();
				this.setStartIdx();

				if(this.totalCount < 12) {
					_this.data.totCnt = 1;
					_this.data.btnIn.text('쇼킹딜 전체상품보기');
				}
			}
		} catch (ex) {
			jQuery("#shockingDealWrap").hide();
		}
	},

	setStartIdx : function(){
		startIdx = Math.round(Math.random() * (this.totalCount - 1));

		this.addLists(startIdx, true);
		this.drawPrdData(startIdx, true, 0);
	},

	btnHandler : function(){
		var _this = this;
		this.data.btn.bind({
			keyup : function(e){
				if (e.keyCode == 13){
					_this.data.viewPort.find('ul').find('li').eq(_this.data.count * _this.data.viewNum).find('a').focus();
				}
			},
			click : function(){
				doCommonStat("MAINMB90201");

				if(_this.data.count == _this.data.totCnt - 1){
					window.open(_SHOCKING_DEAL_URL_ + "/html/nc/deal/main.html");
				}else{
					if (_this.data.count != _this.data.totCnt - 1){
						_this.data.count++;
						_this.addLists(_this.data.count, false);
						_this.changeWrapH(_this.data.count);
						_this.drawPrdData(_this.randomIndex, false,(_this.data.count*4)+4);
					}
				}
			}
		});
	},
	addLists : function(count, firstLayer){
		var maxShowCnt = (firstLayer == true ? 8 : 4 );

		var ul = this.data.viewPort.find('ul');
		var h = '';

		for (var i = 0; i < maxShowCnt; i++){
			this.printPrdCnt++;
			var currIdx = count + i;

			var statCd = "MAINMB901" + (this.printPrdCnt < 10 ? "0" + this.printPrdCnt : this.printPrdCnt);

			if(i == 0){
				h += "<li id=\"shockingPrdNavi_" + this.data.count + "\">";
			}else{
				h += "<li>";
			}
			h += "	<a href=\"#\">";
			h += "		<span class=\"bnrborder\"><\/span>";
			h += "		<div class=\"billflag_wrap\"></div>";
			h += "		<div class=\"thumb_prd\"><img src=\"" + getCommonImgUrl( _IMG_URL_ + "/img/common/blank.gif") + "\" alt=\"\" onerror=\"this.src='" + getCommonImgUrl( _IMG_URL_ + "/img/prd_size/noimg_main_shockingdeal.gif") + "';\" onclick=\"doCommonStat('" + statCd + "');\"><\/div>";
			h += "		<div class=\"prd_info\">";
			h += "			<p><\/p>";
			h += "			<div class=\"price_wrap\">";
			h += "				<div>";
			h += "					<span class=\"sale\"><\/span>";
			h += "					<strong><\/strong>";
			h += "				<\/div>";
			h += "			<\/div>";
			h += "		<\/div>";
			h += "	<\/a>";
			h += "	<p class=\"goCategory\"><a href=\"#\"><\/a><\/p>";
			h += "	<div class=\"soldout_wrap\" style=\"display:none\"><p>매진되었습니다.<\/p><\/div>";
			h += "<\/li>";
		}
		ul.append(h);
	},
	changeWrapH : function(count){
		var _this = this;
		var h = count * this.data.gap + this.data.initH;
		TweenMax.to(this.data.viewPort, 0.4, {height:h, ease:Cubic.easeOut, onComplete:function(){
			if (_this.data.count == _this.data.totCnt - 1) {
				// 2번 누르면 버튼에 클래스 적용
				_this.data.btnIn.text('쇼킹딜 전체상품보기');
			}

			if(_this.data.count == 1 && _this.totalCount < 16) {
				_this.data.totCnt = 2;
				_this.data.btnIn.text('쇼킹딜 전체상품보기');
			}

			document.getElementById("shockingPrdNavi_" + _this.data.count).scrollIntoView();
		}});
	},
	drawPrdData : function(startIdx, firstLayer, liIdx){
		var _this = this;
		var maxShowCnt = (firstLayer == true ? 8 : 4);
		var currIdx = startIdx;
		var isExceptXsite = false;
		
		try{
			var xSite = TMCookieUtil.getCookie("XSITE");
			
			if(_EXCEPT_XSITE_LIST_.indexOf("|" + xSite + "|") >= 0){ // 제외 제휴사
				isExceptXsite = true;
			}
		}catch(e){}

		for(var i = startIdx; i < startIdx + maxShowCnt; i++){
			if (currIdx > (this.totalCount - 1)){
				currIdx = 0;
			}
			if (this.totalCount > currIdx){
				var prdArea = jQuery("li", this.prdWrapper)[liIdx];
				jQuery("img", prdArea).attr("src", ShockingDealSlideList.DATA[currIdx].prdImg);
				jQuery("img", prdArea).attr("alt", ShockingDealSlideList.DATA[currIdx].prdNm);

				jQuery("div.prd_info p", prdArea).text(ShockingDealSlideList.DATA[currIdx].prdNm);
				jQuery("a", prdArea).attr("href", _SHOCKING_DEAL_URL_ + "/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=" + ShockingDealSlideList.DATA[currIdx].prdNo + "&trTypeCd=34");

				var iconCnt = 0;

				if(isExceptXsite == false){
					if(ShockingDealSlideList.DATA[currIdx].mywayDscRt > 0){
						jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_mfree\">내맘<br>대로<\/em>");
						iconCnt++;
					}else{
						if(ShockingDealSlideList.DATA[currIdx].tmemDscRt > 0){
							jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_tmembership\"><span>T<\/span>멤버십</em>");
							iconCnt++;
						}
						if(ShockingDealSlideList.DATA[currIdx].mileageDscRt > 0){
							jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_sale\">마일<br>리지<\/em>");
							iconCnt++;
						}
						if(ShockingDealSlideList.DATA[currIdx].cardDscRt > 0){
							jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_sale\">카드<br>할인<\/em>");
							iconCnt++;
						}
					}
				}

				if(iconCnt < 3){
					if(Main.common.shockingDealPrdChk(ShockingDealSlideList.DATA[currIdx].prdTypCd)){
						if(ShockingDealSlideList.DATA[currIdx].autoRfndYn == "Y"){
							jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_shipping\">자동<br>환불<\/em>");
							iconCnt++;
						}
					}
					else if(ShockingDealSlideList.DATA[currIdx].freeDlv == "Y"){
						jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_shipping\">무료<br>배송<\/em>");
						iconCnt++;
					}
				}

				if(iconCnt < 3){
					if(ShockingDealSlideList.DATA[currIdx].todayBgnYn == "Y"){
						jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_today\">오늘<br>오픈<\/em>");
					}
					else if(ShockingDealSlideList.DATA[currIdx].todayEndYn == "Y"){
						jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_today\">오늘<br>마감<\/em>");
					}
				}

				if(ShockingDealSlideList.DATA[currIdx].dscRt > 5){
					jQuery("span.sale", prdArea).html(ShockingDealSlideList.DATA[currIdx].dscRt + "<span>%<\/span>");
				}else{
					jQuery("span.sale", prdArea).text("특별가");
					jQuery("span.sale", prdArea).addClass("special_price");
				}
				jQuery("strong", prdArea).html("<span class=\"p_tit\">판매가<\/span>" + ShockingDealSlideList.DATA[currIdx].salePrice + "<span>원" + (ShockingDealSlideList.DATA[currIdx].opt == 'Y' ? '~' : '') + "<\/span>");
				jQuery("p.goCategory a", prdArea).text(ShockingDealSlideList.DATA[currIdx].ctgrNm);
				jQuery("p.goCategory a", prdArea).attr("href", _SHOCKING_DEAL_URL_ + "/browsing/ShockingDealAction.tmall?method=getCategory&dispCtgrNo=" + ShockingDealSlideList.DATA[currIdx].ctgrNo);

				if(ShockingDealSlideList.DATA[currIdx].soldOut == "Y"){
					jQuery("div.soldout_wrap", prdArea).show();
				}
			}
			currIdx++;
			liIdx++;
		}
		this.randomIndex = currIdx;
	}
};

//쇼킹딜 영역(16개)
Main.shockingDealV2 = {
	wrapper : "",
	prdWrapper : "",
	printPrdCnt : 0,
	startIdx : 0,
	randomIndex : 0,
	totalCount: 0,

	data : {
		viewPort : ""
		,btn : ""
		,btnIn : ""
		,totCnt : 3 // 총 횟수
		,count : 0
		,viewNum : 4
		,gap : 728 // 클릭 할 때마다 늘어나야 할 높이
		,initH : 1456 // 초기 높이
	},

	init : function(){
		try {
			var _this = this;
			this.totalCount  = ShockingDealSlideList.totalCount;

			if(this.totalCount < 8 || this.totalCount > 16) {
				$('.shockingdeal_wrap').css('display','none');
				$('#shockingDealWrap').css('display','none');
			}else{
				this.data.viewPort = $('.set_shockingdeal > .viewport');
				this.data.btn = $('#main_btn_dealMorePrd');
				this.data.btnIn = $('#main_span_dealMorePrdTxt');

				this.wrapper = jQuery("#shockingDealWrap");
				this.prdWrapper = jQuery("#shockingDealPrdWrap");

				//this.data.viewPort.css('height',this.data.initH);
				this.setStartIdx();

				if(this.totalCount < 12) {
					_this.data.totCnt = 1;
					_this.data.btnIn.text('쇼킹딜 전체상품보기');
				}
				
				this.drawText();
			}
		} catch (ex) {
			jQuery("#shockingDealWrap").hide();
		}
	},

	setStartIdx : function(){
		startIdx = Math.round(Math.random() * (this.totalCount - 1));

		this.addLists(startIdx, true);
		this.drawPrdData(startIdx, true, 0);
	},
	addLists : function(count, firstLayer){
		var maxShowCnt = 16;

		var ul = this.data.viewPort.find('ul');
		var h = '';

		for (var i = 0; i < maxShowCnt; i++){
			this.printPrdCnt++;
			var currIdx = count + i;

			var statCd = "MAINMB901" + (this.printPrdCnt < 10 ? "0" + this.printPrdCnt : this.printPrdCnt);

			if(i == 0){
				h += "<li id=\"shockingPrdNavi_" + this.data.count + "\">";
			}else{
				h += "<li>";
			}
			h += "	<a href=\"#\">";
			h += "		<span class=\"bnrborder\"><\/span>";
			h += "		<div class=\"billflag_wrap\"></div>";
			h += "		<div class=\"thumb_prd\"><img src=\"" + getCommonImgUrl( _IMG_URL_ + "/img/common/blank.gif") + "\" alt=\"\" onerror=\"this.src='" + getCommonImgUrl( _IMG_URL_ + "/img/prd_size/noimg_main_shockingdeal.gif") + "';\" onclick=\"doCommonStat('" + statCd + "');\"><\/div>";
			h += "		<div class=\"prd_info\">";
			h += "			<p><\/p>";
			h += "			<div class=\"price_wrap\">";
			h += "				<div>";
			h += "					<span class=\"sale\"><\/span>";
			h += "					<strong><\/strong>";
			h += "				<\/div>";
			h += "			<\/div>";
			h += "		<\/div>";
			h += "	<\/a>";
			h += "	<p class=\"goCategory\"><a href=\"#\"><\/a><\/p>";
			h += "	<div class=\"soldout_wrap\" style=\"display:none\"><p>매진되었습니다.<\/p><\/div>";
			h += "<\/li>";
		}
		ul.append(h);
	},
	drawPrdData : function(startIdx, firstLayer, liIdx){
		var _this = this;
		var maxShowCnt = 16;
		var currIdx = startIdx;
		var isExceptXsite = false;
		
		try{
			var xSite = TMCookieUtil.getCookie("XSITE");
			
			if(_EXCEPT_XSITE_LIST_.indexOf("|" + xSite + "|") >= 0){ // 제외 제휴사
				isExceptXsite = true;
			}
		}catch(e){}

		for(var i = startIdx; i < startIdx + maxShowCnt; i++){
			if (currIdx > (this.totalCount - 1)){
				currIdx = 0;
			}
			if (this.totalCount > currIdx){
				var prdArea = jQuery("li", this.prdWrapper)[liIdx];
				jQuery("img", prdArea).attr("src", ShockingDealSlideList.DATA[currIdx].prdImg);
				jQuery("img", prdArea).attr("alt", ShockingDealSlideList.DATA[currIdx].prdNm);

				jQuery("div.prd_info p", prdArea).text(ShockingDealSlideList.DATA[currIdx].prdNm);
				jQuery("a", prdArea).attr("href", _SHOCKING_DEAL_URL_ + "/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=" + ShockingDealSlideList.DATA[currIdx].prdNo + "&trTypeCd=34");

				var iconCnt = 0;

				if(isExceptXsite == false){
					if(ShockingDealSlideList.DATA[currIdx].mywayDscRt > 0){
						jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_mfree\">내맘<br>대로<\/em>");
						iconCnt++;
					}else{
						if(ShockingDealSlideList.DATA[currIdx].tmemDscRt > 0){
							jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_tmembership\"><span>T<\/span>멤버십</em>");
							iconCnt++;
						}
						if(ShockingDealSlideList.DATA[currIdx].mileageDscRt > 0){
							jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_sale\">마일<br>리지<\/em>");
							iconCnt++;
						}
						if(ShockingDealSlideList.DATA[currIdx].cardDscRt > 0){
							jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_sale\">카드<br>할인<\/em>");
							iconCnt++;
						}
					}
				}

				if(iconCnt < 3){
					if(Main.common.shockingDealPrdChk(ShockingDealSlideList.DATA[currIdx].prdTypCd)){
						if(ShockingDealSlideList.DATA[currIdx].autoRfndYn == "Y"){
							jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_shipping\">자동<br>환불<\/em>");
							iconCnt++;
						}
					}
					else if(ShockingDealSlideList.DATA[currIdx].freeDlv == "Y"){
						jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_shipping\">무료<br>배송<\/em>");
						iconCnt++;
					}
				}

				if(iconCnt < 3){
					if(ShockingDealSlideList.DATA[currIdx].todayBgnYn == "Y"){
						jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_today\">오늘<br>오픈<\/em>");
					}
					else if(ShockingDealSlideList.DATA[currIdx].todayEndYn == "Y"){
						jQuery("div.billflag_wrap", prdArea).append("<em class=\"bf_today\">오늘<br>마감<\/em>");
					}
				}

				if(ShockingDealSlideList.DATA[currIdx].dscRt > 5){
					jQuery("span.sale", prdArea).html(ShockingDealSlideList.DATA[currIdx].dscRt + "<span>%<\/span>");
				}else{
					jQuery("span.sale", prdArea).text("특별가");
					jQuery("span.sale", prdArea).addClass("special_price");
				}
				jQuery("strong", prdArea).html("<span class=\"p_tit\">판매가<\/span>" + ShockingDealSlideList.DATA[currIdx].salePrice + "<span>원" + (ShockingDealSlideList.DATA[currIdx].opt == 'Y' ? '~' : '') + "<\/span>");
				jQuery("p.goCategory a", prdArea).text(ShockingDealSlideList.DATA[currIdx].ctgrNm);
				jQuery("p.goCategory a", prdArea).attr("href", _SHOCKING_DEAL_URL_ + "/browsing/ShockingDealAction.tmall?method=getCategory&dispCtgrNo=" + ShockingDealSlideList.DATA[currIdx].ctgrNo);

				if(ShockingDealSlideList.DATA[currIdx].soldOut == "Y"){
					jQuery("div.soldout_wrap", prdArea).show();
				}
			}
			currIdx++;
			liIdx++;
		}
		this.randomIndex = currIdx;
	},
	drawText : function(){
		
		if( DealCategories ){
			
			var categories = DealCategories.DATA;
			
			for(var index=0; index < categories.length; index++){
				var category = categories[index];
				jQuery('#deal_ctgr_link').append('<li><a href="' + category.link + '">' + category.title + '</a></li>');
			}
		}
		
	}
};

Main.AdDsBnr = {
		description : "메인 DS서버 광고 영역",
		preFixUrl : "",
		useAdSwitch : "",
		mainLeftBigAdWhenSwitchOffed : "",
		useTrace : false,
		init : function(layerId , typeUrl ){
			try {
				this.chkUseAdSwitch();

				if (this.useAdSwitch) {

					var browser = navigator.userAgent.toLowerCase();
					var targetUrl = this.preFixUrl + '/NetInsight/text/11st/11st_main/main@'+ typeUrl + getNitmusParam(false);	// targeting으로

					if ( (browser.indexOf("iphone") >= 0) || (browser.indexOf("ipod") >= 0) || (browser.indexOf("ipad") >= 0) ) {  //Flash
						targetUrl = targetUrl+"_jpg";
					}
					jQuery.getScript(targetUrl);

				} else {
					// 대체로직 추가 : 차후에~~~
				}
			} catch(e) {
				this.trace(e.message);
			}
		},
		setPreFixUrl : function(preFixUrl){
			this.preFixUrl = preFixUrl;
		},
		setUseAdSwitch : function(useAdSwitch){
			this.useAdSwitch = useAdSwitch;
		},
		setBannerWhenSwitchOffed : function(mainLeftBigAdWhenSwitchOffed){
			this.mainLeftBigAdWhenSwitchOffed = mainLeftBigAdWhenSwitchOffed;
		},
		chkUseAdSwitch : function(){
			if(this.useAdSwitch == ""){
				this.useAdSwitch = _dsSeverMode;
			}
		},
		trace : function(msg){
			if(this.useTrace && console){
					console.log("[LOG] adDsBnr: ", msg);
			}
		}
	};
Main.dsRichAd = {
		description : "메인 DS서버 광고 영역",
		preFixUrl : "http://ds.11st.co.kr",
		useAdSwitch : '',
		mainLeftBigAdWhenSwitchOffed : '',
		useTrace : false,
		mouseOverTime : 0,
		isMouseOver : false,
		isDisplayAd : false,
		intervalObj : '',
		adData : '',
		me : '',
		adAreaId : '',
		intervalTime : 10,
		expandTime : 1500,

		init : function(){
			try {
				this.chkUseAdSwitch();
				if (this.useAdSwitch) {

					var targetUrl = this.preFixUrl + '/NetInsight/text/11st/11st_main/main@Main_Right' + getNitmusParam(false);	// targeting으로

					jQuery( document ).ready(function(){
						jQuery.ajax({
							url : targetUrl ,
							dataType : 'jsonp',
							jsonp : false,
							cache : false,
							jsonpCallback : 'Main.dsRichAd.dsCallback',
							success : function(data){
								if(data == null || typeof(data) == 'undefined' || data.type == ''){
									Main.dsRichAd.setReplace();
								}
							}
						});
					});

				} else {
					this.setReplace();
				}
			} catch(e) {
				this.trace(e.message);
			}
		},
		setPreFixUrl : function(preFixUrl){
			this.preFixUrl = preFixUrl;
		},
		setUseAdSwitch : function(useAdSwitch){
			this.useAdSwitch = useAdSwitch;
		},
		setBannerWhenSwitchOffed : function(mainLeftBigAdWhenSwitchOffed){
			this.mainLeftBigAdWhenSwitchOffed = mainLeftBigAdWhenSwitchOffed;
		},
		chkUseAdSwitch : function(){
			if(this.useAdSwitch == ""){
				this.useAdSwitch = _dsSeverMode;
			}
		},
		setReplace : function(){
			var $link = jQuery('#Main_ifrm_rightBnr').contents().find('#Main_link_rightSmallAd');
			$link.attr('href', 'http://www.44slimline.com/?mcode=08');
			$link.bind("click" , function(){
				doCommonStat('MAINMB60101');
			});

			jQuery('#Main_ifrm_rightBnr').contents().find('#Main_img_rightSmallAd').attr({
				'src' : 'http://i.011st.com/ds/2014/04/18/18/ab8997c77c7c408f408e8e00100dfe87.jpg',
				'alt' : '살빼는쉬운방법'
			});

		},
		setElement : function(){
			try{
				var samplingRate =   me.expandTime /  me.intervalTime;

				if(me.mouseOverTime < samplingRate){
					me.mouseOverTime ++;
				}

				var currentLoading = ( me.mouseOverTime / samplingRate  ) * 100 ;
				jQuery('#Main_ifrm_rightBnr').contents().find('#Main_span_rightAdLoading').css("width", currentLoading);

				if(me.mouseOverTime >= samplingRate && me.isMouseOver && !me.isDisplayAd){

					me.isDisplayAd = true;
					clearInterval(me.intervalObj);

					me.intervalObj = "";

					var $expAd = jQuery('#main_exp_ad');

					if ( $expAd.html() == '' ) {
						switch( me.adData.type ) {
							case 'A' :
								var html = '<a href="' + me.adData.extClick + '" target="_blank" onclick="doCommonStat(\'MAINMB60101\');"><img src="' + me.adData.extObj + '" alt="' + me.adData.extAlt + '"></a>';
								html += '	<button type="button" class="in_close" onclick="Main.dsRichAd.popupClose();">광고 닫기</button>';
								$expAd.html(html);
								break;
							case 'B' :
								$expAd.addClass('fullvideo');
							case 'C' :
								var html = '<div id= "main_exp_ad_player">';
								html += '<a href="' + me.adData.extClick + '" target="_blank" onclick="doCommonStat(\'MAINMB60101\');"><img src="' + me.adData.extReplaceImg + '" alt="' + me.adData.extAlt + '"></a>';
								html += '</div>';
								html += '<a id= "Main_link_rightAdFullPlayerScript" href="' + me.adData.scriptUrl + '" class="defbtn_sm dtype6" target="_blank"><span>대본다운로드</span></a>';
								html += '<button type="button" class="in_close" onclick="Main.dsRichAd.popupClose();">광고 닫기</button>';
								$expAd.html(html);

								var url = me.adData.extObj;
								var attributes = {};
								var flashvars = {LINKURL : me.adData.clickUrl};
								var params = { bgcolor:"", allowScriptAccess:"always", allowFullScreen:"false", quality:"high", wmode:"transparent", scale:"noscale", menu:"false", align:"left", salign:"t" };
								if ( me.adData.type == 'B'  ) {
									url = WWW_URL +  '/flash/richMedia/movie_11st.swf';
									flashvars.IMGURL = me.adData.extReplaceImg;
									flashvars.FLVURL = me.adData.extObj;
									//params.bgcolor = '#000000';
									//params.wmode = 'direct';
								}
								swfobject.embedSWF(url, "main_exp_ad_player", "826", "385", "9.0.115", "", flashvars, params, attributes);
								break;
						}
					}
					$expAd.css("display","block");
					doCommonStat('MAINMB60102');
					var img = new Image();
					img.src = me.adData.extImp;
				}
			}catch(e){
			}
		},
		dsCallback : function(data){
			try{
				me = this;
				if(data == null || typeof(data) == 'undefined' || data.type == ''){
					me.setReplace();
					return;
				}

				me.adData = data;
				// 모바일일때 일반형으로 처리
				if(isMobile == true){
					me.adData.type = 'D';
				}
				// iframe 영역 처리
				var $ifrmBnrWrapper =  jQuery('#Main_ifrm_rightBnr').contents();
				var $link = $ifrmBnrWrapper.find('#Main_link_rightSmallAd');
				$link.attr('href', me.adData.clickUrl);
				$link.bind({
					click : function(){
					doCommonStat('MAINMB60101');
					$link.keydown();
					},
					keydown : function(e){
						if(e.which == 13 && me.adData.type != 'D' && me.isDisplayAd == false){
							e.preventDefault();
							me.isMouseOver = true;
							me.mouseOverTime = me.expandTime / me.intervalTime;
							me.intervalObj = setInterval(me.setElement , me.intervalTime);
						}
					}
				});

				$ifrmBnrWrapper.find('#Main_img_rightSmallAd').attr({
					'src' : me.adData.baseImg,
					'alt' : me.adData.baseAlt
				});

				// 메인 확장형 광고
				if(me.adData.type != 'D'){
					$link.find('div').css('display' , 'block');
					if(me.adData.type == 'A'){
						$link.find('.desc').text('마우스를 올려주세요');
					}
					jQuery("#Main_layer_rightAd").bind({
						mouseover : function(){
							$link.find('.desc').css('display' , 'none');
							$link.find('.loading').css('display' , 'block');
							me.isMouseOver = true;
							me.mouseOverTime = 0;
							if(me.isDisplayAd == false ){
								me.intervalObj = setInterval(me.setElement , me.intervalTime);
							}
						},
						mouseleave : function(){
							me.isMouseOver = false;
							$link.find('.desc').css('display' , 'block');
							$link.find('.loading').css('display' , 'none');
							me.mouseOverTime = 0;
							$ifrmBnrWrapper.find('#Main_span_rightAdLoading').css("width", 0);
							clearInterval(me.intervalObj);
							me.intervalObj = "";
						}
					});
				}
			}catch(e){}

		},
		popupClose : function(type){
			var $expAd = jQuery('#main_exp_ad');
			$expAd.css("display","none");
			$expAd.html('');
			var $ifrmBnrWrapper =  jQuery('#Main_ifrm_rightBnr').contents();
			$ifrmBnrWrapper.find('.desc').css('display' , 'block');
			$ifrmBnrWrapper.find('.loading').css('display' , 'none');
			$ifrmBnrWrapper.find('#Main_span_rightAdLoading').css("width", 0);
			me.isDisplayAd = false;
		},
		openAd : function( url ){
			goStatUrl(url , 'MAINMB60101' , '_blank');
		},
		trace : function(msg){
			if(this.useTrace && console){
					console.log("[LOG] adDsBnr: ", msg);
			}
		}
};
