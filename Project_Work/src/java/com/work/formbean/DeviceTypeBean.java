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
public class DeviceTypeBean {
    private int DEVICE_TYPE_ID;
    private String DEVICE_TYPE_CODE;
    private String DEVICE_TYPE_DESC;
    private Character ACTIVE_STATUS;
    private Date EFFECTIVE_START_DATETIME;
    private Date EFFECTIVE_END_DATETIME;
    private Date CREATE_DATETIME;
    private Date UPDATED_DATETIME;
    private int PLATFORM_ID;
    private PlatformBean platformBean;

    public PlatformBean getPlatformBean() {
        return platformBean;
    }

    public void setPlatformBean(PlatformBean platformBean) {
        this.platformBean = platformBean;
    }
    
    public int getDEVICE_TYPE_ID() {
        return DEVICE_TYPE_ID;
    }

    public void setDEVICE_TYPE_ID(int DEVICE_TYPE_ID) {
        this.DEVICE_TYPE_ID = DEVICE_TYPE_ID;
    }

    public String getDEVICE_TYPE_CODE() {
        return DEVICE_TYPE_CODE;
    }

    public void setDEVICE_TYPE_CODE(String DEVICE_TYPE_CODE) {
        this.DEVICE_TYPE_CODE = DEVICE_TYPE_CODE;
    }

    public String getDEVICE_TYPE_DESC() {
        return DEVICE_TYPE_DESC;
    }

    public void setDEVICE_TYPE_DESC(String DEVICE_TYPE_DESC) {
        this.DEVICE_TYPE_DESC = DEVICE_TYPE_DESC;
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

    public int getPLATFORM_ID() {
        return PLATFORM_ID;
    }

    public void setPLATFORM_ID(int PLATFORM_ID) {
        this.PLATFORM_ID = PLATFORM_ID;
    }
    
    
}
