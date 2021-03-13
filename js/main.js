$(document).ready(function () {
    let socket = new WebSocket("ws://livechat:8090/server.php");

    // socket.addEventListener('open', function (event) {
    //     socket.send('Hello Server!');
    // });

    socket.onopen = function () {
        message("<div>" +"socket start"+ "</div>");
    }

    socket.onerror = function (err) {
        message("<div>" +"error " + err.message+ "</div>");
    }

    socket.onclose = function () {
        message("<div>" +"socket stop"+ "</div>");
    }

    socket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        message("<div>" + data.type + " " + data.message + "</div>");
    }

    $("#chat").submit(function (e) {
        e.preventDefault();
        var message = {
            chat_message: $("#chat-message").val(),
            chat_user: $("#chat-user").val(),
        };
        $("#chat-user").attr("type", "hidden");
        socket.send(JSON.stringify(message));
        return false;
    });

});

function message(text) {
    $("#chat-result").append(text);
}