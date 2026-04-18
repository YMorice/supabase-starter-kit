export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      Caractéristiques: {
        Row: {
          allocation_fonds_euro_pct: string | null
          allocation_uc_pct: string | null
          anciennete_fiscale_annees: string | null
          clause_beneficiaire: string | null
          client_id: string | null
          code_produit: string | null
          contrat_id: string | null
          crd_eur: string | null
          date_echeance: string | null
          duree_initiale_mois: string | null
          garanties: string | null
          libelle_produit: string | null
          mensualite_eur: string | null
          plafond_carte_eur: string | null
          plafond_eur: string | null
          taux_pct: string | null
        }
        Insert: {
          allocation_fonds_euro_pct?: string | null
          allocation_uc_pct?: string | null
          anciennete_fiscale_annees?: string | null
          clause_beneficiaire?: string | null
          client_id?: string | null
          code_produit?: string | null
          contrat_id?: string | null
          crd_eur?: string | null
          date_echeance?: string | null
          duree_initiale_mois?: string | null
          garanties?: string | null
          libelle_produit?: string | null
          mensualite_eur?: string | null
          plafond_carte_eur?: string | null
          plafond_eur?: string | null
          taux_pct?: string | null
        }
        Update: {
          allocation_fonds_euro_pct?: string | null
          allocation_uc_pct?: string | null
          anciennete_fiscale_annees?: string | null
          clause_beneficiaire?: string | null
          client_id?: string | null
          code_produit?: string | null
          contrat_id?: string | null
          crd_eur?: string | null
          date_echeance?: string | null
          duree_initiale_mois?: string | null
          garanties?: string | null
          libelle_produit?: string | null
          mensualite_eur?: string | null
          plafond_carte_eur?: string | null
          plafond_eur?: string | null
          taux_pct?: string | null
        }
        Relationships: []
      }
      "Contrats produits": {
        Row: {
          client_id: string | null
          code_produit: string | null
          contrat_id: string | null
          date_ouverture: string | null
          devise: string | null
          encours_eur: string | null
          famille_produit: string | null
          libelle_produit: string | null
          statut: string | null
        }
        Insert: {
          client_id?: string | null
          code_produit?: string | null
          contrat_id?: string | null
          date_ouverture?: string | null
          devise?: string | null
          encours_eur?: string | null
          famille_produit?: string | null
          libelle_produit?: string | null
          statut?: string | null
        }
        Update: {
          client_id?: string | null
          code_produit?: string | null
          contrat_id?: string | null
          date_ouverture?: string | null
          devise?: string | null
          encours_eur?: string | null
          famille_produit?: string | null
          libelle_produit?: string | null
          statut?: string | null
        }
        Relationships: []
      }
      "Evénements et interactions": {
        Row: {
          canal: string | null
          categorie: string | null
          client_id: string | null
          criticite: string | null
          date: string | null
          description: string | null
          type: string | null
        }
        Insert: {
          canal?: string | null
          categorie?: string | null
          client_id?: string | null
          criticite?: string | null
          date?: string | null
          description?: string | null
          type?: string | null
        }
        Update: {
          canal?: string | null
          categorie?: string | null
          client_id?: string | null
          criticite?: string | null
          date?: string | null
          description?: string | null
          type?: string | null
        }
        Relationships: []
      }
      "Flux financiers": {
        Row: {
          client_id: string | null
          date: string | null
          depenses_eur: string | null
          dont_exceptionnel_eur: number | null
          dont_prime_eur: string | null
          dont_salaire_eur: string | null
          epargne_nette_eur: string | null
          revenus_eur: string | null
          type_exceptionnel: string | null
        }
        Insert: {
          client_id?: string | null
          date?: string | null
          depenses_eur?: string | null
          dont_exceptionnel_eur?: number | null
          dont_prime_eur?: string | null
          dont_salaire_eur?: string | null
          epargne_nette_eur?: string | null
          revenus_eur?: string | null
          type_exceptionnel?: string | null
        }
        Update: {
          client_id?: string | null
          date?: string | null
          depenses_eur?: string | null
          dont_exceptionnel_eur?: number | null
          dont_prime_eur?: string | null
          dont_salaire_eur?: string | null
          epargne_nette_eur?: string | null
          revenus_eur?: string | null
          type_exceptionnel?: string | null
        }
        Relationships: []
      }
      Foyer: {
        Row: {
          ages_enfants: string | null
          annee_acquisition_residence: string | null
          client_id: string | null
          conjoint_age: string | null
          conjoint_nom: string | null
          conjoint_prenom: string | null
          nb_enfants: number | null
          personnes_a_charge: number | null
          regime_matrimonial: string | null
          situation_familiale: string | null
          type_logement: string | null
          valeur_estimee_residence_eur: string | null
        }
        Insert: {
          ages_enfants?: string | null
          annee_acquisition_residence?: string | null
          client_id?: string | null
          conjoint_age?: string | null
          conjoint_nom?: string | null
          conjoint_prenom?: string | null
          nb_enfants?: number | null
          personnes_a_charge?: number | null
          regime_matrimonial?: string | null
          situation_familiale?: string | null
          type_logement?: string | null
          valeur_estimee_residence_eur?: string | null
        }
        Update: {
          ages_enfants?: string | null
          annee_acquisition_residence?: string | null
          client_id?: string | null
          conjoint_age?: string | null
          conjoint_nom?: string | null
          conjoint_prenom?: string | null
          nb_enfants?: number | null
          personnes_a_charge?: number | null
          regime_matrimonial?: string | null
          situation_familiale?: string | null
          type_logement?: string | null
          valeur_estimee_residence_eur?: string | null
        }
        Relationships: []
      }
      "Historique valorisation contrats": {
        Row: {
          client_id: string | null
          code_produit: string | null
          contrat_id: string | null
          date: string | null
          encours_eur: string | null
        }
        Insert: {
          client_id?: string | null
          code_produit?: string | null
          contrat_id?: string | null
          date?: string | null
          encours_eur?: string | null
        }
        Update: {
          client_id?: string | null
          code_produit?: string | null
          contrat_id?: string | null
          date?: string | null
          encours_eur?: string | null
        }
        Relationships: []
      }
      "Historique valorisation support": {
        Row: {
          date: string | null
          isin: string | null
          libelle: string | null
          vl_eur: string | null
        }
        Insert: {
          date?: string | null
          isin?: string | null
          libelle?: string | null
          vl_eur?: string | null
        }
        Update: {
          date?: string | null
          isin?: string | null
          libelle?: string | null
          vl_eur?: string | null
        }
        Relationships: []
      }
      "Indices marché": {
        Row: {
          code_indice: string | null
          date: string | null
          libelle_indice: string | null
          valeur: string | null
        }
        Insert: {
          code_indice?: string | null
          date?: string | null
          libelle_indice?: string | null
          valeur?: string | null
        }
        Update: {
          code_indice?: string | null
          date?: string | null
          libelle_indice?: string | null
          valeur?: string | null
        }
        Relationships: []
      }
      "Profil client": {
        Row: {
          adresse: string | null
          age: number | null
          agence: string | null
          anciennete_banque_annees: string | null
          archetype: string | null
          canal_prefere: string | null
          civilite: string | null
          client_id: string | null
          code_postal: number | null
          conseiller_attitre: string | null
          csp: string | null
          date_entree_banque: string | null
          date_naissance: string | null
          email: string | null
          etape_vie: string | null
          nom: string | null
          prenom: string | null
          profil_risque: string | null
          revenus_annuels_declares: number | null
          score_equipement: number | null
          segmentation: string | null
          sensibilite_marche: string | null
          sexe: string | null
          telephone: number | null
          tmi_pct: number | null
          ville: string | null
        }
        Insert: {
          adresse?: string | null
          age?: number | null
          agence?: string | null
          anciennete_banque_annees?: string | null
          archetype?: string | null
          canal_prefere?: string | null
          civilite?: string | null
          client_id?: string | null
          code_postal?: number | null
          conseiller_attitre?: string | null
          csp?: string | null
          date_entree_banque?: string | null
          date_naissance?: string | null
          email?: string | null
          etape_vie?: string | null
          nom?: string | null
          prenom?: string | null
          profil_risque?: string | null
          revenus_annuels_declares?: number | null
          score_equipement?: number | null
          segmentation?: string | null
          sensibilite_marche?: string | null
          sexe?: string | null
          telephone?: number | null
          tmi_pct?: number | null
          ville?: string | null
        }
        Update: {
          adresse?: string | null
          age?: number | null
          agence?: string | null
          anciennete_banque_annees?: string | null
          archetype?: string | null
          canal_prefere?: string | null
          civilite?: string | null
          client_id?: string | null
          code_postal?: number | null
          conseiller_attitre?: string | null
          csp?: string | null
          date_entree_banque?: string | null
          date_naissance?: string | null
          email?: string | null
          etape_vie?: string | null
          nom?: string | null
          prenom?: string | null
          profil_risque?: string | null
          revenus_annuels_declares?: number | null
          score_equipement?: number | null
          segmentation?: string | null
          sensibilite_marche?: string | null
          sexe?: string | null
          telephone?: number | null
          tmi_pct?: number | null
          ville?: string | null
        }
        Relationships: []
      }
      "Projet objectifs": {
        Row: {
          client_id: string | null
          date_declaration: string | null
          horizon_annees: number | null
          montant_cible_eur: number | null
          priorite: string | null
          projet: string | null
        }
        Insert: {
          client_id?: string | null
          date_declaration?: string | null
          horizon_annees?: number | null
          montant_cible_eur?: number | null
          priorite?: string | null
          projet?: string | null
        }
        Update: {
          client_id?: string | null
          date_declaration?: string | null
          horizon_annees?: number | null
          montant_cible_eur?: number | null
          priorite?: string | null
          projet?: string | null
        }
        Relationships: []
      }
      "Support détenus": {
        Row: {
          classe_actif: string | null
          client_id: string | null
          contrat_id: string | null
          date_premier_achat: string | null
          devise: string | null
          isin: string | null
          libelle: string | null
          poids_dans_contrat_pct: string | null
          position_id: string | null
          quantite: string | null
          secteur: string | null
          valorisation_courante_eur: string | null
          zone_geo: string | null
        }
        Insert: {
          classe_actif?: string | null
          client_id?: string | null
          contrat_id?: string | null
          date_premier_achat?: string | null
          devise?: string | null
          isin?: string | null
          libelle?: string | null
          poids_dans_contrat_pct?: string | null
          position_id?: string | null
          quantite?: string | null
          secteur?: string | null
          valorisation_courante_eur?: string | null
          zone_geo?: string | null
        }
        Update: {
          classe_actif?: string | null
          client_id?: string | null
          contrat_id?: string | null
          date_premier_achat?: string | null
          devise?: string | null
          isin?: string | null
          libelle?: string | null
          poids_dans_contrat_pct?: string | null
          position_id?: string | null
          quantite?: string | null
          secteur?: string | null
          valorisation_courante_eur?: string | null
          zone_geo?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
