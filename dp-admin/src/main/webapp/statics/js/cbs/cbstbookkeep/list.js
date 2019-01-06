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
		tableData: []
	},
    mounted: function() {
        this.load();
    },
	methods : {
		load: function() {
            $.post({
                url: '../../CBS/T/BOOK/KEEP/list?_' + $.now(),
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({pageSize: 10, pageNumber: 1}),
                type: 'POST',
                success: function(data) {
                	console.log(data);
                    vm.tableData = data.rows;
                    var outInFormat = {
                    	'OUT': '支出',
						'IN': '收入'
					};
                    for(var i = 0; i < vm.tableData.length; i++) {
						vm.tableData[i].outInFormat = outInFormat[vm.tableData[i].outIn];
						vm.tableData[i].money = vm.tableData[i].money.toFixed(2);
					}
                }
            });
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
		}
	}
})