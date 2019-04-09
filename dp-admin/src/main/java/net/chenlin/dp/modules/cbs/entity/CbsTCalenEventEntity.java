package net.chenlin.dp.modules.cbs.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 
 * @author zcl<yczclcn@163.com>
 */
public class CbsTCalenEventEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * eventID
	 */
	private Long id;
	
	/**
	 * 
	 */
	private Long uid;
	
	/**
	 * 
	 */
	private Long calenId;
	
	/**
	 * title
	 */
	private String title;
	
	/**
	 * 是否全天
	 */
	private String allDay;
	
	/**
	 * 开始时间
	 */
	private Date start;
	
	/**
	 * 结束时间
	 */
	private Date end;
	
	/**
	 * url
	 */
	private String url;
	
	/**
	 * className
	 */
	private String className;
	
	/**
	 * 可编辑
	 */
	private String editable;
	
	/**
	 * souce
	 */
	private String source;
	
	/**
	 * 背景和边框颜色
	 */
	private String color;
	
	/**
	 * 背景颜色
	 */
	private String backgroundColor;
	
	/**
	 * 边框颜色
	 */
	private String borderColor;
	
	/**
	 * 文本颜色
	 */
	private String textColor;
	
	/**
	 * 备注
	 */
	private String remark;
	
	/**
	 * 类型
	 */
	private String eventType;
	
	/**
	 * 
	 */
	private Long foreignId;
	
	/**
	 * 创建时间
	 */
	private Date createTime;
	
	/**
	 * 更新时间
	 */
	private Date updateTime;
	

	public CbsTCalenEventEntity() {
		super();
	}

    /**
     * setter for id
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
     * setter for calenId
	 * @param calenId
     */
	public void setCalenId(Long calenId) {
		this.calenId = calenId;
	}

    /**
     * getter for calenId
     */
	public Long getCalenId() {
		return calenId;
	}
	
    /**
     * setter for title
	 * @param title
     */
	public void setTitle(String title) {
		this.title = title;
	}

    /**
     * getter for title
     */
	public String getTitle() {
		return title;
	}
	
    /**
     * setter for allDay
	 * @param allDay
     */
	public void setAllDay(String allDay) {
		this.allDay = allDay;
	}

    /**
     * getter for allDay
     */
	public String getAllDay() {
		return allDay;
	}
	
    /**
     * setter for start
	 * @param start
     */
	public void setStart(Date start) {
		this.start = start;
	}

    /**
     * getter for start
     */
	public Date getStart() {
		return start;
	}
	
    /**
     * setter for end
	 * @param end
     */
	public void setEnd(Date end) {
		this.end = end;
	}

    /**
     * getter for end
     */
	public Date getEnd() {
		return end;
	}
	
    /**
     * setter for url
	 * @param url
     */
	public void setUrl(String url) {
		this.url = url;
	}

    /**
     * getter for url
     */
	public String getUrl() {
		return url;
	}
	
    /**
     * setter for className
	 * @param className
     */
	public void setClassName(String className) {
		this.className = className;
	}

    /**
     * getter for className
     */
	public String getClassName() {
		return className;
	}
	
    /**
     * setter for editable
	 * @param editable
     */
	public void setEditable(String editable) {
		this.editable = editable;
	}

    /**
     * getter for editable
     */
	public String getEditable() {
		return editable;
	}
	
    /**
     * setter for source
	 * @param source
     */
	public void setSource(String source) {
		this.source = source;
	}

    /**
     * getter for source
     */
	public String getSource() {
		return source;
	}
	
    /**
     * setter for color
	 * @param color
     */
	public void setColor(String color) {
		this.color = color;
	}

    /**
     * getter for color
     */
	public String getColor() {
		return color;
	}
	
    /**
     * setter for backgroundColor
	 * @param backgroundColor
     */
	public void setBackgroundColor(String backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

    /**
     * getter for backgroundColor
     */
	public String getBackgroundColor() {
		return backgroundColor;
	}
	
    /**
     * setter for borderColor
	 * @param borderColor
     */
	public void setBorderColor(String borderColor) {
		this.borderColor = borderColor;
	}

    /**
     * getter for borderColor
     */
	public String getBorderColor() {
		return borderColor;
	}
	
    /**
     * setter for textColor
	 * @param textColor
     */
	public void setTextColor(String textColor) {
		this.textColor = textColor;
	}

    /**
     * getter for textColor
     */
	public String getTextColor() {
		return textColor;
	}
	
    /**
     * setter for remark
	 * @param remark
     */
	public void setRemark(String remark) {
		this.remark = remark;
	}

    /**
     * getter for remark
     */
	public String getRemark() {
		return remark;
	}
	
    /**
     * setter for eventType
	 * @param eventType
     */
	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

    /**
     * getter for eventType
     */
	public String getEventType() {
		return eventType;
	}
	
    /**
     * setter for foreignId
	 * @param foreignId
     */
	public void setForeignId(Long foreignId) {
		this.foreignId = foreignId;
	}

    /**
     * getter for foreignId
     */
	public Long getForeignId() {
		return foreignId;
	}
	
    /**
     * setter for createTime
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
