/**
 * 新增-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTCalenEvent: {
			id: 0,
			start: new Date(),
			eventType: ''
		},
		eventType: 'WORKLOG',
		eventTypes: []
	},
	mounted: function() {
		//TODO: 验证直接在data中使用不可以
		var dateValue = this.getUrlKey('dateValue');
		var dateArray = dateValue.split('-');
		var date = new Date(parseInt(dateArray[0]),parseInt(dateArray[1])-1,parseInt(dateArray[2]),parseInt(dateArray[3]),parseInt(dateArray[4]),parseInt(dateArray[5]));
		this.cbsTCalenEvent.date = formatDate(date, 'yyyy-MM-dd');
		this.cbsTCalenEvent.start = date;
		this.loadEventTypes();
    },
	methods : {
		getUrlKey: function(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
		},
		loadEventTypes: function() {
			var params = {typeType: this.eventType};
			console.log(params);
			$.post({
                url: '../../CBS/T/CALEN/EVENT/TYPE/list?_' + $.now(),
                dataType: 'json',
                data: JSON.stringify(params),
                contentType: 'application/json',
                type: 'POST',
                success: function(data) {
                    console.log(data);
                    vm.eventTypes = $.map(data.rows, function(r, i) {
                    	return {value: r.id, text: r.typeName};
                    });
                }
            });
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
