/**
 * 编辑-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTCalenDate: {
			id: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../CBS/T/CALEN/DATE/info?_' + $.now(),
		    	param: vm.cbsTCalenDate.id,
		    	success: function(data) {
		    		vm.cbsTCalenDate = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../CBS/T/CALEN/DATE/update?_' + $.now(),
		    	param: vm.cbsTCalenDate,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})