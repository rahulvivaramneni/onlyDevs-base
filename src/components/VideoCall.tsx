"use client";

import { useState, useEffect } from "react";
import { HuddleIframe, iframeApi, useEventListener } from "@huddle01/iframe";

interface VideoCallProps {
  roomUrl: string;
  onLeave: () => void;
}

export function VideoCall({ roomUrl, onLeave }: VideoCallProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Use the provided project ID and room ID
  const PROJECT_ID = process.env.NEXT_PUBLIC_HUDDLE01_PROJECT_ID || "pi_oH3VVFDoZ51x4X7d";
  const ROOM_ID = "bbo-uolo-yxb";
  const huddleRoomUrl = `https://iframe.huddle01.com/${ROOM_ID}/lobby`;

  // Listen for app initialization
  useEventListener("app:initialized", () => {
    console.log("Huddle01 app initialized");
    setIsInitialized(true);
    setIsLoading(false);

    // Initialize with custom configuration
    void iframeApi.initialize({
      logoUrl: "",
      background: "",
      redirectUrlOnLeave: "",
    });

    // Set custom theme
    iframeApi.setTheme({
      iconColor: "#94A3B8",
      textColor: "#f8fafc",
      borderColor: "#1C1E24",
      brandColor: "#246BFD",
      interfaceColor: "#181A20",
      onBrandColor: "#ffffff",
      backgroundColor: "#121214",
    });

    // Change avatar URL
    iframeApi.changeAvatarUrl("");

    // Update features
    iframeApi.updateFeatures({
      isChatEnabled: true,
      isReactionsEnabled: true,
      isVirtualBgEnabled: true,
      isCopyInviteLinkEnabled: true,
      isRecordingEnabled: true,
      isScreenShareEnabled: true,
      isRoomLocked: true,
    });
  });

  // Listen for room events
  useEventListener("room:joined", () => {
    console.log("User joined the room");
  });

  useEventListener("room:failed", (reason) => {
    console.error("Failed to join room:", reason);
    setError("Failed to join video call. Please try again.");
    setIsLoading(false);
  });

  useEventListener("room:me-left", () => {
    console.log("User left the room");
    onLeave();
  });

  useEventListener("room:new-peer", (data) => {
    console.log("New peer joined:", data);
  });

  useEventListener("room:peer-left", (peerId) => {
    console.log("Peer left:", peerId);
  });

  useEffect(() => {
    // Set a timeout to show error if initialization takes too long
    const timeout = setTimeout(() => {
      if (!isInitialized) {
        setError("Video call initialization timed out. Please try again.");
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [isInitialized]);

  const handleLeave = () => {
    // The iframe will handle the actual leaving
    onLeave();
  };

  if (error) {
    return (
      <div className="video-call-error">
        <h3>❌ {error}</h3>
        <p>
          Unable to start video call. Please check your internet connection and
          try again.
        </p>
        <button onClick={handleLeave} className="leave-button">
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="video-call-container">
      {isLoading && (
        <div className="video-call-loading">
          <div className="loading-spinner"></div>
          <p>Initializing video call...</p>
          <p className="loading-subtitle">Setting up Huddle01 room...</p>
        </div>
      )}

      <div className="huddle-iframe-wrapper">
        <HuddleIframe
          roomUrl={huddleRoomUrl}
          className="aspect-video w-full"
          projectId={PROJECT_ID}
        />

        {!isLoading && (
          <div className="video-call-overlay">
            <div className="call-info">
              <span className="room-id">Room: {ROOM_ID}</span>
              <span className="status-indicator">
                {isInitialized ? "🟢 Connected" : "🟡 Connecting..."}
              </span>
            </div>
            <button onClick={handleLeave} className="leave-button-overlay">
              Leave Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
