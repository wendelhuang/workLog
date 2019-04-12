package net.chenlin.dp.modules.cbs.service;

import java.util.Map;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventTypeEntity;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
public interface CbsTCalenEventTypeService {

    /**
	 * 分页查询
	 * @param params
	 * @return
	 */
	Page<CbsTCalenEventTypeEntity> listCbsTCalenEventType(Map<String, Object> params);

    /**
     * 新增
     * @param cbsTCalenEventType
     * @return
     */
	R saveCbsTCalenEventType(CbsTCalenEventTypeEntity cbsTCalenEventType);

    /**
     * 根据id查询
     * @param id
     * @return
     */
	R getCbsTCalenEventTypeById(Long id);

    /**
     * 修改
     * @param cbsTCalenEventType
     * @return
     */
	R updateCbsTCalenEventType(CbsTCalenEventTypeEntity cbsTCalenEventType);

    /**
     * 列表
     * @param id
     * @return
     */
	R batchRemove(Long[] id);
	
}
