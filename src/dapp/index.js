
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';


(async() => {

    let result = null;

    let contract = new Contract('localhost', () => {

        // Read transaction
        contract.isOperational((error, result) => {
            console.log(error,result);
            display('Operational Status', 'Check if contract is operational', [ { label: 'Operational Status', error: error, value: result} ]);
        });

        contract.airlines.forEach(airline => {
            airlineDisplaySelect(airline, DOM.elid("airlines_need_funding"));
        });  
    

        // User-submitted transaction
        // DOM.elid('submit-oracle').addEventListener('click', () => {
        //     let flight = DOM.elid('flight-number').value;
        //     // Write transaction
        //     contract.fetchFlightStatus(flight, (error, result) => {
        //         display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
        //     });
        // })

         // Register Airline
        //  DOM.elid('submit_register_airline_btn').addEventListener('click', () => {
        //     let registerAirlineAddress = DOM.elid('register_airline_address').value;
        //     console.log(registerAirlineAddress)
            
        //     contract.registerAirline(registerAirlineAddress, (error, result) => {
        //         console.log(error,result);
        //     });
        // })

         // Get registered Airlines
        //  DOM.elid('get-registered-airlines-btn').addEventListener('click', () => {
        //     let registerAirlineAddress = DOM.elid('registered-airlines-address').value;
        //     console.log(registerAirlineAddress)
            
        //     let registerdAirlines = contract.getRegisteredAirlines((error, result) => {
        //         console.log(error,result);
        //         console.log('registeredAirlines', registerdAirlines);
        //     });
        // })

         // Get operational Airlines
         //operational Airlines are both registered and funded
        // contract.getOperationalAirlines((error, result) => {
        //     console.log(error, result)
        // })
        // .then((result) => {
        //     DOM.elid('operational-airlines-addresses').value = result;
        // });


    })
})();


function display(title, description, results) {
    let displayDiv = DOM.elid("display-wrapper");
    let section = DOM.section();
    section.appendChild(DOM.h2(title));
    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row'}));
        row.appendChild(DOM.div({className: 'col-sm-4 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result.error ? String(result.error) : String(result.value)));
        section.appendChild(row);
    })
    displayDiv.append(section);
}

function airlineDisplaySelect(airlineAddress, parentEl) {
    let el = document.createElement("option");
    el.text = airlineAddress;
    el.value = airlineAddress;
    parentEl.add(el);
}
