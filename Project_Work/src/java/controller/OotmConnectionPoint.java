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
import com.work.dao.OotmConnectionPointDAO;
import com.work.formbean.DeviceCategoryBean;
import com.work.formbean.DeviceSubCategoryBean;
import com.work.formbean.DeviceTypeBean;
import com.work.formbean.OotmConnectionPointBean;
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
public class OotmConnectionPoint extends ActionSupport {

    @Override
    public String execute() throws Exception {
        return SUCCESS;
    }

    public void getListDeviceOotmConnPoint() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int currentPage = request.getParameter("page") != null ? Integer.valueOf(request.getParameter("page").trim()) : 0;
            int pageSize = request.getParameter("rows") != null ? Integer.valueOf(request.getParameter("rows").trim()) : 0;
            List<OotmConnectionPointBean> ed_list = OotmConnectionPointDAO.getListOfConnectionPoint();
            JSONObject responcedata = new JSONObject();
            JSONArray cell = new JSONArray();
            int i = 1;
            for (OotmConnectionPointBean object : ed_list) {
                OotmConnectionPointBean list = (OotmConnectionPointBean) object;
                JSONObject cellobj = new JSONObject();
                String internetCapable = "";
                if (list.getInternet_Capable() != null && list.getInternet_Capable().toString().equals("Y")) {
                    internetCapable = "Yes";
                } else {
                    internetCapable = "No";
                }
                
                cellobj.put("CollectedDevID", list.getCollected_Dev_ID());
                cellobj.put("CollectedDevCODE", list.getCollected_Dev_CODE());
                cellobj.put("CollectedDevNAME", list.getCollected_Dev_Name());
                cellobj.put("CollectedDevMAke", list.getCollected_Dev_Make());
                cellobj.put("internetCapable", internetCapable);
                cellobj.put("reportedDeviceType", list.getReported_Device_Type());
                cellobj.put("textOfReportedDevice", list.getReported_Device_Type());
                cellobj.put("reportedDevName", list.getReported_Dev_Name());
                cellobj.put("reportedDevId", list.getReported_Dev_Id());
                cellobj.put("deviceSubCategoryId", list.getDeviceSubCategoryBean().getDEVICE_SUBCATEGORY_ID());
                cellobj.put("deviceSubCategoryCode", list.getDeviceSubCategoryBean().getDEVICE_SUBCategory_CODE());
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

    public void deleteOotmConnectionPoint() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int CollectedDevID = request.getParameter("CollectedDevID") != null ? Integer.valueOf(request.getParameter("CollectedDevID").trim()) : 0;
            OotmConnectionPointDAO.deleteOotmConnectionPoint(CollectedDevID);
            JSONObject responcedata = new JSONObject();
            responcedata.put("successDelete", "OOTM Connection Point Deleted Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void updateOotmConnectionPoint() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);

        int CollectedDevID = request.getParameter("CollectedDevID") != null ? Integer.valueOf(request.getParameter("CollectedDevID").trim()) : 0;
        String CollectedDevCODE = request.getParameter("CollectedDevCODE") != null ? request.getParameter("CollectedDevCODE").trim() : "";
        String CollectedDevNAME = request.getParameter("CollectedDevNAME") != null ? request.getParameter("CollectedDevNAME").trim() : "";
        String CollectedDevMAke = request.getParameter("CollectedDevMAke") != null ? request.getParameter("CollectedDevMAke").trim() : "";
        int deviceSubCategoryCode = request.getParameter("deviceSubCategoryCode") != null ? Integer.valueOf(request.getParameter("deviceSubCategoryCode")) : 0;
        String internetCapable = request.getParameter("internetCapable") != null ? request.getParameter("internetCapable").trim() : "";
        String reportedDeviceType = request.getParameter("textOfReportedDevice") != null ? request.getParameter("textOfReportedDevice").trim() : "";
        String reportedDevName = request.getParameter("reportedDevName") != null ? request.getParameter("reportedDevName").trim() : "";
        int reportedDevId = request.getParameter("reportedDevId") != null ? Integer.valueOf(request.getParameter("reportedDevId").trim()) : 0;

        OotmConnectionPointBean ootmConnectionPointBean = new OotmConnectionPointBean();
        try {
            ootmConnectionPointBean.setCollected_Dev_ID(CollectedDevID);
            ootmConnectionPointBean.setCollected_Dev_CODE(CollectedDevCODE);
            ootmConnectionPointBean.setCollected_Dev_Name(CollectedDevNAME);
            ootmConnectionPointBean.setCollected_Dev_Make(CollectedDevMAke);
            ootmConnectionPointBean.setDEVICE_SUBCATEGORY_ID(deviceSubCategoryCode);
            ootmConnectionPointBean.setInternet_Capable(internetCapable.charAt(0));
            ootmConnectionPointBean.setReported_Device_Type(reportedDeviceType);
            ootmConnectionPointBean.setReported_Dev_Name(reportedDevName);
            ootmConnectionPointBean.setReported_Dev_Id(reportedDevId);
            //Database call to update record
            OotmConnectionPointDAO.UpdateootmConnectionPointBean(ootmConnectionPointBean);

            JSONObject responcedata = new JSONObject();
            responcedata.put("successEdit", "OOTM Connection Point Updated Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void addOotmConnectionPoint() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
        String oper = request.getParameter("oper") != null ? (String) request.getParameter("oper").trim() : "";

        String CollectedDevCODE = request.getParameter("CollectedDevCODE") != null ? request.getParameter("CollectedDevCODE").trim() : "";

        String CollectedDevNAME = request.getParameter("CollectedDevNAME") != null ? request.getParameter("CollectedDevNAME").trim() : "";
        String CollectedDevMAke = request.getParameter("CollectedDevMAke") != null ? request.getParameter("CollectedDevMAke").trim() : "";
        int deviceSubCategoryCode = request.getParameter("deviceSubCategoryCode") != null ? Integer.valueOf(request.getParameter("deviceSubCategoryCode")) : 0;
        String internetCapable = request.getParameter("internetCapable") != null ? request.getParameter("internetCapable").trim() : "";
        String reportedDeviceType = request.getParameter("textOfReportedDevice") != null ? request.getParameter("textOfReportedDevice").trim() : "";
        String reportedDevName = request.getParameter("reportedDevName") != null ? request.getParameter("reportedDevName").trim() : "";
        int reportedDevId = request.getParameter("reportedDevId") != null ? Integer.valueOf(request.getParameter("reportedDevId").trim()) : 0;

        OotmConnectionPointBean ootmConnectionPointBean = new OotmConnectionPointBean();
        if (!OotmConnectionPointDAO.validateCollectedDevCode(CollectedDevCODE)) {
            try {
                ootmConnectionPointBean.setCollected_Dev_CODE(CollectedDevCODE);
                ootmConnectionPointBean.setCollected_Dev_Name(CollectedDevNAME);
                ootmConnectionPointBean.setCollected_Dev_Make(CollectedDevMAke);
                ootmConnectionPointBean.setDEVICE_SUBCATEGORY_ID(deviceSubCategoryCode);
                ootmConnectionPointBean.setInternet_Capable(internetCapable.charAt(0));
                ootmConnectionPointBean.setReported_Device_Type(reportedDeviceType);
                ootmConnectionPointBean.setReported_Dev_Name(reportedDevName);
                ootmConnectionPointBean.setReported_Dev_Id(reportedDevId);
                //Database call to update record
                OotmConnectionPointDAO.saveootmConnectionPointBean(ootmConnectionPointBean);

                JSONObject responcedata = new JSONObject();
                responcedata.put("successAdd", "OOTM Connection Point Added Successfully !!");
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

    public void getDeviceSubCategoryCode() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            // get list from database
            List<DeviceSubCategoryBean> list = DeviceSubCategoryDAO.getUniqueDeviceSubCategoryCode();

            int i = 1;
            String init = "0";
            String data = "<select><option value=" + init + ">--Select One--</option>";
            String id = "";

            for (DeviceSubCategoryBean ad : list) {
                id = String.valueOf(ad.getDEVICE_SUBCATEGORY_ID());
                data += "<option value=" + id + ">" + ad.getDEVICE_SUBCategory_CODE() + "</option>";
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
 public void getReportedDeviceType() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            JSONObject responcedata = new JSONObject();
            JSONArray cell = new JSONArray();
            String init = "0";
            String data = "<select><option value=" + init + ">--Select One--</option>";
            data += "<option value=DVD>DVD</option>";
            data += "<option value=Internet>Internet Connected Device</option>";
            data += "<option value=Smart>Smart TV</option>";
            data += "<option value=Traditional>Traditional TV / Set Top Box</option>";
            data += "<option value=Video>Video Game</option>";
            data += "</select>";
            responcedata.put("rows", cell);
            response.setContentType("application/json");
            response.getWriter().write(data);

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

}
