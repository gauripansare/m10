jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
        if (isIE11version) {
            if ($(this).attr("type") != undefined && $(this).attr("type") == "radio")
                return;
            $(this).removeAttr("disabled")
        }
        return;
    },
    k_IsDisabled: function () {
        if (this.hasClass('disabled')) { return true; } else { return false; }
    }
});
var _ModuleCommon = (function () {
    var reviewData = [];
    var g_RuntimeData = [];
    return {
        EnableNext: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (currentPageData.nextPageId != undefined && currentPageData.nextPageId != "") {
                $("#linknext").k_enable();
            }
        },
        DisableNext: function () {
            $("#linknext").k_disable();
        },
        GetPageReviewData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        return reviewData[i];
                    }
                }
            }
        },
        GetReviewData: function () {
            return reviewData;
        },
        SetReviewData: function (rData) {
            reviewData = rData;
        },
        GetPageDetailData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            return pageData;
        },
        ShowFeedbackReviewMode: function (scrollfeedback) { 
            var pageData = this.GetPageDetailData();
            var fdkurl = "";
            if (pageData != undefined) {
                if (pageData.EmbedSettings != undefined) {
                    fdkurl = pageData.EmbedSettings.feedbackurl;
                } else if (pageData.DNDSettings != undefined) {
                    fdkurl = pageData.DNDSettings.feedbackurl;

                }
                else {
                    if (pageData.ImageHotSpots != undefined) {
                        for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                            if (pageData.ImageHotSpots.Hotspots[i].isCorrect == true) {
                                fdkurl = pageData.ImageHotSpots.Hotspots[i].feedbackurl;
                                break;
                            }
                        }
                    }
                }
                url = _Settings.dataRoot + "feedbackdata/" + fdkurl;
                $("#div_feedback").show();
                $("#div_feedback").css("display", "inline-block");
                if (fdkurl != undefined) {
                    $("#div_feedback .div_fdkcontent").load(url, function () {
                        //this.SetFeedbackTop()
                        //$('html,body').animate({ scrollTop: 0 }, 0, function () { });
                        if (isIOS) {
                            $("#div_feedback p:first").attr("role", "text")
                        }
                        $("#div_feedback p:first").attr("tabindex", "-1")
                        if(scrollfeedback != true){
                        window.scrollTo(0, document.body.scrollHeight)
                        $("#div_feedback p:first").focus();
                        }
                    });
                }
            }
        },
        DisplayInstructorReviewMode: function () {
            $(".reviewDiv").remove();
            var _currentPageObject = _Navigator.GetCurrentPage();
            var pageDetailData = this.GetPageDetailData();
            var reviewData = this.GetPageReviewData();
            if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                for (var i = 0; i < reviewData.Positions.length; i++) {
                    var posObj = reviewData.Positions[i];
                    var appendImage = $(".wrapperimage");
                    var ht = appendImage.height();
                    if (ht < 596) {
                        ht = 596;
                    }
                    while ((posObj.posY + 40) > ht) {
                        posObj.posY = posObj.posY - 2;
                    }
                    if (posObj.posX > 758) {
                        posObj.posX = 758;
                    }
                    if(_currentPageObject.pageId == "p4prev"){
                        posObj.posY = 160;
                        posObj.posX = 260;
                    }
                    if (posObj.isCorrect) {
                        var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                        appendImage.append(_div);
                    } else {
                        var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";
                        appendImage.append(_divI);
                    }
                }
            }            
            var Ndata = _Navigator.Get();
            if (_currentPageObject.pageId == "p2") {
                if (Ndata["p3"].isAnswered == undefined || !Ndata["p3"].isAnswered) {
                    this.ShowFeedbackReviewMode(true);
                }
            }
            else {
                this.ShowFeedbackReviewMode(true);
            }
        },
        DisplayUserReviewMode: function () {
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            var reviewData = this.GetPageReviewData();
            if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                var posObj = reviewData.Positions[reviewData.Positions.length - 1];
                var appendImage = $(".wrapperimage");
                var ht = appendImage.height();
                while ((posObj.posY + 40) > ht) {
                    posObj.posY = posObj.posY - 2;
                }
                if (posObj.isCorrect) {
                    var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                    appendImage.append(_div);
                } else {
                    var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";
                    appendImage.append(_divI);
                }

            }



        },
        OnContinue: function () {
            $('.divHotSpot').removeClass('hotspotclicked').removeAttr("disabled");
            $(".divHotSpot").k_enable()
            $("#div_feedback .div_fdkcontent").html("");
            $("#div_feedback").hide();
            //$('html,body').animate({ scrollTop: document.body.scrollHeigh }, 500, function () { });
            if (isIOS) {
                //$(".pageheading").attr("role", "text")
            }
            $("h2").attr("tabindex", "-1")
            window.scrollTo(0, document.body.scrollHeight)
            $("h2").focus();
        },
        AddHotspotClick: function (hotspotObj, event, isCorrect) {

            //$(".divHotSpot").remove();
            if (_Navigator.IsAnswered()) {
                return;
            }
            var currentPageData = _Navigator.GetCurrentPage();
            var reviewDataArrayLength = 3;
            if (currentPageData.pageId == "p6" || currentPageData.pageId == "p7" || currentPageData.pageId == "p8" || currentPageData.pageId == "p10" || currentPageData.pageId == "p11" || currentPageData.pageId == "p15" || currentPageData.pageId == "p16") {
                reviewDataArrayLength = 5;
            }

            var imgObj = $(".activityimg");
            var posX = imgObj.offset().left;
            var posY = imgObj.offset().top;
            var found = false;

            var rposX;
            var rposY;
            if (event != undefined && event.pageX != undefined) {
                rposX = (event.pageX - posX);
                rposY = (event.pageY - posY);
            }
            if (rposX < 0 || rposY < 0) {//gp if module is attmpted using accessibility
                rposX = hotspotObj.position().left + 20;
                rposY = hotspotObj.position().top + 20;
            }

            var page = this.GetPageDetailData();
            if (page.EmbedSettings != undefined) {
                return;
            }
            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == currentPageData.pageId) {
                    var sameclick = false;
                    var posindex = 0;
                    if (reviewData[r].Positions != undefined) {
                        for (var i = 0; i < reviewData[r].Positions.length; i++) {
                            if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posY == rposY) {
                                sameclick = true;
                                posindex = i;
                                break;
                            }
                        }
                        if (!sameclick) {
                            var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                            if (reviewData[r].Positions.length < reviewDataArrayLength) {
                                reviewData[r].Positions.push(position);
                            }
                            else {
                                reviewData[r].Positions.splice(0, 1);
                                reviewData[r].Positions.push(position);
                            }
                        }
                        else {
                            if (reviewData[r].Positions[posindex].isCorrect == undefined || reviewData[r].Positions[posindex].isCorrect == false) {
                                reviewData[r].Positions[posindex].isCorrect = isCorrect;
                            }
                        }
                    }
                    else {
                        var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                        reviewData[r].Positions = [position]
                    }

                    found = true;
                }
            }

            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                _obj.Positions = [position]
                reviewData.push(_obj);

            }

        },
        AddEditPropertiesClick: function (event) {
            if (_Navigator.IsAnswered()) {
                return;
            }
            var currentPageData = _Navigator.GetCurrentPage();
            var reviewDataArrayLength = 3;
            if (currentPageData.pageId == "p6" || currentPageData.pageId == "p7" || currentPageData.pageId == "p8" || currentPageData.pageId == "p10" || currentPageData.pageId == "p11" || currentPageData.pageId == "p15" || currentPageData.pageId == "p16") {
                reviewDataArrayLength = 5;
            }
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData.EmbedSettings != undefined)
                return;
            var imgObj = $(".activityimg");
            var posX = imgObj.offset().left;
            var posY = imgObj.offset().top;
            var found = false;

            var rposX = (event.pageX - posX);
            var rposY = (event.pageY - posY);
            if (isNaN(rposX) || isNaN(rposY))
                return;


            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == currentPageData.pageId) {
                    var sameclick = false;
                    if (reviewData[r].Positions != undefined) {
                        for (var i = 0; i < reviewData[r].Positions.length; i++) {
                            if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posy == rposY) {
                                sameclick = true;
                                break;
                            }
                        }
                        if (!sameclick) {
                            var position = { posX: rposX, posY: rposY, isCorrect: false };
                            if (reviewData[r].Positions.length < reviewDataArrayLength) {
                                reviewData[r].Positions.push(position);
                            }
                            else {
                                reviewData[r].Positions.splice(0, 1);
                                reviewData[r].Positions.push(position);
                            }
                        }
                    }
                    else {
                        var position = { posX: rposX, posY: rposY, isCorrect: false };
                        reviewData[r].Positions = [position]
                    }

                    found = true;
                }
            }

            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                var position = { posX: rposX, posY: rposY, isCorrect: false };
                _obj.Positions = [position]
                reviewData.push(_obj);
            }

        },
        OnPageLoad: function () {

            this.LoadHotSpot();
            this.ApplycontainerWidth();
            $("#div_feedback").hide();
            var _currentPageObject = _Navigator.GetCurrentPage();

            //ATUL:for inbox final feedback
            if (_currentPageObject.pageId == "p4") {
                var allComplete = true;
                if (g_RuntimeData.length <= 0) {
                    allComplete = false;
                }
                for (var j = 0; j < g_RuntimeData.length; j++) {
                    for (var k = 0; k < deleteIdList.length; k++) {
                        if (deleteIdList[k] == g_RuntimeData[j].RowId) {
                            if (g_RuntimeData[j].DeleteState == "") {
                                allComplete = false;
                            }
                        }
                    }
                }
                for (var j = 0; j < g_RuntimeData.length; j++) {
                    for (var k = 0; k < readIdList.length; k++) {
                        if (readIdList[k] == g_RuntimeData[j].RowId) {
                            if (g_RuntimeData[j].OpenState == 'New') {
                                allComplete = false;
                            }
                        }
                    }
                }
                var Ndata = _Navigator.Get();
                if (Ndata["p9"].isAnswered == undefined || !Ndata["p9"].isAnswered || Ndata["p12"].isAnswered == undefined || !Ndata["p12"].isAnswered || Ndata["p14"].isAnswered == undefined || !Ndata["p14"].isAnswered) {
                    allComplete = false;
                }
                if (allComplete) {
                    _Navigator.SetPageStatus(true);
                    if (_currentPageObject.nextPageId == "p17")//show review mode for mailbox if user revisits page
                    {
                        this.MailboxReview();
                    }
                    else {
                        this.ShowHidePageLoadFunctionality();
                    }
                    _currentPageObject.nextPageId = "p17";
                    $("#div_feedback").show();
                    $("#div_feedback").css("display", "inline-block");

                    var fdbkUrl2 = _Settings.dataRoot + "feedbackdata/feedbackc3p4.htm";
                    if (fdbkUrl2 != "feedbackc3p4.htm") {
                        $("#main_feedback").load(fdbkUrl2, function () {
                            // this.SetFeedbackTop()
                            //$('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
                            /*if (isIOS) {
                                $("#div_feedback p:first").attr("role", "text")
                            }
                            $("#div_feedback p:first").attr("tabindex", "-1")
                            window.scrollTo(0, document.body.scrollHeight)
                            $("#div_feedback p:first").focus();*/
                        });
                    }
                    $("#divHotspots0_row1").addClass("disabled");
                    this.EnableNext();


                }
                else {
                    this.ShowHidePageLoadFunctionality();
                }
            }
            if (_currentPageObject.pageId == "p4prev") {
                this.ShowHidePageLoadFunctionality();
            }

            if (_Navigator.IsAnswered() && _currentPageObject.pageId != "p4") {
                this.DisplayInstructorReviewMode();
                $(".divHotSpot").addClass("disabled").attr("disabled", "true");
                $(".divHotSpotDbClick").addClass("disabled").attr("disabled", "true");
                $("#linknext").k_enable();
            }
            if (_currentPageObject.pageId == "p4prev2") {
                var Nadata = _Navigator.Get();
                Nadata["p4prev"].isAnswered = true;
            }
            if (_Navigator.IsPresenterMode()) {
                $(".startbtn").k_disable();
                $("#linknext").k_enable();
                this.PresenterMode();
            }
        },
        PresenterMode: function () {
            debugger;
            var currentPageData = _Navigator.GetCurrentPage();
            var _ndata = _Navigator.Get();
            var pageData = this.GetPageDetailData();
            var appendImage = $(".wrapperimage");
            if (pageData != undefined) {
                if (currentPageData.pageId == "p4prev" && (_ndata['p4prev2'].isVisited == undefined || !_ndata['p4prev2'].isVisited)) {
                    _div ='<div class="reviewDiv Correct" style="z-index:5;width:39px;height:39px;position:absolute;left:361.5px;top:163px;"><img src="assets/images/review-correct.png" style="width:39px;height:35px;"></div>';
                    appendImage.append(_div);
                }
                else if (currentPageData.pageId == "p4") {
                    $(".divHotSpot").addClass("hotspotclicked");
                    $(".divHotSpot").addClass("disabled");
                }
                else if (pageData.ImageHotSpots != undefined ) {
                    for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                        var posObj = "";
                        var _div = ""
                        if (pageData.ImageHotSpots.Hotspots[i].isCorrect != undefined && pageData.ImageHotSpots.Hotspots[i].isCorrect) {
                            posObj = pageData.ImageHotSpots.Hotspots[i];
                            _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.left + ";top:" + posObj.top + ";'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                            $(".divHotSpot").addClass("hotspotclicked");
                            $(".divHotSpot").addClass("disabled");
                            appendImage.append(_div);
                        }
                    }
                }
            }
            //}
            $("#linknext").k_enable();
            if (currentPageData.pageId == "p4") {
                currentPageData.nextPageId = "p17";
            }
            _Navigator.UpdateProgressBar();
        },
        LoadHotSpot: function () {

            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];

            if (pageData != undefined) {

                var hotspotdata = pageData.ImageHotSpots;
                var htmlForDivHotspotImage = "";
                if (pageData.ImageHotSpots != undefined) {
                    for (var i = 0; i < hotspotdata.Hotspots.length; i++) {
                        var currImg = $("img")
                        var orw = currImg.width();
                        var orh = currImg.height();

                        var hsId = hotspotdata.Hotspots[i].HotspotId;

                        var pwdth = hotspotdata.Hotspots[i].width;
                        var phight = hotspotdata.Hotspots[i].height;
                        var pleft = hotspotdata.Hotspots[i].left;
                        var ptop = hotspotdata.Hotspots[i].top;
                        var accessText = hotspotdata.Hotspots[i].accessText;
                        var rowId = hotspotdata.Hotspots[i].rowId;
                        var display = hotspotdata.Hotspots[i].visibility != undefined && hotspotdata.Hotspots[i].visibility == false ? "none" : "block"
                        if ((hotspotdata.Hotspots[i].left + "").indexOf("px") != -1) {
                            pleft = getPerc(Number(hotspotdata.Hotspots[i].left.replace("px", "").replace("%", "")), orw) + "%";
                            ptop = getPerc(Number(hotspotdata.Hotspots[i].top.replace("px", "").replace("%", "")), orh) + "%";
                        }
                        var eventname = hotspotdata.Hotspots[i].eventName;
                        if (eventname != undefined && !isAndroid && !isIOS) {
                            htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='" + hotspotdata.Hotspots[i].HotspotClass + "' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";display:" + display + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "' rowId='" + rowId + "'/>";
                        }
                        else {
                            htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  class='divHotSpot'  id='divHotspots" + i + "_" + hsId + "' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";display:" + display + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "' rowId='" + rowId + "'/>";
                        }
                    }
                    if (currentPageData.pageId == "p4") {
                        $(".wrapperimage").prepend(htmlForDivHotspotImage)
                    }
                    else {
                        $(".wrapperimage").append(htmlForDivHotspotImage)
                    }

                }

            }
        },
        ApplycontainerWidth: function () {
            var innerWidth = $(window).width();
            $("#header-title img").attr("src", "assets/images/logo.png");
            if (innerWidth < 850) {
                if ($(".activityContainer").find(".activityimg").length > 0) {
                    var marginleft = $(".intro-content:first").css("margin-left");
                    marginleft = marginleft.substring(0, marginleft.indexOf("px"));
                    var imgcntwidth = innerWidth - (marginleft * 2);
                    $(".activity").css({ "width": imgcntwidth + "px" })
                }
                if (innerWidth <= 500) {
                    $("#header-title img").attr("src", "assets/images/pearson-logo-v1.png")
                }
            }
            else {
                $(".activity").css({ "width": "auto" })
            }
        },
        OrientationChange: function () {
            this.ApplycontainerWidth();
        },
        HotspotClick: function (_hotspot, event) {
            /*if (_Navigator.IsAnswered())
                return;
                */

            var action = _hotspot.attr("action")

            var score = 0;
            // var status ="";
            var pageData = this.GetPageDetailData();
            nextPageId = "";
            var isCorrect = true;
            var isCorrect2 = true;
            var rowId = "row1";
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                        nextPageId = pageData.ImageHotSpots.Hotspots[i].nextPageId;
                        if (pageData.ImageHotSpots.Hotspots[i].isCorrect != undefined) {
                            isCorrect = pageData.ImageHotSpots.Hotspots[i].isCorrect;
                            isCorrect2 = pageData.ImageHotSpots.Hotspots[i].isCorrect;
                            //ATUL
                            if (pageData.ImageHotSpots.Hotspots[i].showhotspot != undefined) {
                                //ATUL: in delete activity delete hotspot set true 
                                isCorrect2 = pageData.ImageHotSpots.Hotspots[i].showhotspot;
                            }
                            rowId = pageData.ImageHotSpots.Hotspots[i].rowId;
                            correctStatus = pageData.ImageHotSpots.Hotspots[i].isCorrect;
                            if (i == 0) {
                                for (var j = 0; j < deleteIdList.length; j++) {
                                    if (deleteIdList[j] == rowId) {
                                        correctStatus = true;
                                    }
                                }
                            }

                        }
                    }

                }
            }
            this.Updatecorrectstatusfromemail(rowId, correctStatus);
            this.AddHotspotClick(_hotspot, event, isCorrect2);
            _Navigator.SetPageScore(score)
            switch (action) {
                case "next":
                    _Navigator.SetPageStatus(isCorrect);
                    this.HotspotNext(nextPageId, _hotspot);
                    break;
                case "feedback":
                    if (isCorrect) {
                        var _currentPageObject = _Navigator.GetCurrentPage();
                        if (_currentPageObject.pageId != "p4") {
                            _Navigator.SetPageStatus(true);
                        }
                        this.HotspotFeedback(_hotspot);
                    } else {
                        _Navigator.SetPageStatus(false);
                        this.HotspotFeedback(_hotspot);
                        //this.DisableNext();
                        //$('.divHotSpot').k_disable();
                    }
                default:
                    break;
            }            
            _Navigator.GetBookmarkData();
        },
        TrClick: function (_hotspot, event) {
            var action = "feedback";//_hotspot.attr("action")
            var PageId = _hotspot.attr("pageid");
            this.ShowHidePageLoadFunctionality();
            this.Updatecorrectstatusfromemail(_hotspot.attr("id"), "Read");

            var score = 0;
            // var status ="";
            var pageData = this.GetPageDetailData();
            nextPageId = "";
            var isCorrect = true;
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("id")) {
                        nextPageId = pageData.ImageHotSpots.Hotspots[i].nextPageId;
                        if (pageData.ImageHotSpots.Hotspots[i].isCorrect != undefined) {
                            isCorrect = pageData.ImageHotSpots.Hotspots[i].isCorrect;
                        }
                    }

                }
            }
            this.AddHotspotClick(_hotspot, event, isCorrect);
            //_Navigator.SetPageScore(score)
            switch (action) {
                case "next":
                    //_Navigator.SetPageStatus(true);
                    this.pageid();
                    break;
                case "feedback":
                    if (isCorrect) {
                        //_Navigator.SetPageStatus(true);
                        this.HotspotNext(PageId);
                    } else {
                        //_Navigator.SetPageStatus(false);
                        this.HotspotFeedback(_hotspot);
                        this.DisableNext();

                    }
                default:
                    break;
            }
        },
        SetFeedbackTop: function () {
            var ptop = Number($("#div_feedback").position().top);
            var pheight = Number($("#div_feedback").outerHeight());
            var pdiff = (_Settings.minHeight + _Settings.topMargin) - (ptop + pheight);
            if (pdiff > 0) {
                $("#div_feedback").css("margin-top", (pdiff + 35) + "px");
            }
        },
        HotspotFeedback: function (_hotspot) {
            var pageData = this.GetPageDetailData();
            var url = "";
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                        url = pageData.ImageHotSpots.Hotspots[i].feedbackurl;

                        //display enable hotspot:ATUL
                        if (pageData.ImageHotSpots.Hotspots[i].showhotspot != undefined && pageData.ImageHotSpots.Hotspots[i].showhotspot == true) {
                            $(".divHotSpot").css("display", "block");
                        }

                        //delete mail
                        if (pageData.ImageHotSpots.Hotspots[i].deletemail != undefined && pageData.ImageHotSpots.Hotspots[i].deletemail == true) {
                            this.Updatecorrectstatusfromemail(_hotspot.attr("rowId"), "Deleted");
                        }
                    }

                }
            }
            this.EnableNext();

            //ATUL:only read mail feedback
            var _currentPageObject = _Navigator.GetCurrentPage();
            if (_currentPageObject.pageId == "p4") {
                var rowId = $("#OutlookMail > tbody > tr.selected").attr("id");
                for (var i = 0; i < readIdList.length; i++) {
                    if (rowId == readIdList[i]) {
                        url = "feedbackc2p4.htm";
                    }
                }

            }
            if (_currentPageObject.isAnswered == undefined || !_currentPageObject.isAnswered) {
                this.DisableNext();
            }
            else {
                $(".divHotSpot").k_disable();
                $(".divHotSpotDbClick").k_disable();
            }
            var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + url;

            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            if (url != undefined) {
                $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                    // this.SetFeedbackTop()
                    //$('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
                    if (isIOS) {
                        $("#div_feedback p:first").attr("role", "text")
                    }
                    $("#div_feedback p:first").attr("tabindex", "-1")
                    window.scrollTo(0, document.body.scrollHeight)
                    $("#div_feedback p:first").focus();
                });
            }

        },
        TrFeedback: function (_hotspot) {
            var pageData = this.GetPageDetailData();
            var url = "";
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("id")) {
                        url = pageData.ImageHotSpots.Hotspots[i].feedbackurl;
                    }
                }
            }
            var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + url;
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            if (url != undefined) {
                $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                    // $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
                    if (isIOS) {
                        $("#div_feedback p:first").attr("role", "text")
                    }
                    $("#div_feedback p:first").attr("tabindex", "-1")
                    window.scrollTo(0, document.body.scrollHeight)
                    $("#div_feedback p:first").focus();
                });
            }
            //this.EnableNext();
        },
        HotspotNext: function (pageid, _hotspot) {
            if (pageid != undefined && pageid != "") {
                //delete mail:ATUL
                if (_hotspot != undefined && _hotspot != "") {
                    var pageData = this.GetPageDetailData();
                    if (pageData.ImageHotSpots != undefined) {
                        for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                            if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                                if (pageData.ImageHotSpots.Hotspots[i].deletemail != undefined && pageData.ImageHotSpots.Hotspots[i].deletemail == true) {
                                    this.Updatecorrectstatusfromemail(_hotspot.attr("rowId"), "Deleted");
                                }
                            }

                        }
                    }
                }
                _Navigator.LoadPage(pageid)
            }
            else {
                _Navigator.Next();
            }
        },
        Getg_RuntimeData: function () {
            return g_RuntimeData;
        },
        Setg_RuntimeData: function (BMg_RuntimeData) {
            g_RuntimeData = BMg_RuntimeData;
        },
        ShowHidePageLoadFunctionality: function (isPageVisted, isCorrectClicked) {

            var gCurrPageObj = _Navigator.GetCurrentPage();
            var settings = gCurrPageObj.PageId;
            if (gCurrPageObj.pageId == "p4" || gCurrPageObj.pageId == "p4prev") {
                if (g_RuntimeData.length == 0) {
                    obj = {}; obj.RowId = 'row1'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 14;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row2'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 17;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row3'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 18;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row4'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 28;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row5'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 19;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row6'; obj.OpenState = 'Read'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 20;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row7'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 21;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row8'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 22;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row9'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 23;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row10'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 24;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row11'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 25;
                    g_RuntimeData.push(obj);
                    obj = {}; obj.RowId = 'row12'; obj.OpenState = 'New'; obj.DeleteState = ''; obj.DeleteIt = ''; obj.NextPageID = 31;
                    g_RuntimeData.push(obj);
                }
                else {
                    for (var k = 0; k <= g_RuntimeData.length - 1; k++) {
                        if (g_RuntimeData[k].DeleteState == "Deleted") {
                            if (g_RuntimeData[k].RowId == "row2") {
                                $('#OutlookMail > tbody > tr#row2').remove();
                            } else if (g_RuntimeData[k].RowId == "row3") {
                                $('#OutlookMail > tbody > tr#row3').remove();
                            } else if (g_RuntimeData[k].RowId == "row4") {
                                $('#OutlookMail > tbody > tr#row4').remove();
                            } else if (g_RuntimeData[k].RowId == "row7") {
                                $('#OutlookMail > tbody > tr#row7').remove();
                            } else if (g_RuntimeData[k].RowId == "row9") {
                                $('#OutlookMail > tbody > tr#row9').remove();
                            } else if (g_RuntimeData[k].RowId == "row11") {
                                $('#OutlookMail > tbody > tr#row11').remove();
                            } else if (g_RuntimeData[k].RowId == "row12") {
                                $('#OutlookMail > tbody > tr#row12').remove();
                            } else { }
                            //}
                        }
                        else if (g_RuntimeData[k].OpenState == "Read") {
                            if (g_RuntimeData[k].RowId == "row1") {
                                $('#OutlookMail > tbody > tr#row1').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row5") {
                                $('#OutlookMail > tbody > tr#row5').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row6") {
                                $('#OutlookMail > tbody > tr#row6').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row8") {
                                $('#OutlookMail > tbody > tr#row8').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row10") {
                                $('#OutlookMail > tbody > tr#row10').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row2") {
                                $('#OutlookMail > tbody > tr#row2').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row3") {
                                $('#OutlookMail > tbody > tr#row3').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row4") {
                                $('#OutlookMail > tbody > tr#row4').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row7") {
                                $('#OutlookMail > tbody > tr#row7').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row9") {
                                $('#OutlookMail > tbody > tr#row9').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row11") {
                                $('#OutlookMail > tbody > tr#row11').removeClass("unread").addClass("read");
                            } else if (g_RuntimeData[k].RowId == "row12") {
                                $('#OutlookMail > tbody > tr#row12').removeClass("unread").addClass("read");
                            } else {
                                $('#OutlookMail > tbody > tr#row1').removeClass("unread").addClass("read");
                            }
                        }
                        else if (g_RuntimeData[k].OpenState == "New") {
                            allRead = true;
                        }
                    }
                    if ($('#OutlookMail > tbody > tr.unread').length > 0) {
                        $('#inboxCounter').html('(' + $('#OutlookMail > tbody > tr.unread').length + ')');
                    } else {
                        $('#inboxCounter').css('display', 'none');
                    }
                    if (($('#OutlookMail > tbody > tr').length == 12) && (allRead == false)) {
                        //ITSimModule.ShowSuccessPopup();
                    }
                    else {
                        // $.fancybox.close();
                    }
                }
            }
        },
        Updatecorrectstatusfromemail: function (rowId, status) {
            for (var k = 0; k <= g_RuntimeData.length - 1; k++) {
                if (g_RuntimeData[k].RowId == rowId) {
                    if (status == "Deleted") {
                        g_RuntimeData[k].DeleteState = status;
                    }
                    else if (status == "Read") {
                        g_RuntimeData[k].OpenState = status;
                    }
                    else {
                        if (g_RuntimeData[k].IsCorrect == undefined) {
                            g_RuntimeData[k].IsCorrect = status;
                        }
                    }


                }
            }
        },
        LoadFeedback: function (url) {
            tr_count = 0;//ATUL: 
            var _currentPageObject = _Navigator.GetCurrentPage();
            var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + url;
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            if (_currentPageObject.pageId == "p4") {
                var allComplete = true;
                for (var j = 0; j < g_RuntimeData.length; j++) {
                    for (var k = 0; k < deleteIdList.length; k++) {
                        if (deleteIdList[k] == g_RuntimeData[j].RowId) {
                            if (g_RuntimeData[j].DeleteState == "") {
                                allComplete = false;
                            }
                        }
                    }
                }
                for (var j = 0; j < g_RuntimeData.length; j++) {
                    for (var k = 0; k < readIdList.length; k++) {
                        if (readIdList[k] == g_RuntimeData[j].RowId) {
                            if (g_RuntimeData[j].OpenState == 'New') {
                                allComplete = false;
                            }
                        }
                    }
                }
                var Ndata = _Navigator.Get();
                if (Ndata["p9"].isAnswered == undefined || !Ndata["p9"].isAnswered || Ndata["p12"].isAnswered == undefined || !Ndata["p12"].isAnswered || Ndata["p14"].isAnswered == undefined || !Ndata["p14"].isAnswered) {
                    allComplete = false;
                }
            }
            if (url != undefined) {
                $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                    // this.SetFeedbackTop()
                    if (isIOS) {
                        $("#div_feedback p:first").attr("role", "text")
                    }
                    $("#div_feedback p:first").attr("tabindex", "-1")
                    window.scrollTo(0, document.body.scrollHeight)
                    $("#div_feedback p:first").focus();
                    if (allComplete) {
                        _Navigator.SetPageStatus(true);
                        _currentPageObject.nextPageId = "p17";
                        //this.EnableNext();
                        var fdbkUrl2 = _Settings.dataRoot + "feedbackdata/feedbackc3p4.htm";
                        if (url != "feedbackc3p4.htm") {
                            $("#main_feedback").load(fdbkUrl2, function () {
                                $(".div_fdkcontent>p")[2].remove();
                                //$('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });

                            });
                        }

                    }
                });
            }
            $("#OutlookMail > tbody > tr").k_disable();
            $("#divHotspots0_row1").k_disable();
            _Navigator.UpdateProgressBar();


        },
        MailboxReview: function () {
            for (var i = 0; i < g_RuntimeData.length; i++) {
                var currentRow = g_RuntimeData[i];
                var rowId = g_RuntimeData[i].RowId;
                if (rowId == "row6") {
                    if (currentRow.IsCorrect == undefined) {
                        currentRow.IsCorrect = true;
                    }
                }
                if (currentRow.IsCorrect != undefined) {

                    if (currentRow.IsCorrect) {
                        var _div = "<div class='reviewDiv Correct' style='z-index:10000;width:20px;height:20px;margin-left:" + 0 + "px;margin-top:" + 0 + "px;'><img src='assets/images/correct-icon.png' style='width:20px;height:20px;' /></div>";
                        $("#" + rowId).find("td:first").append(_div);
                    }
                    else {
                        var _divI = "<div class='reviewDiv InCorrect' style='z-index:10000;width:20px;height:20px;margin-left:" + 0 + "px;margin-top:" + 0 + "px;'><img src='assets/images/incorrect-icon.png' style='width:20px;height:20px;' /></div>";
                        $("#" + rowId).find("td:first").append(_divI);
                    }
                }
            }
            //for row1 ,row6 default is correct
            var _div = "<div class='reviewDiv Correct' style='z-index:10000;width:20px;height:20px;margin-left:" + 0 + "px;margin-top:" + 0 + "px;'><img src='assets/images/correct-icon.png' style='width:20px;height:20px;' /></div>";
            $("#row1").find("td:first").append(_div);
        },
        AppendFooter: function () {
            if ($(".presentationModeFooter").length == 0) {
                var str = '<div class="presentationModeFooter">Presentation Mode</div>';
                $("footer").append($(str));
                $("footer").show();
                $("#linknext").k_enable();
            }
            else {
                $("footer").show();
                $("#linknext").k_enable();
            }
        },
         AppendScormReviewFooter: function () {
            if ($(".ScormReviewFooter").length == 0) {
                var str = '<div class="ScormReviewFooter"> Review Mode</div>';
                $("footer").append($(str));
                $("footer").show();
                $("#linknext").k_enable();
            }
        },
    }
})();
function DisplaySubmenu() {
    if ($(".levelsubMenu").is(":visible")) {
        $(".levelsubMenu").hide();
        $('.rightarrow').removeClass('fa-chevron-up').addClass('fa-chevron-right');
    } else {
        $(".levelsubMenu").show();
        $('.rightarrow').removeClass('fa-chevron-right').addClass('fa-chevron-up');
    }
}
var mTreeObj = {
    Goto: function (pageid) {
        _Navigator.LoadPage(pageid);
    },
    GoToPrev: function () {

        try {
            if ($(".navBtn.prev").css("pointer-events") == "none") {
                return;
            }
            else {
                _Navigator.Prev();
                if (_Navigator.GetCurrentPage().nextPageId != undefined && _Navigator.GetCurrentPage().nextPageId != "") {
                    enableobj($(".navBtn.next"));
                } else {
                    disableobj($(".navBtn.next"));
                }
                if (_Navigator.GetCurrentPage().PrevPageId != undefined && _Navigator.GetCurrentPage().PrevPageId != "") {
                    enableobj($(".navBtn.prev"));
                } else {
                    disableobj($(".navBtn.prev"));
                }
            }
        } catch (expn) {
            //menuNodeIndex++;
            alert(expn.message);
        }
    },
    GoToNext: function () {
        try {

            if ($(".navBtn.next").css("pointer-events") == "none") {
                return;
            }
            else {
                _Navigator.Next();
                if (_Navigator.GetCurrentPage().nextPageId != undefined && _Navigator.GetCurrentPage().nextPageId != "") {
                    enableobj($(".navBtn.next"));
                } else {
                    disableobj($(".navBtn.next"));
                }
                if (_Navigator.GetCurrentPage().prevPageId != undefined && _Navigator.GetCurrentPage().prevPageId != "") {
                    enableobj($(".navBtn.prev"));
                } else {
                    disableobj($(".navBtn.prev"));
                }
            }

        } catch (expn) {
            //menuNodeIndex--;
            alert(expn.message);
        }
    }

};


