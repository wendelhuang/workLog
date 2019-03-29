package net.chenlin.dp.modules.cbs.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.common.utils.CommonUtils;
import net.chenlin.dp.modules.cbs.dao.CbsTBookKeepMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTBookKeepEntity;
import net.chenlin.dp.modules.cbs.entity.CbsTKeepTypeEntity;
import net.chenlin.dp.modules.cbs.service.CbsTBookKeepService;
import net.chenlin.dp.modules.sys.entity.SysUserEntity;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@Service("cbsTBookKeepService")
public class CbsTBookKeepServiceImpl implements CbsTBookKeepService {

	@Autowired
	private CbsTBookKeepMapper cbsTBookKeepMapper;

	@Autowired
	private CbsTKeepTypeServiceImpl cbsTKeepTypeServiceImpl;

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	@Override
	public R listCbsTBookKeep(Map<String, Object> params, SysUserEntity sysUserEntity) {
		params.put("userId", sysUserEntity.getUserId());
		Query query = new Query(params);
		Page<CbsTBookKeepEntity> page = new Page<>(query);
		cbsTBookKeepMapper.listUserForPage(page, query);

		List<CbsTKeepTypeEntity> cbsTKeepTypeEntities = cbsTKeepTypeServiceImpl
				.listAllCbsTKeepTypeByUser(sysUserEntity);
		R r = R.ok();
		r.put("cbsTBookKeep", page);
		r.put("cbsTKeepType", cbsTKeepTypeEntities);
		return r;
	}

	/**
	 * 新增
	 * 
	 * @param cbsTBookKeep
	 * @return
	 */
	@Override
	public R saveCbsTBookKeep(CbsTBookKeepEntity cbsTBookKeep) {
		int count = cbsTBookKeepMapper.save(cbsTBookKeep);
		return CommonUtils.msg(count);
	}

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public R getCbsTBookKeepById(Long id) {
		CbsTBookKeepEntity cbsTBookKeep = cbsTBookKeepMapper.getObjectById(id);
		return CommonUtils.msg(cbsTBookKeep);
	}

	/**
	 * 修改
	 * 
	 * @param cbsTBookKeep
	 * @return
	 */
	@Override
	public R updateCbsTBookKeep(CbsTBookKeepEntity cbsTBookKeep) {
		int count = cbsTBookKeepMapper.update(cbsTBookKeep);
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
		int count = cbsTBookKeepMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}


	R reportBalance(String startDate, String endDate) {
		return
	}

}
