export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/icon.svg" 
        alt="Fixate" 
        className="h-10 w-10 object-contain"
      />
      <span className="text-2xl font-bold text-primary">
        Fixate
      </span>
    </div>
  );
}
