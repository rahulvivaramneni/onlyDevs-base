# OnlyDevs - Peer-to-Peer Live Debugging Platform

A modern web application that connects developers who are stuck on coding issues with experienced mentors who can help them debug live via chat or video calls. Built with Next.js, TypeScript, and Base Account SDK for seamless USDC payments.

## 🚀 Features

### Core Functionality

- **Gig Posting**: Developers can post coding challenges with custom bounty amounts
- **Mentor Matching**: Experienced developers can browse and offer help on gigs
- **Live Communication**: Real-time chat and video call integration
- **Micro-Payments**: USDC payment system supporting amounts as low as 0.0001 USDC
- **Base Account Integration**: Seamless wallet connection with automatic sub-account creation

### Technical Features

- **Modern UI**: Clean, responsive design with dark/light theme support
- **Real-time Updates**: Live chat and video call capabilities
- **Payment Processing**: On-chain USDC transfers using Base Account SDK
- **Data Persistence**: Mock JSON server for gig and mentor data
- **Animation**: Smooth transitions with Framer Motion

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: TailwindCSS with custom CSS variables
- **Animations**: Framer Motion
- **Blockchain**: Base Account SDK, Viem
- **Payments**: USDC on Base Sepolia
- **Video Calls**: Huddle01 integration
- **State Management**: React Context API

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- A Base Account (create one at [account.base.app](https://account.base.app))
- USDC on Base Sepolia testnet

### Setup

1. **Clone the repository**:

```bash
git clone https://github.com/YOUR_USERNAME/OnlyDev-base.git
cd OnlyDev-base
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Base Account SDK Configuration
NEXT_PUBLIC_APP_NAME=OnlyDevs
NEXT_PUBLIC_APP_LOGO_URL=https://base.org/logo.png
NEXT_PUBLIC_CHAIN_ID=84532

# USDC Contract Address (Base Sepolia)
NEXT_PUBLIC_USDC_ADDRESS=0x036CbD53842c5426634e7929541eC2318f3dCF7e

# Recipient Wallet Address (for payments)
NEXT_PUBLIC_RECIPIENT_ADDRESS=0x90479a1128ab97888fDc2507a63C9cb50B3417fb

# Huddle01 Configuration (for video calls)
NEXT_PUBLIC_HUDDLE01_PROJECT_ID=pi_oH3VVFDoZ51x4X7d
NEXT_PUBLIC_HUDDLE01_ROOM_URL=https://huddle01.app/room/bbo-uolo-yxb
```

4. **Run the development server**:

```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🎯 How It Works

### User Flow

1. **Post a Gig**: Developers describe their coding challenge and set a bounty amount
2. **Browse Gigs**: Mentors can browse available gigs and offer help
3. **Chat & Debug**: Selected mentors and gig posters communicate via real-time chat
4. **Video Calls**: Optional video calls for live debugging sessions
5. **Payment**: Once resolved, the poster sends USDC payment to the mentor

### Base Account Integration

The app uses Base Account SDK with automatic sub-account creation:

```typescript
const sdk = createBaseAccountSDK({
  appName: "OnlyDevs",
  appLogoUrl: "https://base.org/logo.png",
  appChainIds: [baseSepolia.id],
  subAccounts: {
    creation: "on-connect", // Auto-create sub account on connect
    defaultAccount: "sub", // Use sub account for transactions
  },
});
```

### Payment System

- **Token**: USDC on Base Sepolia
- **Minimum Amount**: 0.0001 USDC
- **Recipient**: Hardcoded address for demo purposes
- **Transaction**: Uses `wallet_sendCalls` for seamless UX

## 📱 Pages & Features

### Home Page

- Hero section with call-to-action
- Feature highlights
- Navigation to key sections

### Post Gig Page

- Form to create new gigs
- Bounty amount input (minimum 0.0001 USDC)
- Tag system for categorization

### Browse Gigs Page

- Grid of available gigs
- Filter by status and tags
- Real-time updates

### Gig Detail Page

- Detailed gig information
- Mentor offers with ratings and Base reputation
- Approve mentor functionality

### Chat Page

- Real-time messaging
- Video call integration
- Payment processing

### Profile Page

- User statistics
- Wallet information
- USDC balance display

## 🔧 Configuration

### Environment Variables

| Variable                          | Description           | Default                                      |
| --------------------------------- | --------------------- | -------------------------------------------- |
| `NEXT_PUBLIC_USDC_ADDRESS`        | USDC contract address | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |
| `NEXT_PUBLIC_RECIPIENT_ADDRESS`   | Payment recipient     | `0x90479a1128ab97888fDc2507a63C9cb50B3417fb` |
| `NEXT_PUBLIC_HUDDLE01_PROJECT_ID` | Huddle01 project ID   | `pi_oH3VVFDoZ51x4X7d`                        |

### Customization

- **Recipient Address**: Update `RECIPIENT_ADDRESS` in `src/hooks/useWallet.ts`
- **USDC Contract**: Modify `USDC_ADDRESS` for different networks
- **Video Calls**: Configure Huddle01 settings in environment variables
- **Styling**: Customize themes in `app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🔗 Links

- [Base Account Documentation](https://docs.base.org/base-account)
- [Base Account SDK](https://github.com/base/account-sdk)
- [Huddle01 Documentation](https://huddle01.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## 🆘 Support

For support and questions:

- Create an issue in this repository
- Check the [Base Account docs](https://docs.base.org/base-account)
- Join the [Base Discord](https://discord.gg/buildonbase)

---

**Built with ❤️ using Base Account SDK**
