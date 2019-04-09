package net.chenlin.dp.modules.cbs.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

import net.chenlin.dp.common.base.BaseMapper;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventEntity;

/**
 * 
 * @author zcl<yczclcn@163.com>
 */
@MapperScan
public interface CbsTCalenEventMapper extends BaseMapper<CbsTCalenEventEntity> {

	List<CbsTCalenEventEntity> listCbsTCalenEvent(@Param("eventType") String eventType, @Param("uid") Long uid);

}
