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

            var ext = $('#upload_image').val().split('.').pop().toLowerCase();
            if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
                alert('invalid extension!');
                return;
            }

            if(!confirm("Ready to upload profile pic(Y/N)")){
                return;
            }
            var formData = new FormData();
                formData.append('avatar', $('input[type=file]')[0].files[0]);
            $.ajax({
                url: API_URL + "/upload-avatar/" + localStorage.getItem("userId"),
                type: "POST",
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function () {},
                success: function (data) {
                    console.log("data", data);
                    if(data.hasOwnProperty('avatarPath')){
                        localStorage.setItem('avatar', data['avatarPath']);
                    }
                },
                error: function (e) {

                }
            });
        });
    });

})();