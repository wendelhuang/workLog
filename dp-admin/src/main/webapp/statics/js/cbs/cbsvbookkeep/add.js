/**
 * 新增-js
 */
/*$(function() {
	initialPage();
})*/
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsVBookKeep: {
			eventId: 0,
			outIn: 'OUT',
			start: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
			typeId: '',
			eventType: $.currentIframe().vm.accountBook
		},
		options: [],
	},
	mounted: function() {
		this.loadKeepType();
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../CBS/V/BOOK/KEEP/save?_' + $.now(),
		    	param: vm.cbsVBookKeep,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		},
		loadKeepType: function() {
            $.post({
                url: '../../CBS/T/KEEP/TYPE/listAll?_' + $.now(),
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({}),
                type: 'POST',
                success: function(data) {
                    vm.tableData = data.data;
                    for(var i = 0; i < vm.tableData.length; i++) {
                    	if (i == 0) {
                    		vm.cbsVBookKeep.typeId = vm.tableData[i].id;
                    	}
                    	vm.options.push({
                    		value: vm.tableData[i].id,
                    		label: vm.tableData[i].typeName,
                    		icon: vm.tableData[i].typeIcon
                    	})
                    }
                }
            });
		}
	}
})
/*function initialPage() {
	laydate.render({
		elem: '#start',
		type: 'datetime',
		value: new Date(),
		isInitValue: true,
        done: function(value, date, endDate){
            vm.cbsVBookKeep.start = value;
        }
	});
}
*/