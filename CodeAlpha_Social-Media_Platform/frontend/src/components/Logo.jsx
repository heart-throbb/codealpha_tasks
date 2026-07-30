const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 shadow-sm ring-1 ring-white/20 backdrop-blur">
        <span className="text-lg font-semibold tracking-[0.2em] text-white">
          MS
        </span>
      </div>
      <div>
        <p className="text-lg font-semibold text-white">MiniSocial</p>
        <p className="text-sm text-white/70">Community</p>
      </div>
    </div>
  );
};

export default Logo;
