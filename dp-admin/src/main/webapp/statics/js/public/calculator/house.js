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
		keyword: null,
		activeName: 'tabTax',
		houseTypeTax: 'secondHand',
		firstTimeTax: 'yes',
		elevatorTax: 'yes',
		areaTax: '',
		unitPriceTax: '',
		totalTax: '',
		levyMethodTax: 'priceTotal',
		levyMethodTaxOptions: [{
			value: 'priceTotal', label: '总价'
		},{
			value: 'priceDiff', label: '差价'
		}],
		houseClassifyTax: 'general',
		houseClassifyTaxOptions: [{
			value: 'general', label: '普通住宅',
		},{
			value: 'notGeneral', label: '非普通住宅',
		},{
			value: 'affordable', label: '经济适用房',
		}],
		purchasePeriod: '5',
		firstPurchase: 'yes',
		only: 'yes',
		
		/**
		 * 房贷计算器
		 */
		loanTypeLoan: 'commercial',
		loanTypeLoanOptions: [{
			value: 'commercial', label: '商业贷款'
		},{
			value: 'fund', label: '公积金贷款'
		},{
			value: 'portfolio', label: '组合贷款'
		}],
		total_loan: '100',
		term_loan: 30,
		interestLoad: 1,
		repaymentMethodLoan: 'equalPrincipalInterest',
		interest_loan_options: [{
			value: '1.3', label: '最新基准利率1.3倍'
		},{
			value: '1.2', label: '最新基准利率1.2倍'
		},{
			value: '1.1', label: '最新基准利率1.1倍'
		},{
			value: '1.05', label: '最新基准利率1.05倍'
		},{
			value: '1.0', label: '最新基准利率'
		},{
			value: '0.95', label: '最新基准利率9.5折'
		},{
			value: '0.9', label: '最新基准利率9折'
		},{
			value: '0.88', label: '最新基准利率8.8折'
		},{
			value: '0.85', label: '最新基准利率8.5折'
		},{
			value: '0.7', label: '最新基准利率7折'
		}],
		interestRealLoan: '4.9',
		portfolioLoad: false,
        commercial_interest_rate: '1.0',
        commercial_interest_loan: '4.9',
        fundTotalLoan: '',
        fundInterestRate: '1.0',
        fundInterestRealLoan: '3.25',

	},
	computed: {
		houseNewTax: function() {
			return this.houseTypeTax === 'new';
		},
        portfolioLoan: function() {
			return this.loanTypeLoan === 'portfolio';
		}
	},
    mounted: function() {
    },
	methods : {
		loadCurrentTab: function() {
            eval('this.' + vm.activeName + 'Click()');
		},
		houseTypeTaxChange: function(v) {
			if (v === 'new') {
				
			}else {
				
			}
		},
		formatTooltipterm_loan: function(v) {
			return '' + v + '年(' + v*12 + '期)';
		},
        loanTypeLoanChange: function(v) {
			console.log(v);
		},
		clear: function() {

		},
		compute: function() {
			if (this.activeName === 'tab_loan') {
				this.tableData = [];

                this.$refs.chart_loan_ref.style.width = this.$refs.chart_loan_wrapper_ref.offsetWidth + 'px';
                this.$refs.chart_loan_ref.style.height = '0px';

				var total_loan = math.multiply(parseFloat(this.total_loan), 10000);
				var interest = math.divide(parseFloat(this.commercial_interest_loan), 1200);
				var term = this.term_loan * 12;

				var p = math.pow(math.add(1, interest), term);
				var r = math.divide(math.multiply(total_loan, math.multiply(interest, p)), math.subtract(p, 1));
				var i_sum_p_i_equal = math.subtract(math.multiply(r, term), total_loan);


				var m = math.round(math.divide(total_loan, term), 2);
				var i_first = math.round(math.multiply(total_loan, interest), 2);
				var diff = math.round(math.multiply(m, interest), 2);
				var i_sum_p_equal = math.divide(math.multiply(diff, math.multiply(math.add(1, term), term)), 2);

				this.tableData.push({
					name: '月供',
					p_i_equal: math.round(r, 2),
					p_equal: math.round(math.add(m, i_first), 2),
					diff: math.round(diff, 2),
					unit: '元'
				});
                this.tableData.push({
                    name: '还款期数',
                    p_i_equal: term,
                    p_equal:  term,
					unit: '期'
                });
                this.tableData.push({
                    name: '总利息',
                    p_i_equal: i_sum_p_i_equal,
                    p_equal: i_sum_p_equal,
                    unit: '元'
                });
                this.tableData.push({
                    name: '本息合计',
                    p_i_equal: math.add(total_loan, i_sum_p_i_equal),
                    p_equal: math.add(total_loan, i_sum_p_equal),
                    unit: '期'
                });
			}
		}
	}
})