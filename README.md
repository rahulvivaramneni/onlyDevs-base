🧠 OnlyDevs — Peer-to-Peer Live Debugging Platform

A platform that connects developers and mentors for real-time debugging, powered by PayPal PYUSD, ETH, and Base Account SDK for seamless on-chain payments.

🚀 The Problem

Developers often get stuck on bugs and need fast help — but current solutions are:

Expensive (consultants & paid calls)

Slow (forums, Stack Overflow)

Cumbersome (scheduling/time zones)

💡 Our Solution: OnlyDevs

OnlyDevs is a peer-to-peer live debugging marketplace where developers can:

Post coding challenges with bounty amounts in ETH, PYUSD, or USDC

Connect instantly with verified mentors for live debugging

Pay seamlessly when the problem is solved — no wallet popups

Collaborate in real time via chat or Huddle01 video calls

💰 Powered by PYUSD, ETH & Base SDK

PayPal PYUSD (ERC-20) allows fast and stable fiat-backed payments

ETH offers on-chain transparency for direct wallet-to-wallet bounties

Base Account SDK enables frictionless transactions — no repeated approvals

const callsId = await provider.request({
  method: "wallet_sendCalls",
  params: [{
    chainId: `0x${baseSepolia.id.toString(16)}`,
    from: subAccountAddress,
    calls: [{
      to: PYUSD_ADDRESS, // or ETH/USDC
      data: encodedTransferData,
    }],
  }],
});

🏗️ Tech Stack

Frontend: Next.js 14, TypeScript, Tailwind, Framer Motion

Payments: ETH, PYUSD, USDC via Base Account SDK

Blockchain: Base Sepolia (L2), Viem for encoding

Video Calls: Huddle01 SDK

Backend: Node.js, Prisma, PostgreSQL

🌟 Hackathon Highlights

Seamless ETH & PYUSD micro-payments

Zero-wallet-popup flow via Base Account SDK

Real-time video debugging with mentors

Hybrid fiat+crypto flexibility (PayPal PYUSD + ETH)

Designed for instant collaboration and trustless payments
