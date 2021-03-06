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
		url: '../../CBS/T/CALEN/EVENT/TYPE/list?_' + $.now(),
		height: $(window).height()-56,
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "uid", title : "uid", width : "100px"},
			{field : "typeCode", title : "类型代码", width : "100px"},
			{field : "typeName", title : "类型名称", width : "100px"},
			{field : "typeType", title : "类型的类型", width : "100px", formatter: function(value, row, index) {
					var m = {BOOK_KEEP: '记账', WORKLOG: '工作日记'};
					return m[value];
				}
			},
			{field : "remark", title : "备注", width : "100px"},
			{field : "createTime", title : "创建时间", width : "100px"},
			{field : "updateTime", title : "更新时间", width : "100px"},
			{title : "操作", formatter : function(value, row, index) {
					var _html = '';
					if (hasPermission('CBS:T:CALEN:EVENT:TYPE:edit')) {
                        _html += '<a href="javascript:;" onclick="vm.edit(\''+row.id+'\')" title="编辑"><i class="fa fa-pencil"></i></a>';
					}
					if (hasPermission('CBS:T:CALEN:EVENT:TYPE:remove')) {
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
				url: 'cbs/cbstcaleneventtype/add.html?_' + $.now(),
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
                url: 'cbs/cbstcaleneventtype/edit.html?_' + $.now(),
                width: '420px',
                height: '350px',
                success: function(iframeId){
                    top.frames[iframeId].vm.cbsTCalenEventType.id = id;
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
                url: '../../CBS/T/CALEN/EVENT/TYPE/remove?_' + $.now(),
                param: ids,
                success: function(data) {
                    vm.load();
                }
            });
		}
	}
})