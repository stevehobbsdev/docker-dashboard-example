let Docker = require("dockerode");
let isWindows = process.platform === "win32";

let options = {};

if (isWindows) {
    options = {
        host: '127.0.0.1',
        port: 2375
    }
} else {
    options = {
        socketPath: '/var/run/docker.sock'
    }
}

module.exports = new Docker(options);