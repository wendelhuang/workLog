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
                    /**
					 * vue会为初始成员设置set和get
                     */
					data.startDate = data.start;
					data.startTime = data.start;
		    		vm.cbsVBookKeep = data;
		    		/*vm.cbsVBookKeep.startDate = vm.cbsVBookKeep.start;*/
                    /**
					 * 方法二
                     */
					 /* Vue.set(vm.cbsVBookKeep, 'startDate', vm.cbsVBookKeep.start); */
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
            this.cbsVBookKeep.start = (formatDate(this.cbsVBookKeep.startDate, 'yyyy-MM-dd')) + this.cbsVBookKeep.start.substring(10);
        },
        timeChange: function(val) {
			this.cbsVBookKeep.start = this.cbsVBookKeep.start.substring(0, 11) + formatDate(val, 'hh:mm:ss');
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