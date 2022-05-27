/*
 * SOCKET.io
 */
import { io } from "./socket.io-client.js";
const proxyURL = 'ws://localhost:3011'

const socket = io(proxyURL, { transports : ['websocket'] })

/*
socket.on('connect', function() {
    console.log('connected')
});
*/



export default socket;