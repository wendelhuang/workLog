/**
 * 新增-js
 */
/*$(function() {
	initialPage();
})*/
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTBookKeep: {
			id: 0,
			outIn: 'OUT',
			keepTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
			typeId: ''
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
		    	url: '../../CBS/T/BOOK/KEEP/save?_' + $.now(),
		    	param: vm.cbsTBookKeep,
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
                    		vm.cbsTBookKeep.typeId = vm.tableData[i].id;
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
		elem: '#keepTime',
		type: 'datetime',
		value: new Date(),
		isInitValue: true,
        done: function(value, date, endDate){
            vm.cbsTBookKeep.keepTime = value;
        }
	});
}
*/