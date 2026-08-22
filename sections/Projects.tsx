export default function Projects() {
    return (
        // Taller than a viewport, with the content pinned by `sticky` so it
        // holds while the section scrolls past.
        <div className="relative min-h-[200vh] w-screen overflow-x-hidden">
            <div className="sticky top-0 flex h-dvh items-center">
                <div className="grid w-full grid-cols-12 gap-x-12 gap-y-4 p-8 font-archivo sm:p-14">
                    <div className="sm:col-span-6 sm:col-start-3">
                        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                            02 / Projects
                        </div>
                        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                            SELECTED WORK
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
