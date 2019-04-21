package net.chenlin.dp.modules.cbs.dao;

import java.util.List;

import org.mybatis.spring.annotation.MapperScan;

import net.chenlin.dp.common.base.BaseMapper;
import net.chenlin.dp.common.entity.Query;
import net.chenlin.dp.modules.cbs.entity.CbsTCalenEventTypeEntity;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
@MapperScan
public interface CbsTCalenEventTypeMapper extends BaseMapper<CbsTCalenEventTypeEntity> {

	List<CbsTCalenEventTypeEntity> listByUserIds(Query query);

}
