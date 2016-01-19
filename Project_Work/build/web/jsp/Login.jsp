<%-- 
    Document   : Login
    Created on : Dec 21, 2015, 11:56:55 PM
    Author     : arpit.khatri
--%>

<!DOCTYPE html>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Login Page</title>

        <meta name="description" content="User login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="assets/css/font-awesome.min.css" />
        <![if IE 7]>
        <link rel="stylesheet" href="assets/css/font-awesome-ie7.min.css" />
        <![endif]
        page specific plugin styles
        fonts
        <link rel="stylesheet" href="assets/css/ace-fonts.css" />
        <!--		 ace styles-->
        <link rel="stylesheet" href="assets/css/ace.min.css" />
        <link rel="stylesheet" href="assets/css/ace-rtl.min.css" />
        <![if lte IE 8]>
        <link rel="stylesheet" href="assets/css/ace-ie.min.css" />
        <![endif]
        inline styles related to this page
        HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries
        [if lt IE 9]>
        <script src="assets/js/html5shiv.js"></script>
        <script src="assets/js/respond.min.js"></script>
        <![endif]
    </head>

    <body class="login-layout">
        <div class="main-container">
            <div class="main-content">
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1">
                        <div class="login-container">
                            <div class="center">
                                <h1>
                                    <i class="icon-user green"></i>
                                    <!--                                    <span class="red">Ace</span>-->
                                    <span class="green">Login</span>
                                </h1>
                            </div>

                            <div class="space-6"></div>

                            <div class="position-relative">
                                <div id="login-box" class="login-box visible widget-box no-border">
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <h4 class="header blue lighter bigger">
                                                <i class="icon-arrow-right"></i>
                                                Please Enter Your Information
                                            </h4>

                                            <div class="space-6"></div>
                                            <%--<s:form name="loginForm" id="loginForm" action="SubmitLogin">--%>
                                            <form name="loginForm" id="loginForm" action="SubmitLogin" method="POST">
                                                <fieldset>
                                                   <center>
                                                       <s:if test="hasActionMessages()">
                                                           <s:actionmessage cssStyle="color: red"></s:actionmessage>
                                                       </s:if>
                                                    </center>
                                                    <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
                                                            <!--<input type="text" class="form-control" placeholder="Username" name="userId" id="userId"/>-->
                                                            <s:textfield cssClass="form-control" placeholder="Username" name="authenticateBean.userId" id="userId"></s:textfield>  
                                                                <i class="icon-user"></i>
                                                            </span>
                                                        </label>

                                                        <label class="block clearfix">
                                                            <span class="block input-icon input-icon-right">
                                                                <!--<input type="password" class="form-control" placeholder="Password" name="password" id="password"/>-->
                                                            <s:password cssClass="form-control" placeholder="Password" name="authenticateBean.password" id="password"> </s:password>
                                                                <i class="icon-lock"></i>
                                                            </span>
                                                        </label>

                                                        <div class="space"></div>

                                                        <div class="clearfix">
                                                            <label class="inline">
                                                                <!--<input type="checkbox" class="ace" />-->
                                                            <s:checkbox  name="check"    value="false"></s:checkbox> 
                                                                <span class="lbl"> Remember Me</span>
                                                            </label>

                                                            <!--<button type="button" class="width-35 pull-right btn btn-sm btn-primary" onclick="submitLogin()">-->
                                                        <s:submit  cssClass="width-35 pull-right btn btn-sm btn-primary icon-key" onclick="submitLogin()" value="Login">

                                                        </s:submit>
                                                    </div>

                                                    <div class="space-4"></div>
                                                </fieldset>
                                            </form>
                                            <%--</s:form>--%>


                                        </div> <!--/widget-main-->

                                    </div> <!--/widget-body-->
                                </div> <!--/login-box-->


                            </div> <!--/position-relative-->
                        </div>
                    </div> <!--/.col-->
                </div> <!--/.row-->
            </div>
        </div> <!--/.main-container-->

        <!--		 basic scripts-->

        <![if !IE]>

        <script type="text/javascript">
            window.jQuery || document.write("<script src='assets/js/jquery-2.0.3.min.js'>" + "<" + "/script>");
        </script>

        <![endif]>

        <![if IE]>
        <script type="text/javascript">
            window.jQuery || document.write("<script src='assets/js/jquery-1.10.2.min.js'>" + "<" + "/script>");
        </script>
        <![endif]>

        <!--        <script type="text/javascript">
                    if("ontouchend" in document) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
                </script>

                 inline scripts related to this page-->

        <script type="text/javascript">
            function show_box(id) {
                jQuery('.widget-box.visible').removeClass('visible');
                jQuery('#' + id).addClass('visible');
            }
            function submitLogin() {
                if (validateLogin()){
                    $("#loginForm").submit();
                }
            }
            function validateLogin() {
                if ($('#userId').val() == "") {
                    alert("Please enter User Name");
                    return false;
                }
                if ($("#password").val() == "") {
                    alert("Please enter Password");
                    return false;
                }
                return true;
            }
            $(document).keypress(function(e) {
                if (e.which == 13) {
                    submitLogin();
                }
            });
        </script>
    </body>
</html>

