// <!-- Script to open modal on search box click -->
$(document).ready(function () {
    $("#searchBox").click(function () {
        $("#myModal").modal('show');
    });
});

// <!-- Script to open modal on anchor tag click -->
$(document).ready(function () {
    $("#myAnchor").click(function (e) {
        e.preventDefault();
        $("#contactModal").modal('show');
    });
});