package net.chenlin.dp.modules.cbs.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.chenlin.dp.common.annotation.SysLog;
import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventEntity;
import net.chenlin.dp.modules.cbs.service.CbsTCalenEventService;
import net.chenlin.dp.modules.sys.controller.AbstractController;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@RestController
@RequestMapping("/CBS/T/CALEN/EVENT")
public class CbsTCalenEventController extends AbstractController {

	@Autowired
	private CbsTCalenEventService cbsTCalenEventService;

	/**
	 * 列表
	 * 
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<CbsTCalenEventEntity> list(@RequestBody Map<String, Object> params) {
		return cbsTCalenEventService.listCbsTCalenEvent(params);
	}

	/**
	 * 新增
	 * 
	 * @param cbsTCalenEvent
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody CbsTCalenEventEntity cbsTCalenEvent) {
		return cbsTCalenEventService.saveCbsTCalenEvent(cbsTCalenEvent);
	}

	/**
	 * 根据id查询详情
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return cbsTCalenEventService.getCbsTCalenEventById(id);
	}

	/**
	 * 修改
	 * 
	 * @param cbsTCalenEvent
	 * @return
	 */
	@SysLog("修改")
	@RequestMapping("/update")
	public R update(@RequestBody CbsTCalenEventEntity cbsTCalenEvent) {
		return cbsTCalenEventService.updateCbsTCalenEvent(cbsTCalenEvent);
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@SysLog("删除")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return cbsTCalenEventService.batchRemove(id);
	}

}