// td click for particular feedback popup
$(document).on("click", '.fbkmail1', function (event) {
    var g_RuntimeData = _ModuleCommon.Getg_RuntimeData();
    if (checkMail1 == true) {
        for (var k = 1; k <= g_RuntimeData.length - 1; k++) {
            if (g_RuntimeData[k].RowId == "row2") {
                g_RuntimeData[k].DeleteState = "Deleted";
                _ModuleCommon.Updatecorrectstatusfromemail("row2", true);
            }
        }
        $("#linknext").k_enable();
        var pageId = $("#row2").attr("pageid");
        var Ndata = _Navigator.Get();
        var progressLevels = _Navigator.GetProgressLevelsCnt();
        /*if(Ndata[pageId].isVisited == undefined && !Ndata[pageId].isVisited)
        {
             progressLevels[0] = (progressLevels[0] + 1);
        }*/
        Ndata[pageId].isAnswered = true;
        Ndata[pageId].isVisited = true;
        $('#OutlookMail > tbody > tr#row2').remove();
        $(this).removeClass("fbkmail1");
        _ModuleCommon.LoadFeedback("feedbackc2p6.htm");
    }
});

$(document).on("click", '.fbkmail2', function (event) {
    var g_RuntimeData = _ModuleCommon.Getg_RuntimeData();
    if (checkMail2 == true) {
        checkMail2 = false;
        for (var k = 1; k <= g_RuntimeData.length - 1; k++) {
            if (g_RuntimeData[k].RowId == "row3") {
                g_RuntimeData[k].DeleteState = "Deleted";
                _ModuleCommon.Updatecorrectstatusfromemail("row3", true);
            }
        }
        $("#linknext").k_enable();
        var pageId = $("#row3").attr("pageid");
        var Ndata = _Navigator.Get();
        var progressLevels = _Navigator.GetProgressLevelsCnt();
        Ndata[pageId].isAnswered = true;
        Ndata[pageId].isVisited = true;
        $('#OutlookMail > tbody > tr#row3').remove();
        $(this).removeClass("fbkmail2");
        _ModuleCommon.LoadFeedback("feedbackcp7.htm");


    }
    //
});

