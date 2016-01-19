<%@ taglib prefix="s" uri="/struts-tags" %>
<script src="assets/js/jqGrid/jquery.jqGrid.min.js"></script>
<script>
    $(document).ready(function() {
        if ('${sessionScope.UserRole}' != "Administrator")
        {
            $("#userl").css("display","none");
//$(?#userl?).css(?display?,?none?);
        }
    });

    $(window).load(function() {
    });
</script>
<div class="sidebar" id="sidebar">


    <ul class="nav nav-list">

        <li>

            <a href="<s:url action="userSetup"/>" class="dropdown-toggle" id="userl">
                <i class="icon-desktop"></i>
                <span class="menu-text">
                    MANAGE USER
                </span>
            </a>

            <a href="<s:url action="Platform"/>" class="dropdown-toggle">
                <i class="icon-desktop"></i>
                <span class="menu-text">
                    PLATFORM
                </span>
            </a>
            <a href="<s:url action="DeviceType"/>" class="dropdown-toggle">
                <i class="icon-desktop"></i>
                <span class="menu-text">
                    DEVICE TYPE
                </span>
            </a>
            <a href="<s:url action="DeviceCateogry"/>" class="dropdown-toggle">
                <i class="icon-desktop"></i>
                <span class="menu-text">
                    DEVICE CATEGORY
                </span>
            </a>
            <a href="<s:url action="DeviceSubCateogry"/>" class="dropdown-toggle">
                <i class="icon-desktop"></i>
                <span class="menu-text">
                    DEVICE SUB CATEGORY
                </span>
            </a>
            <a href="<s:url action="OotmConnPoint"/>" class="dropdown-toggle">
                <i class="icon-desktop"></i>
                <span class="menu-text">
                    OTTM CONN POINT
                </span>
            </a>
        </li>

    </ul><!-- /.nav-list -->


</div>