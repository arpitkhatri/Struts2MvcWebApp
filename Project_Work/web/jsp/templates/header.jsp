<%@ taglib prefix="s" uri="/struts-tags" %>
<div class="navbar navbar-default" id="navbar">

    <div class="navbar-container" id="navbar-container">
        <div class="navbar-header pull-left">
            <a href="<s:url action="HomePage"/>" class="navbar-brand">
                <img  src="assets/img/nielsen.jpg" alt="Logo" style="width: 90px;"/>
                <small>
                    
							Device Classification Reference Management System
                </small>
            </a><!-- /.brand -->
        </div><!-- /.navbar-header -->

        <div class="navbar-header pull-right" role="navigation">
            <ul class="nav ace-nav">
                <li class="light-blue">
                    <a data-toggle="dropdown" href="#" class="dropdown-toggle" style="height:122%" >
                        <img class="nav-user-photo" src="assets/avatars/about_GBS.gif" alt="Jason's Photo" />
                        <span class="user-info" style="top:12px">
                            <small>Welcome,</small>
                            ${sessionScope.UserName}
                        </span>

                        <i class="icon-caret-down"></i>
                    </a>

                    <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
<!--                        <li>
                            <a href="#">
                                <i class="icon-cog"></i>
										Settings
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <i class="icon-user"></i>
										Profile
                            </a>
                        </li>-->

                        <!--<li class="divider"></li>-->

                        <li>
                            <a href="<s:url action="Logout"/>">
                                <i class="icon-off"></i>
										Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul><!-- /.ace-nav -->
        </div><!-- /.navbar-header -->
    </div><!-- /.container -->
</div>