function addScore(score, $domElement) {
    $("<span class='stars-container'>")
      .addClass("stars-" + score.toString())
      .text("★★★★★")
      .appendTo($domElement);
}

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}