$(document).on("click", '.fbkmail3', function (event) {
    var g_RuntimeData = _ModuleCommon.Getg_RuntimeData();
    if (checkMail3 == true) {
        checkMail3 = false;
        for (var k = 1; k <= g_RuntimeData.length - 1; k++) {
            if (g_RuntimeData[k].RowId == "row4") {
                g_RuntimeData[k].DeleteState = "Deleted";
                _ModuleCommon.Updatecorrectstatusfromemail("row4", true);
            }
        }
        $("#linknext").k_enable();
        var pageId = $("#row4").attr("pageid");
        var Ndata = _Navigator.Get();
        var progressLevels = _Navigator.GetProgressLevelsCnt();
        Ndata[pageId].isAnswered = true;
        Ndata[pageId].isVisited = true;
        $('#OutlookMail > tbody > tr#row4').remove();
        $(this).removeClass("fbkmail3");
        _ModuleCommon.LoadFeedback("feedbackcp8.htm");

    }
    //
});

$(document).on("click", '.fbkmail4', function (event) {
    var g_RuntimeData = _ModuleCommon.Getg_RuntimeData();
    if (checkMail4 == true) {
        checkMail4 = false;
        for (var k = 1; k <= g_RuntimeData.length - 1; k++) {
            if (g_RuntimeData[k].RowId == "row7") {
                g_RuntimeData[k].DeleteState = "Deleted";
                _ModuleCommon.Updatecorrectstatusfromemail("row7", true);
            }
        }
        $("#linknext").k_enable();
        var pageId = $("#row7").attr("pageid");
        var Ndata = _Navigator.Get();
        var progressLevels = _Navigator.GetProgressLevelsCnt();
        Ndata[pageId].isAnswered = true;
        Ndata[pageId].isVisited = true;
        $('#OutlookMail > tbody > tr#row7').remove();
        $(this).removeClass("fbkmail4");
        _ModuleCommon.LoadFeedback("feedbackp11.htm");

    }
    //
});

