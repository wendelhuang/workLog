package net.chenlin.dp.modules.cbs.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.chenlin.dp.common.annotation.SysLog;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTWorklogEntity;
import net.chenlin.dp.modules.cbs.service.CbsTWorklogService;
import net.chenlin.dp.modules.sys.controller.AbstractController;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@RestController
@RequestMapping("/CBS/T/WORKLOG")
public class CbsTWorklogController extends AbstractController {

	@Autowired
	private CbsTWorklogService cbsTWorklogService;

	/**
	 * 列表
	 * 
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public R list(@RequestBody Map<String, Object> params) {
		return cbsTWorklogService.listCbsTWorklog(params, getUser());
	}

	/**
	 * 新增
	 * 
	 * @param cbsTWorklog
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody CbsTWorklogEntity cbsTWorklog) {
		cbsTWorklog.setUid(this.getUserId());
		cbsTWorklog.setCreateTime(new Date());
		cbsTWorklog.setUpdateTime(new Date());
		return cbsTWorklogService.saveCbsTWorklog(cbsTWorklog);
	}

	/**
	 * 根据id查询详情
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return cbsTWorklogService.getCbsTWorklogById(id);
	}

	/**
	 * 修改
	 * 
	 * @param cbsTWorklog
	 * @return
	 */
	@SysLog("修改")
	@RequestMapping("/update")
	public R update(@RequestBody CbsTWorklogEntity cbsTWorklog) {
		return cbsTWorklogService.updateCbsTWorklog(cbsTWorklog);
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
		return cbsTWorklogService.batchRemove(id);
	}

}
