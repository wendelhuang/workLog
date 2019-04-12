-- 菜单SQL
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    VALUES ('1', '', 'cbs/cbstcaleneventtype/list.html', NULL, '1', 'fa fa-circle-o');

-- 按钮父菜单ID
set @parentId = @@identity;

-- 菜单对应按钮SQL
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '刷新', '/CBS/T/CALEN/EVENT/TYPE/list', 'CBS:T:CALEN:EVENT:TYPE:list', '2', 'fa fa-circle-o';
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '新增', '/CBS/T/CALEN/EVENT/TYPE/save', 'CBS:T:CALEN:EVENT:TYPE:save', '2', 'fa fa-circle-o';
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '修改', '/CBS/T/CALEN/EVENT/TYPE/update', 'CBS:T:CALEN:EVENT:TYPE:edit', '2', 'fa fa-circle-o';
INSERT INTO `sys_menu` (`parent_id`, `name`, `url`, `perms`, `type`, `icon`)
    SELECT @parentId, '删除', '/CBS/T/CALEN/EVENT/TYPE/remove', 'CBS:T:CALEN:EVENT:TYPE:remove', '2', 'fa fa-circle-o';
