$(function () {
                //when hover on collapse navbar click and when hover off click again, we trick it into taking hovers over clikcs
                $("#drop-options").mouseenter(function() {
                    $("#drop-but").trigger("click");
                    $("#drop-but").prop("disabled", true)
                });
                $("#drop-options").mouseleave(function(){
                    $("#drop-but").prop("disabled", false)
                    $("#drop-but").trigger("click");
                });
});

function loadHome(){

}

function loadTv(){

}

function loadMovies(){

}

function loadPopular(){
    
}