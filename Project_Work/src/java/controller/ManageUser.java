/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.work.dao.ManageUserDAO;
import com.work.dao.PlatformDAO;
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
public class ManageUser extends ActionSupport implements ModelDriven<ManageUserBean> {

    private ManageUserBean manageUserBeanModel;

    @Override
    public String execute() throws Exception {
        return SUCCESS;
    }

    public void getListOfUser() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int currentPage = request.getParameter("page") != null ? Integer.valueOf(request.getParameter("page").trim()) : 0;
            int pageSize = request.getParameter("rows") != null ? Integer.valueOf(request.getParameter("rows").trim()) : 0;
            List<ManageUserBean> ed_list = ManageUserDAO.getListOfUser();
            JSONObject responcedata = new JSONObject();
            JSONArray cell = new JSONArray();
            int i = 1;
            for (ManageUserBean object : ed_list) {
                ManageUserBean list = (ManageUserBean) object;
                JSONObject cellobj = new JSONObject();
                cellobj.put("ID", list.getID());
                cellobj.put("FirstName", list.getFirstName());
                cellobj.put("LastName", list.getLastName());
                cellobj.put("UserID", list.getUserID());
                cellobj.put("PassWord", list.getPassWord());
                cellobj.put("UserRole", list.getUserRole());
                cellobj.put("ModifiedDate", DateUtil.converDateFormatToString(list.getModifiedDate(), "YYYY-MM-DD HH:MM:SS", "MM-dd-YYYY"));
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

    public void deleteUserDetailById() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            int user_id = request.getParameter("ID") != null ? Integer.valueOf(request.getParameter("ID").trim()) : 0;
            ManageUserDAO.deleteUserDetailById(user_id);
            JSONObject responcedata = new JSONObject();
            responcedata.put("successDelete", "User Detail Deleted Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void updateUserDetails() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
//        String oper = request.getParameter("oper") != null ? (String) request.getParameter("oper").trim() : "";
        int userId = request.getParameter("ID") != null ? Integer.valueOf(request.getParameter("ID").trim()) : 0;
        String firstName = request.getParameter("FirstName") != null ? request.getParameter("FirstName").trim() : "";
        String lastName = request.getParameter("LastName") != null ? request.getParameter("LastName").trim() : "";
        String username = request.getParameter("UserID") != null ? request.getParameter("UserID").trim() : "";
        String password = request.getParameter("PassWord") != null ? request.getParameter("PassWord").trim() : "";
        String userRole = request.getParameter("UserRole") != null ? request.getParameter("UserRole").trim() : "";
        String modifiedDate = request.getParameter("ModifiedDate") != null ? request.getParameter("ModifiedDate").trim() : "";
        ManageUserBean manageUserBean = new ManageUserBean();
        try {
            manageUserBean.setID(userId);
            manageUserBean.setFirstName(firstName);
            manageUserBean.setLastName(lastName);
            manageUserBean.setUserID(username);
            manageUserBean.setPassWord(password);
            manageUserBean.setUserRole(userRole);
            manageUserBean.setModifiedDate(DateUtil.convertStringToSqlDate(modifiedDate, "yyyy-MM-dd HH:mm:ss"));
            //Database call to update record
            ManageUserDAO.updateUserDetails(manageUserBean);

            JSONObject responcedata = new JSONObject();
            responcedata.put("successEdit", "User Detail Updated Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void addUserDetails() throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();;
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
        String oper = request.getParameter("oper") != null ? (String) request.getParameter("oper").trim() : "";
        String firstName = request.getParameter("FirstName") != null ? request.getParameter("FirstName").trim() : "";
        String lastName = request.getParameter("LastName") != null ? request.getParameter("LastName").trim() : "";
        String username = request.getParameter("UserID") != null ? request.getParameter("UserID").trim() : "";
        String password = request.getParameter("PassWord") != null ? request.getParameter("PassWord").trim() : "";
        String userRole = request.getParameter("UserRole") != null ? request.getParameter("UserRole").trim() : "";
        String modifiedDate = request.getParameter("ModifiedDate") != null ? request.getParameter("ModifiedDate").trim() : "";
        ManageUserBean manageUserBean = new ManageUserBean();
        try {
            manageUserBean.setFirstName(firstName);
            manageUserBean.setLastName(lastName);
            manageUserBean.setUserID(username);
            manageUserBean.setPassWord(password);
            manageUserBean.setUserRole(userRole);
            manageUserBean.setModifiedDate(DateUtil.convertStringToSqlDate(modifiedDate, "yyyy-MM-dd HH:mm:ss"));
            //Database call to update record
            ManageUserDAO.SaveUserDetails(manageUserBean);

            JSONObject responcedata = new JSONObject();
            responcedata.put("successAdd", "User Details Added Successfully !!");
            response.setContentType("application/json");
            response.getWriter().write(responcedata.toString());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public void getUserRoles() throws Exception {
        try {
            HttpServletResponse response = ServletActionContext.getResponse();;
            JSONObject responcedata = new JSONObject();
            JSONArray cell = new JSONArray();
            String init = "0";
            String data = "<select><option value=" + init + ">--Select One--</option>";
            data += "<option value=Administrator>Administrator</option>";
            data += "<option value=ReadOnly>ReadOnly</option>";
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
