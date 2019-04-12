package net.chenlin.dp.modules.cbs.entity;

import java.io.Serializable;
import java.util.Date;


/**
 * 
 * @author zcl<yczclcn@163.com>
 */
public class CbsTCalenEventTypeEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * event type id
	 */
	private Long id;
	
	/**
	 * 
	 */
	private Long uid;
	
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
	 * 创建时间
	 */
	private Date createTime;
	
	/**
	 * 更新时间
	 */
	private Date updateTime;
	

	public CbsTCalenEventTypeEntity() {
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
