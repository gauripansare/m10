//This api will contain navigation logic and page load.
//It will also handle the question navigation if the page is having multiple questions.
var _Navigator = (function () {
    var packageType = "";//presenter/scorm/revel
    var isReviewMode = false;
    var _currentPageId = "";
    var _currentPageObject = {};
    var progressLevels = [20];//ATUL:  pages add, after visit 
    var totalsimscore = 18;
    //var presentermode = false;
    var bookmarkpageid = "";
    var retrycnt = 1;
    var quizpageid = "p17";
    var Summarybookmark = false;
    var _NData = {
        "p1": {
            pageId: "p1",
            prevPageId: "",
            nextPageId: "p2",
            dataurl: "p1.htm",
            isStartPage: true,
            isAnswered: true,
        },
        "p2": {
            pageId: "p2",
            prevPageId: "p1",
            nextPageId: "p4prev",
            dataurl: "p2.htm",
            hinturl: "hintp2.htm",
            hasActivity: true,
            accessText: "Windows 10 Desktop ",
        },
        "p3": {
            pageId: "p3",
            prevPageId: "p2",
            nextPageId: "p4prev",
            dataurl: "p3.htm",
            hinturl: "hintp3.htm",
            hasActivity: true,
            accessText: "Windows 10 Desktop with Start window open",
        },
        "p4prev": {
            pageId: "p4prev",
            prevPageId: "p2",
            nextPageId: "p4prev2",
            dataurl: "p4prev.htm",
            hinturl: "hintp4.htm",
            hasActivity: true,
            accessText: "Inbox james p. otter (otterj@western.com) - Microsoft outlook",
        },
        "p4prev2": {
            pageId: "p4prev2",
            prevPageId: "p4prev",
            nextPageId: "p4",
            dataurl: "p4prev2.htm",
            hinturl: "hintp5.htm",
            hasActivity: true,
            accessText: "Email Account concern message",
        },
        "p4": {
            pageId: "p4",
            prevPageId: "p4prev2",
            nextPageId: "p4",
            dataurl: "p4.htm",
            //hinturl: "hintp4.htm",
            hasActivity: true,
            accessText: "Inbox james p. otter (otterj@western.com) - Microsoft outlook",
        },
        "p5": {
            pageId: "p5",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p5.htm",
            //hinturl: "hintp5.htm",
            hasActivity: false,
            accessText: "Email Account concern message",
        },
        "p6": {
            pageId: "p6",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p6.htm",
            // hinturl: "",
            hasActivity: true,
            accessText: "message with no subject line",
        },
        "p7": {
            pageId: "p7",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p7.htm",
            // hinturl: "",
            hasActivity: true,
            accessText: "From abc engineering, new engineering designs - message",
        },
        "p8": {
            pageId: "p8",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p8.htm",
            // hinturl: "",
            hasActivity: true,
            accessText: "Re: re: re: please read, very important! - message",
        },
        "p9": {
            pageId: "p9",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p9.htm",
            // hinturl: "",
            hasActivity: true,
            accessText: "re: meeting tomorrow - message",
        },
        "p10": {
            pageId: "p10",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p10.htm",
            // hinturl: "",
            hasActivity: false,
            accessText: "rathbone CD - Message",
        },
        "p11": {
            pageId: "p11",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p11.htm",
            // hinturl: "",
            hasActivity: true,
            accessText: "ebay account verification - message",
        },
        "p12": {
            pageId: "p12",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p12.htm",
            // hinturl: "",
            hasActivity: true,
            accessText: "meeting wed. - message",
        },
        "p13": {
            pageId: "p13",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p13.htm",
            // hinturl: "",
            hasActivity: true,
            accessText: "software clearance sale - deals too good to be true! - message",
        },
        "p14": {
            pageId: "p14",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p14.htm",
            //hinturl: "hintp14.htm",
            hasActivity: true,
            accessText: "re: specs for kidder - message",
        },
        "p15": {
            pageId: "p15",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p15.htm",
            //hinturl: "hintp15.htm",
            hasActivity: true,
            accessText: "i need your help! - message",
        },
        "p16": {
            pageId: "p16",
            prevPageId: "p4",
            nextPageId: "p4",
            dataurl: "p16.htm",
            //hinturl: "hintp16.htm",
            hasActivity: true,
            accessText: "make money now - survey attached! - message",
        },
        "p17": {
            pageId: "p17",
            lastPageId: "p17",
            prevPageId: "p4",
            nextPageId: "",
            dataurl: "p17.htm",
            hasActivity: true,
            isLastPage: true,
            isAssessment: true,
            hideHint: true,
        }
    }
    var _StateData = {}

    function OnPageLoad() {
        $("h2.pageheading").attr("tabindex", "-1");
        $(".hintcontainer").hide()
        $(".header-content-dock").css({ "visibility": "hidden" });
        $(".hintcontainer").hide()
        $(".hintlink").removeClass("expanded");
        $(".hintlink").attr("aria-expanded", "false")
        $("#header-title h1").show()
        $("#header-title").removeClass("startpage");
        if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
            $("#header-title h1").hide()
            $("#header-title").addClass("startpage");
        }
        _ModuleCommon.OnPageLoad();

        if (_Navigator.IsPresenterMode()) {
            _ModuleCommon.AppendFooter();
        }
        if (_Navigator.IsReviewMode()) {
            currentQuestionIndex = 0;
            $(".divHotSpotCommon").k_disable();
            $(".divHotSpot").k_disable();
            $("#linknext").k_enable();
            $(".startbtn").link_k_disable();
            if (_currentPageObject.pageId == "p4") {
                _currentPageObject.nextPageId = "p17";
            }
        }
        if (_currentPageObject.pageId == "p4" || _currentPageObject.pageId == "p4prev") {
            if(Firefox){
                $("#OutlookMail").attr("role","presentation");
            }
            if(isIOS){
                $("#OutlookMail .accessibility").css("position","absolute");
            }
            if (_currentPageObject.isAnswered != undefined && _currentPageObject.isAnswered) {
                $(".Email_instruction").html("");
            }
            else {
                if (!isIpad && !isIphone && !isAndroid) {
                    if (isIE11version) {
                        $(".Email_instruction").html("Press Enter key to select an email and then press Shift + Double Enter to open an email.");
                    }
                    else if (isChrome || Firefox) {
                        $(".Email_instruction").html("Press Shift + Enter key to select an email.  Press Shift + Double Enter to open an email");                    
                    }
                    else{
                    $(".Email_instruction").html("Press Enter key to select an email.  Press Double Enter to open an email");
                    }
                }                
            }
            if (isIpad || isIphone || isAndroid) {
                $("#divHotspots0_row1").hide();
            }
        }
        if (_Navigator.IsPresenterMode() || _Navigator.IsReviewMode()) {
            if (isIphone || isAndroid) {
                $("#header-progress .presentationModeFooter").hide();
            }
        }

        submitCounter = 0;
        if ((/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))) {
            $('#footer-navigation').css('display', 'table');
        }
        if (_currentPageObject.accessText != undefined) {
            $(".activityimg").attr("alt", _currentPageObject.accessText);
        }
        
    }
    return {
        Get: function () {
            return _NData;
        },
        Start: function () {
            this.LoadPage("p1");
            if (this.IsPresenterMode()) {
                _ModuleCommon.AppendFooter();
            }

            if (this.IsReviewMode()) {
                _ModuleCommon.AppendScormReviewFooter();
                _Assessment.SetCurrentQuestionIndex(0);
            }
        },
        GetProgressLevelsCnt: function () {
            return progressLevels;
        },
        LoadPage: function (pageId, jsonObj) {
            $(".hintcontainer").hide();
            $(".header-content-dock").css({ "visibility": "hidden" });
            if (_Navigator.IsRevel() && _currentPageId != undefined && _currentPageId != "") {
                LifeCycleEvents.OnUnloadFromPlayer()
            }
            if (jsonObj == undefined) {
                jsonObj = {};
            }

            bookmarkpageid = pageId;
            _currentPageId = pageId;
            this.UpdateProgressBar();
            _currentPageObject = _NData[_currentPageId];
            if (_currentPageObject.hasActivity == undefined || _currentPageObject.hasActivity == false) {
                if ((_currentPageObject.isAnswered == undefined || !_currentPageObject.isAnswered) && _currentPageObject.pageId != "p5") {
                    progressLevels[0] = (progressLevels[0] + 1);
                }
                this.SetPageStatus(true);
            }

            this.UpdateProgressBar();
            if (_currentPageId == "p3" && (_currentPageObject.isVisited == undefined || !_currentPageObject.isVisited)) {
                _NData["p2"].nextPageId = "p3";
                _NData["p4prev"].prevPageId = "p3";
                progressLevels[0] = (progressLevels[0] + 1);
            }
            $("#header-progress").show();
            $("#header-title").show();
            $("footer").show();

            if (_currentPageObject.hasActivity == undefined || _currentPageObject.hasActivity == false) {
                this.SetPageStatus(true);
            }

            $('html,body').css({ scrollTop: 0 })
            if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
                $("#linkprevious").k_disable();
                $("#linknext").k_enable();
                $("footer").hide();
                $("#header-progress").hide();
                if (this.IsReviewMode()) {
                    _ModuleCommon.AppendScormReviewFooter();
                    _Assessment.SetCurrentQuestionIndex(0)
                }
                if (this.IsPresenterMode())
                    _ModuleCommon.AppendFooter();

            }
            if (_currentPageObject.hinturl == undefined) {
                $('.hintDiv').k_disable();
            } else {
                $('.hintDiv').k_enable();
            }

            if (_currentPageObject.hasActivity != undefined && _currentPageObject.hasActivity && !this.IsAnswered()) {
                $("#linknext").k_disable();
                $('#submitbtn').k_disable();
            }
            if (this.IsAnswered()) {
                $("#linknext").k_enable();

            }
            /*ATUL
            if (_Navigator.IsPresenterMode() && _currentPageObject.pageId != "p5" && _currentPageObject.pageId != "p17") {
                _currentPageObject.isAnswered = true;
            }*/
            if (_currentPageObject.isLastPage != undefined && _currentPageObject.isLastPage) {
                $("#linknext").k_disable();
            }
            _currentPageObject.isVisited = true;
            var pageUrl = _Settings.dataRoot + _currentPageObject.dataurl + _Caching.GetUrlExtension();

            if (_currentPageObject.isStartPage) {
                $(".main-content").load(pageUrl, function () {
                    OnPageLoad();
                    $("#header1").focus();
                    if (_Navigator.IsPresenterMode()) {
                        $(".wrapper-img").prepend('<div class="presentationModeFooter" >Presentation Mode</div>')
                        $("footer").show();
                        $("#linknext").k_enable();
                    }
                    if (_Navigator.IsReviewMode()) {
                        $(".wrapper-img").prepend('<div class="presentationModeFooter" >Review Mode</div>')
                        $("footer").show();
                        $("#linknext").k_enable();
                    }
                });
            } else {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1, function () { });
                        //
                        if ($(".activityimg").length > 0) {
                            $('.activityimg').load(function () {
                                OnPageLoad();
                                if (_currentPageObject.pageId == "p2") {
                                    $("#titleheader").attr({ tabindex: "-1", role: "heading" }).focus();
                                }
                                else {
                                    $("h2:first").attr({ tabindex: "-1", role: "heading" }).focus();
                                }
                                /*if (_currentPageObject.pageId == "p2") {
                                    $("#titleheader").focus();
                                }
                                else if(isIpad && _currentPageId != quizpageid){
                                    $("#titleheader").focus();
                                    setTimeout( function(){
                                        $("#progressdiv").focus();
                                    },0);
                                }
                                else if ((isIphone || isAndroid) && _NData[_currentPageId].isLoaded != undefined && _NData[_currentPageId].isLoaded == true) {//iphone android on previous focus is set to header
                                    $("h2").attr("tabindex", "0");
                                    $("h2").focus();
                                }
                                else {
                                    //$(".header-informarion .hintlink").focus();
                                    //$("h2").focus();
                                    if ( ( isIpad || isChrome ) && !isAndroid) {
                                        $("h2").attr("tabindex", "0");
                                        $("h2").focus();
                                    }
                                    else {
                                        $("#progressdiv").focus();
                                    }
                                    // setReader("progressdiv");

                                }
                                */
                                _NData[_currentPageId].isLoaded = true;
                            });
                        }
                        else {
                            OnPageLoad();
                        }
                        //



                        if (_Navigator.IsPresenterMode() && (_currentPageObject.pageId != quizpageid || _currentPageObject.pageId != "summary")) {
                            _ModuleCommon.PresenterMode();
                        }
                        if (_currentPageId == quizpageid)//  change to assessment id
                        {
                            if (Summarybookmark) {

                                $(".intro-content-question").hide();
                                $(".questionwrapper").hide();
                                $("#Summary").show();
                                $("#Questioninfo").hide();
                                $("#Summary").load("pagedata/Summary.htm", function () {
                                    _Assessment.ShowSummary();
                                    $("h2:first").attr({ tabindex: "-1", role: "heading" }).focus();
                                    $("#linkprevious").k_enable();

                                })
                                $("#climate-deal").css("margin-left", "23%");
                                $("#linknext").k_disable();
                            }
                            else {
                                _Assessment.ShowQuestion();
                                $("h2:first").attr({ tabindex: "-1", role: "heading" }).focus();
                            }
                        }

                        $("#hintdiv").show();
                        if (_currentPageObject.hideHint != undefined && _currentPageObject.hideHint) {
                            $("#hintdiv").hide();
                        }
                        if (_currentPageObject.hinturl == undefined) {
                            $(".hintlink").k_disable();
                        }
                        else {
                            $(".hintlink").k_enable();
                            $(".hintcontent").load("pagedata/hintdata/" + _currentPageObject.hinturl, function () { });
                        }
                        if ((/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))) {
                            $('#footer-navigation').css('display', 'table');
                        }

                        _Navigator.GetBookmarkData();
                    });
                })
            }
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnLoadFromPlayer()
            }

        },
        GetSummarybookmark: function () {
            return Summarybookmark;
        },
        LoadDefaultQuestion: function () {
            if (_currentPageObject.questions.length > 0) {
                _questionId = 0;
                _currentPageObject.questions[0].isQuestionVisit = true;
                for (var i = 0; i < _currentPageObject.questions.length; i++) {
                    if (_currentPageObject.questions[i].isCurrent) {
                        _questionId = i;
                    }
                }
                //second parameter is to disable question effect.
                _Question.Load(_currentPageObject.questions[_questionId], {
                    disableEffect: true
                });
            }
        },
        Prev: function () {
            Summarybookmark = false;
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Previous link click.")
            }
            if (_currentPageObject.pageId == quizpageid && typeof (currentQuestionIndex) != 'undefined' && currentQuestionIndex > 0) {
                if (isIphone) {
                    $("#progressdiv").focus();
                }
                $("#ReviewIns").hide();
                $(".intro-content-question").show();
                $("#Questioninfo").show();
                currentQuestionIndex = currentQuestionIndex - 1;
                $("#Summary").empty();
                $("#Summary").hide();
                _Assessment.ShowQuestion();
            }
            else {
                this.LoadPage(_currentPageObject.prevPageId);
            }

        },
        Next: function () {
            Summarybookmark = false;
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Previous link click.")
            }
            $("#linkprevious").k_enable();

            if (_currentPageObject.customNext != undefined && !_currentPageObject.customNext.isComplete) {
                this.LoadPage(_currentPageObject.customNext);
            }
            if (_currentPageObject.pageId == quizpageid) {
                if (isIphone) {
                    $("#progressdiv").focus();
                }
                if (typeof (currentQuestionIndex) != 'undefined' && typeof (gRecordData.Questions) != 'undefined' && (currentQuestionIndex + 1) < gRecordData.Questions.length) {
                    currentQuestionIndex = currentQuestionIndex + 1
                    $("#Questioninfo").show();
                    _Assessment.ShowQuestion();
                    if (gRecordData.Status != "Completed" && !this.IsPresenterMode() && !this.IsReviewMode()) {
                        $("#linknext").k_disable();
                        $("#linkprevious").k_disable();
                    }

                }

                else if (typeof (currentQuestionIndex) != 'undefined' && typeof (gRecordData.Questions) != 'undefined' && (currentQuestionIndex + 1) == gRecordData.Questions.length) {

                    $(".intro-content-question").hide();
                    $(".questionwrapper").hide();
                    currentQuestionIndex = currentQuestionIndex + 1;
                    $("#Summary").show();
                    $("#Questioninfo").hide();
                    $("#Summary").load("pagedata/Summary.htm", function () {
                        Summarybookmark = true;
                        _Navigator.GetBookmarkData();
                        _Assessment.ShowSummary();
                        $("h2:first").attr({ tabindex: "-1", role: "heading" }).focus();
                        $("#linkprevious").k_enable();
                        $("#Summary").find("input[type='radio']").attr("readonly", "readonly");
                        $(".question-band").find("img").attr("aria-hidden", "true");

                    })
                    $("#climate-deal").css("margin-left", "23%");
                    $("#linknext").k_disable();
                }
            }
            else {
                this.LoadPage(_currentPageObject.nextPageId);
            }
        },
        GetProgressData: function () {
            var visitpage = 0;
            for (var i in _NData) {
                if (_NData[i].pageId != "p5") {
                    if (_NData[i].isAnswered != undefined && (_NData[i].isAnswered == true)) {
                        visitpage++;
                    }
                }
            }
            visitpage += this.GetAnswerCount();
            return visitpage;
        },
        GetAnswerCount: function () {
            var cnt = (gRecordData.Questions.filter(function (item) {
                return item.IsAnswered;
            }).length)
            cnt += gRecordData.Status == "Completed" ? 1 : 0;
            return cnt;
        },
        UpdateProgressBar: function () {
            var progData = this.GetProgressData();
            var lprog_pecent = (progData * 100 / progressLevels[0]).toFixed(0);
            $(".progressdiv").text("Progress: " + lprog_pecent + "%");
            $(".progressFg").css("width", lprog_pecent + "%");
        },
        GetCurrentPage: function () {
            return _currentPageObject;
        },
        CompletePage: function (extendedJson) {
            _currentPageObject.IsComplete = true;
            _currentPageObject = $.extend(true, _currentPageObject, extendedJson)
            _StateData[_currentPageObject.pageId] = $.extend(true, {}, _currentPageObject);
        },
        GetTotalScore: function () {
            var ObtainPoint = 0;
            for (var i in _NData) {
                if (_NData[i].points > 0) {
                    ObtainPoint += _NData[i].points
                }
            }
            var quizScore = 0;
            for (var b = 0; b < gRecordData.Questions.length; b++) {
                if (gRecordData.Questions[b].IsAnswered && gRecordData.Questions[b].IsCorrect) {
                    quizScore += 2;
                }
            }
            var score = ((ObtainPoint + quizScore) / (totalsimscore + gRecordData.AssessmentScore)) * 100;
            return score.toFixed(0);
        },
        UpdateScore: function () {
            var percScore = this.GetTotalScore()
            $("#scorediv").html("Score: " + percScore + "%");
        },
        SetPageScore: function (points) {
            if (!_currentPageObject.isAnswered) {
                _NData[_currentPageId].points = points;
                this.UpdateScore();
            }
        },
        IsReviewMode: function () {
            return isReviewMode;
        },
        SetIsReviewMode: function (isReviewModeStatus) {
            isReviewMode = isReviewModeStatus;
        },
        SetPageStatus: function (isAnswered) {
            if (isAnswered) {
                _NData[_currentPageObject.pageId].isAnswered = true;
                this.UpdateProgressBar();
            }

        },
        IsAnswered: function () {
            if (_currentPageObject.isAnswered != undefined && _currentPageObject.isAnswered)
                return true;
            return false;
        },
        IsLoaded: function () {
            if (_currentPageObject.isLoaded != undefined && _currentPageObject.isLoaded)
                return true;
            return false;
        },
        CheckIfPageLoaded: function (pageid) {
            return _NData[pageid].isLoaded != undefined && _NData[pageid].isLoaded ? true : false;
        },
        IncrementCounter: function () {
            submitCounter = submitCounter + 1;
        },
        GetCounter: function () {
            return submitCounter;
        },
        SetPresenterMode: function (val) {
            packageType = val;
        },
        IsPresenterMode: function () {
            if (packageType == "presenter") {
                return true;
            }
            else {
                return false;
            }
        },
        GetBookmarkData: function () {
            if (!this.IsScorm() && !this.IsRevel() && this.IsReviewMode())
                return;
            var bookmarkobj = {}
            bookmarkobj.BMPageId = bookmarkpageid;
            bookmarkobj.BMretrycnt = retrycnt;
            bookmarkobj.BMg_RuntimeData = _ModuleCommon.Getg_RuntimeData();
            bookmarkobj.VisistedPages = this.GetNavigatorBMData();
            //bookmarkobj.ProgressLevels = progressLevels;
            bookmarkobj.ReviewData = _ModuleCommon.GetReviewData();
            bookmarkobj.AssessmentData = _Assessment.Getbookmarkdata();
            bookmarkobj.Summarybookmark = _Navigator.GetSummarybookmark();
            if (this.IsRevel()) {
                if (k_Revel.get_LaunchData().mode == LaunchModes.do) {
                    var suspend_data = JSON.stringify(bookmarkobj);
                    k_Revel.set_StateData(JSON.parse(suspend_data))
                    k_Revel.PostData(gRecordData.Score, gRecordData.AssessmentScore);
                }
            }
            else if (this.IsScorm()) {
                _ScormUtility.SetSuspendData(JSON.stringify(bookmarkobj))
            }

        },
        GetNavigatorBMData: function () {
            var gVisistedPages = [];
            for (var i in _NData) {
                if (_NData[i].isAnswered) {
                    gVisistedPages.push({ id: _NData[i].pageId, prev: _NData[i].prevPageId, next: _NData[i].nextPageId });
                }
            }
            return gVisistedPages;
        },
        SetNavigatorBMData: function (gVisistedPages) {

            for (var i = 0; i < gVisistedPages.length; i++) {
                _NData[gVisistedPages[i].id].isAnswered = true;
                _NData[gVisistedPages[i].id].prevPageId = gVisistedPages[i].prev;
                _NData[gVisistedPages[i].id].nextPageId = gVisistedPages[i].next;
                if (_NData[gVisistedPages[i].id].pageId == "p3") {
                    progressLevels[0] = (progressLevels[0] + 1);
                }
            }
        },

        SetBookMarkPage: function () {
            if (this.IsReviewMode()) {
                return;
            }
            if (!this.IsScorm() && !this.IsRevel())
                return;
            if (this.IsScorm()) {
                _ScormUtility.SetBookMark(bookmarkpageid);
            }
            else if (this.IsRevel()) {
                this.GetBookmarkData();
            }
        },
        SetBookmarkData: function () {

            var bookmarkdata;
            if (this.IsScorm()) {
                bookmarkdata = _ScormUtility.GetSuspendData();
            }
            else if (this.IsRevel()) {
                bookmarkdata = JSON.stringify(k_Revel.get_StateData())
            }

            if (bookmarkdata != undefined && bookmarkdata != "") {
                bookmarkdata = JSON.parse(bookmarkdata);
                bookmarkpageid = bookmarkdata.BMPageId;
                retrycnt = bookmarkdata.BMretrycnt;
                Summarybookmark = bookmarkdata.Summarybookmark
                _ModuleCommon.Setg_RuntimeData(bookmarkdata.BMg_RuntimeData);
                this.SetNavigatorBMData(bookmarkdata.VisistedPages)
                //progressLevels = bookmarkdata.ProgressLevels;
                _ModuleCommon.SetReviewData(bookmarkdata.ReviewData)
                _Assessment.Setbookmarkdata(bookmarkdata.AssessmentData)
            }
        },
        GetBookMarkPage: function () {
            return bookmarkpageid;
        },
        GetBookMarkRetrycnt: function () {
            return retrycnt;
        },
        SetBookMarkRetrycnt: function () {
            retrycnt = retrycnt + 1;
        },
        Initialize: function () {

            if (packageType == "scorm") {
                _ScormUtility.Init();
                _Navigator.SetBookmarkData();
                //bookmarkpageid = _ScormUtility.GetBookMark();
                if (_ScormUtility.IsScormReviewMode()) {
                    _Navigator.SetIsReviewMode(true);
                }
                this.GotoBookmarkPage();
            }
            else if (packageType == "revel") {
                g_tempIntv = setInterval(function () {
                    if ((typeof piSession != 'undefined' && typeof piSession.currentToken() != 'undefined' && piSession.currentToken() != null)) {
                        clearInterval(g_tempIntv);
                        g_tempIntv = null;
                        //The rest of the code will go here.
                        LifeCycleEvents.InitParams();
                        LifeCycleEvents.OnLoad();
                        if (!k_Revel.isLaunchInitialize()) {
                            k_Revel.InitLaunch()
                            var suspend_data = JSON.stringify(k_Revel.get_StateData());
                            if (suspend_data != "" && suspend_data != "{}") {
                                var isTrue = this.SetBookmarkData();
                                if (isTrue && k_Revel.get_LaunchData().mode == "do") {
                                    this.GotoBookmarkPage();
                                } else {
                                    k_Revel.set_StateData(JSON.parse(suspend_data))
                                }
                            }
                        }
                        if (k_Revel.get_LaunchData().mode == "review") {
                            var suspend_data = JSON.stringify(k_Revel.get_StateData());
                            if (suspend_data != "" && suspend_data != "{}") {
                                this.SetBookmarkData(suspend_data);
                                isReview = true;
                            }
                        }
                    }
                }, 100);

            }
            else {
                _Navigator.Start();
            }
        },
        GotoBookmarkPage: function () {
            if (bookmarkpageid != undefined && bookmarkpageid != "" && !this.IsReviewMode()) {
                if (Summarybookmark) {
                    _Navigator.LoadPage(quizpageid);
                }
                else {
                    _Navigator.LoadPage(bookmarkpageid)
                }
            }
            else {
                _Navigator.Start();
            }
        },
        IsScorm: function () {
            if (packageType == "scorm")
                return true;
            return false;
        },
        IsRevel: function () {
            if (packageType == "revel")
                return true;
            return false;
        },
        GetPackageType: function () {
            return packageType;
        },
        GetQuizPageId: function () {
            return quizpageid;
        }
    };
})();
function setReader(idToStartReading) {
    $('#hiddenAnchor').attr("href", "#" + idToStartReading)
    $('#hiddenAnchor')[0].click()
}
function removeCSS(cssFileToRemove) {
    for (var w = 0; w < document.styleSheets.length; w++) {
        if (document.styleSheets[w].href.indexOf(cssFileToRemove) != -1) {
            document.styleSheets[w].disabled = true;
        }
    }
}
function addCSS(cssFileToAdd) {
    var isCSSAlreadyAdded = false;
    for (var w = 0; w < document.styleSheets.length; w++) {
        if (document.styleSheets[w].href.indexOf(cssFileToAdd) != -1) {
            isCSSAlreadyAdded = false;
        }
    }
    console.log(isCSSAlreadyAdded + " --")
    if (!isCSSAlreadyAdded) {
        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFileToAdd);
        document.getElementsByTagName("head").item(0).appendChild(newlink);
    }
}

function changeCSS(cssFile, cssLinkIndex) {
    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);
    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
