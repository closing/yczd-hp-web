var mobilePhoneIsOk = false;
var userNameIsOk = false;
var emailIsOk = false;
var mobilePhoneByIsOk = true;
var nameIsOk = false;
var birthdayIsOk = false;
var productionIsOk = true;
var address4IsOk = false;
var checkReg = {
    emailReg: /^(([a-zA-Z0-9]+\w*((\.\w+)|(-\w+))*[\.-]?[a-zA-Z0-9]+)|([a-zA-Z0-9]))\@[a-zA-Z0-9]+((\.|-)[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+$/, //匹配邮箱
    mobilePhoneReg: /^1[3,4,5,6,7,8,9][0-9]{9}$/,//匹配电话号码
    numberReg: /^[0-9]*$/,//匹配数字
    nameReg: /^(\w|[\u4E00-\u9FA5]|\s)*$/,//匹配 数字 字母 下划线 汉字 空白
	upperCaseReg: /[A-Z]/g,
    userNameReg: /^(\w|[\u4E00-\u9FA5])*$/,//匹配 字母 下划线
    lang_zh: {
        //账户信息
        '3101' : '4-20个字符，可由小写字母、中文、数字组成',
        '3102' : '用户名不能为空',
        '3103' : '该用户名已被使用，请更换其它用户名',
        '3104' : '最少4个字符，请输入您的用户名',
        '3105' : '最多只能为20个字符',
        '3106' : '用户名不能全由数字组成！',
        '3107' : '用户名不能有大写字母！',
		'3108' : '用户名只能是数字，小写字母和汉字',
		// 个人信息
		'3110' : '请填写真实姓名',
		'3111' : '请填写出生年月日',
		'3112' : '出生日期不正确，请重新输入',
		'3132' : '姓名不能为空',
        '3141' : '请选择并填写地址',
        '3144' : '地址最长只能为50个汉字（100个字符）',
        '3151' : '请输入邮箱',
        '3153' : '邮箱格式不正确，请重新输入',
        '3154' : '该邮箱已被注册，请更换其它邮箱',
        '3193' : '姓名只能为2-30个字符，不允许特殊符号',
        '3201' : '请输入手机号码',
        '3202' : '手机号不能为空',
        '3203' : '手机号格式不正确，请重新输入',
        '3204' : '此手机号已注册，请更换其它手机号',
		'3205' : '请输入推荐人的手机号码',
		'3206' : '手机号格式不正确，请重新输入',
		'3207' : '请输入已注册推荐人的手机号码',
		'3210' : '请输入主要生产类别',
		'3211' : '最长只能为50个汉字（100个字符），不允许特殊符号',
		'3241' : '注册失败，请稍后重试。'
    },
    mobilePhone: {
        checkMobilePhoneFocus: function(){
            checkReg.tool.switchInputStyle('normal','mobilePhone', 'tipImgMobilePhone','tipInfoMobilePhone');
            $('#tipInfoMobilePhone').html(checkReg.lang_zh['3201']);
        },
        checkMobilePhone: function(){
            checkReg.tool.switchInputStyle('normal','mobilePhone', 'tipImgMobilePhone','tipInfoMobilePhone');
            mobilePhoneIsOk = false;
            var mobilePhoneExist = false;
            var mobilePhone = $.trim($('#mobilePhone').val());

            if (mobilePhone == '') {
                return false;
            }
            if (!checkReg.mobilePhoneReg.test(mobilePhone)) {
                checkReg.tool.switchInputStyle('error','mobilePhone', 'tipImgMobilePhone','tipInfoMobilePhone');
                $('#tipInfoMobilePhone').html(checkReg.lang_zh['3203']);
                return false;
            }
            $.ajax({
            	type: 'POST',
                url: $("#contextPath").val() + '/commonapi/checkUser',
                dataType : "json",
                data: {
                	'key': mobilePhone
                },
                async: false,
                success: function (flg) {
                    if (flg == false) {
                        checkReg.tool.switchInputStyle('error','mobilePhone', 'tipImgMobilePhone','tipInfoMobilePhone');
                        $('#tipInfoMobilePhone').html(checkReg.lang_zh['3204']);
                        mobilePhoneExist = true;
                        return false;
                    }
                }
            });
            if (mobilePhoneExist == true) {
                return false;
            }
            checkReg.tool.switchInputStyle('ok','mobilePhone', 'tipImgMobilePhone','tipInfoMobilePhone');
            mobilePhoneIsOk = true;
            return true;
        }
    },
    userName: {
        checkFocus: function(){
            checkReg.tool.switchInputStyle('normal','userName', 'tipImgUserName','tipUserName');
            $('#tipInfoUserName').html(checkReg.lang_zh['3101']);
        },
        checkKeypress: function(){
        	var userName = $.trim($('#userName').val());
            if (userName == '') {
                return false;
            }
        	//格式正确性验证
            var verifyObj = checkReg.tool.VerifyCharLength(userName, 20);
            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
                checkReg.tool.switchInputStyle('error','userName', 'tipImgUserName','tipInfoUserName');
                $('#tipInfoUserName').text(checkReg.lang_zh['3105']);
                $('#userName').val(userName.substr(0,verifyObj.charLen));
                return false;
            }else{
            	checkReg.tool.switchInputStyle('normal','userName', 'tipImgUserName','tipInfoUserName');
            }
        },
        checkUserName: function(){
        	userNameIsOk = false;
            var userNameExist = false;
            checkReg.tool.switchInputStyle('normal','userName', 'tipImgUserName','tipInfoUserName');
            var userName = $.trim($('#userName').val());
            if (userName == '') {
            	// 不可以空
            	return false;
            }
            //格式正确性验证
            var verifyObj = checkReg.userName.VerifyFormatUserName(userName);
            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
                checkReg.tool.switchInputStyle('error','userName', 'tipImgUserName','tipInfoUserName');
                $('#tipInfoUserName').text(verifyObj.errorInfo);
                return false;
            }
            //唯一性验证
            $.ajax({
                type: 'POST',
                url: $("#contextPath").val() + '/commonapi/checkUser',
                dataType : "json",
                data: {
                	'key': userName
                },
                async: false,
                success : function(flg) {
					if (flg == false) {
                        checkReg.tool.switchInputStyle('error','userName', 'tipImgUserName','tipInfoUserName');
                        $('#tipInfoUserName').html(checkReg.lang_zh['3103'].replace('{#userName#}', userName));
                        userNameExist = true;
                        return false;
                    }
				},
                error: function(){
                	return false;
                }
            });
            if (userNameExist == true) {
                return false;
            }
            checkReg.tool.switchInputStyle('ok','userName', 'tipImgUserName','tipInfoUserName');
            userNameIsOk = true;
            return true;
        },
        VerifyFormatUserName: function(str){
            var errorInfo = '';
            var textFlag = false;
            var verifyObj = {"flag": textFlag, "errorInfo":""};
            if (str && str!=''){
                if (GetCharLength(str)<4){
                    errorInfo = checkReg.lang_zh['3104'];
                    textFlag = false;
                }else if(GetCharLength(str)>20){
                    errorInfo = checkReg.lang_zh['3105'];
                    textFlag = false;
                }
                else if(checkReg.numberReg.test(str)){
                    errorInfo = checkReg.lang_zh['3106'];
                    textFlag = false;
                }else if(checkReg.upperCaseReg.test(str)){
                    errorInfo = checkReg.lang_zh['3107'];
                    textFlag = false;
                }else{
                    if(str.match(checkReg.userNameReg)){
                        textFlag = true;
                    } else {
                        errorInfo = checkReg.lang_zh['3108'];
                        textFlag = false;
                    }
                }
                verifyObj = {"flag": textFlag, "errorInfo": errorInfo};
            }
            return verifyObj;
        }
    },
    email: {
        checkEmailFocus: function(){
            checkReg.tool.switchInputStyle('normal','email', 'tipImgEmail','tipInfoEmail');
            $('#tipInfoEmail').html(checkReg.lang_zh['3151']);
        },
        checkEmail: function(){
            emailIsOk = false;
            var emailExist = false;
            checkReg.tool.switchInputStyle('normal','email', 'tipImgEmail','tipInfoEmail');
            var email = $.trim($('#email').val());
            if (email == '') {
            	// 可以不填写
            	emailIsOk = true;
                return true;
            }
            if (email.length > 40 || !checkReg.emailReg.test(email)) {
                checkReg.tool.switchInputStyle('error','email', 'tipImgEmail','tipInfoEmail');
                $('#tipInfoEmail').html(checkReg.lang_zh['3153']);
                return false;
            }
            if (/[ ]/.test(email)) {
                checkReg.tool.switchInputStyle('error','email', 'tipImgEmail','tipInfoEmail');
                $('#tipInfoEmail').html(checkReg.lang_zh['3153']);
                return false;
            }
            $.ajax({
	            type: 'POST',
                url: $("#contextPath").val() + '/commonapi/checkUser',
                dataType : "json",
                data: {
                	'key': email,
                },
                async: false,
                success: function (flg) {
                    if (flg == false) {
                        checkReg.tool.switchInputStyle('error','email', 'tipImgEmail','tipInfoEmail');
                        $('#tipInfoEmail').html(checkReg.lang_zh['3154']);
                        emailExist = true;
                        return ;
                    }
                }
            });
            if (emailExist == true) {
                return false;
            }
            checkReg.tool.switchInputStyle('ok','email', 'tipImgEmail','tipInfoEmail');
            emailIsOk = true;
            return true;
        }
    },
	mobilePhoneBy : {
		checkMobilePhoneByFocus : function() {
			checkReg.tool.switchInputStyle('normal', 'mobilePhoneBy',
					'tipImgMobilePhoneBy', 'tipInfoMobilePhoneBy');
			$('#tipInfoMobilePhoneBy').html(checkReg.lang_zh['3205']);
		},
		checkMobilePhoneBy : function() {
			checkReg.tool.switchInputStyle('normal', 'mobilePhoneBy',
					'tipImgMobilePhoneBy', 'tipInfoMobilePhoneBy');
			mobilePhoneByIsOk = false;
			var mobilePhoneByExist = true;
			var mobilePhoneBy = $.trim($('#mobilePhoneBy').val());
			if (mobilePhoneBy == '') {
				// 可以不填
				mobilePhoneByIsOk = true;
				return true;
			}
			if (!checkReg.mobilePhoneReg.test(mobilePhoneBy)) {
				checkReg.tool.switchInputStyle('error', 'mobilePhoneBy',
						'tipImgMobilePhoneBy', 'tipInfoMobilePhoneBy');
				$('#tipInfoMobilePhoneBy').html(checkReg.lang_zh['3206']);
				return false;
			}
			$.ajax({
				type : 'POST',
				url : $("#contextPath").val() + '/commonapi/checkUser',
				dataType : "json",
				data : {
					'key' : mobilePhoneBy
				},
				async : false,
				success : function(flg) {
					if (flg == true) {
						// flg =false:存在 true:不存在
						checkReg.tool.switchInputStyle('error',
								'mobilePhoneBy', 'tipImgMobilePhoneBy',
								'tipInfoMobilePhoneBy');
						$('#tipInfoMobilePhoneBy').html(
								checkReg.lang_zh['3207']);
						mobilePhoneByExist = false;
						return false;
					}
				}
			});
			if (mobilePhoneByExist == false) {
				return false;
			}
			checkReg.tool.switchInputStyle('ok', 'mobilePhoneBy',
					'tipImgMobilePhoneBy', 'tipInfoMobilePhoneBy');
			mobilePhoneByIsOk = true;
			return true;
		}
	},
    name: {
        checkNameFocus: function(){
            checkReg.tool.switchInputStyle('normal','name', 'tipImgInfoName','tipInfoName');
            $('#tipInfoName').html(checkReg.lang_zh['3110']);
        },
        checkKeypress: function(){
        	var name = $.trim($('#name').val());
            if (name == '') {
                return true;
            }
        	//格式正确性验证
            var verifyObj = checkReg.tool.VerifyCharLength(name, 30);
            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
            	checkReg.tool.switchInputStyle('error','name', 'tipImgInfoName','tipInfoName');
                $('#tipInfoName').text(checkReg.lang_zh['3193']);
                $('#name').val(name.substr(0,verifyObj.charLen));
                return false;
            }else{
            	checkReg.tool.switchInputStyle('normal','name', 'tipImgInfoName','tipInfoName');
            	return true;
            }
        },
        checkName: function(){
            nameIsOk = false;
            checkReg.tool.switchInputStyle('normal','name', 'tipImgInfoName','tipInfoName');

            var name = $.trim($('#name').val());
            if (name == '') {
                return false;
            }

            //格式正确性验证
            var len = GetCharLength(name);
            if (len<2 || len>30){
                checkReg.tool.switchInputStyle('error','name', 'tipImgInfoName','tipInfoName');
                $('#tipInfoName').html(checkReg.lang_zh['3193']);
                return false;
            }
            if (!checkReg.nameReg.test(name)) {
                checkReg.tool.switchInputStyle('error','name', 'tipImgInfoName','tipInfoName');
                $('#tipInfoName').html(checkReg.lang_zh['3193']);
                return false;
            }
            checkReg.tool.switchInputStyle('ok','name', 'tipImgInfoName','tipInfoName');
            nameIsOk = true;
            return true;
        }
    },
    birthday: {
    	checkBirthdayFocus: function(){
            checkReg.tool.switchInputStyle('normal', 'birthday', 'tipImgInfoBirthday', 'tipInfoBirthday');
            $('#tipInfoBirthday').html(checkReg.lang_zh['3111']);
            var birthday = $.trim($('#birthday').val());
            if (birthday == null || birthday == ""){
            	$('#birthday').attr("value","1988-01-01");
            }
        },
        checkBirthday: function(){
        	birthdayIsOk = false;
            checkReg.tool.switchInputStyle('normal', 'birthday', 'tipImgInfoBirthday', 'tipInfoBirthday');
            var birthday = $.trim($('#birthday').val());
            if (birthday == '') {
            	birthdayIsOk = true;
                return true;
            }

            //格式正确性验证
            if (false == (new Date(birthday).getDate()==birthday.substring(birthday.length-2))) {
            	// 日期格式不正确
            	checkReg.tool.switchInputStyle('error','birthday', 'tipImgInfoBirthday','tipInfoBirthday');
            	$('#tipInfoBirthday').html(checkReg.lang_zh['3112']);
	            return false;
            }

        	// 未来日期不可以
        	var today = new Date();
        	var birthdayDate = new Date(birthday);
            if (today.getFullYear() <= birthdayDate.getFullYear()) {
            	// 只判断年
            	checkReg.tool.switchInputStyle('error','birthday', 'tipImgInfoBirthday','tipInfoBirthday');
                $('#tipInfoBirthday').html(checkReg.lang_zh['3112']);
                return false;
            }
            checkReg.tool.switchInputStyle('ok','birthday', 'tipImgInfoBirthday','tipInfoBirthday');
            birthdayIsOk = true;
            return true;
        }

    },
    production: {
        checkProductionFocus: function(){
            checkReg.tool.switchInputStyle('normal','production', 'tipImgInfoProduction','tipInfoProduction');
            $('#tipInfoProduction').html(checkReg.lang_zh['3210']);
        },
        checkKeypress: function(){
        	var production = $.trim($('#production').val());
            if (production == '') {
                return true;
            }
        	//格式正确性验证
            var verifyObj = checkReg.tool.VerifyCharLength(production, 100);
            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
            	checkReg.tool.switchInputStyle('error','production', 'tipImgInfoProduction','tipInfoProduction');
                $('#tipInfoProduction').text(checkReg.lang_zh['3211']);
                $('#production').val(production.substr(0,verifyObj.charLen));
                return false;
            }else{
            	checkReg.tool.switchInputStyle('normal','production', 'tipImgInfoProduction','tipInfoProduction');
            	return true;
            }
        },
        checkProduction: function(){
        	productionIsOk = false;
            checkReg.tool.switchInputStyle('normal','production', 'tipImgInfoProduction','tipInfoProduction');

            var production = $.trim($('#production').val());
            if (production == '') {
            	productionIsOk = true;
                return true;
            }
            //格式正确性验证
            var len = GetCharLength(production);
            if (len<2 || len>100){
                checkReg.tool.switchInputStyle('error','production', 'tipImgInfoProduction','tipInfoProduction');
                $('#tipInfoProduction').html(checkReg.lang_zh['3211']);
                return false;
            }
            if (!checkReg.nameReg.test(production)) {
                checkReg.tool.switchInputStyle('error','production', 'tipImgInfoProduction','tipInfoProduction');
                $('#tipInfoProduction').html(checkReg.lang_zh['3211']);
                return false;
            }
            checkReg.tool.switchInputStyle('ok','production', 'tipImgInfoProduction','tipInfoProduction');
            productionIsOk = true;
            return true;
        }
    },
    address: {
        checkAddressFocus: function(){
            checkReg.tool.switchInputStyle('normal', 'address4', 'tipImgAddress4', 'tipInfoAddress4');
            $('#tipInfoAddress4').html(checkReg.lang_zh['3141']);
        },
        checkKeypress: function(){
        	var address4 = $.trim($('#address4').val());
            if (address4 == '') {
                return true;
            }
        	//格式正确性验证
            var verifyObj = checkReg.tool.VerifyCharLength(address4, 100);
            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
            	checkReg.tool.switchInputStyle('error', 'address4', 'tipImgAddress4', 'tipInfoAddress4');
                $('#tipInfoAddress4').text(checkReg.lang_zh['3144']);
                $('#address4').val(address4.substr(0,verifyObj.charLen));
                return false;
            }else{
            	checkReg.tool.switchInputStyle('normal', 'address4', 'tipImgAddress4', 'tipInfoAddress4');
            }
        },
        checkAddress: function(){
        	address4IsOk = false;
            checkReg.tool.switchInputStyle('normal', 'address4', 'tipImgAddress4', 'tipInfoAddress4');
            var $tipInfoAddr = $('#tipInfoAddr');
            var address4 = $('#address4').val();
            if (address4 == ''){
                address4IsOk = true;
                return true;
            }
            //格式正确性验证
            var len = GetCharLength(address4);
            if (len>100){
                checkReg.tool.switchInputStyle('error','address4', 'tipImgAddress4','tipInfoAddress4');
                $('#tipInfoAddress4').html(checkReg.lang_zh['3144']);
                return false;
            }
            if (!checkReg.nameReg.test(address4)) {
                checkReg.tool.switchInputStyle('error','address4', 'tipImgAddress4','tipInfoAddress4');
                $('#tipInfoAddress4').html(checkReg.lang_zh['3144']);
                return false;
            }
            address4IsOk = true;
            checkReg.tool.switchInputStyle('ok', 'address4', 'tipImgAddress4', 'tipInfoAddress4');
            return true;
        }
    },
    tool:{
        //将单元格恢复到最初样式
        switchInputStyle: function(showType, inputId, tipImgId, tipInfoId){
            if(showType == 'normal') {
                $('#' + inputId).removeClass('was-validated is-invalid is-valid');
                // $('#' + tipImgId).hide();
                $('#' + tipInfoId).removeClass('invalid-feedback').addClass('valid-feedback').html('').css({'display':'block'});
            }else if(showType == 'ok') {
                $('#' + inputId).addClass('was-validated is-valid').removeClass('is-invalid');
                // $('#' + tipImgId).removeClass('wl_select_icon22').css({'display':'inline-block'});
                $('#' + tipInfoId).removeClass('invalid-feedback').addClass('valid-feedback').css({'display':'block'});
            } else if(showType == 'error') {
                $('#' + inputId).addClass('was-validated is-invalid').removeClass('is-valid');
                // $('#' + tipImgId).addClass('wl_select_icon22').css({'display':'inline-block'});
                $('#' + tipInfoId).addClass('invalid-feedback').addClass('valid-feedback').css({'display':'block'});
            }
        },
        isFunc: function(funcName){
            return typeof funcName == 'function';
        },
        VerifyCharLength: function(str, maxLen){
            var newCharLen = maxLen;
            var textFlag = true;
            var verifyObj = {"flag": textFlag, "charLen": newCharLen};
            if (str && str!=''){
                if(GetCharLength(str)>maxLen){
                	var charLen = str.length;
                    textFlag = false;
                    var l = 0;
                    for(var i=0;i<charLen; i++){
                    	l += GetCharLength(str[i]);
                    	if( l==maxLen ){
                    		newCharLen = (i+1);
                    		break;
                    	}else if(l>maxLen){
                    		newCharLen = i;
                    		break;
                    	}
                    }
                }
                verifyObj = {"flag": textFlag, "charLen":newCharLen};
            }
            return verifyObj;
        }
    }
};
//字符串长度，一个中文记为2个长度
function GetCharLength(str) {
    var iLength = 0;
    for(var i = 0;i<str.length;i++){
        if(str.charCodeAt(i) >255){
            iLength += 2;
        } else {
            iLength += 1;
        }
    }
    return iLength;
}

