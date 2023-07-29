import {ApiResources, populateBackdrop, populatePoster} from "./apiHandler.js";
import {Carousel} from "./carousel.js";

//array of carousels on the screen
let carousels = [];

//Function populates watch.html with mix of movies and tv shows for home
function populateHome(){
    if($(".home").hasClass("selected")){
        console.log("home already is selected");
        return 0;
    }
    else{
        changeSelected(".home");
        $("#car-1").empty();
        $("#car-2").empty();
        $("#car-3").empty();
        $("#car-4").empty();
        $("#car-5").empty();
        $("#car-6").empty();
        $("#car-7").empty();
        $("#car-8").empty();
        carousels = [];
        let flip = Math.ceil(Math.random() * 2);
        if(flip == 1){
            populateBackdrop(["#main-content", "#backdrop-title", "#backdrop-sum"], ApiResources.popularTvShows);
            carousels.push(new Carousel('#car-1', ApiResources.popularTvShows, "Popular"));
            carousels.push(new Carousel("#car-2", ApiResources.highRatedMovies, "High Rated Movies"));
            carousels.push(new Carousel("#car-3", ApiResources.actionTvShows, "Action"));
            carousels.push(new Carousel("#car-4", ApiResources.animatedMovies, "Animation"));
            carousels.push(new Carousel("#car-5", ApiResources.documentaryMovies, "Documentaries"));
            carousels.push(new Carousel("#car-6", ApiResources.crimeTvShows, "Crime TV Shows"));
        }
        else if(flip == 2) {
            api = ApiResources.popularMovies;
            populateBackdrop(["#main-content", "#backdrop-title", "#backdrop-sum"], ApiResources.popularMovies);
            carousels.push(new Carousel('#car-1', ApiResources.popularMovies, "Popular"));
            carousels.push(new Carousel("#car-2", ApiResources.highRatedTvShows, "High Rated Movies"));
            carousels.push(new Carousel("#car-3", ApiResources.actionMovies, "Action"));
            carousels.push(new Carousel("#car-4", ApiResources.animatedTvShows, "Animation"));
            carousels.push(new Carousel("#car-5", ApiResources.documentaryTvShows, "Documentary TV"));
            carousels.push(new Carousel("#car-6", ApiResources.crimeMovies, "Crime"));
        }
    }
}

//Function populates watch.html with tv shows for TV and SHows
function populateShows(){
    changeSelected(".tv-shows");
    populateBackdrop(["#parent", "#backdrop-title", "#backdrop-sum"], ApiResources.popularTvShows);
}

//Function populates watch.html with movies for Movies
function populateMovies(){
    changeSelected(".movies");
    populateBackdrop(["#parent", "#backdrop-title", "#backdrop-sum"], ApiResources.popularMovies);
    createCarousel(/*selector of div string, ApiResources function to use*/);
}

//Function populates watch.html with mix of new and popular movies and tv shows for home
//Remember this one hides the star content which is bigger then the other ones
function populateNewPop(){
    changeSelected(".popular");
    $("#parent").css("background-image", "");
    $("#backdrop-title").text("");
    $("#backdrop-sum").text("");
    createCarousel(/*selector of div string, ApiResources function to use*/); //This will have to be a diff function that is implemented slightly different
}

/**
 * Change the selected class based on which link is clicked
 * @param {select which element to add the selector class to} selector 
 */
function changeSelected(selector){
    $(".home").removeClass("selected");
    $(".tv-shows").removeClass("selected");
    $(".movies").removeClass("selected");
    $(".popular").removeClass("selected");
    $(selector).addClass("selected");
}

window.onload = function(){
    changeSelected(".home");
        $("#car-1").empty();
        $("#car-2").empty();
        $("#car-3").empty();
        $("#car-4").empty();
        $("#car-5").empty();
        $("#car-6").empty();
        $("#car-7").empty();
        $("#car-8").empty();
        carousels = [];
        let flip = Math.ceil(Math.random() * 2);
        if(flip == 1){
            populateBackdrop(["#main-content", "#backdrop-title", "#backdrop-sum"], ApiResources.popularTvShows);
            carousels.push(new Carousel('#car-1', ApiResources.popularTvShows, "Popular"));
            carousels.push(new Carousel("#car-2", ApiResources.highRatedMovies, "High Rated Movies"));
            carousels.push(new Carousel("#car-3", ApiResources.actionTvShows, "Action"));
            carousels.push(new Carousel("#car-4", ApiResources.animatedMovies, "Animation"));
            carousels.push(new Carousel("#car-5", ApiResources.documentaryMovies, "Documentaries"));
            carousels.push(new Carousel("#car-6", ApiResources.crimeTvShows, "Crime TV Shows"));
        }
        else if(flip == 2) {
            populateBackdrop(["#main-content", "#backdrop-title", "#backdrop-sum"], ApiResources.popularMovies);
            carousels.push(new Carousel('#car-1', ApiResources.popularMovies, "Popular"));
            carousels.push(new Carousel("#car-2", ApiResources.highRatedTvShows, "High Rated Movies"));
            carousels.push(new Carousel("#car-3", ApiResources.actionMovies, "Action"));
            carousels.push(new Carousel("#car-4", ApiResources.animatedTvShows, "Animation"));
            carousels.push(new Carousel("#car-5", ApiResources.documentaryTvShows, "Documentary TV"));
            carousels.push(new Carousel("#car-6", ApiResources.crimeMovies, "Crime"));
        }
    $(".home").on("click", populateHome);
    $(".tv-shows").on("click", populateShows);
    $(".movies").on("click", populateMovies);
    $(".popular").on("click", populateNewPop);
};