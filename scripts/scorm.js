
var scorm = pipwerks.SCORM;
var _ScormUtility = (function () {
    return {
        Init: function () {
            if (!isscorm)
                return;
            scorm.version = "2004";
            console.log("Initializing course.");
            var callSucceeded
            try {
                callSucceeded = scorm.init();
                //alert(callSucceeded);
                console.log("Call succeeded? " + callSucceeded);
            }
            catch (er) {
            }
        },
        End: function () {
            if (!isscorm)
                return;
            var callSucceeded = scorm.quit();
            window.close();
            console.log("Call succeeded? " + callSucceeded);
        },
        GetBookMark: function () {
            if (!isscorm)
                return;
            var bookmark = scorm.get("cmi.location");
            return bookmark;
        },

        SetBookMark: function (bookmark) {
            if (!isscorm)
                return;
            var setlessonLocation = scorm.set("cmi.location", bookmark + "");
        },

        SetSuspendData: function (suspend_data) {
            if (!isscorm)
                return;
            scorm.set("cmi.suspend_data", suspend_data);
        },

        GetSuspendData: function () {
            if (!isscorm) {
                return;
            }
            var suspendData = scorm.get("cmi.suspend_data");
            return suspendData;

        },

        Scormcomplete: function () {
            if (!isscorm)
                return;
            console.log("Complete");
            var callSucceeded = scorm.set("cmi.completion_status", "completed");
        },

        SetScore: function (scoreval) {
            if (!isscorm)
                return;
            var minscr = scorm.set("cmi.score.min", "10.00");
            var maxscr = scorm.set("cmi.score.max", "100.00");
            var setStatus = scorm.set("cmi.score.raw", "" + scoreval);
        }
    }
})();