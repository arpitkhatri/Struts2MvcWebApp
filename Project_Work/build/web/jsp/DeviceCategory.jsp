<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<html lang="en">
    <head>
        <title>Device Category Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="assets/css/jquery-ui-1.10.3.full.min.css" />
        <link rel="stylesheet" href="assets/css/datepicker.css" />
        <link rel="stylesheet" href="assets/css/ui.jqgrid.css" />
        <link rel="stylesheet" href="assets/css/ace-fonts.css" />
        <link rel="stylesheet" href="assets/css/ace.min.css" />
        <link rel="stylesheet" href="assets/css/ace-rtl.min.css" />
        <link rel="stylesheet" href="assets/css/ace-skins.min.css" />
        <script src="js/jquery-1.10.2.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="js/jquery.jqGrid.src.js"></script>
        <script type="text/javascript"  src="assets/js/date-time/bootstrap-datepicker.min.js"></script>
        <script type="text/javascript"  src="assets/js/jqGrid/i18n/grid.locale-en.js"></script>
        <script src="assets/js/ace-extra.min.js"></script>
        <script src="assets/js/date-time/bootstrap-datepicker.min.js"></script>
        <script src="assets/js/jqGrid/jquery.jqGrid.min.js"></script>
        <script src="assets/js/jqGrid/i18n/grid.locale-en.js"></script>
        <script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
    </head>

    <body>

        <div class="main-container" id="main-container">

            <div class="main-container-inner">
                <a class="menu-toggler" id="menu-toggler" href="#">
                    <span class="menu-text"></span>
                </a>

                <%@include file="templates/header.jsp"%>


                <%@include file="templates/menu.jsp"%>
                <div class="main-content">

                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- PAGE CONTENT BEGINS -->

                                <table id="grid-table"></table>

                                <div id="grid-pager"></div>

                                <script type="text/javascript">
                                    var $path_base = "/";//this will be used in gritter alerts containing images
                                </script>

                                <!-- PAGE CONTENT ENDS -->
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.page-content -->
                </div><!-- /.main-content -->
            </div><!-- /.main-container-inner -->


            <script type="text/javascript">
                var $path_base = "/";//this will be used in gritter alerts containing images
            </script>
        </div><!-- /.main-container -->
        <%--<%@include file="templates/footer.jsp"%>--%>
        <!-- basic scripts -->
        <script type="text/javascript">
            window.jQuery || document.write("<script src='assets/js/jquery-2.0.3.min.js'>" + "<" + "/script>");
        </script>

        <script type="text/javascript">

            var grid_data =
                    [
                        {color_Name: "blue", qty_Purchase: "35", price: "200", total_Vat: "5", remaining_Stock: "20", gross_Total: "24365"},
                    ];

            jQuery(document).ready(function() {
                var grid_selector = "#grid-table";
                var pager_selector = "#grid-pager";
//                alert("coomming");
                jQuery(grid_selector).jqGrid({
                    url: 'getListDeviceCategory',
                    datatype: "json",
                    height: 325,
                    mtype: 'GET',
//                      success: function(result) {
//        alert("success:"+result);
//    },
                    colNames: ['ID', 'Device Category Code', 'Device Category Desc', 'Device TypeId', 'Device Type Code', 'Active Status', 'Effective Start Date', 'Effective End Date', 'Create Date', 'Updated Date'],
                    colModel: [
                        {name: 'deviceCateogryId', index: 'deviceCateogryId', editable: true, hidden: true},
                        {name: 'deviceCategoryCode', index: 'deviceCategoryCode', editable: true,editrules:{required:true},
                            editoptions:{readonly:true},
                            formoptions: {
                                elmprefix: "<span class='mystar' style='color:red'>*</span>&nbsp;"
                            }},
                        {name: 'deviceCategoryDesc', index: 'deviceCategoryDesc', editable: true, editrules: {required: true},
                            formoptions: {
                                elmprefix: "<span class='mystar' style='color:red'>*</span>&nbsp;"
                            }},
                        {name: 'deviceTypeId', index: 'deviceTypeId', editable: true, hidden: true},
                        {name: 'deviceTypeCode', index: 'deviceTypeCode', width: 150, editable: true, editoptions: {size: "20", maxlength: "45"}, editrules: {required: true},
                            formoptions: {
                                elmprefix: "<span class='mystar' style='color:red'>*</span>&nbsp;"
                            }, edittype: "select",
                            editoptions:{
                                dataUrl: 'getDeviceTypeCode'
                            }
                            , editrules:{required: true, custom: true, custom_func: checkRole}
                        },
                        {name: 'activeStatus', width: 125, editable: true,
                            formoptions: {
                                elmprefix: "<span class='mystar' style='color:red'>*</span>&nbsp;"
                            },
                            edittype: "checkbox", editoptions: {value: "Yes:No"}},
                        {name: 'effStartDate', index: 'effStartDate', editable: true, editrules: {edithidden: true},
                            editoptions: {size: 20,
                                readonly: true,
                                dataInit: function(el) {
                                    $(el).datepicker({
                                        format: 'mm-dd-yyyy'
                                    });
                                },
                                defaultValue: function() {
                                    var currentTime = new Date();
                                    var month = parseInt(currentTime.getMonth() + 1);
                                    month = month <= 9 ? "0" + month : month;
                                    var day = currentTime.getDate();
                                    day = day <= 9 ? "0" + day : day;
                                    var year = currentTime.getFullYear();
                                    return month + "-" + day + "-" + year;
                                }
                            }, formoptions: {
                                elmprefix: "&nbsp;&nbsp;&nbsp;",
                                elmsuffix: "&nbsp;<span><i class='bigger-120 icon-calendar'/></span>",
                                elmprefix:"<span class='mystar' style='color:red'>*</span>&nbsp;"
                            }
                        },
                        {name: 'effEndDate', index: 'effEndDate', editable: true, editrules: {edithidden: true},
                            editoptions: {size: 20,
                                readonly: true,
                                dataInit: function(el) {
                                    $(el).datepicker({
                                        format: 'mm-dd-yyyy'
                                    });
                                },
                                defaultValue: function() {
                                    var currentTime = new Date();
                                    var month = parseInt(currentTime.getMonth() + 1);
                                    month = month <= 9 ? "0" + month : month;
                                    var day = currentTime.getDate();
                                    day = day <= 9 ? "0" + day : day;
                                    var year = currentTime.getFullYear();
                                    return month + "-" + day + "-" + year;
                                }
                            }, formoptions: {
                                elmprefix: "&nbsp;&nbsp;&nbsp;",
                                elmsuffix: "&nbsp;<span><i class='bigger-120 icon-calendar'/></span>",
                                elmprefix:"<span class='mystar' style='color:red'>*</span>&nbsp;"
                            }
                        },
                        {name: 'createDate', index: 'createDate', editable: true, editrules: {edithidden: true},
                            editoptions: {size: 20,
                                readonly: true,
                                dataInit: function(el) {
                                    $(el).datepicker({
                                        format: 'mm-dd-yyyy'
                                    });
                                },
                                defaultValue: function() {
                                    var currentTime = new Date();
                                    var month = parseInt(currentTime.getMonth() + 1);
                                    month = month <= 9 ? "0" + month : month;
                                    var day = currentTime.getDate();
                                    day = day <= 9 ? "0" + day : day;
                                    var year = currentTime.getFullYear();
                                    return month + "-" + day + "-" + year;
                                }
                            }, formoptions: {
                                elmprefix: "&nbsp;&nbsp;&nbsp;",
                                elmsuffix: "&nbsp;<span><i class='bigger-120 icon-calendar'/></span>",
                                elmprefix:"<span class='mystar' style='color:red'>*</span>&nbsp;"
                            }
                        }, {name: 'updatedDate', index: 'updatedDate', editable: true, editrules: {edithidden: true},
                            editoptions: {size: 20,
                                readonly: true,
                                dataInit: function(el) {
                                    $(el).datepicker({
                                        format: 'mm-dd-yyyy'
                                    });
                                },
                                defaultValue: function() {
                                    var currentTime = new Date();
                                    var month = parseInt(currentTime.getMonth() + 1);
                                    month = month <= 9 ? "0" + month : month;
                                    var day = currentTime.getDate();
                                    day = day <= 9 ? "0" + day : day;
                                    var year = currentTime.getFullYear();
                                    return month + "-" + day + "-" + year;
                                }
                            }, formoptions: {
                                elmprefix: "&nbsp;&nbsp;&nbsp;",
                                elmsuffix: "&nbsp;<span><i class='bigger-120 icon-calendar'/></span>",
                                elmprefix:"<span class='mystar' style='color:red'>*</span>&nbsp;"
                            }
                        }

                    ],
                    viewrecords: true,
                    rowNum: 10,
                    rownumbers: true,
                    rownumWidth: 35,
                    ignoreCase: true,
                    rowList: [10, 20, 30],
                    pager: pager_selector,
                    loadonce: true,
//                    multiselect: true,
//                    multiboxonly: true,
                    jsonReader: {
                        root: "rows",
                        page: "page",
                        total: "totalCount",
                        records: "records",
                        repeatitems: false,
                        id: ["deviceCateogryId"]
                    },
                    loadComplete: function() {
                        var table = this;
                        // hide select all checkbox
//                        var myGrid = $(grid_selector);
//                        $("#cb_"+myGrid[0].id).hide();
                        setTimeout(function() {
                            styleCheckbox(table);

                            updateActionIcons(table);
                            updatePagerIcons(table);
                            enableTooltips(table);
                        }, 0);
                    },
                    editurl: $path_base + "/dummy.html", //nothing is saved
                    caption: "Device Category",
                    autowidth: true
                });

                //enable search/filter toolbar
                //jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})

                //switch element when editing inline
                function aceSwitch(cellvalue, options, cell) {
                    setTimeout(function() {
                        $(cell).find('input[type=checkbox]')
                                .wrap('<label class="inline" />')
                                .addClass('ace ace-switch ace-switch-5')
                                .after('<span class="lbl"></span>');
                    }, 0);
                }
                //enable datepicker
                function pickDate(cellvalue, options, cell) {
                    setTimeout(function() {
                        $(cell).find('input[type=text]')
                                .datepicker({format: 'yyyy-mm-dd', autoclose: true});
                    }, 0);
                }
                var roleBasedNavOption;
                if ('${sessionScope.UserRole}' == "Administrator")
                {
                    roleBasedNavOption = {edit: true,
                        editicon: 'icon-pencil blue',
                        add: true,
                        addicon: 'icon-plus-sign purple',
                        del: true,
                        delicon: 'icon-trash red',
                        search: true,
                        searchicon: 'icon-search orange',
                        refresh: true,
                        refreshicon: 'icon-refresh green',
                        view: true,
                        viewicon: 'icon-zoom-in grey'
                    };
                } else
                {
                    roleBasedNavOption = {edit: false,
                        editicon: 'icon-pencil blue',
                        add: false,
                        addicon: 'icon-plus-sign purple',
                        del: false,
                        delicon: 'icon-trash red',
                        search: true,
                        searchicon: 'icon-search orange',
                        refresh: true,
                        refreshicon: 'icon-refresh green',
                        view: true,
                        viewicon: 'icon-zoom-in grey'
                    };
                }
                //navButtons
                jQuery(grid_selector).jqGrid('navGrid', pager_selector,
                        roleBasedNavOption,
                        {
                            //edit record form
                            width: 350,
                            closeAfterEdit: true,
                            reloadAfterSubmit: true,
                            onclickSubmit: function(params) {
                                params.url = 'updateDeviceCateogry?deviceCategoryCode=' + $('#deviceCategoryCode').val()+'&deviceCategoryDesc'+ $('#deviceCategoryDesc').val()+'&deviceTypeCode'+ $('#deviceTypeCode').val()+'&activeStatus'+ $('#activeStatus').val()+'&effStartDate'+ $('#effStartDate').val()+'&effEndDate'+$('#effEndDate').val()+'&createDate'+$('#createDate').val()+'&updatedDate'+$('#updatedDate').val();
                                params.mtype = 'POST';
                            },
                            recreateForm: true,
                            beforeShowForm: function(e) {
                                var form = $(e[0]);
                                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                                style_edit_form(form);
                            },
                            afterSubmit: function(data, postdata) {
                                var result = jQuery.parseJSON(data.responseText);
                                if (result.successEdit != "") {
                                    alert("" + result.successEdit);
                                    $(this).jqGrid('setGridParam', {datatype: 'json'});
                                    return[true, "OK"];
                                } else {
                                    return[false, "Device Category Already Exists !!"];
                                }
                            }
                        }, //end of edit
                {
                    //new record form
                    width: 350,
                    closeAfterAdd: true,
                    reloadAfterSubmit: true,
                    onclickSubmit: function(params) {
                        params.url = 'addDeviceCategory?deviceCategoryCode=' + $('#deviceCategoryCode').val() + '&deviceCategoryDesc' + $('#deviceCategoryDesc').val() + '&deviceTypeCode' + $('#deviceTypeCode').val() + '&activeStatus' + $('#activeStatus').val() + '&effStartDate' + $('#effStartDate').val() + '&effEndDate' + $('#effEndDate').val() + '&createDate' + $('#createDate').val() + '&updatedDate' + $('#updatedDate').val();
                        params.mtype = 'POST';
                    },
                    recreateForm: true,
                    viewPagerButtons: false,
                    beforeShowForm: function(e) {
                         $('#deviceCategoryCode').removeAttr('readonly');
                        var form = $(e[0]);
                        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                        style_edit_form(form);
                    },
                    afterSubmit: function(data, postdata) {
                        var result = jQuery.parseJSON(data.responseText);
                        if (result.successAdd != "") {
                            alert("" + result.successAdd);
                            $(this).jqGrid('setGridParam', {datatype: 'json'});
                            return[true, "OK"];
                        } else {
                            return[false, "Device Category Already Exists !!"];
                        }
                    }
                },
                {
                    //delete record form
                    recreateForm: true,
                    beforeShowForm: function(e) {
                        var form = $(e[0]);
                        $("td.delmsg", form).html("Delete selected record ?");
                        if (form.data('styled'))
                            return false;
                        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                        style_delete_form(form);
                        form.data('styled', true);
                    },
                    onclickSubmit: function(params) {
                        var selectedRowId = $(grid_selector).jqGrid('getGridParam', 'selrow');
                        var cellValue = $(grid_selector).jqGrid('getCell', selectedRowId, 'deviceCateogryId');
                        params.url = 'deleteDeviceCategory';
                        params.mtype = 'POST';
                        return {deviceCateogryId :cellValue};
                    },
                    afterSubmit: function(data, postdata) {
                        var result = jQuery.parseJSON(data.responseText);
                        if (result.successDelete != "") {
                            alert("" + result.successDelete);
                            $(this).jqGrid('setGridParam', {datatype: 'json'});
                            return[true, result.successDelete];
                        } else {
                            return[false, "Error"];
                        }
                    }
                },
                {
                    //search form
                    recreateForm: true,
                    afterShowSearch: function(e) {
                        var form = $(e[0]);
//                         $('.selectopts option[value="cn"]').attr('selected', 'selected');
                        form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
                        style_search_form(form);
                    },
                    afterRedraw: function() {
                        style_search_filters($(this));
                    }
                    ,
                    multipleSearch: true
                },
                {
                    //view record form
                    width: 450,
                    recreateForm: true,
                    beforeShowForm: function(e) {
                        var form = $(e[0]);
                        form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
                    }
                }
                )

                function style_edit_form(form) {
                    //enable datepicker on "sdate" field and switches for "stock" field
                    form.find('input[name=sdate]').datepicker({format: 'yyyy-mm-dd', autoclose: true})
                            .end().find('input[name=stock]')
                            .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

                    //update buttons classes
                    var buttons = form.next().find('.EditButton .fm-button');
                    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
                    buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
                    buttons.eq(1).prepend('<i class="icon-remove"></i>')

                    buttons = form.next().find('.navButton a');
                    buttons.find('.ui-icon').remove();
                    buttons.eq(0).append('<i class="icon-chevron-left"></i>');
                    buttons.eq(1).append('<i class="icon-chevron-right"></i>');
                }

                function style_delete_form(form) {
                    var buttons = form.next().find('.EditButton .fm-button');
                    buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
                    buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
                    buttons.eq(1).prepend('<i class="icon-remove"></i>')
                }

                function style_search_filters(form) {
                    form.find('.delete-rule').val('X');
                    form.find('.add-rule').addClass('btn btn-xs btn-primary');
                    form.find('.add-group').addClass('btn btn-xs btn-success');
                    form.find('.delete-group').addClass('btn btn-xs btn-danger');
                }
                function style_search_form(form) {
                    var dialog = form.closest('.ui-jqdialog');
                    var buttons = dialog.find('.EditTable')
                    buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
                    buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
                    buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search');
                }

                function beforeDeleteCallback(e) {
                    var form = $(e[0]);
                    if (form.data('styled'))
                        return false;

                    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                    style_delete_form(form);

                    form.data('styled', true);
                }

                function beforeEditCallback(e) {
                    var form = $(e[0]);
                    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                    style_edit_form(form);
                }



                //it causes some flicker when reloading or navigating grid
                //it may be possible to have some custom formatter to do this as the grid is being created to prevent this
                //or go back to default browser checkbox styles for the grid
                function styleCheckbox(table) {
                    /**
                     $(table).find('input:checkbox').addClass('ace')
                     .wrap('<label />')
                     .after('<span class="lbl align-top" />')
                     
                     
                     $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
                     .find('input.cbox[type=checkbox]').addClass('ace')
                     .wrap('<label />').after('<span class="lbl align-top" />');
                     */
                }


                //unlike navButtons icons, action icons in rows seem to be hard-coded
                //you can change them like this in here if you want
                function updateActionIcons(table) {
                    /**
                     var replacement =
                     {
                     'ui-icon-pencil' : 'icon-pencil blue',
                     'ui-icon-trash' : 'icon-trash red',
                     'ui-icon-disk' : 'icon-ok green',
                     'ui-icon-cancel' : 'icon-remove red'
                     };
                     $(table).find('.ui-pg-div span.ui-icon').each(function(){
                     var icon = $(this);
                     var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
                     if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
                     })
                     */
                }

                //replace icons with FontAwesome icons like above
                function updatePagerIcons(table) {
                    var replacement =
                            {
                                'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
                                'ui-icon-seek-prev': 'icon-angle-left bigger-140',
                                'ui-icon-seek-next': 'icon-angle-right bigger-140',
                                'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
                            };
                    $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
                        var icon = $(this);
                        var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                        if ($class in replacement)
                            icon.attr('class', 'ui-icon ' + replacement[$class]);
                    })
                }

                function enableTooltips(table) {
                    $('.navtable .ui-pg-button').tooltip({container: 'body'});
                    $(table).find('.ui-pg-div').tooltip({container: 'body'});
                }

                //var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');
            });

            function checkRole(value) {
                if (value != 0) {
                    return [true, "", ""];
                } else {
                    return [false, "Please Select User Role!", ""];
                }
            }
        </script>
    </body>
</html>
