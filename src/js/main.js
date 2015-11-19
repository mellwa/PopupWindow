/*
    Create by Chao Chen
*/
$(document).ready(function(){
    init()
});

function init(){
    var modalHtml ="<div id='editor' class='modal fade'>"+
                      "<div class='modal-dialog'>"+
                        "<div class='modal-content'>"+
                          "<div class='modal-header'>"+
                            "<button id='closeButton' type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>"+
                            "<h4 class='modal-title'>Text Editor</h4>"+
                            "<div class='container'>"+
                              "<button id='saveButton' class='btn btn-default col-lg-offset-1 col-md-offset-1' type='button'>Edit</button>"+
                              "<button id='downloadButton' class='btn btn-default col-lg-offset-1 col-md-offset-1' type='button'>Download File</button>"+
                            "</div>"+
                          "</div>"+
                          "<div id='modal-body' class='modal-body'>"+
                            "<textarea id='inputTextToSave' class='form-control' readonly='readonly'></textarea>"+
                          "</div>"+
                        "</div>"+
                      "</div>"+
                    "</div>"

    $("body").append(modalHtml);
    $("textarea").numberedtextarea({
        color: "black",
        borderColor: "black",
        width: 30
    })

    $("#opener").on('click',function(){
        $("#editor").modal({
            backdrop: 'static',
            keyboard: false
        })
    })

    $("#editor").draggable({
        handle: ".modal-header"
    });
    $("#saveButton").on('click', function(){
        if($(this).text() == 'Edit'){
            $(this).text('Save')
            $("#inputTextToSave").removeAttr('readonly')
            $("#inputTextToSave").css('background-color', 'white')
        }else{
            $(this).text('Edit')
            $("#inputTextToSave").attr('readonly','readonly');
            $("#inputTextToSave").css('background-color', 'lightgrey')
        }
    });

    $("#downloadButton").on('click',function(){
        focusLine(30)
    })
}

function focusLine(lineNum){
    var tarea = $("#inputTextToSave")
    var lineHeight = parseInt(tarea.css('line-height'))
    var lineToJump = lineNum - tarea.height()/lineHeight/2
    alert(lineToJump)
    if(lineToJump > 0) {
        lineToJump--;
    }
    tarea.scrollTop(lineToJump*lineHeight)
    selectTextareaLine(tarea, lineNum)
}

function selectTextareaLine(tarea,lineNum) {
    lineNum --; // array starts at 0
    var lines = tarea.val().split('\n')
    // calculate start/end
    var startPos = 0, endPos = tarea.val().length;
    for(var x = 0; x < lines.length; x++) {
        if(x == lineNum) {
            break;
        }
        startPos += (lines[x].length+1);
    }
    var endPos = lines[lineNum].length+startPos;

    tarea[0].setSelectionRange(startPos, endPos)
    tarea[0].focus()

    return true;
}

