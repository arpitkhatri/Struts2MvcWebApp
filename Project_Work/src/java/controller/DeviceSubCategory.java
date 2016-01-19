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
import com.work.dao.DeviceSubCategoryDAO;
import com.work.dao.DeviceTypeDAO;
import com.work.formbean.DeviceCategoryBean;
import com.work.formbean.DeviceSubCategoryBean;
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
public class DeviceSubCategory extends ActionSupport {

    @Override
    public String execute() throws Exception {
        return SUCCESS;
    }

    public void getListDeviceSubCategory() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int currentPage = request.getParameter("page") != null ? Integer.valueOf(request.getParameter("page").trim()) : 0;
            int pageSize = request.getParameter("rows") != null ? Integer.valueOf(request.getParameter("rows").trim()) : 0;
            List<DeviceSubCategoryBean> ed_list = DeviceSubCategoryDAO.getListDeviceSubCategory();
            JSONObject responcedata = new JSONObject();
            JSONArray cell = new JSONArray();
            int i = 1;
            for (DeviceSubCategoryBean object : ed_list) {
                DeviceSubCategoryBean list = (DeviceSubCategoryBean) object;
                JSONObject cellobj = new JSONObject();
                String activation_status = "";
                if (list.getACTIVE_STATUS() != null && list.getACTIVE_STATUS().toString().equals("Y")) {
                    activation_status = "Yes";
                } else {
                    activation_status = "No";
                }
                cellobj.put("deviceSubCateogryId", list.getDEVICE_SUBCATEGORY_ID());
                cellobj.put("deviceSubCategoryCode", list.getDEVICE_SUBCategory_CODE());
                cellobj.put("deviceSubCategoryDesc", list.getDEVICE_SUBCategory_DESC());
                cellobj.put("activeStatus", activation_status);
                cellobj.put("effStartDate", DateUtil.converDateFormatToString(list.getEFFECTIVE_START_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("effEndDate", DateUtil.converDateFormatToString(list.getEFFECTIVE_END_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("createDate", DateUtil.converDateFormatToString(list.getCREATE_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("updatedDate", DateUtil.converDateFormatToString(list.getUPDATED_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("deviceCategoryId", list.getDeviceCategoryBean().getDEVICE_CATEGORY_ID());
                cellobj.put("deviceCategoryCode", list.getDeviceCategoryBean().getDEVICE_Category_CODE());
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

    public void deleteDeviceSubCategory() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int deviceSubCategoryId = request.getParameter("deviceSubCateogryId") != null ? Integer.valueOf(request.getParameter("deviceSubCateogryId").trim()) : 0;
            DeviceSubCategoryDAO.deleteDeviceSubCategory(deviceSubCategoryId);
            JSONObject responcedata = new JSONObject();
            responcedata.put("successDelete", "Device Sub Category Deleted Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void updateDeviceSubCateogry() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);

        int deviceSubCategoryId = request.getParameter("deviceSubCateogryId") != null ? Integer.valueOf(request.getParameter("deviceSubCateogryId").trim()) : 0;
        String deviceSubCategoryCode = request.getParameter("deviceSubCategoryCode") != null ? request.getParameter("deviceSubCategoryCode").trim() : "";
        String deviceSubCategoryDesc = request.getParameter("deviceSubCategoryDesc") != null ? request.getParameter("deviceSubCategoryDesc").trim() : "";
        int deviceCategoryCode = request.getParameter("deviceCategoryCode") != null ? Integer.valueOf(request.getParameter("deviceCategoryCode")) : 0;
        String activeStatus = request.getParameter("activeStatus") != null ? request.getParameter("activeStatus").trim() : "";
        String effStartDate = request.getParameter("effStartDate") != null ? request.getParameter("effStartDate").trim() : "";
        String effEndDate = request.getParameter("effEndDate") != null ? request.getParameter("effEndDate").trim() : "";
        String createDate = request.getParameter("createDate") != null ? request.getParameter("createDate").trim() : "";
        String updatedDate = request.getParameter("updatedDate") != null ? request.getParameter("updatedDate").trim() : "";

        DeviceSubCategoryBean deviceSubCateogrybean = new DeviceSubCategoryBean();
        try {
            deviceSubCateogrybean.setDEVICE_SUBCATEGORY_ID(deviceSubCategoryId);
            deviceSubCateogrybean.setDEVICE_SUBCategory_CODE(deviceSubCategoryCode);
            deviceSubCateogrybean.setDEVICE_SUBCategory_DESC(deviceSubCategoryDesc);
            deviceSubCateogrybean.setDEVICE_CATEGORY_ID(deviceCategoryCode);
            deviceSubCateogrybean.setACTIVE_STATUS(activeStatus.charAt(0));
            deviceSubCateogrybean.setEFFECTIVE_START_DATETIME(DateUtil.convertStringToSqlDate(effStartDate, "yyyy-MM-dd HH:mm:ss"));
            deviceSubCateogrybean.setEFFECTIVE_END_DATETIME(DateUtil.convertStringToSqlDate(effEndDate, "yyyy-MM-dd HH:mm:ss"));
            deviceSubCateogrybean.setCREATE_DATETIME(DateUtil.convertStringToSqlDate(createDate, "yyyy-MM-dd HH:mm:ss"));
            deviceSubCateogrybean.setUPDATED_DATETIME(DateUtil.convertStringToSqlDate(updatedDate, "yyyy-MM-dd HH:mm:ss"));
            //Database call to update record
            //Database call to update record
            DeviceSubCategoryDAO.updateDeviceSubCateogry(deviceSubCateogrybean);

            JSONObject responcedata = new JSONObject();
            responcedata.put("successEdit", "Device Sub Category Updated Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void addDeviceSubCategory() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
        String oper = request.getParameter("oper") != null ? (String) request.getParameter("oper").trim() : "";

        String deviceSubCategoryCode = request.getParameter("deviceSubCategoryCode") != null ? request.getParameter("deviceSubCategoryCode").trim() : "";
        String deviceSubCategoryDesc = request.getParameter("deviceSubCategoryDesc") != null ? request.getParameter("deviceSubCategoryDesc").trim() : "";
        int deviceCategoryCode = request.getParameter("deviceCategoryCode") != null ? Integer.valueOf(request.getParameter("deviceCategoryCode")) : 0;
        String activeStatus = request.getParameter("activeStatus") != null ? request.getParameter("activeStatus").trim() : "";
        String effStartDate = request.getParameter("effStartDate") != null ? request.getParameter("effStartDate").trim() : "";
        String effEndDate = request.getParameter("effEndDate") != null ? request.getParameter("effEndDate").trim() : "";
        String createDate = request.getParameter("createDate") != null ? request.getParameter("createDate").trim() : "";
        String updatedDate = request.getParameter("updatedDate") != null ? request.getParameter("updatedDate").trim() : "";

        DeviceSubCategoryBean deviceSubCateogrybean = new DeviceSubCategoryBean();
          if (!DeviceSubCategoryDAO.validateDeviceSubCategoryCode(deviceSubCategoryCode)) {
        try {
            deviceSubCateogrybean.setDEVICE_SUBCategory_CODE(deviceSubCategoryCode);
            deviceSubCateogrybean.setDEVICE_SUBCategory_DESC(deviceSubCategoryDesc);
            deviceSubCateogrybean.setDEVICE_CATEGORY_ID(deviceCategoryCode);
            deviceSubCateogrybean.setACTIVE_STATUS(activeStatus.charAt(0));
            deviceSubCateogrybean.setEFFECTIVE_START_DATETIME(DateUtil.convertStringToSqlDate(effStartDate, "yyyy-MM-dd HH:mm:ss"));
            deviceSubCateogrybean.setEFFECTIVE_END_DATETIME(DateUtil.convertStringToSqlDate(effEndDate, "yyyy-MM-dd HH:mm:ss"));
            deviceSubCateogrybean.setCREATE_DATETIME(DateUtil.convertStringToSqlDate(createDate, "yyyy-MM-dd HH:mm:ss"));
            deviceSubCateogrybean.setUPDATED_DATETIME(DateUtil.convertStringToSqlDate(updatedDate, "yyyy-MM-dd HH:mm:ss"));
            //Database call to update record
            DeviceSubCategoryDAO.saveDeviceSubCategory(deviceSubCateogrybean);

            JSONObject responcedata = new JSONObject();
            responcedata.put("successAdd", "Device Sub Cateogry Added Successfully !!");
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

    public void getDeviceCategoryCode() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            // get list from database
            List<DeviceCategoryBean> list = DeviceCategoryDAO.getUniqueDeviceCategoryCode();

            int i = 1;
            String init = "0";
            String data = "<select><option value=" + init + ">--Select One--</option>";
            String id = "";

            for (DeviceCategoryBean ad : list) {
                id = String.valueOf(ad.getDEVICE_CATEGORY_ID());
                data += "<option value=" + id + ">" + ad.getDEVICE_Category_CODE() + "</option>";
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
