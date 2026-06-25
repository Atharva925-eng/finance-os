import { ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import Modal from './Modal';
import { cn } from '../lib/utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function BottomSheet({ isOpen, onClose, title, children, className }: BottomSheetProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  // Desktop view renders a standard centered Modal
  if (!isMobile) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={title} className={className}>
        {children}
      </Modal>
    );
  }

  // Mobile view renders a sliding Bottom Sheet
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Sheet Body */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={cn(
              "relative w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 rounded-t-[2rem] p-6 shadow-xl z-10 flex flex-col max-h-[85vh] pb-8",
              className
            )}
          >
            {/* Slide pill handle */}
            <div className="flex justify-center mb-3">
              <div className="w-12 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-50 dark:border-slate-800/50 mb-4">
              {title ? (
                <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                  {title}
                </h3>
              ) : <div />}
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-750 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
                aria-label="Close sheet"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-none">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
