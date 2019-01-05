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
import net.chenlin.dp.modules.cbs.entity.CbsTBookKeepEntity;
import net.chenlin.dp.modules.cbs.service.CbsTBookKeepService;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@RestController
@RequestMapping("/CBS/T/BOOK/KEEP")
public class CbsTBookKeepController extends AbstractController {
	
	@Autowired
	private CbsTBookKeepService cbsTBookKeepService;
	
	/**
	 * 列表
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<CbsTBookKeepEntity> list(@RequestBody Map<String, Object> params) {
		return cbsTBookKeepService.listCbsTBookKeep(params);
	}
		
	/**
	 * 新增
	 * @param cbsTBookKeep
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody CbsTBookKeepEntity cbsTBookKeep) {
		return cbsTBookKeepService.saveCbsTBookKeep(cbsTBookKeep);
	}
	
	/**
	 * 根据id查询详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return cbsTBookKeepService.getCbsTBookKeepById(id);
	}
	
	/**
	 * 修改
	 * @param cbsTBookKeep
	 * @return
	 */
	@SysLog("修改")
	@RequestMapping("/update")
	public R update(@RequestBody CbsTBookKeepEntity cbsTBookKeep) {
		return cbsTBookKeepService.updateCbsTBookKeep(cbsTBookKeep);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@SysLog("删除")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return cbsTBookKeepService.batchRemove(id);
	}
	
}
