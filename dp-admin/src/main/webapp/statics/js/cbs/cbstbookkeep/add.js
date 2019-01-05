/**
 * 新增-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTBookKeep: {
			id: 0
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../CBS/T/BOOK/KEEP/save?_' + $.now(),
		    	param: vm.cbsTBookKeep,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})
