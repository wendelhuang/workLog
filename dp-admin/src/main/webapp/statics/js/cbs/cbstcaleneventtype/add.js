/**
 * 新增-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTCalenEventType: {
			id: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../CBS/T/CALEN/EVENT/TYPE/save?_' + $.now(),
		    	param: vm.cbsTCalenEventType,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
