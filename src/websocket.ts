import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socket = new SockJS('http://localhost:8082/ws');
const stompClient = Stomp.over(socket);

export default stompClient;
