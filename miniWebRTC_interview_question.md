# 🎙️ Interview Question: Architecting & Scaling a "miniWebRTC" Engine

## 📋 Background & Scenario (To read to the candidate)
> *"We are building a lightweight, peer-to-peer file sharing feature inside our web app. To keep infrastructure costs and complexity low for our MVP, we decided to explore a **miniWebRTC** 'serverless' approach. In this model, we do not host a dedicated WebSocket signaling server; instead, Alice and Bob manually exchange an SDP Offer and Answer (e.g., via a secure chat link, QR code, or email) to establish an `RTCDataChannel`."*

---

## ❓ The Questions (3 Parts)

### Part 1: Concepts & Signaling Mechanics
1. **The "Serverless" Myth:** Even though miniWebRTC is considered "serverless" because it lacks a dedicated signaling server, it still typically configures a STUN server (e.g., `stun.l.google.com:19302`). Why is the STUN server necessary if Alice and Bob are directly copy-pasting their SDP strings?
2. **Trickle ICE vs. Vanilla SDP Exchange:** In a normal WebRTC application with a WebSocket signaling server, ICE candidates are trickled (sent one-by-one as they are discovered). In our copy-paste miniWebRTC implementation, how do we ensure Alice's offer string contains the necessary ICE candidates before she copies it to Bob?

### Part 2: Code Review & Debugging
Present the candidate with the following simplified snippet of Alice's initialization code in our miniWebRTC implementation:

```javascript
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
const pc = new RTCPeerConnection(config);

// Alice creates a data channel for messaging
const dataChannel = pc.createDataChannel('chat');

async function createOfferString() {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    
    // We immediately display the offer for Alice to copy-paste to Bob
    return JSON.stringify(pc.localDescription);
}
```

**Question:** 
*"There is a major race condition/flaw in `createOfferString()` that will cause Bob to fail to connect when he pastes Alice's offer. What is the bug, and how would you fix it?"*

### Part 3: Real-World Edge Cases & Scaling (System Design)
1. **The NAT/Firewall Problem:** During testing, the copy-paste mechanism works perfectly when Alice and Bob are at home, but it fails completely when Bob is on an enterprise corporate network behind a symmetric NAT. Why did STUN fail, and what infrastructure addition is required to solve this?
2. **Transitioning to Production:** If our product becomes wildly successful and users complain that copy-pasting SDP strings is clunky, how would you architect an automated, low-latency signaling service to replace the manual exchange? What protocols and fallback strategies would you use?

---

## 🔑 Interviewer Answer Key & Evaluation Rubric

### Part 1 Answer Key
1. **Role of STUN:** STUN (Session Traversal Utilities for NAT) is required for Alice and Bob to discover their public IP addresses and port mappings. Without STUN, the SDP offer would only contain private/local IP addresses (like `192.168.1.5`), making it impossible to establish a peer-to-peer connection across public networks.
2. **Handling ICE Candidates:** Because there is no active signaling channel to trickle candidates, Alice's WebRTC engine must wait until the ICE gathering process completes (gathering all local and STUN candidates) so they are bundled directly inside the final SDP offer string before she copies it.

### Part 2 Answer Key (The Code Bug)
* **The Bug:** `pc.setLocalDescription(offer)` kicks off the asynchronous ICE gathering process with the STUN server. By immediately returning `pc.localDescription`, the returned SDP string will likely have **no public ICE candidates** attached to it, as the STUN requests haven't finished round-tripping yet.
* **The Fix:** We must listen to the `icecandidate` event and wait until `event.candidate === null` (which signals that ICE gathering is complete) or inspect `pc.iceGatheringState === 'complete'` before stringifying the local description.

**Fixed Code Example:**
```javascript
async function createOfferString() {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Wait for ICE gathering to complete before returning the SDP
    await new Promise((resolve) => {
        if (pc.iceGatheringState === 'complete') {
            resolve();
        } else {
            pc.addEventListener('icecandidate', (event) => {
                if (event.candidate === null) {
                    resolve();
                }
            });
        }
    });
    
    return JSON.stringify(pc.localDescription);
}
```

### Part 3 Answer Key
1. **Symmetric NAT & TURN:** Symmetric NATs assign a different public port for every external destination. A STUN server will see one port, but when the peer attempts to connect directly, the NAT assigns a different port, dropping the packets. To fix this, a **TURN** (Traversal Using Relays around NAT) server must be added to `iceServers` to act as a secure cloud relay for the media/data packets.
2. **Signaling Architecture:** The candidate should propose a real-time signaling architecture using **WebSockets** (via libraries like Socket.io or raw WebSockets) or **Server-Sent Events (SSE)** paired with REST POST endpoints. For scaling across multiple server instances, they should mention a pub/sub backplane (like Redis Pub/Sub) to ensure messages between Alice and Bob route correctly if they connect to different signaling nodes.

---

## 📊 Candidate Assessment Rubric

| Level | Expected Performance |
| :--- | :--- |
| **Junior** | • Understands what STUN does conceptually (finding public IPs).<br>• Recognizes that the code snippet acts asynchronously but might need a hint regarding `icecandidate` events.<br>• Knows what WebSockets are for replacing manual copy-paste. |
| **Mid-Level** | • Clearly articulates the difference between Trickle ICE and bundled SDPs.<br>• Immediately spots the ICE gathering race condition in Part 2 and provides a clean JavaScript promise/event-listener fix.<br>• Identifies the need for TURN servers in enterprise networks. |
| **Senior / Staff** | • Aces Parts 1 & 2 effortlessly with precise WebRTC API knowledge.<br>• Explains the exact packet-level behavior of Symmetric NATs.<br>• Designs a robust production signaling architecture, discussing trade-offs between WebSockets vs. SSE, Redis pub/sub backplanes, connection state management, and TURN authentication/cost management. |
