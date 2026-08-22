export default function About() {
    return (
        // Taller than a viewport, with the content pinned by `sticky` so it
        // holds while the section scrolls past.
        <div className="relative min-h-[200vh] w-screen overflow-x-hidden">
            <div className="sticky top-0 grid h-dvh grid-cols-12 grid-rows-12 gap-x-12 gap-y-4 sm:grid-cols-12">
                <div className="sm:row-start-2 sm:col-start-3 sm:col-span-5">
                    <div className="uppercase tracking-[0.3em] text-white/40 font-mono text-[10px] sm:text-[10px]">
                    01 / About
                </div></div>

            </div>
        </div>
    )
}