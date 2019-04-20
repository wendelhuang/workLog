/**
 * js
 */

$(function () {
	//initialPage();
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
		tableData: [],
		currentDate: today()
	},
	mounted: function() {
		this.load();
	},
	methods : {
		getTableData: function(currentDate, direction) {
			$.post({
				url: '../../CBS/T/WORKLOG/list?_' + $.now(),
				dataType: 'json',
			    contentType: 'application/json',
			    data: JSON.stringify({'currentDate': currentDate, 'direction': direction}),
			    type: 'POST',
				success: function(data) {
					vm.currentDate = data.currentDate;
					console.log(vm.currentDate);
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
		load: function() {
            $('#calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay,listMonth'
				},
                defaultDate: this.currentDate,
				locale: 'zh-cn',
                eventLimit: true,
                dayClick: function(date, jsEvent, view) {
					// fullCalendar因为view不同，传递的date类型不同
					var dateValue = date.format('YYYY-MM-DD-HH-mm-ss');
					if (!date.hasTime()) {
						dateValue = date.format('YYYY-MM-DD-') + formatDate(new Date(), 'hh-mm-ss');
					}

                    dialogOpen({
                        title: '新增',
                        url: 'cbs/cbstworklog/add.html?dateValue='+ dateValue,
                        width: '420px',
                        height: '350px',
                        data: {dateValue: date},
                        yes : function(iframeId) {
                            top.frames[iframeId].vm.acceptClick();
                        },
                    });
                },
                eventClick: function(event, jsEvent, view) {
                    console.log(event);
                    console.log(jsEvent);
                    console.log(view);
                },
                events: function(start, end, timezone, callback) {
					var startDate = start.format('YYYY-MM-DD');
					var endDate = end.format('YYYY-MM-DD');
                    $.post({
                        url: '../../CBS/T/CALEN/EVENT/list?_' + $.now(),
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify({eventType: 'WORKLOG', startDate: startDate, endDate: endDate}),
                        type: 'POST',
                        success: function(data) {
                            var events = $.map(data, function(datum, index) {
                                var h = {};
                                h.title = '[工作日记]' + datum.title;
                                h.editable = datum.editable == 'TRUE';
                                h.allDay = datum.allDay == 'TRUE';
                                h.start = datum.start;
                                return h;
                            });
							callback(events);
                        }
                    });
                }
            });
		},
		reload: function() {
            $('#calendar').fullCalendar('refetchEvents');
            //TODO 自己获取再updateEvents不可以
            /*$('#calendar').fullCalendar('updateEvents',[
                    {
                        title  : 'event1',
                        start  : '2019-04-01'
                    },
                    {
                        title  : 'event2',
                        start  : '2019-04-02',
                    },
                    {
                        title  : 'event3',
                        start  : '2019-04-03',
                        allDay : false // will make the time show
                    }
                ]
			);*/
            /*$.post({
                url: '../../CBS/T/CALEN/EVENT/list?_' + $.now(),
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({'eventType': 'WORKLOG'}),
                type: 'POST',
                success: function(data) {
                    var events = $.map(data, function(datum, index) {
                        var h = {};
                        h.title = '[工作日记]' + datum.title;
                        h.editable = datum.editable == 'TRUE';
                        h.allDay = datum.allDay == 'TRUE';
                        h.start = datum.start;
                        return h;
                    });

                    console.log(events.length);

                    $('#calendar').fullCalendar({events: events});
                }
            });*/
		},
		backward: function() {
			this.getTableData(this.currentDate, 'backward');
		},
		forward: function() {
			this.getTableData(this.currentDate, 'foreward');
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
						dialogMsg(data.msg, 'success');
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
					dialogMsg(data.msg, 'success');
					vm.load();
				}
			});
		},
		removeWorkLog: function(id, workDate) {
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
		},
		rowStyle: function(hash) {
			if (hash.row.dayOfWeek == '星期六' || hash.row.dayOfWeek == '星期日') {
				return {'background-color': 'yellow'};
			}
		}
	}
})