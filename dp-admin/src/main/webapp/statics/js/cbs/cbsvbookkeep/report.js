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
		url: '../../CBS/V/BOOK/KEEP/list?_' + $.now(),
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
        dateRange: [formatDate(new Date(), 'yyyy') + '-01-01', today()],
        show: false,
        activeName: 'tabByType',
        showOutType: true,
        offset: 0,
        periodIndex: 0,
        periods: [{value: 'year', name: '年'}, {value: 'month', name: '月'}, {value: 'week', name: '周'}]

	},
    mounted: function() {
        //this.load();
        this.tabByTypeClick();
    },
	methods : {
		loadCurrentTab: function() {
            eval('this.' + vm.activeName + 'Click()');
		},
        loadSingleDate: function(params) {
            var dte = params.name;
            $.post({
                url: '../../CBS/V/BOOK/KEEP/list?_' + $.now(),
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({startDate: dte, endDate: dte}),
                type: 'POST',
                success: function(data) {
                    var keepTypeData = data.cbsTKeepType;
                    vm.tableData = data.cbsVBookKeep;

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
                        vm.tableData[i].start = vm.tableData[i].start.substring(0, 16);
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
        },
        togger: function() {
		    this.show = !this.show;
        },
        selectDateRange: function(range) {
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
            this.loadCurrentTab();
        },
        tabClick: function(tab, event) {
        	eval('this.' + tab.paneName + 'Click()');
        },
        graphicClick: function(params) {
		    this.showOutType = !this.showOutType;
		    this.tabByTypeClick();
        },
        tabByTypeClick: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.getInstanceByDom(document.getElementById('report'));
            if (myChart == null) {
                myChart = echarts.init(document.getElementById('report'));
            }
            /*myChart.on('click', this.loadSingleDate);*/
            myChart.showLoading({
                text: '数据努力加载中...'
            });
            $.post({
                url: '../../CBS/V/BOOK/KEEP/reportType?_' + $.now(),
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({startDate: this.dateRange[0], endDate: this.dateRange[1]}),
                type: 'POST',
                success: function(data) {
                    var showData = [];
                    var showTypes = [];
                    var showSum = '';
                    if (vm.showOutType) {
                        if (data['out'].length > 0) {
                            showData = $.map(data['out'], function(e, i) {
                                return {name: e['TYPE_NAME'], value: e['MONEY']};
                            });
                            showTypes = $.map(data['out'], function(e, i) {
                                return e['TYPE_NAME'];
                            });
                            showSum = data['outSum']['MONEY'];
                        }
                    }else{
                        if (data['in'].length > 0) {
                            showData = $.map(data['in'], function(e, i) {
                                return {name: e['TYPE_NAME'], value: e['MONEY']};
                            });
                            showTypes = $.map(data['in'], function(e, i) {
                                return e['TYPE_NAME'];
                            });
                            showSum = data['inSum']['MONEY'];
                        }
                    }

                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '收支分类图',
                            x: 'center'
                        },
                        legend: {
                            type: 'scroll',
                            orient: 'vertical',
                            right: '3%',
                            data: showTypes
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        graphic: [
                            {
                                type: 'text',
                                z: 2,
                                zlevel: 100,
                                left: 'center',
                                top: 'center',
                                style: {
                                    text: (vm.showOutType ? '支出' : '收入') + '合计\n' + showSum,
                                    textAlign: 'center',
                                    fontSize: 15
                                },
                                onclick: vm.graphicClick
                            }
                        ],
                        series: [{
                            name: '类别',
                            type: 'pie',
                            data: showData,
                            radius: ['20%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{b|{b}}: {c} {per|{d}%}',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    padding: [0, 7],
                                    rich: {
                                        b: {
                                            fontsize: 8
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    };
                    myChart.hideLoading();
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option, true);
                }
            });
        },
        tabByMonthClick: function() {
        	// 基于准备好的dom，初始化echarts实例
        	var myChart = echarts.getInstanceByDom(document.getElementById('report'));
        	if (myChart == null) {
        		myChart = echarts.init(document.getElementById('report'));
        	}
        	/*myChart.on('click', this.loadSingleDate);*/
        	myChart.showLoading({
        		text: '数据努力加载中...'
        	});
        	$.post({
        		url: '../../CBS/V/BOOK/KEEP/reportMonthly?_' + $.now(),
        		dataType: 'json',
        		contentType: 'application/json',
        		data: JSON.stringify({startDate: this.dateRange[0], endDate: this.dateRange[1]}),
        		type: 'POST',
        		success: function(data) {
        			var in_data = data['in'];
        			var out_data = data['out'];
        			var types = data['types'];
        			var months = data['months'];
        			var month_index = data['monthIndex'];
        			
        			var in_data_by_month = [];
        			for(var i = 0; i < types.length; i++) {
        				var h = {};
        				h.name = types[i];
        				h.type='bar';
        				h.stack = '收入';
        				h.data = new Array(months.length).fill(0.0);
        				for(var j = 0; j < in_data.length; j++) {
        					if(in_data[j].TYPE_NAME == types[i]) {
        						h.data[month_index[in_data[j].TERM]] = in_data[j].MONEY;
        					}
        				}
        				in_data_by_month.push(h);
        			}
        			
        			var out_data_by_month = [];
        			for(var i = 0; i < types.length; i++) {
        				var h = {};
        				h.name = types[i];
        				h.type='bar';
        				h.stack = '支出';
        				h.data = new Array(months.length).fill(0.0);
        				for(var j = 0; j < out_data.length; j++) {
        					if(out_data[j].TYPE_NAME == types[i]) {
        						h.data[month_index[out_data[j].TERM]] = out_data[j].MONEY;
        					}
        				}
        				out_data_by_month.push(h);
        			}
        			
        			// 指定图表的配置项和数据
        			var option = {
        					title: {
        						text: '月度收支图',
        						x: 'center'
        					},
        					legend: {
        						data: types
        					},
        					tooltip: {
        						trigger: 'axis',
        						axisPointer: {
        							axis: 'x'
        						},
        						formatter: function(params) {
        							var result = '';
        							
        							var in_tooltip = '';
        							var in_money = 0.0;
        							for(var i = 0; i < params.length/2; i++) {
        								var p = params[i];
        								if (p.data > 0) {
        									in_money += p.data;
        									in_tooltip += (p.marker + p.seriesName + ': ' + p.data.toFixed(2) + '<br/>');
        								}
        							}
        							result = '收入: ' + in_money.toFixed(2) + ' <br />' + in_tooltip;
        							
        							var out_tooltip = '';
        							var out_money = 0.0;
        							for(var i = params.length/2; i < params.length; i++) {
        								var p = params[i];
        								if (p.data > 0) {
        									out_money += p.data;
        									out_tooltip += (p.marker + p.seriesName + ': ' + p.data.toFixed(2) + '<br/>');
        								}
        							}
        							result += '支出: -' + out_money.toFixed(2) + ' <br />' + out_tooltip + '余额: ' + (in_money-out_money).toFixed(2);
        							return result;
        						}
        					},
        					xAxis: [
        						{
        					        type: 'category',
        					        data: months
        					    }
        					],
        					yAxis: [
        					    {
        					    	type: 'value'
        					    }
        					],
        					series: in_data_by_month.concat(out_data_by_month)
        			};
        			myChart.hideLoading();
        			// 使用刚指定的配置项和数据显示图表。
        			myChart.setOption(option, true);
        		}
        	});
        },
        tabDetailsClick: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.getInstanceByDom(document.getElementById('report'));
            if (myChart == null) {
                myChart = echarts.init(document.getElementById('report'));
            }
            myChart.on('click', this.loadSingleDate);
            myChart.showLoading({
                text: '数据努力加载中...'
            });
            $.post({
                url: '../../CBS/V/BOOK/KEEP/reportStream?_' + $.now(),
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({startDate: this.dateRange[0], endDate: this.dateRange[1]}),
                type: 'POST',
                success: function(data) {
                    var dates = $.map(data['in'], function(e, i) {
                        return e['DTE'];
                    });

                    var outData = $.map(data['out'], function(e, i) {
                        return e['MONEY'].toFixed(2);
                    });
                    var inData = $.map(data['in'], function(e, i) {
                        return e['MONEY'].toFixed(2);
                    });

                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '收支明细图'
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
                        }]
                    };
                    myChart.hideLoading();
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option, true);
                }
            });
        },
        tabAddUpClick: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.getInstanceByDom(document.getElementById('report'));
            if (myChart == null) {
                myChart = echarts.init(document.getElementById('report'));
            }
            myChart.on('click', this.loadSingleDate);
            myChart.showLoading({
                text: '数据努力加载中...'
            });
            $.post({
                url: '../../CBS/V/BOOK/KEEP/reportBalance?_' + $.now(),
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
                    myChart.setOption(option, true);
                }
            });
        }
	}
})