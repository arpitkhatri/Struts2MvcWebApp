/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.work.dao.PlatformDAO;
import com.work.formbean.PlatformBean;
import com.work.util.DateUtil;
import java.awt.AWTEventMulticaster;
import java.util.Date;
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
public class Platform extends ActionSupport implements ModelDriven<PlatformBean> {

    private PlatformBean PlatformBean;

    @Override
    public String execute() throws Exception {
        return SUCCESS;
    }

    public void getPlatformList() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);

            int currentPage = request.getParameter("page") != null ? Integer.valueOf(request.getParameter("page").trim()) : 0;
            int pageSize = request.getParameter("rows") != null ? Integer.valueOf(request.getParameter("rows").trim()) : 0;

            List<PlatformBean> ed_list = PlatformDAO.getPlatformList();
            JSONObject responcedata = new JSONObject();
            JSONArray cell = new JSONArray();
            int i = 1;

            for (PlatformBean object : ed_list) {
                PlatformBean list = (PlatformBean) object;
                String activation_status = "";
                if (list.getACTIVE_STATUS() != null && list.getACTIVE_STATUS().toString().equals("Y")) {
                    activation_status = "Yes";
                } else {
                    activation_status = "No";
                }
                JSONObject cellobj = new JSONObject();
                cellobj.put("platformID", list.getPLATFORM_ID());
                cellobj.put("platformCode", list.getPLATFORM_CODE());
                cellobj.put("platformDsc", list.getPLATFORM_DESC());
                cellobj.put("activeStatus", activation_status);
                cellobj.put("effStartDate", DateUtil.converDateFormatToString(list.getEFFECTIVE_START_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("effEndDate", DateUtil.converDateFormatToString(list.getEFFECTIVE_END_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("createDate", DateUtil.converDateFormatToString(list.getCREATE_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cellobj.put("updateDate", DateUtil.converDateFormatToString(list.getUPDATED_DATETIME(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
                cell.add(cellobj);
                i++;

            }
            responcedata.put("rows", cell);
            responcedata.put("success", true);
            responcedata.put("page", currentPage);
            responcedata.put("totalCount", pageSize);
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

            System.out.println("=======================Commming ======================" + responcedata.toString());
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public PlatformBean getModel() {
        return PlatformBean;
    }

    public void deletePlatformById() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int platform_id = request.getParameter("platformID") != null ? Integer.valueOf(request.getParameter("platformID").trim()) : 0;

            PlatformDAO.deletePlatformByPlatformId(platform_id);

            JSONObject responcedata = new JSONObject();
            responcedata.put("successDelete", "Platform Detail Deleted Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void updatePlatformDetails() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);

//        String orgUnitTypeName = orgUnitDtls.getOrgUnitTypeName().trim();
//        int orgTypeId = orgUnitDtls.getOrgUnitTypeId();
        String oper = request.getParameter("oper") != null ? (String) request.getParameter("oper").trim() : "";
        int platformId = request.getParameter("platformId") != null ? Integer.valueOf(request.getParameter("platformId").trim()) : 0;
        String platformCode = request.getParameter("platformCode") != null ? request.getParameter("platformCode").trim() : "";
        String platformDsc = request.getParameter("platformDsc") != null ? request.getParameter("platformDsc").trim() : "";
        String activeStatus = request.getParameter("activeStatus") != null ? request.getParameter("activeStatus").trim() : "";
        String effStartDate = request.getParameter("effStartDate") != null ? request.getParameter("effStartDate").trim() : "";
        String effEndDate = request.getParameter("effEndDate") != null ? request.getParameter("effEndDate").trim() : "";
        String createDate = request.getParameter("createDate") != null ? request.getParameter("createDate").trim() : "";
        String updateDate = request.getParameter("updateDate") != null ? request.getParameter("updateDate").trim() : "";
        PlatformBean Platformbean = new PlatformBean();
//        if (validation(oper, orgTypeId, orgUnitTypeName)) {
        try {
            Platformbean.setPLATFORM_ID(platformId);
            Platformbean.setPLATFORM_CODE(platformCode);
            Platformbean.setPLATFORM_DESC(platformDsc);
            Platformbean.setACTIVE_STATUS(activeStatus.charAt(0));
            Platformbean.setEFFECTIVE_START_DATETIME(DateUtil.convertStringToSqlDate(effStartDate, "yyyy-MM-dd HH:mm:ss"));
            Platformbean.setEFFECTIVE_END_DATETIME(DateUtil.convertStringToSqlDate(effEndDate, "yyyy-MM-dd HH:mm:ss"));
            Platformbean.setCREATE_DATETIME(DateUtil.convertStringToSqlDate(createDate, "yyyy-MM-dd HH:mm:ss"));
            Platformbean.setUPDATED_DATETIME(DateUtil.convertStringToSqlDate(updateDate, "yyyy-MM-dd HH:mm:ss"));
            //Database call to update record
            PlatformDAO.updatePlatformDetails(Platformbean);

            JSONObject responcedata = new JSONObject();
            responcedata.put("successEdit", "Platform Detail Updated Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
//        } else {
//
//            JSONObject responcedata = new JSONObject();
//            responcedata.put("successEdit", "");
//            response.setContentType("application/json");
//            response.getWriter().write(responcedata.toString());
//        }
    }

    public void addPlatformDetails() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
    String oper = request.getParameter("oper") != null ? (String) request.getParameter("oper").trim() : "";
//        int platformId = request.getParameter("platformId") != null ? Integer.valueOf(request.getParameter("platformId").trim()) : 0;
        String platformCode = request.getParameter("platformCode") != null ? request.getParameter("platformCode").trim() : "";
        String platformDsc = request.getParameter("platformDsc") != null ? request.getParameter("platformDsc").trim() : "";
        String activeStatus = request.getParameter("activeStatus") != null ? request.getParameter("activeStatus").trim() : "";
        String effStartDate = request.getParameter("effStartDate") != null ? request.getParameter("effStartDate").trim() : "";
        String effEndDate = request.getParameter("effEndDate") != null ? request.getParameter("effEndDate").trim() : "";
        String createDate = request.getParameter("createDate") != null ? request.getParameter("createDate").trim() : "";
        String updateDate = request.getParameter("updateDate") != null ? request.getParameter("updateDate").trim() : "";
        PlatformBean Platformbean = new PlatformBean();

//        if (validation(oper, desgFuncId, funcName, desgGrp_Id)) {
            try {

//                Platformbean.setPLATFORM_ID(platformId);
                Platformbean.setPLATFORM_CODE(platformCode);
                Platformbean.setPLATFORM_DESC(platformDsc);
                Platformbean.setACTIVE_STATUS(activeStatus.charAt(0));
                Platformbean.setEFFECTIVE_START_DATETIME(DateUtil.convertStringToSqlDate(effStartDate, "yyyy-MM-dd HH:mm:ss"));
                Platformbean.setEFFECTIVE_END_DATETIME(DateUtil.convertStringToSqlDate(effEndDate, "yyyy-MM-dd HH:mm:ss"));
                Platformbean.setCREATE_DATETIME(DateUtil.convertStringToSqlDate(createDate, "yyyy-MM-dd HH:mm:ss"));
                Platformbean.setUPDATED_DATETIME(DateUtil.convertStringToSqlDate(updateDate, "yyyy-MM-dd HH:mm:ss"));
                //Database call to update record
                PlatformDAO.SavePlatformDetails(Platformbean);

                JSONObject responcedata = new JSONObject();
                responcedata.put("successAdd", "Platform Details Added Successfully !!");
                response.setContentType("application/json");
                response.getWriter().write(responcedata.toString());

            } catch (Exception e) {
                e.printStackTrace();
                throw e;
            }
//        } else {
//
//            JSONObject responcedata = new JSONObject();
//            responcedata.put("successAdd", "");
//            response.setContentType("application/json");
//            response.getWriter().write(responcedata.toString());
//        }
    }

    public PlatformBean getPlatformBean() {
        return PlatformBean;
    }

    public void setPlatformBean(PlatformBean PlatformBean) {
        this.PlatformBean = PlatformBean;
    }

}
