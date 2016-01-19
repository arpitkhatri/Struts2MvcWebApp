/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.dao;

import com.work.formbean.DeviceCategoryBean;
import com.work.formbean.DeviceSubCategoryBean;
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
public class DeviceSubCategoryDAO {

    public static List<DeviceSubCategoryBean> getListDeviceSubCategory() {
        List<DeviceSubCategoryBean> listOfDeviceSubCategory = new ArrayList<DeviceSubCategoryBean>();
        Connection con = null, connectionForPlatform = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String s = "SELECT * FROM device_subcategory";

            ResultSet rs = statement.executeQuery(s);
            int g = 0;
            while (rs.next()) {
                DeviceSubCategoryBean deviceSubCateogrybean = new DeviceSubCategoryBean();
                deviceSubCateogrybean.setDEVICE_SUBCATEGORY_ID(rs.getInt("DEVICE_SUBCATEGORY_ID"));
                deviceSubCateogrybean.setDEVICE_SUBCategory_CODE(rs.getString("DEVICE_SUBCategory_CODE"));
                deviceSubCateogrybean.setDEVICE_SUBCategory_DESC(rs.getString("DEVICE_SUBCategory_DESC"));
                deviceSubCateogrybean.setACTIVE_STATUS(rs.getString("ACTIVE_STATUS").charAt(0));
                deviceSubCateogrybean.setEFFECTIVE_START_DATETIME(rs.getDate("EFFECTIVE_START_DATETIME"));
                deviceSubCateogrybean.setEFFECTIVE_END_DATETIME(rs.getDate("EFFECTIVE_END_DATETIME"));
                deviceSubCateogrybean.setCREATE_DATETIME(rs.getDate("CREATE_DATETIME"));
                deviceSubCateogrybean.setUPDATED_DATETIME(rs.getDate("UPDATED_DATETIME"));
                deviceSubCateogrybean.setDEVICE_CATEGORY_ID(rs.getInt("DEVICE_CATEGORY_ID"));
                int deviceCategoryId = rs.getInt("DEVICE_CATEGORY_ID");
                try {
                    connectionForPlatform = DatabaseConnection.getConnection();
                    Statement stm = connectionForPlatform.createStatement();
                    String sqlQuery = "SELECT * FROM device_category where DEVICE_CATEGORY_ID =" + deviceCategoryId;
                    ResultSet resultset = stm.executeQuery(sqlQuery);
                    while (resultset.next()) {
                        DeviceCategoryBean deviceCategorybean = new DeviceCategoryBean();
                        deviceCategorybean.setDEVICE_TYPE_ID(resultset.getInt("DEVICE_TYPE_ID"));
                        deviceCategorybean.setACTIVE_STATUS(resultset.getString("ACTIVE_STATUS").charAt(0));
                        deviceCategorybean.setEFFECTIVE_START_DATETIME(resultset.getDate("EFFECTIVE_START_DATETIME"));
                        deviceCategorybean.setEFFECTIVE_END_DATETIME(resultset.getDate("EFFECTIVE_END_DATETIME"));
                        deviceCategorybean.setCREATE_DATETIME(resultset.getDate("CREATE_DATETIME"));
                        deviceCategorybean.setUPDATED_DATETIME(resultset.getDate("UPDATED_DATETIME"));
                        deviceCategorybean.setDEVICE_CATEGORY_ID(resultset.getInt("DEVICE_CATEGORY_ID"));
                        deviceCategorybean.setDEVICE_Category_CODE(resultset.getString("DEVICE_CATEGORY_CODE"));
                        deviceCategorybean.setDEVICE_Category_DESC(resultset.getString("DEVICE_CATEGORY_DESC"));
                        deviceSubCateogrybean.setDeviceCategoryBean(deviceCategorybean);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    DatabaseConnection.closeConnection(connectionForPlatform);
                }

                listOfDeviceSubCategory.add(deviceSubCateogrybean);
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return listOfDeviceSubCategory;
    }

    public static void deleteDeviceSubCategory(int deviceSubCategoryId) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String sql = "DELETE FROM device_subcategory "
                    + "WHERE DEVICE_SUBCATEGORY_ID =" + deviceSubCategoryId;
            statement.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void saveDeviceSubCategory(DeviceSubCategoryBean deviceSubCategoryBean) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // the mysql insert statement
            String query = "INSERT INTO work.device_subcategory (DEVICE_SUBCATEGORY_DESC, DEVICE_SUBCATEGORY_CODE, DEVICE_CATEGORY_ID, ACTIVE_STATUS, EFFECTIVE_START_DATETIME, EFFECTIVE_END_DATETIME, CREATE_DATETIME, UPDATED_DATETIME) "
                    + " values (?, ?, ?, ?, ?,?,?,?)";

            // create the mysql insert preparedstatement
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, deviceSubCategoryBean.getDEVICE_SUBCategory_DESC());
            ps.setString(2, deviceSubCategoryBean.getDEVICE_SUBCategory_CODE());
            ps.setInt(3, deviceSubCategoryBean.getDEVICE_CATEGORY_ID());
            ps.setString(4, String.valueOf(deviceSubCategoryBean.getACTIVE_STATUS()));
            ps.setDate(5, deviceSubCategoryBean.getEFFECTIVE_START_DATETIME());
            ps.setDate(6, deviceSubCategoryBean.getEFFECTIVE_END_DATETIME());
            ps.setDate(7, deviceSubCategoryBean.getCREATE_DATETIME());
            ps.setDate(8, deviceSubCategoryBean.getUPDATED_DATETIME());
            ps.execute();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void updateDeviceSubCateogry(DeviceSubCategoryBean deviceSubCategoryBean) {

        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // set the preparedstatement parameters
            PreparedStatement ps = con.prepareStatement(
                    "UPDATE device_subcategory SET DEVICE_SUBCATEGORY_DESC =?, DEVICE_SUBCATEGORY_CODE =?, DEVICE_CATEGORY_ID =?, ACTIVE_STATUS =?, EFFECTIVE_START_DATETIME =?, EFFECTIVE_END_DATETIME =?,CREATE_DATETIME= ?,UPDATED_DATETIME= ? where DEVICE_SUBCATEGORY_ID =?");
            ps.setString(1, deviceSubCategoryBean.getDEVICE_SUBCategory_DESC());
            ps.setString(2, deviceSubCategoryBean.getDEVICE_SUBCategory_CODE());
            ps.setInt(3, deviceSubCategoryBean.getDEVICE_CATEGORY_ID());
            ps.setString(4, String.valueOf(deviceSubCategoryBean.getACTIVE_STATUS()));
            ps.setDate(5, deviceSubCategoryBean.getEFFECTIVE_START_DATETIME());
            ps.setDate(6, deviceSubCategoryBean.getEFFECTIVE_END_DATETIME());
            ps.setDate(7, deviceSubCategoryBean.getCREATE_DATETIME());
            ps.setDate(8, deviceSubCategoryBean.getUPDATED_DATETIME());
            ps.setInt(9, deviceSubCategoryBean.getDEVICE_SUBCATEGORY_ID());

            // call executeUpdate to execute our sql update statement
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static List<DeviceSubCategoryBean> getUniqueDeviceSubCategoryCode() {
        List<DeviceSubCategoryBean> listOfDeviceSubCategorybean = new ArrayList<DeviceSubCategoryBean>();
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String s = "SELECT *  FROM `work`.device_subcategory d group by DEVICE_SUBCATEGORY_CODE";

            ResultSet rs = statement.executeQuery(s);
            int g = 0;
            while (rs.next()) {
                DeviceSubCategoryBean deviceSubCateogrybean = new DeviceSubCategoryBean();
                deviceSubCateogrybean.setDEVICE_SUBCATEGORY_ID(rs.getInt("DEVICE_SUBCATEGORY_ID"));
                deviceSubCateogrybean.setDEVICE_SUBCategory_CODE(rs.getString("DEVICE_SUBCategory_CODE"));
                deviceSubCateogrybean.setDEVICE_SUBCategory_DESC(rs.getString("DEVICE_SUBCategory_DESC"));
                deviceSubCateogrybean.setACTIVE_STATUS(rs.getString("ACTIVE_STATUS").charAt(0));
                deviceSubCateogrybean.setEFFECTIVE_START_DATETIME(rs.getDate("EFFECTIVE_START_DATETIME"));
                deviceSubCateogrybean.setEFFECTIVE_END_DATETIME(rs.getDate("EFFECTIVE_END_DATETIME"));
                deviceSubCateogrybean.setCREATE_DATETIME(rs.getDate("CREATE_DATETIME"));
                deviceSubCateogrybean.setUPDATED_DATETIME(rs.getDate("UPDATED_DATETIME"));
                deviceSubCateogrybean.setDEVICE_CATEGORY_ID(rs.getInt("DEVICE_CATEGORY_ID"));
                listOfDeviceSubCategorybean.add(deviceSubCateogrybean);
            }
            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return listOfDeviceSubCategorybean;
    }

    public static boolean validateDeviceSubCategoryCode(String deviceSubCategoryCode) {
           boolean status = false;
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(
                    "select * from device_subcategory where DEVICE_SUBCategory_CODE=?");
            ps.setString(1, deviceSubCategoryCode);
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