$(document).on("click", '.fbkmail5', function (event) {
    var g_RuntimeData = _ModuleCommon.Getg_RuntimeData();
    if (checkMail4 == true) {
        checkMail4 = false;
        for (var k = 1; k <= g_RuntimeData.length - 1; k++) {
            if (g_RuntimeData[k].RowId == "row7") {
                g_RuntimeData[k].DeleteState = "Deleted";
                _ModuleCommon.Updatecorrectstatusfromemail("row7", true);
            }
        }
        $("#linknext").k_enable();
        var pageId = $("#row7").attr("pageid");
        var Ndata = _Navigator.Get();
        var progressLevels = _Navigator.GetProgressLevelsCnt();
        Ndata[pageId].isAnswered = true;
        Ndata[pageId].isVisited = true;
        $('#OutlookMail > tbody > tr#row7').remove();
        $(this).removeClass("fbkmail5");
        _ModuleCommon.LoadFeedback("feedbackp11.htm");

    }
    //
});

$(document).on("click", '.fbkmail6', function (event) {
    var g_RuntimeData = _ModuleCommon.Getg_RuntimeData();
    if (checkMail5 == true) {
        checkMail5 = false;
        for (var k = 1; k <= g_RuntimeData.length - 1; k++) {
            if (g_RuntimeData[k].RowId == "row9") {
                g_RuntimeData[k].DeleteState = "Deleted";
                _ModuleCommon.Updatecorrectstatusfromemail("row9", true);
            }
        }
        $("#linknext").k_enable();
        var pageId = $("#row9").attr("pageid");
        var Ndata = _Navigator.Get();
        var progressLevels = _Navigator.GetProgressLevelsCnt();
        Ndata[pageId].isAnswered = true;
        Ndata[pageId].isVisited = true;
        $('#OutlookMail > tbody > tr#row9').remove();
        $(this).removeClass("fbkmail6");
        _ModuleCommon.LoadFeedback("feedbackcp13.htm");

    }
    //
});

