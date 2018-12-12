package net.chenlin.dp.modules.cbs.service;

import java.util.Map;

import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTWorklogEntity;
import net.chenlin.dp.modules.sys.entity.SysUserEntity;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
public interface CbsTWorklogService {

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	R listCbsTWorklog(Map<String, Object> params, SysUserEntity user);

	/**
	 * 新增
	 * 
	 * @param cbsTWorklog
	 * @return
	 */
	R saveCbsTWorklog(CbsTWorklogEntity cbsTWorklog);

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	R getCbsTWorklogById(Long id);

	/**
	 * 修改
	 * 
	 * @param cbsTWorklog
	 * @return
	 */
	R updateCbsTWorklog(CbsTWorklogEntity cbsTWorklog);

	/**
	 * 列表
	 * 
	 * @param id
	 * @return
	 */
	R batchRemove(Long[] id);

}
