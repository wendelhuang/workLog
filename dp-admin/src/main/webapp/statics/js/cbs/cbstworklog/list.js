/**
 * js
 */

$(function () {
	initialPage();
});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-56});
	});
}

function logFormatter(value, row, index) {
	var _html = '';
	_html += '<textarea>' + value + '</textarea>';
	return _html;
}

function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url: '../../CBS/T/WORKLOG/list?_' + $.now(),
		height: $(window).height()-56,
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		responseHandler: function (data) {
			var workLog = {};
			for(var i = 0; i < data.workLog.length; i++) {
				workLog[data.workLog.workDate] = data.workLog[i];
			}
			var tableDataTmp = [];
			var calenDate = data.calenDate;
			for(var i = 0; i < calenDate.length; i++) {
				var d = calenDate[i];
				var datum = {};
				datum.workDate = d.dateFmt10;
				datum.dayOfWeek = d.dateWeekday;
				if (workLog[d.dateFmt10] != undefined) {
					datum.morning = workLog.morning;
					datum.afternoon = workLog.afternoon;
					datum.evening = workLog.evening;
				}else{
					datum.morning = '';
					datum.afternoon = '';
					datum.evening = '';
				}
				tableDataTmp.push(datum);
			}
			return {'rows': tableDataTmp};
		},
		columns: [
			{field : "workDate", title : "工作日期", width : "100px"},
			{field : "dayOfWeek", title : "星期", width : "100px", formatter: function(value, row, index){
					switch(value){
					case 1:
						return '星期一';
					case 2:
						return '星期二';
					case 3:
						return '星期三';
					case 4:
						return '星期四';
					case 5:
						return '星期五';
					case 6:
						return '星期六';
					case 7:
						return '星期日';
					}
				}
			},
			{field : "morning", title : "上午", formatter: logFormatter},
			{field : "afternoon", title : "下午", formatter: logFormatter},
			{field : "evening", title : "晚上", formatter: logFormatter},
			{title : "操作", formatter : function(value, row, index) {
					var _html = '';
					if (hasPermission('CBS:T:WORKLOG:edit')) {
                        _html += '<a href="javascript:;" onclick="vm.edit(\''+row.id+'\')" title="保存"><i class="fa fa-save"></i></a>';
					}
					if (hasPermission('CBS:T:WORKLOG:remove')) {
                        _html += '<a href="javascript:;" onclick="vm.remove(false,\''+row.id+'\')" title="清空"><i class="fa fa-trash-o"></i></a>';
					}
					return _html;
				}
			}
		]
	})
}

var vm = new Vue({
	el:'#dpLTE',
	data: {
		keyword: null,
		input1: '',
		tableData: []
	},
	mounted: function() {
		this.load();
	},
	methods : {
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
			$.post({
				url: '../../CBS/T/WORKLOG/list?_' + $.now(),
				dataType: 'json',
			    contentType: 'application/json',
			    data: JSON.stringify({params: {}}),
			    type: 'POST',
				success: function(data) {
					var weekTrans = {
						1: '星期一',
						2: '星期二',
						3: '星期三',
						4: '星期四',
						5: '星期五',
						6: '星期六',
						7: '星期日',
					}
					var workLog = {};
					for(var i = 0; i < data.workLog.length; i++) {
						workLog[data.workLog[i].workDate] = data.workLog[i];
					}
					var tableDataTmp = [];
					var calenDate = data.calenDate;
					for(var i = 0; i < calenDate.length; i++) {
						var d = calenDate[i];
						var datum = {};
						datum.workDate = d.dateFmt10;
						datum.dayOfWeek = weekTrans[d.dateWeekday];
						if (workLog[d.dateFmt10] != undefined) {
							datum.id = workLog[d.dateFmt10].id;
							datum.morning = workLog[d.dateFmt10].morning;
							datum.afternoon = workLog[d.dateFmt10].afternoon;
							datum.evening = workLog[d.dateFmt10].evening;
						}else{
							datum.morning = '';
							datum.afternoon = '';
							datum.evening = '';
						}
						tableDataTmp.push(datum);
					}
					vm.tableData = tableDataTmp;
				}
			});
		},
		save: function() {
			dialogOpen({
				title: '新增',
				url: 'cbs/cbstworklog/add.html?_' + $.now(),
				width: '420px',
				height: '350px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		saveWorkLog: function(id, workDate, morning, afternoon, evening){
			if (id == undefined) {
				$.ajax({
					url: '../../CBS/T/WORKLOG/save?_' + $.now(),
					data: JSON.stringify({
						workDate: workDate,
						morning: morning,
						afternoon: afternoon,
						evening: evening
					}),
					dataType: 'json',
				    contentType: 'application/json',
				    type: 'POST',
					success: function(data) {
						console.log(data);
						vm.load();
					}
				});
				return;
			}
			$.ajax({
				url: '../../CBS/T/WORKLOG/update?_' + $.now(),
				data: JSON.stringify({
					id: id,
					workDate: workDate,
					morning: morning,
					afternoon: afternoon,
					evening: evening
				}),
				dataType: 'json',
			    contentType: 'application/json',
			    type: 'POST',
				success: function(data) {
					console.log(data);
					vm.load();
				}
			});
		},
		removeWorkLog: function(id, workDate) {
			console.log('removeWorkLog');
			console.log(id);
			if (id != undefined) {
				this.saveWorkLog(id, workDate, '', '', '');
			}
		},
		edit: function(id) {
            dialogOpen({
                title: '编辑',
                url: 'cbs/cbstworklog/edit.html?_' + $.now(),
                width: '420px',
                height: '350px',
                success: function(iframeId){
                    top.frames[iframeId].vm.cbsTWorklog.id = id;
                    top.frames[iframeId].vm.setForm();
                },
                yes: function(iframeId){
                    top.frames[iframeId].vm.acceptClick();
                }
            });
		},
		remove: function(batch, id) {
			var ids = [];
			if (batch) {
                var ck = $('#dataGrid').bootstrapTable('getSelections');
                if (!checkedArray(ck)) {
					return false;
				}
                $.each(ck, function(idx, item){
                    ids[idx] = item.id;
                });
			} else {
			    ids.push(id);
			}
            $.RemoveForm({
                url: '../../CBS/T/WORKLOG/remove?_' + $.now(),
                param: ids,
                success: function(data) {
                    vm.load();
                }
            });
		},
		setContent: function(data) {
			console.log('aaa');
			console.log(data);
			console.log(vm.tableData);
		}
	}
})