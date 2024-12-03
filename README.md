# Welcome to the Chega Fácil App repository!

## 🤷 How it works ?
This application aims to simulate the travel request flow using primarily external Google APIs and save the travel history in a SQL database.<br /><br />

## 📜 What was used?

<strong>_General_</strong> <br />
- Docker-compose<br />
- Concurrently<br />

<strong>_Frontend_</strong> <br />
- Javascript/Typescritp<br />
- Vite + React<br />
- Axios<br />
- tailwind<br />
- shad/cn ui<br />
- radix/ui<br />
- Docker<br />

<strong>_Backend_</strong> <br />
- Typescript<br />
- Nest.js<br />
- ORM(Prisma)<br />
- SQL Database(PostgresSQL)<br />
- Postman<br />
- DistanceMatrix(Google API)<br />
- Gecode(Google API)<br />
- Docker<br /><br />


## 💾 UML Data Model

In this project, we provide a UML data model to represent the `Customer`, `Driver` and `Ride` entities. Below is the textual representation of the classes and their relationships:

> *__Customer__*

{
  + id : String [PK]
  + name : String
  + email : String
  + phone : String
  + createdAt : DateTime
  + updatedAt : DateTime
  + isActive : Boolean
  --
  * [UNIQUE] (name, phone, email)
  * [MAPPED] customers

}<br />


> *__Driver__*

+ id : String [PK]
+ name : String
+ email : String
+ description : String
+ phone : String
+ vehicle : String
+ rating : Float
+ lastComment : String
+ rate : Float
+ minimumDistance : Float
+ createdAt : DateTime
+ updatedAt : DateTime
+ isActive : Boolean<br />
--
* [UNIQUE] (name, phone, email)
* [MAPPED] drivers

<br />


> *__Ride__*

+ id : String [PK]
+ customerId : String [FK]
+ driverId : String [FK]
+ driverName : String
+ origin : String
+ destination : String
+ date : DateTime
+ duration : String
+ distance : Float?
+ value : Float?
+ status : RideStatus
+ cancellationReason : String?<br />
--
* [MAPPED] rides

<br />

Enum `RideStatus:`
<br />
{
  + REQUESTED
  + CONFIRMED
  + IN_PROGRESS
  + COMPLETED
  + CANCELLED

}

<br />
__Relationships:__

`Customer` "1" -- "0..*" Ride : has<br />
`Driver` "1" -- "0..*" Ride : drives<br />
`Ride` "1" --> "1" Customer : belongs to<br />
`Ride` "1" --> "1" Driver : assigned to<br />
<br />


## 🌐 Flow application <br />
__>__ Click on the link https://youtu.be/... to see the application flow
<br />

## Guidelines<br />

### 1º Step
Clone the repository:
  ```bash
  git clone git@github.com:oligregz/chega-facil-app.git
  ```


### 2º Step
Access the project directory:
```bash
cd chega-facil-app
```

### 3º Step
Install the project's dependencies in the application's parent directory with the commands:
```bash
npm install
```
then run:
```bash
npm run i-dev-app
```

### 4º Step
Create a `.env` file with the key __GOOGLE_API_KEY__ and add your google maps api key. Use the .env.example located at the root of the project as a reference.
<br />

### 5º Step
Make sure you have Docker and Docker-compose installed on your machine and run:
```bash
docker-compose up
```

If you want to leave your terminal free, use the command:
```bash
docker-compose up --build -d 
```
<br />


## 👀 Interface Route <br />

> __Use app on port 80__

__>__ http://localhost:80/

<br />


## 📖 Api Routes <br />

__[DEVELOPMENT]__ <br />

> __💈 Hello__
<br />

__>__ __[GET]__ http://localhost:8080/ <br /><br />

> __💈 List Customers__
<br />

__>__ __[GET]__ http://localhost:8080/customers <br /><br />

> __💈 Create Customer__
<br />

__>__ __[POST]__ http://localhost:8080/customers <br />

*Body*
```
{
  "name": "asd",
  "email": "asd@example.com",
  "phone": "+00 00000000",
  "isActive": true
}
```
<br />

__[PRODUCTION]__ <br />

> __💈 Estimate and search drivers for this ride__
<br />

__>__ __[POST]__ http://localhost:8080/ride/estimate <br />

*Body*
```
{
  "customer_id": "customer_id_value",
  "origin": "New York, USA",
  "destination": "Philadelphia, USA"
}
```
<br /><br />

> __💈 Confirm ride__
<br />

__>__ __[PATCH]__ http://localhost:8080/ride/confirm <br />

*Body*
```
{
  "customer_id": "customer_id_value",
  "origin": "New York, USA",
  "destination": "Philadelphia, USA"
  "distance": 1512,
  "duration": "111 minutos",
  "driver": {
    "id": "driver_id_value",
    "name": "driver_name"   
  },
  "value": 120.36
}

```
<br /><br />

> __💈 List rides history by customer and/or driver__
<br />

__>__ __[GET]__ http://localhost:8080/ride/<customer_id>?driver_id=<driver_id>

<br />
