package net.chenlin.dp.modules.cbs.service;

import net.chenlin.dp.modules.cbs.entity.CbsTCalenDateEntity;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:applicationContext.xml",
		"classpath*:applicationContext-jdbc.xml"})
public class CbsTCalenDateServiceTest {

	@Autowired
	CbsTCalenDateService cbsTCalenDateService;

	@Test
	public void init() {
		String startDate = "2019-03-02";
		String endDate = "2019-12-31";
		SimpleDateFormat simpleDateFormat8 = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat simpleDateFormat10 = new SimpleDateFormat("yyyy-MM-dd");
		Calendar startCalendar = Calendar.getInstance();
		Calendar tempCalendar = Calendar.getInstance();
		Calendar endCalendar = Calendar.getInstance();
		try {
			startCalendar.setTime(simpleDateFormat10.parse(startDate));
			tempCalendar.setTime(simpleDateFormat10.parse(startDate));
			endCalendar.setTime(simpleDateFormat10.parse(endDate));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		for(String i = simpleDateFormat10.format(tempCalendar.getTime()) ; i.compareTo(simpleDateFormat10.format(endCalendar.getTime())) <= 0; i = simpleDateFormat10.format(tempCalendar.getTime())) {
			System.out.println(String.format("DATE_FMT_8: %s, DATE_FMT_10: %s, YEAD: %d, MONTH: %d, DAY: %d, WEEKDAY: %d",
					simpleDateFormat8.format(tempCalendar.getTime()), simpleDateFormat10.format(tempCalendar.getTime()),
					tempCalendar.get(Calendar.YEAR), tempCalendar.get(Calendar.MONTH) + 1, tempCalendar.get(Calendar.DATE),
					tempCalendar.get(Calendar.DAY_OF_WEEK) == 1 ? 7 : tempCalendar.get(Calendar.DAY_OF_WEEK) - 1
					//(()-1)%7 == 6 ? 6 : ((tempCalendar.get(Calendar.DAY_OF_WEEK))-1)%7 + 1
			));
			CbsTCalenDateEntity cbsTCalenDateEntity = new CbsTCalenDateEntity();
			cbsTCalenDateEntity.setCalenId(1);
			cbsTCalenDateEntity.setDateFmt8(simpleDateFormat8.format(tempCalendar.getTime()));
			cbsTCalenDateEntity.setDateFmt10(simpleDateFormat10.format(tempCalendar.getTime()));
			cbsTCalenDateEntity.setDateYear(tempCalendar.get(Calendar.YEAR));
			cbsTCalenDateEntity.setDateMonth(tempCalendar.get(Calendar.MONTH) + 1);
			cbsTCalenDateEntity.setDateDay(tempCalendar.get(Calendar.DATE));
			cbsTCalenDateEntity.setDateWeekday(tempCalendar.get(Calendar.DAY_OF_WEEK) == 1 ? 7 : tempCalendar.get(Calendar.DAY_OF_WEEK) - 1);
			//System.out.println(cbsTCalenDateEntity.toString());
			cbsTCalenDateService.saveCbsTCalenDate(cbsTCalenDateEntity);

			tempCalendar.add(Calendar.DATE, 1);
		}
	}

}
