export default function AdLabel() {
  return (
    <div
      className="
        w-screen
        md:w-full
        relative
        left-1/2
        md:left-0
        -translate-x-1/2
        md:translate-x-0
        bg-gray-200
        md:bg-transparent
        py-2
        mb-1
      "
    >
      <div
        className="
          max-w-[900px]
          md:max-w-[1200px]
          mx-auto
          px-4
          flex
          items-center
          justify-center
          gap-3
        "
      >
        <div className="flex-1 h-px bg-gray-300" />

        <span
          className="
            text-[14px]
            font-bold
            tracking-[2px]
            uppercase
            text-gray-500
            whitespace-nowrap
          "
        >
          ADVERTISEMENT
        </span>

        <div className="flex-1 h-px bg-gray-300" />
      </div>
    </div>
  );
}