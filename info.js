let container = document.querySelector('.container')

function loadDetail() {
    const url_string = window.location.href;
    const url_obj = new URL(url_string);
    const params = new URLSearchParams(url_obj.search);
    console.log(url_string);
    console.log(url_obj);
    console.log(params);
  
    if(!params.has('id')) {
      window.location.href = "./index.html";
    }
  
    fetch(`https://api.coingecko.com/api/v3/coins/${params.get('id')}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    .then((data)=>{
        return data.json();
    })
    .then(render);
  
  }
  loadDetail();
  function render(res){
    let details = document.createElement('div');
    details.classList.add('details');
    details.innerHTML = `
    <div class="image">
        <img src="${res.image.large}" alt="">
    </div>
    <div class="content">
        <h1 style="color:rgb(252,163,17)">${res.name} (${res.symbol.toUpperCase()})</h1>
        <div class="currency">
            <span> ₹-${res.market_data.current_price.inr} </span>
            <span> $-${res.market_data.current_price.usd} </span>
            <span> €-${res.market_data.current_price.eur} </span>
            <span> £-${res.market_data.current_price.gbp} </span>
        </div>
        <h2>Description :- </h2>
        <p>${res.description.en}</p>
    </div>
    `
    container.appendChild(details);
  }