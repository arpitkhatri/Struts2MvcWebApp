<%-- 
    Document   : index
    Created on : Dec 21, 2015, 4:11:10 PM
    Author     : arpit.khatri
--%>

<%@ taglib prefix="s" uri="/struts-tags" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="css/main.css">

<!DOCTYPE html>
<html>
    <head>
        <title>Hello</title>
    </head>
    <body>
        <div id="fixedheader">Top div content</div>

        <h1>Page Heading</h1>
        <p>Content placeholder ...</p>

        <div id="fixedfooter">Bottom div content</div>
        <%
        response.sendRedirect("Login");
        %>
    </body>
</html>
