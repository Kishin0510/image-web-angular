## Cátedra 3 - UCN 
Para este repositorio es necesario tener instalado:
  1. Node.js (22.11.0 mínimo).
  2. Una IDE como Visual Studio Code.
  3. Angular CLI (18.2.12 mínimo).

Alumno:

  Nicolás Patricio Tapia Carrasco

Profesor: 

  Jorge Rivera Mancilla
    
Ayudantes: 

  1. Guillermo Fuentes Ávila
  2. Ernes Fuenzalida Tello
    
## Instalación
1. Clona el repositorio en tu máquina local.
   ```sh
   git clone <link>
   ```
2. Abre el projecto en tu IDE preferida.
3. Abre el terminal y ejecuta el siguiente comando:
   ```sh
   npm install
   ```
4. En la carpeta environment, editar el archivo environment.development.ts:
   ```sh
   export const environment = {
    production: false,
    apiUrl: '<URL de la API>'
   };
   ``` 
5. Ejecuta el proyecto con el comando.
   ```sh
   ng serve
   ```
