export type InteractionState = 'idle' | 'focused' | 'typing' | 'processing' | 'success' | 'error' | 'listening' | 'speaking';

export type PageType = 'home' | 'core' | 'writing' | 'virtual' | 'voice' | 'insights';

export interface FormState {
  email: string;
  password: string;
}

export interface OrbProps {
  state: InteractionState;
}

export interface LoginCardProps {
  onInteractionChange: (state: InteractionState) => void;
  interactionState: InteractionState;
  onLoginSuccess?: () => void;
}
