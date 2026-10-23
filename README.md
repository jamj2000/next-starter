# Template for Next.js projects

Includes the following:

- **Base**
  - Framework JS/TS `next +16.3`
  - Framework CSS `tailwindcss 4`
- **UI**
  - Icons `lucide-react`
  - Light/Dark mode `next-themes`
  - Components `simpleui`
- **Database**
  - ORM `prisma 7`
  - SQLite, Postgresql
- **Autentication**
  - `next-auth 5`


## Download

```sh
npx  giget   gh:jamj2000/next-starter  mi-app
cd   mi-app
npm  install 
```

## Database

1. Define enviroment variables into `.env`

2. Match configuration in:
- `src/lib/prisma.js`
- `prisma/schema.prisma`
- `prisma/seed.mjs`

3. Run
   
```sh
npx  prisma  db  push
npx  prisma  generate 
npx  prisma  db  seed
```