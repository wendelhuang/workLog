/**
 * js
 */

$(function () {
	initialPage();
	getGrid();
});

function initialPage() {
	$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-56});
	});
}

function getGrid() {
	$('#dataGrid').bootstrapTableEx({
		url: '../../CBS/T/BOOK/KEEP/list?_' + $.now(),
		height: $(window).height()-56,
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "bookId", title : "??ID", width : "100px"},
			{field : "uid", title : "??ID", width : "100px"},
			{field : "keepTime", title : "??", width : "100px"},
			{field : "money", title : "??", width : "100px"},
			{field : "typeId", title : "??ID", width : "100px"},
			{field : "outIn", title : "??", width : "100px"},
			{field : "remark", title : "??", width : "100px"},
			{field : "createTime", title : "????", width : "100px"},
			{field : "updateTime", title : "????", width : "100px"},
			{title : "操作", formatter : function(value, row, index) {
					var _html = '';
					if (hasPermission('CBS:T:BOOK:KEEP:edit')) {
                        _html += '<a href="javascript:;" onclick="vm.edit(\''+row.id+'\')" title="编辑"><i class="fa fa-pencil"></i></a>';
					}
					if (hasPermission('CBS:T:BOOK:KEEP:remove')) {
                        _html += '<a href="javascript:;" onclick="vm.remove(false,\''+row.id+'\')" title="删除"><i class="fa fa-trash-o"></i></a>';
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
		tableData: [],
        dateRange: [countDay(-90), today()],
        show: false,
        activeName: 'tab1'
	},
    mounted: function() {
        //this.load();
        this.loadBalance();
    },
	methods : {
		load: function() {
            this.loadBalance();
		},
		loadBalance: function() {
		    console.log('loadBalance: ' + this.dateRange[0] + ' - ' + this.dateRange[1]);

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('report'));
            myChart.on('click', function(params) {
            	var dte = params.name;
            	$.post({
                    url: '../../CBS/T/BOOK/KEEP/list?_' + $.now(),
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({startDate: dte, endDate: dte}),
                    type: 'POST',
                    success: function(data) {
                    	var keepTypeData = data.cbsTKeepType;
                        vm.tableData = data.cbsTBookKeep;
                        
                        var cbsTKeepType = {};
                        for(var i = 0; i < keepTypeData.length; i++) {
                        	cbsTKeepType[keepTypeData[i].id] = keepTypeData[i];
                        }
                        var outInFormat = {
                        	'OUT': '支出',
    						'IN': '收入'
    					};
                        for(var i = 0; i < vm.tableData.length; i++) {
    						vm.tableData[i].outInFormat = outInFormat[vm.tableData[i].outIn];
    						vm.tableData[i].typeIcon = '';
    						vm.tableData[i].typeName = '';
    						if (vm.tableData[i].typeId != undefined) {
    							vm.tableData[i].typeIcon = cbsTKeepType[vm.tableData[i].typeId].typeIcon;
    							vm.tableData[i].typeName = cbsTKeepType[vm.tableData[i].typeId].typeName;
    						}
    				        var f = Math.round(vm.tableData[i].money*100)/100;  
    				        var s = f.toString();  
    				        var rs = s.indexOf('.');  
    				        if (rs < 0) {  
    				            rs = s.length;  
    				            s += '.';  
    				        }  
    				        while (s.length <= rs + 2) {  
    				            s += '0';  
    				        }
    						vm.tableData[i].money = s;
    						if (vm.tableData[i].outIn == 'OUT') {
    							vm.tableData[i].money = '-' + s;
    						}
    					}
                    }
                });
            })
            myChart.showLoading({
                text: '数据努力加载中...'
            })
			$.post({
                url: '../../CBS/T/BOOK/KEEP/report-balance?_' + $.now(),
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({startDate: this.dateRange[0], endDate: this.dateRange[1]}),
                type: 'POST',
                success: function(data) {
                	
                	var dates = $.map(data['in'], function(e, i) {
                		return e['DTE'];
                	});
                	
                	var outData = $.map(data['out'], function(e, i) {
                		return e['SS'].toFixed(2);
                	});
                	var inData = $.map(data['in'], function(e, i) {
                		return e['SS'].toFixed(2);
                	});
                	var balance = [];
                	for(var i = 0; i < inData.length; i++) {
                		balance.push((inData[i]-outData[i]).toFixed(2));
                	}

                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '收支趋势图'
                        },
                        tooltip: {
                        	trigger: 'axis'
                        },
                        legend: {
                            data:['支出', '收入', '余额']
                        },
                        xAxis: {
                            data: dates
                        },
                        yAxis: {
                        },
                        dataZoom: [{
                            type: 'slider',
                            showDetail: false
                        }],
                        series: [{
                            name: '支出',
                            type: 'line',
                            data: outData
                        },{
                        	name: '收入',
                            type: 'line',
                            data: inData
                        },{
                        	name: '余额',
                            type: 'bar',
                            data: balance
                        }]
                    };
                    myChart.hideLoading();
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                }
            });
			
		},
        togger: function() {
		    this.show = !this.show;
        },
        tabClick: function(tab, event) {
		    console.log(tab);
		    console.log(event);
        },
		save: function() {
			dialogOpen({
				title: '新增',
				url: 'cbs/cbstbookkeep/add.html?_' + $.now(),
				width: '420px',
				height: '350px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function(id) {
            dialogOpen({
                title: '编辑',
                url: 'cbs/cbstbookkeep/edit.html?_' + $.now(),
                width: '420px',
                height: '350px',
                success: function(iframeId){
                    top.frames[iframeId].vm.cbsTBookKeep.id = id;
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
                url: '../../CBS/T/BOOK/KEEP/remove?_' + $.now(),
                param: ids,
                success: function(data) {
                    vm.load();
                }
            });
		},
		editBookKeep: function(id) {
			console.log(id);
            dialogOpen({
                title: '编辑',
                url: 'cbs/cbstbookkeep/edit.html?_' + $.now(),
                width: '420px',
                height: '350px',
                success: function(iframeId){
                    top.frames[iframeId].vm.cbsTBookKeep.id = id;
                    top.frames[iframeId].vm.setForm();
                },
                yes: function(iframeId){
                    top.frames[iframeId].vm.acceptClick();
                }
            });
		},
		removeBookKeep: function(batch, id) {
			console.log(id);
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
                url: '../../CBS/T/BOOK/KEEP/remove?_' + $.now(),
                param: ids,
                success: function(data) {
                    vm.load();
                }
            });
		},
        selectDateRange: function(range) {
		    console.log(range);
		    if (range == '3month') {
		        this.dateRange = [countDay(-90), today()];
            }else if (range == '6month'){
                this.dateRange = [countDay(-180), today()];
            }else if (range == '1year') {
                this.dateRange = [countDay(-365), today()];
            }else if (range == 'all') {
                this.dateRange = ['1970-01-01', today()];
            }else if (range == 'thisyear') {
                this.dateRange = ['' + new Date().getFullYear() + '-01-01', today()];
            }
            this.load();
        }
	}
})