export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Customers: {
        Row: {
          createdAt: string
          id: string
          name: string | null
        }
        Insert: {
          createdAt?: string
          id?: string
          name?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      Orders: {
        Row: {
          approvalPeriod: number | null
          createdAt: string
          customerId: string
          deliveredPeriod: number | null
          id: string
          orderPeriod: number | null
          productId: string
          productQuantity: number
          rejectedPeriod: number | null
          status: Database["public"]["Enums"]["orderStatus"] | null
        }
        Insert: {
          approvalPeriod?: number | null
          createdAt?: string
          customerId: string
          deliveredPeriod?: number | null
          id?: string
          orderPeriod?: number | null
          productId: string
          productQuantity: number
          rejectedPeriod?: number | null
          status?: Database["public"]["Enums"]["orderStatus"] | null
        }
        Update: {
          approvalPeriod?: number | null
          createdAt?: string
          customerId?: string
          deliveredPeriod?: number | null
          id?: string
          orderPeriod?: number | null
          productId?: string
          productQuantity?: number
          rejectedPeriod?: number | null
          status?: Database["public"]["Enums"]["orderStatus"] | null
        }
        Relationships: [
          {
            foreignKeyName: "Orders_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Orders_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
        ]
      }
      ProductionLines: {
        Row: {
          createdAt: string
          id: string
          name: string | null
        }
        Insert: {
          createdAt?: string
          id?: string
          name?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      Products: {
        Row: {
          blueBlocks: number | null
          createdAt: string
          greyBlocks: number | null
          id: string
          price: number | null
          productionSeconds: number | null
          productName: string | null
          redBlocks: number | null
        }
        Insert: {
          blueBlocks?: number | null
          createdAt?: string
          greyBlocks?: number | null
          id?: string
          price?: number | null
          productionSeconds?: number | null
          productName?: string | null
          redBlocks?: number | null
        }
        Update: {
          blueBlocks?: number | null
          createdAt?: string
          greyBlocks?: number | null
          id?: string
          price?: number | null
          productionSeconds?: number | null
          productName?: string | null
          redBlocks?: number | null
        }
        Relationships: []
      }
      PurchaseOrders: {
        Row: {
          createdAt: string
          deliveredPeriod: number | null
          id: string
          orderPeriod: number | null
          workOderId: string | null
        }
        Insert: {
          createdAt?: string
          deliveredPeriod?: number | null
          id?: string
          orderPeriod?: number | null
          workOderId?: string | null
        }
        Update: {
          createdAt?: string
          deliveredPeriod?: number | null
          id?: string
          orderPeriod?: number | null
          workOderId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "PurchaseOrders_workOderId_fkey"
            columns: ["workOderId"]
            isOneToOne: false
            referencedRelation: "WorkOrder"
            referencedColumns: ["id"]
          },
        ]
      }
      WorkOrder: {
        Row: {
          createdAt: string
          id: string
          orderId: string
          planedPeriod: number | null
          productionLineId: string | null
        }
        Insert: {
          createdAt?: string
          id?: string
          orderId: string
          planedPeriod?: number | null
          productionLineId?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          orderId?: string
          planedPeriod?: number | null
          productionLineId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "WorkOrder_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "WorkOrder_productionLineId_fkey"
            columns: ["productionLineId"]
            isOneToOne: false
            referencedRelation: "ProductionLines"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      orderStatus:
        | "InProduction"
        | "ReadyForDelivery"
        | "WaitingForParts"
        | "Delivered"
        | "Rejected"
        | "PendingApproval"
        | "Planning"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      orderStatus: [
        "InProduction",
        "ReadyForDelivery",
        "WaitingForParts",
        "Delivered",
        "Rejected",
        "PendingApproval",
        "Planning",
      ],
    },
  },
} as const
