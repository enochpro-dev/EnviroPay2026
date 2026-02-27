import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only on client side or if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export type LeadType = "contact" | "waitlist";
export type LeadPersona = "consumer" | "retailer" | "partner";
export type LeadSource = "contact_form" | "hero_cta" | "get_involved" | "audience_section" | "feedback_card";

export interface LeadData {
    type: LeadType;
    persona: LeadPersona;
    email: string;
    name?: string;
    message?: string;
    company?: string;
    role?: string;
    source: LeadSource;
}

/**
 * Submit a lead to Firestore `leads` collection.
 * 
 * Rate-limits to 1 submission per 10 seconds (client-side via sessionStorage).
 * Firestore rules validate: email (string), type ('contact' | 'waitlist'), timestamp (present).
 */
export async function submitLead(data: LeadData): Promise<{ success: true }> {
    // Client-side rate limiting
    const recent = sessionStorage.getItem("ep_last_submission");
    if (recent && Date.now() - parseInt(recent) < 10000) {
        throw new Error("Please wait a moment before sending another message.");
    }

    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        throw new Error("Firebase configuration is missing. Contact support.");
    }

    await addDoc(collection(db, "leads"), {
        ...data,
        timestamp: serverTimestamp(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
    });

    sessionStorage.setItem("ep_last_submission", Date.now().toString());
    return { success: true };
}
