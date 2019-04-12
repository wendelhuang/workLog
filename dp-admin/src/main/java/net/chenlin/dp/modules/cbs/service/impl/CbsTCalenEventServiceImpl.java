package net.chenlin.dp.modules.cbs.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.common.utils.CommonUtils;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventEntity;
import net.chenlin.dp.modules.cbs.dao.CbsTCalenEventMapper;
import net.chenlin.dp.modules.cbs.service.CbsTCalenEventService;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@Service("cbsTCalenEventService")
public class CbsTCalenEventServiceImpl implements CbsTCalenEventService {

	@Autowired
	private CbsTCalenEventMapper cbsTCalenEventMapper;

    /**
     * 分页查询
     * @param params
     * @return
     */
	@Override
	public Page<CbsTCalenEventEntity> listCbsTCalenEvent(Map<String, Object> params) {
		Query query = new Query(params);
		Page<CbsTCalenEventEntity> page = new Page<>(query);
		cbsTCalenEventMapper.listForPage(page, query);
		return page;
	}

    /**
     * 新增
     * @param cbsTCalenEvent
     * @return
     */
	@Override
	public R saveCbsTCalenEvent(CbsTCalenEventEntity cbsTCalenEvent) {
		int count = cbsTCalenEventMapper.save(cbsTCalenEvent);
		return CommonUtils.msg(count);
	}

    /**
     * 根据id查询
     * @param id
     * @return
     */
	@Override
	public R getCbsTCalenEventById(Long id) {
		CbsTCalenEventEntity cbsTCalenEvent = cbsTCalenEventMapper.getObjectById(id);
		return CommonUtils.msg(cbsTCalenEvent);
	}

    /**
     * 修改
     * @param cbsTCalenEvent
     * @return
     */
	@Override
	public R updateCbsTCalenEvent(CbsTCalenEventEntity cbsTCalenEvent) {
		int count = cbsTCalenEventMapper.update(cbsTCalenEvent);
		return CommonUtils.msg(count);
	}

    /**
     * 列表
     * @param id
     * @return
     */
	@Override
	public R batchRemove(Long[] id) {
		int count = cbsTCalenEventMapper.batchRemove(id);
		return CommonUtils.msg(id, count);
	}

}
