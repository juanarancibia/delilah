# delilah

Para inicializar el proyecto en su entorno local deberá en primera instancia instalar los paquetes incluidos en el package.json para el correcto funcionamiento del proyecto.

El proyecto esta realizado conectandose a una base de datos remota (remotemysql.com). Igualmente, incluyo un archivo delilah.sql por si prefiere crear la base de datos localmente y conectarse a ella.

Se incluye también la documentacion de la API, en el archivo delilah.yml. Dentro de el se detalla como realizar los request a los diferentes endpoints solicitados.

Luego de haber instalado los paquetes y, si asi se quiere, crear la base de datos y cambiar los string de conexión para que se correspondan, se debe ejecutar en la consola, posicionados en el directorio del proyecto, el comando "nodemon server" para hacer que el servidor comience a funcionar. Despues de esto es posible realizar los request a los distintos endpoints.
