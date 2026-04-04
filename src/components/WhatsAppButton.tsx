import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/33792020629"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contatta Clara Maria su WhatsApp"
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:scale-105 hover:bg-green-600"
    >
      <MessageCircle size={28} />
    </a>
  );
};
