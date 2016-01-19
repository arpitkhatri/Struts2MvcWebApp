/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.dao;

import com.opensymphony.xwork2.ActionContext;
import com.work.formbean.AuthenticateBean;
import com.work.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author arpit.khatri
 */
public class AuthenticateDAO {

    public static boolean validate(AuthenticateBean authenticateBean) {
        boolean status = false;
        Connection con = null;
        try {
            con=DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(
                    "select * from ottm_userauth where userID=? and Password=?");
            ps.setString(1, authenticateBean.getUserId());
            ps.setString(2, authenticateBean.getPassword());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                status = true;
                String userRole = rs.getString("UserRole");
                System.out.println("User Role" + "\t" + userRole);
                HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
                HttpSession session = request.getSession();
                session.setAttribute("UserRole", userRole);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return status;
    }

}
