import {
  BodyNormal,
  SubtitleMedium,
  TextHeadingLarge,
} from "./widgets/CustomText";

export default function Footer() {
  return (
    <section
      data-scroll-section
      id="footer"
      className="bg-white h-fit flex flex-col py-36 justify-center gap-y-9 items-center relative w-full px-5"
      style={{
        backgroundImage: "radial-gradient(#E6E6E6 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div
        className="
      flex
      w-fit
      gap-x-1
      2xl:gap-x-2
      relative
      z-10
      "
      >
        <TextHeadingLarge text="Zikri" />
        <TextHeadingLarge text="UI" color="text-primary-main" />
      </div>
      <BodyNormal
        text="Creating an application and website requires understanding what users want. So don't always focus on amazing designs that are useless to users."
        color="text-neutral-500"
        className="max-w-600 text-center relative z-10"
      />{" "}
      <SubtitleMedium
        text="&copy; 2025 Muhammad Zikrinayah. All rights reserved."
        color="text-primary-main relative z-10"
      />
    </section>
  );
}
