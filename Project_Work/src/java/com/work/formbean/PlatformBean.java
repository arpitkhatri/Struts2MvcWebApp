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
public class PlatformBean {

    private int PLATFORM_ID;
    private String PLATFORM_CODE;
    private String PLATFORM_DESC;
    private Character ACTIVE_STATUS;
    private Date EFFECTIVE_START_DATETIME;
    private Date EFFECTIVE_END_DATETIME;
    private Date CREATE_DATETIME;
    private Date UPDATED_DATETIME;

    public int getPLATFORM_ID() {
        return PLATFORM_ID;
    }

    public void setPLATFORM_ID(int PLATFORM_ID) {
        this.PLATFORM_ID = PLATFORM_ID;
    }

    public String getPLATFORM_CODE() {
        return PLATFORM_CODE;
    }

    public void setPLATFORM_CODE(String PLATFORM_CODE) {
        this.PLATFORM_CODE = PLATFORM_CODE;
    }

    public String getPLATFORM_DESC() {
        return PLATFORM_DESC;
    }

    public void setPLATFORM_DESC(String PLATFORM_DESC) {
        this.PLATFORM_DESC = PLATFORM_DESC;
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

  

    
}
