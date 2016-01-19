/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.work.dao.DeviceTypeDAO;
import com.work.dao.ManageUserDAO;
import com.work.dao.PlatformDAO;
import com.work.formbean.DeviceTypeBean;
import com.work.formbean.ManageUserBean;
import com.work.formbean.PlatformBean;
import com.work.util.DateUtil;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author arpit.khatri
 */
public class DeviceType extends ActionSupport implements ModelDriven<ManageUserBean> {

    private ManageUserBean manageUserBeanModel;

    @Override
    public String execute() throws Exception {
        return SUCCESS;
    }

    public void getListDevices() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int currentPage = request.getParameter("page") != null ? Integer.valueOf(request.getParameter("page").trim()) : 0;
            int pageSize = request.getParameter("rows") != null ? Integer.valueOf(request.getParameter("rows").trim()) : 0;
            List<DeviceTypeBean> ed_list = DeviceTypeDAO.getListDevices();
            JSONObject responcedata = new JSONObject();
            JSONArray cell = new JSONArray();
            int i = 1;
            for (DeviceTypeBean object : ed_list) {
                DeviceTypeBean list = (DeviceTypeBean) object;
                JSONObject cellobj = new JSONObject();
                String activation_status = "";
                if (list.getACTIVE_STATUS() != null && list.getACTIVE_STATUS().toString().equals("Y")) {
                    activation_status = "Yes";
                } else {
                    activation_status = "No";
                }
                cellobj.put("deviceTypeId", list.getDEVICE_TYPE_ID());
                cellobj.put("deviceTypeCode", list.getDEVICE_TYPE_CODE());
                cellobj.put("deviceTypeDesc", list.getDEVICE_TYPE_DESC());
                cellobj.put("activeStatus", activation_status);
                cellobj.put("effStartDate", DateUtil.converDateFormatToString(list.getEFFECTIVE_START_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("effEndDate", DateUtil.converDateFormatToString(list.getEFFECTIVE_END_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("createDate", DateUtil.converDateFormatToString(list.getCREATE_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("updatedDate", DateUtil.converDateFormatToString(list.getUPDATED_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("platformID", list.getPlatformBean().getPLATFORM_ID());
                cellobj.put("platformCode", list.getPlatformBean().getPLATFORM_CODE());
                cell.add(cellobj);
                i++;

            }
            responcedata.put("rows", cell);
            responcedata.put("success", true);
            responcedata.put("page", currentPage);
            responcedata.put("totalCount", pageSize);
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public ManageUserBean getModel() {
        return manageUserBeanModel;
    }

    public void deleteDeviceType() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int deviceId = request.getParameter("deviceTypeId") != null ? Integer.valueOf(request.getParameter("deviceTypeId").trim()) : 0;
            DeviceTypeDAO.deleteDeviceType(deviceId);
            JSONObject responcedata = new JSONObject();
            responcedata.put("successDelete", "Device Type Deleted Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void updateDeviceType() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
      
        int deviceId = request.getParameter("deviceTypeId") != null ? Integer.valueOf(request.getParameter("deviceTypeId").trim()) : 0;
        String deviceTypeCode = request.getParameter("deviceTypeCode") != null ? request.getParameter("deviceTypeCode").trim() : "";
        String deviceTypeDesc = request.getParameter("deviceTypeDesc") != null ? request.getParameter("deviceTypeDesc").trim() : "";
        int platformID = request.getParameter("platformCode") != null ? Integer.valueOf(request.getParameter("platformCode")) : 0;
        String activeStatus = request.getParameter("activeStatus") != null ? request.getParameter("activeStatus").trim() : "";
        String effStartDate = request.getParameter("effStartDate") != null ? request.getParameter("effStartDate").trim() : "";
        String effEndDate = request.getParameter("effEndDate") != null ? request.getParameter("effEndDate").trim() : "";
        String createDate = request.getParameter("createDate") != null ? request.getParameter("createDate").trim() : "";
        String updatedDate = request.getParameter("updatedDate") != null ? request.getParameter("updatedDate").trim() : "";

        DeviceTypeBean deviceTyepBean = new DeviceTypeBean();
        try {
            deviceTyepBean.setDEVICE_TYPE_ID(deviceId);
            deviceTyepBean.setDEVICE_TYPE_CODE(deviceTypeCode);
            deviceTyepBean.setDEVICE_TYPE_DESC(deviceTypeDesc);
            deviceTyepBean.setPLATFORM_ID(platformID);
            deviceTyepBean.setACTIVE_STATUS(activeStatus.charAt(0));
            deviceTyepBean.setEFFECTIVE_START_DATETIME(DateUtil.convertStringToSqlDate(effStartDate, "yyyy-MM-dd HH:mm:ss"));
            deviceTyepBean.setEFFECTIVE_END_DATETIME(DateUtil.convertStringToSqlDate(effEndDate, "yyyy-MM-dd HH:mm:ss"));
            deviceTyepBean.setCREATE_DATETIME(DateUtil.convertStringToSqlDate(createDate, "yyyy-MM-dd HH:mm:ss"));
            deviceTyepBean.setUPDATED_DATETIME(DateUtil.convertStringToSqlDate(updatedDate, "yyyy-MM-dd HH:mm:ss"));
            //Database call to update record
            //Database call to update record
            DeviceTypeDAO.updateDeviceDetails(deviceTyepBean);

            JSONObject responcedata = new JSONObject();
            responcedata.put("successEdit", "Device Details  Updated Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void addDeviceType() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
        String oper = request.getParameter("oper") != null ? (String) request.getParameter("oper").trim() : "";

        String deviceTypeCode = request.getParameter("deviceTypeCode") != null ? request.getParameter("deviceTypeCode").trim() : "";
        String deviceTypeDesc = request.getParameter("deviceTypeDesc") != null ? request.getParameter("deviceTypeDesc").trim() : "";
        int platformID = request.getParameter("platformCode") != null ? Integer.valueOf(request.getParameter("platformCode")) : 0;
        String activeStatus = request.getParameter("activeStatus") != null ? request.getParameter("activeStatus").trim() : "";
        String effStartDate = request.getParameter("effStartDate") != null ? request.getParameter("effStartDate").trim() : "";
        String effEndDate = request.getParameter("effEndDate") != null ? request.getParameter("effEndDate").trim() : "";
        String createDate = request.getParameter("createDate") != null ? request.getParameter("createDate").trim() : "";
        String updatedDate = request.getParameter("updatedDate") != null ? request.getParameter("updatedDate").trim() : "";

        DeviceTypeBean deviceTyepBean = new DeviceTypeBean();
        if (!DeviceTypeDAO.validateDeviceTypeCode(deviceTypeCode)) {
        try {
            deviceTyepBean.setDEVICE_TYPE_CODE(deviceTypeCode);
            deviceTyepBean.setDEVICE_TYPE_DESC(deviceTypeDesc);
            deviceTyepBean.setPLATFORM_ID(platformID);
            deviceTyepBean.setACTIVE_STATUS(activeStatus.charAt(0));
            deviceTyepBean.setEFFECTIVE_START_DATETIME(DateUtil.convertStringToSqlDate(effStartDate, "yyyy-MM-dd HH:mm:ss"));
            deviceTyepBean.setEFFECTIVE_END_DATETIME(DateUtil.convertStringToSqlDate(effEndDate, "yyyy-MM-dd HH:mm:ss"));
            deviceTyepBean.setCREATE_DATETIME(DateUtil.convertStringToSqlDate(createDate, "yyyy-MM-dd HH:mm:ss"));
            deviceTyepBean.setUPDATED_DATETIME(DateUtil.convertStringToSqlDate(updatedDate, "yyyy-MM-dd HH:mm:ss"));
            //Database call to update record
            DeviceTypeDAO.saveDeviceTypeDetails(deviceTyepBean);

            JSONObject responcedata = new JSONObject();
            responcedata.put("successAdd", "Device Type Added Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } } else {
            JSONObject responcedata = new JSONObject();
            responcedata.put("successAdd", "");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());
        }
    }

    public void getPlatFormCode() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            // get list from database
            List<PlatformBean> list = PlatformDAO.getUniquePlatFormCode();

            int i = 1;
            String init = "0";
            String data = "<select><option value=" + init + ">--Select One--</option>";
            String id = "";

            for (PlatformBean ad : list) {
                id = String.valueOf(ad.getPLATFORM_ID());
                data += "<option value=" + id + ">" + ad.getPLATFORM_CODE() + "</option>";
                i++;
            }
            data += "</select>";
            response.setContentType("application/json");
            response.getWriter().write(data);

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
//    static DeviceTypeBean getDeviceTypeBean(){
//    
//    }

}
