
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';


(async() => {

    let result = null;
    let contract = new Contract('localhost', () => {
        console.log('loaded')
        // Read transaction
        contract.isOperational((error, result) => {
            console.log(error,result);
            display('Operational Status', 'Check if contract is operational', [ { label: 'Operational Status', error: error, value: result} ]);
        });
    

        // User-submitted transaction
        DOM.elid('submit-oracle').addEventListener('click', () => {
            let flight = DOM.elid('flight-number').value;
            // Write transaction
            contract.fetchFlightStatus(flight, (error, result) => {
                display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
            });
        })
    
    });
    //create airline
    DOM.elid('create_airline').addEventListener('click', () => {
        console.log('register airline tab')
        // let name = DOM.elid('name_airline').value;
        // let address = DOM.elid('addr_airline').value;

        // if(name != '' && address != ''){
           
        //     contract.registerAirline(address, name, (error, result) => {
        //         display('Airline Registered', 'Airline '+name+' was registered', [ { label: 'Registration:', error: error,  value: 'Success - registered. ' } ]);
        //         if(result){
        //             $('#registered_airlines').append('<option value="' + address + '">' + address + '</option>');
        //             $('#registered_airlines').show();
        //         }
               
        //     });
        // }else{
        //     alert("Please, fill all empty spaces in Create Airline Section!");
        // }
        
    });
    

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







