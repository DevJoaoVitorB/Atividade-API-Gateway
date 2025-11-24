## Documentação da Atividade - API Gateway + Service REST e SOAP

### 🧑🏽‍💻 Desenvolvedores

| Nome                      | GitHub                                                                               |
| :-----------------------: | :----------------------------------------------------------------------------------: |
| **João Vitor Bezerra**    | [![GitHub](https://skillicons.dev/icons?i=github)](https://github.com/DevJoaoVitorB) |
| **Isaac Lira Nascimento** | [![GitHub](https://skillicons.dev/icons?i=github)](https://github.com/IsaacLira42)   |

<br>

### 🎯 Objetivo

Construir uma arquitetura onde uma **API Gateway** (ponto único público) traduz, orquestra e documenta chamadas entre **clientes** e **dois serviços internos** - *REST* e *SOAP*. Evidenciar: *HATEOAS*, *WSDL do SOAP*, *OpenAPI/Swagger do Gateway*, e clientes em linguagens diferentes usando o *WSDL*.

<br>

### 💼 Estudo de Caso — Archives Transfer 

Sistema para transmissão de arquivos entre o cliente web e servidores internos. O **API Gateway** centraliza o acesso público e coordena a comunicação entre os serviços **REST e SOAP**, responsáveis respectivamente pelos **metadados** e pelo **conteúdo dos arquivos**.

* **Service A** (*REST*): gerencia metadados dos arquivos (nome, tamanho, dono, timestamp). `Porta: 8000`.  
* **Service B** (*SOAP*): armazena e recupera o conteúdo dos arquivos (*base64* - **codificar bytes em texto ASCII**). Expondo UploadFile, DownloadFile, ListFiles. `Porta: 8001`.  
* **API Gateway**: expõe endpoints **REST públicos** consumidos pelo **Web Client**, realizando a **orquestração** e **tradução** entre o **Service A** (*REST*) e o **Service B** (*SOAP*). Implementa **HATEOAS** nas respostas para garantir navegação **RESTful**. `Porta: 3000`.  
* **Web Client**: formulário para **upload, listagem e download** via Gateway.
* **Clients**: clientes externos em **linguagens distintas do servidor** (*a definir*), que irão **consumir diretamente o Service SOAP** utilizando o WSDL publicado. Cada cliente demonstrará como o WSDL é utilizado para gerar as requisições e interpretar as respostas, evidenciando a interoperabilidade do protocolo SOAP.

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
│   │   ├── routes/             # Endpoints públicos (files, upload, download)
│   │   ├── services/           # Adaptadores para REST (Service A) e SOAP (Service B)
│   │   ├── middlewares/        # CORS, logger, auth, error handler
│   │   ├── utils/              # Funções auxiliares, builder HATEOAS
│   │   └── server.ts           # Entrypoint do Gateway
│   ├── swagger/
│   │   └── swagger.json        # Documentação OpenAPI 3.0
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── service-rest/               # Service A - REST (Express + Prisma)
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/        # FileController.ts
│   │   ├── routes/             # files.routes.ts
│   │   ├── repositories/       # Prisma Client wrappers
│   │   ├── services/           # Regras de negócio (CRUD)
│   │   └── server.ts           # Entrypoint Express
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── service-soap/               # Service B - SOAP (node-soap / strong-soap)
│   ├── src/
│   │   ├── wsdl/               # Arquivo .wsdl e schemas XSD (ou gerado dinamicamente)
│   │   ├── services/           # UploadFile, DownloadFile, ListFiles
│   │   └── server.ts
│   ├── storage/                # Armazenamento local de arquivos
│   ├── package.json
│   └── tsconfig.json
│
├── web-client/                 # Next.js + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── api/
│   │   └── hooks/
│   ├── package.json
│   └── tailwind.config.js
│
├── README.md
└── .gitignore
```

<br>

### ⚙️ Ferramentas (Stack)

| Camada                 | Tecnologia                              | Função                                    |
| :--------------------: | :-------------------------------------: | :---------------------------------------: |
| **API Gateway**        | Express + Swagger UI                    | Tradução e orquestração entre REST e SOAP |
| **Service REST**       | Express + Prisma + PostgreSQL           | CRUD de metadados de arquivos             |
| **Service SOAP**       | node-soap / strong-soap                 | Armazenamento binário em base64 e WSDL    |
| **Cliente Web**        | Next.js + TypeScript + Tailwind         | Interface para upload/listagem/download   |
| **Banco**              | PostgreSQL                              | Armazenar metadados                       |
| **Gerenciamento**      | pnpm                                    | Dependências centralizadas                |
| **Controle de versão** | Git + GitHub                            | Versionamento e colaboração               |

### Apresentação
[canva](https://www.canva.com/design/DAG5ciIXF1Q/E36RH0XZKbDsbykoXPcCsg/edit)
