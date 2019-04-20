package net.chenlin.dp.modules.cbs.service;

import java.util.Map;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventEntity;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
public interface CbsTCalenEventService {

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
