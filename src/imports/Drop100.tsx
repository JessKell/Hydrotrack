import svgPaths from "./svg-xz14zubh27";

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute inset-[0.16%_0_0.02%_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 230 315.483">
          <path d={svgPaths.p27ada900} fill="var(--fill-0, #D7D7D7)" id="Vector" />
        </svg>
      </div>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 230 316.058">
        <path d={svgPaths.p1e337900} fill="var(--fill-0, #1275A7)" id="Vector" />
      </svg>
      <p className="absolute font-['Georgia:Bold',sans-serif] leading-[normal] left-[30px] not-italic text-[64px] text-white top-[168.5px]">100%</p>
    </div>
  );
}

export default function Drop() {
  return (
    <div className="relative size-full" data-name="drop-100">
      <Group />
    </div>
  );
}