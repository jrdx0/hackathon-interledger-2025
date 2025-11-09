# 🚀 Instrucciones para ejecutar el Backend

Sigue los pasos a continuación para configurar y ejecutar el proyecto backend correctamente.

---

## 📦 1. Configurar variables de entorno

Desde la carpeta principal del backend, copia el archivo de plantilla `.env.template` y renómbralo como `.env`:

```bash
cp .env.template .env
```

## 🐳 2. Configurar entorno Docker

Dirígete a la carpeta `Docker/environment/dev` y copia el archivo de entorno correspondiente:

```bash
cp .env.template .env
```

Luego, levanta los contenedores con Docker Compose:

```bash
docker compose up -d
```

## 🛠️ 3. Instalar dependencias y configurar Prisma

Desde la carpeta principal del backend, ejecuta los siguientes comandos:

```bash
npm install
npx prisma generate
npx prisma db push
```

## ▶️ 4. Ejecutar el servidor en modo desarrollo

Para iniciar el servidor, ejecuta:

```bash
npm run start:dev
```

# 💻 Instrucciones para ejecutar el Frontend

Sigue los pasos a continuación para configurar y ejecutar el proyecto frontend correctamente.

---

## ⚙️ 1. Instalar dependencias

Desde la carpeta principal del frontend, ejecuta el siguiente comando:

```bash
npm install
```

## ▶️ 2. Ejecutar el servidor en modo desarrollo

Inicia el proyecto con:

```bash
npm run dev
```
