# OnlyDevs - Peer-to-Peer Live Debugging Platform

 A platform that connects developers with mentors for real-time problem-solving, powered by Base Account SDK with seamless USDC payments.

## 🚀 **The Problem We're Solving**

Developers often get stuck on coding issues and need expert help, but traditional debugging support is either:

- **Expensive** (consulting fees)
- **Slow** (forums, Stack Overflow)
- **Inconvenient** (scheduling calls, time zones)

## 💡 **Our Solution: OnlyDevs**

OnlyDevs is a peer-to-peer live debugging platform where developers can:

1. **Post coding challenges** with custom bounty amounts
2. **Connect with expert mentors** for real-time debugging
3. **Pay only when problems are solved** using USDC on Base
4. **Debug live** via chat and video calls

## 🔥 ** Base Account SDK Integration**

### **Seamless Payments Without Wallet Popups**

**Base Account SDK** with **spend permissions** that eliminate the need for wallet popups during payments:

```typescript
// Traditional approach - requires wallet popup for every transaction
const tx = await wallet.sendTransaction({...}); // ❌ Popup required

// Our Base Account SDK approach - seamless UX
const callsId = await provider.request({
  method: "wallet_sendCalls",
  params: [{
    version: "2.0",
    atomicRequired: true,
    chainId: `0x${baseSepolia.id.toString(16)}`,
    from: subAccountAddress,
    calls: [{
      to: USDC_ADDRESS,
      data: encodedTransferData,
      value: "0x0",
    }],
    capabilities: {},
  }],
});
```

### **Automatic Sub-Account Creation**

Base Account SDK automatically creates sub-accounts for users:

```typescript
const sdk = createBaseAccountSDK({
  appName: "OnlyDevs",
  appLogoUrl: "https://base.org/logo.png",
  appChainIds: [baseSepolia.id],
  subAccounts: {
    creation: "on-connect", // Auto-create sub account
    defaultAccount: "sub", // Use sub account for transactions
  },
});
```

## 🛠️ **Technical Architecture**

### **Frontend Stack**

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Framer Motion** for animations

### **Blockchain Integration**

- **Base Account SDK** for wallet management
- **Viem** for transaction encoding
- **USDC on Base Sepolia** for payments
- **ERC-20 ABI** for token transfers

### **Real-time Features**

- **Huddle01** for video calls
- **Mock chat system** for real-time messaging
- **Local state management** with React Context

## 🎯 **Core Features**

### **1. Gig Posting System**

- Developers post coding challenges
- Set custom bounty amounts (minimum 0.0001 USDC)
- Add tags for categorization
- Real-time mentor matching

### **2. Mentor Marketplace**

- Expert developers browse available gigs
- Professional profiles with Base reputation scores
- Specialized skills and completed gig history
- One-click approval system

### **3. Live Debugging Sessions**

- Real-time chat interface
- Video call integration via Huddle01
- Screen sharing capabilities
- Session recording (optional)

### **4. Seamless Payment System**

- **No wallet popups** during payment
- Automatic USDC transfers on problem resolution
- Transaction confirmation with BaseScan links
- Payment success animations and notifications

## 🔧 **Base Account SDK Benefits**

### **For Users:**

- **One-time wallet connection** - no repeated popups
- **Automatic sub-account creation** - enhanced privacy
- **Seamless payments** - no transaction confirmations
- **Micro-payment support** - pay as little as 0.0001 USDC

### **For Developers:**

- **Simplified integration** - fewer user friction points
- **Better UX** - no wallet popup interruptions
- **Enhanced security** - sub-accounts isolate funds
- **Cost-effective** - lower gas fees on Base

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js 18+
- Base Account (create at [account.base.app](https://account.base.app))
- USDC on Base Sepolia testnet

### **Quick Setup**

1. **Clone and install**:

```bash
git clone https://github.com/YOUR_USERNAME/OnlyDev-base.git
cd OnlyDev-base
npm install
```

2. **Configure environment**:

```bash
cp .env.example .env.local
# Edit .env.local with your Base Account settings
```

3. **Run the application**:

```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)**

## 💰 **Payment Flow Demo**

1. **Post a Gig**: Set bounty amount (e.g., 5 USDC)
2. **Mentor Joins**: Expert offers help via chat
3. **Live Debugging**: Video call + screen sharing
4. **Problem Solved**: Click "Approve Mentor"
5. **Seamless Payment**: USDC transferred automatically
6. **Confirmation**: Transaction details + BaseScan link

## 🏆 **Hackathon Highlights**

### **Technical Innovation**

- **First-of-its-kind** debugging platform with Base Account SDK
- **Zero-popup payments** using spend permissions
- **Micro-payment support** for flexible pricing
- **Real-time collaboration** tools

### **User Experience**

- **One-click mentor approval** - no complex workflows
- **Instant payments** - no waiting for confirmations
- **Professional profiles** - Base reputation system
- **Mobile-responsive** design

### **Blockchain Integration**

- **Base Account SDK** for seamless wallet experience
- **USDC payments** on Base Sepolia
- **Sub-account isolation** for enhanced security
- **Transaction transparency** with BaseScan integration

## 🔮 **Future Roadmap**

- **Real-time chat** with WebSocket integration
- **AI-powered mentor matching** based on problem complexity
- **Reputation system** with on-chain credentials
- **Multi-token support** beyond USDC
- **Mobile app** with push notifications

## 🤝 **Contributing**

This is a hackathon project! Feel free to:

- Fork and experiment
- Submit issues and suggestions
- Contribute to the codebase
- Build upon our Base Account SDK integration

## 📄 **License**

MIT License - Built for the Base ecosystem hackathon

## 🔗 **Resources**

- [Base Account Documentation](https://docs.base.org/base-account)
- [Base Account SDK](https://github.com/base/account-sdk)
- [Huddle01 Video SDK](https://huddle01.com/docs)
- [Base Sepolia Faucet](https://bridge.base.org/deposit)

---
