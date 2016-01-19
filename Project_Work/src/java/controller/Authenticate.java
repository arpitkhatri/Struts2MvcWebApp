/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.work.dao.AuthenticateDAO;
import com.work.formbean.AuthenticateBean;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author arpit.khatri
 */
public class Authenticate extends ActionSupport implements ModelDriven<AuthenticateBean> {

    private AuthenticateBean authenticateBean;

    @Override
    public String execute() {
        if (AuthenticateDAO.validate(authenticateBean)) {
            HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
            HttpSession session = request.getSession();
            String username = (String) authenticateBean.getUserId();
            session.setAttribute("UserName", username);
            return "SUCCESS";
        } else {
            addActionMessage("Sorry, User Not Found ..!!.");
            return "ERROR";
        }

    }

    public AuthenticateBean getAuthenticateBean() {
        return authenticateBean;
    }

    public void setAuthenticateBean(AuthenticateBean authenticateBean) {
        this.authenticateBean = authenticateBean;
    }

    @Override
    public AuthenticateBean getModel() {
        return authenticateBean;
    }

}
