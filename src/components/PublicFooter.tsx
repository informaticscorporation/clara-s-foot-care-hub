import { Link } from "react-router-dom";
import { FootLogo } from "./FootLogo";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";

export const PublicFooter = () => {
  return (
    <footer className="bg-muted/50 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <FootLogo size="md" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cura professionale dei piedi con passione e competenza. 
              La tua salute podologica è la nostra priorità.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="neu-circle p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="neu-circle p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Link Rapidi
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/chi-siamo", label: "Chi Siamo" },
                { href: "/servizi", label: "Servizi" },
                { href: "/prenota", label: "Prenota Appuntamento" },
                { href: "/contatti", label: "Contatti" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Contatti
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span>Via Roma 123, 00100 Roma (RM)</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+39 333 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={18} className="text-primary shrink-0" />
                <span>info@claramariapodologa.it</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Orari di Apertura
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Lun - Ven</p>
                  <p>09:00 - 19:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Sabato</p>
                  <p>09:00 - 13:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Clara Maria Di Nofa - Podologa. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};
