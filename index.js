
const loading =document.querySelector(".loader");

async function dog()
{
try{
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if(!response.ok)
        throw new Error("invalid or fetch is failed",response.status);
    let img = await response.json();
    console.log(img);
    displayImg(img);
}
catch(err)
{
    console.error(err);
    const loading =document.querySelector(".loader");
    loading.style.display="none";
}
};

function displayImg(img)
{
    let dog_img=img.message;
    const image = document.createElement("div");
    image.classList.add("my-img");
    image.innerHTML=`
    <img src="${dog_img}" alt="Dog Image" width ="400px"> 
    `;
    loading.style.display="None"
    document.body.appendChild(image);
}


// function displayImg(img)
// {
//     let dog_img = img.message;
//     document.querySelector(".image_").innerHTML=`
//         <img src="${dog_img}" alt="Dog Image" width ="400px">
//     `;
// }

window.addEventListener("DOMContentLoaded", function ()
{
    let intervalID = this.setInterval(()=>{
        dog();
    },2000);
    this.setTimeout(()=>{
        this.clearInterval(intervalID);
    },10000);
});





// IMDB -- movie details and Ratings
// ---------------------------------






const url = 'https://imdb-top-1000-movies-series.p.rapidapi.com/byrating';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': '3d6b17c829msh5b35027528a7439p1318a9jsn727e672fb439',
		'x-rapidapi-host': 'imdb-top-1000-movies-series.p.rapidapi.com',
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body: new URLSearchParams({
		above: '8.1',
		under: '8.2'
	})
};


async function movies() {
    try {
    const response=await fetch(url,options);
        if(!response.ok) {
            console.log(response.ok);
            throw new Error("Invalid or fetching failed",response.status);
        }
        let movie=await response.json();
        console.log(movie);
        displaymovie(movie);
    }
    catch(err){
        console.error(err);
    }
}

function displaymovie(movie)
{
    const mainContainer = document.createElement("div");
    
    mainContainer.classList.add("container");
    for(let i=1;i<movie.result.length;i++) {
        let rating_data = movie.result[i];
        const movie_data=document.createElement("div");
        movie_data.classList.add("my_data");
        movie_data.innerHTML=`
        <p>${i}</p>
        <img src="${rating_data.Poster_Link}" alt="image" width:"300px">
        <h2>${rating_data.Series_Title} </h2>
        <h3>${rating_data.IMDB_Rating}</h3>
        <p>${rating_data.Overview}</p>
        ${loading.style.display="movie Rating"}
        `;
        mainContainer.appendChild(movie_data);
    }
    document.body.appendChild(mainContainer);
}

window.addEventListener("DOMContentLoaded",function(){
    this.setTimeout(()=>{
        movies();
    },11000);
},);

