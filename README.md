# Url shorter 🔗

Acortador de URLS realizado con laravel y React.js
_(Prueba tecnica para Spot2mx)_
![Preview de app](https://i.ibb.co/zhKYVtK/Screenshot-2024-09-12-074650.png)

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.

### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

1.  Laravel 10
2.  Nodejs
3.  npm
4.  Laragon
5.  Composer

### Instalación 🔧

_Para instalar el proyecto en local se realiza git clone del repositorio_

_Paso 1: se instalan las dependencias de php_

```bash
composer install
```

_Paso 2: se instalan las dependencias de php_

```bash
npm install
```

_Paso 3: Copiar el archivo .env.example, renombrarlo a ".env", y colocar las variables_

```
APP_URL=http://127.0.0.1:8000
DB_DATABASE=url_shorter
DB_USERNAME=root
DB_PASSWORD=
```

_Se puede sustituir en APP_URL el dominio del host para subirlo a produccion_

_Paso 4: Ejecutar las migraciones de laravel_

```bash
php artisan migrate
```

## Despliegue 📦

Para ejecutar proyecto en la nube se emplean los mismos pasos, sustituyendo APP_URL por el dominio del hosting

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

-   [React.js](<[React](https://react.dev/)>) - El framework de frontend
-   [Laravel](<(https://laravel.com/docs/10.x/releases)>) - Framework de backend para la api
-   [Composer ](<(https://getcomposer.org/)>) - Manejador de dependencias
-   [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)- Libreria css para el fronend

## Desarrollo

La aplicación está pensada de manera modular, lo que permitiría su escalamiento

Se recomiendan técnicas de caché como: realizar el registro en cola mientras se muestra la variable registrada, agilizando el programa

Se utilizó una base de datos SQL con el fin de tener facilidades en las relaciones para un futuro de crecimiento (ver apartado de RECOMENDACIONES ⬇️ )

Se decidió por este diseño, ya que permite tener una interfaz clara, sencilla y muy eficiente sobre lo que se necesita sin distracciones, además de que permitiría la inclusión de características adicionales (ver apartado de RECOMENDACIONES ⬇️ )

El sistema cuenta con alertas visuales para errores y mensajes de ayuda para el usuario
![Alertas de exito](https://i.ibb.co/rbfQRBW/Screenshot-2024-09-12-081243.png)

![Aertas de error](https://i.ibb.co/XX20JzC/Screenshot-2024-09-12-081358.png)

## Recomendaciones / Posibilidades de mejora

Algunos apartados que se pueden implementar para la mejora de la aplicación son:

1.  Módulo de visitas, para tener un registro de cuantos clics tienen determinados URLS
2.  Generación de Qr, para el uso de dispositivos móviles inteligentes, acceder al link o copiarlo, además de la descarga de la imagen de este
3.  Gráficas para registrar de que país son los visitantes de cada link
4.  Autenticación por usuario, permitiéndole a cada usuario tener sus urls personalizadas a cada uno.
5.  Agregar integracion continua (Apartado CONFIGURACION CI/CD)
6.  Agregar boton de copiado en portapapeles

## Configuracion CI/CD

Para bonus se puede agregar un action de github personalizado para hacer deploy en producción automaticamente al subir un commit

```yaml
name: 🚀 Deploy website on push
	on:
		push:
			branches:
				- master
jobs:
	web-deploy:
		name: 🎉 Deploy
		runs-on: ubuntu-latest
		steps:
			- name: 🚚 Get latest code
				uses: actions/checkout@v3
			- name: 📂 Sync files
				uses: SamKirkland/FTP-Deploy-Action@v4.3.4
		with:
			server: ${{ secrets.FTP_HOST}}
			username: ${{ secrets.FTP_USER}}
			password: ${{ secrets.FTP_PASSWORD }}
			server-dir: ${{ secrets.FTP_DIR }}
```

Todo esto creando los secrets del repositorio respectivamente

---

### Seguridad 🔐

-   La aplicacion cuenta con validaciones de informacion enviada, evitando inyecciones sql
-   urls generados aleatoriamente difíciles de adivinar
-   Medidas contra ataques CSRF

## Autores ✒️

-   **Jesus Alfonzo** - _Trabajo completo_ - [Alfonzzoj](https://github.com/Alfonzzoj)
