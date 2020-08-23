var countryMe = document.getElementById("country-me");
var ncc = document.getElementById("new-confirmed-cases")
var nrc = document.getElementById("new-recoverd-cases");
var nd = document.getElementById("new-deaths");
var tcc = document.getElementById("total-confirmed-cases");
var trc = document.getElementById("total-recovered-cases");
var td = document.getElementById("total-deaths");
var worldData = document.getElementById("some-content");

function display() {
    arr.forEach((a) => {

        var country1 = document.createElement('div');
        country1.append(a.Country);
        countryMe.append(country1);

        var ncc1 = document.createElement('div');
        ncc1.append(a.NewConfirmed);
        ncc.append(ncc1);

        var nrc1 = document.createElement('div');
        nrc1.append(a.NewRecovered);
        nrc.append(nrc1);

        var nd1 = document.createElement('div');
        nd1.append(a.NewDeaths);
        nd.append(nd1);

        var tcc1 = document.createElement('div');
        tcc1.append(a.TotalConfirmed);
        tcc.append(tcc1);

        var trc1 = document.createElement('div');
        trc1.append(a.TotalRecovered);
        trc.append(trc1);

        var td1 = document.createElement('div');
        td1.append(a.TotalDeaths);
        td.append(td1);

    })
    var wnc2 = document.createElement('div');
    wnc2.append(`Total Confirmed cases: ${arrg.TotalConfirmed}`);
    worldData.append(wnc2);
    var wnc = document.createElement('div');
    wnc.append(`New Confirmed cases: ${arrg.NewConfirmed}`);
    worldData.append(wnc);
    var wnc1 = document.createElement('div');
    wnc1.append(`New Recovered cases: ${arrg.NewRecovered}`);
    worldData.append(wnc1);
    var wnc3 = document.createElement('div');
    wnc3.append(`Total Deaths: ${arrg.TotalDeaths}`);
    worldData.append(wnc3);
    var wnc4 = document.createElement('div');
    wnc4.append(`New Deaths: ${arrg.NewDeaths}`);
    worldData.append(wnc4);
    var wnc5 = document.createElement('div');
    wnc5.append(`Total Recovered: ${arrg.TotalRecovered}`);
    worldData.append(wnc5);


}



var arr;


fetch('https://api.covid19api.com/summary').then((res) => {
    return res.json();
    // console.log(res.json());

}).then((res2) => {

    // document.getElementById("spinner").classList.add("hide");

    arr = res2.Countries;
    arrg = res2.Global;
    display();



})

var searchresult = document.getElementById("show");
var searchresult1 = document.getElementById("show1");
var searchresult2 = document.getElementById("show2");
var searchresult3 = document.getElementById("show3");

function handleCountrySearch() {
    document.getElementById("some-content").classList.add("hide");

    var nation = document.getElementById("search-country").value;
    plotGraph(nation);
    var searchedResult = null;
    arr.forEach((a) => {

        if (nation.toUpperCase() === a.Country.toUpperCase()) {

            searchedResult = a;


        }
    })

    if (searchedResult) {

        searchresult.innerHTML = `<span>New Confirmed cases:</span>${searchedResult.NewConfirmed}`;
        searchresult1.innerHTML = `<span>New recovered cases:</span>${searchedResult.NewRecovered}`;
        searchresult2.innerHTML = `<span>New Deaths:</span>${searchedResult.NewDeaths}`;
        searchresult3.innerHTML = "";

    } else {
        searchresult.innerHTML = "";
        searchresult1.innerHTML = "";
        searchresult2.innerHTML = "";
        searchresult3.innerHTML = "Invalid Country Name";
    }


}

function plotGraph(country) {
    document.getElementById("some-content").classList.add("hide");
    var date = [];
    var cases = [];
    var daysev = [];
    var cassev = [];
    fetch('https://api.covid19api.com/dayone/country/' + country + '/status/confirmed').then((res) => {;
        return res.json();
    }).then((res2) => {

        res2.forEach((a, i) => {

            date[i] = a.Date;
            cases[i] = a.Cases;
        });

        lenc = (cases.length) - 7;
        lend = (date.length) - 7;
        cassev = cases.slice(lenc);
        daysev = date.slice(lend);


        var layout = {
            title: 'Increase In Total Cases',
        }
        var trace1 = {

            x: date,
            y: cases,
            type: 'scatter'
        };



        var data = [trace1];

        Plotly.newPlot('graph', data, layout);

        var layout1 = {
            title: 'Last seven day Stats ',
        }
        var trace2 = {
            x: daysev,
            y: cassev,
            type: 'bar',

        };



        var data2 = [trace2];

        Plotly.newPlot('graphw', data2, layout1);




    })


}


// function changeColor() {
//     document.getElementById('world').classList.remove('table-class');
//     document.getElementById('world').classList.add('table-change');
// }