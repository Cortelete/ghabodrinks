import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface LinkButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  delay?: number;
}

export function LinkButton({ icon: Icon, label, onClick, delay = 0 }: LinkButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onClick={onClick}
      className="group relative w-full flex items-center p-3 mb-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white/90 group-hover:scale-110 transition-transform duration-300">
        <Icon size={16} />
      </div>
      
      <span className="flex-1 text-center font-sans text-sm font-medium text-white/90 tracking-wide group-hover:text-white transition-colors">
        {label}
      </span>
      
      <div className="w-8" /> {/* Spacer for centering */}
    </motion.button>
  );
}