$(document).on("click", '.fbkmail7', function (event) {
    var g_RuntimeData = _ModuleCommon.Getg_RuntimeData();
    if (checkMail6 == true) {
        checkMail6 = false;
        for (var k = 1; k <= g_RuntimeData.length - 1; k++) {
            if (g_RuntimeData[k].RowId == "row11") {
                g_RuntimeData[k].DeleteState = "Deleted";
                _ModuleCommon.Updatecorrectstatusfromemail("row11", true);
            }
        }
        $("#linknext").k_enable();
        var pageId = $("#row11").attr("pageid");
        var Ndata = _Navigator.Get();
        var progressLevels = _Navigator.GetProgressLevelsCnt();
        Ndata[pageId].isAnswered = true;
        Ndata[pageId].isVisited = true;
        $('#OutlookMail > tbody > tr#row11').remove();
        $(this).removeClass("fbkmail7");
        _ModuleCommon.LoadFeedback("feedbackcp15.htm");

    }
    //
});

$(document).on("click", '.fbkmail8', function (event) {
    var g_RuntimeData = _ModuleCommon.Getg_RuntimeData();
    if (checkMail7 == true) {
        checkMail7 = false;
        for (var k = 1; k <= g_RuntimeData.length - 1; k++) {
            if (g_RuntimeData[k].RowId == "row12") {
                g_RuntimeData[k].DeleteState = "Deleted";
                _ModuleCommon.Updatecorrectstatusfromemail("row12", true);
            }
        }
        $("#linknext").k_enable();
        var pageId = $("#row12").attr("pageid");
        var Ndata = _Navigator.Get();
        var progressLevels = _Navigator.GetProgressLevelsCnt();
        Ndata[pageId].isAnswered = true;
        Ndata[pageId].isVisited = true;
        $('#OutlookMail > tbody > tr#row12').remove();
        $(this).removeClass("fbkmail8");
        _ModuleCommon.LoadFeedback("feedbackcp16.htm");

    }
    //
});



