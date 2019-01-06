package net.chenlin.dp.modules.cbs.dao;

import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.Query;
import org.mybatis.spring.annotation.MapperScan;

import net.chenlin.dp.common.base.BaseMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTBookKeepEntity;

import java.util.List;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@MapperScan
public interface CbsTBookKeepMapper extends BaseMapper<CbsTBookKeepEntity> {
	List<CbsTBookKeepEntity> listUserForPage(Page<CbsTBookKeepEntity> page, Query query);
}
