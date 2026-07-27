import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { toast } from '@heroui/react';
import Cookies from "js-cookie"
import { GoogleIcon, Logo } from '@/Components/Elements/Icons'
import { LineChart, Wallet, BellRing, KeyRound, Zap, Radar, Network, Lock, Sparkles, Globe2, ArrowUpRight, TrendingUp, ShieldCheck } from "lucide-react";

export default function Loginpage() {
    const root_url = process.env.NEXT_PUBLIC_ROOT_URL

    const handleSuccess = async (credentials: CredentialResponse) => {
        const token = credentials.credential
        try {
            const response = await fetch(root_url + "/auth",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                }
            );

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            Cookies.set('lt', JSON.stringify(data))
            window.location.href = '/home'
        } catch (error) {
            console.error("Google authentication failed:", error);
            throw error; // Re-throw so the caller can handle it
        }
    }

    const features = [
        {
            icon: LineChart,
            title: "Real-time price pulse",
            body: "Millisecond market data across 120+ assets, 30+ exchanges, streamed straight into your dashboard."
        },
        {
            icon: Wallet,
            title: "Unified portfolio",
            body: "Track spot, DeFi, staked, and NFT holdings in one glassy view. Break it down by chain, coin or vibe."
        },
        {
            icon: KeyRound,
            title: "Non-custodial vault",
            body: "You hold the keys. We provide the fortress. Hardware-backed signing built into the browser."
        },
        {
            icon: BellRing,
            title: "Smart alerts",
            body: "Whale moves, breakout patterns, funding flips — get pinged before the crowd catches on."
        },
        {
            icon: Zap,
            title: "1-click swaps",
            body: "Best route across DEX aggregators, MEV-protected, settled in under two seconds on average."
        },
        {
            icon: Radar,
            title: "On-chain radar",
            body: "AI-scored risk on every token, contract audit summaries, and rug-pull heuristics on tap."
        }
    ];

    const cards = [
        {
            icon: Network,
            title: "Truly decentralized",
            body: "No middlemen. No borders. Move value across the globe on infrastructure owned by nobody and everybody.",
            span: "md:col-span-7",
            tone: "from-pulse-600/25 to-transparent"
        },
        {
            icon: Lock,
            title: "Vault-grade security",
            body: "Multi-sig cold storage, biometric approvals, and quantum-ready encryption safeguard every asset.",
            span: "md:col-span-5",
            tone: "from-indigo-600/25 to-transparent"
        },
        {
            icon: Sparkles,
            title: "Compounding growth",
            body: "Staking, yield loops and DeFi strategies auto-optimized by our on-chain intelligence engine.",
            span: "md:col-span-5",
            tone: "from-fuchsia-600/25 to-transparent"
        },
        {
            icon: Globe2,
            title: "Radical transparency",
            body: "Every transaction, every reserve, every proof — publicly verifiable, cryptographically undeniable.",
            span: "md:col-span-7",
            tone: "from-cyan-600/20 to-transparent"
        }
    ];

    return (
        <div className=''>

            {/* Header */}
            <header
                data-testid="site-header"
                className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl"
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
                    <Logo />
                    <nav className="hidden items-center gap-10 text-sm text-white/70 md:flex" data-testid="site-nav">
                        <a href="#why" className="transition-colors hover:text-white" data-testid="nav-why">Why Crypto</a>
                        <a href="#features" className="transition-colors hover:text-white" data-testid="nav-features">Features</a>
                        <a href="#markets" className="transition-colors hover:text-white" data-testid="nav-markets">Markets</a>
                        <a href="#faq" className="transition-colors hover:text-white" data-testid="nav-faq">FAQ</a>
                    </nav>
                    <div className='relative flex'>
                        <div data-testid="header-google-login-btn" className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors duration-300 hover:border-pulse-400/60 hover:bg-white/10" >
                            <GoogleIcon />
                            <span className="hidden sm:inline">Sign in with Google</span>
                            <span className="sm:hidden">Sign in</span>
                            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-glow-sm transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                        <div className='absolute opacity-0'>
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={() => {
                                    toast.danger('Login Failed');
                                }}
                            />
                        </div>
                    </div>

                </div>
            </header>

            {/* Hero Section */}
            <section data-testid="hero-section" className="relative isolate overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 noise" >
                {/* Ambient orbs */}

                <div className="mx-auto max-w-7xl flex justify-center items-center gap-16 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
                    {/* Left: text */}
                    <div className="lg:col-span-7 fade-up flex flex-col items-center">
                        <span data-testid="hero-eyebrow" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-pulse-200 backdrop-blur" >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pulse-400" />
                            </span>
                            Live · $2.4T Market Pulse
                        </span>

                        <h1 data-testid="hero-title" className="mt-8 font-display text-5xl font-black text-center leading-[0.95] tracking-tighter sm:text-6xl lg:text-[76px]" >
                            Feel the <span className="text-gradient">pulse</span>
                            <br />
                            of crypto market.
                        </h1>

                        <p data-testid="hero-subtitle" className="mt-8 max-w-2xl font-body text-lg text-center font-light leading-relaxed text-white/70" >
                            Track live cryptocurrency prices, analyze real-time candlestick charts, and monitor market trends with powerful tools designed for traders and investors.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <div data-testid="hero-google-login-btn" className="group text-black relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-4 py-3.5 text-sm font-semibold text-ink-950 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow" >
                                <GoogleIcon className="h-5 w-5" />
                                Login with Google
                                {/* <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> */}
                            </div>
                            <div className='absolute opacity-0  '>
                                <GoogleLogin
                                    onSuccess={handleSuccess}
                                    onError={() => {
                                        toast.danger('Login Failed');
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why CryptoPulse */}
            <section
                id="why"
                data-testid="why-crypto-section"
                className="relative overflow-hidden py-28 lg:py-36"
            >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="pointer-events-none absolute left-1/2 top-40 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-pulse-700/20 blur-[160px]" />

                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <p
                                data-testid="why-crypto-eyebrow"
                                className="text-[11px] font-bold uppercase tracking-[0.28em] text-pulse-400"
                            >
                                — Why crypto now
                            </p>
                            <h2
                                data-testid="why-crypto-title"
                                className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-tighter sm:text-5xl lg:text-[56px]"
                            >
                                A new financial layer,
                                <br />
                                built <span className="text-gradient">for the many.</span>
                            </h2>
                        </div>
                        <p className="max-w-md font-body text-base leading-relaxed text-white/60">
                            The dollar was invented in 1792. Crypto rewrote the rules in 2009.
                            Here&apos;s why the next decade belongs to on-chain money — and to
                            the people who show up early.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
                        {cards.map((c, i) => {
                            const Icon = c.icon;
                            return (
                                <article
                                    key={c.title}
                                    data-testid={`why-card-${i}`}
                                    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 p-8 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 ${c.span} shine`}
                                >
                                    <div
                                        className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br ${c.tone} blur-3xl opacity-70`}
                                    />
                                    <div className="relative flex h-full flex-col justify-between gap-10">
                                        <div>
                                            <div className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-pulse-300">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">
                                                {c.title}
                                            </h3>
                                            <p className="mt-3 max-w-lg font-body text-[15px] leading-relaxed text-white/60">
                                                {c.body}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40 transition-colors group-hover:text-pulse-300">
                                            Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                    <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-pulse-400/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section
                id="features"
                data-testid="features-section"
                className="relative overflow-hidden py-28 lg:py-36"
            >
                {/* Background image, very subtle */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1750969185331-e03829f72c7d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHw0fHxmdXR1cmlzdGljJTIwZGFyayUyMGFic3RyYWN0JTIwbmV0d29yayUyMHB1cnBsZXxlbnwwfHx8fDE3ODQyMTUwOTl8MA&ixlib=rb-4.1.0&q=85')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        maskImage:
                            "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 20%, transparent 70%)"
                    }}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="max-w-3xl">
                        <p
                            data-testid="features-eyebrow"
                            className="text-[11px] font-bold uppercase tracking-[0.28em] text-pulse-400"
                        >
                            — Features
                        </p>
                        <h2
                            data-testid="features-title"
                            className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-tighter sm:text-5xl lg:text-[56px]"
                        >
                            Everything you need,
                            <br />
                            <span className="text-gradient">nothing you don&apos;t.</span>
                        </h2 >
                        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/60">
                            Six pillars, one platform.Crptopulse combines pro - grade market
                            tooling with the calm minimalism of a mindful investor & apos;s app.
                        </p >
                    </div >

                    <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((f, i) => {
                                const Icon = f.icon;
                                return (
                                    <div
                                        key={f.title}
                                        data-testid={`feature-card-${i}`}
                                        className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-ink-800/50 p-7 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1.5 shine"
                                    >
                                        <div className="mb-6 inline-grid h-12 w-12 place-items-center rounded-2xl bg-pulse-500/10 text-pulse-300 ring-1 ring-inset ring-pulse-500/20">
                                            < Icon className="h-5 w-5" />
                                        </div >
                                        <h3 className="font-display text-xl font-bold tracking-tight text-white">
                                            {f.title}
                                        </h3 >
                                        <p className="mt-3 font-body text-[15px] leading-relaxed text-white/60">
                                            {f.body}
                                        </p >
                                        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                                            < span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                                                0{i + 1} / 06
                                            </span >
                                            <span className="text-[10px] font-semibold uppercase tracking-widest text-pulse-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                Available now
                                            </span >
                                        </div >
                                    </div >
                                );
                            })
                        }
                    </div >
                </div >
            </section >

            {/* Footer */}
            <footer className="relative overflow-hidden py-24" data-testid="cta-footer">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pulse-600/25 blur-[160px]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pulse-400">— Start today</p>
                    <h2 className="mt-6 font-display text-4xl font-black leading-[1] tracking-tighter sm:text-5xl lg:text-[64px]">
                        Your next chapter of wealth
                        <br />
                        starts <span className="text-gradient">with one click.</span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-white/60">
                        Join over 1.2 million investors already riding the pulse. No card, no
                        fee, no fluff — just Google, and you&apos;re in.
                    </p>
                </div>

                <div className="relative mx-auto mt-24 flex max-w-7xl flex-col items-start justify-between gap-8 border-t border-white/5 px-6 pt-10 text-sm text-white/40 lg:flex-row lg:items-center lg:px-10">
                    <Logo />
                    <p className="text-xs">© {new Date().getFullYear()} Crptopulse Labs. All rights reserved.</p>
                </div>
            </footer>
        </div >
    )
}