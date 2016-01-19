/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.dao;

import com.work.formbean.ManageUserBean;
import com.work.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author arpit.khatri
 */
public class ManageUserDAO {

    public static List<ManageUserBean> getListOfUser() {
        List<ManageUserBean> listOfUser = new ArrayList<ManageUserBean>();
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String s = "SELECT * FROM ottm_userauth";

            ResultSet rs = statement.executeQuery(s);
            int g = 0;
            System.out.println(" Inside Dao");
            while (rs.next()) {
                ManageUserBean manageUserBean = new ManageUserBean();
                manageUserBean.setID(rs.getInt("ID"));
                manageUserBean.setFirstName(rs.getString("FirstName"));
                manageUserBean.setLastName(rs.getString("LastName"));
                manageUserBean.setUserID(rs.getString("UserID"));
                manageUserBean.setPassWord(rs.getString("PassWord"));
                manageUserBean.setUserRole(rs.getString("UserRole"));
                manageUserBean.setModifiedDate(rs.getDate("ModifiedDate"));

                listOfUser.add(manageUserBean);
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return listOfUser;
    }

    public static void deleteUserDetailById(int user_id) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String sql = "DELETE FROM ottm_userauth "
                    + "WHERE ID =" + user_id;
            statement.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void updateUserDetails(ManageUserBean manageUserBean) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // set the preparedstatement parameters
            PreparedStatement ps = con.prepareStatement(
                    "UPDATE ottm_userauth SET FirstName =?, LastName =?, UserID =?, PassWord =?, UserRole =?, ModifiedDate =? where ID =?");
            ps.setString(1, manageUserBean.getFirstName());
            ps.setString(2, manageUserBean.getLastName());
            ps.setString(3, manageUserBean.getUserID());
            ps.setString(4, manageUserBean.getPassWord());
            ps.setString(5, manageUserBean.getUserRole());
            ps.setDate(6, manageUserBean.getModifiedDate());
            ps.setInt(7, manageUserBean.getID());

            // call executeUpdate to execute our sql update statement
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void SaveUserDetails(ManageUserBean manageUserBean) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // the mysql insert statement
            String query = "INSERT INTO ottm_userauth (FirstName, LastName, UserID, Password, UserRole, ModifiedDate) "
                    + " values (?, ?, ?, ?, ?,?)";

            // create the mysql insert preparedstatement
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, manageUserBean.getFirstName());
            ps.setString(2, manageUserBean.getLastName());
            ps.setString(3, manageUserBean.getUserID());
            ps.setString(4, manageUserBean.getPassWord());
            ps.setString(5, manageUserBean.getUserRole());
            ps.setDate(6, manageUserBean.getModifiedDate());
            ps.execute();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

}
