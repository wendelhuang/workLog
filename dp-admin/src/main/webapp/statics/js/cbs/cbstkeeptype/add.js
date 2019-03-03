/**
 * 新增-js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		cbsTKeepType: {
			id: 0,
			//TODO: 没写下面2行，会导致双击事件赋值不起作用
			typeName: '',
			typeIcon: ''
		}
	},
	methods : {
		acceptClick: function() {
			if (!$('#form').Validform()) {
		        return false;
		    }
		    $.SaveForm({
		    	url: '../../CBS/T/KEEP/TYPE/save?_' + $.now(),
		    	param: vm.cbsTKeepType,
		    	success: function(data) {
		    		$.currentIframe().vm.load();
		    	}
		    });
		},
		selectIcon: function() {
			dialogOpen({
				id: 'iconSelect',
				title: '选取图标',
		        url: 'cbs/cbstkeeptype/icon.html?_' + $.now(),
		        scroll : true,
		        width: "1030px",
		        height: "600px",
		        btn: false
		    })
		},
	}
})
