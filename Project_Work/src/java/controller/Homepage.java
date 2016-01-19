/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import static com.opensymphony.xwork2.Action.SUCCESS;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.work.dao.AuthenticateDAO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import model.Message;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author arpit.khatri
 */
public class Homepage extends ActionSupport {

    @Override
    public String execute() {
        HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
        HttpSession session = request.getSession();
        if (session != null && session.getAttribute("UserName") != "") {
            return "SUCCESS";
        } else {
            addActionMessage("Sorry, User Not Found ..!!.");
            return "ERROR";
        }
    }

}
