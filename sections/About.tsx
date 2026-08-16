export default function About() {
    return (
        // Two viewports, two camera beats: the "ALL ABOUT ME" title card, then
        // the pulled-back view this copy reads over. The content is pinned with
        // `sticky`, which is how the section buys scroll length without spacers.
        <div
            data-scene-stop="2"
            className="relative min-h-[200vh] w-screen overflow-x-hidden"
        >
            <div className="sticky top-0 grid h-dvh grid-cols-12 grid-rows-12 gap-x-12 gap-y-4 sm:grid-cols-12">
                <div className="sm:row-start-8 sm:col-start-3 sm:col-span-5">
                    <div className="uppercase tracking-[0.3em] text-white/40 font-mono text-[10px] sm:text-[10px]">
                    01 / About
                </div></div>

            </div>
        </div>
    )
}