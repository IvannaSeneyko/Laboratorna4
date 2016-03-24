"use strict";

// hide local variables scope
(function()
{
	// jQuery-style notation
	var $ = function (a) { return document.getElementById(a);}
	
    //var h = Math.floor( Math.min( window.innerWidth, screen.availHeight) * 0.75);
    //$("itemcontainer").innerHTML = '<hr><div class="w3-row"><div class="w3-col" style="height:'+h+'px"><h3>Loading...</h3></div></div>';
    var myitems = [];
 
	var calculatePrice = function()
	{
		 var price = 0;
		 var atLeastOneIsSelected = false;
		 for(var i in myitems)
		 {
			 var checkid = "itemcheck_"+i;
			 if ($(checkid).checked) { price += myitems[i].price; atLeastOneIsSelected = true; }
		 }
		 return [price, atLeastOneIsSelected];
	}
 
    var selectionChangeF = function()
    {
		var price = calculatePrice();// [price, is_selected]
		$("totalprice").innerHTML = "Total price =" + price[0].toFixed(2) + " USD.";
		$("buybutton").disabled = !price[1];
    }
	
	$("buybutton").onclick = function()
	{
		$('dialogprice').innerHTML = calculatePrice()[0].toFixed(2);
		$('buydialog').style.display='block';
	}
 
    var updateContentF = function()
    {
        var itemcontainer = $("itemcontainer");
        itemcontainer.appendChild(document.createElement('hr'));

        for(var i in myitems)
        {
            var item = myitems[i];
            item.price = Number.parseFloat(item.price); // make sure it is a number

            var nameid = "itemname_"+i;
            var textid = "itemtext_"+i;
            var checkid = "itemcheck_"+i;
     
            var div = document.createElement('div');
            div.className = "w3-row";
            div.innerHTML = '<div class="w3-col s4 m2">' +
                            '<img src="' + item.icon + '" style="width:100%"></img></div>' +
                            '<div class="w3-col s8 m7 w3-container"><h3 id="'+nameid+'"></h3>' +
                            '<p id="'+textid+'"></p></div><div class="w3-col s12 m3 w3-container">' +
                            '<h3><input id="' + checkid + '" type="checkbox"></input>&nbsp;'+item.price+' USD.</h3></div>';
     
            itemcontainer.appendChild(div);
            itemcontainer.appendChild(document.createElement('hr'));

            $(nameid).appendChild(document.createTextNode(item.name));
            $(textid).appendChild(document.createTextNode(item.desc));
            $("itemcheck_"+i).onchange = selectionChangeF;
        }

        selectionChangeF();
    }
 
    // send loanding request
    var xmlhttp = new XMLHttpRequest();
    var url = "shop.php";
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4)
        {
            if (xmlhttp.status == 200)
            {
                myitems = JSON.parse(xmlhttp.responseText);
                updateContentF();
            }
            else
            {
                alert("Error loading shop content. Default content is used!!!");
                myitems = [  {name:"Smile 1",icon:"smile1.svg", desc:"Offline smile", price:0.99},
                             {name:"Smile 2",icon:"smile2.svg", desc:"Offline smile", price:2.99},
                             {name:"Smile 3",icon:"smile3.svg", desc:"Offline smile", price:3.99} ];
                updateContentF();
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send(); 
})();

