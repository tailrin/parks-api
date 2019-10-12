const apiKey = "77TcsfiQrsXysvXgRADWsmsQxNQuNjGSMbUZM5Ud";
const baseUrl =  "https://developer.nps.gov/api/v1/parks";



function createBox(state){
  return `<div class="checkboxes"><input type="checkbox" name="${state.code}" value="${state.name}"> <label class="box-label" for='${state.name}'>${state.name}</label></div>`;
}


$('document').ready(function(){
  $('#checkboxes').html(createCheckBoxes());
});

function createCheckBoxes(){
  const arr = [];
  states.forEach(state => {
    arr.push(createBox(state))
  });
  return arr.join("");
}

 function displayResults(url){
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      const arr =[];
      console.log(responseJson);
      responseJson.data.forEach(datum => {
      const result = `<li class="result-item"><h3>${datum.fullName}</h3><p>${datum.description}</p><a href="${datum.url}">${datum.url}</a></li>`;
      arr.push(result);
      });
     $("#result-list").html(arr.join(""));
    });
   $('#js-results').removeClass('hidden');
 }



function getParks(Limit){
  const params = {
  api_key:apiKey,
  limit: Limit,
  statesCodes: []
  }
  $('input:checked').each(function () {
  params.statesCodes.push($(this).attr('name'));
  });
  const url = baseUrl + '?' + formatParams(params);
  console.log(url);
  displayResults(url);
}

function formatParams (params) {
  if (params.statesCodes.length !==0 ){
    const stateCodeString = `stateCode=${params.statesCodes.join(",")}`;
    delete params.statesCodes;
    const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&') + '&' + stateCodeString;
  }
  delete params.statesCodes;
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function watchForm(){
$('form').submit(event => {
  event.preventDefault();
  const limit = $(".limit").val();
  getParks(limit);
 });
}

$(watchForm());
