package net.chenlin.dp.modules.cbs.entity;

import java.io.Serializable;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
public class CbsTCalenDateEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 日历日期ID
	 */
	private Long id;

	/**
	 * 日历ID
	 */
	private Integer calenId;

	/**
	 * 8位日期
	 */
	private String dateFmt8;

	/**
	 * 10位日期
	 */
	private String dateFmt10;

	/**
	 * 年
	 */
	private Integer dateYear;

	/**
	 * 月
	 */
	private Integer dateMonth;

	/**
	 * 日
	 */
	private Integer dateDay;

	/**
	 * 星期
	 */
	private Integer dateWeekday;

	/**
	 * 前一自然日
	 */
	private String datePreFmt8;

	/**
	 * 前一自然日
	 */
	private String datePreFmt10;

	/**
	 * 后一自然日
	 */
	private String dateNextFmt8;

	/**
	 * 后一自然日
	 */
	private String dateNextFmt10;

	/**
	 * 前一工作日
	 */
	private String datePreworkFmt8;

	/**
	 * 前一自然日
	 */
	private String datePreworkFmt10;

	/**
	 * 后一自然日
	 */
	private String dateNextworkFmt8;

	/**
	 * 后一自然日
	 */
	private String dateNextworkFmt10;

	public CbsTCalenDateEntity() {
		super();
	}

	/**
	 * setter for id
	 * 
	 * @param id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * getter for id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * setter for calenId
	 * 
	 * @param calenId
	 */
	public void setCalenId(Integer calenId) {
		this.calenId = calenId;
	}

	/**
	 * getter for calenId
	 */
	public Integer getCalenId() {
		return calenId;
	}

	/**
	 * setter for dateFmt8
	 * 
	 * @param dateFmt8
	 */
	public void setDateFmt8(String dateFmt8) {
		this.dateFmt8 = dateFmt8;
	}

	/**
	 * getter for dateFmt8
	 */
	public String getDateFmt8() {
		return dateFmt8;
	}

	/**
	 * setter for dateFmt10
	 * 
	 * @param dateFmt10
	 */
	public void setDateFmt10(String dateFmt10) {
		this.dateFmt10 = dateFmt10;
	}

	/**
	 * getter for dateFmt10
	 */
	public String getDateFmt10() {
		return dateFmt10;
	}

	/**
	 * setter for dateYear
	 * 
	 * @param dateYear
	 */
	public void setDateYear(Integer dateYear) {
		this.dateYear = dateYear;
	}

	/**
	 * getter for dateYear
	 */
	public Integer getDateYear() {
		return dateYear;
	}

	/**
	 * setter for dateMonth
	 * 
	 * @param dateMonth
	 */
	public void setDateMonth(Integer dateMonth) {
		this.dateMonth = dateMonth;
	}

	/**
	 * getter for dateMonth
	 */
	public Integer getDateMonth() {
		return dateMonth;
	}

	/**
	 * setter for dateDay
	 * 
	 * @param dateDay
	 */
	public void setDateDay(Integer dateDay) {
		this.dateDay = dateDay;
	}

	/**
	 * getter for dateDay
	 */
	public Integer getDateDay() {
		return dateDay;
	}

	/**
	 * setter for dateWeekday
	 * 
	 * @param dateWeekday
	 */
	public void setDateWeekday(Integer dateWeekday) {
		this.dateWeekday = dateWeekday;
	}

	/**
	 * getter for dateWeekday
	 */
	public Integer getDateWeekday() {
		return dateWeekday;
	}

	/**
	 * setter for datePreFmt8
	 * 
	 * @param datePreFmt8
	 */
	public void setDatePreFmt8(String datePreFmt8) {
		this.datePreFmt8 = datePreFmt8;
	}

	/**
	 * getter for datePreFmt8
	 */
	public String getDatePreFmt8() {
		return datePreFmt8;
	}

	/**
	 * setter for datePreFmt10
	 * 
	 * @param datePreFmt10
	 */
	public void setDatePreFmt10(String datePreFmt10) {
		this.datePreFmt10 = datePreFmt10;
	}

	/**
	 * getter for datePreFmt10
	 */
	public String getDatePreFmt10() {
		return datePreFmt10;
	}

	/**
	 * setter for dateNextFmt8
	 * 
	 * @param dateNextFmt8
	 */
	public void setDateNextFmt8(String dateNextFmt8) {
		this.dateNextFmt8 = dateNextFmt8;
	}

	/**
	 * getter for dateNextFmt8
	 */
	public String getDateNextFmt8() {
		return dateNextFmt8;
	}

	/**
	 * setter for dateNextFmt10
	 * 
	 * @param dateNextFmt10
	 */
	public void setDateNextFmt10(String dateNextFmt10) {
		this.dateNextFmt10 = dateNextFmt10;
	}

	/**
	 * getter for dateNextFmt10
	 */
	public String getDateNextFmt10() {
		return dateNextFmt10;
	}

	/**
	 * setter for datePreworkFmt8
	 * 
	 * @param datePreworkFmt8
	 */
	public void setDatePreworkFmt8(String datePreworkFmt8) {
		this.datePreworkFmt8 = datePreworkFmt8;
	}

	/**
	 * getter for datePreworkFmt8
	 */
	public String getDatePreworkFmt8() {
		return datePreworkFmt8;
	}

	/**
	 * setter for datePreworkFmt10
	 * 
	 * @param datePreworkFmt10
	 */
	public void setDatePreworkFmt10(String datePreworkFmt10) {
		this.datePreworkFmt10 = datePreworkFmt10;
	}

	/**
	 * getter for datePreworkFmt10
	 */
	public String getDatePreworkFmt10() {
		return datePreworkFmt10;
	}

	/**
	 * setter for dateNextworkFmt8
	 * 
	 * @param dateNextworkFmt8
	 */
	public void setDateNextworkFmt8(String dateNextworkFmt8) {
		this.dateNextworkFmt8 = dateNextworkFmt8;
	}

	/**
	 * getter for dateNextworkFmt8
	 */
	public String getDateNextworkFmt8() {
		return dateNextworkFmt8;
	}

	/**
	 * setter for dateNextworkFmt10
	 * 
	 * @param dateNextworkFmt10
	 */
	public void setDateNextworkFmt10(String dateNextworkFmt10) {
		this.dateNextworkFmt10 = dateNextworkFmt10;
	}

	/**
	 * getter for dateNextworkFmt10
	 */
	public String getDateNextworkFmt10() {
		return dateNextworkFmt10;
	}

}
