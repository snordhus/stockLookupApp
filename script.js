//API: 1itxYekaxtaSxGNZpGnzL9eEpSgxlu7O4KrUzaRL
//Alt Account: 4keRW0Psh74gusv0IAXwj8xudpgq5Ts01z96dfpo
//Only get 100 API calls/day for basic (free) account, so I made a second one when I ran out of calls from testing

const formElement = document.getElementById("add-form");
formElement.addEventListener("submit", submitTicker, false);

//called when "GO" is clicked or enter is pressed (form submitted)
function submitTicker() {
    event.preventDefault(); // This prevents the form from reloading the page!
    var text = document.getElementById("todo-name").value;
    //clears form input
    document.getElementById("todo-name").value = "";

    getData(text);
}

//makes API 'GET' call
function getData(ticker) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(this.responseText);
            console.log(response);
            

                var itemHead = document.createElement("div");
                var item = document.createElement("div");
                var element = document.getElementById("result");
                element.appendChild(itemHead);
                itemHead.classList.add("itemHead");
                item.classList.add("item");
                
                
                
                var symbol = document.createTextNode(response.quoteResponse.result[0].symbol);
                var comName = document.createTextNode(response.quoteResponse.result[0].displayName);
                var eName = document.createTextNode(response.quoteResponse.result[0].fullExchangeName);
                var askPrice = document.createTextNode(response.quoteResponse.result[0].ask);
                var bidPrice = document.createTextNode(response.quoteResponse.result[0].bid);
                var PE = document.createTextNode(response.quoteResponse.result[0].trailingPE);
                var rating = document.createTextNode(response.quoteResponse.result[0].averageAnalystRating);

                itemHead.innerHTML += '<strong>Ticker Symbol: </strong> ';
                itemHead.appendChild(symbol);

                if(document.querySelector('#nameCheck:checked') !== null){
                    item.innerHTML += '<strong>Company Name: </strong> ';
                    item.appendChild(comName);
                    item.innerHTML += '<br>';
                }
                if(document.querySelector('#exCheck:checked') !== null){
                    item.innerHTML += '<strong>Exchange Name:</strong> ';
                    item.appendChild(eName);
                    item.innerHTML += '<br>';
                }
                
                if(document.querySelector('#askCheck:checked') !== null){
                    item.innerHTML += '<strong>Ask Price:</strong> $';
                    item.appendChild(askPrice);
                    item.innerHTML += '<br>';
                }
                if(document.querySelector('#bidCheck:checked') !== null){
                    item.innerHTML += '<strong>Bid Price:</strong> $';
                    item.appendChild(bidPrice);
                    item.innerHTML += '<br>';
                }
                if(document.querySelector('#PECheck:checked') !== null){
                    item.innerHTML += '<strong>Trailing P/E:</strong> ';
                    item.appendChild(PE);
                    item.innerHTML += '<br>';
                }
                if(document.querySelector('#ratCheck:checked') !== null){
                    item.innerHTML += '<strong>Avg. Analyst Rating:</strong> ';
                    item.appendChild(rating);
                    item.innerHTML += '<br>';
                }

                //adds delete button and checkbox to the item                
                item.innerHTML += '<button class="deleteButton" onclick="deleteItem(this);">Delete</button>';
                itemHead.appendChild(item);
                item.innerHTML += '<br>';
        }
    };
    xhttp.open("GET", "https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols="+ticker, true);
    xhttp.setRequestHeader("x-api-key","kbsAyPADLM3M5TOa8TJRu4OuVAncE5f75P2yYiiE");
    xhttp.send();
  }

  //deletes stock result from the DOM when its respective delete button is clicked
  function deleteItem(elem) {
    elem=elem.parentNode;
    elem.parentNode.parentNode.removeChild(elem.parentNode);
}
