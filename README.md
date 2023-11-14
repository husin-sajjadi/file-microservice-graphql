# NestJS Microservices Project

This repository contains the code for a microservices-based application developed with NestJS, GraphQL, and TypeORM, leveraging MySQL as the database system. The project is split into two main microservices: the File Microservice and the Gateway Microservice.

## Microservices Overview

- **File Microservice**: Responsible for handling file operations. Users can upload images encoded in base64, which this service will process.
- **Gateway Microservice**: Acts as the entry point for the clients, routing requests to the appropriate services and handling any inter-service communication.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (LTS version)
- npm package manager
- MySQL server running on your local machine or a remote instance
- Create your own db

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-project-name.git
   cd your-project-name

2. Install the dependencies:
   ```bash
   cd file
   npm install
   cd ../gateway
   npm install
   
3. Configure your MySQL database settings by modifying ormconfig.ts :
   ```bash
   type: 'mysql',
   host: 'localhost',
   port: 3306,
   username: 'your_db_username',
   password: 'your_db_password',
   entityPrefix: 'f_',
   database: 'your_own_db',
   logging: false,
   entities: ['dist/**/*.entity{.ts,.js}'],
   synchronize: true,
   migrations: ['**/src/db/migrations/*.js']

## Running the Services
1. Start the File Microservice:
   ```bash
   cd file
   npm run start:dev
   
2. Start the Gateway Microservice:
   ```bash
   cd gateway
   npm run start:dev

Both services should now be running and able to communicate with each other.

## Usage
To upload images through the File Microservice, send a GraphQL mutation with the image encoded in base64 to the Gateway Microservice which will route it to the File Microservice.

1. GraphQL Upload mutation:
   ```graphql
   mutation {
     uploadBase64(
       uploadFileInput: {
         size : 12365
         base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
         name: "originalImageName.png"
         fileCategory: "images"
         mimetype: "image/png"
         ownerId : "2bb49bc2-c477-4541-8277-3686a531a776"
         extension: "png"
       }
     ) {
       id
       size
       name
       slug
       ownerId
       fileCategory
     }
   }

2. GraphQL get file by id:
   ```graphql
   query{
      file(id : "e548d99e-e2a6-4c1c-aef7-a77f93da39af"){
       id
       created
       updated
       slug
       mimetype
       size
       extension
       fileCategory
       ownerId
       name
     }
   }
   
3. GraphQL get all files:
   ```graphql
   query{
      files{
       id
       created
       updated
       slug
       mimetype
       size
       extension
       fileCategory
       ownerId
       name
     }
   }
   
4. Get the file from slug to download or show on the img tag:
   ```html
   http://localhost:3003/file/{slug}
   <img src="http://localhost:3003/file/47591372-e678-4a2f-8d0a-78c4d2e2ef08.png" alt="image" />
## Note on Slug Usage

For integrations with other microservices, particularly those requiring user profiles or similar entities, the slug object can be utilized as a unique identifier within URL paths. This slug can serve as a 'profile URL' column or be used in a similar capacity to facilitate clean, readable, and SEO-friendly URLs.

When designing your database schema or service architecture, consider the slug as a persistent and unique reference to individual records that can be safely exposed in client-facing URLs.
## Contact

For any inquiries or further discussion regarding this project, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/husin-sajjadi).
