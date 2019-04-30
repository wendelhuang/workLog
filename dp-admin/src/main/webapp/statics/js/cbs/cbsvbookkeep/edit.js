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
            //vm.cbsVBookKeep.keepTime = value;
        }
    })
}
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsVBookKeep: {
			eventId: 0,
			typeId: '',
            startDate: new Date(),
            startTime: new Date(),
            start: new Date()
		},
		options: []
	},
	mounted: function() {
		this.loadKeepType();
	},
	methods : {
		setForm: function() {
			$.SetForm({
				url: '../../CBS/V/BOOK/KEEP/info?_' + $.now(),
		    	param: vm.cbsVBookKeep.eventId,
		    	success: function(data) {
		    		vm.cbsVBookKeep = data;
		    		vm.cbsVBookKeep.startDate = vm.cbsVBookKeep.start;
		    		vm.cbsVBookKeep.startTime = vm.cbsVBookKeep.start;
		    	}
			});
		},
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.ConfirmForm({
		    	url: '../../CBS/V/BOOK/KEEP/update?_' + $.now(),
		    	param: vm.cbsVBookKeep,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		},
        dateChange: function(val) {
			console.log(this.cbsVBookKeep);
			console.log(this.cbsVBookKeep.startDate);
            this.cbsVBookKeep.start.setFullYear(this.cbsVBookKeep.startDate.getFullYear());
            this.cbsVBookKeep.start.setMonth(this.cbsVBookKeep.startDate.getMonth());
            this.cbsVBookKeep.start.setDate(this.cbsVBookKeep.startDate.getDate());
            console.log(this.cbsVBookKeep.start);
        },
        timeChange: function(val) {
            this.cbsVBookKeep.start.setHours(this.cbsVBookKeep.startTime.getHours());
            this.cbsVBookKeep.start.setMinutes(this.cbsVBookKeep.startTime.getMinutes());
            console.log(this.cbsVBookKeep.start);
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