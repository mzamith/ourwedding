import { InviteeAnswer, InviteAnswer } from './Invite';
export interface DetailedInvite {
  id: number;
  name: string;
  invitees: DetailedInvitee[];
  inviteAnswers: InviteAnswer[];
  canAddInvitee: boolean;
  isBlacklisted: boolean;
  team: string;
  lastActive: Date;
}

export interface DetailedInvitee {
  id: number;
  name: string;
  isMainGuest: boolean;
  isNew: boolean;
  inviteeAnswers: InviteeAnswer[];
}
