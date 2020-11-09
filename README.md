# AGENDA - API - TYPESCRIPT - TYPEORM

API Desafio Agenda.
Foi Utilizado uma Imagem de Docker postgres como banco de dados.
```
docker run --name postgres-0 -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
```

## Required:

- npm i; para instalar as dependencias.
- npm run build; para construir.
- npm run typeorm migration:run; execute o comando de migrations 2 vezes, estando dentro do diretorio dist.


- [EndPoints](#EndPoints)

## EndPoints

- [Users](#users)
- [Tasks](#tasks)

### Users

EndPoints:
- CREATE - POST - 127.0.0.1:3000/users
- LIST - GET - 127.0.0.1:3000/users
- FINDONE - GET - 127.0.0.1:3000/users/:id
- UPDATE - PUT - 127.0.0.1:3000/users/:id
- DELETE - DELETE - 127.0.0.1:3000/users/:id


OUTPUT - EXEMPLE:

```
{
        "id": "3e542cfc-bf37-4de0-a860-20253d0de600",
        "cpf": "11111111111",
        "email": "fbm@mail.com",
        "phone": "+1111111111",
        "createdAt": "2020-11-08T15:30:44.953Z",
        "tasks": [
            {
                "id": 1,
                "name": "Atividade 01 Agenda",
                "startAt": "2020-11-08 22:30:00",
                "userId": "3e542cfc-bf37-4de0-a860-20253d0de600",
                "finished": false,
                "createdAt": "2020-11-08T23:19:32.775Z"
            } ]
}
```

End Points Para CRUD de Usuários.

Proprietades de um User :
- "id": uuid,
- "cpf": string,
- "email": string,
- "phone": string,
- "password": string
- "createdAt": date,
- "tasks": Tasks[]

### Tasks

EndPoints:
- CREATE - POST - 127.0.0.1:3000/tasks
- LIST - GET - 127.0.0.1:3000/tasks
- FINDONE - GET - 127.0.0.1:3000/tasks/:id
- UPDATE - PUT - 127.0.0.1:3000/tasks/:id
- DELETE - DELETE - 127.0.0.1:3000/tasks/:id


OUTPUT - EXEMPLE:

```
{
        "id": 1,
        "name": "Atividade 01 Agenda",
        "startAt": "2020-11-08 22:30:00",
        "finished": false,
        "createdAt": "2020-11-08T23:19:32.775Z"
    }
```

End Points Para CRUD de Tarefas.

Proprietades de uma Task :
- "id": number,
- "name": string,
- "startAt": string,
- "userId": string,
- "finished": boolean
- "createdAt": date,
