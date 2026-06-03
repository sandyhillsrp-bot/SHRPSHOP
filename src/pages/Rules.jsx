import { motion } from 'framer-motion';
import RuleCard from '../components/rules/RuleCard';
import { CheckCircle } from 'lucide-react';

const RULES_BG = 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/8bf7932cb_generated_b4fbcee1.png';

const rules = [
  {
    number: '01',
    title: 'Respect Everyone',
    color: 'green',
    severity: 'escalating',
    items: [
      'Be respectful to all members at all times',
      'No harassment, discrimination, threats, or personal attacks',
      'Zero tolerance for racism, sexism, homophobia, or slurs',
    ],
  },
  {
    number: '02',
    title: 'Discord TOS Compliance',
    color: 'yellow',
    severity: 'ban',
    items: [
      'Follow Discord Terms of Service & Community Guidelines',
      'Any ToS violation may result in immediate staff action',
    ],
  },
  {
    number: '03',
    title: 'No Drama / Toxicity',
    color: 'red',
    severity: 'escalating',
    items: [
      'Do not start or escalate arguments',
      'Keep disagreements civil or take them to DMs',
      'Do not argue staff decisions publicly',
    ],
  },
  {
    number: '04',
    title: 'No Spam / Advertising',
    color: 'blue',
    severity: 'kick',
    items: [
      'No message, emoji, caps, or mic spam',
      'No mass-pinging members or roles',
      'No advertising or self-promotion without staff approval',
    ],
  },
  {
    number: '05',
    title: 'Stay On Topic',
    color: 'purple',
    severity: 'warning',
    items: [
      'Use channels for their intended purpose',
      'Read channel descriptions before posting',
      'Off-topic content goes in designated channels',
    ],
  },
  {
    number: '06',
    title: 'No NSFW Content',
    color: 'red',
    severity: 'ban',
    items: [
      'No NSFW, sexual, graphic, or disturbing content',
      'Includes images, videos, links, usernames, nicknames, and profile pictures',
    ],
  },
  {
    number: '07',
    title: 'No Impersonation',
    color: 'yellow',
    severity: 'kick',
    items: [
      'Do not impersonate staff, law enforcement, or other members',
      'Fake staff tags, ranks, or names are not allowed',
    ],
  },
  {
    number: '08',
    title: 'Respect Staff & Command',
    color: 'green',
    severity: 'escalating',
    items: [
      'Follow all instructions from staff or command',
      'Disputes must be handled via tickets or DMs',
      'Abuse toward staff results in harsher punishment',
    ],
  },
  {
    number: '09',
    title: 'Voice Channel Rules',
    color: 'blue',
    severity: 'kick',
    items: [
      'No ear-rape, soundboards, music spam, or loud/disruptive noise',
      'Push-to-talk may be required',
      'Staff may mute, move, or disconnect users',
    ],
  },
  {
    number: '10',
    title: 'Alt Accounts & Ban Evasion',
    color: 'red',
    severity: 'permban',
    items: [
      'Alt accounts must be approved by staff',
      'Ban evasion = PERMANENT BAN',
    ],
  },
];

export default function Rules() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative h-64 overflow-hidden">
        <img src={RULES_BG} alt="Rules section" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
          <div>
            <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">Server Regulations</span>
            <h1 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter mt-2">
              In-Game <span className="text-primary">Rules</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Severity legend */}
      <div className="px-8 md:px-16 lg:px-24 pt-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-8 p-4 bg-secondary/30 border border-border rounded-xl">
            <span className="font-mono text-[10px] text-muted-foreground tracking-widest self-center mr-2">SEVERITY SCALE:</span>
            {[
              { label: 'WARNING', style: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
              { label: 'KICK', style: 'bg-orange-500/10 text-orange-400 border-orange-500/30' },
              { label: 'BAN', style: 'bg-red-500/10 text-red-400 border-red-500/30' },
              { label: 'PERM BAN', style: 'bg-rose-900/30 text-rose-400 border-rose-500/30' },
              { label: 'WARNING → BAN', style: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
            ].map((s) => (
              <span key={s.label} className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider border ${s.style}`}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Rules grid */}
      <div className="px-8 md:px-16 lg:px-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule, i) => (
              <RuleCard key={rule.number} rule={rule} index={i} />
            ))}
          </div>

          {/* Accept CTA */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-4">By joining the Sandy Hills RP Discord, you confirm you understand and agree to follow all rules.</p>
            <a
              href="https://discord.gg/hd6VJUBBb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm tracking-widest uppercase rounded-lg hover:shadow-[0_0_30px_rgba(255,184,0,0.2)] transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              ACCEPT & JOIN SERVER
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}