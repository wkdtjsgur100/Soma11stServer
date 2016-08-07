(function() {
    function init() {
        if(getCookie('floatIconDone')) {
            return;
        }
        var pagePath = window.location.pathname + window.location.search;

        var params = {
            url : "http://www.11st.co.kr/jsp/browsing/event/floatingEvent.jsp?inflowUrl="+encodeURIComponent(pagePath),
            method: "post",
            success : function(result) {
                try {
                    if(result) {
                        var obj = jQuery.parseJSON(result);
                        if (result) {
                            displayBanner(obj);
                        }
                    }
                } catch(e) {}
            },
            error: function(e) {}
        };
        callAjax(params)
    };

    function displayBanner(data) {
        if(data.floatIcon) {
            var left = Math.round( ( jQuery(window).width() - 980 ) / 2 );
            left = ( ( left < 0 ) ? -left : left ) + 250;

            var iconHtml = '<div id="floatWrap" style="position:absolute; width:185px; height:185px; top:600px; left:'+left+'px;z-index:100">';
            iconHtml += '<div class="closeArea" id="floatCloseArea" style="position:absolute; top:0; right:0; width:40px; height:40px; z-index:20;">';
            iconHtml += '<a href="javascript:void(0);"><img src="http://i.011st.com/ui_img/cm_display/2016/07/MPSM/120-15/float/close.png" alt=""></a>';
            iconHtml += '</div>';
            iconHtml += '<div class="bnrArea" id="floatIconArea" style="position:relative;width:180px; height:180px; z-index:10;">';
            iconHtml += '<a href="javascript:void(0);"><img src="'+data.floatIcon+'" alt=""></a>';
            iconHtml += '</div>';
            iconHtml += '</div>';

            jQuery('body').append(iconHtml);

            var floatIconArea = document.getElementById('floatIconArea');

            jQuery('#floatIconArea').bind('click', {callback : eventProc, callbackdata: data}, function(event) {
                event.data.callback(event.data.callbackdata);
                jQuery('#floatWrap').hide();

            })
            jQuery('#floatCloseArea').click(function() {
                jQuery('#floatWrap').hide();
            });

            setCookie("floatIconDone", "Y", 3);
        }
    }

    function eventProc(data) {
        var procUrl = data.eventProcUrl;
        if(procUrl) {
            var params = {
                url : procUrl,
                method:"post",
                success : function(result) {
                    var obj = jQuery.parseJSON(result);

                    var left = Math.round( ( jQuery(window).width() - 980 ) / 2 );
                    left = ( ( left < 0 ) ? -left : left ) + 250;

                    var alertHtml = '<div id="floatAlertWrap" style="position:absolute; width:450px; height:490px; top:300px; left:'+left+'px;z-index:100">';
                    if(obj.RESULT_KEY == '101') {
                        alertHtml += '<div style="position:absolute; width:180px; height:80px; top:348px; left:0px;">';
                        alertHtml += '<a href="'+obj.url+'"><img src="http://i.011st.com/ui_img/cm_display/2016/07/MPSM/120-15/float/layer_btn1.png" alt=""></a>';
                        alertHtml += '</div>';
                        alertHtml += '<div style="position:absolute; width:180px; height:80px; top:348px; left:230px;" id="floatAlertCloseBtn">';
                        alertHtml += '<a href="javascript:void(0);"><img src="http://i.011st.com/ui_img/cm_display/2016/07/MPSM/120-15/float/layer_btn2.png" alt=""></a>';
                        alertHtml += '</div>';
                        alertHtml += '<img src="http://i.011st.com/ui_img/cm_display/2016/07/MPSM/120-15/float/popbg.jpg" alt="">';
                    } else if(obj.RESULT_KEY == '201') {
                        alertHtml += '<div style="position:absolute; width:260px; height:80px; top:348px; left:0px;" id="floatAlertCloseBtn">';
                        alertHtml += '<a href="javascript:void(0);"><img src="http://i.011st.com/ui_img/cm_display/2016/07/MPSM/120-15/float/layer_btn3.png" alt=""></a>';
                        alertHtml += '</div>';
                        alertHtml += '<img src="http://i.011st.com/ui_img/cm_display/2016/07/MPSM/120-15/float/popbg2.jpg" alt="">';
                    } else if(obj.RESULT_KEY == '202') {
                        document.location.href = 'https://login.11st.co.kr/login/Login.tmall?returnUrl='+encodeURIComponent(document.URL);
                    } else {
                        alert(obj.RESULT_VALUE);
                        return;
                    }
                    alertHtml += '</div>';

                    jQuery('body').append(alertHtml);

                    jQuery('#floatAlertCloseBtn').click(function() {
                        jQuery('#floatAlertWrap').hide();
                    });
                },
                error: function(e) {}
            };
            callAjax(params);
        } else {
            document.location.href = 'https://login.11st.co.kr/login/Login.tmall?returnUrl='+encodeURIComponent(document.URL);
        }

    }

    function setCookie(cName, value, expiredays) {
        var todayDate = new Date();
        todayDate.setSeconds(todayDate.getDate() + 5);
        document.cookie = cName + "=" + escape(value) + "; path=/; expires="
            + todayDate.toGMTString() + ";";
    }

    function getCookie(cName) {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    }

    function callAjax(s) {
        var xhr = window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP') : new window.XMLHttpRequest();
        var method = s.method ? s.method : 'get';
        var async = s.async ? s.async : true;
        try {
            if (s.param && s.param != "") {
                xhr.open(method, url.url, async);
                var contentType = url.contentType ? s.contentType : "application/x-www-form-urlencoded";
                xhr.setRequestHeader("Content-type", contentType);
                xhr.setRequestHeader("Content-length", s.param.length);
                xhr.setRequestHeader("Connection", "close");
                xhr.send(s.param);
            } else {
                xhr.open(method, s.url, async);
                xhr.send(null);
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var data;
                    if (xhr.status == 200) {
                        data = xhr.responseText;
                        if(s.success) s.success(data);
                    }
                }
            };
        } catch (e){
            if(s.error) s.error(e);
        }
    };

    init();


})();
