/**
 * 编辑-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTWorklog: {
			id: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../CBS/T/WORKLOG/info?_' + $.now(),
		    	param: vm.cbsTWorklog.id,
		    	success: function(data) {
		    		vm.cbsTWorklog = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../CBS/T/WORKLOG/update?_' + $.now(),
		    	param: vm.cbsTWorklog,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})