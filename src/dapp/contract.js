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
        this.registeredAirlines = [];
        this.operationalAirlines = [];
        this.passengers = [];
    }

    initialize(callback) {
        this.web3.eth.getAccounts(async (error, accts) => {
           
            this.owner = accts[0];

            let counter = 1;

            this.registeredAirlines = await this.getRegisteredAirlines();
            this.operationalAirlines = await this.getOperationalAirlines();
            
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

    //getRegisteredAirlines that need funding
    async getRegisteredAirlines() {
        console.log('calling getRegisteredAirlines')
        let self = this;
        // console.log('owner', self.owner)
        let res = await self.flightSuretyApp.methods.getRegisteredAirlines().call({ from: self.owner});
        return res
    }

    //getOperationalAirlines = airlines that are registered and funded
    async getOperationalAirlines() {
        console.log('calling getOperationalAirlines')
        let self = this;
        // console.log('owner', self.owner)
        let res = await self.flightSuretyApp.methods.getOperationalAirlines().call({ from: self.owner});
        return res;
    }


    //register an airline
    async registerAirline(airline, callback) {
        console.log('registering airline', airline)
        let self = this
        await self.flightSuretyApp.methods.registerAirline(airline).send({from: self.owner}, (error, result) => {
            location.reload();
            callback(error, result)
        });
      }

      async fundAirline(airline, callback) {
          console.log('funding airline', airline)
          let self = this
          const fund = self.web3.utils.toWei('10', "ether"); 
          await self.flightSuretyApp.methods.fundAirline(airline).send({from: self.owner, value:fund}, (error, result) => {
            // location.reload();
            callback(error, result)
        });

      }

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

}