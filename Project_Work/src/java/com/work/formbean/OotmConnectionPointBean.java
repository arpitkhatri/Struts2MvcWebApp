/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.formbean;

/**
 *
 * @author arpit.khatri
 */
public class OotmConnectionPointBean {

    private int Collected_Dev_ID;
    private String Collected_Dev_CODE;
    private String Collected_Dev_Name;
    private String Collected_Dev_Make;
    private Character Internet_Capable;
    private String Reported_Device_Type;
    private String Reported_Dev_Name;
    private int Reported_Dev_Id;
    private int DEVICE_SUBCATEGORY_ID;
    private DeviceSubCategoryBean deviceSubCategoryBean;

    public String getReported_Device_Type() {
        return Reported_Device_Type;
    }

    public void setReported_Device_Type(String Reported_Device_Type) {
        this.Reported_Device_Type = Reported_Device_Type;
    }

    
    public int getReported_Dev_Id() {
        return Reported_Dev_Id;
    }

    public void setReported_Dev_Id(int Reported_Dev_Id) {
        this.Reported_Dev_Id = Reported_Dev_Id;
    }

    

    public int getCollected_Dev_ID() {
        return Collected_Dev_ID;
    }

    public void setCollected_Dev_ID(int Collected_Dev_ID) {
        this.Collected_Dev_ID = Collected_Dev_ID;
    }

    public String getCollected_Dev_CODE() {
        return Collected_Dev_CODE;
    }

    public void setCollected_Dev_CODE(String Collected_Dev_CODE) {
        this.Collected_Dev_CODE = Collected_Dev_CODE;
    }

    public String getCollected_Dev_Name() {
        return Collected_Dev_Name;
    }

    public void setCollected_Dev_Name(String Collected_Dev_Name) {
        this.Collected_Dev_Name = Collected_Dev_Name;
    }

    public String getCollected_Dev_Make() {
        return Collected_Dev_Make;
    }

    public void setCollected_Dev_Make(String Collected_Dev_Make) {
        this.Collected_Dev_Make = Collected_Dev_Make;
    }

    public Character getInternet_Capable() {
        return Internet_Capable;
    }

    public void setInternet_Capable(Character Internet_Capable) {
        this.Internet_Capable = Internet_Capable;
    }

  

    public String getReported_Dev_Name() {
        return Reported_Dev_Name;
    }

    public void setReported_Dev_Name(String Reported_Dev_Name) {
        this.Reported_Dev_Name = Reported_Dev_Name;
    }

    public int getDEVICE_SUBCATEGORY_ID() {
        return DEVICE_SUBCATEGORY_ID;
    }

    public void setDEVICE_SUBCATEGORY_ID(int DEVICE_SUBCATEGORY_ID) {
        this.DEVICE_SUBCATEGORY_ID = DEVICE_SUBCATEGORY_ID;
    }

    public DeviceSubCategoryBean getDeviceSubCategoryBean() {
        return deviceSubCategoryBean;
    }

    public void setDeviceSubCategoryBean(DeviceSubCategoryBean deviceSubCategoryBean) {
        this.deviceSubCategoryBean = deviceSubCategoryBean;
    }

}
