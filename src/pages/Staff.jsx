import { motion } from 'framer-motion';
import StaffCard from '../components/staff/StaffCard';
import { Users } from 'lucide-react';

const STAFF_BG = 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/690081f79_generated_9e0332e1.png';

const staffMembers = [
  {
    name: 'Xm6z',
    rank: 'Founder',
    title: 'Founder',
    photo: 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/730ccb9dc_generated_image.png',
    bio: 'The visionary behind Sandy Hills RP. Willy built the server from the ground up — coding custom scripts, designing the economy, and architecting every system players enjoy today.',
    duties: ['Lead developer & architect', 'Server infrastructure', 'Community vision & strategy'],
  },
  {
    name: 'TGELITEGAMER138',
    rank: 'Founder',
    tag: 'Development Director',
    title: 'Dev / Founder',
    photo: 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/54326e99d_generated_image.png',
    bio: 'Co-founder of Sandy Hills RP with a passion for creating immersive roleplay experiences. Works closely with the dev team and oversees community direction.',
    duties: ['Community direction', 'Staff oversight', 'Partnerships & growth'],
  },
  {
    name: 'J',
    rank: 'Founder',
    title: 'Founder',
    photo: 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/54326e99d_generated_image.png',
    bio: 'One of the original founders, J brings a deep passion for FiveM roleplay and a relentless drive to build a community where everyone feels at home.',
    duties: ['Community culture', 'Recruitment strategy', 'Event planning'],
  },
  {
    name: 'zayne.ox',
    rank: 'Developer',
    title: 'Developer',
    photo: 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/8cf68c5e2_generated_image.png',
    bio: 'Oversees the entire staff team and ensures operations run smoothly across all departments. The go-to authority for staff matters and escalations.',
    duties: ['Staff team oversight', 'Moderation policy', 'Escalation handling'],
  },
  {
    name: '701 | K. Sungwoo',
    rank: 'Staff Director',
    title: 'Staff Director',
    photo: 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/8cf68c5e2_generated_image.png',
    bio: 'Oversees the entire staff team and ensures operations run smoothly across all departments. The go-to authority for staff matters and escalations.',
    duties: ['Staff team oversight', 'Moderation policy', 'Escalation handling'],
  },
  {
    name: '_ashizzy_',
    rank: 'Management',
    title: 'Management',
    photo: 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/24dab09cd_generated_image.png',
    bio: 'Core management team member responsible for day-to-day operations, community health, and keeping the server experience top-notch for all players.',
    duties: ['Day-to-day operations', 'Community health', 'Staff support'],
  },
  {
    name: 'Aiden',
    rank: 'Senior Management',
    tag: 'Developer',
    title: 'Senior Management',
    photo: 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/a14d047b9_generated_image.png',
    bio: 'Dedicated management team member focused on player experience, conflict resolution, and making sure every member of Sandy Hills RP feels heard and respected.',
    duties: ['Player experience', 'Conflict resolution', 'Member relations'],
  },
  {
    name: 'devin1970',
    rank: 'Senior Management',
    tag: 'Developer',
    title: 'Senior Management',
    photo: 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/ff6982376_generated_image.png',
    bio: 'Veteran server leader with years of FiveM experience. Devin brings structure and discipline to the senior management layer, mentoring staff and enforcing standards.',
    duties: ['Senior staff mentoring', 'Rule enforcement', 'Standards & discipline'],
  },
  {
    name: 's1p_s',
    rank: 'Senior Management',
    title: 'Senior Management',
    photo: 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/ff6982376_generated_image.png',
    bio: 'Senior management figure with a strong eye for community quality. Works alongside the team to maintain a high standard of roleplay and member conduct.',
    duties: ['Roleplay quality control', 'Community standards', 'Staff training'],
  },
  {
    name: 'Alan',
    rank: 'Moderator',
    title: 'Moderator',
    photo: 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/a14d047b9_generated_image.png',
    bio: 'Front-line moderator keeping the Discord and in-game experience clean, fair, and fun. Alan is the first point of contact for issues and disputes.',
    duties: ['Discord moderation', 'In-game enforcement', 'Ticket handling'],
  },
];

const rankOrder = ['Founder', 'Development Director', 'Developer', 'Staff Director', 'Senior Management', 'Management', 'Head Admin'];
const grouped = rankOrder.map(rank => ({
  rank,
  members: staffMembers.filter(m => m.rank === rank),
})).filter(g => g.members.length > 0);

const rankLabels = {
  Founder: { label: 'FOUNDERS', sub: 'The architects of Sandy Hills RP' },
 'Development Director': { label: 'DEVOLOPMENT DIRECTOR', sub: 'The architects of Sandy Hills RP' },
  Developer: { label: 'DEVELOPER', sub: 'The architects of Sandy Hills RP' },
  'Staff Director': { label: 'STAFF DIRECTOR', sub: 'Overseeing all operations' },
  'Senior Management': { label: 'SENIOR MANAGEMENT', sub: 'Veteran leadership team' },
  Management: { label: 'MANAGEMENT', sub: 'Day-to-day operations' },
  'Head Admin': { label: 'MODERATORS', sub: 'Front-line community guards' },
};

export default function Staff() {
  let cardIndex = 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative h-72 overflow-hidden">
        <img src={STAFF_BG} alt="Staff" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/75 to-background" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
          <div>
            <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">Command Structure</span>
            <h1 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter mt-2">
              The <span className="text-primary">Roster</span>
            </h1>
            <p className="text-muted-foreground mt-3 max-w-md text-sm">
              Meet the dedicated team behind Sandy Hills RP — the people who keep the community alive, fair, and immersive.
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-border bg-secondary/20 px-8 md:px-16 lg:px-24 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-6">
          {[
            { label: 'TOTAL STAFF', value: staffMembers.length },
            { label: 'FOUNDERS', value: 3 },
            { label: 'MANAGEMENT', value: 4 },
            { label: 'DEVELOPORS', value: 4 },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <Users className="w-3.5 h-3.5 text-primary/60" />
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">{s.label}:</span>
              <span className="font-display font-bold text-sm text-foreground">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grouped staff sections */}
      <div className="px-8 md:px-16 lg:px-24 py-12 space-y-16">
        <div className="max-w-6xl mx-auto">
          {grouped.map(({ rank, members }) => {
            const labelInfo = rankLabels[rank];
            const startIndex = cardIndex;
            cardIndex += members.length;
            return (
              <div key={rank} className="mb-16">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <h2 className="font-display font-black text-2xl uppercase tracking-wider">{labelInfo.label}</h2>
                    <p className="font-mono text-[11px] text-muted-foreground tracking-widest mt-0.5">{labelInfo.sub}</p>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                  <span className="font-mono text-xs text-muted-foreground/40">{members.length} MEMBER{members.length !== 1 ? 'S' : ''}</span>
                </div>

                {/* Cards grid — founders get bigger cards */}
                <div className={`grid gap-5 ${
                  rank === 'Founder'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : rank === 'Staff Director'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-2xl'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }`}>
                  {members.map((member, i) => (
                    <StaffCard key={member.name} member={member} index={startIndex + i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}