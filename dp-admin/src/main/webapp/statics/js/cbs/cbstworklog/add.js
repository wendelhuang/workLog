/**
 * 新增-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTCalenEvent: {
			id: 0,
			start: new Date(),
			eventType: 'WORKLOG'
		}
	},
	mounted: function() {
		//TODO: 验证直接在data中使用不可以
		this.cbsTCalenEvent.date = this.getUrlKey('dateValue');
		var targetDate = new Date(this.cbsTCalenEvent.date.replace(/-/g, '/'));
		this.cbsTCalenEvent.start = new Date();
        this.cbsTCalenEvent.start.setFullYear(targetDate.getFullYear());
        this.cbsTCalenEvent.start.setMonth(targetDate.getMonth());
        this.cbsTCalenEvent.start.setDate(targetDate.getDate());
    },
	methods : {
		getUrlKey: function(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../CBS/T/CALEN/EVENT/save?_' + $.now(),
		    	param: vm.cbsTCalenEvent,
		    	success: function(data) {
		    		$.currentIframe().vm.reload();
		    	}
		    });
		}
	}
})
