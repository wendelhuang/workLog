-- 菜单SQL
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    VALUES ('1', '', 'cbs/cbstcalenevent/list.html', NULL, '1', 'fa fa-circle-o');

-- 按钮父菜单ID
set @parentId = @@identity;

-- 菜单对应按钮SQL
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '刷新', '/CBS/T/CALEN/EVENT/list', 'CBS:T:CALEN:EVENT:list', '2', 'fa fa-circle-o';
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '新增', '/CBS/T/CALEN/EVENT/save', 'CBS:T:CALEN:EVENT:save', '2', 'fa fa-circle-o';
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '修改', '/CBS/T/CALEN/EVENT/update', 'CBS:T:CALEN:EVENT:edit', '2', 'fa fa-circle-o';
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '删除', '/CBS/T/CALEN/EVENT/remove', 'CBS:T:CALEN:EVENT:remove', '2', 'fa fa-circle-o';
