
import React, { Component } from "react";
import Chart from "react-apexcharts";

export class ChartSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: null,
            isMobile: typeof window !== "undefined" && window.innerWidth < 640,

            Price: {
                options: this.getChartOptions("Market Price (USD)", "#34d399"),
                series: [{ name: "Market Price", data: [] }]
            },
            Market_Cap: {
                options: this.getChartOptions("Market Capitalization", "#a78bfa"),
                series: [{ name: "Market Cap", data: [] }]
            },
            Tot_Vol: {
                options: this.getChartOptions("Trading Volume", "#22d3ee"),
                series: [{ name: "Volume", data: [] }]
            },
            selectedRange: 30
        };

        this.prevId = props.Id;
        this.interval = null;
    }

    handleResize = () => {
        const isMobile = window.innerWidth < 640;

        if (isMobile !== this.state.isMobile) {
            this.setState({ isMobile });
        }
    };

    getChartOptions(title, color) {
        return {
            chart: {
                type: "area",
                toolbar: { show: false },
                zoom: { enabled: false },
                background: "transparent",

                redrawOnParentResize: true,
                redrawOnWindowResize: true,

                animations: {
                    enabled: true,
                    speed: 800
                }
            },
            title: {
                text: title,
                align: "left",
                style: {
                    color: "#e2e8f0",
                    fontSize: "15px",
                    fontWeight: 600
                }
            },
            colors: [color],
            stroke: {
                curve: "smooth",
                width: 2.5
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.35,
                    opacityTo: 0.02,
                    stops: [0, 90, 100]
                }
            },
            dataLabels: { enabled: false },
            grid: {
                borderColor: "rgba(255,255,255,0.06)",
                strokeDashArray: 4
            },
            xaxis: {
                type: "datetime",
                labels: {
                    style: { colors: "#64748b" }
                },
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                labels: {
                    style: { colors: "#64748b" },
                    formatter: (value) =>
                        value >= 1000000
                            ? (value / 1000000).toFixed(2) + "M"
                            : value >= 1000
                                ? (value / 1000).toFixed(2) + "K"
                                : value.toFixed(2)
                }
            },
            tooltip: {
                theme: "dark",
                x: { format: "dd MMM yyyy" },
                y: {
                    formatter: (value) =>
                        "$" + Number(value).toLocaleString("en-US", {
                            maximumFractionDigits: 2
                        })
                }
            },
            legend: { show: false }
        };
    }

    fetchData = async () => {
        if (!this.props.Id) return;

        this.setState({ loading: true, error: null });

        try {
            const url = `https://api.coingecko.com/api/v3/coins/${this.props.Id}/market_chart?vs_currency=usd&days=${this.state.selectedRange}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    response.status === 429
                        ? "CoinGecko API rate limit reached. Please wait before trying again."
                        : `API request failed: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();

            if (!data.prices || !data.market_caps || !data.total_volumes) {
                throw new Error("Invalid chart data received from CoinGecko.");
            }

            if (!this._isMounted) return;

            this.setState({
                loading: false,
                error: null,

                Price: {
                    ...this.state.Price,
                    series: [{
                        name: "Market Price",
                        data: data.prices
                    }]
                },

                Market_Cap: {
                    ...this.state.Market_Cap,
                    series: [{
                        name: "Market Cap",
                        data: data.market_caps
                    }]
                },

                Tot_Vol: {
                    ...this.state.Tot_Vol,
                    series: [{
                        name: "Volume",
                        data: data.total_volumes
                    }]
                }
            });

        } catch (error) {
            console.error("Chart API Error:", error);

            if (this._isMounted) {
                this.setState({
                    loading: false,
                    error: error.message
                });
            }
        }
    };

    componentDidMount() {
        this._isMounted = true;

        window.addEventListener("resize", this.handleResize);

        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.Id !== this.props.Id ||
            prevState.selectedRange !== this.state.selectedRange
        ) {
            this.fetchData();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener("resize", this.handleResize);
    }

    changeRange = (days) => {
        if (days === this.state.selectedRange) return;
        this.setState({ selectedRange: days });
    };

    render() {
        const ranges = [
            { label: "24H", days: 1 },
            { label: "7D", days: 7 },
            { label: "30D", days: 30 },
            { label: "6M", days: 182 },
            { label: "1Y", days: 365 }
        ];

        const metrics = [
            {
                title: "Market Capitalization",
                value: this.props.MarketCap,
                symbol: "◈",
                color: "text-violet-300",
                glow: "bg-violet-400",
                number: "01"
            },
            {
                title: "Price Change · 24H",
                value: this.props.priceChange24,
                symbol: "↗",
                color: "text-emerald-300",
                glow: "bg-emerald-400",
                number: "02"
            },
            {
                title: "Trading Volume",
                value: this.props.TotVol,
                symbol: "⇄",
                color: "text-cyan-300",
                glow: "bg-cyan-400",
                number: "03"
            },
            {
                title: "Circulating Supply",
                value: this.props.Circulating,
                symbol: "◎",
                color: "text-orange-300",
                glow: "bg-orange-400",
                number: "04"
            },
            {
                title: "Twitter Followers",
                value: this.props.twitterF,
                symbol: "✧",
                color: "text-sky-300",
                glow: "bg-sky-400",
                number: "05"
            }
        ];

        return (
            <section className="relative isolate min-h-screen overflow-hidden bg-[#050810] px-4 py-16 text-white sm:px-7 lg:px-12">
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -left-40 top-20 h-[450px] w-[450px] animate-pulse rounded-full bg-emerald-500/[0.07] blur-[150px]" />
                    <div className="absolute -right-40 top-[35%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.06] blur-[160px] animate-pulse" />
                    <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/[0.05] blur-[130px]" />

                    <div
                        className="absolute inset-0 opacity-[0.12]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
                            backgroundSize: "65px 65px",
                            maskImage: "linear-gradient(to bottom, black, transparent 90%)"
                        }}
                    />
                </div>

                <div className="relative mx-auto max-w-[1550px]">

                    {/* Top label */}
                    <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-5">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                                Cryptova / Market Intelligence
                            </span>
                        </div>

                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                            Digital Asset Analytics
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.35em] text-emerald-400">
                                Performance Analytics
                            </p>

                            <h2 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                                Beyond the
                                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                    Market Numbers.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
                                A deeper look into historical price movements,
                                market capitalization and digital asset activity.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                    <span className="text-emerald-400">◈</span>
                                    Real-time market insights
                                </span>
                                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                    <span className="text-cyan-400">↗</span>
                                    Historical performance
                                </span>
                                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                    <span className="text-violet-400">◎</span>
                                    Multi-asset analytics
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 backdrop-blur-xl">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-lg text-emerald-300">
                                ◈
                            </div>
                            <div>
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                    Selected asset
                                </p>
                                <p className="mt-1 text-sm font-bold text-white">
                                    {this.props.Id || "Crypto Asset"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main dashboard */}
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">

                        {/* Main chart */}
                        <div className="relative min-w-0 overflow-hidden rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#111c2c] via-[#0c1523] to-[#0a101b] p-5 shadow-[0_25px_100px_rgba(0,0,0,0.3)] sm:p-8 xl:col-span-8">

                            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-400/[0.04] blur-[100px]" />

                            <div className="relative mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
                                            Primary visualization
                                        </p>
                                    </div>

                                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                                        Price Performance
                                    </h3>

                                    <p className="mt-2 text-xs text-slate-500">
                                        Historical market price · USD
                                    </p>

                                    <div className="mt-4 flex flex-wrap items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                                        <span>Price history</span>
                                        <span className="h-1 w-1 rounded-full bg-slate-700" />
                                        <span>Volatility trends</span>
                                        <span className="h-1 w-1 rounded-full bg-slate-700" />
                                        <span>Performance tracking</span>
                                    </div>
                                </div>

                                {/* Range selector */}
                                <div className="flex flex-wrap gap-1.5 rounded-2xl border border-white/[0.07] bg-black/30 p-1.5">
                                    {ranges.map((range) => (
                                        <button
                                            key={range.days}
                                            onClick={() => this.changeRange(range.days)}
                                            className={`rounded-xl px-3.5 py-2.5 text-[10px] font-bold tracking-wider transition-all duration-300 ${this.state.selectedRange === range.days
                                                ? "bg-emerald-400 text-[#06140f] shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                                                : "text-slate-500 hover:bg-white/[0.07] hover:text-white"
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative min-h-[260px] min-w-0">
                                {this.state.loading ? (
                                    <div className="flex h-[260px] flex-col items-center justify-center gap-4">
                                        <div className="relative flex h-14 w-14 items-center justify-center">
                                            <div className="absolute inset-0 animate-spin rounded-full border border-emerald-400/20 border-t-emerald-400" />
                                            <span className="text-xl text-emerald-300">◈</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-slate-300">
                                                Analyzing market data
                                            </p>
                                            <p className="mt-2 text-xs text-slate-600">
                                                Fetching historical price movements...
                                            </p>
                                        </div>
                                    </div>
                                ) : this.state.error ? (
                                    <div className="flex h-[350px] flex-col items-center justify-center text-center">
                                        <span className="mb-4 text-3xl text-rose-400">!</span>
                                        <p className="max-w-md text-sm text-rose-300">
                                            {this.state.error}
                                        </p>
                                        <button
                                            onClick={this.fetchData}
                                            className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-xs font-bold text-emerald-300 transition hover:bg-emerald-400/20"
                                        >
                                            Retry data request
                                        </button>
                                    </div>
                                ) : (
                                    <Chart
                                        options={this.state.Price.options}
                                        series={this.state.Price.series}
                                        type="area"
                                        height={this.state.isMobile ? 220 : 760}
                                        width="100%"
                                    />
                                )}
                            </div>

                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
                                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                                    Historical price data
                                </span>
                                <span className="flex items-center gap-2 text-[10px] text-slate-500">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    CoinGecko data source
                                </span>
                            </div>
                        </div>

                        {/* Market intelligence sidebar */}
                        <div className="flex min-w-0 flex-col rounded-[28px] border border-white/[0.09] bg-[#0c1421]/90 p-5 backdrop-blur-xl sm:p-7 xl:col-span-4">

                            <div className="mb-7 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300">
                                        Asset intelligence
                                    </p>
                                    <h3 className="mt-2 text-xl font-bold">
                                        Market Metrics
                                    </h3>

                                    <p className="mt-2 max-w-xs text-[10px] leading-5 text-slate-500">
                                        A consolidated view of essential asset indicators and market activity.
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-lg text-violet-300">
                                    ◈
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col">
                                {metrics.map((item) => (
                                    <div
                                        key={item.title}
                                        className="group relative flex flex-1 items-center justify-between gap-3 border-b border-white/[0.055] py-5 transition-all duration-300 first:pt-2 last:border-0 last:pb-2 hover:translate-x-1"
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color} bg-white/[0.035] text-lg transition duration-300 group-hover:scale-110`}>
                                                {item.symbol}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-[11px] font-medium text-slate-400">
                                                    {item.title}
                                                </p>
                                                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-slate-600">
                                                    Metric {item.number}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="max-w-[48%] text-right">
                                            <p className="break-all text-sm font-bold tracking-tight text-slate-100 sm:text-base">
                                                {item.value ?? "N/A"}
                                            </p>
                                            <div className="mt-2 ml-auto h-[2px] w-8 overflow-hidden rounded-full bg-white/[0.06]">
                                                <div className={`h-full w-full ${item.glow} opacity-60 transition-all duration-500 group-hover:w-full`} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-2xl border border-violet-400/[0.12] bg-gradient-to-br from-violet-400/[0.08] to-transparent p-4">
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-300">
                                    Data insight
                                </p>
                                <p className="mt-2 text-xs leading-6 text-slate-400">
                                    Explore market indicators alongside historical
                                    price movements to understand asset activity.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Secondary analytics */}
                    <div className="mb-5 mt-12 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                                Additional analytics
                            </p>
                            <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                                Market Structure
                            </h3>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                                Examine valuation and trading activity through historical
                                market data, providing additional context beyond price performance.
                            </p>

                            <div className="mt-4 flex items-center gap-2">
                                <span className="h-px w-8 bg-cyan-400/50" />
                                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    Data-driven market analysis
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500">
                            Historical data visualizations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                        {/* Market cap */}
                        <div className="group relative min-w-0 overflow-hidden rounded-[26px] border border-white/[0.08] bg-gradient-to-br from-[#151326] to-[#0c111e] p-5 transition duration-500 hover:border-violet-400/30 sm:p-7">

                            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-400/[0.07] blur-[70px] transition duration-700 group-hover:bg-violet-400/[0.12]" />

                            <div className="relative mb-5 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
                                        01 / Market valuation
                                    </p>
                                    <h4 className="mt-2 text-lg font-bold">
                                        Market Capitalization
                                    </h4>

                                    <p className="mt-2 text-xs text-slate-500">
                                        Historical changes in the asset's total market value.
                                    </p>
                                </div>

                                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-xl text-violet-300">
                                    ◈
                                </span>
                            </div>

                            {this.state.loading ? (
                                <div className="h-[230px] animate-pulse rounded-xl bg-white/[0.035]" />
                            ) : this.state.error ? (
                                <p className="py-16 text-center text-xs text-slate-500">
                                    Market cap chart unavailable.
                                </p>
                            ) : (
                                <Chart
                                    options={this.state.Market_Cap.options}
                                    series={this.state.Market_Cap.series}
                                    type="area"
                                    height={230}
                                    width="100%"
                                />
                            )}
                        </div>

                        {/* Trading volume */}
                        <div className="group relative min-w-0 overflow-hidden rounded-[26px] border border-white/[0.08] bg-gradient-to-br from-[#0e1a25] to-[#0b111c] p-5 transition duration-500 hover:border-cyan-400/30 sm:p-7">

                            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/[0.07] blur-[70px] transition duration-700 group-hover:bg-cyan-400/[0.12]" />

                            <div className="relative mb-5 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                                        02 / Trading activity
                                    </p>
                                    <h4 className="mt-2 text-lg font-bold">
                                        Volume Distribution
                                    </h4>

                                    <p className="mt-2 text-xs text-slate-500">
                                        Trading volume trends across the selected time range.
                                    </p>
                                </div>

                                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-xl text-cyan-300">
                                    ⇄
                                </span>
                            </div>

                            {this.state.loading ? (
                                <div className="h-[230px] animate-pulse rounded-xl bg-white/[0.035]" />
                            ) : this.state.error ? (
                                <p className="py-16 text-center text-xs text-slate-500">
                                    Volume chart unavailable.
                                </p>
                            ) : (
                                <Chart
                                    options={this.state.Tot_Vol.options}
                                    series={this.state.Tot_Vol.series}
                                    type="area"
                                    height={230}
                                    width="100%"
                                />
                            )}
                        </div>
                    </div>

                    {/* Platform highlights */}
                    <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/[0.06] py-8 sm:grid-cols-3 sm:gap-8">
                        <div>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-300">
                                01 / ANALYZE
                            </span>
                            <h3 className="mt-2 text-sm font-semibold text-slate-200">
                                Track market movements
                            </h3>
                            <p className="mt-2 text-xs leading-5 text-slate-500">
                                Follow historical price trends and understand how assets perform over time.
                            </p>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-violet-300">
                                02 / EXPLORE
                            </span>
                            <h3 className="mt-2 text-sm font-semibold text-slate-200">
                                Compare digital assets
                            </h3>
                            <p className="mt-2 text-xs leading-5 text-slate-500">
                                Discover market capitalization, trading volume, and asset-specific insights.
                            </p>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-300">
                                03 / UNDERSTAND
                            </span>
                            <h3 className="mt-2 text-sm font-semibold text-slate-200">
                                Make informed observations
                            </h3>
                            <p className="mt-2 text-xs leading-5 text-slate-500">
                                Use historical market information to identify patterns and market behaviour.
                            </p>
                        </div>
                    </div>

                    {/* footer */}
                    <footer className="mt-5 flex flex-col justify-between gap-3 border-t border-white/[0.07] py-5 sm:flex-row sm:items-center">
                        <p className="text-xs font-black tracking-[0.25em] text-slate-300">
                            CRYPTOVA<span className="text-emerald-400">.</span>
                            <span className="ml-2 font-normal tracking-normal text-slate-600">
                                © 2026
                            </span>
                        </p>

                        <p className="text-[10px] text-slate-600">
                            Market data provided by CoinGecko
                        </p>
                    </footer>

                </div>
            </section>
        );
    }
}

export default ChartSection;
