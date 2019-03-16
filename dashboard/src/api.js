const BACKEND = 'http://rpi.hazelfire.net/iot/';
export default class IotAPI {
  constructor(token) {
    this.token = token;
  }

  async getDevices() {
    let response = await fetch(BACKEND + 'devices/', {
      headers: {
        Authorization: this.token,
        Accepts: 'application/json',
      },
    });
    return await response.json();
  }

  async getMeasurements() {
    let response = await fetch(BACKEND + 'measurements/', {
      headers: {
        Authorization: this.token,
        Accepts: 'application/json',
      },
    });

    return await response.json();
  }

  async getGoal() {
    let response = await fetch(BACKEND + 'goals/', {
      headers: {
        Authorization: this.token,
        Accepts: 'application/json',
      },
    });

    return await response.json();
  }

  async addGoal(goal) {
    let response = await fetch(BACKEND + 'goals/', {
      method: 'POST',
      headers: {
        Authorization: this.token,
        Accepts: 'application/json',
      },
      body: goal,
    });

    return await response.json();
  }

  static async logIn(username, password) {
    let data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);

    let response = await fetch(BACKEND + 'auth/login/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: data
    });
    let json = await response.json();

    if (!json.key) {
      throw json;
    }

    return json.key;
  }
}
