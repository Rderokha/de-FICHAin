'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ title, children, onClose }: ModalProps) {
  // Detiene propagación del clic dentro del modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick} // Cierra modal al hacer clic fuera
      >
        <motion.div
          key="modal"
          className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={stopPropagation} // Evita que el clic dentro del modal lo cierre
        >
          <h2 className="text-stone-500 font-semibold mb-4 ">{title}</h2>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}