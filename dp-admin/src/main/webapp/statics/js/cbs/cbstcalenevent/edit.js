/**
 * 编辑-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTCalenEvent: {
			id: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../CBS/T/CALEN/EVENT/info?_' + $.now(),
		    	param: vm.cbsTCalenEvent.id,
		    	success: function(data) {
		    		vm.cbsTCalenEvent = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../CBS/T/CALEN/EVENT/update?_' + $.now(),
		    	param: vm.cbsTCalenEvent,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})