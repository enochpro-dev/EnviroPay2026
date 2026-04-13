"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import MapGL, { Marker, NavigationControl, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

/* ═══════════════════════════════════════════════════════════
   ENVIROPOINT LOCATIONS — 150 Planned Return Points
   100 RVMs (Pitch Deck P9) + 30 Retailers + 20 Collection Hubs
   Dense cluster around HQ: 7-75 Shelton St, Covent Garden.
   UK-wide coverage for DRS launch October 2027.
   ═══════════════════════════════════════════════════════════ */
const ENVIRO_POINTS: { id: string; name: string; type: string; lat: number; lng: number; bottle?: "can" | "glass" | "pet" }[] = [
    // ══════════════════════════════════════════════════════════
    // RVM — REVERSE VENDING MACHINES (100 units — Pitch Deck P9)
    // ══════════════════════════════════════════════════════════

    // ── London: Covent Garden HQ cluster ─────────────────────
    { id: "rvm-1", name: "EnviroPoint · Leicester Square", type: "RVM", lat: 51.5103, lng: -0.1301 },
    { id: "rvm-2", name: "EnviroPoint · Charing Cross", type: "RVM", lat: 51.5074, lng: -0.1278 },
    { id: "rvm-3", name: "EnviroPoint · Holborn Station", type: "RVM", lat: 51.5174, lng: -0.1201 },
    { id: "rvm-4", name: "EnviroPoint · Covent Garden Station", type: "RVM", lat: 51.5129, lng: -0.1243 },
    { id: "rvm-5", name: "EnviroPoint · Temple Station", type: "RVM", lat: 51.5111, lng: -0.1141 },
    // ── London: Central ring ────────────────────────────────
    { id: "rvm-6", name: "EnviroPoint · Oxford Circus", type: "RVM", lat: 51.5152, lng: -0.1415 },
    { id: "rvm-7", name: "EnviroPoint · Tottenham Court Rd", type: "RVM", lat: 51.5165, lng: -0.1310 },
    { id: "rvm-8", name: "EnviroPoint · Piccadilly Circus", type: "RVM", lat: 51.5100, lng: -0.1347 },
    { id: "rvm-9", name: "EnviroPoint · King's Cross", type: "RVM", lat: 51.5320, lng: -0.1240 },
    { id: "rvm-10", name: "EnviroPoint · Euston Station", type: "RVM", lat: 51.5282, lng: -0.1337 },
    { id: "rvm-11", name: "EnviroPoint · Victoria Station", type: "RVM", lat: 51.4952, lng: -0.1439 },
    { id: "rvm-12", name: "EnviroPoint · Paddington Station", type: "RVM", lat: 51.5154, lng: -0.1755 },
    { id: "rvm-13", name: "EnviroPoint · Liverpool Street", type: "RVM", lat: 51.5178, lng: -0.0823 },
    { id: "rvm-14", name: "EnviroPoint · Bank Station", type: "RVM", lat: 51.5133, lng: -0.0886 },
    { id: "rvm-15", name: "EnviroPoint · Waterloo Station", type: "RVM", lat: 51.5031, lng: -0.1132 },
    { id: "rvm-16", name: "EnviroPoint · London Bridge", type: "RVM", lat: 51.5052, lng: -0.0864 },
    { id: "rvm-17", name: "EnviroPoint · Moorgate", type: "RVM", lat: 51.5186, lng: -0.0886 },
    { id: "rvm-18", name: "EnviroPoint · Angel", type: "RVM", lat: 51.5322, lng: -0.1058 },
    // ── London: Greater ─────────────────────────────────────
    { id: "rvm-19", name: "EnviroPoint · Canary Wharf", type: "RVM", lat: 51.5054, lng: -0.0235 },
    { id: "rvm-20", name: "EnviroPoint · Stratford Westfield", type: "RVM", lat: 51.5432, lng: -0.0069 },
    { id: "rvm-21", name: "EnviroPoint · Hammersmith", type: "RVM", lat: 51.4927, lng: -0.2248 },
    { id: "rvm-22", name: "EnviroPoint · Croydon", type: "RVM", lat: 51.3762, lng: -0.0982 },
    { id: "rvm-23", name: "EnviroPoint · Ealing Broadway", type: "RVM", lat: 51.5145, lng: -0.3015 },
    { id: "rvm-24", name: "EnviroPoint · Wembley Central", type: "RVM", lat: 51.5560, lng: -0.2795 },
    { id: "rvm-25", name: "EnviroPoint · Brixton", type: "RVM", lat: 51.4613, lng: -0.1156 },
    { id: "rvm-26", name: "EnviroPoint · Camden Town", type: "RVM", lat: 51.5391, lng: -0.1426 },
    { id: "rvm-27", name: "EnviroPoint · Finsbury Park", type: "RVM", lat: 51.5642, lng: -0.1065 },
    { id: "rvm-28", name: "EnviroPoint · Clapham Junction", type: "RVM", lat: 51.4641, lng: -0.1704 },
    { id: "rvm-29", name: "EnviroPoint · Lewisham", type: "RVM", lat: 51.4613, lng: -0.0134 },
    { id: "rvm-30", name: "EnviroPoint · Wimbledon", type: "RVM", lat: 51.4214, lng: -0.2064 },
    { id: "rvm-31", name: "EnviroPoint · Greenwich", type: "RVM", lat: 51.4769, lng: -0.0005 },
    { id: "rvm-32", name: "EnviroPoint · Shepherd's Bush", type: "RVM", lat: 51.5044, lng: -0.2183 },
    { id: "rvm-33", name: "EnviroPoint · Richmond", type: "RVM", lat: 51.4613, lng: -0.3037 },
    { id: "rvm-34", name: "EnviroPoint · Kingston", type: "RVM", lat: 51.4123, lng: -0.3007 },
    { id: "rvm-35", name: "EnviroPoint · Ilford", type: "RVM", lat: 51.5590, lng: 0.0739 },
    // ── Manchester ───────────────────────────────────────────
    { id: "rvm-36", name: "EnviroPoint · Manchester Piccadilly", type: "RVM", lat: 53.4774, lng: -2.2309 },
    { id: "rvm-37", name: "EnviroPoint · Manchester Victoria", type: "RVM", lat: 53.4877, lng: -2.2420 },
    { id: "rvm-38", name: "EnviroPoint · Arndale Centre", type: "RVM", lat: 53.4838, lng: -2.2418 },
    { id: "rvm-39", name: "EnviroPoint · Trafford Centre", type: "RVM", lat: 53.4670, lng: -2.3479 },
    { id: "rvm-40", name: "EnviroPoint · Media City", type: "RVM", lat: 53.4727, lng: -2.2963 },
    { id: "rvm-41", name: "EnviroPoint · Stockport", type: "RVM", lat: 53.4061, lng: -2.1589 },
    { id: "rvm-42", name: "EnviroPoint · Bolton", type: "RVM", lat: 53.5785, lng: -2.4280 },
    // ── Birmingham ───────────────────────────────────────────
    { id: "rvm-43", name: "EnviroPoint · Birmingham New St", type: "RVM", lat: 52.4778, lng: -1.8983 },
    { id: "rvm-44", name: "EnviroPoint · Grand Central", type: "RVM", lat: 52.4786, lng: -1.8985 },
    { id: "rvm-45", name: "EnviroPoint · Moor Street", type: "RVM", lat: 52.4790, lng: -1.8920 },
    { id: "rvm-46", name: "EnviroPoint · Five Ways", type: "RVM", lat: 52.4736, lng: -1.9135 },
    { id: "rvm-47", name: "EnviroPoint · Solihull", type: "RVM", lat: 52.4130, lng: -1.7783 },
    // ── Leeds ────────────────────────────────────────────────
    { id: "rvm-48", name: "EnviroPoint · Leeds Station", type: "RVM", lat: 53.7954, lng: -1.5483 },
    { id: "rvm-49", name: "EnviroPoint · Trinity Leeds", type: "RVM", lat: 53.7977, lng: -1.5449 },
    { id: "rvm-50", name: "EnviroPoint · White Rose", type: "RVM", lat: 53.7559, lng: -1.5675 },
    { id: "rvm-51", name: "EnviroPoint · Headingley", type: "RVM", lat: 53.8192, lng: -1.5800 },
    // ── Edinburgh ─────────────────────────────────────────────
    { id: "rvm-52", name: "EnviroPoint · Edinburgh Waverley", type: "RVM", lat: 55.9521, lng: -3.1883 },
    { id: "rvm-53", name: "EnviroPoint · Haymarket", type: "RVM", lat: 55.9469, lng: -3.2175 },
    { id: "rvm-54", name: "EnviroPoint · Ocean Terminal", type: "RVM", lat: 55.9804, lng: -3.1749 },
    { id: "rvm-55", name: "EnviroPoint · Fort Kinnaird", type: "RVM", lat: 55.9320, lng: -3.1090 },
    // ── Glasgow ───────────────────────────────────────────────
    { id: "rvm-56", name: "EnviroPoint · Glasgow Central", type: "RVM", lat: 55.8587, lng: -4.2581 },
    { id: "rvm-57", name: "EnviroPoint · Queen Street", type: "RVM", lat: 55.8623, lng: -4.2505 },
    { id: "rvm-58", name: "EnviroPoint · Buchanan Galleries", type: "RVM", lat: 55.8637, lng: -4.2507 },
    { id: "rvm-59", name: "EnviroPoint · Braehead", type: "RVM", lat: 55.8618, lng: -4.3512 },
    // ── Liverpool ─────────────────────────────────────────────
    { id: "rvm-60", name: "EnviroPoint · Liverpool Lime St", type: "RVM", lat: 53.4076, lng: -2.9779 },
    { id: "rvm-61", name: "EnviroPoint · Liverpool ONE", type: "RVM", lat: 53.4008, lng: -2.9916 },
    { id: "rvm-62", name: "EnviroPoint · Albert Dock", type: "RVM", lat: 53.3989, lng: -2.9924 },
    // ── Bristol ───────────────────────────────────────────────
    { id: "rvm-63", name: "EnviroPoint · Bristol Temple Meads", type: "RVM", lat: 51.4494, lng: -2.5813 },
    { id: "rvm-64", name: "EnviroPoint · Cabot Circus", type: "RVM", lat: 51.4576, lng: -2.5860 },
    { id: "rvm-65", name: "EnviroPoint · Cribbs Causeway", type: "RVM", lat: 51.5268, lng: -2.5934 },
    // ── Newcastle ─────────────────────────────────────────────
    { id: "rvm-66", name: "EnviroPoint · Newcastle Central", type: "RVM", lat: 54.9683, lng: -1.6178 },
    { id: "rvm-67", name: "EnviroPoint · MetroCentre", type: "RVM", lat: 54.9574, lng: -1.6670 },
    { id: "rvm-68", name: "EnviroPoint · Eldon Square", type: "RVM", lat: 54.9747, lng: -1.6157 },
    // ── Cardiff ───────────────────────────────────────────────
    { id: "rvm-69", name: "EnviroPoint · Cardiff Central", type: "RVM", lat: 51.4755, lng: -3.1791 },
    { id: "rvm-70", name: "EnviroPoint · St David's Centre", type: "RVM", lat: 51.4798, lng: -3.1747 },
    { id: "rvm-71", name: "EnviroPoint · Cardiff Bay", type: "RVM", lat: 51.4637, lng: -3.1632 },
    // ── Sheffield ─────────────────────────────────────────────
    { id: "rvm-72", name: "EnviroPoint · Sheffield Station", type: "RVM", lat: 53.3781, lng: -1.4621 },
    { id: "rvm-73", name: "EnviroPoint · Meadowhall", type: "RVM", lat: 53.4139, lng: -1.4112 },
    { id: "rvm-74", name: "EnviroPoint · Fargate", type: "RVM", lat: 53.3818, lng: -1.4710 },
    // ── Nottingham ────────────────────────────────────────────
    { id: "rvm-75", name: "EnviroPoint · Nottingham Station", type: "RVM", lat: 52.9471, lng: -1.1459 },
    { id: "rvm-76", name: "EnviroPoint · Victoria Centre", type: "RVM", lat: 52.9548, lng: -1.1493 },
    // ── Belfast ───────────────────────────────────────────────
    { id: "rvm-77", name: "EnviroPoint · Belfast Central", type: "RVM", lat: 54.5955, lng: -5.9221 },
    { id: "rvm-78", name: "EnviroPoint · Victoria Square", type: "RVM", lat: 54.5975, lng: -5.9264 },
    // ── Other major stations & centres ────────────────────────
    { id: "rvm-79", name: "EnviroPoint · Coventry Station", type: "RVM", lat: 52.4068, lng: -1.5197 },
    { id: "rvm-80", name: "EnviroPoint · Southampton Central", type: "RVM", lat: 50.9078, lng: -1.4134 },
    { id: "rvm-81", name: "EnviroPoint · Exeter St Davids", type: "RVM", lat: 50.7293, lng: -3.5447 },
    { id: "rvm-82", name: "EnviroPoint · Bath Spa", type: "RVM", lat: 51.3776, lng: -2.3567 },
    { id: "rvm-83", name: "EnviroPoint · York Station", type: "RVM", lat: 53.9583, lng: -1.0928 },
    { id: "rvm-84", name: "EnviroPoint · Reading Station", type: "RVM", lat: 51.4590, lng: -0.9718 },
    { id: "rvm-85", name: "EnviroPoint · Brighton Station", type: "RVM", lat: 50.8297, lng: -0.1372 },
    { id: "rvm-86", name: "EnviroPoint · Cambridge Station", type: "RVM", lat: 52.1951, lng: 0.1313 },
    { id: "rvm-87", name: "EnviroPoint · Oxford Station", type: "RVM", lat: 51.7520, lng: -1.2577 },
    { id: "rvm-88", name: "EnviroPoint · Aberdeen Station", type: "RVM", lat: 57.1497, lng: -2.0943 },
    { id: "rvm-89", name: "EnviroPoint · Dundee Station", type: "RVM", lat: 56.4620, lng: -2.9707 },
    { id: "rvm-90", name: "EnviroPoint · Inverness Station", type: "RVM", lat: 57.4778, lng: -4.2247 },
    { id: "rvm-91", name: "EnviroPoint · Swansea Station", type: "RVM", lat: 51.6214, lng: -3.9436 },
    { id: "rvm-92", name: "EnviroPoint · Plymouth", type: "RVM", lat: 50.3755, lng: -4.1427 },
    { id: "rvm-93", name: "EnviroPoint · Norwich", type: "RVM", lat: 52.6309, lng: 1.2974 },
    { id: "rvm-94", name: "EnviroPoint · Peterborough", type: "RVM", lat: 52.5749, lng: -0.2484 },
    { id: "rvm-95", name: "EnviroPoint · Swindon", type: "RVM", lat: 51.5657, lng: -1.7857 },
    { id: "rvm-96", name: "EnviroPoint · Derby Station", type: "RVM", lat: 52.9163, lng: -1.4629 },
    { id: "rvm-97", name: "EnviroPoint · Leicester Station", type: "RVM", lat: 52.6317, lng: -1.1253 },
    { id: "rvm-98", name: "EnviroPoint · Stoke-on-Trent", type: "RVM", lat: 53.0075, lng: -2.1496 },
    { id: "rvm-99", name: "EnviroPoint · Hull", type: "RVM", lat: 53.7443, lng: -0.3455 },
    { id: "rvm-100", name: "EnviroPoint · Bournemouth", type: "RVM", lat: 50.7200, lng: -1.8800 },

    // ══════════════════════════════════════════════════════════
    // RETAILER — PARTICIPATING RETAILERS (30 shops)
    // ══════════════════════════════════════════════════════════
    { id: "ret-1", name: "EnviroPoint · Covent Garden Piazza", type: "Retailer", lat: 51.5117, lng: -0.1240 },
    { id: "ret-2", name: "EnviroPoint · Long Acre", type: "Retailer", lat: 51.5133, lng: -0.1255 },
    { id: "ret-3", name: "EnviroPoint · Drury Lane", type: "Retailer", lat: 51.5145, lng: -0.1210 },
    { id: "ret-4", name: "EnviroPoint · Strand", type: "Retailer", lat: 51.5107, lng: -0.1186 },
    { id: "ret-5", name: "EnviroPoint · Bloomsbury", type: "Retailer", lat: 51.5224, lng: -0.1277 },
    { id: "ret-6", name: "EnviroPoint · Marylebone High St", type: "Retailer", lat: 51.5225, lng: -0.1631 },
    { id: "ret-7", name: "EnviroPoint · Islington", type: "Retailer", lat: 51.5362, lng: -0.1033 },
    { id: "ret-8", name: "EnviroPoint · Peckham", type: "Retailer", lat: 51.4741, lng: -0.0693 },
    { id: "ret-9", name: "EnviroPoint · Shoreditch High St", type: "Retailer", lat: 51.5235, lng: -0.0735 },
    { id: "ret-10", name: "EnviroPoint · Hackney", type: "Retailer", lat: 51.5465, lng: -0.0557 },
    { id: "ret-11", name: "EnviroPoint · Deansgate", type: "Retailer", lat: 53.4767, lng: -2.2504 },
    { id: "ret-12", name: "EnviroPoint · Northern Quarter", type: "Retailer", lat: 53.4840, lng: -2.2354 },
    { id: "ret-13", name: "EnviroPoint · Bullring", type: "Retailer", lat: 52.4774, lng: -1.8930 },
    { id: "ret-14", name: "EnviroPoint · Leeds City Centre", type: "Retailer", lat: 53.7997, lng: -1.5492 },
    { id: "ret-15", name: "EnviroPoint · Princes Street", type: "Retailer", lat: 55.9533, lng: -3.1920 },
    { id: "ret-16", name: "EnviroPoint · Leith Walk", type: "Retailer", lat: 55.9604, lng: -3.1749 },
    { id: "ret-17", name: "EnviroPoint · Merchant City", type: "Retailer", lat: 55.8585, lng: -4.2421 },
    { id: "ret-18", name: "EnviroPoint · Bold Street", type: "Retailer", lat: 53.4040, lng: -2.9796 },
    { id: "ret-19", name: "EnviroPoint · Harbourside", type: "Retailer", lat: 51.4504, lng: -2.5996 },
    { id: "ret-20", name: "EnviroPoint · Quayside", type: "Retailer", lat: 54.9694, lng: -1.6044 },
    { id: "ret-21", name: "EnviroPoint · Belfast City Centre", type: "Retailer", lat: 54.5973, lng: -5.9301 },
    { id: "ret-22", name: "EnviroPoint · Westgate Oxford", type: "Retailer", lat: 51.7500, lng: -1.2600 },
    { id: "ret-23", name: "EnviroPoint · Grand Arcade Cambridge", type: "Retailer", lat: 52.2033, lng: 0.1180 },
    { id: "ret-24", name: "EnviroPoint · Churchill Square Brighton", type: "Retailer", lat: 50.8219, lng: -0.1439 },
    { id: "ret-25", name: "EnviroPoint · Chapelfield Norwich", type: "Retailer", lat: 52.6254, lng: 1.2886 },
    { id: "ret-26", name: "EnviroPoint · Drake Circus Plymouth", type: "Retailer", lat: 50.3748, lng: -4.1376 },
    { id: "ret-27", name: "EnviroPoint · SouthGate Bath", type: "Retailer", lat: 51.3788, lng: -2.3592 },
    { id: "ret-28", name: "EnviroPoint · Coppergate York", type: "Retailer", lat: 53.9570, lng: -1.0790 },
    { id: "ret-29", name: "EnviroPoint · The Oracle Reading", type: "Retailer", lat: 51.4540, lng: -0.9710 },
    { id: "ret-30", name: "EnviroPoint · West Quay Southampton", type: "Retailer", lat: 50.9025, lng: -1.4068 },

    // ══════════════════════════════════════════════════════════
    // COLLECTION HUB — BOTTLE COLLECTION POINTS (20 hubs)
    // ══════════════════════════════════════════════════════════
    { id: "col-1", name: "EnviroPoint · Shelton Street HQ", type: "Collection Hub", lat: 51.5155, lng: -0.1235, bottle: "pet" },
    { id: "col-2", name: "EnviroPoint · Seven Dials", type: "Collection Hub", lat: 51.5140, lng: -0.1274, bottle: "glass" },
    { id: "col-3", name: "EnviroPoint · Neal's Yard", type: "Collection Hub", lat: 51.5146, lng: -0.1264, bottle: "can" },
    { id: "col-4", name: "EnviroPoint · Soho Square", type: "Collection Hub", lat: 51.5137, lng: -0.1337, bottle: "pet" },
    { id: "col-5", name: "EnviroPoint · Southwark", type: "Collection Hub", lat: 51.5035, lng: -0.1054, bottle: "glass" },
    { id: "col-6", name: "EnviroPoint · Battersea Park", type: "Collection Hub", lat: 51.4790, lng: -0.1565, bottle: "can" },
    { id: "col-7", name: "EnviroPoint · Hyde Park", type: "Collection Hub", lat: 51.5073, lng: -0.1657, bottle: "pet" },
    { id: "col-8", name: "EnviroPoint · Regent's Park", type: "Collection Hub", lat: 51.5313, lng: -0.1570, bottle: "glass" },
    { id: "col-9", name: "EnviroPoint · Victoria Park", type: "Collection Hub", lat: 51.5362, lng: -0.0380, bottle: "can" },
    { id: "col-10", name: "EnviroPoint · Salford Quays", type: "Collection Hub", lat: 53.4750, lng: -2.2890, bottle: "pet" },
    { id: "col-11", name: "EnviroPoint · Brindleyplace", type: "Collection Hub", lat: 52.4797, lng: -1.9130, bottle: "glass" },
    { id: "col-12", name: "EnviroPoint · Digbeth", type: "Collection Hub", lat: 52.4743, lng: -1.8823, bottle: "can" },
    { id: "col-13", name: "EnviroPoint · Grassmarket", type: "Collection Hub", lat: 55.9478, lng: -3.1962, bottle: "pet" },
    { id: "col-14", name: "EnviroPoint · Kelvingrove", type: "Collection Hub", lat: 55.8680, lng: -4.2880, bottle: "glass" },
    { id: "col-15", name: "EnviroPoint · Sefton Park", type: "Collection Hub", lat: 53.3780, lng: -2.9430, bottle: "can" },
    { id: "col-16", name: "EnviroPoint · Roath Park Cardiff", type: "Collection Hub", lat: 51.4920, lng: -3.1670, bottle: "glass" },
    { id: "col-17", name: "EnviroPoint · Jesmond Dene", type: "Collection Hub", lat: 54.9820, lng: -1.5990, bottle: "pet" },
    { id: "col-18", name: "EnviroPoint · Roundhay Park Leeds", type: "Collection Hub", lat: 53.8350, lng: -1.5010, bottle: "glass" },
    { id: "col-19", name: "EnviroPoint · Endcliffe Park Sheffield", type: "Collection Hub", lat: 53.3710, lng: -1.5050, bottle: "pet" },
    { id: "col-20", name: "EnviroPoint · Wollaton Park", type: "Collection Hub", lat: 52.9460, lng: -1.2090, bottle: "can" },
];

