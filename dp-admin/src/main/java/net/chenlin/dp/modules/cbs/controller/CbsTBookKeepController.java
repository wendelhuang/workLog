package net.chenlin.dp.modules.cbs.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.chenlin.dp.common.annotation.SysLog;
import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTBookKeepEntity;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventEntity;
import net.chenlin.dp.modules.cbs.entity.CbsVBookKeepEntity;
import net.chenlin.dp.modules.cbs.service.CbsTBookKeepService;
import net.chenlin.dp.modules.cbs.service.CbsTCalenEventService;
import net.chenlin.dp.modules.sys.controller.AbstractController;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@RestController
@RequestMapping("/CBS/T/BOOK/KEEP")
public class CbsTBookKeepController extends AbstractController {

	@Autowired
	private CbsTBookKeepService cbsTBookKeepService;

	@Autowired
	private CbsTCalenEventService cbsTCalenEventService;

	/**
	 * 列表
	 * 
	 * @param params
	 * @return
	 */
	@RequestMapping("/listPage")
	public Page<CbsTBookKeepEntity> listPage(@RequestBody Map<String, Object> params) {
		return cbsTBookKeepService.listPageCbsTBookKeep(params);
	}

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
	public R save(@RequestBody CbsVBookKeepEntity cbsVBookKeep) {
		CbsTCalenEventEntity cbsTCalenEvent = new CbsTCalenEventEntity();
		cbsTCalenEvent.setUid(getUserId());
		cbsTCalenEvent.setTitle(cbsVBookKeep.getRemark());
		cbsTCalenEvent.setStart(cbsVBookKeep.getStart());
		cbsTCalenEvent.setEventType(cbsVBookKeep.getEventType());
		cbsTCalenEventService.saveCbsTCalenEvent(cbsTCalenEvent);

		CbsTBookKeepEntity cbsTBookKeep = new CbsTBookKeepEntity();
		cbsTBookKeep.setUid(getUserId());
		cbsTBookKeep.setEventId(cbsTCalenEvent.getId());
		cbsTBookKeep.setKeepTime(cbsVBookKeep.getStart());
		cbsTBookKeep.setMoney(cbsVBookKeep.getMoney());
		cbsTBookKeep.setTypeId(cbsVBookKeep.getTypeId());
		cbsTBookKeep.setOutIn(cbsVBookKeep.getOutIn());
		cbsTBookKeep.setRemark(cbsVBookKeep.getRemark());
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
	@SysLog("reportBalance")
	@RequestMapping("/reportBalance")
	public R reportBalance(@RequestBody Map<String, Object> params) {
		return cbsTBookKeepService.reportBalance(getUserId(), params.get("startDate").toString(),
				params.get("endDate").toString());
	}

	@SysLog("reportStream")
	@RequestMapping("/reportStream")
	public R reportStream(@RequestBody Map<String, Object> params) {
		return cbsTBookKeepService.reportStream(getUserId(), params.get("startDate").toString(),
				params.get("endDate").toString());
	}

	@SysLog("reportType")
	@RequestMapping("/reportType")
	public R reportType(@RequestBody Map<String, Object> params) {
		return cbsTBookKeepService.reportType(getUserId(), params.get("startDate").toString(),
				params.get("endDate").toString());
	}
}
