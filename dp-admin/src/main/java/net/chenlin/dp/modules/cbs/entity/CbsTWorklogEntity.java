package net.chenlin.dp.modules.cbs.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
public class CbsTWorklogEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 工作日记ID
	 */
	private Long id;

	/**
	 * 用户ID
	 */
	private Long uid;

	/**
	 * 工作日期
	 */
	private String workDate;

	/**
	 * 星期
	 */
	private String workDayOfWeek;

	/**
	 * 上午内容
	 */
	private String morning;

	/**
	 * 下午内容
	 */
	private String afternoon;

	/**
	 * 晚上内容
	 */
	private String evening;

	/**
	 * 创建时间
	 */
	private Date createTime;

	/**
	 * 更新时间
	 */
	private Date updateTime;

	public CbsTWorklogEntity() {
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
	 * setter for uid
	 * 
	 * @param uid
	 */
	public void setUid(Long uid) {
		this.uid = uid;
	}

	/**
	 * getter for uid
	 */
	public Long getUid() {
		return uid;
	}

	/**
	 * setter for workDate
	 * 
	 * @param workDate
	 */
	public void setWorkDate(String workDate) {
		this.workDate = workDate;
	}

	/**
	 * getter for workDate
	 */
	public String getWorkDate() {
		return workDate;
	}

	/**
	 * setter for workDayOfWeek
	 * 
	 * @param workDayOfWeek
	 */
	public void setWorkDayOfWeek(String workDayOfWeek) {
		this.workDayOfWeek = workDayOfWeek;
	}

	/**
	 * getter for workDayOfWeek
	 */
	public String getWorkDayOfWeek() {
		return workDayOfWeek;
	}

	/**
	 * setter for morning
	 * 
	 * @param morning
	 */
	public void setMorning(String morning) {
		this.morning = morning;
	}

	/**
	 * getter for morning
	 */
	public String getMorning() {
		return morning;
	}

	/**
	 * setter for afternoon
	 * 
	 * @param afternoon
	 */
	public void setAfternoon(String afternoon) {
		this.afternoon = afternoon;
	}

	/**
	 * getter for afternoon
	 */
	public String getAfternoon() {
		return afternoon;
	}

	/**
	 * setter for evening
	 * 
	 * @param evening
	 */
	public void setEvening(String evening) {
		this.evening = evening;
	}

	/**
	 * getter for evening
	 */
	public String getEvening() {
		return evening;
	}

	/**
	 * setter for createTime
	 * 
	 * @param createTime
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * getter for createTime
	 */
	public Date getCreateTime() {
		return createTime;
	}

	/**
	 * setter for updateTime
	 * 
	 * @param updateTime
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	/**
	 * getter for updateTime
	 */
	public Date getUpdateTime() {
		return updateTime;
	}

}
