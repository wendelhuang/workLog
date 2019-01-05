-- 菜单SQL
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    VALUES ('1', '', 'cbs/cbstbookkeep/list.html', NULL, '1', 'fa fa-circle-o');

-- 按钮父菜单ID
set @parentId = @@identity;

-- 菜单对应按钮SQL
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '刷新', '/CBS/T/BOOK/KEEP/list', 'CBS:T:BOOK:KEEP:list', '2', 'fa fa-circle-o';
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '新增', '/CBS/T/BOOK/KEEP/save', 'CBS:T:BOOK:KEEP:save', '2', 'fa fa-circle-o';
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '修改', '/CBS/T/BOOK/KEEP/update', 'CBS:T:BOOK:KEEP:edit', '2', 'fa fa-circle-o';
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '删除', '/CBS/T/BOOK/KEEP/remove', 'CBS:T:BOOK:KEEP:remove', '2', 'fa fa-circle-o';
