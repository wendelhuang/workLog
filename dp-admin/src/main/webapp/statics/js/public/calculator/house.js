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
		areaTax: 0,
		unitPriceTax: 0,
		totalTax: 0,
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
		totalLoan: 0,
		termLoan: 30,
		interestLoad: 1,
		repaymentMethodLoan: 'equalPrincipalInterest',
		interestLoan: '1.0',
		interestLoanOptions: [{
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
		interestRealLoan: '4.9'
	},
	computed: {
		houseNewTax: function() {
			return this.houseTypeTax === 'new';
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
		formatTooltipTermLoan: function(v) {
			return '' + v + '年(' + v*12 + '期)';
		}
	}
})