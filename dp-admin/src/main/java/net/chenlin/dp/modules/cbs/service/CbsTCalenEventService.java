package net.chenlin.dp.modules.cbs.service;

import java.util.List;
import java.util.Map;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventEntity;
import net.chenlin.dp.modules.sys.entity.SysUserEntity;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
public interface CbsTCalenEventService {

	List<CbsTCalenEventEntity> listCbsTCalenEvent(Map<String, Object> params, SysUserEntity sysUserEntity);

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	Page<CbsTCalenEventEntity> listCbsTCalenEvent(Map<String, Object> params);

	/**
	 * 新增
	 * 
	 * @param cbsTCalenEvent
	 * @return
	 */
	R saveCbsTCalenEvent(CbsTCalenEventEntity cbsTCalenEvent);

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	R getCbsTCalenEventById(Long id);

	/**
	 * 修改
	 * 
	 * @param cbsTCalenEvent
	 * @return
	 */
	R updateCbsTCalenEvent(CbsTCalenEventEntity cbsTCalenEvent);

	/**
	 * 列表
	 * 
	 * @param id
	 * @return
	 */
	R batchRemove(Long[] id);

}
