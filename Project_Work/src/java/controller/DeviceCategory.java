/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import static com.opensymphony.xwork2.Action.SUCCESS;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.work.dao.DeviceCategoryDAO;
import com.work.dao.DeviceTypeDAO;
import com.work.formbean.DeviceCategoryBean;
import com.work.formbean.DeviceTypeBean;
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
public class DeviceCategory extends ActionSupport {

    @Override
    public String execute() throws Exception {
        return SUCCESS;
    }

    public void getListDeviceCategory() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int currentPage = request.getParameter("page") != null ? Integer.valueOf(request.getParameter("page").trim()) : 0;
            int pageSize = request.getParameter("rows") != null ? Integer.valueOf(request.getParameter("rows").trim()) : 0;
            List<DeviceCategoryBean> ed_list = DeviceCategoryDAO.getListDeviceCategory();
            JSONObject responcedata = new JSONObject();
            JSONArray cell = new JSONArray();
            int i = 1;
            for (DeviceCategoryBean object : ed_list) {
                DeviceCategoryBean list = (DeviceCategoryBean) object;
                JSONObject cellobj = new JSONObject();
                String activation_status = "";
                if (list.getACTIVE_STATUS() != null && list.getACTIVE_STATUS().toString().equals("Y")) {
                    activation_status = "Yes";
                } else {
                    activation_status = "No";
                }
                cellobj.put("deviceCateogryId", list.getDEVICE_CATEGORY_ID());
                cellobj.put("deviceCategoryCode", list.getDEVICE_Category_CODE());
                cellobj.put("deviceCategoryDesc", list.getDEVICE_Category_DESC());
                cellobj.put("activeStatus", activation_status);
                cellobj.put("effStartDate", DateUtil.converDateFormatToString(list.getEFFECTIVE_START_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("effEndDate", DateUtil.converDateFormatToString(list.getEFFECTIVE_END_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("createDate", DateUtil.converDateFormatToString(list.getCREATE_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("updatedDate", DateUtil.converDateFormatToString(list.getUPDATED_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("deviceTypeId", list.getDeviceTypeBean().getDEVICE_TYPE_ID());
                cellobj.put("deviceTypeCode", list.getDeviceTypeBean().getDEVICE_TYPE_CODE());
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

    public void deleteDeviceCategory() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int deviceCategoryId = request.getParameter("deviceCategoryID") != null ? Integer.valueOf(request.getParameter("deviceCategoryID").trim()) : 0;
            DeviceCategoryDAO.deleteDeviceCategory(deviceCategoryId);
            JSONObject responcedata = new JSONObject();
            responcedata.put("successDelete", "Device Category Deleted Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void updateDeviceCateogry() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);

        int deviceCategoryId = request.getParameter("deviceCateogryId") != null ? Integer.valueOf(request.getParameter("deviceCateogryId").trim()) : 0;
        String deviceCategoryCode = request.getParameter("deviceCategoryCode") != null ? request.getParameter("deviceCategoryCode").trim() : "";
        String deviceCategoryDesc = request.getParameter("deviceCategoryDesc") != null ? request.getParameter("deviceCategoryDesc").trim() : "";
        int deviceTypeId = request.getParameter("deviceTypeCode") != null ? Integer.valueOf(request.getParameter("deviceTypeCode")) : 0;
        String activeStatus = request.getParameter("activeStatus") != null ? request.getParameter("activeStatus").trim() : "";
        String effStartDate = request.getParameter("effStartDate") != null ? request.getParameter("effStartDate").trim() : "";
        String effEndDate = request.getParameter("effEndDate") != null ? request.getParameter("effEndDate").trim() : "";
        String createDate = request.getParameter("createDate") != null ? request.getParameter("createDate").trim() : "";
        String updatedDate = request.getParameter("updatedDate") != null ? request.getParameter("updatedDate").trim() : "";

        DeviceCategoryBean deviceCateogrybean = new DeviceCategoryBean();
        try {
            deviceCateogrybean.setDEVICE_CATEGORY_ID(deviceCategoryId);
            deviceCateogrybean.setDEVICE_Category_CODE(deviceCategoryCode);
            deviceCateogrybean.setDEVICE_Category_DESC(deviceCategoryDesc);
            deviceCateogrybean.setDEVICE_TYPE_ID(deviceTypeId);
            deviceCateogrybean.setACTIVE_STATUS(activeStatus.charAt(0));
            deviceCateogrybean.setEFFECTIVE_START_DATETIME(DateUtil.convertStringToSqlDate(effStartDate, "yyyy-MM-dd HH:mm:ss"));
            deviceCateogrybean.setEFFECTIVE_END_DATETIME(DateUtil.convertStringToSqlDate(effEndDate, "yyyy-MM-dd HH:mm:ss"));
            deviceCateogrybean.setCREATE_DATETIME(DateUtil.convertStringToSqlDate(createDate, "yyyy-MM-dd HH:mm:ss"));
            deviceCateogrybean.setUPDATED_DATETIME(DateUtil.convertStringToSqlDate(updatedDate, "yyyy-MM-dd HH:mm:ss"));
            //Database call to update record
            //Database call to update record
            DeviceCategoryDAO.updateDeviceCateogry(deviceCateogrybean);

            JSONObject responcedata = new JSONObject();
            responcedata.put("successEdit", "Device Category  Updated Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void addDeviceCategory() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
        String oper = request.getParameter("oper") != null ? (String) request.getParameter("oper").trim() : "";

        String deviceCategoryCode = request.getParameter("deviceCategoryCode") != null ? request.getParameter("deviceCategoryCode").trim() : "";
        String deviceCategoryDesc = request.getParameter("deviceCategoryDesc") != null ? request.getParameter("deviceCategoryDesc").trim() : "";
        int deviceTypeId = request.getParameter("deviceTypeCode") != null ? Integer.valueOf(request.getParameter("deviceTypeCode")) : 0;
        String activeStatus = request.getParameter("activeStatus") != null ? request.getParameter("activeStatus").trim() : "";
        String effStartDate = request.getParameter("effStartDate") != null ? request.getParameter("effStartDate").trim() : "";
        String effEndDate = request.getParameter("effEndDate") != null ? request.getParameter("effEndDate").trim() : "";
        String createDate = request.getParameter("createDate") != null ? request.getParameter("createDate").trim() : "";
        String updatedDate = request.getParameter("updatedDate") != null ? request.getParameter("updatedDate").trim() : "";

        DeviceCategoryBean deviceCateogrybean = new DeviceCategoryBean();
        if (!DeviceCategoryDAO.validateDeviceCategoryCode(deviceCategoryCode)) {
            try {
                deviceCateogrybean.setDEVICE_Category_CODE(deviceCategoryCode);
                deviceCateogrybean.setDEVICE_Category_DESC(deviceCategoryDesc);
                deviceCateogrybean.setDEVICE_TYPE_ID(deviceTypeId);
                deviceCateogrybean.setACTIVE_STATUS(activeStatus.charAt(0));
                deviceCateogrybean.setEFFECTIVE_START_DATETIME(DateUtil.convertStringToSqlDate(effStartDate, "yyyy-MM-dd HH:mm:ss"));
//            deviceCateogrybean.setEFFECTIVE_START_DATETIME(new Date(deviceTypeId)effStartDate);
                deviceCateogrybean.setEFFECTIVE_END_DATETIME(DateUtil.convertStringToSqlDate(effEndDate, "yyyy-MM-dd HH:mm:ss"));
                deviceCateogrybean.setCREATE_DATETIME(DateUtil.convertStringToSqlDate(createDate, "yyyy-MM-dd HH:mm:ss"));
                deviceCateogrybean.setUPDATED_DATETIME(DateUtil.convertStringToSqlDate(updatedDate, "yyyy-MM-dd HH:mm:ss"));
                //Database call to update record
                DeviceCategoryDAO.saveDeviceCategory(deviceCateogrybean);

                JSONObject responcedata = new JSONObject();
                responcedata.put("successAdd", "Device Cateogry Added Successfully !!");
                response.setContentType("application/json");
                response.getWriter().write(responcedata.toString());

            } catch (Exception e) {
                e.printStackTrace();
                throw e;
            }
        } else {
            JSONObject responcedata = new JSONObject();
            responcedata.put("successAdd", "");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());
        }
    }

    public void getDeviceTypeCode() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            // get list from database
            List<DeviceTypeBean> list = DeviceTypeDAO.getUniqueDeviceTypeCode();

            int i = 1;
            String init = "0";
            String data = "<select><option value=" + init + ">--Select One--</option>";
            String id = "";

            for (DeviceTypeBean ad : list) {
                id = String.valueOf(ad.getDEVICE_TYPE_ID());
                data += "<option value=" + id + ">" + ad.getDEVICE_TYPE_CODE() + "</option>";
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
