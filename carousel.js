import {ApiResources, populatePoster} from "./apiHandler.js";

/**
 * Populate the selectors with netflix carousels
 * @param {id selector of parent element} selector
 * @param {api resource to use to populate} api
 * @param {title string to display above the selector} title
 */
export function Carousel(selector, api, title){
    this.sel = selector;
    this.length = 35.0; //The total amount of posters in the selector
    this.postersLeftOfSel;
    this.xTransform;
    this.title = title;

    //attributes that change with the window size
    this.postersPerSel;
    this.postersRightOfSel;


    /**
     * This is a discrete function which returns the change of pixels per 10 ms that the translation should be moving at
     * @param {the iteration of the setInterval() function used as an input to the function} i
     * @param {the millisecond that the entire function will take} ms 0.8 s o 800 ms / 10 = 80 lets make it 79
     * @param {the total distance that will be translated when the function is complete} pixelDistance
     */
    this.easeOut = (i, ms, pixelDistance) => {
        let velocoityProportion = (ms - 1) / 2;
        let initialV = pixelDistance / velocoityProportion;
        return (initialV * i) - (((((i + 1) * (i) / 2)) / ms) * initialV );
    };

    /**
     * Used to translate the .sel box with time intervals in order to emulate scrolling
     * @param {value to translate to } x 
     * @param {millisecond duration of the translation} ms 
    */
    this.translate = (x, ms) => {
        let pixelDistance = x - this.xTransform
        let increment = 0;
        let timer = setInterval(function(){
            if(increment * 10 == ms){
                clearInterval(timer);
            }
            else{
                let translation = this.intervalXTransform + velF(this.intervalI);
                $(`${this.intervalSel} .sel`).css("transform", `translatex(${translation}%)`);
                intervalI++;
            }
        }.bind({intervalSel: this.sel, intervalMs: ms, intervalI: increment, intervalXTransform: this.xTransform, intervalDistance: pixelDistance, velF: this.easeOut}), 10);
        this.xTransform = x;
    };




    this.scrollTo = (x, ms) => {
        let timer = setInterval(function(){
            
        });
    };



    
    // set the transformation on the sel screen
    // @param x an integer dictating where to set the transfromation of .sel
    // @param pixelPerFrame which is how many pixels to transfrom per frame
    this.selSetScroll = (x, pixelPerFrame) => {
        let increment = Math.sign(x - this.xTransform) * pixelPerFrame;
        let timer = setInterval(function(){
            if(this.intervalXTransform == this.intervalX){
                clearInterval(timer);
            }
            else if(Math.abs(this.intervalX - this.intervalXTransform) < this.intervalPixel){
                this.intervalXTransfrom = this.intervalX;
            }
            else{
                //console.log("This is the transformation to value: " + this.intervalX);
                //console.log("The new x transform: " + this.intervalXTransform);
                this.intervalXTransform = this.intervalXTransform + this.intervalI;
                //console.log(`${this.intervalSel} .sel >>> translatex(${this.intervalXTransform}%)`);
                $(`${this.intervalSel} .sel`).css("transform", `translatex(${this.intervalXTransform}%)`);
            }
        }.bind({intervalSel: this.sel, intervalX: x, intervalXTransform: this.xTransform, intervalI: increment, intervalPixel: pixelPerFrame}), 1);
        this.xTransform = x;
    };

    /**
     * This function renders the carousel for the first time and populates it correctly
     */
    this.render = () => {
        let w = window.innerWidth;
        this.xTransform = 0.0;
        this.postersLeftOfSel = 0.0;
        if (w > 1110){
            this.postersPerSel = 5.0;
        }
        else if (w > 800){
            this.postersPerSel = 4.0;
        }
        else if (w < 801){
            this.postersPerSel = 3.0;
        }
        this.postersRightOfSel = (this.length - this.postersPerSel) * 1.0;
        //Title of selector and index of posters
        $(this.sel).append('<div class="box-head"></div>');
        $(`${this.sel} .box-head`).append(`<div class="box-title">${this.title}</div>`);
        $(`${this.sel} .box-head`).append(`<div class="box-index"></div>`);
        this.styleIndex();

        //posters
        $(this.sel).append('<div class="box"></div>');
        $(`${this.sel} .box`).append('<div class="but-left"><i class="fa-solid fa-chevron-left"></i></div>');
        $(`${this.sel} .but-left`).on("click", this.scrollLeft);
        
        $(`${this.sel} .box`).append('<div class="sel"></div>');
        let posterAr = [];
        for(let posterI = 1; posterI <= this.length; posterI++){
            $(`${this.sel} .sel`).append(`<div class="img-wrap"><div class="poster-wrap poster-wrap-${posterI}"></div></div>`);
            posterAr.push([`${this.sel} .poster-wrap-${posterI}`]);
        }
        this.stylePosters();
        populatePoster(posterAr, api);

        $(`${this.sel} .box`).append('<div class="but-right"><i class="fa-solid fa-chevron-right"></i></div>');
        $(`${this.sel} .but-right`).on("click", this.scrollRight);
    };

    //be sure to run this function only when resizing and not the original size up because of index and length calc logic based on previous values
    this.resize = () => {
        let w = window.innerWidth;
        let changed = false;

        if (w > 1110 && this.postersPerSel != 5.0) { // check if we are switching to another case in order to not have to reload every single time
            this.postersRightOfSel += this.postersPerSel - 5.0;
            this.postersPerSel = 5.0;
            changed = true;
        }
        else if (w > 800 && this.postersPerSel != 4.0){
            this.postersRightOfSel += this.postersPerSel - 4.0;
            this.postersPerSel = 4.0;
            changed = true;
        }
        else if (w < 801 && this.postersPerSel != 3.0) {
            this.postersRightOfSel += this.postersPerSel - 3.0;
            this.postersPerSel = 3.0;
            changed = true;
        }
        if(changed){
            this.stylePosters();
            this.styleIndex();
        }
    };

    /**NEED TO CHECK THIS
     * !
     * !
     * !
     * !
     * !
     * !
     * !
     * !
     * !
     * !
     */
    //Adjusts the widths of the posters and which posters are hoverable
    this.stylePosters = () => {
        $(`${this.sel} .img-wrap`).css("width", `calc(100% / ${this.postersPerSel})`);
        $(`${this.sel} .poster-wrap`).removeClass("poster-hover-first poster-hover poster-hover-last");
        for (let posterI = this.postersLeftOfSel + 1; posterI <= (this.postersPerSel + this.postersLeftOfSel); posterI++){
            if(posterI == this.postersLeftOfSel + 1){
                $(`${this.sel} .img-wrap:nth-child(${posterI}) > .poster-wrap`).addClass("poster-hover-first");
            }
            else if(posterI > this.postersLeftOfSel + 1 && posterI < (this.postersPerSel + this.postersLeftOfSel)){
                $(`${this.sel} .img-wrap:nth-child(${posterI}) > .poster-wrap`).addClass("poster-hover");
            }
            else if(posterI == (this.postersPerSel + this.postersLeftOfSel)){
                $(`${this.sel} .img-wrap:nth-child(${posterI}) > .poster-wrap`).addClass("poster-hover-last");
            }
        }
    };

    //Remeber this function will only populate a .box-index which already exists. Be sure to run this after this div is created
    this.styleIndex = () => {
        $(`${this.sel} .box-index`).empty();
        for (let posterI=0; posterI < this.postersLeftOfSel; posterI+=this.postersPerSel){
            $(`${this.sel} .box-index`).append("<div></div>");
        }
        $(`${this.sel} .box-index`).append('<div class="selected"></div>');
        for(let posterI = 0; posterI < this.postersRightOfSel; posterI+=this.postersPerSel){
            $(`${this.sel} .box-index`).append("<div></div>");
        }
    };

    this.scrollLeft = () => {
        if(this.postersLeftOfSel > 0){
            console.log("There are left posters");
            if(this.postersLeftOfSel < this.postersPerSel){
                this.translate(0, 790);
                this.postersLeftOfSel = 0.0;
                this.postersRightOfSel = this.length - this.postersPerSel;
            }
            else{
                this.translate(this.xTransform + 100, 790);
                this.postersLeftOfSel = this.postersLeftOfSel - this.postersPerSel;
                this.postersRightOfSel = this.postersRightOfSel + this.postersPerSel;
            }
        }
        else {
            console.log("No left posters");
            let totalTransformationLength = (100.0 / this.postersPerSel) * (-1.0) * (this.length - this.postersPerSel);
            this.selSetScroll(totalTransformationLength * (0.6), 2);
            this.selSetScroll(totalTransformationLength * 0.8, 1.5);
            this.selSetScroll(totalTransformationLength, 1);
            this.postersLeftOfSel = this.length - this.postersPerSel;
            this.postersRightOfSel = 0.0;
        }
        this.stylePosters();
        this.styleIndex();
    };

    this.scrollRight = () => {
        if (this.postersRightOfSel > 0){
            if(this.postersRightOfSel < this.postersPerSel){
                let lengthLeft = (100.0 * this.postersRightOfSel) / this.postersPerSel;
                this.selSetScroll(this.xTransform - lengthLeft, 1);
                this.postersLeftOfSel = this.length - this.postersPerSel;
                this.postersRightOfSel = 0.0;
            }
            else{
                //console.log("First x val is: " + this.xTransform);
                this.selSetScroll(this.xTransform - 66.0, 1.5);
                //console.log(`Second x val is: ${this.xTransform}`);
                this.selSetScroll(this.xTransform - 34.0, 1)
                //console.log(`Third x val is: ${this.xTransform}`);
                this.postersLeftOfSel = this.postersLeftOfSel + this.postersPerSel;
                this.postersRightOfSel = this.postersRightOfSel - this.postersPerSel;
            }
        }
        else {
            let totalTransformationLength = (100.0 / this.postersPerSel) * (-1.0) * (this.length - this.postersPerSel);
            this.selSetScroll(totalTransformationLength * 0.4, 2);
            this.selSetScroll(totalTransformationLength * 0.2, 1.5);
            this.selSetScroll(0.0, 1)
            this.postersLeftOfSel = 0.0;
            this.postersRightOfSel = this.length - this.postersPerSel;
        }
        this.stylePosters();
        this.styleIndex();
    };

    this.render();
}