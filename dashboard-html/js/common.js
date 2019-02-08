function addScore(score, $domElement) {
    $("<span class='stars-container'>")
        .addClass("stars-" + score.toString())
        .text("★★★★★")
        .appendTo($domElement);
}

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


(function () {

    $(document).ready(function (e) {

        $("#upload_image").change(function (e) {
            e.preventDefault();
            var file = $('input[type=file]')[0].files[0];
            if (!(file && file[0] && file[0].name.match(/\.(jpg|jpeg|png)$/)) ) {
                alert("Invalid file, only jpg,jpeg,png are allowed!");
                return;
            }  

            var formData = new FormData();
                formData.append('avatar', file);
            $.ajax({
                url: API_URL + "/upload-avatar/" + localStorage.getItem("userId"),
                type: "POST",
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function () {},
                success: function (data) {

                },
                error: function (e) {

                }
            });
        });
    });

})();