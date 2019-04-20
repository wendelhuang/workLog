package net.chenlin.dp.modules.cbs.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.common.utils.CommonUtils;
import net.chenlin.dp.modules.cbs.dao.CbsTKeepTypeMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTKeepTypeEntity;
import net.chenlin.dp.modules.cbs.service.CbsTKeepTypeService;
import net.chenlin.dp.modules.sys.entity.SysUserEntity;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@Service("cbsTKeepTypeService")
public class CbsTKeepTypeServiceImpl implements CbsTKeepTypeService {

	@Autowired
	private CbsTKeepTypeMapper cbsTKeepTypeMapper;

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	@Override
	public Page<CbsTKeepTypeEntity> listCbsTKeepType(Map<String, Object> params, SysUserEntity sysUserEntity) {
		params.put("uid", sysUserEntity.getUserId());
		Query query = new Query(params);
		Page<CbsTKeepTypeEntity> page = new Page<>(query);
		cbsTKeepTypeMapper.listForPage(page, query);
		return page;
	}

	/**
	 * 不分页查询
	 * 
	 * @param params
	 * @return
	 */
	@Override
	public R listAllCbsTKeepType(Map<String, Object> params, SysUserEntity sysUserEntity) {
		params.put("uid", sysUserEntity.getUserId());
		Query query = new Query(params);
		List<CbsTKeepTypeEntity> list = cbsTKeepTypeMapper.list(query);
		R r = R.ok();
		r.put("data", list);
		return r;
	}

	/**
	 * 新增
	 * 
	 * @param cbsTKeepType
	 * @return
	 */
	@Override
	public R saveCbsTKeepType(CbsTKeepTypeEntity cbsTKeepType) {
		int count = cbsTKeepTypeMapper.save(cbsTKeepType);
		return CommonUtils.msg(count);
	}

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public R getCbsTKeepTypeById(Long id) {
		CbsTKeepTypeEntity cbsTKeepType = cbsTKeepTypeMapper.getObjectById(id);
		return CommonUtils.msg(cbsTKeepType);
	}

	/**
	 * 修改
	 * 
	 * @param cbsTKeepType
	 * @return
	 */
	@Override
	public R updateCbsTKeepType(CbsTKeepTypeEntity cbsTKeepType) {
		int count = cbsTKeepTypeMapper.update(cbsTKeepType);
		return CommonUtils.msg(count);
	}

	/**
	 * 列表
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public R batchRemove(Long[] id) {
		int count = cbsTKeepTypeMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<CbsTKeepTypeEntity> listAllCbsTKeepTypeByUser(SysUserEntity sysUserEntity) {
		Map<String, Object> params = new HashMap<>();
		params.put("uid", sysUserEntity.getUserId());
		Query query = new Query(params);
		List<CbsTKeepTypeEntity> list = cbsTKeepTypeMapper.list(query);
		return list;
	}

}
