package net.chenlin.dp.modules.cbs.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.chenlin.dp.common.annotation.SysLog;
import net.chenlin.dp.common.constant.SystemConstant;
import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventTypeEntity;
import net.chenlin.dp.modules.cbs.service.CbsTCalenEventTypeService;
import net.chenlin.dp.modules.sys.controller.AbstractController;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@RestController
@RequestMapping("/CBS/T/CALEN/EVENT/TYPE")
public class CbsTCalenEventTypeController extends AbstractController {

	@Autowired
	private CbsTCalenEventTypeService cbsTCalenEventTypeService;

	/**
	 * 列表
	 * 
	 * @param params
	 * @return
	 */
	@RequestMapping("/pageList")
	public Page<CbsTCalenEventTypeEntity> pageList(@RequestBody Map<String, Object> params) {
		List<Long> userIds = Arrays.asList(getUserId(), SystemConstant.SUPER_ADMIN);
		params.put("userIds", userIds);
		return cbsTCalenEventTypeService.pageListCbsTCalenEventType(params);
	}

	/**
	 * 列表, 不分页
	 * 
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public R list(@RequestBody(required = false) Map<String, Object> params) {
		List<Long> userIds = Arrays.asList(getUserId(), SystemConstant.SUPER_ADMIN);
		if (params == null) {
			params = new HashMap<String, Object>();
		}
		params.put("userIds", userIds);
		return cbsTCalenEventTypeService.listCbsTCalenEventType(params);
	}

	/**
	 * 新增
	 * 
	 * @param cbsTCalenEventType
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody CbsTCalenEventTypeEntity cbsTCalenEventType) {
		cbsTCalenEventType.setUid(getUserId());
		return cbsTCalenEventTypeService.saveCbsTCalenEventType(cbsTCalenEventType);
	}

	/**
	 * 根据id查询详情
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return cbsTCalenEventTypeService.getCbsTCalenEventTypeById(id);
	}

	/**
	 * 修改
	 * 
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
	 * 
	 * @param id
	 * @return
	 */
	@SysLog("删除")
	@RequestMapping("/remove")
	public R batchRemove(@RequestBody Long[] id) {
		return cbsTCalenEventTypeService.batchRemove(id);
	}

}
