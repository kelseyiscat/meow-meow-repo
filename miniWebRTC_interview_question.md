# 🎙️ Interview Question: Architecting & Scaling a "miniWebRTC" Engine

> Target: Mid-level Frontend / Web Engineer – 45-min live  
> Repo context: `arena-clone/` – vanilla HTML/CSS/JS AI chat UI

## 📋 Background & Scenario (To read to the candidate)
> *"We are building a lightweight, peer-to-peer file sharing feature inside our web app (think arena-clone). To keep infrastructure costs low for our MVP, we decided to explore a **miniWebRTC** 'serverless' approach. In this model, we do not host a dedicated WebSocket signaling server; instead, Alice and Bob manually exchange an SDP Offer and Answer (e.g., via a secure chat link, QR code, or email) to establish an `RTCDataChannel`."*

### Interviewer Timing Guide – 45 min
- Part 1 – Concepts: 8–10 min
- Part 2 – Code Review: 12–15 min
- Part 3 – Edge Cases / Scaling: 12–15 min
- Wrap / candidate questions: 5 min
If running long, make Part 3 Q2 a 2-min whiteboard sketch.

---

## ❓ The Questions (3 Parts)

### Part 1: Concepts & Signaling Mechanics (8–10 min)
1. **The "Serverless" Myth:** Even though miniWebRTC is considered "serverless" because it lacks a dedicated signaling server, it still typically configures a STUN server (e.g., `stun:stun.l.google.com:19302`). Why is the STUN server necessary if Alice and Bob are directly copy-pasting their SDP strings?
2. **Trickle ICE vs. Vanilla SDP Exchange:** In a normal WebRTC application with a WebSocket signaling server, ICE candidates are trickled (sent one-by-one as they are discovered). In our copy-paste miniWebRTC implementation, how do we ensure Alice's offer string contains the necessary ICE candidates before she copies it to Bob?

### Part 2: Code Review & Debugging (12–15 min)
Present the candidate with the following simplified snippet of Alice's initialization code:

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
*"There is a race condition in `createOfferString()` that will cause Bob to fail to connect when he pastes Alice's offer. What is the bug, and how would you fix it in vanilla JS?"*

Frontend follow-up (if time, 2 min): *"In arena-clone's UI, how would you show ICE gathering progress so Alice knows when the offer is ready to copy?"* – Accept: disable Copy button + spinner, show `pc.iceGatheringState`, listen for `icecandidate` null.

### Part 3: Real-World Edge Cases & Scaling (12–15 min)
1. **The NAT/Firewall Problem:** Copy-paste works at home, but fails when Bob is on an enterprise/corporate network. Why does STUN often fail there, and what infrastructure do we add to fix it?
   *Hint if stuck: "What if direct P2P is blocked?"*
2. **Transitioning to Production:** Users complain copy-pasting SDP is clunky. Sketch how you'd replace it with an automated, low-latency signaling service. What protocol would you use from the browser, and how would you degrade gracefully?

---

## 🔑 Interviewer Answer Key

### Part 1
1. **Role of STUN:** STUN (Session Traversal Utilities for NAT) lets Alice/Bob discover their public IP:port. Without it the SDP only has private LAN addresses like `192.168.1.5`, so peers can't reach each other across the internet.
2. **Handling ICE Candidates:** With no live signaling channel we can't trickle. We must wait for ICE gathering to complete, so all host/STUN candidates are bundled into the final SDP before Alice copies it.

### Part 2 – The Code Bug
* **Bug:** `pc.setLocalDescription(offer)` starts async ICE gathering. Returning `pc.localDescription` immediately gives an SDP with missing/only-host candidates – the STUN round-trip hasn't finished.
* **Fix:** Wait for gathering to complete: listen for `icecandidate` with `event.candidate === null`, or `pc.iceGatheringState === 'complete'`.

**Fixed:**
```javascript
async function createOfferString() {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Wait for ICE gathering to complete
    await new Promise((resolve) => {
        if (pc.iceGatheringState === 'complete') return resolve();
        const handler = (e) => {
            if (e.candidate === null) {
                pc.removeEventListener('icecandidate', handler);
                resolve();
            }
        };
        pc.addEventListener('icecandidate', handler);
    });
    
    return JSON.stringify(pc.localDescription);
}
```
UI wiring note: expose `pc.iceGatheringState` to the UI, disable the Copy button until `'complete'`, show "Gathering ICE…" text/spinner. Clean up the listener.

### Part 3
1. **Enterprise NAT / TURN:** Corporate symmetric/strict NATs and firewalls often block direct UDP P2P. STUN-discovered addresses won't work. Add a **TURN** server to `iceServers` to relay data through the cloud when direct P2P fails.
2. **Signaling Architecture:** Browser → WebSocket (Socket.io / native WS) for bidirectional offer/answer/ICE. Fallback: SSE + REST POST. At scale: stateless WS nodes + Redis Pub/Sub backplane so Alice/Bob can land on different instances. Degrade gracefully: reconnect with exponential backoff, persist pending SDP in localStorage, show "reconnecting" in the arena-clone chat UI.

---

## 📊 Frontend Mid-Level – 45-min Rubric

| Area | Strong Signal (Pass) | Weak Signal (No-Pass) |
|---|---|---|
| Part 1 – STUN/ICE | Explains public IP discovery, and that copy-paste requires waiting for gathered candidates | Thinks STUN *is* the signaling server; can't explain trickle vs. bundle |
| Part 2 – Bugfix | Spots the async ICE race unprompted, fixes with `icecandidate === null` / `iceGatheringState`, cleans up listener | Needs heavy hinting, returns SDP immediately, misses async nature |
| Part 3 – Real world | Names TURN for enterprise NAT relay; proposes WS signaling + a scaling/fallback idea | No TURN answer; no concrete signaling protocol |
| Frontend wiring | Can describe disabling Copy / showing gathering state in the UI | Can't map the WebRTC state to DOM |

**Scoring (quick sheet):**
- Part 1: /2
- Part 2: /3  (1 spot bug, 1 fix, 1 UI wiring)
- Part 3: /2
- Communication: /1
Total: ___ /8 → Hire (≥6), Lean Hire (5), No Hire (<5)

**Junior vs Senior expectations:**
- **Junior:** Gets STUN = public IP conceptually, finds the race with a hint about `icecandidate`, knows WebSockets replace copy-paste.
- **Mid (target):** Above Pass signals.
- **Senior stretch:** Discusses DataChannel backpressure, TURN auth/cost, WS backplane with Redis, connectionState vs iceConnectionState handling.
