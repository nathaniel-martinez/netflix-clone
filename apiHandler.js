const apiKey = '2dbb24c0e4af0b7a025154c02d644bd6';
export const ApiResources = {
    config: () => `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`,
    popularTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?page=${page}&api_key=${apiKey}`,
    highRatedTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?sort_by=vote_average.desc&page=${page}&api_key=${apiKey}`,
    newTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?sort_by=first_air_date.desc&page=${page}&api_key=${apiKey}`,
    actionTvShows: (page)=> `https://api.themoviedb.org/3/discover/tv?page=${page}&api_key=${apiKey}&with_genres=10759`,
    animatedTvShows: (page)=> `https://api.themoviedb.org/3/discover/tv?page=${page}&api_key=${apiKey}&with_genres=16`,
    comedyTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?page=${page}&api_key=${apiKey}&with_genres=35`,
    crimeTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?page=${page}&api_key=${apiKey}&with_genres=80`,
    documentaryTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?page=${page}&api_key=${apiKey}&with_genres=99`,
    popularMovies: (page) => `https://api.themoviedb.org/3/trending/movie/week?page=${page}&api_key=${apiKey}`,
    highRatedMovies: (page) => `https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=${apiKey}`,
    nowPlayingMovies: (page) => `https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${apiKey}`,
    actionMovies: (page) => `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${apiKey}&with_genres=28`,
    animatedMovies: (page) => `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${apiKey}&with_genres=16`,
    comedyMovies: (page) => `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${apiKey}&with_genres=35`,
    crimeMovies: (page) => `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${apiKey}&with_genres=80`,
    documentaryMovies: (page) => `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${apiKey}&with_genres=99`
};

/**
 * promise to get baseurl and image size
 */
function baseUrl(){
    return fetch(ApiResources.config()).then(response => response.json()).catch(err => console.log(err));
}

/**
 * promise to get content info
 * @param: Apiresources function, integer page of api resource to pull
 */
function contentInfo(getApi, page){
    return fetch(getApi(page)).then(response => response.json()).catch(err => console.log(err));
}



/* populate a div with a backdrop image, another div with content title, another div with content description
@input: selector array string[] of [image element, title elememnt, overview elemet], ApiResources function to pull content
@output: A promise that shouldnt be used just run it!
*/
export function populateBackdrop(selector, getApi){
    Promise.all([baseUrl(), contentInfo(getApi, 1)])
        .then(content => {
            let base = content[0].images.base_url;
            let imageSize = content[0].images.backdrop_sizes[content[0].images.backdrop_sizes.length - 1];
            let backdropPath = content[1].results[0].backdrop_path;
            let url = base + imageSize + backdropPath;
            $(selector[0]).css("background-image", `url('${url}')`);
            $(selector[0]).css("background-size", "cover");
            $(selector[1]).text(content[1].results[0].title);
            $(selector[2]).text(content[1].results[0].overview);
        })
        .catch(err => console.log(err));
}

/* populate divs with poster images
@input: double array [][] of selector strings of elements. Each of the array in the array are populated with the same image, 
        ApiResources function to pull content
@output: A promise that shouldnt be used just run it!
*/
export function populatePoster(selectors, getApi){
    Promise.all([baseUrl(), contentInfo(getApi, 1), contentInfo(getApi, 2), contentInfo(getApi, 3), contentInfo(getApi, 4)])
        .then(content => {
            let base = content[0].images.base_url;
            let imageSize = content[0].images.poster_sizes[0];
            let selectorsI = 0;
            for (let contentI = 1;  contentI < content.length; contentI++){
                let contentResults = content[contentI].results;
                for (let contentInfoI = 0; contentInfoI < contentResults.length; contentInfoI++){
                    let url = base + imageSize + contentResults[contentInfoI].poster_path;
                    if(selectorsI >= selectors.length){
                        break;
                    }
                    selectors[selectorsI].forEach(item => {
                        $(item).prepend(`<img src=${url} class="car-img"/>`);
                        $(item).append("<div></div>");
                        $(`${item} > div`).append(`<div><i class="fa-regular fa-circle-play play-but"></i></div>`);
                        $(`${item} > div`).append(`<div><span class="fa-stack plus"><i class="fa-regular fa-circle fa-stack-2x circle-but"></i><i class="fa-solid fa-plus fa-stack-1x plus-but"></i></span></div>`);
                        $(`${item} > div`).append(`<div><span class="fa-stack thumb"><i class="fa-regular fa-circle fa-stack-2x circle-but"></i><i class="fa-solid fa-thumbs-up fa-stack-1x thumb-but"></i></span></div>`);
                        //$(item + " > .car-img").css("height", "100%");
                        //$(item + " > .car-img").css("width", "100%");
                    });
                    selectorsI++;
                }
                if(selectorsI >= selectors.length){
                    break;
                }
            }
        })
        .catch(err => console.log(err));
}

/*
Test the fetch api but node lol
console.log("This is the config APi: ");
baseUrl().then(data => console.log(data + "\n\n\n"));


    for(let i = 0; i < 3; i++){
        console.log("This is the " + i + " page of api: ");
        contentInfo(ApiResources.popularTvShows, i).then(data => console.log(data + "\n\n\n"));
        contentInfo(ApiResources.highRatedTvShows, i).then(data => console.log(data + "\n\n\n"));
        contentInfo(ApiResources.newTvShows, i).then(data => console.log(data + "\n\n\n"));
        contentInfo(ApiResources.popularMovies, i).then(data => console.log(data + "\n\n\n"));
        contentInfo(ApiResources.highRatedMovies, i).then(data => console.log(data + "\n\n\n"));
        contentInfo(ApiResources.nowPlayingMovies, i).then(data => console.log(data + "\n\n\n"));
    }
*/