//提交注册
function check_register(e) {
    //账户信息
    var mobilePhoneTrim = $.trim($('#mobilePhone').val());
    var userNameTrim = $.trim($('#userName').val());
    //个人信息
    var nameTrim = $.trim($('#name').val());

    //为空判断
    if (userNameTrim == '' || mobilePhoneTrim == '' || nameTrim == '') {
        if (mobilePhoneTrim == "") {
            checkReg.tool.switchInputStyle('error','mobilePhone', 'tipImgMobilePhone','tipInfoMobilePhone');
            $('#tipInfoMobilePhone').html(checkReg.lang_zh['3202']);
        }
        if (userNameTrim == "") {
            checkReg.tool.switchInputStyle('error','userName', 'tipImgUserName','tipInfoUserName');
            $('#tipInfoUserName').html(checkReg.lang_zh['3102']);
        }
        if (nameTrim == "") {
            checkReg.tool.switchInputStyle('error', 'name', 'tipImgName','tipInfoName');
            $('#tipInfoName').html(checkReg.lang_zh['3132']);
        }

        //防止重复提交
        submitBtnAvailability('enable');
        e.preventDefault();
        return false;
    }
    //所填信息是否正确判断
	if (mobilePhoneIsOk && userNameIsOk && emailIsOk && mobilePhoneByIsOk && nameIsOk && productionIsOk && birthdayIsOk && address4IsOk) {
		return true;

	} else {
			e.preventDefault();
			submitBtnAvailability('enable');
			return false;
	}
}
//通过浏览器回退按钮返回该页面时，不会清空之前已填写的内容，需要在加载页面时验证一下已填写的内容
function verifyRollback() {
	checkReg.mobilePhone.checkMobilePhone();
	checkReg.userName.checkUserName();
	checkReg.email.checkEmail();
	checkReg.mobilePhoneBy.checkMobilePhoneBy();
	checkReg.name.checkName();
	checkReg.birthday.checkBirthday();
	checkReg.production.checkProduction();
	checkReg.address.checkAddress();
}
//防止重复提交注册
function submitBtnAvailability(type) {
	if (type == 'disable') {
		$('#saveButtonUnclick').show();
		$('#saveButton').hide();
	} else {
		$('#saveButtonUnclick').hide();
		$('#saveButton').show();
	}
}
$(function() {
	verifyRollback();
	//手机号码
	$('#mobilePhone').bind("focus", function() {
		checkReg.mobilePhone.checkMobilePhoneFocus();
	});
	$("#mobilePhone").blur(function() {
		checkReg.mobilePhone.checkMobilePhone();
	});
	//设置鼠标焦点在输入框内时提示信息
	$('#userName').bind("focus", function() {
		checkReg.userName.checkFocus();
	});
	//最多只允许输入10个汉字
	$('#userName').on('keyup', function() {
		checkReg.userName.checkKeypress();
	});
	//账号输入框失去焦点时，触发账号合法性验证
	$("#userName").blur(function() {
		checkReg.userName.checkUserName();
	});
	//邮箱
	$('#email').bind("focus", function() {
		checkReg.email.checkEmailFocus();
	});
	$("#email").blur(function() {
		checkReg.email.checkEmail();
	});
	// 推荐人手机号码
	$('#mobilePhoneBy').bind("focus", function() {
		checkReg.mobilePhoneBy.checkMobilePhoneByFocus();
	});
	$("#mobilePhoneBy").blur(function() {
		checkReg.mobilePhoneBy.checkMobilePhoneBy();
	});
	//名称
	$('#name').bind("focus", function() {
		checkReg.name.checkNameFocus();
	});
	$("#name").blur(function() {
		checkReg.name.checkName();
	});
	//最多只允许输入30个汉字 60个字符
	$('#name').on('keyup', function() {
		checkReg.name.checkKeypress();
	});
	// 生日
	$('#birthday').on("focus", function() {
		checkReg.birthday.checkBirthdayFocus();
	});
	$("#birthday").on('blur', function() {
		checkReg.birthday.checkBirthday();
	});
	//生产类别
	$('#production').bind("focus", function() {
		checkReg.production.checkProductionFocus();
	});
	$("#production").blur(function() {
		checkReg.production.checkProduction();
	});
	//最多只允许输入50个汉字 100个字符
	$('#production').on('keyup', function() {
		checkReg.production.checkKeypress();
	});
	//详细地址
	$('#address4').on("focus", function() {
		checkReg.address.checkAddressFocus();
	});
	//最多只允许输入64个汉字
	$('#address4').on("keyup", function() {
		checkReg.address.checkKeypress();
	});
	$("#address4").on('blur', function() {
		checkReg.address.checkAddress();
	});

	//提交注册
	$('form').submit(function(e) {
		//防止重复提交
		submitBtnAvailability('disable');
		//由于在ie8以下的浏览器版本，防止重复提交按钮不明显，所以延时0.1s执行注册操作
		setTimeout(check_register(e), 50);
		//check_register();
	});
});
