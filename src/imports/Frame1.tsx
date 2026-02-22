import svgPaths from "./svg-sjzitmnufw";

function MdiDrop() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:drop">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:drop">
          <path d={svgPaths.p247c3700} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[rgba(18,117,167,0.12)] content-stretch flex flex-col h-[54px] items-center justify-center px-[16px] py-[8px] relative rounded-[2px] shrink-0 w-[70px]">
      <MdiDrop />
      <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-[32px] whitespace-pre-wrap">Home</p>
    </div>
  );
}

function MaterialSymbolsHistory() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:history">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:history">
          <path d={svgPaths.p111e9c0} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center px-[16px] py-[8px] relative shrink-0 w-[69px]">
      <MaterialSymbolsHistory />
      <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[12px] text-black w-[min-content] whitespace-pre-wrap">History</p>
    </div>
  );
}

function MaterialSymbolsSettingsOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:settings-outline">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:settings-outline">
          <path d={svgPaths.p2a0efc00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center px-[16px] py-[8px] relative shrink-0 w-[74px]">
      <MaterialSymbolsSettingsOutline />
      <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[12px] text-black w-[min-content] whitespace-pre-wrap">Settings</p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between px-[27px] py-[7px] relative size-full">
      <Frame3 />
      <Frame2 />
      <Frame1 />
    </div>
  );
}