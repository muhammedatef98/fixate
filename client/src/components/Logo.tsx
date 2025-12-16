function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/logo-icon-only.png" 
        alt="Fixate" 
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}

export { Logo };
export default Logo;
