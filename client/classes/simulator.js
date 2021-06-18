export class Simulator {
  constructor(clients, runTime) {
    this.clients = clients;
    this.runTime = runTime;
    this.boundStop = this.stop.bind(this);

    // stats
    this.translationsReceived = null;
    this.translationsRequested = null;
    this.averageResponseTime = null;
  }

  init() {
    setTimeout(this.boundStop, this.runTime);
    for (const client of this.clients) {
      client.init();
    }
  }

  stop() {
    for (const client of this.clients) {
      client.stop();
    }
  }

  getStats() {
    this.translationsRequested = this.getTotReq(this.clients);
    this.translationsReceived = this.getTotRec(this.clients);
    this.averageResponseTime = this.getAvgResTime(this.clients);
  }

  getTotReq() {
    let totalRequests = 0;
    for (const client of this.clients) {
      totalRequests += client.translationsRequested.length;
    }
    return totalRequests;
  }

  getTotRec() {
    let totalReceived = 0;
    for (const client of this.clients) {
      totalReceived += client.translationsReceived.length;
    }
    return totalReceived;
  }

  getAvgResTime() {
    let allTransRec = [];
    for (const client of this.clients) {
      allTransRec = allTransRec.concat(client.translationsReceived);
    }

    // return 0 if no translations have been received
    if (allTransRec.length === 0) return 0;

    const allResTimes = allTransRec.map(trans => trans.resTime);
    const allResTimesSum = allResTimes.reduce((a, b) => a + b);
    const averageResTime = Math.floor(allResTimesSum / allResTimes.length);

    return averageResTime;
  }
}
