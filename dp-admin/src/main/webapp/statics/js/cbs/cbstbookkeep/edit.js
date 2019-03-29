/**
 * 编辑-js
 */
$(function() {
    initialPage();
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
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTBookKeep: {
			id: 0,
			typeId: ''
		},
		options: []
	},
	mounted: function() {
		this.loadKeepType();
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