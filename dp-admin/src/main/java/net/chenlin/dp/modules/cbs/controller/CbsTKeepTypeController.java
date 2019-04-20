package net.chenlin.dp.modules.cbs.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.chenlin.dp.common.annotation.SysLog;
import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.R;
import net.chenlin.dp.modules.cbs.entity.CbsTKeepTypeEntity;
import net.chenlin.dp.modules.cbs.service.CbsTKeepTypeService;
import net.chenlin.dp.modules.sys.controller.AbstractController;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@RestController
@RequestMapping("/CBS/T/KEEP/TYPE")
public class CbsTKeepTypeController extends AbstractController {

	@Autowired
	private CbsTKeepTypeService cbsTKeepTypeService;

	/**
	 * 列表
	 * 
	 * @param params
	 * @return
	 */
	@RequestMapping("/list")
	public Page<CbsTKeepTypeEntity> list(@RequestBody Map<String, Object> params) {
		return cbsTKeepTypeService.listCbsTKeepType(params, getUser());
	}

	/**
	 * 不分页列表
	 * 
	 * @param params
	 *            RequestBody要求使用POST方式提交请求，ajax无data参数，会报错
	 *            ajax传一个空的对象，不抱错，与HTTP POST请求的Request Body对应
	 * @return
	 */
	@RequestMapping("/listAll")
	public R listAll(@RequestBody Map<String, Object> params) {
		return cbsTKeepTypeService.listAllCbsTKeepType(params, getUser());
	}

	/**
	 * 新增
	 * 
	 * @param cbsTKeepType
	 * @return
	 */
	@SysLog("新增")
	@RequestMapping("/save")
	public R save(@RequestBody CbsTKeepTypeEntity cbsTKeepType) {
		cbsTKeepType.setUid(getUserId().intValue());
		return cbsTKeepTypeService.saveCbsTKeepType(cbsTKeepType);
	}

	/**
	 * 根据id查询详情
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/info")
	public R getById(@RequestBody Long id) {
		return cbsTKeepTypeService.getCbsTKeepTypeById(id);
	}

	/**
	 * 修改
	 * 
	 * @param cbsTKeepType
	 * @return
	 */
	@SysLog("修改")
	@RequestMapping("/update")
	public R update(@RequestBody CbsTKeepTypeEntity cbsTKeepType) {
		return cbsTKeepTypeService.updateCbsTKeepType(cbsTKeepType);
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
		return cbsTKeepTypeService.batchRemove(id);
	}

}
