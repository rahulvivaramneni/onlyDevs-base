"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Gig {
  id: string;
  title: string;
  description: string;
  tags: string[];
  bounty: string;
  status: "open" | "in-progress" | "completed";
  author: string;
  createdAt: Date;
  mentors: Mentor[];
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  message: string;
  specialties: string[];
}

interface GigContextType {
  gigs: Gig[];
  isLoading: boolean;
  addGig: (gig: Omit<Gig, "id" | "createdAt" | "mentors">) => Promise<string>;
  updateGig: (id: string, updates: Partial<Gig>) => Promise<void>;
  addMentorToGig: (gigId: string, mentor: Mentor) => Promise<void>;
  getGigById: (id: string) => Gig | undefined;
  refreshGigs: () => Promise<void>;
}

const GigContext = createContext<GigContextType | undefined>(undefined);

export function GigProvider({ children }: { children: ReactNode }) {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load gigs from API
  const loadGigs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/gigs");
      if (!response.ok) {
        throw new Error("Failed to fetch gigs");
      }
      const data = await response.json();

      // Convert createdAt strings back to Date objects
      const gigsWithDates = data.gigs.map((gig: any) => ({
        ...gig,
        createdAt: new Date(gig.createdAt),
      }));

      setGigs(gigsWithDates);
    } catch (error) {
      console.error("Error loading gigs:", error);
      // Fallback to empty array
      setGigs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load gigs on mount
  useEffect(() => {
    loadGigs();
  }, []);

  const addGig = async (
    gigData: Omit<Gig, "id" | "createdAt" | "mentors">
  ): Promise<string> => {
    try {
      const response = await fetch("/api/gigs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gigData),
      });

      if (!response.ok) {
        throw new Error("Failed to create gig");
      }

      const newGig = await response.json();

      // Add to local state
      setGigs((prev) => [newGig, ...prev]);

      return newGig.id;
    } catch (error) {
      console.error("Error creating gig:", error);
      throw error;
    }
  };

  const updateGig = async (
    id: string,
    updates: Partial<Gig>
  ): Promise<void> => {
    try {
      const response = await fetch("/api/gigs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, updates }),
      });

      if (!response.ok) {
        throw new Error("Failed to update gig");
      }

      const updatedGig = await response.json();

      // Update local state
      setGigs((prev) =>
        prev.map((gig) => (gig.id === id ? { ...gig, ...updates } : gig))
      );
    } catch (error) {
      console.error("Error updating gig:", error);
      throw error;
    }
  };

  const addMentorToGig = async (
    gigId: string,
    mentor: Mentor
  ): Promise<void> => {
    try {
      const gig = gigs.find((g) => g.id === gigId);
      if (!gig) {
        throw new Error("Gig not found");
      }

      const updatedMentors = [...gig.mentors, mentor];

      await updateGig(gigId, { mentors: updatedMentors });
    } catch (error) {
      console.error("Error adding mentor to gig:", error);
      throw error;
    }
  };

  const getGigById = (id: string): Gig | undefined => {
    return gigs.find((gig) => gig.id === id);
  };

  const refreshGigs = async (): Promise<void> => {
    await loadGigs();
  };

  return (
    <GigContext.Provider
      value={{
        gigs,
        isLoading,
        addGig,
        updateGig,
        addMentorToGig,
        getGigById,
        refreshGigs,
      }}
    >
      {children}
    </GigContext.Provider>
  );
}

export function useGigs() {
  const context = useContext(GigContext);
  if (context === undefined) {
    throw new Error("useGigs must be used within a GigProvider");
  }
  return context;
}
