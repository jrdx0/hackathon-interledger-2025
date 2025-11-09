# UNDEFINED
Aplicación para pagos rápidos y en conjunto.



## 💬 Descripción
**UNDEFINED** es una aplicación diseñada para simplificar los pagos grupales. Permite a los usuarios crear o unirse a grupos para gestionar gastos compartidos de manera eficiente y transparente.

Es la solución ideal para:
* Dividir suscripciones de streaming (Netflix, Spotify, etc.).
* Organizar "tandas" o fondos de ahorro colectivos.
* Pagar la cuenta en cenas o salidas, especialmente cuando el efectivo escasea.
* Gestionar gastos de viajes entre amigos.

---

## 🔗 Links
* **[Presentación](https://drive.google.com/drive/folders/1xaLKYsHx2UU2BpVVefzJJ5l139sP3k_L?usp=sharing)**
* **Demo del Proyecto:** `...`


---

## 🛠️ Cómo Ejecutar el Proyecto

### 🚀 Instrucciones para ejecutar el Backend

Sigue los pasos a continuación para configurar y ejecutar el proyecto backend correctamente.

---

#### 📦 1. Configurar variables de entorno

Desde la carpeta principal del backend, copia el archivo de plantilla `.env.template` y renómbralo como `.env`:

```bash
cp .env.template .env
```

#### 🐳 2. Configurar entorno Docker

Dirígete a la carpeta `Docker/environment/dev` y copia el archivo de entorno correspondiente:

```bash
cp .env.template .env
```

Luego, levanta los contenedores con Docker Compose:

```bash
docker compose up -d
```

#### 🛠️ 3. Instalar dependencias y configurar Prisma

Desde la carpeta principal del backend, ejecuta los siguientes comandos:

```bash
npm install
npx prisma generate
npx prisma db push
```

#### ▶️ 4. Ejecutar el servidor en modo desarrollo

Para iniciar el servidor, ejecuta:

```bash
npm run start:dev
```

### 💻 Instrucciones para ejecutar el Frontend

Sigue los pasos a continuación para configurar y ejecutar el proyecto frontend correctamente.

---

#### ⚙️ 1. Instalar dependencias

Desde la carpeta principal del frontend, ejecuta el siguiente comando:

```bash
npm install
```

#### ▶️ 2. Ejecutar el servidor en modo desarrollo

Inicia el proyecto con:

```bash
npm run dev
```
---

## 👨‍💻 Miembros del Equipo
El equipo detrás de **UNDEFINED** está compuesto por:

* **Jared Peña Ochoa** - [LinkedIn](https://www.linkedin.com/in/jared-pena-ochoa/)
* **José Jair Medrano Olmos** - [LinkedIn](https://www.linkedin.com/in/jolmosdev/)
* **Rey Martín Quintero García** - [LinkedIn](https://www.linkedin.com/in/reyqg/)
* **Cristian Ignacio Reyna Méndez** - [LinkedIn](https://www.linkedin.com/in/cristian-ignacio-reyna-m%C3%A9ndez-a1084423a/)
---

## 💡 Aprendizajes
Durante este camino, obtuvimos aprendizajes clave tanto a nivel técnico como personal.

Confirmamos el secreto más obvio y valioso de todos: **la organización y el tiempo son oro**. Aprendimos a potenciar las habilidades complementarias del equipo, reconociendo que los distintos enfoques (no todos desde el código) son los que verdaderamente enriquecen un proyecto.

## 🏆 Logros
En este hackatón descubrimos nuestro verdadero potencial y lo lejos que podemos llegar. Demostramos ser capaces de adaptarnos rápidamente a nuevas tecnologías, explorar ideas frescas y adentrarnos en campos desconocidos, saliendo con éxito de nuestra zona de confort.

## ⏭️ Próximos Pasos
Planeamos seguir nuestro proceso de trabajo.

**Crecimiento del Equipo:**
* Fomentar un ambiente donde pedir ayuda y escucharnos activamente sea la norma.
* Optimizar nuestra organización y la gestión efectiva del tiempo.

