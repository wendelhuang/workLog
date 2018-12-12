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
import net.chenlin.dp.modules.cbs.entity.CbsTCalenDateEntity;
import net.chenlin.dp.modules.cbs.service.CbsTCalenDateService;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@RestController
@RequestMapping("/CBS/T/CALEN/DATE")
public class CbsTCalenDateController extends AbstractController {
	
	@Autowired
	private CbsTCalenDateService cbsTCalenDateService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<CbsTCalenDateEntity> list(@RequestBody Map<String, Object> params) {
		return cbsTCalenDateService.listCbsTCalenDate(params);
	}
		
	/**
	 * 新增
	 * @param cbsTCalenDate
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody CbsTCalenDateEntity cbsTCalenDate) {
		return cbsTCalenDateService.saveCbsTCalenDate(cbsTCalenDate);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return cbsTCalenDateService.getCbsTCalenDateById(id);
	}
	
	/**
	 * 修改
	 * @param cbsTCalenDate
	 * @return
	 */
	@SysLog("修改")
	@RequestMapping("/update")
	public R update(@RequestBody CbsTCalenDateEntity cbsTCalenDate) {
		return cbsTCalenDateService.updateCbsTCalenDate(cbsTCalenDate);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return cbsTCalenDateService.batchRemove(id);
	}
	
}
