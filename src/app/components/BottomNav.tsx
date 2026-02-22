import { Link } from "react-router";
import svgPaths from "../../imports/svg-sjzitmnufw";

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

interface BottomNavProps {
  activePage: "home" | "history" | "settings";
}

export function BottomNav({ activePage }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 content-stretch flex items-center justify-between bg-white px-[27px] py-[7px] max-w-[393px] mx-auto">
      <Link
        to="/"
        className={`content-stretch flex flex-col items-center px-[16px] py-[8px] relative rounded-[2px] shrink-0 w-[70px] no-underline ${
          activePage === "home" ? "bg-[rgba(18,117,167,0.12)]" : ""
        }`}
      >
        <MdiDrop />
        <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-[32px] whitespace-pre-wrap">
          Home
        </p>
      </Link>
      <Link
        to="/history"
        className={`content-stretch flex flex-col items-center px-[16px] py-[8px] relative rounded-[2px] shrink-0 w-[69px] no-underline ${
          activePage === "history" ? "bg-[rgba(18,117,167,0.12)]" : ""
        }`}
      >
        <MaterialSymbolsHistory />
        <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[12px] text-black w-[min-content] whitespace-pre-wrap">
          History
        </p>
      </Link>
      <Link
        to="/settings"
        className={`content-stretch flex flex-col items-center px-[16px] py-[8px] relative rounded-[2px] shrink-0 w-[74px] no-underline ${
          activePage === "settings" ? "bg-[rgba(18,117,167,0.12)]" : ""
        }`}
      >
        <MaterialSymbolsSettingsOutline />
        <p className="font-['Satoshi:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[12px] text-black w-[min-content] whitespace-pre-wrap">
          Settings
        </p>
      </Link>
    </div>
  );
}