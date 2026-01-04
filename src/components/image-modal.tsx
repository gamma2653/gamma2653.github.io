import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export default function ImageModal({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/75 transition-opacity" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative max-w-7xl w-full">
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close modal"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>

            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
