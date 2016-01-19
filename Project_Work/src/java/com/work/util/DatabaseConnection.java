/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author arpit.khatri
 */
public class DatabaseConnection {

   public static Connection getConnection() throws Exception {

        String url = "jdbc:mysql://localhost:3306/";
        String dbName = "work";
        String driver = "com.mysql.jdbc.Driver";
        String userName = "root";
        String password = "root";

        Class.forName(driver).newInstance();
        Connection conn = DriverManager.getConnection(url + dbName, userName, password);
        return conn;
    }

    public static void closeConnection(Connection conn) {
        try {
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