// delete hotspot click for particular feedback popup

$(document).on("keydown", "#divHotspots0_row1", function (event) {
    if (_Navigator.IsPresenterMode()) {
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $(this).trigger("click");
    }
});
$(document).on("keydown", ".fbkmail1, .fbkmail2, .fbkmail3, .fbkmail4, .fbkmail5, .fbkmail6, .fbkmail7, .fbkmail8, .fbkmail10, .fbkmail11", function (event) {
    if (_Navigator.IsPresenterMode()) {
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        tr_count = 0;
        $(this).trigger("click");
    }
});
$(document).on("click touchstart", "#divHotspots0_row1", function (event) {
    tr_count = 0;
    var selectedRowID = $('#OutlookMail > tbody > tr.selected').attr("id");
    if (selectedRowID == undefined) { } else {
        switch (selectedRowID) {
            case "row2":
                if (checkMail1 == undefined || checkMail1 == true) {
                    //ITSimModule.ShowCustomPopup()
                    checkMail1 = true;
                    $('.fbkmail1').attr({ "role": "link", tabindex: 0, "aria-label": "blank subject" });
                    $('.fbkmail1').closest("tr").removeAttr("tabindex");
                    $('.fbkmail1').closest("tr").addClass("trdelete")
                }
                break;
            case "row3":
                if (checkMail2 == undefined || checkMail2 == true) {
                    //ITSimModule.ShowCustomPopup()
                    checkMail2 = true;
                    $('.fbkmail2').attr("role", "link");
                    $('.fbkmail2').attr({ "role": "link", tabindex: 0, "aria-label": "blank subject" });
                    $('.fbkmail2').closest("tr").removeAttr("tabindex");
                    $('.fbkmail2').closest("tr").addClass("trdelete")
                }
                break;
            case "row4":
                if (checkMail3 == undefined || checkMail3 == true) {
                    //ITSimModule.ShowCustomPopup()
                    checkMail3 = true;
                    $('.fbkmail3').attr("role", "link");
                    $('.fbkmail3').attr({ "role": "link", tabindex: 0, "aria-label": "blank subject" });
                    $('.fbkmail3').closest("tr").removeAttr("tabindex");
                    $('.fbkmail3').closest("tr").addClass("trdelete")
                }
                break;
            case "row7":
                if (checkMail4 == undefined || checkMail4 == true) {
                    //ITSimModule.ShowCustomPopup()
                    checkMail4 = true;
                    $('.fbkmail4').attr("role", "link");
                    $('.fbkmail5').attr("role", "link");
                    $('.fbkmail4').attr({ "role": "link", tabindex: 0, "aria-label": "blank subject" });
                    $('.fbkmail4').closest("tr").removeAttr("tabindex");
                    $('.fbkmail4').closest("tr").addClass("trdelete")
                    $('.fbkmail5').attr({ "role": "link", tabindex: 0, "aria-label": "blank subject" });
                    $('.fbkmail5').closest("tr").removeAttr("tabindex");
                    $('.fbkmail5').closest("tr").addClass("trdelete")
                }
                break;
            case "row9":
                if (checkMail5 == undefined || checkMail5 == true) {
                    //ITSimModule.ShowCustomPopup()
                    checkMail5 = true;
                    $('.fbkmail6').attr("role", "link");
                    $('.fbkmail10').attr("role", "link");
                    $('.fbkmail6').attr({ "role": "link", tabindex: 0, "aria-label": "blank subject" });
                    $('.fbkmail6').closest("tr").removeAttr("tabindex");
                    $('.fbkmail6').closest("tr").addClass("trdelete");
                    $('.fbkmail10').attr({ "role": "link", tabindex: 0, "aria-label": "blank subject" });
                    $('.fbkmail10').closest("tr").removeAttr("tabindex");
                    $('.fbkmail10').closest("tr").addClass("trdelete")
                }
                break;
            case "row11":
                if (checkMail6 == undefined || checkMail6 == true) {
                    //ITSimModule.ShowCustomPopup()
                    checkMail6 = true;
                    $('.fbkmail7').attr("role", "link");
                    $('.fbkmail7').attr({ "role": "link", tabindex: 0, "aria-label": "blank subject" });
                    $('.fbkmail7').closest("tr").removeAttr("tabindex");
                    $('.fbkmail7').closest("tr").addClass("trdelete")
                }
                break;
            case "row12":
                if (checkMail7 == undefined || checkMail7 == true) {
                    //ITSimModule.ShowCustomPopup()
                    checkMail7 = true;
                    $('.fbkmail8').attr("role", "link");
                    $('.fbkmail8').attr({ "role": "link", tabindex: 0, "aria-label": "blank subject" });
                    $('.fbkmail8').closest("tr").removeAttr("tabindex");
                    $('.fbkmail8').closest("tr").addClass("trdelete")
                }
                break;
            default:
                _ModuleCommon.Updatecorrectstatusfromemail(selectedRowID, false);
        }
    }
    if (selectedRowID != undefined) {
        hotspotclicked = true;
        //$(this).addClass("hotspotclicked")
        hotspot = $(this);
        setTimeout(function () {
            hotspotclicked = false;
            _ModuleCommon.HotspotClick(hotspot, event);

        }, 400)
    }
});



