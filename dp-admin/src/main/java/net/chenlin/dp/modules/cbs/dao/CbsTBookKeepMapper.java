package net.chenlin.dp.modules.cbs.dao;

import net.chenlin.dp.common.base.BaseMapper;
import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.modules.cbs.entity.CbsTBookKeepEntity;
import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@MapperScan
public interface CbsTBookKeepMapper extends BaseMapper<CbsTBookKeepEntity> {
	List<CbsTBookKeepEntity> listUserForPage(Page<CbsTBookKeepEntity> page, Query query);
	Map<String, Object> listReportBalance(@Param("startDate") String startDate, @Param("endDate") String endDate, @Param("outIn") String outIn);
}
