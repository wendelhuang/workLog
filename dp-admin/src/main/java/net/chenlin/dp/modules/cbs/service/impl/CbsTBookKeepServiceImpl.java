package net.chenlin.dp.modules.cbs.service.impl;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.common.utils.CommonUtils;
import net.chenlin.dp.modules.cbs.dao.CbsTBookKeepMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTBookKeepEntity;
import net.chenlin.dp.modules.cbs.entity.CbsTKeepTypeEntity;
import net.chenlin.dp.modules.cbs.service.CbsTBookKeepService;
import net.chenlin.dp.modules.sys.entity.SysUserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@Service("cbsTBookKeepService")
public class CbsTBookKeepServiceImpl implements CbsTBookKeepService {

	@Autowired
	private CbsTBookKeepMapper cbsTBookKeepMapper;

	@Autowired
	private CbsTKeepTypeServiceImpl cbsTKeepTypeServiceImpl;

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

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	@Override
	public Page<CbsTBookKeepEntity> listPageCbsTBookKeep(Map<String, Object> params) {
		Query query = new Query(params);
		Page<CbsTBookKeepEntity> page = new Page<>(query);
		cbsTBookKeepMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R listCbsTBookKeep(Map<String, Object> params, SysUserEntity sysUserEntity) {
		params.put("userId", sysUserEntity.getUserId());
		R r = R.ok();
		Query query = new Query(params);
		if (params.get("pageSize") != null) {
			Page<CbsTBookKeepEntity> page = new Page<>(query);
			cbsTBookKeepMapper.listUserForPage(page, query);
			r.put("cbsTBookKeep", page);
		} else {
			List<CbsTBookKeepEntity> list = cbsTBookKeepMapper.listUser(query);
			r.put("cbsTBookKeep", list);
		}

		List<CbsTKeepTypeEntity> cbsTKeepTypeEntities = cbsTKeepTypeServiceImpl
				.listAllCbsTKeepTypeByUser(sysUserEntity);

		r.put("cbsTKeepType", cbsTKeepTypeEntities);
		return r;
	}

	@Override
	public R reportBalance(Long uid, String startDate, String endDate) {
		List<Map<String, Object>> out = cbsTBookKeepMapper.listReportBalance(uid, startDate, endDate, "OUT");
		List<Map<String, Object>> in = cbsTBookKeepMapper.listReportBalance(uid, startDate, endDate, "IN");
		return R.ok().put("out", out).put("in", in);
	}

	@Override
	public R reportStream(Long uid, String startDate, String endDate) {
		List<Map<String, Object>> out = cbsTBookKeepMapper.listReportStream(uid, startDate, endDate, "OUT");
		List<Map<String, Object>> in = cbsTBookKeepMapper.listReportStream(uid, startDate, endDate, "IN");
		return R.ok().put("out", out).put("in", in);
	}

	@Override
	public R reportType(Long uid, String startDate, String endDate) {
		List<Map<String, Object>> out = cbsTBookKeepMapper.listReportType(uid, startDate, endDate, "OUT");
		List<Map<String, Object>> in = cbsTBookKeepMapper.listReportType(uid, startDate, endDate, "IN");
		Map<String, Object> outSum = cbsTBookKeepMapper.getSumByOutIn(uid, startDate, endDate, "OUT");
		Map<String, Object> inSum = cbsTBookKeepMapper.getSumByOutIn(uid, startDate, endDate, "OUT");
		return R.ok().put("out", out).put("in", in).put("outSum", outSum).put("inSum", inSum);
	}

	@Override
	public R removeByEventId(Long[] eventId) {
		int count = cbsTBookKeepMapper.removeByEventId(eventId);
		return CommonUtils.msg(eventId, count);
	}

}
