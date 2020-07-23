//-- Functions
function init()
{
    service_en_cours = true;

    var to_pay = alea(0.1, 100);
    document.getElementById('to_pay').innerHTML = to_pay;

    var payed = payed_money(to_pay);
    document.getElementById('payed').innerHTML = payed;

    document.getElementById('state').innerHTML = "Non traité";
    document.getElementById('state').style.color = "black";
    document.getElementById('drawer').style.display = "none";
    document.getElementById("open_drawer_btn").value = "Ouvrir le tiroir caisse";
    document.getElementById('change').innerHTML = "0";

    var btn_next_html = document.getElementById('btn_next');
    btn_next_html.value = "Service en cours";
    btn_next_html.style.color = "grey";
    btn_next_html.style.fontStyle = "italic";
}

function event_listeners()
{
    document.getElementById('btn_next').addEventListener("click", next);

    document.getElementById('open_drawer_btn').addEventListener("click", change_drawer_state);

    document.getElementById('20').addEventListener("click", function(){assemble_change(20)});
    document.getElementById('10').addEventListener("click", function(){assemble_change(10)});
    document.getElementById('5').addEventListener("click", function(){assemble_change(5)});
    document.getElementById('2').addEventListener("click", function(){assemble_change(2)});
    document.getElementById('1').addEventListener("click", function(){assemble_change(1)});
    document.getElementById('0.50').addEventListener("click", function(){assemble_change(0.5)});
    document.getElementById('0.20').addEventListener("click", function(){assemble_change(0.2)});
    document.getElementById('0.10').addEventListener("click", function(){assemble_change(0.1)});

    document.getElementById('give_money').addEventListener("click", end_trade);
}

function alea(min,max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    brouzoufs = Math.floor(Math.random() * (max - min)) + min;
    cents = Math.floor(Math.random() * (10 - 0)) / 10.0;
    return brouzoufs+cents;
}

function payed_money(price_to_pay)
{
    var money_given = Math.ceil(price_to_pay / 10) * 10;
    return money_given;
}

function change_drawer_state()
{
    var drawer_html = document.getElementById('drawer');
    var open_drawer_btn_html = document.getElementById('open_drawer_btn');
    switch (drawer_html.style.display)
    {
        case "none":
            drawer_html.style.display = "block";
            open_drawer_btn_html.value = "Fermer le tiroir caisse";
            break;

        case "block":
            drawer_html.style.display = "none";
            open_drawer_btn_html.value = "Ouvrir le tiroir caisse";
            break;
    }
}

function assemble_change(value)
{
    var money_in_hand = document.getElementById("change").textContent;
    money_in_hand = Number.parseFloat(money_in_hand);
    money_in_hand += value;
    money_in_hand = Math.floor(money_in_hand*10)/10;
    document.getElementById("change").innerHTML = money_in_hand;
}

function end_trade()
{
    var error_count_html = document.getElementById('error_count');
    var to_return = Number.parseFloat(document.getElementById('payed').textContent) - Number.parseFloat(document.getElementById('to_pay').textContent);
    var returned = Number.parseFloat(document.getElementById('change').textContent);
    var state_html = document.getElementById('state');
    var difference = to_return - returned;
    if ( -0.0001 < difference && difference < 0.0001)
    {
        state_html.innerHTML = "Le compte est bon !";
        state_html.style.color = "green";
    }
    else if ( difference > 0)
    {
        state_html.innerHTML = "Il manque de la monnaie !";
        state_html.style.color = "red";
        error_count_html.innerHTML = Number.parseInt(error_count_html.textContent) + 1;
    }
    else
    {
        state_html.innerHTML = "Rendu plus que nécessaire !";
        state_html.style.color = "red";
        error_count_html.innerHTML = Number.parseInt(error_count_html.textContent) + 1;
    }
    service_en_cours = false;

    var btn_next_html = document.getElementById('btn_next');
    btn_next_html.value = "Servir le prochain client";
    btn_next_html.style.color = "black";
    btn_next_html.style.fontStyle = "normal";

    var client_nb_html = document.getElementById('client_nb');
     client_nb_html.innerHTML = Number.parseInt(client_nb_html.textContent) + 1;

     change_drawer_state();
}

function next()
{
    if (service_en_cours == false)
    {
        init();
    }
}

//-- Execution
var service_en_cours = true;
init();
event_listeners();
