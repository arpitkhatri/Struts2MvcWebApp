/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.work.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author arpit.khatri
 */
public class DateUtil implements java.io.Serializable {

    public final static String CLASSNAME = "DateUtility";
    public final static String DDMMYYPATTERN = "dd/MM/yyyy";
    public final static String DDMMYYTimePATTERN = "dd/MM/yyyy HH:mm";
    public final static String DDMMYYTimeZonePATTERN = "dd/MM/yyyy HH:mm Z";

    
    public static String converDateFormatToString(Date strDate, String OLD_FORMAT, String NEW_FORMAT) throws ParseException {

        SimpleDateFormat sdf = new SimpleDateFormat(OLD_FORMAT);
        sdf.applyPattern(NEW_FORMAT);

        if (strDate == null) {
            return "";
        }

        return sdf.format(strDate);
    }
      public static String converDateFormat(String strDate, String OLD_FORMAT, String NEW_FORMAT) throws ParseException {

        SimpleDateFormat sdf = new SimpleDateFormat(OLD_FORMAT);
        Date d = sdf.parse(strDate);
        sdf.applyPattern(NEW_FORMAT);
        return sdf.format(d);
    }
      
       public static java.sql.Date convertStringToSqlDate(String strDate, String format) throws ParseException {
           SimpleDateFormat originalFormat = new SimpleDateFormat("MM-dd-yyyy");
   SimpleDateFormat targetFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss" );
  Date  date = originalFormat.parse(strDate);
     System.out.println("Old Format :   " + originalFormat.format(date));
     System.out.println("New Format :   " + targetFormat.format(date));

//        SimpleDateFormat sdf1 = new SimpleDateFormat(format);
//        java.util.Date date = sdf1.parse(strDate);
        java.sql.Date sqlStartDate = new java.sql.Date(date.getTime());
        return sqlStartDate;
    }
          public static java.sql.Date convertStringToSqlWithFormatDate(String strDate, String format) throws ParseException {
        SimpleDateFormat from = new SimpleDateFormat("MM-dd-yyyy");
        SimpleDateFormat to = new SimpleDateFormat(format);
        Date date = from.parse(strDate);       // 01/02/2014
        String mysqlString = to.format(date);     // 2014-02-01
//
//        SimpleDateFormat sdf1 = new SimpleDateFormat(format);
//        java.util.Date date = sdf1.parse(strDate);
        java.sql.Date sqlStartDate = new java.sql.Date(date.getTime());
        return sqlStartDate;
    }


}
