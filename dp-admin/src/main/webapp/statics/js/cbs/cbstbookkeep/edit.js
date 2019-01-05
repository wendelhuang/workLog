/**
 * 编辑-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTBookKeep: {
			id: 0
		}
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../CBS/T/BOOK/KEEP/info?_' + $.now(),
		    	param: vm.cbsTBookKeep.id,
		    	success: function(data) {
		    		vm.cbsTBookKeep = data;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../CBS/T/BOOK/KEEP/update?_' + $.now(),
		    	param: vm.cbsTBookKeep,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		}
	}
})