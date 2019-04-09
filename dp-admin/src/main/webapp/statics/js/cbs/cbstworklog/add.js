/**
 * 新增-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTCalenEvent: {
			id: 0,
			eventType: 'WORKLOG'
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../CBS/T/CALEN/EVENT/save?_' + $.now(),
		    	param: vm.cbsTCalenEvent,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
