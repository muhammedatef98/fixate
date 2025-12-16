function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/icon-only.png" 
        alt="Fixate" 
        className="h-10 w-10 object-contain"
      />
      <span className="text-2xl font-bold text-primary">
        Fixate
      </span>
    </div>
  );
}

export { Logo };
export default Logo;
