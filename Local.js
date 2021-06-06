// Step 1
const localConnection = new RTCPeerConnection();
localConnection.onicecandidate = (e) => {
  console.log(`%c NEW ice candidate detected`, `color: green`);
  console.log(
    " %c SDP Message: ",
    "background: #222; color: #bada55",
    JSON.stringify(localConnection.localDescription)
  );
};

const chatChannel = localConnection.createDataChannel("chat");

chatChannel.onmessage = (e) => {
  console.log(`%cRemote Peer: ${e.data}`, "color: blue");
};
chatChannel.onopen = (e) => {
  console.log("%cChannel Opened", "color: green");
};
chatChannel.onclose = (e) => {
  console.log("%cChannel Closed", "color: red");
};

localConnection
  .createOffer()
  .then((o) => localConnection.setLocalDescription(o));

const sendMessage = (message) => {
  console.log(`%cMe: ${message}`, "color: orange");
  chatChannel.send(message);
};

// Step 2
const answer = {
  type: "answer",
  sdp:
    "v=0\r\no=- 5562422020309602541 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 54321 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 192.168.8.101\r\na=candidate:341193750 1 udp 2122260223 192.168.8.101 54321 typ host generation 0 network-id 1 network-cost 10\r\na=ice-ufrag:Xbaw\r\na=ice-pwd:OZBYmMEop9uQhjsCP8YVOgF6\r\na=ice-options:trickle\r\na=fingerprint:sha-256 16:6C:56:8B:EE:E8:A2:9C:C5:94:3A:5B:A6:15:0E:52:5D:78:D6:2A:7E:C9:29:65:8A:D2:13:F2:1A:DE:F0:20\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};
localConnection
  .setRemoteDescription(answer)
  .then((a) => console.log("Set Remote Description Done"));