function disableobj(obj) {
    obj.css({
        "opacity": ".5",
        "pointer-events": "none"
    });
    obj.attr("aria-disabled", "true");
}
function enableobj(obj) {
    obj.css({
        "opacity": "1",
        "pointer-events": ""
    });
    obj.attr("aria-disabled", "false");
}

$.knowdlCountDown = function (options) {
    var timer,
        instance = this,
        seconds = options.seconds || 30,
        updateStatus = options.onUpdateStatus || function () { },
        counterEnd = options.onCounterEnd || function () { };

    function decrementCounter() {
        updateStatus(seconds);
        if (seconds === 0) {
            counterEnd();
            instance.stop();
        }
        seconds--;
    }

    this.start = function () {
        clearInterval(timer);
        timer = 0;
        seconds = options.seconds;
        timer = setInterval(decrementCounter, 1000);
    };

    this.stop = function () {
        clearInterval(timer);
        onCounterEnd();
    };
    function onCounterEnd() {
        if ($("#counterdiv").text() == "00:00") {

            var _hotspot = $(".divHotSpot");
            var pageData = _ModuleCommon.GetPageDetailData();
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                        pageData.ImageHotSpots.Hotspots[i].isIncorrect = true;
                    }
                }
            }
            _Navigator.SetPageStatus(false);
            _ModuleCommon.HotspotFeedback(_hotspot);
        }
    }

    return instance;

}

$(document).ready(function () {
    _Navigator.Initialize();
    $('body').attr({ "id": "thebody", "onmousedown": "document.getElementById('thebody').classList.add('no-focus');", "onkeydown": "document.getElementById('thebody').classList.remove('no-focus');" })
});