/* Marker type → icon color mapping (Pitch Deck aligned) */
const TYPE_COLORS: Record<string, string> = {
    "RVM": "#0EA5E9",
    "Retailer": "#00B01A",
    "Collection Hub": "#A8E10C",
};

/* Human-readable labels for the legend */
const TYPE_LABELS: Record<string, string> = {
    "RVM": "Reverse Vending Machine",
    "Retailer": "Participating Retailer",
    "Collection Hub": "Collection Hub",
};

/* Type order for auto-cycling */
const TYPE_KEYS = Object.keys(TYPE_COLORS);

/* ═══════════════════════════════════════════════════════════
   MARKER ICONS
   ═══════════════════════════════════════════════════════════ */
function MarkerIcon({ type, color, size = 32, bottle }: { type: string; color: string; size?: number; bottle?: "can" | "glass" | "pet" }) {
    const uid = `${type}-${color}-${bottle || ''}`.replace(/[^a-zA-Z0-9]/g, '');

    // ---------------------------------------------------------
    // RVM — Sleek Futuristic Terminal
    // ---------------------------------------------------------
    if (type === "RVM") {
        return (
            <svg width={size} height={size * 1.25} viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id={`rvm-base-${uid}`} x1="0" y1="0" x2="0" y2="40">
                        <stop offset="0%" stopColor="#E2E8F0" />
                        <stop offset="100%" stopColor="#CBD5E1" />
                    </linearGradient>
                    <linearGradient id={`rvm-glass-${uid}`} x1="0" y1="0" x2="32" y2="40">
                        <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.0" />
                    </linearGradient>
                    <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
                    </filter>
                </defs>
                <g filter={`url(#shadow-${uid})`}>
                    {/* Main Body — steel chassis */}
                    <rect x="4" y="2" width="24" height="36" rx="4" fill={`url(#rvm-base-${uid})`} />
                    {/* Side panel edge */}
                    <rect x="4" y="2" width="3" height="36" rx="2" fill="#B0BEC5" />
                    {/* Inner Screen — dark LCD */}
                    <rect x="8" y="6" width="16" height="14" rx="2" fill="#93C5FD" />
                    {/* Screen content — green readout */}
                    <rect x="10" y="9" width="12" height="2" rx="1" fill="#2563EB" opacity="0.6" />
                    <rect x="10" y="13" width="8" height="1.5" rx="0.75" fill="#3B82F6" opacity="0.4" />
                    {/* Insert slot — the machine opening */}
                    <rect x="10" y="24" width="12" height="5" rx="1.5" fill="#94A3B8" />
                    <rect x="12" y="25.5" width="8" height="2" rx="1" fill="#B0BEC5" />
                    {/* Status LED */}
                    <circle cx="16" cy="33" r="1.5" fill="#22C55E" />
                    <circle cx="16" cy="33" r="2.5" fill="#22C55E" opacity="0.2" />
                    {/* Metallic gloss highlight */}
                    <rect x="4" y="2" width="10" height="36" rx="4" fill={`url(#rvm-glass-${uid})`} />
                </g>
            </svg>
        );
    }

    // ---------------------------------------------------------
    // RETAILER — Premium Glossy Storefront
    // ---------------------------------------------------------
    if (type === "Retailer") {
        return (
            <svg width={size} height={size * 1.25} viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id={`ret-base-${uid}`} x1="0" y1="0" x2="0" y2="40">
                        <stop offset="0%" stopColor="#22C55E" />
                        <stop offset="100%" stopColor="#15803D" />
                    </linearGradient>
                    <linearGradient id={`ret-roof-${uid}`} x1="0" y1="0" x2="32" y2="0">
                        <stop offset="0%" stopColor="#FDE047" />
                        <stop offset="100%" stopColor="#EAB308" />
                    </linearGradient>
                    <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
                    </filter>
                </defs>
                <g filter={`url(#shadow-${uid})`}>
                    {/* Main Building */}
                    <rect x="4" y="14" width="24" height="22" rx="2" fill={`url(#ret-base-${uid})`} />
                    {/* Window */}
                    <rect x="8" y="20" width="16" height="10" rx="1" fill="#F0FDF4" />
                    <rect x="10" y="22" width="12" height="6" rx="0.5" fill="#86EFAC" />
                    {/* Door Outline */}
                    <path d="M14 36 L14 32 C14 31 15 30 16 30 C17 30 18 31 18 32 L18 36" fill="none" stroke="#F0FDF4" strokeWidth="1.5" opacity="0.6"/>
                    {/* Awning */}
                    <path d="M2 14 L6 6 L26 6 L30 14 Z" fill={`url(#ret-roof-${uid})`} />
                    {/* Stripes */}
                    <path d="M8 6 L6.5 14 L11 14 L12 6 Z" fill="#FEF08A" />
                    <path d="M16 6 L15.5 14 L20 14 L19 6 Z" fill="#FEF08A" />
                    <path d="M24 6 L24.5 14 L29 14 L27 6 Z" fill="#FEF08A" />
                </g>
            </svg>
        );
    }

    // ---------------------------------------------------------
    // COLLECTION HUB — Ultra-Clean Bottles (CAN, GLASS, PET)
    // ---------------------------------------------------------
    const bType = bottle || "pet";

    // ── ALUMINIUM CAN ──
    if (bType === "can") {
        return (
            <svg width={size} height={size * 1.5} viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id={`can-base-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#94A3B8" />
                        <stop offset="50%" stopColor="#F1F5F9" />
                        <stop offset="100%" stopColor="#64748B" />
                    </linearGradient>
                    <linearGradient id={`can-band-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#84CC16" />
                        <stop offset="50%" stopColor="#BEF264" />
                        <stop offset="100%" stopColor="#4D7C0F" />
                    </linearGradient>
                    <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
                    </filter>
                </defs>
                <g filter={`url(#shadow-${uid})`}>
                    {/* Body */}
                    <rect x="8" y="8" width="16" height="32" fill={`url(#can-base-${uid})`} />
                    {/* Top Rim */}
                    <ellipse cx="16" cy="8" rx="8" ry="2" fill="#E2E8F0" />
                    {/* Bottom Rim */}
                    <ellipse cx="16" cy="40" rx="8" ry="2" fill="#64748B" />
                    {/* Label Band */}
                    <rect x="8" y="16" width="16" height="16" fill={`url(#can-band-${uid})`} />
                    {/* Leaf icon inside Label */}
                    <path d="M16 22 C14 26 14 30 16 30 C18 30 18 26 16 22 Z" fill="#FFFFFF" opacity="0.9" />
                    {/* Reflection Highlight */}
                    <rect x="11" y="9" width="3" height="30" fill="#FFFFFF" opacity="0.6" />
                </g>
            </svg>
        );
    }

    // ── GLASS BOTTLE ──
    if (bType === "glass") {
        return (
            <svg width={size} height={size * 1.5} viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id={`glass-base-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#065F46" />
                        <stop offset="50%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#064E3B" />
                    </linearGradient>
                    <linearGradient id={`glass-label-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FDE047" />
                        <stop offset="50%" stopColor="#FEF08A" />
                        <stop offset="100%" stopColor="#CA8A04" />
                    </linearGradient>
                    <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
                    </filter>
                </defs>
                <g filter={`url(#shadow-${uid})`}>
                    {/* Neck */}
                    <rect x="13" y="6" width="6" height="14" fill={`url(#glass-base-${uid})`} />
                    {/* Body */}
                    <path d="M10 20 L22 20 C24 20 26 22 26 26 L26 42 C26 44 24 46 22 46 L10 46 C8 46 6 44 6 42 L6 26 C6 22 8 20 10 20 Z" fill={`url(#glass-base-${uid})`} />
                    {/* Cap */}
                    <rect x="12" y="4" width="8" height="3" rx="1" fill="#FEF08A" />
                    {/* Label */}
                    <rect x="6" y="28" width="20" height="10" fill={`url(#glass-label-${uid})`} />
                    {/* Star in label */}
                    <circle cx="16" cy="33" r="2.5" fill="#065F46" />
                    <circle cx="16" cy="33" r="1" fill="#34D399" />
                    {/* Highlight */}
                    <path d="M10 26 L10 40" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <path d="M14.5 7 L14.5 15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                </g>
            </svg>
        );
    }

    // ── PET PLASTIC BOTTLE ──
    return (
        <svg width={size} height={size * 1.5} viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <defs>
                <linearGradient id={`pet-base-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.75" />
                    <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id={`pet-label-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="50%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
                <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
                </filter>
            </defs>
            <g filter={`url(#shadow-${uid})`}>
                {/* Neck */}
                <rect x="13" y="6" width="6" height="8" fill={`url(#pet-base-${uid})`} />
                {/* Body */}
                <path d="M8 14 L24 14 C26 14 26 18 26 22 L26 42 C26 45 24 46 16 46 C8 46 6 45 6 42 L6 22 C6 18 6 14 8 14 Z" fill={`url(#pet-base-${uid})`} />
                {/* Cap */}
                <rect x="12" y="4" width="8" height="3" rx="1" fill="#0284C7" />
                {/* Ridges */}
                <line x1="8" y1="20" x2="24" y2="20" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
                <line x1="8" y1="24" x2="24" y2="24" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
                {/* Label */}
                <rect x="6" y="28" width="20" height="10" fill={`url(#pet-label-${uid})`} />
                <circle cx="16" cy="33" r="3" fill="#FFFFFF" />
                {/* Highlight */}
                <path d="M10 26 L10 40" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            </g>
        </svg>
    );
}

/* Custom marker component */
function EnviroMarker({ point, onClick, dimmed }: { point: typeof ENVIRO_POINTS[0]; onClick: (p: typeof ENVIRO_POINTS[0]) => void; dimmed: boolean }) {
    const color = TYPE_COLORS[point.type] || "#00B01A";
    return (
        <Marker latitude={point.lat} longitude={point.lng} anchor="bottom" onClick={(e) => { e.originalEvent.stopPropagation(); onClick(point); }}>
            <div
                className={`group cursor-pointer flex flex-col items-center transition-all duration-300 ${
                    dimmed 
                        ? "opacity-0 scale-0 pointer-events-none" 
                        : "opacity-100 scale-100 hover:scale-[1.15]"
                }`}
                title={point.name}
            >
                <MarkerIcon type={point.type} color={color} size={32} bottle={point.bottle} />
                {/* Ground shadow */}
                <div className="w-5 h-1.5 rounded-[100%] bg-black/15 mt-1 blur-[1.5px] group-hover:bg-black/10 group-hover:scale-90 transition-all duration-300" />
            </div>
        </Marker>
    );
}

/* ═══════════════════════════════════════════════════════════
   TYPE INFO — Pitch Deck / DRS 2027 aligned content
   ═══════════════════════════════════════════════════════════ */
const TYPE_INFO: Record<string, {
    tagline: string;
    description: string;
    stats: { label: string; value: string }[];
    partner?: string;
    icon: string;
}> = {
    "RVM": {
        tagline: "Smart Return Infrastructure",
        description: "Reverse Vending Machines accept PET, glass, and aluminium containers. Users scan, insert, and get instant credit via the EnviroPay wallet.",
        stats: [
            { label: "Planned Units", value: "100" },
            { label: "RVM Partner", value: "ACO Recycling" },
            { label: "Accepts", value: "PET · Glass · Cans" },
        ],
        partner: "ACO Recycling",
        icon: "🏧",
    },
    "Retailer": {
        tagline: "DRS-Ready Return Points",
        description: "Participating retailers host in-store return points, driving customer footfall while meeting DRS compliance from day one.",
        stats: [
            { label: "Return Locations", value: "1,000s" },
            { label: "Deposit Value", value: "£0.20" },
            { label: "DRS Launch", value: "Oct 2027" },
        ],
        icon: "🏪",
    },
    "Collection Hub": {
        tagline: "Community Collection Points",
        description: "Dedicated drop-off hubs for bulk container returns across parks, public spaces, and community centres. Sorted by material type.",
        stats: [
            { label: "UK Containers/yr", value: "30–40B" },
            { label: "Circulating Deposits", value: "£6–8B" },
            { label: "Material Types", value: "3" },
        ],
        icon: "♻️",
    },
};

/* Premium contextual info card */
function PointInfoCard({ point, onClose }: { point: typeof ENVIRO_POINTS[0]; onClose: () => void }) {
    const info = TYPE_INFO[point.type];
    const color = TYPE_COLORS[point.type] || "#00B01A";

    return (
        <div className="absolute top-14 right-3 z-30 w-[340px] animate-fadeIn">
            <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden">
                {/* Colored header strip */}
                <div className="px-5 py-4 relative" style={{ background: `linear-gradient(135deg, ${color}15, ${color}08)` }}>
                    <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: color }} />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{info?.icon}</span>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider font-[family-name:var(--font-ibm-plex-mono)]" style={{ color }}>{TYPE_LABELS[point.type]}</p>
                                <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">{info?.tagline}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#94A3B8] hover:text-[#0B132B] hover:bg-[#E2E8F0] transition-colors text-xs font-bold cursor-pointer">✕</button>
                    </div>
                </div>

                {/* Location name */}
                <div className="px-5 pt-4 pb-2">
                    <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                        <p className="text-sm font-bold text-[#0B132B] font-[family-name:var(--font-outfit)]">{point.name}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="px-5 pb-4">
                    <p className="text-xs leading-relaxed text-[#64748B]">{info?.description}</p>
                </div>

                {/* Stats grid */}
                {info?.stats && (
                    <div className="px-5 pb-4">
                        <div className="grid grid-cols-3 gap-2">
                            {info.stats.map((stat) => (
                                <div key={stat.label} className="bg-[#F8FAFC] rounded-xl px-2.5 py-3 text-center">
                                    <p className="text-sm font-bold text-[#0B132B] font-[family-name:var(--font-ibm-plex-mono)]">{stat.value}</p>
                                    <p className="text-[9px] text-[#94A3B8] font-semibold mt-1 uppercase tracking-wider leading-tight">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-[11px] text-[#94A3B8] font-[family-name:var(--font-ibm-plex-mono)]">Planned · UK DRS Oct 2027</span>
                    {info?.partner && (
                        <span className="text-[10px] font-bold text-[#0B132B] bg-white px-2.5 py-1 rounded-full border border-[#E2E8F0]">{info.partner}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   ENVIRO MAP — Production-ready Mapbox GL component
   Interactive legend with filter + auto-cycle
   ═══════════════════════════════════════════════════════════ */
export function EnviroMap({ compact = false }: { compact?: boolean }) {
    const mapRef = useRef<MapRef>(null);
    const [selectedPoint, setSelectedPoint] = useState<typeof ENVIRO_POINTS[0] | null>(null);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [userClicked, setUserClicked] = useState(false);
    const [scrollActive, setScrollActive] = useState(false);

    /* Auto-cycle through types every 4s when user hasn't clicked */
    useEffect(() => {
        if (userClicked) return;
        const interval = setInterval(() => {
            setActiveFilter(prev => {
                const currentIdx = prev ? TYPE_KEYS.indexOf(prev) : -1;
                const nextIdx = (currentIdx + 1) % TYPE_KEYS.length;
                return TYPE_KEYS[nextIdx];
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [userClicked]);

    /* Reset auto-cycle after 10s of no interaction */
    useEffect(() => {
        if (!userClicked) return;
        const timeout = setTimeout(() => {
            setUserClicked(false);
        }, 10000);
        return () => clearTimeout(timeout);
    }, [userClicked, activeFilter]);

    const handleLegendClick = useCallback((type: string) => {
        setUserClicked(true);
        setActiveFilter(prev => prev === type ? null : type);
    }, []);

    const handleMarkerClick = useCallback((point: typeof ENVIRO_POINTS[0]) => {
        setSelectedPoint(point);
        setUserClicked(true);
        setActiveFilter(point.type);
        mapRef.current?.flyTo({ center: [point.lng, point.lat], zoom: 13, duration: 1200 });
    }, []);

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    /* Graceful fallback if no token configured */
    if (!token) {
        return (
            <div className={`bg-[#F0F7F1] rounded-2xl border border-[#D1E7D5] flex items-center justify-center ${compact ? "aspect-square" : "h-[500px]"}`}>
                <div className="text-center px-6">
                    <div className="w-12 h-12 rounded-full bg-[#00B01A]/10 flex items-center justify-center mx-auto mb-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B01A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                    <p className="text-sm font-bold text-[#163841] font-[family-name:var(--font-outfit)]">EnviroPoint Map</p>
                    <p className="text-xs text-[#64748B] mt-1">Add NEXT_PUBLIC_MAPBOX_TOKEN to enable</p>
                </div>
            </div>
        );
    }

    /* Count for header badge — show filtered or total */
    const displayCount = activeFilter ? ENVIRO_POINTS.filter(p => p.type === activeFilter).length : ENVIRO_POINTS.length;
    const displayLabel = activeFilter ? TYPE_LABELS[activeFilter] + "s" : "Planned EnviroPoints";

    return (
        <div
            className={`relative rounded-2xl overflow-hidden border border-white/20 ${compact ? "aspect-square" : "h-[500px]"}`}
            onMouseLeave={() => setScrollActive(false)}
        >
            {/* Header badge */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold font-[family-name:var(--font-ibm-plex-mono)] text-[#0B132B] uppercase tracking-wider shadow-sm border border-[#E2E8F0] transition-all duration-500">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00B01A] mr-1.5 animate-pulse" />
                    {displayCount} {displayLabel}
                </span>
            </div>

            {/* Interactive Legend */}
            <div className="absolute bottom-3 left-3 z-20">
                <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E2E8F0] px-3.5 py-2.5">
                    <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider font-[family-name:var(--font-ibm-plex-mono)]">Return Point Types</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        {Object.entries(TYPE_COLORS).map(([type, color]) => {
                            const count = ENVIRO_POINTS.filter(p => p.type === type).length;
                            const isActive = activeFilter === type;
                            const isDimmed = activeFilter !== null && !isActive;
                            return (
                                <button
                                    key={type}
                                    onClick={() => handleLegendClick(type)}
                                    className={`flex items-center justify-between gap-4 px-2 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${isActive ? "bg-[#F0F7F1] ring-1 ring-[#00B01A]/20" : isDimmed ? "opacity-40" : "hover:bg-[#F8FAFC]"}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-2.5 h-2.5 rounded-full shadow-sm transition-all duration-300 ${isActive ? "ring-2 ring-offset-1" : ""}`}
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className={`text-[10px] font-semibold transition-colors duration-300 ${isActive ? "text-[#0B132B]" : "text-[#64748B]"}`}>{TYPE_LABELS[type]}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold font-[family-name:var(--font-ibm-plex-mono)] transition-colors duration-300 ${isActive ? "text-[#0B132B]" : "text-[#94A3B8]"}`}>{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Selected point info card */}
            {selectedPoint && (
                <PointInfoCard point={selectedPoint} onClose={() => setSelectedPoint(null)} />
            )}

            <MapGL
                ref={mapRef}
                mapboxAccessToken={token}
                initialViewState={{
                    latitude: 54.0,
                    longitude: -2.5,
                    zoom: compact ? 4.8 : 5.4,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/outdoors-v12"
                attributionControl={false}
                onClick={() => setSelectedPoint(null)}
                interactive={true}
                touchZoomRotate={true}
                scrollZoom={scrollActive}
                dragPan={true}
                doubleClickZoom={true}
                touchPitch={false}
            >
                <NavigationControl position="top-right" showCompass={false} />

                {ENVIRO_POINTS.map((point) => (
                    <EnviroMarker
                        key={point.id}
                        point={point}
                        onClick={handleMarkerClick}
                        dimmed={activeFilter !== null && point.type !== activeFilter}
                    />
                ))}
            </MapGL>

            {/* Scroll-zoom guard overlay */}
            {!scrollActive && (
                <div
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={() => setScrollActive(true)}
                >
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-[#0B132B] text-xs font-semibold shadow-lg border border-[#E2E8F0] pointer-events-none whitespace-nowrap font-[family-name:var(--font-outfit)]">
                        Click to interact with map
                    </div>
                </div>
            )}

            {/* Reset Zoom button */}
            <div className="absolute bottom-3 right-3 z-20">
                <button
                    onClick={() => {
                        mapRef.current?.flyTo({
                            center: [-2.5, 54.0],
                            zoom: compact ? 4.8 : 5.4,
                            duration: 1000,
                        });
                        setSelectedPoint(null);
                        setUserClicked(false);
                    }}
                    className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E2E8F0] p-2.5 cursor-pointer hover:bg-[#F8FAFC] transition-all duration-200 group"
                    title="Reset zoom"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#0B132B] transition-colors duration-200">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   COMPACT MINI MAP — Drop-in replacement for AudienceSections
   ═══════════════════════════════════════════════════════════ */
export function MiniEnviroMap() {
    return <EnviroMap compact />;
}
