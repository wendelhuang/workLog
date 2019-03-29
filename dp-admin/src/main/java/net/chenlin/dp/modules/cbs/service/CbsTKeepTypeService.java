package net.chenlin.dp.modules.cbs.service;

import java.util.List;
import java.util.Map;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTKeepTypeEntity;
import net.chenlin.dp.modules.sys.entity.SysUserEntity;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
public interface CbsTKeepTypeService {

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	Page<CbsTKeepTypeEntity> listCbsTKeepType(Map<String, Object> params, SysUserEntity sysUserEntity);

	/**
	 * 不分页查询
	 * 
	 * @param params
	 * @return
	 */
	R listAllCbsTKeepType(Map<String, Object> params, SysUserEntity sysUserEntity);

	/**
	 * 根据用户查询
	 * 
	 * @param sysUserEntity
	 * @return
	 */
	List<CbsTKeepTypeEntity> listAllCbsTKeepTypeByUser(SysUserEntity sysUserEntity);

	/**
	 * 新增
	 * 
	 * @param cbsTKeepType
	 * @return
	 */
	R saveCbsTKeepType(CbsTKeepTypeEntity cbsTKeepType);

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	R getCbsTKeepTypeById(Long id);

	/**
	 * 修改
	 * 
	 * @param cbsTKeepType
	 * @return
	 */
	R updateCbsTKeepType(CbsTKeepTypeEntity cbsTKeepType);

	/**
	 * 列表
	 * 
	 * @param id
	 * @return
	 */
	R batchRemove(Long[] id);

}
