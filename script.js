let animationArea = document.querySelector('.animationArea');


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
        animationArea.appendChild(priceCard);
    });
};

