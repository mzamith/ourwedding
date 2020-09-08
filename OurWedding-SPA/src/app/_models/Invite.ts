export interface Invite {
  id: number;
  name: string;
  invitees: Invitee[];
  inviteAnswer: InviteAnswer;
  canAddInvitee: boolean;
  isBlacklisted: boolean;
  lastActive: Date;
}

export interface Invitee {
  id: number;
  name: string;
  isMainGuest: boolean;
  isNew: boolean;
  inviteeAnswer: InviteeAnswer;
}

export interface InviteAnswer {
  id: number;
  comment: string;
  answerDate: Date;
  status: string;
}

export interface InviteeAnswer {
  id: number;
  status: string;
  hasRestriction: boolean;
  restriction: string;
  isAttending: boolean;
  answerDate: Date;
}
