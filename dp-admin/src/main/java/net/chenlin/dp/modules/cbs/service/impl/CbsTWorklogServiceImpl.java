package net.chenlin.dp.modules.cbs.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.common.utils.CommonUtils;
import net.chenlin.dp.modules.cbs.dao.CbsTWorklogMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenDateEntity;
import net.chenlin.dp.modules.cbs.entity.CbsTWorklogEntity;
import net.chenlin.dp.modules.cbs.service.CbsTCalenDateService;
import net.chenlin.dp.modules.cbs.service.CbsTWorklogService;
import net.chenlin.dp.modules.sys.entity.SysUserEntity;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@Service("cbsTWorklogService")
public class CbsTWorklogServiceImpl implements CbsTWorklogService {

	@Autowired
	private CbsTWorklogMapper cbsTWorklogMapper;

	@Autowired
	private CbsTCalenDateService cbsTCalenDateService;

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	@Override
	public R listCbsTWorklog(Map<String, Object> params, SysUserEntity user) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar currentCalen = Calendar.getInstance();
		if (params.get("currentDate") != null) {
			try {
				currentCalen.setTime(simpleDateFormat.parse(params.get("currentDate").toString()));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		if (params.get("direction") != null) {
			if ("backward".equals(params.get("direction").toString())) {
				currentCalen.add(Calendar.MONTH, -1);
			} else if ("foreward".equals(params.get("direction").toString())) {
				currentCalen.add(Calendar.MONTH, 1);
			}
		}
		List<CbsTCalenDateEntity> calenDateEntities = cbsTCalenDateService
				.listByYearAndMonth(currentCalen.get(Calendar.YEAR), currentCalen.get(Calendar.MONTH) + 1);
		List<String> dates = calenDateEntities.stream().map(d -> d.getDateFmt10()).collect(Collectors.toList());
		List<CbsTWorklogEntity> worklogEntities = listByDate(user, dates);
		R r = R.ok();
		r.put("calenDate", calenDateEntities);
		r.put("workLog", worklogEntities);
		r.put("currentDate", simpleDateFormat.format(currentCalen.getTime()));
		return r;
	}

	List<CbsTWorklogEntity> listByDate(SysUserEntity user, List<String> dates) {
		Query query = new Query();
		query.put("user", user.getUserId());
		query.put("dates", dates);
		return cbsTWorklogMapper.list(query);
	}

	/**
	 * 新增
	 * 
	 * @param cbsTWorklog
	 * @return
	 */
	@Override
	public R saveCbsTWorklog(CbsTWorklogEntity cbsTWorklog) {
		int count = cbsTWorklogMapper.save(cbsTWorklog);
		return CommonUtils.msg(count);
	}

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public R getCbsTWorklogById(Long id) {
		CbsTWorklogEntity cbsTWorklog = cbsTWorklogMapper.getObjectById(id);
		return CommonUtils.msg(cbsTWorklog);
	}

	/**
	 * 修改
	 * 
	 * @param cbsTWorklog
	 * @return
	 */
	@Override
	public R updateCbsTWorklog(CbsTWorklogEntity cbsTWorklog) {
		int count = cbsTWorklogMapper.update(cbsTWorklog);
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
		int count = cbsTWorklogMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

}
