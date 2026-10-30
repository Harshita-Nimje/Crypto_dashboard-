
import React from "react";

const CardSection = (props) => {

    const stats = [
        {
            title: "Market Cap Change",
            value: `${props.mCap24}%`,
            icon: "◈",
            color: "text-cyan-400",
            bg: "bg-cyan-400/10",
            border: "group-hover:border-cyan-400/40",
        },
        {
            title: "All Time High",
            value: `$${props.ath}`,
            icon: "↗",
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            border: "group-hover:border-emerald-400/40",
        },
        {
            title: "All Time Low",
            value: `$${props.atl}`,
            icon: "↘",
            color: "text-rose-400",
            bg: "bg-rose-400/10",
            border: "group-hover:border-rose-400/40",
        },
        {
            title: "Positive Sentiment",
            value: `${props.sentiment}%`,
            icon: "✧",
            color: "text-violet-400",
            bg: "bg-violet-400/10",
            border: "group-hover:border-violet-400/40",
        },
        {
            title: "24H Highest Price",
            value: `$${props.high24}`,
            icon: "↑",
            color: "text-green-400",
            bg: "bg-green-400/10",
            border: "group-hover:border-green-400/40",
        },
        {
            title: "24H Lowest Price",
            value: `$${props.low24}`,
            icon: "↓",
            color: "text-orange-400",
            bg: "bg-orange-400/10",
            border: "group-hover:border-orange-400/40",
        },
    ];

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#080d18] px-5 py-10 text-white sm:px-8 lg:px-14">
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/[0.07] blur-[130px]" />
            <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-emerald-500/[0.06] blur-[130px]" />

            <div className="relative mx-auto max-w-[1500px]">

                {/* Heading */}
                <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

                    <div className="animate-[fadeIn_0.7s_ease-out]">
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400">
                                Market Overview
                            </span>
                        </div>

                        <h1 className="text-4xl font-black capitalize tracking-tight sm:text-5xl lg:text-6xl">
                            {props.coinName}
                            <span className="text-emerald-400">.</span>
                        </h1>

                        <p className="mt-3 text-sm text-slate-400 sm:text-base">
                            Real-time market intelligence and asset performance.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-start rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 md:self-auto">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        </span>
                        <span className="text-xs font-semibold tracking-wider text-slate-300">
                            LIVE DATA
                        </span>
                    </div>
                </div>

                {/* Main Price Card */}
                <section className="group relative mb-10 overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#152337] via-[#101b2b] to-[#0d1725] p-7 shadow-2xl shadow-black/30 transition duration-500 hover:border-emerald-400/30 sm:p-10 lg:p-12">

                    <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-emerald-400/[0.10] blur-[90px] transition duration-700 group-hover:bg-emerald-400/[0.16]" />

                    <div className="pointer-events-none absolute bottom-0 right-0 h-px w-2/3 bg-gradient-to-l from-emerald-400/50 to-transparent" />

                    <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-center">

                        <div>
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-xl text-emerald-400">
                                    $
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                        Current Market Price
                                    </p>
                                    <p className="mt-1 text-[11px] text-slate-500">
                                        Selected cryptocurrency
                                    </p>
                                </div>
                            </div>

                            <div className="break-all text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                                <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                                    ${props.currentPrice}
                                </span>
                            </div>

                            <p className="mt-5 text-sm text-slate-400">
                                Current valuation of your selected digital asset.
                            </p>
                        </div>

                        <div className="flex min-w-[180px] flex-col gap-3 rounded-2xl border border-white/[0.08] bg-black/20 p-5 backdrop-blur-xl">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                Price Range
                            </span>

                            <div className="flex items-center justify-between gap-5">
                                <div>
                                    <p className="text-[10px] text-slate-500">24H HIGH</p>
                                    <p className="mt-1 font-bold text-emerald-400">
                                        ${props.high24}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-500">24H LOW</p>
                                    <p className="mt-1 font-bold text-rose-400">
                                        ${props.low24}
                                    </p>
                                </div>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-rose-400 via-yellow-400 to-emerald-400" />
                            </div>
                            <p className="text-[10px] text-slate-500">
                                24-hour trading range
                            </p>
                        </div>

                    </div>
                </section>

                {/* Statistics heading */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                            Market Statistics
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Key performance indicators
                        </p>
                    </div>

                    <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] font-semibold tracking-wider text-slate-400">
                        06 METRICS
                    </span>
                </div>

                {/* Stats Grid */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                    {stats.map((stat, index) => (
                        <div
                            key={stat.title}
                            style={{ animationDelay: `${index * 100}ms` }}
                            className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111c2c]/80 p-6 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-[#172438] hover:shadow-2xl ${stat.border}`}
                        >
                            <div className="flex items-start justify-between">

                                <div>
                                    <p className="text-xs font-semibold tracking-wide text-slate-400">
                                        {stat.title}
                                    </p>

                                    <h3 className={`mt-5 break-all text-2xl font-extrabold tracking-tight sm:text-3xl ${stat.color}`}>
                                        {stat.value}
                                    </h3>
                                </div>

                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition duration-500 group-hover:rotate-12 group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                                    {stat.icon}
                                </div>

                            </div>

                            <div className="mt-7 flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                                    Market Insight
                                </span>
                                <span className={`h-1 w-10 rounded-full transition-all duration-500 group-hover:w-16 ${stat.bg}`} />
                            </div>

                            <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-white/[0.02] blur-2xl transition duration-500 group-hover:bg-white/[0.06]" />
                        </div>
                    ))}

                </section>

                {/* Footer */}
                <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-center sm:flex-row sm:text-left">
                    <p className="text-[11px] tracking-wide text-slate-500">
                        CRYPTOVA · DIGITAL ASSET INTELLIGENCE
                    </p>
                    <p className="text-[11px] text-slate-600">
                        Market data powered by CoinGecko
                    </p>
                </div>

            </div>
        </main>
    );
};

export default CardSection;
