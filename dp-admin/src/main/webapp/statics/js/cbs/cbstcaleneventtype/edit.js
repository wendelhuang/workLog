/**
 * 编辑-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTCalenEventType: {
			id: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../CBS/T/CALEN/EVENT/TYPE/info?_' + $.now(),
		    	param: vm.cbsTCalenEventType.id,
		    	success: function(data) {
		    		vm.cbsTCalenEventType = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../CBS/T/CALEN/EVENT/TYPE/update?_' + $.now(),
		    	param: vm.cbsTCalenEventType,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})