/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.dao;

import com.work.formbean.AuthenticateBean;
import com.work.formbean.PlatformBean;
import com.work.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author arpit.khatri
 */
public class PlatformDAO {

    public static List<PlatformBean> getPlatformList() {
        List<PlatformBean> listOfPlatformbean = new ArrayList<PlatformBean>();
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String s = "SELECT * FROM platform";

            ResultSet rs = statement.executeQuery(s);
            int g = 0;

            while (rs.next()) {
                PlatformBean platformBean = new PlatformBean();
                platformBean.setPLATFORM_ID(rs.getInt("PLATFORM_ID"));
                platformBean.setPLATFORM_CODE(rs.getString("PLATFORM_CODE"));
                platformBean.setPLATFORM_DESC(rs.getString("PLATFORM_DESC"));
                platformBean.setACTIVE_STATUS(rs.getString("ACTIVE_STATUS").charAt(0));
                platformBean.setEFFECTIVE_START_DATETIME(rs.getDate("EFFECTIVE_START_DATETIME"));
                platformBean.setEFFECTIVE_END_DATETIME(rs.getDate("EFFECTIVE_END_DATETIME"));
                platformBean.setCREATE_DATETIME(rs.getDate("CREATE_DATETIME"));
                platformBean.setUPDATED_DATETIME(rs.getDate("UPDATED_DATETIME"));

                listOfPlatformbean.add(platformBean);
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return listOfPlatformbean;
    }

    public static void deletePlatformByPlatformId(int platform_id) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String sql = "DELETE FROM platform "
                    + "WHERE PLATFORM_ID =" + platform_id;
            statement.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }

    }

    public static void updatePlatformDetails(PlatformBean platformBean) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // set the preparedstatement parameters
            PreparedStatement ps = con.prepareStatement(
                    "UPDATE platform SET PLATFORM_DESC =?, PLATFORM_CODE =?, ACTIVE_STATUS =?, EFFECTIVE_START_DATETIME =?, EFFECTIVE_END_DATETIME =?, CREATE_DATETIME =?, UPDATED_DATETIME =? where PLATFORM_ID =?");
            ps.setString(1, platformBean.getPLATFORM_DESC());
            ps.setString(2, platformBean.getPLATFORM_CODE());
            ps.setString(3, String.valueOf(platformBean.getACTIVE_STATUS()));
            ps.setDate(4, platformBean.getEFFECTIVE_START_DATETIME());
            ps.setDate(5, platformBean.getEFFECTIVE_END_DATETIME());
            ps.setDate(6, platformBean.getCREATE_DATETIME());
            ps.setDate(7, platformBean.getUPDATED_DATETIME());
            ps.setInt(8, platformBean.getPLATFORM_ID());

            // call executeUpdate to execute our sql update statement
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static void SavePlatformDetails(PlatformBean platformBean) {
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            // the mysql insert statement
            String query = "INSERT INTO platform (PLATFORM_DESC, PLATFORM_CODE, ACTIVE_STATUS, EFFECTIVE_START_DATETIME, EFFECTIVE_END_DATETIME, CREATE_DATETIME, UPDATED_DATETIME)"
                    + " values (?, ?, ?, ?, ?,?,?)";

            // create the mysql insert preparedstatement
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, platformBean.getPLATFORM_DESC());
            ps.setString(2, platformBean.getPLATFORM_CODE());
            ps.setString(3, String.valueOf(platformBean.getACTIVE_STATUS()));
            ps.setDate(4, platformBean.getEFFECTIVE_START_DATETIME());
            ps.setDate(5, platformBean.getEFFECTIVE_END_DATETIME());
            ps.setDate(6, platformBean.getCREATE_DATETIME());
            ps.setDate(7, platformBean.getUPDATED_DATETIME());
            ps.execute();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
    }

    public static List<PlatformBean> getUniquePlatFormCode() {
        List<PlatformBean> listOfPlatformbean = new ArrayList<PlatformBean>();
        Connection con = null;
        try {
            con = DatabaseConnection.getConnection();
            Statement statement = con.createStatement();
            String s = "SELECT *  FROM `work`.platform d group by PLATFORM_CODE";

            ResultSet rs = statement.executeQuery(s);
            int g = 0;
            while (rs.next()) {
                PlatformBean platformBean = new PlatformBean();
                platformBean.setPLATFORM_ID(rs.getInt("PLATFORM_ID"));
                platformBean.setPLATFORM_CODE(rs.getString("PLATFORM_CODE"));
                platformBean.setPLATFORM_DESC(rs.getString("PLATFORM_DESC"));
                platformBean.setACTIVE_STATUS(rs.getString("ACTIVE_STATUS").charAt(0));
                platformBean.setEFFECTIVE_START_DATETIME(rs.getDate("EFFECTIVE_START_DATETIME"));
                platformBean.setEFFECTIVE_END_DATETIME(rs.getDate("EFFECTIVE_END_DATETIME"));
                platformBean.setCREATE_DATETIME(rs.getDate("CREATE_DATETIME"));
                platformBean.setUPDATED_DATETIME(rs.getDate("UPDATED_DATETIME"));

                listOfPlatformbean.add(platformBean);
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DatabaseConnection.closeConnection(con);
        }
        return listOfPlatformbean;
    }

}
