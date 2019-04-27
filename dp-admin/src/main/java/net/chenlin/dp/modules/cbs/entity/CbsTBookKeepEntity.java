package net.chenlin.dp.modules.cbs.entity;

import java.io.Serializable;
import java.util.Date;

import java.math.BigDecimal;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
public class CbsTBookKeepEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 记账ID
	 */
	private Long id;
	
	/**
	 * 用户ID
	 */
	private Long uid;
	
	/**
	 * 日历ID
	 */
	private Long eventId;
	
	/**
	 * 时间
	 */
	private Date keepTime;
	
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
	
	/**
	 * 创建时间
	 */
	private Date createTime;
	
	/**
	 * 更新时间
	 */
	private Date updateTime;
	

	public CbsTBookKeepEntity() {
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
     * setter for keepTime
	 * @param keepTime
     */
	public void setKeepTime(Date keepTime) {
		this.keepTime = keepTime;
	}

    /**
     * getter for keepTime
     */
	public Date getKeepTime() {
		return keepTime;
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
