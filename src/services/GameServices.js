import axios from 'axios';

export class GameService{
    static serverURL = `http://localhost:9000`;

    static getAllGames(){        
        let dataURL = `${this.serverURL}/games`;
        return axios.get(dataURL);
    }

    static getGame(gameId){
        let dataURL = `${this.serverURL}/games/${gameId}`;
        return axios.get(dataURL);
    }

    static createGame(games){
        let dataURL = `${this.serverURL}/games`;
        return axios.post(dataURL, games);
    }

    static updateGame(games, gameId){
        let dataURL = `${this.serverURL}/games/${gameId}`;
        return axios.put(dataURL, games);
    }

    static deleteGame(gameId){
        let dataURL = `${this.serverURL}/games/${gameId}`;
        return axios.delete(dataURL);
    }

}