/**
 * js
 */

$(function () {
	initialPage();
});

function initialPage() {
	/*$(window).resize(function() {
		$('#dataGrid').bootstrapTable('resetView', {height: $(window).height()-56});
	});*/
}


var vm = new Vue({
	el:'#dpLTE',
	data: {
        activeName: 'tabSalaryTax',
		city: 'beijing',
		cities: [{
			value: 'beijing', label: '北京'
		},{
			value: 'shanghai', label: '上海'
		}],
        salary_per_month: '10000',
		tableData: [],

        /**
         * 五险一金计算器
         */
        related_link: '',

        /**
		 * 工资计算器
         */
        tax_free_per_month: '1000',

		RATIO_INSURA: {
        	beijing: {
        		avg_salary_last_year: 8467,/*
				min_salary_base_pasture: (this.RATIO_INSURA.beijing.avg_salary_last_year*0.4).toFixed(0),
				min_salary_base_medical: (this.RATIO_INSURA.beijing.avg_salary_last_year*0.6).toFixed(0),
				max_salary_base: this.RATIO_INSURA.beijing.avg_salary_last_year*3*/
			}
		},

        /**
		 * style
         */
        styleChart: {
        	width: '100%',
        	height: '0px'
		}
	},
	computed: {
	},
    mounted: function() {
        /*var chart2 = echarts.init(document.getElementById('chartInsura'));

        var option2 = {
            series: [{
                name: '项目',
                type: 'pie',
                selectedMode: 'single',
                data: [
                    {name: '养老保险金', value: 0, rate: '(8%)'},
                    {name: '医疗保险金', value: 0, rate: '(2%)'},
                    {name: '失业保险金', value: 0, rate: '(0.2%)'},
                    {name: '基本住房公积金', value: 0, rate: '(12%)'},
                    {name: '剩余', value: 100, rate: '(77.8%)'},
                ]
            }]
        };
        chart2.setOption(option2);*/

        this.related_link = 'http://www.bjrbj.gov.cn/csibiz/home/static/articles/catalog_75200/2019-05-20/article_ff8080816a398a53016ad44dd0e100ca/ff8080816a398a53016ad44dd0e100ca.html';
    },
	methods : {
		loadCurrentTab: function() {
            eval('this.' + vm.activeName + 'Click()');
		},
        loanTypeLoanChange: function(v) {
			console.log(v);
		},
        table_tax: function(v) {
		    var vs = [{
		        rate: 0.03,
                qc: 0
            },{
                rate: 0.1,
                qc: 2520
            },{
                rate: 0.2,
                qc: 16920
            },{
                rate: 0.25,
                qc: 31920
            },{
                rate: 0.3,
                qc: 52920
            },{
                rate: 0.35,
                qc: 85920
            },{
                rate: 0.45,
                qc: 181920
            }];
		    if (v <= 36000) {
		        return vs[0];
            }else if (v <= 144000) {
		        return vs[1];
            }else if (v <= 300000) {
                return vs[2];
            }else if (v <= 420000) {
                return vs[3];
            }else if (v <= 660000) {
                return vs[4];
            }else if (v <= 960000) {
                return vs[5];
            }else {
                return vs[6];
            }
        },
		compute: function() {
            this.tableData = [];
            /**
			 * 这块遇到了问题, 动态设置高度echarts绘制不出来
			 *
             */
			if (this.salary_per_month === '') {
				return;
			}

			if (this.activeName === 'tabSalaryInsura') {
                var salary_per_month = parseFloat(this.salary_per_month);
                var ratio_info = this.RATIO_INSURA[this.city];
                var salary_base_pasture = Math.max((ratio_info.avg_salary_last_year*0.4).toFixed(0), salary_per_month);
                var salary_base_medical = Math.max((ratio_info.avg_salary_last_year*0.6).toFixed(0), salary_per_month);
                if (salary_per_month > ratio_info.avg_salary_last_year*3) {
                    salary_base_pasture = ratio_info.avg_salary_last_year*3;
                    salary_base_medical = ratio_info.avg_salary_last_year*3;
                }
                var fund = Math.min(salary_per_month, ratio_info.avg_salary_last_year*3);
                var max_salary_base = Math.min(ratio_info.avg_salary_last_year*3, salary_per_month);

                var take_off_personal = salary_base_pasture*0.082 + salary_base_medical*0.02 + 3 + fund*0.12;
                var take_off_company = salary_base_pasture*0.198 + salary_base_medical*0.127 + fund*0.12;
                var sum_company = salary_per_month + take_off_company;

                this.tableData.push({item: '养老保险金', icon: 'el-icon-caret-right', base: salary_base_pasture, personal: (salary_base_pasture*0.08).toFixed(2), personalRate: '(8%)', company: (salary_base_pasture*0.19).toFixed(2), companyRate: '(19%)'});
                this.tableData.push({item: '医疗保险金', icon: 'el-icon-caret-right', base: salary_base_medical, personal: (salary_base_medical*0.02+3).toFixed(2), personalRate: '(2%+3)', company: (salary_base_medical*0.1).toFixed(2), companyRate: '(10%)'});
                this.tableData.push({item: '失业保险金', icon: 'el-icon-caret-right', base: salary_base_pasture, personal: (salary_base_pasture*0.002).toFixed(2), personalRate: '(0.2%)', company: (salary_base_pasture*0.008).toFixed(2), companyRate: '(0.8%)'});
                this.tableData.push({item: '生育保险金', icon: 'el-icon-caret-right', base: salary_base_medical, personal: '0.00', personalRate: '(0%)', company: (salary_base_medical*0.008).toFixed(2), companyRate: '(0.8%)'});
                this.tableData.push({item: '工伤保险金', icon: 'el-icon-caret-right', base: salary_base_medical, personal: '0.00', personalRate: '(0%)', company: (salary_base_medical*0.019).toFixed(2), companyRate: '(1.9%)'});
                this.tableData.push({item: '基本住房公积金', icon: 'el-icon-caret-right', base: fund, personal: (fund*0.12).toFixed(2), personalRate: '(12%)', company: (fund*0.12).toFixed(2), companyRate: '(12%)'});
                this.tableData.push({item: '共计扣除', icon: 'el-icon-remove', personal: take_off_personal.toFixed(2), company: take_off_company.toFixed(2),});
                this.tableData.push({item: '税前剩余', icon: 'el-icon-time', personal: (salary_per_month-take_off_personal).toFixed(2)});

                this.$refs.chartInsuraPersonalRef.style.width = this.$refs.chartInsuraPersonalWrapperRef.offsetWidth + 'px';
                this.$refs.chartInsuraPersonalRef.style.height = '400px';
                this.$refs.chartInsuraCompanyRef.style.width = this.$refs.chartInsuraCompanyWrapperRef.offsetWidth + 'px';
                this.$refs.chartInsuraCompanyRef.style.height = '400px';

                var chartPersonal = echarts.init(document.getElementById('chartInsuraPersonal'));
				//chart.clear();
				chartPersonal.resize();
                var optionPersonal = {
                	title: {
                        x: 'center',
                		text: '个人税前工资去向',
						subtext: '共计' + salary_per_month.toFixed(2)
					},
                	tooltip: {
                		trigger: 'item',
						formatter: function(params, ticket, callback) {
                			return params.data.name + '<br/>' + params.data.value + params.data.rate;
						}
					},
                	series: [{
                		name: '项目',
						type: 'pie',
						selectedMode: 'single',
                        label: {
                            normal: {
                                formatter: '{b}：{c}',
                            }
                        },
						radius: [0, '50%'],
						data: [
							{name: '养老保险金', value: (salary_base_pasture*0.08).toFixed(2), rate: '(' + ((salary_base_pasture*0.08)*100/salary_per_month).toFixed(2) + '%)'},
							{name: '医疗保险金', value: (salary_base_medical*0.02+3).toFixed(2), rate: '(' + ((salary_base_medical*0.02+3)*100/salary_per_month).toFixed(2) + '%)'},
							{name: '失业保险金', value: (salary_base_pasture*0.002).toFixed(2), rate: '(' + ((salary_base_pasture*0.002)*100/salary_per_month).toFixed(2) + '%)'},
							{name: '基本住房公积金', value: (fund*0.12).toFixed(2), rate: '(' + ((fund*0.12)*100/salary_per_month).toFixed(2) + '%)%'},
							{name: '税前剩余', value: (salary_per_month - take_off_personal).toFixed(2), rate: '(' + ((salary_per_month - take_off_personal)*100/salary_per_month).toFixed(2) + '%)'},
						]
					}]
				};
                chartPersonal.setOption(optionPersonal, true);

                var chartCompany = echarts.init(document.getElementById('chartInsuraCompany'));
                //chart.clear();
                chartCompany.resize();
                var optionCompany = {
                    title: {
                        x: 'center',
                        text: '单位成本去向',
                        subtext: '共计' + (salary_per_month*1.43).toFixed(2)
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params, ticket, callback) {
                            return params.data.name + '<br/>' + params.data.value + params.data.rate;
                        }
                    },
                    series: [{
                        name: '项目',
                        type: 'pie',
                        selectedMode: 'single',
                        label: {
                            normal: {
                                formatter: '{b}：{c}',
                            }
                        },
                        radius: [0, '50%'],
                        data: [
                            {name: '单位养老保险金', value: (salary_base_pasture*0.19).toFixed(2), rate: '(' + ((salary_base_pasture*0.19)*100/sum_company).toFixed(2) + '%)'},
                            {name: '单位医疗保险金', value: (salary_base_medical*0.1).toFixed(2), rate: '(' + ((salary_base_medical*0.1)*100/sum_company).toFixed(2) + '%)'},
                            {name: '单位失业保险金', value: (salary_base_pasture*0.008).toFixed(2), rate: '(' + ((salary_base_pasture*0.008)*100/sum_company).toFixed(2) + '%)'},
                            {name: '单位生育保险金', value: (salary_base_medical*0.008).toFixed(2), rate: '(' + ((salary_base_medical*0.008)*100/sum_company).toFixed(2) + '%)'},
                            {name: '单位工伤保险金', value: (salary_base_medical*0.019).toFixed(2), rate: '(' + ((salary_base_medical*0.019)*100/sum_company).toFixed(2) + '%)'},
                            {name: '单位基本住房公积金', value: (fund*0.12).toFixed(2), rate: '(' + ((fund*0.12)*100/sum_company).toFixed(2) + '%)'},

                            {name: '个人养老保险金', value: (salary_base_pasture*0.08).toFixed(2), rate: '(' + ((salary_base_pasture*0.08)*100/sum_company).toFixed(2) + '%)'},
                            {name: '个人医疗保险金', value: (salary_base_medical*0.02+3).toFixed(2), rate: '(' + ((salary_base_medical*0.02+3)*100/sum_company).toFixed(2) + '%)'},
                            {name: '个人失业保险金', value: (salary_base_pasture*0.002).toFixed(2), rate: '(' + ((salary_base_pasture*0.002)*100/sum_company).toFixed(2) + '%)'},
                            {name: '个人基本住房公积金', value: (fund*0.12).toFixed(2), rate: '(' + ((fund*0.12)*100/sum_company).toFixed(2) + '%)'},

                            {name: '个人税前剩余', value: (salary_per_month-take_off_personal).toFixed(2), rate: '(' + ((salary_per_month-take_off_personal)*100/sum_company).toFixed(2) + '%)'},
                        ]
                    }]
                };
                chartCompany.setOption(optionCompany, true);



			}else if (this.activeName === 'tabSalaryTax') {
                var salary_per_month = parseFloat(this.salary_per_month);
                var tax_free = parseFloat(this.tax_free_per_month);
                var ratio_info = this.RATIO_INSURA[this.city];
                var salary_base_pasture = Math.max((ratio_info.avg_salary_last_year*0.4).toFixed(0), salary_per_month);
                var salary_base_medical = Math.max((ratio_info.avg_salary_last_year*0.6).toFixed(0), salary_per_month);
                if (salary_per_month > ratio_info.avg_salary_last_year*3) {
                    salary_base_pasture = ratio_info.avg_salary_last_year*3;
                    salary_base_medical = ratio_info.avg_salary_last_year*3;
                }
                var fund = Math.min(salary_per_month, ratio_info.avg_salary_last_year*3);
                var max_salary_base = Math.min(ratio_info.avg_salary_last_year*3, salary_per_month);

                var take_off_personal = salary_base_pasture*0.082 + salary_base_medical*0.02 + 3 + fund*0.12;
                var take_off_company = salary_base_pasture*0.198 + salary_base_medical*0.127 + fund*0.12;
                var sum_company = salary_per_month + take_off_company;

                var tax_total = 0;
                var salary_after_tax_total = 0;

                for(var i = 1; i<=12; i++) {
                    var month = '' + i + '月';
                    var salary_after_insura_take_off = salary_per_month - take_off_personal - tax_free;
                    var salary_before_tax_start_take_off_total = salary_after_insura_take_off * i;
                    var salary_after_tax_start_take_off_total = (salary_after_insura_take_off - 5000) * i;
                    var rate = this.table_tax(salary_after_tax_start_take_off_total)['rate'];
                    var qc = this.table_tax(salary_after_tax_start_take_off_total)['qc'];
                    var tax_total1 = salary_after_tax_start_take_off_total * rate - qc;
                    var tax_month = tax_total1 - tax_total;
                    tax_total = tax_total1;
                    var salary_after_tax = salary_after_insura_take_off - tax_month;
                    salary_after_tax_total = salary_after_tax_total + salary_after_tax;
                    var o = {
                        month: '' + i + '月',
                        salary: salary_per_month,
                        insura: take_off_personal,
                        tax_free_total: tax_free * i,
                        salary_after_insura_take_off: salary_after_insura_take_off,
                        salary_before_tax_start_take_off_total: salary_before_tax_start_take_off_total,
                        salary_after_tax_start_take_off_total: salary_after_tax_start_take_off_total,
                        tax_start_total: 5000 * i,
                        rate: rate,
                        qc: qc,
                        tax: tax_month,
                        tax_total: tax_total,
                        salary_after_tax: salary_after_tax,
                        salary_after_tax_total: salary_after_tax_total
                    };
                    this.tableData.push(o);
                }

                /**
                 * 画图
                 */
                this.$refs.chart_tax_ref.style.width = this.$refs.chart_tax_wrapper_ref.offsetWidth + 'px';
                this.$refs.chart_tax_ref.style.height = '400px';

                var month_data = $.map(this.tableData, function(e, i) {
                    return e.month;
                });
                var insura_month_data = $.map(this.tableData, function(e, i){
                    return e.insura;
                });
                var tax_month_data = $.map(this.tableData, function(e, i) {
                    return e.tax;
                });
                var salary_after_tax_month_data = $.map(this.tableData, function(e, i){
                    return e.salary_after_tax;
                });
                var tax_total_data = $.map(this.tableData, function(e, i){
                    return e.tax_total;
                });
                var salary_after_tax_total_data = $.map(this.tableData, function(e, i){
                    return e.salary_after_tax_total;
                });

                var chart_tax = echarts.init(document.getElementById('chart_tax'));
                //chart.clear();
                chart_tax.resize();
                var option_chart_tax = {
                    title: {
                        x: 'left',
                        text: '工资表'
                    },
                    legend: {
                        data: [
                            {
                                name: '税后月薪',
                                icon: 'rect'
                            },
                            {
                                name: '税金',
                                icon: 'rect'
                            },
                            {
                                name: '四险一金',
                                icon: 'rect'
                            },
                            {
                                name: '工资累计'
                            },
                            {
                                name: '税金累计'
                            }
                        ]
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params, ticket, callback) {
                            var res = params[0].axisValueLabel + '<br/>';
                            params.forEach(function(item){
                                res += item.marker + '' + item.seriesName + ': ' + item.data.toFixed(2) + '<br/>';
                            });
                            return res;
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: month_data
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        },{
                            type: 'value'
                        }
                    ],
                    series: [{
                        name: '税后月薪',
                        type: 'bar',
                        yAxisIndex: '0',
                        itemStyle: {

                        },
                        stack: '月薪',
                        data: salary_after_tax_month_data
                    },{
                        name: '税金',
                        type: 'bar',
                        stack: '月薪',
                        yAxisIndex: '0',
                        data: tax_month_data
                    },{
                        name: '四险一金',
                        type: 'bar',
                        stack: '月薪',
                        yAxisIndex: '0',
                        data: insura_month_data
                    },{
                        name: '工资累计',
                        type: 'line',
                        yAxisIndex: '1',
                        data: salary_after_tax_total_data
                    },{
                        name: '税金累计',
                        type: 'line',
                        yAxisIndex: '1',
                        data: tax_total_data
                    }]
                };
                chart_tax.setOption(option_chart_tax, true);
            }else{

			}
		},
		changeTab: function() {
			this.clear();
		},
		clear: function() {
			if (this.activeName === 'tabSalaryInsura') {
				this.tableData = [];
				this.salary_per_month = '10000';
				if (this.$refs.chartInsuraPersonalRef != undefined) {
                    this.$refs.chartInsuraPersonalRef.style.width = this.$refs.chartInsuraPersonalWrapperRef.offsetWidth + 'px';
                    this.$refs.chartInsuraPersonalRef.style.height = '0px';
                    this.$refs.chartInsuraCompanyRef.style.width = this.$refs.chartInsuraCompanyWrapperRef.offsetWidth + 'px';
                    this.$refs.chartInsuraCompanyRef.style.height = '0px';

                    var chartPersonal = echarts.init(document.getElementById('chartInsuraPersonal'));
                    //chart.clear();
                    chartPersonal.resize();
                    var optionchartPersonal = {
                        series: [{
                            name: '项目',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '50%'],
                            data: [
                            ]
                        }]
                    };
                    chartPersonal.setOption(optionchartPersonal, true);

                    var chartCompany = echarts.init(document.getElementById('chartInsuraCompany'));
                    //chart.clear();
                    chartCompany.resize();
                    var optionCompany = {
                        series: [{
                            name: '项目',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '50%'],
                            data: [
                            ]
                        }]
                    };
                    chartCompany.setOption(optionCompany, true);
				}else{
					console.log('this.$refs.chartInsuraPersonalRef undefined');
				}
			}else if (this.activeName === 'tabSalaryTax') {
			    this.tableData = [];
                this.salary_per_month = '10000';
                this.tax_free_per_month = '1000',

                this.$refs.chart_tax_ref.style.width = this.$refs.chart_tax_wrapper_ref.offsetWidth + 'px';
                this.$refs.chart_tax_ref.style.height = '0px';

                var chart_tax = echarts.init(document.getElementById('chart_tax'));
                //chart.clear();
                chart_tax.resize();
                var option_chart_tax = {
                    series: [{
                        name: '项目',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '50%'],
                        data: [
                        ]
                    }]
                };
                chart_tax.setOption(option_chart_tax, true);
            }
		}
	}
})