var mobilePhoneIsOk = false;
var userNameIsOk = false;
var emailIsOk = false;
var companyNameIsOk = false;
var address4IsOk = false;
var tel1IsOk = false;
var tel2IsOk = false;
var tel3IsOk = true; //允许为空
var contactIsOk = false;

var checkReg = {
	emailReg : /^(([a-zA-Z0-9]+\w*((\.\w+)|(-\w+))*[\.-]?[a-zA-Z0-9]+)|([a-zA-Z0-9]))\@[a-zA-Z0-9]+((\.|-)[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+$/, //匹配邮箱
	mobilePhoneReg : /^1[3,4,5,6,7,8,9][0-9]{9}$/,//匹配电话号码
	numberReg : /^[0-9]*$/,//匹配数字
	nameReg : /^(\w|[\u4E00-\u9FA5]|\s)*$/,//匹配 数字 字母 下划线 汉字 空白
	upperCaseReg : /[A-Z]/g,
	userNameReg : /^(\w|[\u4E00-\u9FA5])*$/,//匹配 字母 下划线
	companNameReg : /^(\w|[\u4E00-\u9FA5])*$/,//匹配 汉字 数字 字母 下划线
	lang_zh : {
		//账户信息
		'3101' : '4-20个字符，可由小写字母、中文、数字组成',
		'3102' : '用户名不能为空',
		'3103' : '该用户名已被使用，请更换其它用户名',
		'3104' : '最少4个字符，请输入您的用户名',
		'3105' : '最多只能为20个字符',
		'3106' : '用户名不能全由数字组成！',
		'3107' : '用户名不能有大写字母！',
		'3108' : '用户名只能是数字，小写字母和汉字',
		//企业及联系人信息
		'3131' : '请填写单位执照上的名称，最长为30个汉字（60个字符）',
		'3132' : '姓名不能为空',
		'3133' : '公司名称最长只能为30个汉字（60个字符）',
		'3134' : '该公司名称已被注册',
		'3141' : '请选择并填写地址',
		'3144' : '地址最长只能为50个汉字（100个字符）',
		'3151' : '请输入邮箱',
		'3152' : '邮箱不能为空',
		'3153' : '邮箱格式不正确，请重新输入',
		'3154' : '该邮箱已被注册，请更换其它邮箱',
		'3161' : '请输入区号',
		'3162' : '电话不能为空',
		'3163' : '只能3-4位纯数字',
		'3171' : '请输入座机号',
		'3172' : '座机号不能为空',
		'3173' : '只能7-8位纯数字',
		'3181' : '请输入分机号,没有可不填写',
		'3183' : '只能是数字',
		'3191' : '2-30个字符，可有中文或英文组成',
		'3192' : '联系人姓名不能为空',
		'3193' : '联系人姓名只能为2-30个字符，不允许特殊符号',
		'3201' : '请输入手机号码',
		'3202' : '手机号不能为空',
		'3203' : '手机号格式不正确，请重新输入',
		'3204' : '此手机号已注册，请更换其它手机号',
		'3241' : '注册失败，请稍后重试。'
	},
	mobilePhone : {
		checkMobilePhoneFocus : function() {
			checkReg.tool.switchInputStyle('normal', 'mobilePhone',
					'tipImgMobilePhone', 'tipInfoMobilePhone');
			$('#tipInfoMobilePhone').html(checkReg.lang_zh['3201']);
		},
		checkMobilePhone : function() {
			checkReg.tool.switchInputStyle('normal', 'mobilePhone',
					'tipImgMobile', 'tipInfoMobilePhone');
			mobilePhoneIsOk = false;
			var mobilePhoneExist = false;
			var mobilePhone = $.trim($('#mobilePhone').val());
			if (mobilePhone == '') {
				return false;
			}
			if (!checkReg.mobilePhoneReg.test(mobilePhone)) {
				checkReg.tool.switchInputStyle('error', 'mobilePhone',
						'tipImgMobile', 'tipInfoMobilePhone');
				$('#tipInfoMobilePhone').html(checkReg.lang_zh['3203']);
				return false;
			}
			$.ajax({
				type : 'POST',
				url : $("#contextPath").val() + '/commonapi/checkUser',
				dataType : "json",
				data : {
					'key' : mobilePhone
				},
				async : false,
				success : function(flg) {
					if (flg == false) {
						checkReg.tool.switchInputStyle('error',
								'mobilePhone', 'tipImgMobile',
								'tipInfoMobilePhone');
						$('#tipInfoMobilePhone').html(
								checkReg.lang_zh['3204']);
						mobilePhoneExist = true;
						return false;
					}
				}
			});
			if (mobilePhoneExist == true) {
				return false;
			}
			checkReg.tool.switchInputStyle('ok', 'mobilePhone',
					'tipImgMobile', 'tipInfoMobilePhone');
			mobilePhoneIsOk = true;
			return true;
		}
	},
	userName : {
		checkFocus : function() {
			checkReg.tool.switchInputStyle('normal', 'userName',
					'tipImgUserName', 'tipUserName');
			$('#tipInfoUserName').html(checkReg.lang_zh['3101']);
		},
		checkKeypress : function() {
			var userName = $.trim($('#userName').val());
			if (userName == '') {
				return false;
			}
			//格式正确性验证
			var verifyObj = checkReg.tool
					.VerifyCharLength(userName, 20);
			if (verifyObj && ('flag' in verifyObj)
					&& verifyObj.flag === false) {
				checkReg.tool.switchInputStyle('error', 'userName',
						'tipImgUserName', 'tipInfoUserName');
				$('#tipInfoUserName').text(checkReg.lang_zh['3105']);
				$('#userName').val(
						userName.substr(0, verifyObj.charLen));
				return false;
			} else {
				checkReg.tool.switchInputStyle('normal', 'userName',
						'tipImgUserName', 'tipInfoUserName');
			}
		},
		checkUserName : function() {
			userNameIsOk = false;
			var userNameExist = false;
			checkReg.tool.switchInputStyle('normal', 'userName',
					'tipImgUserName', 'tipInfoUserName');
			var userName = $.trim($('#userName').val());
			if (userName == '') {
				// 不可以空
				return false;
			}
			//格式正确性验证
			var verifyObj = checkReg.userName
					.VerifyFormatUserName(userName);
			if (verifyObj && ('flag' in verifyObj)
					&& verifyObj.flag === false) {
				checkReg.tool.switchInputStyle('error', 'userName',
						'tipImgUserName', 'tipInfoUserName');
				$('#tipInfoUserName').text(verifyObj.errorInfo);
				return false;
			}
			//唯一性验证
			$.ajax({
				type : 'POST',
				url : $("#contextPath").val() + '/commonapi/checkUser',
				dataType : "json",
				data : {
					'key' : userName
				},
				async : false,
				success : function(flg) {
					if (flg == false) {
						checkReg.tool.switchInputStyle('error',
								'userName', 'tipImgUserName',
								'tipInfoUserName');
						$('#tipInfoUserName').html(
								checkReg.lang_zh['3103'].replace(
										'{#userName#}', userName));
						userNameExist = true;
						return false;
					}
				},
				error : function() {
					return false;
				}
			});
			if (userNameExist == true) {
				return false;
			}
			checkReg.tool.switchInputStyle('ok', 'userName',
					'tipImgUserName', 'tipInfoUserName');
			userNameIsOk = true;
			return true;
		},
		VerifyFormatUserName : function(str) {
			var errorInfo = '';
			var textFlag = false;
			var verifyObj = {
				"flag" : textFlag,
				"errorInfo" : ""
			};
			if (str && str != '') {
				if (GetCharLength(str) < 4) {
					errorInfo = checkReg.lang_zh['3104'];
					textFlag = false;
				} else if (GetCharLength(str) > 20) {
					errorInfo = checkReg.lang_zh['3105'];
					textFlag = false;
				} else if (checkReg.numberReg.test(str)) {
					errorInfo = checkReg.lang_zh['3106'];
					textFlag = false;
				} else if (checkReg.upperCaseReg.test(str)) {
					errorInfo = checkReg.lang_zh['3107'];
					textFlag = false;
				} else {
					if (str.match(checkReg.userNameReg)) {
						textFlag = true;
					} else {
						errorInfo = checkReg.lang_zh['3108'];
						textFlag = false;
					}
				}
				verifyObj = {
					"flag" : textFlag,
					"errorInfo" : errorInfo
				};
			}
			return verifyObj;
		}
	},
	email : {
		checkEmailFocus : function() {
			checkReg.tool.switchInputStyle('normal', 'email',
					'tipImgEmail', 'tipInfoEmail');
			$('#tipInfoEmail').html(checkReg.lang_zh['3151']);
		},
		checkEmail : function() {
			emailIsOk = false;
			var emailExist = false;
			checkReg.tool.switchInputStyle('normal', 'email',
					'tipImgEmail', 'tipInfoEmail');
			var email = $.trim($('#email').val());
			if (email == '') {
				// 可以不填写
				emailIsOk = true;
				return true;
			}
			if (email.length > 40 || !checkReg.emailReg.test(email)) {
				checkReg.tool.switchInputStyle('error', 'email',
						'tipImgEmail', 'tipInfoEmail');
				$('#tipInfoEmail').html(checkReg.lang_zh['3153']);
				return false;
			}
			if (/[ ]/.test(email)) {
				checkReg.tool.switchInputStyle('error', 'email',
						'tipImgEmail', 'tipInfoEmail');
				$('#tipInfoEmail').html(checkReg.lang_zh['3153']);
				return false;
			}
			$
					.ajax({
						type : 'POST',
						url : $("#contextPath").val()
								+ '/commonapi/checkUser',
						dataType : "json",
						data : {
							'key' : email,
						},
						async : false,
						success : function(flg) {
							if (flg == false) {
								checkReg.tool.switchInputStyle('error',
										'email', 'tipImgEmail',
										'tipInfoEmail');
								$('#tipInfoEmail').html(
										checkReg.lang_zh['3154']);
								emailExist = true;
								return;
							}
						}
					});
			if (emailExist == true) {
				return false;
			}
			checkReg.tool.switchInputStyle('ok', 'email',
					'tipImgEmail', 'tipInfoEmail');
			emailIsOk = true;
			return true;
		}
	},
	companyName : {
		checkCompanyNameFocus : function() {
			checkReg.tool.switchInputStyle('normal', 'companyName',
					'tipImgCompanyName', 'tipInfoCompanyName');
			$('#tipInfoCompanyName').html(checkReg.lang_zh['3131']);
		},
		checkKeypress : function() {
			var companyName = $.trim($('#companyName').val());
			if (companyName == '') {
				return false;
			}
			//格式正确性验证
			var verifyObj = checkReg.tool.VerifyCharLength(companyName,
					60);
			if (verifyObj && ('flag' in verifyObj)
					&& verifyObj.flag === false) {
				checkReg.tool.switchInputStyle('error', 'companyName',
						'tipImgCompanyName', 'tipInfoCompanyName');
				$('#tipInfoCompanyName').text(checkReg.lang_zh['3133']);
				$('#companyName').val(
						companyName.substr(0, verifyObj.charLen));
				return false;
			} else {
				checkReg.tool.switchInputStyle('normal', 'companyName',
						'tipImgCompanyName', 'tipInfoCompanyName');
			}
		},
		checkCompanyName : function() {
			companyNameIsOk = false;
			var companyNameExist = false;
			checkReg.tool.switchInputStyle('normal', 'companyName',
					'tipImgCompanyName', 'tipInfoCompanyName');

			var companyName = $.trim($('#companyName').val());
			if (companyName == '') {
				return false;
			}

			//格式正确性验证
			var verifyObj = checkReg.companyName
					.VerifyFormatCompanyName(companyName);
			if (verifyObj && ('flag' in verifyObj)
					&& verifyObj.flag === false) {
				checkReg.tool.switchInputStyle('error', 'companyName',
						'tipImgCompanyName', 'tipInfoCompanyName');
				$('#tipInfoCompanyName').text(verifyObj.errorInfo);
				return false;
			}

			//唯一性验证
			$.ajax({
				type : 'POST',
				url : $("#contextPath").val() + '/commonapi/checkUser',
				dataType : "json",
				data : {
					'key' : companyName,
				},
				async : false,
				success : function(flg) {
					if (flg == false) {
						checkReg.tool.switchInputStyle('error',
								'companyName', 'tipImgCompanyName',
								'tipInfoCompanyName');
						$('#tipInfoCompanyName').html(
								checkReg.lang_zh['3134']);
						companyNameExist = true;
						return false;
					}
				}
			});

			if (companyNameExist == true) {
				return false;
			}
			checkReg.tool.switchInputStyle('ok', 'companyName',
					'tipImgCompanyName', 'tipInfoCompanyName');
			companyNameIsOk = true;
			return true;
		},
		VerifyFormatCompanyName : function(str) {
			var errorInfo = '';
			var textFlag = false;
			var verifyObj = {
				"flag" : textFlag,
				"errorInfo" : ""
			};

			if (str && str != '') {
				if (GetCharLength(str) > 60) {
					errorInfo = checkReg.lang_zh['3133'];
					textFlag = false;
				} else {
					textFlag = true;
				}
				verifyObj = {
					"flag" : textFlag,
					"errorInfo" : errorInfo
				};
			}
			return verifyObj;
		}//end VerifyFormatCompanyName
	},
	address : {
		checkAddressFocus : function() {
			checkReg.tool.switchInputStyle('normal', 'address4',
					'tipImgAddress4', 'tipInfoAddress4');
			$('#tipInfoAddress4').html(checkReg.lang_zh['3141']);
		},
		checkKeypress : function() {
			var address4 = $.trim($('#address4').val());
			if (address4 == '') {
				return true;
			}
			//格式正确性验证
			var verifyObj = checkReg.tool.VerifyCharLength(address4,
					100);
			if (verifyObj && ('flag' in verifyObj)
					&& verifyObj.flag === false) {
				checkReg.tool.switchInputStyle('error', 'address4',
						'tipImgAddress4', 'tipInfoAddress4');
				$('#tipInfoAddress4').text(checkReg.lang_zh['3144']);
				$('#address4').val(
						address4.substr(0, verifyObj.charLen));
				return false;
			} else {
				checkReg.tool.switchInputStyle('normal', 'address4',
						'tipImgAddress4', 'tipInfoAddress4');
			}
		},
		checkAddress : function() {
			address4IsOk = false;
			checkReg.tool.switchInputStyle('normal', 'address4',
					'tipImgAddress4', 'tipInfoAddress4');
			var $tipInfoAddr = $('#tipInfoAddr');
			var address4 = $('#address4').val();
			if (address4 == '') {
				address4IsOk = true;
				return true;
			}
			//格式正确性验证
			var len = GetCharLength(address4);
			if (len > 100) {
				checkReg.tool.switchInputStyle('error', 'address4',
						'tipImgAddress4', 'tipInfoAddress4');
				$('#tipInfoAddress4').html(checkReg.lang_zh['3144']);
				return false;
			}
			if (!checkReg.nameReg.test(address4)) {
				checkReg.tool.switchInputStyle('error', 'address4',
						'tipImgAddress4', 'tipInfoAddress4');
				$('#tipInfoAddress4').html(checkReg.lang_zh['3144']);
				return false;
			}
			address4IsOk = true;
			checkReg.tool.switchInputStyle('ok', 'address4',
					'tipImgAddress4', 'tipInfoAddress4');
			return true;
		}
	},
	telphone : {
		tel1 : {
			checkTel1Focus : function() {
				checkReg.tool.switchInputStyle('normal', 'telphone1',
						'tipImgTelphone', 'tipInfoTelphone');
				$('#tipInfoTelphone').html(checkReg.lang_zh['3161']);
			},
			checkTel1 : function() {
				tel1IsOk = false;
				checkReg.tool.switchInputStyle('normal', 'telphone1',
						'tipImgTelphone', 'tipInfoTelphone');

				var tel1 = $.trim($('#telphone1').val());
				if (tel1 == '') {
					return false;
				}

				var len = tel1.length;
				if (!checkReg.numberReg.test(tel1)
						|| (len != 3 && len != 4)) {
					checkReg.tool.switchInputStyle('error',
							'telphone1', 'tipImgTelphone',
							'tipInfoTelphone');
					$('#tipInfoTelphone')
							.html(checkReg.lang_zh['3163']);
					return false;
				}
				tel1IsOk = true;
				if (tel1IsOk && tel2IsOk && tel3IsOk) {
					checkReg.tool.switchInputStyle('ok', 'telphone1',
							'tipImgTelphone', 'tipInfoTelphone');
				}
				return true;
			}
		},
		tel2 : {
			checkTel2Focus : function() {
				checkReg.tool.switchInputStyle('normal',
							'telphone2', 'tipInfoTelphone',
							'tipInfoTelphone');
				$('#tipInfoTelphone').html(checkReg.lang_zh['3171']);
			},
			checkTel2 : function() {
				tel2IsOk = false;
				checkReg.tool.switchInputStyle('normal', 'telphone2',
						'tipImgTelphone', 'tipInfoTelphone');
				var tel2 = $.trim($('#telphone2').val());
				if (tel2 == '') {
					return false;
				}
				var len = tel2.length;
				if (!checkReg.numberReg.test(tel2)
						|| (len != 7 && len != 8)) {
					checkReg.tool.switchInputStyle('error',
							'telphone2', 'tipImgTelphone',
							'tipInfoTelphone');
					$('#tipInfoTelphone')
							.html(checkReg.lang_zh['3173']);
					return false;
				}
				tel2IsOk = true;
				if (tel1IsOk && tel2IsOk && tel3IsOk) {
					checkReg.tool.switchInputStyle('ok', 'telphone2',
							'tipImgTelphone', 'tipInfoTelphone');
				}
				return true;
			}
		},
		tel3 : {
			checkTel3Focus : function() {
				checkReg.tool.switchInputStyle('normal', 'telphone3',
							'tipImgTelphone', 'tipInfoTelphone');
					$('#tipInfoTelphone').html(checkReg.lang_zh['3181']);
			},
			checkTel3 : function() {
				tel3IsOk = true;
				checkReg.tool.switchInputStyle('normal', 'telphone3',
						'tipImgTelphone', 'tipInfoTelphone');
				var tel3 = $.trim($('#telphone3').val());
				if (tel3 == '') {
					tel3IsOk = true;
				} else if (!checkReg.numberReg.test(tel3)) {
					checkReg.tool.switchInputStyle('error',
							'telphone3', 'tipImgTelphone',
							'tipInfoTelphone');
					$('#tipInfoTelphone')
							.html(checkReg.lang_zh['3183']);
					tel3IsOk = false;
					return false;
				}
				if (tel1IsOk && tel2IsOk && tel3IsOk) {
					checkReg.tool.switchInputStyle('ok', 'telphone3',
							'tipImgTelphone', 'tipInfoTelphone');
				}
				return true;
			}
		}
	},
	contact : {
		checkContactFocus : function() {
			checkReg.tool.switchInputStyle('normal', 'contact',
					'tipImgContact', 'tipInfoContact');
			$('#tipInfoContact').html(checkReg.lang_zh['3191']);
		},
		checkKeypress : function() {
			var contact = $.trim($('#contact').val());
			if (contact == '') {
				return false;
			}
			//格式正确性验证
			var verifyObj = checkReg.tool.VerifyCharLength(contact, 30);
			if (verifyObj && ('flag' in verifyObj)
					&& verifyObj.flag === false) {
				checkReg.tool.switchInputStyle('error', 'contact',
						'tipImgContact', 'tipInfoContact');
				$('#tipInfoContact').text(checkReg.lang_zh['3193']);
				$('#contact').val(contact.substr(0, verifyObj.charLen));
				return false;
			} else {
				checkReg.tool.switchInputStyle('normal', 'contact',
						'tipImgContact', 'tipInfoContact');
			}
		},
		checkContact : function() {
			contactIsOk = false;
			checkReg.tool.switchInputStyle('normal', 'contact',
					'tipImgContact', 'tipInfoContact');

			var contact = $.trim($('#contact').val());
			if (contact == '') {
				return false;
			}

			//格式正确性验证
			var len = GetCharLength(contact);
			if (len<2 || len>32) {
				checkReg.tool.switchInputStyle('error', 'contact',
						'tipImgContact', 'tipInfoContact');
				$('#tipInfoContact').html(checkReg.lang_zh['3193']);
				return false;
			}
			if (!checkReg.nameReg.test(contact)) {
				checkReg.tool.switchInputStyle('error', 'contact',
						'tipImgContact', 'tipInfoContact');
				$('#tipInfoContact').html(checkReg.lang_zh['3193']);
				return false;
			}
			checkReg.tool.switchInputStyle('ok', 'contact',
					'tipImgContact', 'tipInfoContact');
			contactIsOk = true;
			return true;
		}
	},
	tool : {
		//将单元格恢复到最初样式
		switchInputStyle : function(showType, inputId, tipImgId,
				tipInfoId) {
			if (showType == 'normal') {
				$('#' + inputId).removeClass(
						'was-validated is-invalid is-valid');
				// $('#' + tipImgId).hide();
				$('#' + tipInfoId).removeClass('invalid-feedback')
						.addClass('valid-feedback').html('').css({
							'display' : 'block'
						});
			} else if (showType == 'ok') {
				$('#' + inputId).addClass('was-validated is-valid')
						.removeClass('is-invalid');
				// $('#' + tipImgId).removeClass('wl_select_icon22').css({'display':'inline-block'});
				$('#' + tipInfoId).removeClass('invalid-feedback')
						.addClass('valid-feedback').css({
							'display' : 'block'
						});
			} else if (showType == 'error') {
				$('#' + inputId).addClass('was-validated is-invalid')
						.removeClass('is-valid');
				// $('#' + tipImgId).addClass('wl_select_icon22').css({'display':'inline-block'});
				$('#' + tipInfoId).addClass('invalid-feedback')
						.addClass('valid-feedback').css({
							'display' : 'block'
						});
			}
		},
		isFunc : function(funcName) {
			return typeof funcName == 'function';
		},
		VerifyCharLength : function(str, maxLen) {
			var newCharLen = maxLen;
			var textFlag = true;
			var verifyObj = {
				"flag" : textFlag,
				"charLen" : newCharLen
			};
			if (str && str != '') {
				if (GetCharLength(str) > maxLen) {
					var charLen = str.length;
					textFlag = false;
					var l = 0;
					for (var i = 0; i < charLen; i++) {
						l += GetCharLength(str[i]);
						if (l == maxLen) {
							newCharLen = (i + 1);
							break;
						} else if (l > maxLen) {
							newCharLen = i;
							break;
						}
					}
				}
				verifyObj = {
					"flag" : textFlag,
					"charLen" : newCharLen
				};
			}
			return verifyObj;
		}
	}
};
//字符串长度，一个中文记为2个长度
function GetCharLength(str) {
	var iLength = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255) {
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
	var companyNameTrim = $.trim($('#companyName').val());
	var contactTrim = $.trim($('#contact').val());
	var tel1Trim = $.trim($('#telphone1').val());
	var tel2Trim = $.trim($('#telphone2').val());

	// 企业信息
	var address4 = $.trim($('#address4').val());
	//为空判断
	if (userNameTrim == '' || mobilePhoneTrim == ''
			|| companyNameTrim == '' || contactTrim == ''
			|| tel1Trim == '' || tel2Trim == '') {
		if (mobilePhoneTrim == "") {
			checkReg.tool.switchInputStyle('error', 'mobilePhone',
					'tipImgMobile', 'tipInfoMobilePhone');
			$('#tipInfoMobilePhone').html(checkReg.lang_zh['3202']);
		}
		if (userNameTrim == "") {
			checkReg.tool.switchInputStyle('error', 'userName',
					'tipImgUserName', 'tipInfoUserName');
			$('#tipInfoUserName').html(checkReg.lang_zh['3102']);
		}
		if (companyNameTrim == "") {
			checkReg.tool.switchInputStyle('error', 'companyName',
					'tipImgCompanyName', 'tipInfoCompanyName');
			$('#tipInfoCompanyName').html(checkReg.lang_zh['3132']);
		}
		if (tel1Trim == "" || tel2Trim == "") {
			checkReg.tool.switchInputStyle('error', 'telphone1',
					'tipImgTelphone', 'tipInfoTelphone');
			$('#tipInfoTelphone').html(checkReg.lang_zh['3162']);
		}
		if (tel1Trim == "") {
			checkReg.tool.switchInputStyle('error', 'telphone2',
					'tipImgTelphone', 'tipInfoTelphone');
			$('#tipInfoTelphone').html(checkReg.lang_zh['3162']);
		}
		if (contactTrim == "") {
			checkReg.tool.switchInputStyle('error', 'contact',
					'tipImgContact', 'tipInfoContact');
			$('#tipInfoContact').html(checkReg.lang_zh['3192']);
		}
		//防止重复提交
		submitBtnAvailability('enable');
		e.preventDefault();
		return false;
	}
	//所填信息是否正确判断

	if (mobilePhoneIsOk && userNameIsOk && emailIsOk && companyNameIsOk
			&& address4IsOk && tel1IsOk && tel2IsOk && tel3IsOk
			&& contactIsOk) {
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
	checkReg.companyName.checkCompanyName();
	checkReg.telphone.tel1.checkTel1();
	checkReg.telphone.tel2.checkTel2();
	checkReg.telphone.tel3.checkTel3();
	checkReg.address.checkAddress();
	checkReg.contact.checkContact();
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
	//公司名称
	$('#companyName').bind("focus", function() {
		checkReg.companyName.checkCompanyNameFocus();
	});
	$("#companyName").blur(function() {
		checkReg.companyName.checkCompanyName();
	});
	//最多只允许输入30个汉字 60个字符
	$('#companyName').on('keyup', function() {
		checkReg.companyName.checkKeypress();
	});
	//固定电话 区号
	$('#telphone1').bind("focus", function() {
		checkReg.telphone.tel1.checkTel1Focus();
	});
	$("#telphone1").blur(function() {
		checkReg.telphone.tel1.checkTel1();
	});
	//固定电话 座机号
	$('#telphone2').bind("focus", function() {
		checkReg.telphone.tel2.checkTel2Focus();
	});
	$("#telphone2").blur(function() {
		checkReg.telphone.tel2.checkTel2();
	});
	//固定电话 分机号
	$('#telphone3').bind("focus", function() {
		checkReg.telphone.tel3.checkTel3Focus();
	});
	$("#telphone3").blur(function() {
		checkReg.telphone.tel3.checkTel3();
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

	//联系人姓名
	$('#contact').bind("focus", function() {
		checkReg.contact.checkContactFocus();
	});
	//最多只允许输入32个汉字
	$('#contact').on('keyup', function() {
		checkReg.contact.checkKeypress();
	});
	$("#contact").blur(function() {
		checkReg.contact.checkContact();
	});

	$('form').submit(function(e) {
		//防止重复提交
		submitBtnAvailability('disable');
		//由于在ie8以下的浏览器版本，防止重复提交按钮不明显，所以延时0.1s执行注册操作
		setTimeout(check_register(e), 50);
		//check_register();
	});
});
