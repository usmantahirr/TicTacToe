import axios from "axios";
import { API_URL, TIMEOUT } from "../config";

class Game {
  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      timeout: TIMEOUT
    });
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const game = await this.instance.get('/games');
        resolve(game.data);
      } catch (e) {
        reject(e.message);
      }
    });
  }

  getById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const game = await this.instance.get(`/games/${id}`);
        resolve(game.data);
      } catch (e) {
        reject(e.message);
      }
    });
  }

  update(id, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const game = await this.instance.put(`/games/${id}`, body);
        resolve(game.data);
      } catch (e) {
        reject(e.message);
      }
    });
  }

  add(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const game = await this.instance.post('/games', body);
        resolve(game.data);
      } catch (e) {
        reject(e.message);
      }
    });
  }

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const game = await this.instance.delete(`/games/${id}`);
        resolve(game.data);
      } catch (e) {
        reject(e.message);
      }
    });
  }
}

export default Game;
