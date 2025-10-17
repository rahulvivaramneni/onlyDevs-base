"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "../components/Navigation";
import { ChatBox, Message } from "../components/ChatBox";
// VideoCall component removed - now opens in new tab
import { useWallet } from "../hooks/useWallet";

// Mock data
const mockMentor = {
  id: "1",
  name: "Sarah Chen",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  rating: 4.8,
  specialties: ["React", "JavaScript", "Performance"],
};

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Sarah Chen",
    content:
      "Hi! I can see you're having issues with useEffect causing infinite re-renders. This is a common problem!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    content:
      "Yes, exactly! I've been stuck on this for hours. The fetchData function keeps getting recreated.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    isOwn: true,
  },
  {
    id: "3",
    sender: "Sarah Chen",
    content:
      "That's the issue! The fetchData function is being recreated on every render. You need to either wrap it in useCallback or move it outside the useEffect.",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    isOwn: false,
  },
  {
    id: "4",
    sender: "You",
    content: "Ah, that makes sense! Should I use useCallback?",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    isOwn: true,
  },
  {
    id: "5",
    sender: "Sarah Chen",
    content:
      "Yes! Here's how you can fix it:\n\n```javascript\nconst fetchData = useCallback(async () => {\n  // your fetch logic here\n}, []); // empty dependency array\n\nuseEffect(() => {\n  fetchData();\n}, [fetchData]);\n```",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    isOwn: false,
  },
];

export default function Chat({
  params,
}: {
  params: { gigId: string; mentorId: string };
}) {
  const router = useRouter();
  const {
    connected,
    sendPayment,
    loading: walletLoading,
    connectWallet,
  } = useWallet();

  // State for gig data and mentor info
  const [gig, setGig] = useState<any>(null);
  const [mentor, setMentor] = useState<any>(null);
  const [isLoadingGig, setIsLoadingGig] = useState(true);

  // Empty chat history for new mentors
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Fetch gig data and mentor info
  useEffect(() => {
    const fetchGigData = async () => {
      try {
        setIsLoadingGig(true);
        const response = await fetch(`/api/gigs/${params.gigId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch gig');
        }
        
        const gigData = await response.json();
        setGig(gigData);
        
        // Find the specific mentor
        const foundMentor = gigData.mentors.find((m: any) => m.id === params.mentorId);
        if (foundMentor) {
          setMentor(foundMentor);
        } else {
          // Fallback to mock mentor if not found
          setMentor(mockMentor);
        }
      } catch (error) {
        console.error('Error fetching gig:', error);
        // Fallback to mock data
        setMentor(mockMentor);
        setGig({ bounty: "15" }); // Default bounty
      } finally {
        setIsLoadingGig(false);
      }
    };

    if (params.gigId && params.mentorId) {
      fetchGigData();
    } else {
      // Fallback to mock data
      setMentor(mockMentor);
      setGig({ bounty: "15" });
      setIsLoadingGig(false);
    }
  }, [params.gigId, params.mentorId]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      content,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate mentor response
    setTimeout(() => {
      const mentorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: mentor?.name || mockMentor.name,
        content: "That's a great question! Let me help you with that.",
        timestamp: new Date(),
        isOwn: false,
      };
      setMessages((prev) => [...prev, mentorResponse]);
    }, 2000);
  };

  const handleStartVideoCall = () => {
    // Open Huddle01 room in new tab
    const roomUrl = "https://huddle01.app/room/bbo-uolo-yxb";
    window.open(roomUrl, "_blank", "noopener,noreferrer");

    // Add system message
    const callInitiatedMessage: Message = {
      id: Date.now().toString(),
      sender: "System",
      content:
        "🎥 Video call opened in new tab! Join the room to start debugging.",
      timestamp: new Date(),
      isOwn: false,
    };

    setMessages((prev) => [...prev, callInitiatedMessage]);
  };

  // Video call leave handler removed - no longer needed

  const handleMarkSolved = async () => {
    // If not connected, try to connect first
    if (!connected) {
      try {
        await connectWallet();
        // Wait a moment for the connection to complete
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        alert("Failed to connect wallet. Please try again.");
        return;
      }
    }

    // Use the gig's bounty amount
    const bountyAmount = gig?.bounty || "15";
    const success = await sendPayment(bountyAmount);
    if (success) {
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        router.push("/profile");
      }, 3000);
    }
  };

  return (
    <div className="chat-page">
      {/* <iframe
        src="https://huddle01.app/room/bbo-uolo-yxb"
        width="100%"
        height="100%"
      ></iframe> */}
      {/* <p a-href="https://huddle01.app/room/bbo-uolo-yxb">MODAL</p> */}
      <Navigation />

      {/* VideoCall component removed - now opens in new tab */}

      <motion.div
        className="page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="chat-header-info">
          <h1>Chat Session</h1>
          <div className="mentor-info">
            <img
              src={mentor?.avatar || mockMentor.avatar}
              alt={mentor?.name || mockMentor.name}
              className="mentor-avatar"
            />
            <div>
              <h3>{mentor?.name || mockMentor.name}</h3>
              <div className="mentor-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < (mentor?.rating || mockMentor.rating)
                        ? "star filled"
                        : "star"
                    }
                  >
                    ★
                  </span>
                ))}
                <span className="rating-text">
                  ({mentor?.rating || mockMentor.rating}/5)
                </span>
              </div>
              {/* Video call indicator removed - now opens in new tab */}
            </div>
          </div>
        </div>

        <motion.div
          className="chat-container-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChatBox
            messages={messages}
            onSendMessage={handleSendMessage}
            onStartVideoCall={handleStartVideoCall}
            onMarkSolved={handleMarkSolved}
            mentorName={mentor?.name || mockMentor.name}
            isLoading={walletLoading}
            isWalletConnected={connected}
            bountyAmount={gig?.bounty || "15"}
          />
        </motion.div>
      </motion.div>

      {showSuccessToast && (
        <motion.div
          className="success-toast"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          ✅ Payment sent successfully! ${gig?.bounty || "15"} USDC transferred.
        </motion.div>
      )}
    </div>
  );
}
