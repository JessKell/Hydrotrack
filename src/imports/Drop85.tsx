import svgPaths from "./svg-kbto93kfxb";

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute inset-[0_0_0.02%_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 230 315.483">
          <path d={svgPaths.p27ada900} fill="var(--fill-0, #D7D7D7)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[25.35%_0_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 230 235.558">
          <path d={svgPaths.pd316980} fill="var(--fill-0, #1275A7)" id="Vector" />
        </svg>
      </div>
      <p className="absolute font-['Georgia:Bold',sans-serif] leading-[normal] left-[46px] not-italic text-[64px] text-white top-[168px]">85%</p>
    </div>
  );
}

export default function Drop() {
  return (
    <div className="relative size-full" data-name="drop-85">
      <Group />
    </div>
  );
}