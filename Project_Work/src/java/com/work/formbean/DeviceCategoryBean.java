/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.formbean;

import java.sql.Date;

/**
 *
 * @author arpit.khatri
 */
public class DeviceCategoryBean {

    private int DEVICE_CATEGORY_ID;
    private int DEVICE_TYPE_ID;
    private String DEVICE_Category_CODE;
    private String DEVICE_Category_DESC;
    private Character ACTIVE_STATUS;
    private Date EFFECTIVE_START_DATETIME;
    private Date EFFECTIVE_END_DATETIME;
    private Date CREATE_DATETIME;
    private Date UPDATED_DATETIME;
    private DeviceTypeBean deviceTypeBean;

    public int getDEVICE_CATEGORY_ID() {
        return DEVICE_CATEGORY_ID;
    }

    public void setDEVICE_CATEGORY_ID(int DEVICE_CATEGORY_ID) {
        this.DEVICE_CATEGORY_ID = DEVICE_CATEGORY_ID;
    }

    public int getDEVICE_TYPE_ID() {
        return DEVICE_TYPE_ID;
    }

    public void setDEVICE_TYPE_ID(int DEVICE_TYPE_ID) {
        this.DEVICE_TYPE_ID = DEVICE_TYPE_ID;
    }

    public String getDEVICE_Category_CODE() {
        return DEVICE_Category_CODE;
    }

    public void setDEVICE_Category_CODE(String DEVICE_Category_CODE) {
        this.DEVICE_Category_CODE = DEVICE_Category_CODE;
    }

    public String getDEVICE_Category_DESC() {
        return DEVICE_Category_DESC;
    }

    public void setDEVICE_Category_DESC(String DEVICE_Category_DESC) {
        this.DEVICE_Category_DESC = DEVICE_Category_DESC;
    }

  
    public Character getACTIVE_STATUS() {
        return ACTIVE_STATUS;
    }

    public void setACTIVE_STATUS(Character ACTIVE_STATUS) {
        this.ACTIVE_STATUS = ACTIVE_STATUS;
    }

    public Date getEFFECTIVE_START_DATETIME() {
        return EFFECTIVE_START_DATETIME;
    }

    public void setEFFECTIVE_START_DATETIME(Date EFFECTIVE_START_DATETIME) {
        this.EFFECTIVE_START_DATETIME = EFFECTIVE_START_DATETIME;
    }

    public Date getEFFECTIVE_END_DATETIME() {
        return EFFECTIVE_END_DATETIME;
    }

    public void setEFFECTIVE_END_DATETIME(Date EFFECTIVE_END_DATETIME) {
        this.EFFECTIVE_END_DATETIME = EFFECTIVE_END_DATETIME;
    }

    public Date getCREATE_DATETIME() {
        return CREATE_DATETIME;
    }

    public void setCREATE_DATETIME(Date CREATE_DATETIME) {
        this.CREATE_DATETIME = CREATE_DATETIME;
    }

    public Date getUPDATED_DATETIME() {
        return UPDATED_DATETIME;
    }

    public void setUPDATED_DATETIME(Date UPDATED_DATETIME) {
        this.UPDATED_DATETIME = UPDATED_DATETIME;
    }

    public DeviceTypeBean getDeviceTypeBean() {
        return deviceTypeBean;
    }

    public void setDeviceTypeBean(DeviceTypeBean deviceTypeBean) {
        this.deviceTypeBean = deviceTypeBean;
    }
    
    
    
    
}
