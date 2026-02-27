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

export interface LeadData {
    type: "contact" | "waitlist";
    persona?: "consumer" | "retailer" | "partner";
    email: string;
    name?: string;
    message?: string;
    theme?: string; // which theme was active
    [key: string]: any;
}

export async function submitLead(data: LeadData) {
    try {
        // Basic Rate Limit Check (Mock - in real app would be server side or robust)
        const recent = sessionStorage.getItem("last_submission");
        if (recent && Date.now() - parseInt(recent) < 10000) {
            throw new Error("Please wait a moment before sending another message.");
        }

        // Honeypot check should happen before calling this function

        await addDoc(collection(db, "leads"), {
            ...data,
            timestamp: serverTimestamp(),
            userAgent: navigator.userAgent,
        });

        sessionStorage.setItem("last_submission", Date.now().toString());
        return { success: true };
    } catch (error) {
        console.error("Firebase write error:", error);
        // Return mock success if config is missing (for demo purposes if user hasn't set env)
        if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
            console.warn("Firebase config missing, simulating success");
            return { success: true, simulated: true };
        }
        throw error;
    }
}
