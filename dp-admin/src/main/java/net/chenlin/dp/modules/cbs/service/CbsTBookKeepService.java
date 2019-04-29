package net.chenlin.dp.modules.cbs.service;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTBookKeepEntity;
import net.chenlin.dp.modules.sys.entity.SysUserEntity;

import java.util.Map;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
public interface CbsTBookKeepService {

	/**
	 * 新增
	 * 
	 * @param cbsTBookKeep
	 * @return
	 */
	R saveCbsTBookKeep(CbsTBookKeepEntity cbsTBookKeep);

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	R getCbsTBookKeepById(Long id);

	/**
	 * 修改
	 * 
	 * @param cbsTBookKeep
	 * @return
	 */
	R updateCbsTBookKeep(CbsTBookKeepEntity cbsTBookKeep);

	/**
	 * 列表
	 * 
	 * @param id
	 * @return
	 */
	R batchRemove(Long[] id);

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	Page<CbsTBookKeepEntity> listPageCbsTBookKeep(Map<String, Object> params);

	R listCbsTBookKeep(Map<String, Object> params, SysUserEntity sysUserEntity);

	R reportBalance(Long uid, String startDate, String endDate);

	R reportStream(Long uid, String startDate, String endDate);

	R reportType(Long uid, String startDate, String endDate);

	R removeByEventId(Long[] eventId);

}
