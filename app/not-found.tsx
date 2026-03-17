import Link from "next/link";

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-outfit), var(--font-inter), sans-serif",
                background: "#F0F4F8",
                color: "#163841",
                textAlign: "center",
                padding: "2rem",
            }}
        >
            <h1
                style={{
                    fontSize: "6rem",
                    fontWeight: 800,
                    lineHeight: 1,
                    margin: 0,
                    background: "linear-gradient(135deg, #00B01A, #00C9A7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                404
            </h1>
            <p
                style={{
                    fontSize: "1.25rem",
                    marginTop: "1rem",
                    opacity: 0.7,
                    maxWidth: "28rem",
                }}
            >
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
                href="/"
                style={{
                    marginTop: "2rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 2rem",
                    borderRadius: "999px",
                    background: "#163841",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                }}
            >
                ← Back to EnviroPay
            </Link>
        </div>
    );
}
