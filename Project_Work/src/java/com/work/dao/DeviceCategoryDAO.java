/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.dao;

import com.work.formbean.DeviceCategoryBean;
import com.work.formbean.DeviceTypeBean;
import com.work.formbean.ManageUserBean;
import com.work.formbean.PlatformBean;
import com.work.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author arpit.khatri
 */
public class DeviceCategoryDAO {

    public static List<DeviceCategoryBean> getListDeviceCategory() {
        List<DeviceCategoryBean> listOfUser = new ArrayList<DeviceCategoryBean>();
        Connection con = null, connectionForPlatform = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String s = "SELECT * FROM device_category";

            ResultSet rs = statement.executeQuery(s);
            int g = 0;
            while (rs.next()) {
                DeviceCategoryBean deviceCateogrybean = new DeviceCategoryBean();
                deviceCateogrybean.setDEVICE_CATEGORY_ID(rs.getInt("DEVICE_CATEGORY_ID"));
                deviceCateogrybean.setDEVICE_Category_CODE(rs.getString("DEVICE_Category_CODE"));
                deviceCateogrybean.setDEVICE_Category_DESC(rs.getString("DEVICE_Category_DESC"));
                deviceCateogrybean.setACTIVE_STATUS(rs.getString("ACTIVE_STATUS").charAt(0));
                deviceCateogrybean.setEFFECTIVE_START_DATETIME(rs.getDate("EFFECTIVE_START_DATETIME"));
                deviceCateogrybean.setEFFECTIVE_END_DATETIME(rs.getDate("EFFECTIVE_END_DATETIME"));
                deviceCateogrybean.setCREATE_DATETIME(rs.getDate("CREATE_DATETIME"));
                deviceCateogrybean.setUPDATED_DATETIME(rs.getDate("UPDATED_DATETIME"));
                deviceCateogrybean.setDEVICE_TYPE_ID(rs.getInt("DEVICE_TYPE_ID"));
                int deviceTypeId = rs.getInt("DEVICE_TYPE_ID");
                try {
                    connectionForPlatform = DatabaseConnection.getConnection();
                    Statement stm = connectionForPlatform.createStatement();
                    String sqlQuery = "SELECT * FROM device_type where DEVICE_TYPE_ID =" + deviceTypeId;
                    ResultSet resultset = stm.executeQuery(sqlQuery);
                    while (resultset.next()) {
                        DeviceTypeBean deviceTypebean = new DeviceTypeBean();
                        deviceTypebean.setDEVICE_TYPE_ID(resultset.getInt("DEVICE_TYPE_ID"));

                        deviceTypebean.setACTIVE_STATUS(resultset.getString("ACTIVE_STATUS").charAt(0));
                        deviceTypebean.setEFFECTIVE_START_DATETIME(resultset.getDate("EFFECTIVE_START_DATETIME"));
                        deviceTypebean.setEFFECTIVE_END_DATETIME(resultset.getDate("EFFECTIVE_END_DATETIME"));
                        deviceTypebean.setCREATE_DATETIME(resultset.getDate("CREATE_DATETIME"));
                        deviceTypebean.setUPDATED_DATETIME(resultset.getDate("UPDATED_DATETIME"));
                        deviceTypebean.setPLATFORM_ID(resultset.getInt("PLATFORM_ID"));
                        deviceTypebean.setDEVICE_TYPE_CODE(resultset.getString("DEVICE_TYPE_CODE"));
                        deviceTypebean.setDEVICE_TYPE_DESC(resultset.getString("DEVICE_TYPE_DESC"));
                        deviceCateogrybean.setDeviceTypeBean(deviceTypebean);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    DatabaseConnection.closeConnection(connectionForPlatform);
                }

                listOfUser.add(deviceCateogrybean);
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return listOfUser;
    }

    public static void deleteDeviceCategory(int deviceCategoryId) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String sql = "DELETE FROM device_type "
                    + "WHERE DEVICE_TYPE_ID =" + deviceCategoryId;
            statement.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void saveDeviceCategory(DeviceCategoryBean deviceCategoryBean) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // the mysql insert statement
            String query = "INSERT INTO work.device_category (DEVICE_CATEGORY_DESC, DEVICE_CATEGORY_CODE, DEVICE_TYPE_ID, ACTIVE_STATUS, EFFECTIVE_START_DATETIME, EFFECTIVE_END_DATETIME, CREATE_DATETIME, UPDATED_DATETIME) "
                    + " values (?, ?, ?, ?, ?,?,?,?)";

            // create the mysql insert preparedstatement
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, deviceCategoryBean.getDEVICE_Category_DESC());
            ps.setString(2, deviceCategoryBean.getDEVICE_Category_CODE());
            ps.setInt(3, deviceCategoryBean.getDEVICE_TYPE_ID());
            ps.setString(4, String.valueOf(deviceCategoryBean.getACTIVE_STATUS()));
            ps.setDate(5, deviceCategoryBean.getEFFECTIVE_START_DATETIME());
            ps.setDate(6, deviceCategoryBean.getEFFECTIVE_END_DATETIME());
            ps.setDate(7, deviceCategoryBean.getCREATE_DATETIME());
            ps.setDate(8, deviceCategoryBean.getUPDATED_DATETIME());
            ps.execute();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void updateDeviceCateogry(DeviceCategoryBean deviceCategoryBean) {

        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // set the preparedstatement parameters
            PreparedStatement ps = con.prepareStatement(
                    "UPDATE device_category SET DEVICE_CATEGORY_DESC =?, DEVICE_CATEGORY_CODE =?, DEVICE_TYPE_ID =?, ACTIVE_STATUS =?, EFFECTIVE_START_DATETIME =?, EFFECTIVE_END_DATETIME =?,CREATE_DATETIME= ?,UPDATED_DATETIME= ? where DEVICE_CATEGORY_ID =?");
            ps.setString(1, deviceCategoryBean.getDEVICE_Category_DESC());
            ps.setString(2, deviceCategoryBean.getDEVICE_Category_CODE());
            ps.setInt(3, deviceCategoryBean.getDEVICE_TYPE_ID());
            ps.setString(4, String.valueOf(deviceCategoryBean.getACTIVE_STATUS()));
            ps.setDate(5, deviceCategoryBean.getEFFECTIVE_START_DATETIME());
            ps.setDate(6, deviceCategoryBean.getEFFECTIVE_END_DATETIME());
            ps.setDate(7, deviceCategoryBean.getCREATE_DATETIME());
            ps.setDate(8, deviceCategoryBean.getUPDATED_DATETIME());
            ps.setInt(9, deviceCategoryBean.getDEVICE_CATEGORY_ID());

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

    public static boolean validateDeviceCategoryCode(String deviceCategoryCode) {
        boolean status = false;
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(
                    "select * from device_category where DEVICE_Category_CODE=?");
            ps.setString(1, deviceCategoryCode);
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
