(function () {
        "use strict";

        //clock

        document.addEventListener("DOMContentLoaded", function () {

            let c = document.getElementById("clock");

            //setTimeout(updateClock, 2000);
            setInterval(updateClock, 1000);

            function updateClock() {

                let date = new Date();
                let h = date.getHours();
                let m = date.getMinutes();
                let s = date.getSeconds();

                let ampm = h >= 12 ? 'pm' : 'am';
                h = h % 12;
                h = h ? h : 12;


                if (m < 10) {
                    m = "0" + m;
                }

                if (s < 10) {
                    s = "0" + s;
                }

                c.innerHTML = h + ":" + m + ":" + s;

            };

        });

        // forms

        document.getElementById("form").addEventListener("submit", estimateDelivery);

        let e = document.getElementById("delivery");
        e.innerHTML = "0,00 &euro;";

        let p = document.getElementById("v1").checked ? Number(document.getElementById("v1")) : 5;

        let kv = document.getElementById("v1").checked ? Number(document.getElementById("v1")) : 1;





        function estimateDelivery(event) {
            event.preventDefault();

            let linn = document.getElementById("linn");


            if (linn.value === "") {

                alert("Palun valige nimekirjast linn!");

                linn.focus();

                return;


            } else if (linn.value === "trt") {
                document.getElementById("delivery").innerHTML = Number(kv) + Number(p) + Number(2.5) + "&euro;";

            } else if (linn.value === "nrv") {
                document.getElementById("delivery").innerHTML = Number(kv) + Number(p) + Number(2.5) + "&euro;";

            } else if (linn.value === "prn") {
                document.getElementById("delivery").innerHTML = Number(kv) + Number(p) + Number(3) + "&euro;";

            } else if (linn.value === "tln") {
                document.getElementById("delivery").innerHTML = Number(kv) + Number(p) + Number(0) + "&euro;";

            } else {

                e.innerHTML = "x,xx &euro;";

            }



            console.log("Tarne hind on arvutatud");


        }


        //tarneviis

        document.getElementById("form2").addEventListener("submit", selectDelivery);

        function selectDelivery(event) {
            event.preventDefault();

            if ($('!input[type=radio]:checked')) {

                    alert("Palun valige tarneviis!");

                    return;


                }

            }
 


        })();









    // map

    let mapAPIKey = "ApVx4XdKXq5B4FGdkaLDBxzFAbfQd4lzKbnMnjxdEjAJJcB2rsQu-hNt4mMsDi3S";

    let map, infobox;

    function GetMap() {

        "use strict";
    

        let centerPoint = new Microsoft.Maps.Location(
            58.913636,
            25.760691
        );

        let tartuulikool = new Microsoft.Maps.Location(
            58.38104,
            26.71992
        );

        let tallinnaulikool = new Microsoft.Maps.Location(
            59.43891,
            24.77163
        );

        map = new Microsoft.Maps.Map("#map", {
            credentials: mapAPIKey,
            center: centerPoint,
            zoom: 7,
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            disablePanning: true
        });
        
        
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });

        //Assign the infobox to a map instance.
        infobox.setMap(map);

        let pushpin = new Microsoft.Maps.Pushpin(tartuulikool, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });


        let pushpin2 = new Microsoft.Maps.Pushpin(tallinnaulikool, {
            title: 'Tallinna Ülikool',
            //subTitle: 'Hea koht',
            //text: 'TLÜ'
        });
        
        pushpin.metadata = {
            title: 'Tartu Ülikool',
            description: 'Tartu Ülikooli peahoone asub Tartu kesklinnas aadressil Ülikooli tänav 18. See on üks silmapaistvamaid klassitsistliku arhitektuuri näiteid Eestis.'
        };
        
       pushpin2.metadata = {
            title: 'Tallinna Ülikool',
            description: 'Tallinna Ülikool on Tallinnas asuv avalik-õiguslik ülikool. See on üliõpilaste arvult kolmas ülikool Eestis.'
        };
        
        Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
        Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);



        map.entities.push(pushpin);
        map.entities.push(pushpin2);

    }

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

    // https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE