/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.dao;

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

/**
 *
 * @author arpit.khatri
 */
public class DeviceTypeDAO {

    public static List<DeviceTypeBean> getListDevices() {
        List<DeviceTypeBean> listOfUser = new ArrayList<DeviceTypeBean>();
        Connection con = null, connectionForPlatform = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String s = "SELECT * FROM device_type";

            ResultSet rs = statement.executeQuery(s);
            int g = 0;
            while (rs.next()) {
                DeviceTypeBean deviceTypebean = new DeviceTypeBean();
                deviceTypebean.setDEVICE_TYPE_ID(rs.getInt("DEVICE_TYPE_ID"));
                deviceTypebean.setDEVICE_TYPE_CODE(rs.getString("DEVICE_TYPE_CODE"));
                deviceTypebean.setDEVICE_TYPE_DESC(rs.getString("DEVICE_TYPE_DESC"));
                deviceTypebean.setACTIVE_STATUS(rs.getString("ACTIVE_STATUS").charAt(0));
                deviceTypebean.setEFFECTIVE_START_DATETIME(rs.getDate("EFFECTIVE_START_DATETIME"));
                deviceTypebean.setEFFECTIVE_END_DATETIME(rs.getDate("EFFECTIVE_END_DATETIME"));
                deviceTypebean.setCREATE_DATETIME(rs.getDate("CREATE_DATETIME"));
                deviceTypebean.setUPDATED_DATETIME(rs.getDate("UPDATED_DATETIME"));
                deviceTypebean.setPLATFORM_ID(rs.getInt("PLATFORM_ID"));
                int platformId = rs.getInt("PLATFORM_ID");
                try {
                    connectionForPlatform = DatabaseConnection.getConnection();
                    Statement stm = connectionForPlatform.createStatement();
                    String sqlQuery = "SELECT * FROM platform where PLATFORM_ID =" + platformId;
                    ResultSet resultset = stm.executeQuery(sqlQuery);
                    while (resultset.next()) {
                        PlatformBean platformBean = new PlatformBean();
                        platformBean.setPLATFORM_ID(resultset.getInt("PLATFORM_ID"));
                        platformBean.setPLATFORM_CODE(resultset.getString("PLATFORM_CODE"));
                        platformBean.setPLATFORM_DESC(resultset.getString("PLATFORM_DESC"));
                        platformBean.setACTIVE_STATUS(resultset.getString("ACTIVE_STATUS").charAt(0));
                        platformBean.setEFFECTIVE_START_DATETIME(resultset.getDate("EFFECTIVE_START_DATETIME"));
                        platformBean.setEFFECTIVE_END_DATETIME(resultset.getDate("EFFECTIVE_END_DATETIME"));
                        platformBean.setCREATE_DATETIME(resultset.getDate("CREATE_DATETIME"));
                        platformBean.setUPDATED_DATETIME(resultset.getDate("UPDATED_DATETIME"));
                        deviceTypebean.setPlatformBean(platformBean);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    DatabaseConnection.closeConnection(connectionForPlatform);
                }

                listOfUser.add(deviceTypebean);
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return listOfUser;
    }

    public static void deleteDeviceType(int deviceId) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String sql = "DELETE FROM device_type "
                    + "WHERE DEVICE_TYPE_ID =" + deviceId;
            statement.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void saveDeviceTypeDetails(DeviceTypeBean deviceTyepBean) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // the mysql insert statement
            String query = "INSERT INTO device_type (DEVICE_TYPE_DESC, DEVICE_TYPE_CODE, PLATFORM_ID, ACTIVE_STATUS, EFFECTIVE_START_DATETIME, EFFECTIVE_END_DATETIME, CREATE_DATETIME, UPDATED_DATETIME) "
                    + " values (?, ?, ?, ?, ?,?,?,?)";

            // create the mysql insert preparedstatement
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, deviceTyepBean.getDEVICE_TYPE_DESC());
            ps.setString(2, deviceTyepBean.getDEVICE_TYPE_CODE());
            ps.setInt(3, deviceTyepBean.getPLATFORM_ID());
            ps.setString(4, String.valueOf(deviceTyepBean.getACTIVE_STATUS()));
            ps.setDate(5, deviceTyepBean.getEFFECTIVE_START_DATETIME());
            ps.setDate(6, deviceTyepBean.getEFFECTIVE_END_DATETIME());
            ps.setDate(7, deviceTyepBean.getCREATE_DATETIME());
            ps.setDate(8, deviceTyepBean.getUPDATED_DATETIME());
            ps.execute();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void updateDeviceDetails(DeviceTypeBean deviceTyepBean) {

        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // set the preparedstatement parameters
            PreparedStatement ps = con.prepareStatement(
                    "UPDATE device_type SET DEVICE_TYPE_DESC =?, DEVICE_TYPE_CODE =?, PLATFORM_ID =?, ACTIVE_STATUS =?, EFFECTIVE_START_DATETIME =?, EFFECTIVE_END_DATETIME =?,CREATE_DATETIME= ?,UPDATED_DATETIME= ? where DEVICE_TYPE_ID =?");
            ps.setString(1, deviceTyepBean.getDEVICE_TYPE_DESC());
            ps.setString(2, deviceTyepBean.getDEVICE_TYPE_CODE());
            ps.setInt(3, deviceTyepBean.getPLATFORM_ID());
            ps.setString(4, String.valueOf(deviceTyepBean.getACTIVE_STATUS()));
            ps.setDate(5, deviceTyepBean.getEFFECTIVE_START_DATETIME());
            ps.setDate(6, deviceTyepBean.getEFFECTIVE_END_DATETIME());
            ps.setDate(7, deviceTyepBean.getCREATE_DATETIME());
            ps.setDate(8, deviceTyepBean.getUPDATED_DATETIME());
            ps.setInt(9, deviceTyepBean.getDEVICE_TYPE_ID());

            // call executeUpdate to execute our sql update statement
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static List<DeviceTypeBean> getUniqueDeviceTypeCode() {
        List<DeviceTypeBean> listOfDeviceTypebean = new ArrayList<DeviceTypeBean>();
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String s = "SELECT *  FROM `work`.device_type d group by DEVICE_TYPE_CODE";

            ResultSet rs = statement.executeQuery(s);
            int g = 0;
            while (rs.next()) {
                DeviceTypeBean deviceTypebean = new DeviceTypeBean();
                deviceTypebean.setDEVICE_TYPE_ID(rs.getInt("DEVICE_TYPE_ID"));
                deviceTypebean.setDEVICE_TYPE_CODE(rs.getString("DEVICE_TYPE_CODE"));
                deviceTypebean.setDEVICE_TYPE_DESC(rs.getString("DEVICE_TYPE_DESC"));
                deviceTypebean.setACTIVE_STATUS(rs.getString("ACTIVE_STATUS").charAt(0));
                deviceTypebean.setEFFECTIVE_START_DATETIME(rs.getDate("EFFECTIVE_START_DATETIME"));
                deviceTypebean.setEFFECTIVE_END_DATETIME(rs.getDate("EFFECTIVE_END_DATETIME"));
                deviceTypebean.setCREATE_DATETIME(rs.getDate("CREATE_DATETIME"));
                deviceTypebean.setUPDATED_DATETIME(rs.getDate("UPDATED_DATETIME"));
                deviceTypebean.setPLATFORM_ID(rs.getInt("PLATFORM_ID"));
                 listOfDeviceTypebean.add(deviceTypebean);
            }
            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return listOfDeviceTypebean;
    }

    public static boolean validateDeviceTypeCode(String deviceTypeCode) {
         boolean status = false;
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(
                    "select * from device_type where DEVICE_TYPE_CODE=?");
            ps.setString(1, deviceTypeCode);
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
