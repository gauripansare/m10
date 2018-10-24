

$(document).on("mouseover", ".qheight", function (event) {
    $(this).css({
        "font-weight": "bold"
    });
    $(this).children(".question_icon").children("span").css({
        "background-color": "#003058",
        "color": "#F9FF00"
    });

});
$(document).on("mouseout", ".qheight", function (event) {
    $(this).css({
        "font-weight": "normal"
    });
    $(this).children(".question_icon").children("span").css({
        "background-color": "#007AA2",
        "color": "#FFF"
    });
});
$(document).on("click", ".qheight", function (event) {
    $(".qheight").removeClass("optionselected");

    $(this).addClass("optionselected");

});
var hotspotclicked = false;;
var hotspot;
$(document).on("click", ".divHotSpot", function (event) {
    event.preventDefault();
    //$(this).k_disable()
    /*if (hotspotclicked || _Navigator.IsAnswered())
        return;*/
    hotspotclicked = true;
    $(this).addClass("hotspotclicked")
    hotspot = $(this);
    setTimeout(function () {
        hotspotclicked = false;
        _ModuleCommon.HotspotClick(hotspot, event);
       
    },400)
    
});
$(document).on("dblclick", ".divHotSpotDbClick", function (event) {
    event.preventDefault();
    $(this).k_disable()
    if (hotspotclicked || _Navigator.IsAnswered())
        return;
    hotspotclicked = true;
    $(this).addClass("hotspotclicked")
    hotspot = $(this);
    setTimeout(function () {
        hotspotclicked = false;
        _ModuleCommon.HotspotClick(hotspot, event);
       
    },400)
    
});

$(document).on("keydown", ".divHotSpotDbClick", function (event) {
    if(_Navigator.IsPresenterMode()){
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $(this).trigger("dblclick");
    }
});

$(document).on("dblclick", ".trclick", function (event) {
    event.preventDefault();
    //if (hotspotclicked || _Navigator.IsAnswered())
    //    return;
    hotspotclicked = true;
    hotspot = $(this);
    setTimeout(function () {
        hotspotclicked = false;
        _ModuleCommon.TrClick(hotspot, event);
       
    },400)
    
});
window.addEventListener('keypress', function (e) {
    if (e.keyCode !== 13) {
        alert(e.key);
    }
}, false);
$(document).on("keydown", ".trclick", function (event) {
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $(".trclick").trigger("dblclick");
    }
});

$(document).on("click", "#OutlookMail > tbody > tr", function (event) {
    $(this).addClass("selected").siblings().removeClass("selected");
    
});

$(document).on("click", "#linkprevious", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Prev();
});
$(document).on("click", "#linknext", function (event) {
    if ($(this).k_IsDisabled()) return;    
    _Navigator.Next();
});



$(document).on("click", ".hintlink", function (event) {
    if ($(this).hasClass("expanded")) {
        $(".hintlink").removeClass("expanded")
        $(".hintlink").attr("aria-expanded", "false")
        $(".hintcontainer").slideUp(100);
    }
    else {
        $(".hintcontainer").slideDown(100, function () {
            $(".hintlink").addClass("expanded");
            $(".hintlink").attr("aria-expanded", "true");
        });
    }

});
$(document).on("click", ".closehintlink", function (event) {

    $(".hintlink").removeClass("expanded")
    $(".hintlink").attr("aria-expanded", "false")
    $(".hintcontainer").slideUp(100);


});
$(window).resize(function () {
    _ModuleCommon.OrientationChange();
});

$(window).resize(function () {


});

$(document).on('click', ".activityimg", function (event) {
    if ($(".divHotSpot").hasClass("disabled"))
        return;
    _ModuleCommon.AddEditPropertiesClick(event);
});


$(document).on('click', ".startbtn", function (event) {
    $(this).k_disable();
    _Navigator.Next();
});
$(document).on('click', ".reviewsubmit", function (event) {
    _Navigator.Next();
});
$(document).on('mouseover', ".hintlink", function (event) {
    $(".hintlink .hintlinkspan").css({"color":"#b22222","border-bottom":"1px solid #b22222"})
    $(this).find("path").css({"fill":"#b22222"})
});

$(document).on('mouseout', ".hintlink", function (event) {
 $(".hintlink .hintlinkspan").css({"color":"#047a9c","border-bottom":"1px solid #047a9c"})
 $(this).find("path").css({"fill":"#047a9c"}) 
});

$(document).on("click", ".quizButton", function (event) {
    _Navigator.LoadPage("p46") 
});

$(document).on("change", ".assessmentradio", function (event) {
    $(".assessmentSubmit").k_enable();  
  
});
$(document).on("click", ".assessmentSubmit", function (event) {
    gRecordData.Questions[currentQuestionIndex].UserSelectedOptionId = $("input[type='radio']:checked").attr("id") ;
    gRecordData.Questions[currentQuestionIndex].IsAnswered = true;
    _Navigator.Next();
});
$(document).on('click', "#continuebtn", function (event) {
    _ModuleCommon.OnContinue();
});

$(document).on('click', ".inputcircle", function (event) {
    $(this).next(".inpputtext").trigger( "click" );
    });