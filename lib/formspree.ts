/**
 * Submit form data to Formspree for email notifications.
 * 
 * Formspree handles:
 * - Email notification to the EnviroPay team on every submission
 * - ML-powered spam filtering (Formshield)
 * - Auto-responder (if configured in Formspree dashboard)
 * - CSV/JSON export from Formspree inbox
 * 
 * The endpoint ID is read from NEXT_PUBLIC_FORMSPREE_ENDPOINT env var.
 * This is separate from Firestore — Formspree is for notifications, Firestore is the source of truth.
 */

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

interface FormspreeData {
    name: string;
    email: string;
    persona: string;
    type: string;
    message?: string;
    company?: string;
    role?: string;
    source: string;
    _subject: string;
}

/**
 * Submit to Formspree. Returns success boolean — does NOT throw.
 * Formspree is a notification layer, not the source of truth.
 * If it fails, the Firestore write is still the authoritative record.
 */
export async function submitToFormspree(data: FormspreeData): Promise<boolean> {
    if (!FORMSPREE_ENDPOINT) {
        console.warn("[Formspree] Endpoint not configured (NEXT_PUBLIC_FORMSPREE_ENDPOINT missing)");
        return false;
    }

    try {
        const formData = new FormData();
        formData.append("name", data.name || "");
        formData.append("email", data.email);
        formData.append("persona", data.persona);
        formData.append("type", data.type);
        formData.append("message", data.message || "");
        formData.append("company", data.company || "");
        formData.append("role", data.role || "");
        formData.append("source", data.source);
        formData.append("_subject", data._subject);

        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            console.error("[Formspree] Submission failed:", response.status);
            return false;
        }

        return true;
    } catch (error) {
        console.error("[Formspree] Network error:", error);
        return false;
    }
}
