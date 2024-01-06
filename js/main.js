var myInput = document.getElementById('input');
var dataList = [];
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Position
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        // getPost(position)
        getData('Egypt');
    });
}

function getPost(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let changeLat = latitude.toFixed();
    let changeLon = longitude.toFixed();
    let collect = `${changeLat},${changeLon}`;
    getData(collect);
}

// Get Api
function getData(country) {
    var myHttp = new XMLHttpRequest();
    myHttp.open(
        'GET',
        `https://api.weatherapi.com/v1/forecast.json?key=05ab25edecc748c68c9123750233012&q=${country}&days=3&`
    );
    myHttp.send();
    myHttp.addEventListener('readystatechange', function () {
        if (myHttp.readyState == 4) {
            // console.log(myHttp.readyState);
            dataList = JSON.parse(myHttp.response);
            display();
            display2();
        }
    });
}

// Search
myInput.addEventListener('keyup', function (e) {
    console.log(e.target.value);
    var currentCountry = e.target.value;
    getData(currentCountry);
});

// Display Today
function display() {
    var dLocation = dataList.location;
    var dCurrent = dataList.current;
    var d = new Date(`${dCurrent.last_updated}`);
    let day = days[d.getDay()];
    var temp_c = Math.floor(dCurrent.temp_c);
    const M = new Date(`${dCurrent.last_updated}`);
    let month = months[M.getMonth()];
    var today = `
    <div class="card m-2 p-2">
        <div class="card-header d-flex justify-content-between">
            <span class="day">${day}</span>
            <span class="mon">${month}</span>
        </div>
        <div class="card-body ">
            <div class=" cont text-center justify-content-between">
                <p class="country card-title ">${dLocation.name}</p>
                <h1 class="temp_c">${temp_c + '<sup>o</sup>C'}</h1>
                <img class="con " src="${dCurrent.condition.icon}" >
            </div>
            <span class="text mt-2">${dCurrent.condition.text}</span>
        </div>
        <div class="card-footer ">
            <span><img src="image/icon-umberella.png" class="foot" alt="">20%</span>
            <span class=" m-3"><img src="image/icon-wind.png"  alt="">18km/h</span>
            <span><img src="image/icon-compass.png" class="" alt="">East</span>
        </div>
    </div>
        `;
    document.getElementById('data').innerHTML = today;
}

// Display Tomorrow
function display2() {
    var dForcast = dataList.forecast.forecastday;
    var tomorrow = '';
    for (let i = 1; i < dForcast.length; i++) {
        var maxtemp_c = Math.floor(dForcast[i].day.maxtemp_c);
        let afterOneDay = dForcast[i].date;
        let Syntax = new Date(afterOneDay);
        let tom = days[Syntax.getDay()];
        tomorrow += `
                <div class="card ca m-2 p-2 ">
            <div class="card-header">
                <span class="tom">${tom}</span>
            </div>
            <div class="card-body">
                <div class=" cont text-center">
                    <h1 class="temp_c">${maxtemp_c + '<sup>o</sup>C'}</h1>
                    <p class="temp_c">${
                                            dForcast[i].day.mintemp_c + '<sup>o</sup>'
                                        }</p>
                    <img class="icon" src="${dForcast[i].day.condition.icon}" >
                </div>
                <span class="text">${dForcast[i].day.condition.text}</span>
            </div>
            <div class="card-footer">
                <span><img src="image/icon-umberella.png" class="foot" alt="">20%</span>
                <span class=" m-3"><img src="image/icon-wind.png"  alt="">18km/h</span>
                <span><img src="image/icon-compass.png" class="" alt="">East</span>
            </div>
            </div>  
        </div>
        </div>
        `;
    }
    document.getElementById('tomorrow').innerHTML = tomorrow;
}
