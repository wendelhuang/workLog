package net.chenlin.dp.modules.cbs.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @author wendelhuang<weiwei5987(at)126.com>
 */
public class CbsTKeepTypeEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 记账类型ID
	 */
	private Integer id;

	/**
	 * 用户ID
	 */
	private Integer uid;

	/**
	 * 类别名称
	 */
	private String typeName;

	/**
	 * 类别图标
	 */
	private String typeIcon;

	/**
	 * 创建时间
	 */
	private Date createTime;

	/**
	 * 更新时间
	 */
	private Date updateTime;

	public CbsTKeepTypeEntity() {
		super();
	}

	/**
	 * setter for id
	 * 
	 * @param id
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * getter for id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * setter for uid
	 * 
	 * @param uid
	 */
	public void setUid(Integer uid) {
		this.uid = uid;
	}

	/**
	 * getter for uid
	 */
	public Integer getUid() {
		return uid;
	}

	/**
	 * setter for typeName
	 * 
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
	 * setter for typeIcon
	 * 
	 * @param typeIcon
	 */
	public void setTypeIcon(String typeIcon) {
		this.typeIcon = typeIcon;
	}

	/**
	 * getter for typeIcon
	 */
	public String getTypeIcon() {
		return typeIcon;
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
