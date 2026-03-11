Here is the Markdown code for the `README.md` file, incorporating the stateless architecture, the chosen tech stack, and some technical best practices for your Progressive Web App (PWA) and authentication setup based on the sources. 

You can copy and paste this directly into your repository.

```markdown
# HereJustNow.com (SHBN) 📍⏱️

> *"We are building a stateless, privacy-first marketplace where the data is as ephemeral as the physical event. No databases to hack, no passwords to reset—just a 60-minute window of visibility for local creators. You should have been there."*

Welcome to **HereJustNow.com**, a "Ghost Marketplace" built for the "right now" economy. This platform is designed for pop-up vendors, food trucks, and street sellers who are physically present but digitally invisible, providing them with a hyper-local, ephemeral digital storefront.

---

## 🏗️ Core Architecture: The "Stateless" Model

Unlike traditional e-commerce platforms, HereJustNow operates on a strict privacy-first, decentralized model:

### 1. No Central Database (Local Storage)
All user profiles, store data, and inventory live **only** on the user's phone. We use **Dexie.js** as a wrapper for the browser's native **IndexedDB** to handle local data persistence without compromising user privacy.

### 2. The "One-Hour Anchor" (Location Logic)
To prevent battery drain and avoid constant GPS tracking:
* **The Action:** Sellers click "Go Live", and the app requests their location exactly **once**.
* **The Stamp:** That location is pinned to a temporary relay server.
* **The Timer:** The store remains visible for exactly **60 minutes**. After 1 hour, the signal automatically vanishes.

### 3. Stateless Relay Server
The backend acts strictly as a "Stateless Relay" utilizing **Redis** or **WebSockets** (e.g., Socket.io or Ably). It only holds "active heartbeats" in RAM to broadcast live locations to buyers and **never writes user data to a hard drive**.

### 4. Passwordless Authentication
Authentication is frictionless and passwordless. We leverage the phone's native biometrics (FaceID/TouchID) via WebAuthn/Passkeys. **Clerk** is our recommended auth provider due to its native middleware integration with Next.js, allowing us to drop in pre-built React components and seamlessly manage passwordless flows. 

---

## 📱 Progressive Web App (PWA) Readiness

Because our target users (food trucks, street vendors) operate heavily on mobile, this application is configured as a **Progressive Web App (PWA)**. 

**Important PWA Considerations:**
* **Caching & Offline Resilience:** We use Workbox to manage our Service Worker. For basic asset caching, we use `generateSW`. If we need custom background sync or push notifications later, we will migrate to `injectManifest`.
* **iOS / Safari Limitations:** Apple currently limits PWA functionality. Safari on iOS does *not* support the `beforeinstallprompt` event or automatic install prompts. To handle this, we must build a custom UI banner instructing iOS users to manually tap "Share" and select "Add to Home Screen" to install the app and enable standalone mode.

---

## 🛠️ The Tech Stack (0 - 100 Users)

* **Frontend:** Next.js (App Router) or Vite
* **Local Storage:** Dexie.js (IndexedDB)
* **Real-time Relay:** Socket.io or Ably
* **Authentication:** Clerk (for Passkeys/Biometrics)
* **Hosting & CI/CD:** Vercel (seamless Next.js support and automated deployments)
* **Domain:** `HereJustNow.com`

---

## 🗺️ Immediate Roadmap (MVP)

If you are just joining the project, here are our immediate priorities:

1. **MVP Setup (Seller Dashboard):** Create the local-only UI where a user can enter a store name and inventory items without needing an account.
2. **The "Live" Handshake:** Implement the one-time Geolocation grab and build the 60-minute countdown logic using our stateless WebSocket/Redis relay.
3. **The Nearby Feed:** Build the public-facing buyer feed that maps these temporary "pings" based on proximity in the Dallas area.

---

## 💻 Local Development Setup

To get this project running on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/herejustnow.git
   cd herejustnow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Set up environment variables:**
   Copy the example environment file and add your local keys (e.g., your Clerk API keys for auth and your WebSocket/Redis relay keys).
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
*Built for the right now. ⏱️*
```

Let me know if you need any adjustments to this README or if you'd like to dive into coding the specific components, like the Dexie.js local storage setup or the PWA manifest!
