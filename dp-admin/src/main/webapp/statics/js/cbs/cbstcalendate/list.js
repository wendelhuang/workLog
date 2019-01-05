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
		url: '../../CBS/T/CALEN/DATE/list?_' + $.now(),
		height: $(window).height()-56,
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "calenId", title : "日历ID", width : "100px"},
			{field : "dateFmt8", title : "8位日期", width : "100px"},
			{field : "dateFmt10", title : "10位日期", width : "100px"},
			{field : "dateYear", title : "年", width : "100px"},
			{field : "dateMonth", title : "月", width : "100px"},
			{field : "dateDay", title : "日", width : "100px"},
			{field : "dateWeekday", title : "星期", width : "100px"},
			{field : "datePreFmt8", title : "前一自然日", width : "100px"},
			{field : "datePreFmt10", title : "前一自然日", width : "100px"},
			{field : "dateNextFmt8", title : "后一自然日", width : "100px"},
			{field : "dateNextFmt10", title : "后一自然日", width : "100px"},
			{field : "datePreworkFmt8", title : "前一工作日", width : "100px"},
			{field : "datePreworkFmt10", title : "前一自然日", width : "100px"},
			{field : "dateNextworkFmt8", title : "后一自然日", width : "100px"},
			{field : "dateNextworkFmt10", title : "后一自然日", width : "100px"},
			{title : "操作", formatter : function(value, row, index) {
					var _html = '';
					if (hasPermission('CBS:T:CALEN:DATE:edit')) {
                        _html += '<a href="javascript:;" onclick="vm.edit(\''+row.id+'\')" title="编辑"><i class="fa fa-pencil"></i></a>';
					}
					if (hasPermission('CBS:T:CALEN:DATE:remove')) {
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
		keyword: null
	},
	methods : {
		load: function() {
			$('#dataGrid').bootstrapTable('refresh');
		},
		save: function() {
			dialogOpen({
				title: '新增',
				url: 'cbs/cbstcalendate/add.html?_' + $.now(),
				width: '320px',
				height: '350px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function(id) {
            dialogOpen({
                title: '编辑',
                url: 'cbs/cbstcalendate/edit.html?_' + $.now(),
                width: '420px',
                height: '350px',
                success: function(iframeId){
                    top.frames[iframeId].vm.cbsTCalenDate.id = id;
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
                url: '../../CBS/T/CALEN/DATE/remove?_' + $.now(),
                param: ids,
                success: function(data) {
                    vm.load();
                }
            });
		}
	}
})