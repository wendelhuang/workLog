package net.chenlin.dp.modules.cbs.service;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsVBookKeepEntity;
import net.chenlin.dp.modules.sys.entity.SysUserEntity;

import java.util.Map;

/**
 * VIEW
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
public interface CbsVBookKeepService {

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	Page<CbsVBookKeepEntity> listCbsVBookKeep(Map<String, Object> params);

	R listCbsVBookKeep(Map<String, Object> params, SysUserEntity sysUserEntity);

	/**
	 * 新增
	 * 
	 * @param cbsVBookKeep
	 * @return
	 */
	R saveCbsVBookKeep(CbsVBookKeepEntity cbsVBookKeep);

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	R getCbsVBookKeepById(Long id);

	/**
	 * 修改
	 * 
	 * @param cbsVBookKeep
	 * @return
	 */
	R updateCbsVBookKeep(CbsVBookKeepEntity cbsVBookKeep);

	R updateCbsVBookKeepByEventId(CbsVBookKeepEntity cbsVBookKeep);

	/**
	 * 列表
	 * 
	 * @param id
	 * @return
	 */
	R batchRemove(Long[] id);

	R reportBalance(Long uid, String startDate, String endDate);

	R reportStream(Long uid, String startDate, String endDate);

	R reportType(Long uid, String startDate, String endDate);

}
