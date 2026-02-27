import { ImageResponse } from "next/og";

export const alt = "EnviroPay — Recycling that pays.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0B132B 0%, #1C2541 50%, #0B132B 100%)",
                    fontFamily: "system-ui, sans-serif",
                    position: "relative",
                }}
            >
                {/* Ambient glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600,
                        height: 600,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
                    }}
                />

                {/* Coin stack icon (simplified SVG-like representation) */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 32,
                    }}
                >
                    <svg
                        width="80"
                        height="84"
                        viewBox="0 0 121.495 127.205"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#38BDF8" />
                                <stop offset="25%" stopColor="#A8E10C" />
                                <stop offset="50%" stopColor="#22D3EE" />
                                <stop offset="75%" stopColor="#FACC15" />
                                <stop offset="100%" stopColor="#D4A855" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#g)" d="M121.495,98.125c0,3.175-2.469,5.809-5.638,5.999-26.786,1.61-54.942.984-80.689-3.928-9.694-1.85-35.168-7.701-35.168-20.201v-44.721c20.32,10.027,43.291,14.447,65.958,15.676,7.072.383,30.543.369,46.126.856,5.977.187,9.411,2.385,9.411,7.112v39.208ZM29.976,75.421v-13.313c0-3-2.626-4.649-5.432-5.432l-10.866-3.085c-3,0-5.432,2.432-5.432,5.432v12.368c0,3,2.387,4.499,5.432,5.432l10.866,4.03c3,0,5.432-2.432,5.432-5.432Z" />
                        <path fill="#22D3EE" d="M74.009,30.856c-.09,4.855-4.129,8.722-8.982,8.555-15.276-.524-31.645-2.699-45.774-7.064-2.377-.734-7.974-2.595-12.464-5.048-5.166-2.821-6.19-9.838-1.951-13.922,3.402-3.279,9.894-7.143,23.076-10.565C38.858-.028,56.209-.977,67.189,1.181c4.03.792,6.931,4.329,6.985,8.436.077,5.92-.044,14.715-.165,21.239Z" />
                        <path fill="#0B132B" stroke="#A8E10C" strokeWidth="2" d="M1.426,99.169c11.153,5.357,22.935,8.889,35.19,10.936,8.903,1.487,20.38,2.851,29.341,3.312,16.442.846,33.572.746,49.9-1.05,3.17-.348,5.731,2.507,5.042,5.621-.989,4.471-3.343,7.629-8.007,8.174-20.909,2.444-67.078.522-87.348-4.986-12.569-3.416-22.261-7.722-24.119-22.007Z" />
                    </svg>
                </div>

                {/* Brand name */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 0,
                        fontSize: 64,
                        fontWeight: 800,
                        letterSpacing: "-2px",
                    }}
                >
                    <span style={{ color: "#A8E10C" }}>enviro</span>
                    <span style={{ color: "#FFFFFF" }}>Pay</span>
                </div>

                {/* Tagline */}
                <div
                    style={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: 24,
                        marginTop: 16,
                        letterSpacing: "0.5px",
                    }}
                >
                    Recycling that pays.
                </div>

                {/* URL bar */}
                <div
                    style={{
                        color: "rgba(255,255,255,0.35)",
                        fontSize: 18,
                        marginTop: 32,
                        letterSpacing: "1px",
                    }}
                >
                    enviropay.uk
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
