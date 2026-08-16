

export default function Hero() {
    return (
        <div data-scene-stop className="relative h-dvh w-screen overflow-x-hidden">
            
            <div className="relative z-20 flex h-full flex-col justify-between p-8 font-archivo sm:p-14">
                <header className="max-w-lg">
                    <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                        REY IANN TIGLEY
                    </h1>
                    <p className="mt-4 text-sm text-white/50 sm:text-base">
                        Software engineer working across interfaces,
                        infrastructure, and the seams in between.
                    </p>
                </header>

                <div className="flex items-end justify-between gap-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
                        Scroll
                    </span>

                    <div className="max-w-md text-right">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                            Currently
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                            AVAILABLE FOR WORK
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
