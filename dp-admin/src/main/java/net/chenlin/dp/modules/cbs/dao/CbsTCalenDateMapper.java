package net.chenlin.dp.modules.cbs.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

import net.chenlin.dp.common.base.BaseMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenDateEntity;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@MapperScan
public interface CbsTCalenDateMapper extends BaseMapper<CbsTCalenDateEntity> {
	List<Map<String, Object>> selectMonthByDateRange(@Param("startDate") String startDate,
			@Param("endDate") String endDate);
}
