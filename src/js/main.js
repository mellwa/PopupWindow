

$(document).ready(function(){
    $("body").append("<div id='dialog' class='web_dialog'>"+
        "<textarea id='inputTextToSave' style='width:512px;height:256px'></textarea>"+
        "</div><button id='jumper'>jump to line 10</button>")
    $("textarea").numberedtextarea({
        color: "black",
        borderColor: "black"
    })
    $("#dialog").dialog({
        autoOpen: false,
        width: 600,
        height: 344,
        show: {
            effect: "blind",
            duration: 500
        },
        hide: {
            effect: "explode",
            duration: 500
        },
        resize: function(){
            var newHeight = $("#dialog").parent("div.ui-dialog").height()-60
            var newWidth = $("#dialog").parent("div.ui-dialog").width()-20
            $("#inputTextToSave").css("height", newHeight-10)
            $("#inputTextToSave").css("width", newWidth-20)
            $("#dialog").css("height", newHeight)
            $("#dialog").css("width", newWidth)
        }
    });
    $("#opener").on('click', function(){
        $("#dialog").dialog("open")
        var lineHeight = parseInt($("#inputTextToSave").css('line-height'));
        $("#inputTextToSave").scrollTop(10*lineHeight);
        selectTextareaLine($("#inputTextToSave"),12);
    })

    $("#dialog").dialog().resize(function(){
    })
});

function selectTextareaLine(tarea,lineNum) {
    lineNum--; // array starts at 0
    var lines = tarea.value.split("\n");

    // calculate start/end
    var startPos = 0, endPos = tarea.value.length;
    for(var x = 0; x < lines.length; x++) {
        if(x == lineNum) {
            break;
        }
        startPos += (lines[x].length+1);

    }

    var endPos = lines[lineNum].length+startPos;

    // do selection
    // Chrome / Firefox

    if(typeof(tarea.selectionStart) != "undefined") {
        tarea.focus();
        tarea.selectionStart = startPos;
        tarea.selectionEnd = endPos;
        return true;
    }

    // IE
    if (document.selection && document.selection.createRange) {
        tarea.focus();
        tarea.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", endPos);
        range.moveStart("character", startPos);
        range.select();
        range.css('background-color', 'red')
        return true;
    }

    return false;
}
