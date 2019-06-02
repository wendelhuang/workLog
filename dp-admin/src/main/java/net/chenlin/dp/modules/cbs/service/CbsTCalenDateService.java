package net.chenlin.dp.modules.cbs.service;

import java.util.List;
import java.util.Map;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenDateEntity;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
public interface CbsTCalenDateService {

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	Page<CbsTCalenDateEntity> listCbsTCalenDate(Map<String, Object> params);

	/**
	 * 新增
	 * 
	 * @param cbsTCalenDate
	 * @return
	 */
	R saveCbsTCalenDate(CbsTCalenDateEntity cbsTCalenDate);

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	R getCbsTCalenDateById(Long id);

	/**
	 * 修改
	 * 
	 * @param cbsTCalenDate
	 * @return
	 */
	R updateCbsTCalenDate(CbsTCalenDateEntity cbsTCalenDate);

	/**
	 * 列表
	 * 
	 * @param id
	 * @return
	 */
	R batchRemove(Long[] id);

	List<CbsTCalenDateEntity> listByYearAndMonth(int i, int j);

	List<Map<String, Object>> selectMonthByDateRange(String startDate, String endDate);
}
