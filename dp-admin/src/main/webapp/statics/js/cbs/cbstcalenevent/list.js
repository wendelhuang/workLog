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

var vm = new Vue({
	el:'#dpLTE',
	data: {
		keyword: null,
		input1: '',
		tableData: [],
		currentDate: today(),
		eventTypes: [],
		eventTypeMap: {}
	},
	mounted: function() {
		this.loadEventTypes();
		this.load();
	},
	methods : {
		loadEventTypes: function() {
			$.post({
                url: '../../CBS/T/CALEN/EVENT/TYPE/list?_' + $.now(),
                dataType: 'json',
                data: JSON.stringify({}),
                contentType: 'application/json',
                type: 'POST',
                success: function(data) {
                    vm.eventTypes = $.map(data.rows, function(r, i) {
                    	return {value: r.id, text: r.typeName};
                    });
                    for(var i = 0; i < data.rows.length; i++) {
                    	var r = data.rows[i];
                    	vm.eventTypeMap[r.id] = r;
                    }
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
                        data: JSON.stringify({startDate: startDate, endDate: endDate}),
                        type: 'POST',
                        success: function(data) {
                        	for(var i = 0; i < data.rows.length; i++) {
                        		data.rows[i].title = '[' + vm.eventTypeMap[data.rows[i].eventType]['typeName'] + ']' + 
                        								data.rows[i].title;
                        	}
							callback(data.rows);
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