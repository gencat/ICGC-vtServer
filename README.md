# ICGC-vtServer

[![Project Status: Inactive – The project has reached a stable, usable state but is no longer being actively developed; support/maintenance will be provided as time allows.](https://www.repostatus.org/badges/latest/inactive.svg)](https://www.repostatus.org/#inactive)
![stability-frozen](https://img.shields.io/badge/stability-locked-blue.svg)

servidor expressjs que sirve VT directamente desde PostGIS

La BD de PostGIS es quien se encarga de hacer la magia. El código de la BD está en https://github.com/gencat/ICGC-vt-postgis

Para configurar la varibles de entorno de la conexión de la BD crear un archivo llamado **.env** en el directorio del proyecto y agregar el siguiente código:

	DB_USER=${TU_USUARIO}
	DB_HOST=${TU_HOST}
	DB_DATABASE=${TU_BASE_DE_DATOS}
	DB_PASS=${TU_CONTRASEÑA}
	DB_PORT=${TU_PUERTO}
