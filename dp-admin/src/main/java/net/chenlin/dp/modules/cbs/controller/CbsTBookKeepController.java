package net.chenlin.dp.modules.cbs.controller;

import net.chenlin.dp.common.annotation.SysLog;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTBookKeepEntity;
import net.chenlin.dp.modules.cbs.service.CbsTBookKeepService;
import net.chenlin.dp.modules.sys.controller.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

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
	 * 
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public R list(@RequestBody Map<String, Object> params) {

		return cbsTBookKeepService.listCbsTBookKeep(params, getUser());
	}

	/**
	 * 新增
	 * 
	 * @param cbsTBookKeep
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody CbsTBookKeepEntity cbsTBookKeep) {
		cbsTBookKeep.setUid(getUserId());
		cbsTBookKeep.setCreateTime(new Date());
		cbsTBookKeep.setUpdateTime(new Date());
		return cbsTBookKeepService.saveCbsTBookKeep(cbsTBookKeep);
	}

	/**
	 * 根据id查询详情
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return cbsTBookKeepService.getCbsTBookKeepById(id);
	}

	/**
	 * 修改
	 * 
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
	 * 
	 * @param id
	 * @return
	 */
	@SysLog("删除")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return cbsTBookKeepService.batchRemove(id);
	}


	/**
	 *
	 */
	@SysLog("report-balance")
	@RequestMapping("/report-balance")
	public R reportBalance(@RequestBody String startDate, @RequestBody String endDate) {
		return cbsTBookKeepService.reportBalance(startDate, endDate);
	}
}
