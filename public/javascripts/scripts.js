function setActive(activePage){
    let element = document.getElementById(activePage);
    // console.log(element.querySelector('#'+activePage));
    let text = element.querySelector('#'+activePage)
    text.classList.add('textActive')
    element.classList.add("customActive");
}

function addProjects(imgUrl, title,projectUrl){
        try {
            let element = document.getElementById("squareGrid").innerHTML

        element += `
        <div class="col-lg-4 pt-3 d-flex justify-content-center">
                <div class=row>
                    <div class="col-12 d-flex justify-content-center">
                        <a href="${projectUrl}">
                            <div class="square d-flex justify-content-center " style='background-image: url("${imgUrl}"); background-size: 200px 250px;'>


                            </div>
                        </a>
                    </div>
                    <div class="col-12 ps-0 pt-2 d-flex justify-content-center">
                        <h5>${title}</h5>
                    </div>
                </div>
            </div>`
            
        document.getElementById('squareGrid').innerHTML = element
        } catch (error) {
            console.log("Page does not contain element with correct Id");
        }
        
}

function blobAnimiation(stroke_width = 0,direction = false, imageurl='images/Ragga_remove_background.png', x=0,y=0){

            // let element = ''
    
        let refreshId = setInterval(function(){

            if (Math.round(stroke_width,0) > 3){
                direction = true
            } else if (Math.round(stroke_width,0) <= 0){
                direction = false
            }
            // console.log("check time");
        if (direction === false){
            stroke_width = stroke_width + 0.10
        }else if (direction === true){
            stroke_width = stroke_width - 0.10
        }

        let element = `
                        <defs> 
                            <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                                <stop id="stop1" stop-color="rgba(64, 113, 244, 1)" offset="0%"></stop>
                                <stop id="stop2" stop-color="rgba(239.074, 248.256, 255, 1)" offset="100%"></stop>
                            </linearGradient>
                        </defs>
                        <path fill="url(#sw-gradient)" d="M20.1,-27.1C25.4,-23.8,28.5,-17.1,30.6,-10.1C32.7,-3.1,33.8,4.1,32.5,11.4C31.3,18.7,27.8,26,21.9,29.3C16.1,32.6,8.1,32,-0.8,33.1C-9.8,34.3,-19.5,37.3,-26.5,34.4C-33.5,31.4,-37.8,22.5,-38.7,14C-39.6,5.4,-37,-2.9,-34.8,-11.7C-32.5,-20.5,-30.4,-29.7,-24.6,-32.8C-18.9,-35.8,-9.4,-32.7,-1,-31.3C7.4,-29.9,14.8,-30.3,20.1,-27.1Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="${stroke_width}" style="transition: all 0.3s ease 0s;" stroke="url(#sw-gradient)"></path>
                        <image href="${imageurl}" height="100" width="100" x="${x}" y="${y}" />
                        `
        // console.log(element);
        try {
        document.getElementById('sw-js-blob-svg').innerHTML = element
        } catch (error) {
            console.log("Error no Id found");
            clearInterval(refreshId);
        }
    
    }, 50) 

}

addProjects('images/123cvLogo.svg','A CV Creating Telegram Bot', "https://123cv.co.za")
addProjects('images/stock-unplash-300-200.jpeg','JSE Share Alert App', "https://www.jsealerts.co.za/")
addProjects('images/Chair-Contact-pic-134-200.jpeg','Boutique Ecommerce Site with Wix', "https://www.thesilkpurse.co.za/")

// for (let i = 1; i <= 3; i++) {
//     addProjects('images/123cvLogo.svg','Test title '+i, "https://123cv.co.za")
// }





