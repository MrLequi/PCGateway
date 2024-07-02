# Tienda de Informática

Bienvenido a la **Tienda de Informática**, un proyecto de e-commerce similar a Thot o PcComponentes. Este repositorio contiene el código fuente del sitio web desarrollado con HTML, CSS, JavaScript y PHP. La base de datos se gestiona con MySQL y el servidor web con Apache, ambos proporcionados por XAMPP.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Descripción

Este proyecto es una tienda de informática online donde los usuarios pueden explorar, buscar y comprar productos tecnológicos. La aplicación está construida para proporcionar una experiencia de usuario fluida y eficiente, tanto para el cliente como para el administrador.

## Características

- **Interfaz de Usuario**: Diseño moderno y responsivo utilizando HTML y CSS.
- **Funcionalidad de Compras**: Añadir al carrito, eliminar productos, y proceso de pago.
- **Gestión de Productos**: CRUD (Crear, Leer, Actualizar, Eliminar) de productos para administradores.
- **Autenticación de Usuarios**: Registro e inicio de sesión para usuarios y administradores.
- **Base de Datos**: Gestión de productos y usuarios con MySQL.
- **Servidor Web**: Implementación con Apache a través de XAMPP.

## Requisitos

Para ejecutar este proyecto, necesitarás tener instalados los siguientes programas:

- [XAMPP](https://www.apachefriends.org/index.html)
- Navegador web (Chrome, Firefox, etc.)

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/tienda-informatica.git
    ```

2. **Configurar XAMPP**:
    - Inicia Apache y MySQL desde el panel de control de XAMPP.
    - Importa la base de datos `tiendadb.sql` incluida en la carpeta `database`:
        1. Abre phpMyAdmin en tu navegador.
        2. Crea una nueva base de datos llamada `tiendadb`.
        3. Importa el archivo `tiendadb.sql` en la base de datos `tiendadb`.

3. **Configurar el proyecto**:
    - Coloca la carpeta del proyecto en el directorio `htdocs` de XAMPP.
    - Asegúrate de que los archivos de configuración de la base de datos (`config.php`) apunten correctamente a tu servidor MySQL.

4. **Ejecutar la aplicación**:
    - Abre tu navegador y navega a `http://localhost/tienda-informatica`.

## Uso

Una vez que la aplicación esté en funcionamiento, puedes explorar las siguientes funcionalidades:

- **Usuarios**: Explorar productos, añadir al carrito, y realizar compras.
- **Administradores**: Acceder al panel de administración para gestionar productos y usuarios.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

## Contacto

Para cualquier duda o sugerencia, puedes contactarme a través de:

- **Correo electrónico**: [email@example.com](lequinidylan@gmail.com)
- **GitHub**: [usuario](https://github.com/MrLequi)

---

¡Gracias por visitar el repositorio de Tienda de Informática!
