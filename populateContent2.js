//The key for the free api the movie database
const apiKey = '2dbb24c0e4af0b7a025154c02d644bd6';
//List of content which will be pulled when needed in making the website
//Remember these are METHODS!
const ApiResources = {
    popularTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?page=${page}&api_key=${apiKey}`,
    highRatedTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?sort_by=vote_average.desc&page=${page}&api_key=${apiKey}`,
    newTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?sort_by=first_air_date.desc&page=${page}&api_key=${apiKey}`,
    popularMovies: (page) => `https://api.themoviedb.org/3/trending/movie?page=${page}&api_key=${apiKey}`,
    highRatedMovies: (page) => `https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=${apiKey}`,
    nowPlayingMovies: (page) => `https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${apiKey}`
}


// render pages except the New & popular one
// content referes to either a movie or tv show
function renderNormal(){
    renderTopContent(); //Render the first movie or tv show that is larger then all of the other ones

    renderContentLists(); //Render the list of content below the first content
}

//obtain list of content
//@param: String resource created from Api.resources method with page number
//@out: array containing desired of content objs
function pullContentList(resource){
    /*const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGJiMjRjMGU0YWYwYjdhMDI1MTU0YzAyZDY0NGJkNiIsInN1YiI6IjYzNmVmN2ZmZmQ0ZjgwMDA3ZmI4NjA1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.82LG98QU-FVZWHsYSSthb7eAf8tS3oaGxOnGOg4mipg';
    const authHeader = {Header that is necessary to access the api
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json;charset=utf-8'
    };*/
    let contentList = fetch(resource).then(response => {
        if(response.ok){
            let responseObj = JSON.parse(response.json());
            if(!('status_code' in responseObj)){ /*Everything should be working fine then*/
                return responseObj.results;
            }
            else if(responseObj.status_code == 7){
                throw new Error("Authentication error with API. Check api_key");//Thorwn when api rejects request due to authentication error
                return -1;
            }
            else{
                throw new Error("Communicating with api and getting a resource, but not the desired resource");//Unkown reasons the API isn't returning the right resource
                return -1;
            }
        }
        else{
            throw new Error("not reaching the api"); //Normally when reaching but authentication not working throws a json
            return -1;
        }
    }).catch(error => console.log(error));
    return contentList;
}
function testPullContentList(){
    let resource = ApiResources.highRatedMovies
    console.log(resource(2));
    pullContentList(resource(2)).then((data) => {console.log(data)});
}
// Gets random content from an array of content objects and removes it from the array. Remeber the array passed to the function gets modified
// @param: contentObj[]
// @out: random content obj
/*function getRandomContent(contentArray){
    const randIndex = Math.floor(Math.random() * contentArray.length);//Get random index of array element you want to push
    return contentArray.splice(randIndex, 1)[0];
}*/



/*function pullAllContent(){
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGJiMjRjMGU0YWYwYjdhMDI1MTU0YzAyZDY0NGJkNiIsInN1YiI6IjYzNmVmN2ZmZmQ0ZjgwMDA3ZmI4NjA1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.82LG98QU-FVZWHsYSSthb7eAf8tS3oaGxOnGOg4mipg';
    const authHeader = {Header that is necessary to access the api
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json;charset=utf-8'
    }

}*/

// Render the top content on the page which is bigger then the other on
// @param: One of the following strings "any" "movies" "shows"
// @out: doesn't return anything (unless there is an error in which case returns -1) but it does render the top content correctly
function renderTopContent(contentType){
    //switch between what kind of content to pull from api
    let resource;
    switch(contentType){
        case "any":
            //randomly chooses a movie or a show to be displayed
            if(Math.floor(Math.random() * 2) == 1){
                resource = ApiResources.popularMovies;
            }
            else{
                resource = ApiResources.popularTvShows;
            }
            break;
        case "movies":
            resource = ApiResources.popularMovies;
            break;
        case "shows":
            resource = ApiResources.popularTvShows;
            break;
        default:
            console.log("input to renderTopContent() is not string any movie or shows")
            return -1;
    }

    const contentIterator = new ContentIter(resource);
    
}

// This is an iterator object for content taken from the api. Since the api returns results page by page, this obj simplifies the process of getting new pages and removig content
//relies on the pullContentList function outside of this method
//@param: ApiResources method used to create resources to pull the content from with a specified page number
//@out: can use ContentIter.getContent(number) to get values and iterate easy
function ContentIter(resource){
    this.index = 0; //private variable
    this.page = 1; //private variable
    this.resource = resource; //private var containing an ApiResources method
    this.contentArray = pullContentList(this.resource(this.page));

    //return numOfContent amount of content from the content obj array in order and move the iterator past the indexes of content retrieved
    //if more then available content is requested from the contentArray, then the contentArray is rebuilt using another page from the api
    //@param: number of content requested from the array
    //@output: array containing the next numOfContent content of the array
    this.getContent = (numOfContent, outputContentParam = Array.from({length: numOfContent}), outputIParam = 0) => {
        let outputContent = outputContentParam;
        let outputI = outputIParam;
        //first case where contentArray has more then enough content
        if(numOfContent < (this.contentArray.length - index)){
            for(let i = 0; i < numOfContent; i++){
                outputContent[outputI] = this.contentArray[this.index];
                this.index++;
                this.outputI++;
            }
            return outputContent;
        }
        /*else if (numOfContent == (this.contentArray.length - index)){
            for(let i = 0; i < numOfContent; i++){
                outputContent[i] = this.contentArray[this.index];
                this.index++;
            }
            this.page++;
            this.contentArray = pullContentList(this.resource, this.page);
            return outputContent;
        } !@#Don't think I need this*/
        //Second case where content Array has just barley enough elements or is too small
        else{
            while(this.index < this.contentArray.length){
                outputContent[outputI] = this.contentArray[this.index];
                outputI++;
                this.index++;
            }
            this.page++;
            this.contentArray = pullContentList(this.resource(this.page));
            this.index = 0;
            this.getContent(numOfContent - outputI, outputContent, outputI);
        }
    };
    // Gets random content from this.contentArray and removes it from the array. To avoid errors run this first before iteration begins to get the top content
    // @param:
    // @out: random content obj or -1 if error ocurrs
    this.getRandomContent = () => {
        if(this.contentArray.length > 0){
            const randIndex = Math.floor(Math.random() * this.contentArray.length);//Get random index of array element you want to push
            return this.contentArray.splice(randIndex, 1)[0];
        }
        else{
            console.log("content array of page 1 of " + this.resource + " is empty");
            return -1;
        }
    };
}

function testContentIter(){
    const content = new ContentIter(ApiResources.highRatedMovies);
    console.log("********************\ngetting random content");
    console.log(content.contentArray);
    console.log(content.getRandomContent());
    console.log("************************\n\n\n");
    for(let i = 0; i < 10; i++){
        console.log("********************\ngetting content");
        console.log(content.getContent(i));
        console.log("************************\n\n\n");
    }
}
//testContentIter();
testPullContentList();