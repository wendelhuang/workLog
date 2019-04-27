package net.chenlin.dp.modules.cbs.entity;

import java.io.Serializable;
import java.util.Date;

import java.math.BigDecimal;

/**
 * VIEW
 * @author wendelhuang<weiwei5987(at)126.com>
 */
public class CbsVBookKeepEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * eventID
	 */
	private Long eventId;
	
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
	 * 可编辑
	 */
	private String editable;
	
	/**
	 * souce
	 */
	private String source;
	
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
	 * 备注
	 */
	private String eventRemark;
	
	/**
	 * 类型
	 */
	private Long eventType;
	
	/**
	 * 重复类型
	 */
	private String repeatType;
	
	/**
	 * 重复表达式
	 */
	private String repeatExpression;
	
	/**
	 * 创建时间
	 */
	private Date createTime;
	
	/**
	 * 更新时间
	 */
	private Date updateTime;
	
	/**
	 * 类型代码
	 */
	private String typeCode;
	
	/**
	 * 类型名称
	 */
	private String typeName;
	
	/**
	 * 类型的类型
	 */
	private String typeType;
	
	/**
	 * className
	 */
	private String className;
	
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
	private String eventTypeRemark;
	
	/**
	 * 账本ID
	 */
	private Long bookId;
	
	/**
	 * 金额
	 */
	private BigDecimal money;
	
	/**
	 * 类别ID
	 */
	private Long typeId;
	
	/**
	 * 类型
	 */
	private String outIn;
	
	/**
	 * 备注
	 */
	private String remark;
	

	public CbsVBookKeepEntity() {
		super();
	}

    /**
     * setter for eventId
	 * @param eventId
     */
	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

    /**
     * getter for eventId
     */
	public Long getEventId() {
		return eventId;
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
     * setter for eventRemark
	 * @param eventRemark
     */
	public void setEventRemark(String eventRemark) {
		this.eventRemark = eventRemark;
	}

    /**
     * getter for eventRemark
     */
	public String getEventRemark() {
		return eventRemark;
	}
	
    /**
     * setter for eventType
	 * @param eventType
     */
	public void setEventType(Long eventType) {
		this.eventType = eventType;
	}

    /**
     * getter for eventType
     */
	public Long getEventType() {
		return eventType;
	}
	
    /**
     * setter for repeatType
	 * @param repeatType
     */
	public void setRepeatType(String repeatType) {
		this.repeatType = repeatType;
	}

    /**
     * getter for repeatType
     */
	public String getRepeatType() {
		return repeatType;
	}
	
    /**
     * setter for repeatExpression
	 * @param repeatExpression
     */
	public void setRepeatExpression(String repeatExpression) {
		this.repeatExpression = repeatExpression;
	}

    /**
     * getter for repeatExpression
     */
	public String getRepeatExpression() {
		return repeatExpression;
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
	
    /**
     * setter for typeCode
	 * @param typeCode
     */
	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

    /**
     * getter for typeCode
     */
	public String getTypeCode() {
		return typeCode;
	}
	
    /**
     * setter for typeName
	 * @param typeName
     */
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

    /**
     * getter for typeName
     */
	public String getTypeName() {
		return typeName;
	}
	
    /**
     * setter for typeType
	 * @param typeType
     */
	public void setTypeType(String typeType) {
		this.typeType = typeType;
	}

    /**
     * getter for typeType
     */
	public String getTypeType() {
		return typeType;
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
     * setter for eventTypeRemark
	 * @param eventTypeRemark
     */
	public void setEventTypeRemark(String eventTypeRemark) {
		this.eventTypeRemark = eventTypeRemark;
	}

    /**
     * getter for eventTypeRemark
     */
	public String getEventTypeRemark() {
		return eventTypeRemark;
	}
	
    /**
     * setter for bookId
	 * @param bookId
     */
	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}

    /**
     * getter for bookId
     */
	public Long getBookId() {
		return bookId;
	}
	
    /**
     * setter for money
	 * @param money
     */
	public void setMoney(BigDecimal money) {
		this.money = money;
	}

    /**
     * getter for money
     */
	public BigDecimal getMoney() {
		return money;
	}
	
    /**
     * setter for typeId
	 * @param typeId
     */
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

    /**
     * getter for typeId
     */
	public Long getTypeId() {
		return typeId;
	}
	
    /**
     * setter for outIn
	 * @param outIn
     */
	public void setOutIn(String outIn) {
		this.outIn = outIn;
	}

    /**
     * getter for outIn
     */
	public String getOutIn() {
		return outIn;
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
	
}
