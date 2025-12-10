export interface AddVoiceConfig {
  voice_title: string;
  channle_name: string;
  channle_event: string;
  voice_save_type: number;
  voice_url?: string;
  voice_path?: string;
  note: string;
}

export interface UpdateVoiceConfig extends AddVoiceConfig {
  id: number;
}

export interface VoiceConfigItem {
  id: number;
  voice_title: string;
  channle_name: string;
  channle_event: string;
  voice_save_type: number;
  voice_url: string | null;
  voice_path: string;
  voice_file: string;
  note: string;
  created_at: string;
  sort: number;
  voice_use_url: string;
}
