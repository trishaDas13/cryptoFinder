let searchBtn = document.querySelector('main .input button');
let input = document.querySelector('.input input');
let cryptoContainer = document.querySelector('.cryptoContainer');

//? >>>>>>>> Search Page <<<<<<<<
//todo: -------- Fetch API --------
async function searchCrypto(){
    let data = await fetch(`https://api.coingecko.com/api/v3/search?query=${input.value}`);
    let res = await data.json();
    appendSearchResult(res);
};
//todo: -------- search & append crypto --------
function appendSearchResult(res){
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
            <a href="./info.html?id=${ele.id}"><button>More Info</button></a>
        `;
        cryptoContainer.appendChild(cryptoCard);
    };
};

searchBtn.addEventListener('click', ()=>{
    searchCrypto()
});

