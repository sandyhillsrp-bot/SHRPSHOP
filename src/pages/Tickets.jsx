import { motion } from 'framer-motion';
import { MessageSquare, AlertTriangle, UserPlus, HelpCircle } from 'lucide-react';
import TicketButton from '../components/tickets/TicketButton';

const TICKETS_BG = 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/5de097e8e_generated_d4e02452.png';

const ticketTypes = [
  {
    icon: MessageSquare,
    title: 'General Support',
    description: 'Questions about the server, your account, or anything else. Our team is here to help you get started or resolve any concerns.',
    staff: ['Willy', 'J', 'Xm6z'],
  },
  {
    icon: AlertTriangle,
    title: 'Report a Player',
    description: 'Submit evidence of rule-breaking behavior. All reports are reviewed confidentially by the command staff.',
    staff: ['Alan', '701 | K. Sungwoo', '_ashizzy_'],
  },
  {
    icon: UserPlus,
    title: 'Staff Application',
    description: 'Think you have what it takes? Apply to join the Sandy Hills RP staff team and help shape the community.',
    staff: ['Willy', 'Xm6z', 'J'],
  },
  {
    icon: HelpCircle,
    title: 'Bug Report / Feedback',
    description: 'Found a bug in the FiveM server or have suggestions? Let us know so we can keep improving the experience.',
    staff: ['Aiden', 'devin1970', 's1p_s'],
  },
];

export default function Tickets() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <img src={TICKETS_BG} alt="Dispatch terminal" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
          <div>
            <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">Dispatch Terminal</span>
            <h1 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter mt-2">
              The <span className="text-primary">Precinct</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Ticket types */}
      <div className="px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground mb-8 max-w-lg"
          >
            Select a ticket category below. All tickets are handled on Discord by our command staff. 
            You'll be redirected to our server to open your request.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ticketTypes.map((ticket, i) => (
              <TicketButton key={ticket.title} {...ticket} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}