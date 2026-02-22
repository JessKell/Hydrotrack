import svgPaths from "./svg-zhpseacnrk";

export default function Decoration() {
  return (
    <div className="relative size-full" data-name="decoration">
      <div className="absolute inset-[-72.82%_-70.39%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 684.137 674.647">
          <g filter="url(#filter0_f_1_409)" id="decoration">
            <path d={svgPaths.p185d2460} fill="var(--fill-0, #1275A7)" fillOpacity="0.2" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="674.647" id="filter0_f_1_409" width="684.137" x="1.07121e-09" y="2.37306e-08">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_409" stdDeviation="100" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}