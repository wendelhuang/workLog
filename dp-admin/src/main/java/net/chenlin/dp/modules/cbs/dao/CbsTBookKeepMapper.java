package net.chenlin.dp.modules.cbs.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

import net.chenlin.dp.common.base.BaseMapper;
import net.chenlin.dp.common.entity.Page;
import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.modules.cbs.entity.CbsTBookKeepEntity;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@MapperScan
public interface CbsTBookKeepMapper extends BaseMapper<CbsTBookKeepEntity> {
	List<CbsTBookKeepEntity> listUserForPage(Page<CbsTBookKeepEntity> page, Query query);

	List<CbsTBookKeepEntity> listUser(Query query);

	List<Map<String, Object>> listReportBalance(@Param("uid") Long uid, @Param("startDate") String startDate,
			@Param("endDate") String endDate, @Param("outIn") String outIn);
}
