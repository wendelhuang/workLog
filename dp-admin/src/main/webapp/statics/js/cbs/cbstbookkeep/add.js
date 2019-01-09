/**
 * 新增-js
 */
$(function() {
	initialPage();
})
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTBookKeep: {
			id: 0,
			outIn: 'OUT',
			keepTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
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
function initialPage() {
	laydate.render({
		elem: '#keepTime',
		type: 'datetime',
		value: new Date(),
		isInitValue: true,
        done: function(value, date, endDate){
            vm.cbsTBookKeep.keepTime = value;
        }
	})
}
