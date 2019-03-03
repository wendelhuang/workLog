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
		url: '../../CBS/T/KEEP/TYPE/list?_' + $.now(),
		height: $(window).height()-56,
		queryParams: function(params){
			params.name = vm.keyword;
			return params;
		},
		columns: [
			{checkbox: true},
			{field : "id", title : "用户ID", width : "100px", visible: false},
			{field : "typeName", title : "类别名称", width : "100px"},
			{field : "typeIcon", title : "类别图标", width : "100px"},
			{field : "createTime", title : "创建时间", width : "100px"},
			{field : "updateTime", title : "更新时间", width : "100px"},
			{title : "操作", formatter : function(value, row, index) {
					var _html = '';
					if (hasPermission('CBS:T:KEEP:TYPE:edit')) {
                        _html += '<a href="javascript:;" onclick="vm.edit(\''+row.id+'\')" title="编辑"><i class="fa fa-pencil"></i></a>';
					}
					if (hasPermission('CBS:T:KEEP:TYPE:remove')) {
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
		pageNumber: 1,
		pageSize: 10,
		total: 0
	},
    mounted: function() {
        this.load();
    },
	methods : {
		getTableData: function(pageNumber, pageSize) {
			$.post({
                url: '../../CBS/T/KEEP/TYPE/list?_' + $.now(),
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({pageSize: pageSize, pageNumber: pageNumber}),
                type: 'POST',
                success: function(data) {
                    vm.tableData = data.rows;
                    vm.total = data.total;
                }
            });
		},
		load: function() {
            this.getTableData(this.pageNumber, this.pageSize);
		},
		save: function() {
			dialogOpen({
				title: '新增',
				url: 'cbs/cbstkeeptype/add.html?_' + $.now(),
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
                url: 'cbs/cbstkeeptype/edit.html?_' + $.now(),
                width: '420px',
                height: '350px',
                success: function(iframeId){
                    top.frames[iframeId].vm.cbsTKeepType.id = id;
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
                url: '../../CBS/T/KEEP/TYPE/remove?_' + $.now(),
                param: ids,
                success: function(data) {
                    vm.load();
                }
            });
		}
	}
})