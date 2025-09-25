# Arquitetura do Sistema HBT Content Strategist

## Diagrama de Arquitetura

```mermaid
graph TB
    subgraph "Frontend (Vue 3 + Vuetify)"
        A[App.vue] --> B[Router]
        B --> C[Views]
        C --> D[Components]
        D --> E[Stores - Pinia]
        E --> F[Composables]
    end
    
    subgraph "Backend (Supabase)"
        G[PostgreSQL] --> H[Row Level Security]
        H --> I[Auth System]
        I --> J[Real-time Subscriptions]
    end
    
    subgraph "Deploy (Vercel)"
        K[Static Files] --> L[CDN]
        L --> M[Edge Functions]
    end
    
    subgraph "External APIs"
        N[Instagram API]
        O[Google Ads API]
        P[Meta Ads API]
        Q[ActiveCampaign CRM]
    end
    
    A --> G
    E --> G
    F --> G
    
    K --> A
    M --> G
    
    G --> N
    G --> O
    G --> P
    G --> Q
```

## Fluxo de Dados

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant S as Supabase
    participant E as External APIs
    
    U->>F: Login
    F->>S: Authenticate
    S-->>F: JWT Token
    
    U->>F: Create Content
    F->>S: Save Content
    S-->>F: Success
    
    U->>F: Generate Variations
    F->>E: AI API Call
    E-->>F: Generated Content
    F->>S: Save Variations
    
    U->>F: Schedule Post
    F->>E: Instagram API
    E-->>F: Scheduled
    F->>S: Update Status
```

## Estrutura de Componentes

```mermaid
graph TD
    A[App.vue] --> B[Navigation Rail]
    A --> C[App Bar]
    A --> D[Main Content]
    
    B --> E[Cockpit]
    B --> F[Funnels]
    B --> G[Pipeline]
    B --> H[Library]
    B --> I[Instagram]
    B --> J[Metrics]
    B --> K[CRM]
    
    D --> L[Router View]
    L --> M[Dashboard]
    L --> N[Editor]
    L --> O[Calendar]
    L --> P[Funnel Builder]
    L --> Q[Gamification]
    
    C --> R[Launcher Menu]
    C --> S[User Menu]
    C --> T[Context Bar]
```

## Sistema de Stores (Pinia)

```mermaid
graph LR
    A[Auth Store] --> B[User Management]
    A --> C[Permissions]
    
    D[Content Store] --> E[Content Items]
    D --> F[Briefs]
    D --> G[Assets]
    
    H[Funnel Store] --> I[Funnel Nodes]
    H --> J[Funnel Edges]
    H --> K[Templates]
    
    L[Workspace Store] --> M[Brands]
    L --> N[Teams]
    L --> O[Settings]
    
    P[Simulation Store] --> Q[Demo Mode]
    P --> R[Client Simulation]
```

## Fluxo de Autenticação

```mermaid
graph TD
    A[User Login] --> B{Valid Credentials?}
    B -->|Yes| C[Supabase Auth]
    B -->|No| D[Show Error]
    
    C --> E[Get User Metadata]
    E --> F{Is Hibrit Staff?}
    F -->|Yes| G[Full Access]
    F -->|No| H[Client Access]
    
    G --> I[Admin Panel]
    G --> J[All Features]
    
    H --> K[Brand Workspace]
    H --> L[Limited Features]
    
    K --> M[RLS Applied]
    M --> N[Brand Data Only]
```

## Sistema de Roteamento

```mermaid
graph TD
    A[/] --> B[/cockpit]
    
    B --> C[/cockpit/ocs]
    B --> D[/content-center]
    B --> E[/funnel-center]
    
    F[/pipeline] --> G[/editor/:id]
    H[/library] --> I[/metrics]
    J[/funnels] --> K[/funnels/:id]
    
    L[/labs] --> M[/labs/scientific-laboratories]
    L --> N[/labs/neural-research-engine]
    L --> O[/labs/interface-test]
    
    P[/admin] --> Q[/tasks]
    P --> R[/setup-admin]
    
    S[/channels/instagram] --> T[/channels/youtube]
    S --> U[/channels/blog]
    
    V[/gamification] --> W[/gamification/operacao-anti-ghosting]
```

## Estrutura de Banco de Dados

```mermaid
erDiagram
    BRANDS ||--o{ WORKSPACES : has
    BRANDS ||--o{ CONTENT_ITEMS : creates
    WORKSPACES ||--o{ USERS : contains
    
    CONTENT_ITEMS ||--|| PILLARS : uses
    CONTENT_ITEMS ||--|| ANGLES : uses
    CONTENT_ITEMS ||--|| FORMATS : uses
    CONTENT_ITEMS ||--|| MOLDS : uses
    
    FUNNEL_NODES ||--o{ FUNNEL_EDGES : connects
    FUNNEL_NODES ||--|| FUNNEL_TEMPLATES : based_on
    
    CONTENT_ITEMS ||--o{ COPY_VERSIONS : has
    CONTENT_ITEMS ||--o{ ASSETS : contains
    CONTENT_ITEMS ||--o{ METRIC_ENTRIES : tracks
    
    BRANDS {
        int id PK
        string name
        string slug
        jsonb settings
        timestamp created_at
    }
    
    CONTENT_ITEMS {
        int id PK
        int brand_id FK
        string title
        int pillar_id FK
        int angle_id FK
        int format_id FK
        int mold_id FK
        text offer
        text proof
        text cta
        string status
        timestamp scheduled_at
    }
    
    FUNNEL_NODES {
        int id PK
        string name
        string type
        jsonb position
        jsonb data
        int funnel_id FK
    }
```

## Sistema de Deploy

```mermaid
graph LR
    A[Git Repository] --> B[Vercel]
    B --> C[Build Process]
    C --> D[Static Files]
    D --> E[CDN]
    E --> F[Users]
    
    G[Supabase] --> H[Database]
    G --> I[Auth]
    G --> J[Storage]
    
    K[Environment Variables] --> B
    L[Domain] --> E
```

## Fluxo de Desenvolvimento

```mermaid
graph TD
    A[Local Development] --> B[npm run dev]
    B --> C[Vite Dev Server]
    C --> D[Hot Reload]
    
    E[Code Changes] --> F[Git Commit]
    F --> G[Push to Repository]
    G --> H[Vercel Deploy]
    H --> I[Production Build]
    I --> J[Live Site]
    
    K[Database Changes] --> L[SQL Migrations]
    L --> M[Supabase CLI]
    M --> N[Production DB]
```

## Monitoramento e Analytics

```mermaid
graph TD
    A[User Actions] --> B[Event Tracking]
    B --> C[Analytics Store]
    C --> D[Performance Metrics]
    
    E[Content Performance] --> F[Instagram API]
    F --> G[Metric Entries]
    G --> H[KPI Dashboard]
    
    I[Funnel Analytics] --> J[Conversion Tracking]
    J --> K[Win Rate Calculation]
    K --> L[Executive Dashboard]
    
    M[System Health] --> N[Error Tracking]
    N --> O[Performance Monitoring]
    O --> P[Alert System]
```
