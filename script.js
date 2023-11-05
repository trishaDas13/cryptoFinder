let animationArea = document.querySelector('.animationArea');
let searchBtn = document.querySelector('main .input button');
let input = document.querySelector('.input input');
let cryptoContainer = document.querySelector('.cryptoContainer');

//? >>>>>>>> Home Page <<<<<<<<
//todo: -------- Fetch API --------
async function fetchAPI(){
    let data = await fetch('https://api.coingecko.com/api/v3/search/trending');
    let res = await data.json();
    let bitcoin = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr');
    let price = await bitcoin.json();
    appendCrypto(res, price);
}
fetchAPI();
//todo: -------- append crypto --------
function appendCrypto(res, price) {
    let bitcoin = price.bitcoin.inr;
    res.coins.forEach(ele => {
        let priceCard = document.createElement('div');
        priceCard.classList.add('priceCard');
        priceCard.innerHTML = `
            <img src="${ele.item.large}" alt="">
            <div class="cardContent">
                <h1>${ele.item.name}</h1>
                <p>${ele.item.price_btc * bitcoin}</p>
            </div>
        `
        // animationArea.appendChild(priceCard);
    });
};

//? >>>>>>>> Search Page <<<<<<<<
//todo: -------- Fetch API --------
async function searchCrypto(){
    let data = await fetch(`https://api.coingecko.com/api/v3/search?query=${input.value}`);
    let res = await data.json();
    appendSearchResult(res);
};
//todo: -------- search & append crypto --------
function appendSearchResult(res){
    console.log(res.coins[0]);
    cryptoContainer.innerHTML = "";
    for(let i=0; i<res.coins.length; i++){
        let ele = res.coins[i];       
        let cryptoCard = document.createElement('div');
        cryptoCard.classList.add('cryptoCard');
        cryptoCard.innerHTML = `
            <div class="cryptoName">
                    <p>${i+1}</p>
                    <img src="${ele.thumb}" alt="">
                    <p>${ele.name} &nbsp ${ele.symbol}</p>
            </div>
            <a href="./info.html"><button>More Info</button></a>
        `;
        cryptoContainer.appendChild(cryptoCard);
    };
};

searchBtn.addEventListener('click', ()=>{
    searchCrypto()
});

//? >>>>>>>> Info Page <<<<<<<<
