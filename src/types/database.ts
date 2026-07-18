export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      project_briefs: {
        Row: {
          id: string;
          project_id: string;
          received_at: string;
          summary: string;
          brief: Json;
          current_stage_id: string;
          contact_email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          received_at?: string;
          summary: string;
          brief: Json;
          current_stage_id?: string;
          contact_email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          received_at?: string;
          summary?: string;
          brief?: Json;
          current_stage_id?: string;
          contact_email?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_progress: {
        Row: {
          id: string;
          project_brief_id: string;
          stage_id: string;
          status: "completed" | "in_progress" | "upcoming";
          description: string;
          progress_percentage: number;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_brief_id: string;
          stage_id: string;
          status?: "completed" | "in_progress" | "upcoming";
          description: string;
          progress_percentage?: number;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_brief_id?: string;
          stage_id?: string;
          status?: "completed" | "in_progress" | "upcoming";
          description?: string;
          progress_percentage?: number;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_progress_project_brief_id_fkey";
            columns: ["project_brief_id"];
            isOneToOne: false;
            referencedRelation: "project_briefs";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
