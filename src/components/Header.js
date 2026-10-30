
import React, { useEffect, useRef, useState } from "react";

const coins = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: "₿", color: "text-orange-400", bg: "bg-orange-400/10" },
    { id: "avalanche-2", name: "Avalanche", symbol: "AVAX", icon: "▲", color: "text-red-400", bg: "bg-red-400/10" },
    { id: "binancecoin", name: "BNB", symbol: "BNB", icon: "◆", color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { id: "cardano", name: "Cardano", symbol: "ADA", icon: "₳", color: "text-blue-400", bg: "bg-blue-400/10" },
    { id: "decentraland", name: "Decentraland", symbol: "MANA", icon: "◈", color: "text-pink-400", bg: "bg-pink-400/10" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", icon: "Ð", color: "text-amber-300", bg: "bg-amber-300/10" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "Ξ", color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { id: "ripple", name: "Ripple", symbol: "XRP", icon: "✕", color: "text-sky-400", bg: "bg-sky-400/10" },
    { id: "solana", name: "Solana", symbol: "SOL", icon: "◎", color: "text-violet-400", bg: "bg-violet-400/10" },
    { id: "tether", name: "Tether", symbol: "USDT", icon: "₮", color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

export default function Header({ handle_Submit }) {
    const [selectedCoin, setSelectedCoin] = useState(coins[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearch("");
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setIsOpen(false);
                setSearch("");
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            searchRef.current?.focus();
        }
    }, [isOpen]);

    const filteredCoins = coins.filter((coin) =>
        `${coin.name} ${coin.symbol}`.toLowerCase().includes(search.toLowerCase())
    );

    const selectCoin = (coin) => {
        setSelectedCoin(coin);
        setIsOpen(false);
        setSearch("");

        // Preserve the existing handler's event interface.
        handle_Submit?.({
            target: {
                name: "selectCoin",
                value: coin.id,
            },
        });
    };

    return (
        <header className="relative z-50 w-full px-4 pt-4 sm:px-7 lg:px-12">
            <nav className="relative mx-auto flex max-w-[1550px] flex-wrap items-center justify-between gap-4 bg-transparent px-4 py-3 sm:px-6">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -left-10 top-0 h-24 w-40 rounded-full bg-emerald-400/[0.07] blur-[60px]" />

                {/* Brand */}
                <a href="/" className="group relative flex shrink-0 items-center gap-3 transition-transform duration-300 hover:-rotate-2">
                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-300 to-cyan-500 shadow-lg shadow-emerald-500/20 transition duration-500 group-hover:rotate-6 group-hover:scale-105">
                        <span className="text-2xl font-black text-[#071713]">C</span>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </div>

                    <div>
                        <h1 className="text-lg font-black tracking-[0.14em] text-white sm:text-xl">
                            CRYPT<span className="text-emerald-400">OVA</span>
                        </h1>
                        <p className="mt-0.5 text-[8px] font-semibold tracking-[0.25em] text-slate-500">
                            DIGITAL ASSET INTELLIGENCE
                        </p>
                    </div>
                </a>

                {/* Right controls */}
                <div className="relative flex w-full items-center justify-end gap-3 sm:w-auto">

                    {/* Live indicator */}
                    <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2 sm:flex">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        <span className="text-[9px] font-bold tracking-[0.15em] text-emerald-300">
                            MARKET DATA
                        </span>
                    </div>

                    {/* Custom coin dropdown */}
                    <div className="relative" ref={dropdownRef}>

                        {/* Selected coin trigger */}
                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            aria-expanded={isOpen}
                            aria-haspopup="listbox"
                            className={`group flex min-w-[185px] items-center gap-3 rounded-xl border bg-[#151f2e] px-3 py-2.5 text-left transition-all duration-300 sm:min-w-[220px] sm:px-4 ${isOpen
                                ? "border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.10)]"
                                : "border-white/[0.09] hover:border-emerald-400/30"
                                }`}
                        >
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg ${selectedCoin.bg} ${selectedCoin.color}`}>
                                {selectedCoin.icon}
                            </div>

                            <div className="min-w-0 flex-1">
                                <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                    Tracking asset
                                </span>
                                <span className="block truncate text-xs font-bold text-white">
                                    {selectedCoin.name}
                                    <span className="ml-1.5 text-[10px] font-medium text-slate-500">
                                        {selectedCoin.symbol}
                                    </span>
                                </span>
                            </div>

                            <svg
                                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:text-emerald-400 ${isOpen ? "rotate-180 text-emerald-400" : ""}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        <div
                            className={`absolute top-[calc(100%+12px)] z-[100]
        right-0
        w-[min(320px,calc(100vw-24px))]
        max-w-[calc(100vw-24px)]
        origin-top-right
        transition-all duration-200
        ${isOpen
                                    ? "visible translate-y-0 scale-100 opacity-100"
                                    : "invisible -translate-y-2 scale-[0.98] opacity-0 pointer-events-none"
                                }`}
                            style={{
                                right: "max(0px, calc((320px - 100vw + 24px) / 2))",
                            }}
                        >
                            <div className="overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0d1726]/[98%] shadow-[0_25px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl">

                                {/* Menu heading */}
                                <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3.5">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                                            Select asset
                                        </p>
                                        <p className="mt-1 text-[9px] text-slate-500">
                                            Choose a cryptocurrency to explore
                                        </p>
                                    </div>
                                    <span className="rounded-md border border-emerald-400/15 bg-emerald-400/[0.07] px-2 py-1 text-[9px] font-bold text-emerald-300">
                                        {coins.length} ASSETS
                                    </span>
                                </div>

                                {/* Search */}
                                <div className="border-b border-white/[0.07] p-3">
                                    <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 transition-colors focus-within:border-emerald-400/40">
                                        <svg
                                            className="h-4 w-4 shrink-0 text-slate-500"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <circle cx="11" cy="11" r="7" />
                                            <path d="m16 16 4 4" strokeLinecap="round" />
                                        </svg>

                                        <input
                                            ref={searchRef}
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search coin or symbol..."
                                            className="w-full bg-transparent py-2 text-xs text-white outline-none placeholder:text-slate-600"
                                        />

                                        {search && (
                                            <button
                                                type="button"
                                                onClick={() => setSearch("")}
                                                className="text-xs text-slate-500 hover:text-white"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Coin list */}
                                <div className="max-h-[310px] overflow-y-auto p-2 [scrollbar-color:#334155_transparent] [scrollbar-width:thin]">
                                    {filteredCoins.length > 0 ? (
                                        filteredCoins.map((coin, index) => {
                                            const isSelected = selectedCoin.id === coin.id;

                                            return (
                                                <button
                                                    key={coin.id}
                                                    type="button"
                                                    role="option"
                                                    aria-selected={isSelected}
                                                    onClick={() => selectCoin(coin)}
                                                    className={`group/item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${isSelected
                                                        ? "border border-emerald-400/15 bg-emerald-400/[0.08]"
                                                        : "border border-transparent hover:border-white/[0.06] hover:bg-white/[0.045]"
                                                        }`}
                                                    style={{
                                                        animation: isOpen
                                                            ? `coinEnter 250ms ease ${index * 25}ms both`
                                                            : "none",
                                                    }}
                                                >
                                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition-transform duration-200 group-hover/item:scale-110 ${coin.bg} ${coin.color}`}>
                                                        {coin.icon}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <p className={`text-xs font-semibold ${isSelected ? "text-emerald-300" : "text-slate-200 group-hover/item:text-white"}`}>
                                                            {coin.name}
                                                        </p>
                                                        <p className="mt-1 text-[9px] font-medium tracking-[0.12em] text-slate-500">
                                                            {coin.symbol}
                                                        </p>
                                                    </div>

                                                    {isSelected ? (
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                                                            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                                                <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    ) : (
                                                        <span className="text-[9px] text-slate-700 transition-colors group-hover/item:text-emerald-400">
                                                            ↗
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <div className="px-4 py-9 text-center">
                                            <div className="mb-2 text-2xl text-slate-600">⌕</div>
                                            <p className="text-xs font-medium text-slate-300">
                                                No assets found
                                            </p>
                                            <p className="mt-1 text-[10px] text-slate-500">
                                                Try another coin name or symbol
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3">
                                    <span className="text-[9px] text-slate-500">
                                        CRYPTOVA ASSET EXPLORER
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        Ready to explore
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dropdown animation */}
            <style>{`
                @keyframes coinEnter {
                    from {
                        opacity: 0;
                        transform: translateY(5px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            {/* Bottom accent */}
            <div className="mx-auto mt-3 h-px max-w-[1550px] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
        </header>
    );
}
