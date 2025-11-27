## Documentação da Atividade - API Gateway + Service REST e SOAP

### 🧑🏽‍💻 Desenvolvedores

| Nome                      | GitHub                                                                               |
| :-----------------------: | :----------------------------------------------------------------------------------: |
| **João Vitor Bezerra**    | [![GitHub](https://skillicons.dev/icons?i=github)](https://github.com/DevJoaoVitorB) |
| **Isaac Lira Nascimento** | [![GitHub](https://skillicons.dev/icons?i=github)](https://github.com/IsaacLira42)   |

<br>

### 🎯 Objetivo

Construir uma arquitetura onde uma **API Gateway** (ponto único público) traduz, orquestra e documenta chamadas entre **clientes** e **dois serviços internos** - *REST* e *SOAP*. Evidenciar: *HATEOAS*, *WSDL do SOAP* e *OpenAPI/Swagger do Gateway*.

<br>

### 💼 Estudo de Caso — Archives Transfer 

Sistema para transmissão de arquivos entre o cliente web e servidores internos. O **API Gateway** centraliza o acesso público e coordena a comunicação entre os serviços **REST e SOAP**, responsáveis respectivamente pelos **metadados** e pelo **conteúdo dos arquivos**.

* **Service REST**: gerencia metadados dos arquivos (nome, tamanho, dono, timestamp) usando **Prisma + SQLite**. Expõe endpoints REST para CRUD completo. `Porta: 8000`.  
* **Service SOAP**: armazena e recupera o conteúdo dos arquivos (*base64*) no sistema de arquivos local. Expõe operações WSDL: `UploadFile`, `DownloadFile`, `ListFiles`. `Porta: 8001`.  
* **API Gateway**: ponto único de entrada que expõe endpoints **REST públicos** consumidos pelo **Web Client**. Realiza a **orquestração** e **tradução** entre o **Service REST** e o **Service SOAP**. Implementa **HATEOAS** nas respostas e documenta via **Swagger/OpenAPI**. `Porta: 4000`.  
* **Web Client**: interface desenvolvida em **Next.js** com formulários para **upload, listagem e download** de arquivos via API Gateway. `Porta: 3000`.

<br>

### 📡 Fluxo de Comunicação (PRINCIPAL)

#### 1. Cliente Web envia requisições REST para o API Gateway (`/files`, `/files/upload`, `/files/{id}/download`, etc).

#### 2. API Gateway (REST):

* Recebe, valida e documenta (*Swagger*).
* Chama o Service A (*REST*) para registrar/consultar metadados.
* Encaminha o conteúdo (*base64*) para o Service B (*SOAP*) que armazena ou recupera os dados binários.

#### 3. O Gateway responde em JSON, incluindo links HATEOAS como `_links.self` e `_links.download`, que possibilitam navegação entre os recursos de forma totalmente RESTful.

<br>

### 🗂️ Estrutura de Pastas 

```text
archives-transfer/
├── api-gateway/                # API Gateway (Express + Swagger + HATEOAS)
│   ├── src/
│   │   ├── @types/             # Definições de tipos TypeScript
│   │   │   ├── FileMeta.ts
│   │   │   └── strong-soap.d.ts
│   │   ├── config/             # Configurações (Swagger)
│   │   ├── controllers/        # FileGatewayController.ts
│   │   ├── middlewares/        # errorHandler.ts
│   │   ├── routes/             # files.routes.ts (endpoints públicos)
│   │   ├── services/           # Adaptadores REST e SOAP
│   │   │   ├── RestServiceGateway.ts
│   │   │   └── SoapServiceGateway.ts
│   │   ├── swagger/            # swagger.json (OpenAPI 3.0)
│   │   ├── utils/              # buildHateoas.ts
│   │   ├── app.ts              # Configuração do Express
│   │   └── server.ts           # Entrypoint
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── tsconfig.json
│
├── service-rest/               # Service REST (Express + Prisma + SQLite)
│   ├── prisma/
│   │   ├── schema.prisma       # Modelo de dados
│   │   ├── dev.db              # Banco SQLite
│   │   └── migrations/         # Histórico de migrações
│   ├── src/
│   │   ├── config/             # prisma.ts, swagger.ts
│   │   ├── controller/         # FileController.ts
│   │   ├── generated/          # Cliente Prisma gerado
│   │   ├── repository/         # FileRepository.ts
│   │   ├── service/            # FileService.ts (lógica de negócio)
│   │   ├── types/dto/          # File.dto.ts
│   │   ├── Routes.ts           # Definição de rotas
│   │   ├── app.ts              # Configuração Express
│   │   └── server.ts           # Entrypoint
│   ├── package.json
│   └── tsconfig.json
│
├── service-soap/               # Service SOAP (strong-soap)
│   ├── src/
│   │   ├── services/           # fileService.ts (UploadFile, DownloadFile, ListFiles)
│   │   ├── wsdl/               # fileService.wsdl (contrato SOAP)
│   │   └── server.ts           # Servidor SOAP
│   ├── storage/                # Armazenamento físico de arquivos
│   ├── @types/                 # strong-soap.d.ts
│   ├── package.json
│   └── tsconfig.json
│
├── web_client/                 # Next.js 16 + React 19 + Tailwind CSS 4
│   ├── app/                    # App Router do Next.js
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── src/
│   │   ├── components/         # FileList.tsx, FileUpload.tsx, Providers.tsx
│   │   ├── hooks/              # useFiles.ts (React Query)
│   │   ├── services/           # api.ts (cliente Axios)
│   │   └── types/              # api.ts (tipos TypeScript)
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   └── tailwind.config.js
│
├── README.md
└── .gitignore
```

<br>

### ⚙️ Ferramentas (Stack)

| Camada                 | Tecnologia                              | Função                                    |
| :--------------------: | :-------------------------------------: | :---------------------------------------: |
| **API Gateway**        | Express 5 + Swagger UI + Axios          | Tradução e orquestração entre REST e SOAP |
| **Service REST**       | Express 5 + Prisma 6 + SQLite           | CRUD de metadados de arquivos             |
| **Service SOAP**       | Express 5 + strong-soap 5               | Armazenamento binário em base64 e WSDL    |
| **Cliente Web**        | Next.js 16 + React 19 + Tailwind CSS 4  | Interface para upload/listagem/download   |
| **Estado Cliente**     | TanStack React Query 5                  | Gerenciamento de estado e cache           |
| **Banco de Dados**     | SQLite                                  | Armazenar metadados                       |
| **ORM**                | Prisma 6                                | Modelagem e migrations                    |
| **Validação**          | Zod 4                                   | Validação de schemas TypeScript           |
| **Gerenciador**        | pnpm                                    | Dependências e workspaces                 |
| **Runtime**            | Node.js + TypeScript 5                  | Ambiente de execução                      |
| **Controle de versão** | Git + GitHub                            | Versionamento e colaboração               |

### 🚀 Como Executar o Projeto

#### Pré-requisitos

- Node.js 20+ instalado
- pnpm instalado (`npm install -g pnpm`)

#### 1. Instalar Dependências

Em cada serviço, execute:

```bash
# No diretório api-gateway/
cd archives-transfer/api-gateway
pnpm install

# No diretório service-rest/
cd ../service-rest
pnpm install

# No diretório service-soap/
cd ../service-soap
pnpm install

# No diretório web_client/
cd ../web_client
pnpm install
```

#### 2. Configurar Variáveis de Ambiente

Configure os arquivos `.env` para cada serviço copiando os exemplos:

**API Gateway:**
```bash
cd archives-transfer/api-gateway
cp .env.example .env
# Edite .env se necessário (portas padrão: REST=8000, SOAP=8001, Gateway=4000)
```

**Service REST:**
```bash
cd archives-transfer/service-rest
cp .env.example .env
# O DATABASE_URL já está configurado para SQLite local
```

**Service SOAP:**
```bash
cd archives-transfer/service-soap
cp .env.example .env
# O diretório de storage será criado automaticamente
```

**Web Client:**
```bash
cd archives-transfer/web_client

# Opção 1: Detectar IP automaticamente (Linux/WSL) - para acesso em rede
echo "NEXT_PUBLIC_API_GATEWAY_URL=http://$(hostname -I | awk '{print $1}'):4000" > .env.local

# Opção 2: Configurar manualmente (substitua pelo IP da sua máquina)
echo "NEXT_PUBLIC_API_GATEWAY_URL=http://10.25.1.144:4000" > .env.local

# Opção 3: Para desenvolvimento local apenas
echo "NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:4000" > .env.local
```

> **Nota**: Se não configurar o Web Client, o padrão será `http://localhost:4000`

#### 3. Configurar Banco de Dados (Service REST)

```bash
cd archives-transfer/service-rest
pnpm prisma migrate dev
pnpm prisma generate
```

#### 4. Configurar Variáveis de Ambiente - Acesso via Rede (Opcional)

Se você quiser que outros dispositivos na rede acessem a aplicação, configure todos os serviços com o IP da máquina:

```bash
# Detectar IP automaticamente (Linux/WSL)
MY_IP=$(hostname -I | awk '{print $1}')
echo "Seu IP: $MY_IP"

# API Gateway - atualizar URLs dos serviços internos se estiverem em máquinas diferentes
cd archives-transfer/api-gateway
cat > .env << EOF
PORT=4000
REST_SERVICE_URL=http://localhost:8000
SOAP_SERVICE_URL=http://localhost:8001/fileService
EOF

# Web Client - usar o IP para acesso via rede
cd ../web_client
echo "NEXT_PUBLIC_API_GATEWAY_URL=http://$MY_IP:4000" > .env.local
```

> **⚠️ Importante**: Para acesso via rede, todos os servidores já estão configurados para escutar em `0.0.0.0`, permitindo conexões externas.

#### 5. Executar os Serviços

Abra **4 terminais** diferentes e execute:

**Terminal 1 - Service SOAP (porta 8001):**
```bash
cd archives-transfer/service-soap
pnpm dev
```

**Terminal 2 - Service REST (porta 8000):**
```bash
cd archives-transfer/service-rest
pnpm dev
```

**Terminal 3 - API Gateway (porta 4000):**
```bash
cd archives-transfer/api-gateway
pnpm dev
```

**Terminal 4 - Web Client (porta 3000):**
```bash
cd archives-transfer/web_client
pnpm dev
```

#### 6. Acessar a Aplicação

- **Web Client**: http://localhost:3000
- **API Gateway (Swagger)**: http://localhost:4000/api-docs
- **Service REST (Swagger)**: http://localhost:8000/api-docs
- **Service SOAP (WSDL)**: http://localhost:8001/wsdl?wsdl

<br>

### 📋 Endpoints Principais

#### API Gateway (porta 4000)

| Método | Endpoint              | Descrição                          |
|--------|----------------------|---------------------------------|
| GET    | `/files`             | Lista todos os arquivos         |
| POST   | `/files/upload`      | Upload de arquivo (multipart)   |
| GET    | `/files/download/:id`| Download de arquivo por ID      |

#### Service REST (porta 8000)

| Método | Endpoint    | Descrição                  |
|--------|------------|----------------------------|
| GET    | `/files`   | Lista metadados            |
| POST   | `/files`   | Cria registro de metadados |
| GET    | `/files/:id` | Busca metadados por ID   |
| PUT    | `/files/:id` | Atualiza metadados       |
| DELETE | `/files/:id` | Remove metadados         |

#### Service SOAP (porta 8001)

- **UploadFile**: Envia conteúdo em base64
- **DownloadFile**: Recupera conteúdo em base64
- **ListFiles**: Lista arquivos disponíveis

<br>

### 🔗 HATEOAS

O API Gateway implementa HATEOAS nas respostas JSON, incluindo links de navegação:

```json
{
  "id": 1,
  "name": "documento.pdf",
  "size": 1024,
  "_links": {
    "self": { "href": "/files/1" },
    "download": { "href": "/files/download/1" },
    "delete": { "href": "/files/1", "method": "DELETE" }
  }
}
```

<br>

### 📝 WSDL do Serviço SOAP

O contrato WSDL está disponível em: `http://localhost:8001/wsdl?wsdl`

Operações expostas:
- `UploadFile(filename: string, content: string)`: Retorna `{ success: boolean, message: string }`
- `DownloadFile(filename: string)`: Retorna `{ success: boolean, content: string }`
- `ListFiles()`: Retorna `{ files: string[] }`

<br>

### 🧪 Testando a Integração

1. Acesse o Web Client em http://localhost:3000
2. Faça upload de um arquivo
3. Verifique a lista de arquivos
4. Faça download do arquivo
5. Consulte o Swagger do Gateway para ver a documentação completa

<br>

### 📚 Apresentação
[Canva - Slides do Projeto](https://www.canva.com/design/DAG5ciIXF1Q/E36RH0XZKbDsbykoXPcCsg/edit)
