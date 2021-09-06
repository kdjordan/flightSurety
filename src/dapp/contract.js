import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import Config from './config.json';
import Web3 from 'web3';

export default class Contract {
    constructor(network, callback) {

        let config = Config[network];
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
        this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
        this.initialize(callback);
        this.owner = null;
        this.airlines = [];
        this.passengers = [];
    }

    initialize(callback) {
        this.web3.eth.getAccounts(async (error, accts) => {
           
            this.owner = accts[0];

            let counter = 1;

            while(this.passengers.length < 5) {
                this.passengers.push(accts[counter++]);
            }

            callback();
        });
    }

    isOperational(callback) {
       let self = this;
       self.flightSuretyApp.methods.isOperational().call({ from: self.owner}, callback);
    }

    // registerAirline(airline) {
    //     console.log('registering airline')
    //     let self = this;
    //     let payload = {
    //       airline: airline
    //     }
        
    //     self.flightSuretyApp.methods.registerAirline(airline).send({from: self.owner}, (error, result) => {
    //       if(error) {
    //         console.log(error);
    //       } 
    //       else {
    //         alert('Registered: ' + payload.airline);
    //         console.log('Registered: ' + payload.airline);
    //         console.log(payload);
    //       }    
    //     });
    //   }

    // fetchFlightStatus(flight, callback) {
    //     let self = this;
    //     let payload = {
    //         airline: self.airlines[0],
    //         flight: flight,
    //         timestamp: Math.floor(Date.now() / 1000)
    //     } 
    //     self.flightSuretyApp.methods
    //         .fetchFlightStatus(payload.airline, payload.flight, payload.timestamp)
    //         .send({ from: self.owner}, (error, result) => {
    //             callback(error, payload);
    //         });
    // }

    async getRegisteredAirlines() {
        console.log('calling in contracts')
        let self = this;
        console.log('owner', self.owner)
        let res = await self.flightSuretyApp.methods.getOperationalAirlines().call({ from: self.owner});
        console.log('result', res)
        return res
    }

    async getOperationalAirlines() {
        let self = this;
        let res = await self.flightSuretyApp.methods.getOperationalAirlines().call({ from: self.owner});
        return 'aifbakjfba;k';
    }
}