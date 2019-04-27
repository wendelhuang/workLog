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
		pageNumber: 1,
		pageSize: 10,
		total: 0,
		cbsVKeepType: {}
	},
    mounted: function() {
        this.load();
    },
	methods : {
		getTableData: function(pageNumber, pageSize) {
			$.post({
                url: '../../CBS/V/BOOK/KEEP/list?_' + $.now(),
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({pageSize: pageSize, pageNumber: pageNumber}),
                type: 'POST',
                success: function(data) {
                	var keepTypeData = data.cbsTKeepType;
                    vm.tableData = data.cbsVBookKeep.rows;
                    vm.total = data.cbsVBookKeep.total;
                    
                    for(var i = 0; i < keepTypeData.length; i++) {
                    	vm.cbsTKeepType[keepTypeData[i].id] = keepTypeData[i];
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
							vm.tableData[i].typeIcon = vm.cbsTKeepType[vm.tableData[i].typeId].typeIcon;
							vm.tableData[i].typeName = vm.cbsTKeepType[vm.tableData[i].typeId].typeName;
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
		load: function() {
            this.getTableData(this.pageNumber, this.pageSize);
		},
		save: function() {
			dialogOpen({
				title: '新增',
				url: 'cbs/cbsvbookkeep/add.html?_' + $.now(),
				width: '420px',
				height: '500px',
				yes : function(iframeId) {
					top.frames[iframeId].vm.acceptClick();
				},
			});
		},
		edit: function(id) {
            dialogOpen({
                title: '编辑',
                url: 'cbs/cbsvbookkeep/edit.html?_' + $.now(),
                width: '420px',
                height: '500px',
                success: function(iframeId){
                    top.frames[iframeId].vm.cbsVBookKeep.id = id;
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
            dialogOpen({
                title: '编辑',
                url: 'cbs/cbstbookkeep/edit.html?_' + $.now(),
                width: '420px',
                height: '500px',
                success: function(iframeId){
                    top.frames[iframeId].vm.cbsVBookKeep.id = id;
                    top.frames[iframeId].vm.setForm();
                },
                yes: function(iframeId){
                    top.frames[iframeId].vm.acceptClick();
                }
            });
		},
		removeBookKeep: function(batch, id) {
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
                url: '../../CBS/V/BOOK/KEEP/remove?_' + $.now(),
                param: ids,
                success: function(data) {
                    vm.load();
                }
            });
		}
	}
})