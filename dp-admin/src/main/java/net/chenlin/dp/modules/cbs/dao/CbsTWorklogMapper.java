package net.chenlin.dp.modules.cbs.dao;

import org.mybatis.spring.annotation.MapperScan;

import net.chenlin.dp.common.base.BaseMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTWorklogEntity;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@MapperScan
public interface CbsTWorklogMapper extends BaseMapper<CbsTWorklogEntity> {
	
}
