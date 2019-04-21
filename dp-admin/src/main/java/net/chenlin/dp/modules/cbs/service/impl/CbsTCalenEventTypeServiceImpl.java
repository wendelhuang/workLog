package net.chenlin.dp.modules.cbs.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.common.utils.CommonUtils;
import net.chenlin.dp.modules.cbs.dao.CbsTCalenEventTypeMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventTypeEntity;
import net.chenlin.dp.modules.cbs.service.CbsTCalenEventTypeService;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@Service("cbsTCalenEventTypeService")
public class CbsTCalenEventTypeServiceImpl implements CbsTCalenEventTypeService {

	@Autowired
	private CbsTCalenEventTypeMapper cbsTCalenEventTypeMapper;

	/**
	 * 分页查询
	 * 
	 * @param params
	 * @return
	 */
	@Override
	public Page<CbsTCalenEventTypeEntity> pageListCbsTCalenEventType(Map<String, Object> params) {
		Query query = new Query(params);
		Page<CbsTCalenEventTypeEntity> page = new Page<>(query);
		cbsTCalenEventTypeMapper.listForPage(page, query);
		return page;
	}

	@Override
	public R listCbsTCalenEventType(Map<String, Object> params) {
		Query query = new Query(params);
		List<CbsTCalenEventTypeEntity> list = cbsTCalenEventTypeMapper.list(query);
		return CommonUtils.msg(list);
	}

	/**
	 * 新增
	 * 
	 * @param cbsTCalenEventType
	 * @return
	 */
	@Override
	public R saveCbsTCalenEventType(CbsTCalenEventTypeEntity cbsTCalenEventType) {
		int count = cbsTCalenEventTypeMapper.save(cbsTCalenEventType);
		return CommonUtils.msg(count);
	}

	/**
	 * 根据id查询
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public R getCbsTCalenEventTypeById(Long id) {
		CbsTCalenEventTypeEntity cbsTCalenEventType = cbsTCalenEventTypeMapper.getObjectById(id);
		return CommonUtils.msg(cbsTCalenEventType);
	}

	/**
	 * 修改
	 * 
	 * @param cbsTCalenEventType
	 * @return
	 */
	@Override
	public R updateCbsTCalenEventType(CbsTCalenEventTypeEntity cbsTCalenEventType) {
		int count = cbsTCalenEventTypeMapper.update(cbsTCalenEventType);
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
		int count = cbsTCalenEventTypeMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

}
