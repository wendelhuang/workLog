package net.chenlin.dp.modules.cbs.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.common.utils.CommonUtils;
import net.chenlin.dp.modules.cbs.dao.CbsTCalenDateMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenDateEntity;
import net.chenlin.dp.modules.cbs.service.CbsTCalenDateService;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@Service("cbsTCalenDateService")
public class CbsTCalenDateServiceImpl implements CbsTCalenDateService {

	@Autowired
	private CbsTCalenDateMapper cbsTCalenDateMapper;

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	@Override
	public Page<CbsTCalenDateEntity> listCbsTCalenDate(Map<String, Object> params) {
		Query query = new Query(params);
		Page<CbsTCalenDateEntity> page = new Page<>(query);
		cbsTCalenDateMapper.listForPage(page, query);
		return page;
	}

	/**
	 * 新增
	 * 
	 * @param cbsTCalenDate
	 * @return
	 */
	@Override
	public R saveCbsTCalenDate(CbsTCalenDateEntity cbsTCalenDate) {
		int count = cbsTCalenDateMapper.save(cbsTCalenDate);
		return CommonUtils.msg(count);
	}

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public R getCbsTCalenDateById(Long id) {
		CbsTCalenDateEntity cbsTCalenDate = cbsTCalenDateMapper.getObjectById(id);
		return CommonUtils.msg(cbsTCalenDate);
	}

	/**
	 * 修改
	 * 
	 * @param cbsTCalenDate
	 * @return
	 */
	@Override
	public R updateCbsTCalenDate(CbsTCalenDateEntity cbsTCalenDate) {
		int count = cbsTCalenDateMapper.update(cbsTCalenDate);
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
		int count = cbsTCalenDateMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

	@Override
	public List<CbsTCalenDateEntity> listByYearAndMonth(int year, int month) {
		Query query = new Query();
		query.put("dateYear", year);
		query.put("dateMonth", month);
		return cbsTCalenDateMapper.list(query);
	}

}
