package net.chenlin.dp.modules.cbs.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.common.utils.CommonUtils;
import net.chenlin.dp.modules.cbs.dao.CbsVBookKeepMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTBookKeepEntity;
import net.chenlin.dp.modules.cbs.entity.CbsTKeepTypeEntity;
import net.chenlin.dp.modules.cbs.entity.CbsVBookKeepEntity;
import net.chenlin.dp.modules.cbs.service.CbsTCalenDateService;
import net.chenlin.dp.modules.cbs.service.CbsVBookKeepService;
import net.chenlin.dp.modules.sys.entity.SysUserEntity;

/**
 * VIEW
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@Service("cbsVBookKeepService")
public class CbsVBookKeepServiceImpl implements CbsVBookKeepService {

	@Autowired
	private CbsVBookKeepMapper cbsVBookKeepMapper;

	@Autowired
	private CbsTKeepTypeServiceImpl cbsTKeepTypeServiceImpl;

	@Autowired
	private CbsTCalenDateService cbsTCalenDateService;

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	@Override
	public Page<CbsVBookKeepEntity> listCbsVBookKeep(Map<String, Object> params) {
		Query query = new Query(params);
		Page<CbsVBookKeepEntity> page = new Page<>(query);
		cbsVBookKeepMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R listCbsVBookKeep(Map<String, Object> params, SysUserEntity sysUserEntity) {
		params.put("userId", sysUserEntity.getUserId());
		R r = R.ok();
		Query query = new Query(params);
		if (params.get("pageSize") != null) {
			Page<CbsTBookKeepEntity> page = new Page<>(query);
			cbsVBookKeepMapper.listUserForPage(page, query);
			r.put("cbsVBookKeep", page);
		} else {
			List<CbsTBookKeepEntity> list = cbsVBookKeepMapper.listUser(query);
			r.put("cbsVBookKeep", list);
		}

		List<CbsTKeepTypeEntity> cbsTKeepTypeEntities = cbsTKeepTypeServiceImpl
				.listAllCbsTKeepTypeByUser(sysUserEntity);

		r.put("cbsTKeepType", cbsTKeepTypeEntities);
		return r;
	}

	/**
	 * 新增
	 * 
	 * @param cbsVBookKeep
	 * @return
	 */
	@Override
	public R saveCbsVBookKeep(CbsVBookKeepEntity cbsVBookKeep) {
		int count = cbsVBookKeepMapper.save(cbsVBookKeep);
		return CommonUtils.msg(count);
	}

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public R getCbsVBookKeepById(Long id) {
		CbsVBookKeepEntity cbsVBookKeep = cbsVBookKeepMapper.getObjectById(id);
		return CommonUtils.msg(cbsVBookKeep);
	}

	/**
	 * 修改
	 * 
	 * @param cbsVBookKeep
	 * @return
	 */
	@Override
	public R updateCbsVBookKeep(CbsVBookKeepEntity cbsVBookKeep) {
		int count = cbsVBookKeepMapper.update(cbsVBookKeep);
		return CommonUtils.msg(count);
	}

	@Override
	public R updateCbsVBookKeepByEventId(CbsVBookKeepEntity cbsVBookKeep) {
		int count = cbsVBookKeepMapper.updateByEventId(cbsVBookKeep);
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
		int count = cbsVBookKeepMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public R reportBalance(Long uid, String startDate, String endDate) {
		List<Map<String, Object>> out = cbsVBookKeepMapper.listReportBalance(uid, startDate, endDate, "OUT");
		List<Map<String, Object>> in = cbsVBookKeepMapper.listReportBalance(uid, startDate, endDate, "IN");
		return R.ok().put("out", out).put("in", in);
	}

	@Override
	public R reportStream(Long uid, String startDate, String endDate) {
		List<Map<String, Object>> out = cbsVBookKeepMapper.listReportStream(uid, startDate, endDate, "OUT");
		List<Map<String, Object>> in = cbsVBookKeepMapper.listReportStream(uid, startDate, endDate, "IN");
		return R.ok().put("out", out).put("in", in);
	}

	@Override
	public R reportMonthly(Long uid, String startDate, String endDate) {
		List<Map<String, Object>> out = cbsVBookKeepMapper.listReportMonthly(uid, startDate, endDate, "OUT");
		List<Map<String, Object>> in = cbsVBookKeepMapper.listReportMonthly(uid, startDate, endDate, "IN");

		List<String> types = Stream.of(out, in).map(m -> m.stream()).flatMap(m -> m)
				.map(m -> m.get("TYPE_NAME").toString()).distinct().sorted().collect(Collectors.toList());

		List<Map<String, Object>> monthMap = cbsTCalenDateService.selectMonthByDateRange(startDate, endDate);
		List<String> months = monthMap.stream().map(m -> m.get("TERM").toString()).collect(Collectors.toList());
		Map<String, Integer> monthIndex = IntStream.range(0, months.size()).boxed()
				.collect(Collectors.toMap(months::get, i -> i));

		/*
		 * Stream.of(out.stream(), in.stream()).flatMap(m -> m.getC);
		 * List<String> types = Stream.of(out.stream(), in.stream()).map(m ->
		 * m.get("TYPE_NAME").toString())
		 * .distinct().collect(Collectors.toList());
		 */
		return R.ok().put("out", out).put("in", in).put("types", types).put("months", months).put("monthIndex",
				monthIndex);
	}

	@Override
	public R reportType(Long uid, String startDate, String endDate) {
		List<Map<String, Object>> out = cbsVBookKeepMapper.listReportType(uid, startDate, endDate, "OUT");
		List<Map<String, Object>> in = cbsVBookKeepMapper.listReportType(uid, startDate, endDate, "IN");
		Map<String, Object> outSum = cbsVBookKeepMapper.getSumByOutIn(uid, startDate, endDate, "OUT");
		Map<String, Object> inSum = cbsVBookKeepMapper.getSumByOutIn(uid, startDate, endDate, "OUT");
		return R.ok().put("out", out).put("in", in).put("outSum", outSum).put("inSum", inSum);
	}

}
