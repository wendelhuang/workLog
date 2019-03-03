/**
 * 编辑-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTKeepType: {
			id: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../CBS/T/KEEP/TYPE/info?_' + $.now(),
		    	param: vm.cbsTKeepType.id,
		    	success: function(data) {
		    		vm.cbsTKeepType = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../CBS/T/KEEP/TYPE/update?_' + $.now(),
		    	param: vm.cbsTKeepType,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})