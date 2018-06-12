$(function() {
	$("#address1").change(
			function() {
				var address1 = $("#address1").val();
				var address2 = $("#address2");
				var address3 = $("#address3");
				$(address2).empty();
				$(address2).append("<option value=''>----请选择----</option>");
				$(address3).empty();
				$(address3).append("<option value=''>----请选择----</option>");
				if (address1 != "") {
					$.ajax({
						type : "POST",
						url : $("#contextPath").val() + "/commonapi/listArea",
						// contentType : "application/json",
						dataType : "json",
						data : {
							"id" : address1
						},
						success : function(data) {
							$.each(data, function(index, item) {
								// 填充内容
								$("#address2").append(
										"<option value='" + item.code + "'>"
												+ item.name + "</option>");
							});
						}
					});
				}
			});
	$("#address2").change(
			function() {
				var address2 = $("#address2").val();
				var address3 = $("#address3");
				$(address3).empty();
				$(address3).append("<option value=''>----请选择----</option>");
				if (address2 != "") {
					$.ajax({
						type : "POST",
						url : $("#contextPath").val() + "/commonapi/listArea",
						// contentType : "application/json",
						dataType : "json",
						data : {
							"id" : address2
						},
						success : function(data) {
							$.each(data, function(index, item) {
								// 填充内容
								$("#address3").append(
										"<option value='" + item.code + "'>"
												+ item.name + "</option>");
							});
						}
					});
				}
			});
});
