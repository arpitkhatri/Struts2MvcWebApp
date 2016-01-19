/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.dao;

import com.opensymphony.xwork2.ActionContext;
import com.work.formbean.DeviceCategoryBean;
import com.work.formbean.DeviceSubCategoryBean;
import com.work.formbean.DeviceTypeBean;
import com.work.formbean.ManageUserBean;
import com.work.formbean.OotmConnectionPointBean;
import com.work.formbean.PlatformBean;
import com.work.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author arpit.khatri
 */
public class OotmConnectionPointDAO {

    public static List<OotmConnectionPointBean> getListOfConnectionPoint() {
        List<OotmConnectionPointBean> listOfUser = new ArrayList<OotmConnectionPointBean>();
        Connection con = null, connectionForPlatform = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String s = "SELECT * FROM ottm_conn_point";
            ResultSet rs = statement.executeQuery(s);
            int g = 0;
            while (rs.next()) {
                OotmConnectionPointBean ootmConPointBean = new OotmConnectionPointBean();
                ootmConPointBean.setCollected_Dev_ID(rs.getInt("Collected_Dev_ID"));
                ootmConPointBean.setCollected_Dev_CODE(rs.getString("Collected_Dev_CODE"));
                ootmConPointBean.setCollected_Dev_Name(rs.getString("Collected_Dev_Name"));
                ootmConPointBean.setCollected_Dev_Make(rs.getString("Collected_Dev_Make"));
                ootmConPointBean.setInternet_Capable(rs.getString("Internet_Capable").charAt(0));
                ootmConPointBean.setReported_Device_Type(rs.getString("Reported_Device_Type"));
                ootmConPointBean.setReported_Dev_Name(rs.getString("Reported_Dev_Name"));
                ootmConPointBean.setReported_Dev_Id(rs.getInt("Reported_Dev_ID"));
                ootmConPointBean.setDEVICE_SUBCATEGORY_ID(rs.getInt("DEVICE_SUBCATEGORY_ID"));
                int devicesubcategoryId = rs.getInt("DEVICE_SUBCATEGORY_ID");
                System.out.println("Device Subcategory Id"+devicesubcategoryId);  
                try {
                    connectionForPlatform = DatabaseConnection.getConnection();
                    Statement stm = connectionForPlatform.createStatement();
                    String sqlQuery = "SELECT * FROM device_subcategory where DEVICE_subcategory_ID =" + devicesubcategoryId;
                    ResultSet resultset = stm.executeQuery(sqlQuery);
                    while (resultset.next()) {
                        DeviceSubCategoryBean deviceSubcategoryBean = new DeviceSubCategoryBean();
                        deviceSubcategoryBean.setDEVICE_SUBCATEGORY_ID(resultset.getInt("DEVICE_SUBCATEGORY_ID"));
                        deviceSubcategoryBean.setACTIVE_STATUS(resultset.getString("ACTIVE_STATUS").charAt(0));
                        deviceSubcategoryBean.setEFFECTIVE_START_DATETIME(resultset.getDate("EFFECTIVE_START_DATETIME"));
                        deviceSubcategoryBean.setEFFECTIVE_END_DATETIME(resultset.getDate("EFFECTIVE_END_DATETIME"));
                        deviceSubcategoryBean.setCREATE_DATETIME(resultset.getDate("CREATE_DATETIME"));
                        deviceSubcategoryBean.setUPDATED_DATETIME(resultset.getDate("UPDATED_DATETIME"));
                        deviceSubcategoryBean.setDEVICE_SUBCategory_CODE(resultset.getString("DEVICE_SUBCategory_CODE"));
                        deviceSubcategoryBean.setDEVICE_SUBCategory_DESC(resultset.getString("DEVICE_SUBCategory_DESC"));
                        ootmConPointBean.setDeviceSubCategoryBean(deviceSubcategoryBean);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    DatabaseConnection.closeConnection(connectionForPlatform);
                }

                listOfUser.add(ootmConPointBean);
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return listOfUser;
    }

    public static void deleteOotmConnectionPoint(int CollectedDevID) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String sql = "DELETE FROM ottm_conn_point "
                    + "WHERE Collected_Dev_ID =" + CollectedDevID;
            statement.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void saveootmConnectionPointBean(OotmConnectionPointBean ootmConnectionPointBean) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // the mysql insert statement
            String query = "INSERT INTO work.ottm_conn_point (Collected_Dev_CODE, Collected_Dev_Name, Collected_Dev_Make , Internet_Capable , Reported_Device_Type, Reported_Dev_Name,Reported_Dev_ID,DEVICE_SUBCATEGORY_ID) "
                    + " values (?, ?, ?, ?, ?,?,?,?)";

            // create the mysql insert preparedstatement
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, ootmConnectionPointBean.getCollected_Dev_CODE());
            ps.setString(2, ootmConnectionPointBean.getCollected_Dev_Name());
            ps.setString(3, ootmConnectionPointBean.getCollected_Dev_Make());
            ps.setString(4, String.valueOf(ootmConnectionPointBean.getInternet_Capable()));
            ps.setString(5, ootmConnectionPointBean.getReported_Device_Type());
            ps.setString(6, ootmConnectionPointBean.getReported_Dev_Name());
            ps.setInt(7, ootmConnectionPointBean.getReported_Dev_Id());
            ps.setInt(8, ootmConnectionPointBean.getDEVICE_SUBCATEGORY_ID());
            ps.execute();
            ps.close();
   
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void UpdateootmConnectionPointBean(OotmConnectionPointBean ootmConnectionPointBean) {

        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // set the preparedstatement parameters
            PreparedStatement ps = con.prepareStatement(
                    "UPDATE ottm_conn_point SET Collected_Dev_CODE =?, Collected_Dev_Name =?, Collected_Dev_Make =?, Internet_Capable =?, Reported_Device_Type =?, Reported_Dev_Name =?,Reported_Dev_ID= ?,DEVICE_SUBCATEGORY_ID= ? where Collected_Dev_ID =?");
            ps.setString(1, ootmConnectionPointBean.getCollected_Dev_CODE());
            ps.setString(2, ootmConnectionPointBean.getCollected_Dev_Name());
            ps.setString(3, ootmConnectionPointBean.getCollected_Dev_Make());
            ps.setString(4, String.valueOf(ootmConnectionPointBean.getInternet_Capable()));
            ps.setString(5, ootmConnectionPointBean.getReported_Device_Type());
            ps.setString(6, ootmConnectionPointBean.getReported_Dev_Name());
            ps.setInt(7, ootmConnectionPointBean.getReported_Dev_Id());
            ps.setInt(8, ootmConnectionPointBean.getDEVICE_SUBCATEGORY_ID());
            ps.setInt(9, ootmConnectionPointBean.getCollected_Dev_ID());

            // call executeUpdate to execute our sql update statement
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static List<DeviceCategoryBean> getUniqueDeviceCategoryCode() {
        List<DeviceCategoryBean> listOfDeviceCategorybean = new ArrayList<DeviceCategoryBean>();
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String s = "SELECT *  FROM `work`.device_category d group by DEVICE_CATEGORY_CODE";

            ResultSet rs = statement.executeQuery(s);
            int g = 0;
            while (rs.next()) {
                DeviceCategoryBean deviceCategorybean = new DeviceCategoryBean();
                deviceCategorybean.setDEVICE_TYPE_ID(rs.getInt("DEVICE_TYPE_ID"));
                deviceCategorybean.setDEVICE_Category_CODE(rs.getString("DEVICE_Category_CODE"));
                deviceCategorybean.setDEVICE_Category_DESC(rs.getString("DEVICE_Category_DESC"));
                deviceCategorybean.setACTIVE_STATUS(rs.getString("ACTIVE_STATUS").charAt(0));
                deviceCategorybean.setEFFECTIVE_START_DATETIME(rs.getDate("EFFECTIVE_START_DATETIME"));
                deviceCategorybean.setEFFECTIVE_END_DATETIME(rs.getDate("EFFECTIVE_END_DATETIME"));
                deviceCategorybean.setCREATE_DATETIME(rs.getDate("CREATE_DATETIME"));
                deviceCategorybean.setUPDATED_DATETIME(rs.getDate("UPDATED_DATETIME"));
                deviceCategorybean.setDEVICE_CATEGORY_ID(rs.getInt("DEVICE_CATEGORY_ID"));
                listOfDeviceCategorybean.add(deviceCategorybean);
            }
            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return listOfDeviceCategorybean;
    }

    public static boolean validateCollectedDevCode(String CollectedDevCODE) {
        boolean status = false;
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(
                    "select * from ottm_conn_point where Collected_Dev_CODE=?");
            ps.setString(1, CollectedDevCODE);
            ResultSet rs = ps.executeQuery();
            status = rs.next();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return status;
    }

}
