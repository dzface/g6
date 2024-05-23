// 본인확인 인증창 호출
function certify_win_open(type, url, event) {
    if (typeof event == "undefined") {
        event = window.event;
    }

    if(type == 'kcb-ipin')
    {
        var popupWindow = window.open( url, "kcbPop", "left=200, top=100, status=0, width=450, height=550" );
        popupWindow.focus();
    }
    else if(type == 'kcb-hp')
    {
        var popupWindow = window.open( url, "auth_popup", "left=200, top=100, width=430, height=590, scrollbar=yes" );
        popupWindow.focus();
    }
    else if(type == 'kcp-hp')
    {
        var width  = 410;
        var height = 500;

        var leftpos = screen.width  / 2 - ( width  / 2 );
        var toppos  = screen.height / 2 - ( height / 2 );

        var winopts  = "width=" + width   + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
        var position = ",left=" + leftpos + ", top="    + toppos;
        var AUTH_POP = window.open(url,'auth_popup', winopts + position);
        AUTH_POP.focus();
    }
    else if(type == 'lg-hp')
    {

        if( g6_is_mobile )
        {
            var $frm = $(event.target.form),
                lgu_cert = "lgu_cert";

            if($("#lgu_cert").length < 1) {
                $frm.wrap('<div id="cert_info"></div>');

                $("#cert_info").append('<form name="form_temp" method="post">');
            } else {
                $("#"+lgu_cert).remove();
            }

            $("#cert_info")
                .after('<iframe id="'+lgu_cert+'" name="lgu_cert" width="100%" src="'+url+'" height="700" frameborder="0" scrolling="no" style="display:none"></iframe>');

            document.getElementById( "cert_info" ).style.display = "none";
            document.getElementById( lgu_cert  ).style.display = "";

        } else {
            var width= 640;
            var height = 660;

            var leftpos = screen.width  / 2 - ( width  / 2 );
            var toppos  = screen.height / 2 - ( height / 2 );

            var popupWindow = window.open( url, "auth_popup", "left=" + leftpos + ", top="    + toppos + ", width=" + width   + ", height=" + height + ", scrollbar=yes" );
            popupWindow.focus();
        }
    }
}

// 인증체크
function cert_confirm() {
        
    var type;
    var val = document.fregisterform.cert_type.value;

    switch(val) {
        case "simple":
            type = "간편인증";
            break;
        case "ipin":
            type = "아이핀";
            break;
        case "hp":
            type = "휴대폰";
            break;
        default:
            return true;
    }

    if(confirm("이미 "+type+"으로 본인확인을 완료하셨습니다.\n\n이전 인증을 취소하고 다시 인증하시겠습니까?"))
        return true;
    else
        return false;
}

// 간편인증 팝업창 호출
function call_sa(url) {   
    let window = popup_center();
    if(window != undefined && window != null) {
        window.location.href = url;
    }
}

function popup_center() {
	let _width = 400;
	let _height = 620;
	var xPos = (document.body.offsetWidth/2) - (_width/2); // 가운데 정렬
	xPos += window.screenLeft; // 듀얼 모니터일 때 

    return window.open("", "sa_popup", "width="+_width+", height="+_height+", left="+xPos+", menubar=yes, status=yes, titlebar=yes, resizable=yes");
}