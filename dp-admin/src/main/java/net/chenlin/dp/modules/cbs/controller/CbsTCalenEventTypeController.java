package net.chenlin.dp.modules.cbs.controller;

import java.util.Map;

import net.chenlin.dp.modules.sys.controller.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.chenlin.dp.common.annotation.SysLog;
import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventTypeEntity;
import net.chenlin.dp.modules.cbs.service.CbsTCalenEventTypeService;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@RestController
@RequestMapping("/CBS/T/CALEN/EVENT/TYPE")
public class CbsTCalenEventTypeController extends AbstractController {
	
	@Autowired
	private CbsTCalenEventTypeService cbsTCalenEventTypeService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<CbsTCalenEventTypeEntity> list(@RequestBody Map<String, Object> params) {
		return cbsTCalenEventTypeService.listCbsTCalenEventType(params);
	}
		
	/**
	 * 新增
	 * @param cbsTCalenEventType
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody CbsTCalenEventTypeEntity cbsTCalenEventType) {
		return cbsTCalenEventTypeService.saveCbsTCalenEventType(cbsTCalenEventType);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return cbsTCalenEventTypeService.getCbsTCalenEventTypeById(id);
	}
	
	/**
	 * 修改
	 * @param cbsTCalenEventType
	 * @return
	 */
	@SysLog("修改")
	@RequestMapping("/update")
	public R update(@RequestBody CbsTCalenEventTypeEntity cbsTCalenEventType) {
		return cbsTCalenEventTypeService.updateCbsTCalenEventType(cbsTCalenEventType);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return cbsTCalenEventTypeService.batchRemove(id);
	}
	
}