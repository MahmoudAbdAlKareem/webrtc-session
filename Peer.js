//set offer const offer = ...
const remoteConnection = new RTCPeerConnection();
const offer = {
  type: "offer",
  sdp:
    "v=0\r\no=- 2700995110251079180 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 62838 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 192.168.8.101\r\na=candidate:341193750 1 udp 2122260223 192.168.8.101 62838 typ host generation 0 network-id 1 network-cost 10\r\na=ice-ufrag:QQde\r\na=ice-pwd:gnoKpsngjA8M6zhFhWKWQMiF\r\na=ice-options:trickle\r\na=fingerprint:sha-256 1F:01:0A:42:F9:E6:A8:B6:51:22:C7:9C:82:3F:E7:5E:C6:7E:20:6B:A2:69:35:6F:3C:DF:11:1E:BD:7E:05:25\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};
remoteConnection.onicecandidate = (e) => {
  console.log(`%c NEW ice candidate detected`, `color: green`);
  console.log(
    " %c SDP Message: ",
    "background: #222; color: #bada55",
    JSON.stringify(remoteConnection.localDescription)
  );
};

remoteConnection.ondatachannel = (e) => {
  const chatChannel = e.channel;
  chatChannel.onmessage = (e) => {
    console.log(`%cRemote Peer: ${e.data}`, "color: blue");
  };
  chatChannel.onopen = (e) => {
    console.log("%cChannel Opened", "color: green");
  };
  chatChannel.onclose = (e) => {
    console.log("%cChannel Closed", "color: red");
  };
  remoteConnection.channel = chatChannel;
};

remoteConnection
  .setRemoteDescription(offer)
  .then((a) => console.log("Set Remote Description Done"));

remoteConnection
  .createAnswer()
  .then((a) => remoteConnection.setLocalDescription(a))
  .then((a) =>
    console.log(
      `%c SDP Answer`,
      `color: green`,
      JSON.stringify(remoteConnection.localDescription)
    )
  );

const sendMessage = (message) => {
  console.log(`%cMe: ${message}`, "color: gray");
  remoteConnection.channel.send(message);
};
