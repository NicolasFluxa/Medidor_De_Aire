# Medidor de Calidad del Aire

Este repositorio es el hogar del código fuente y los recursos para un prototipo avanzado de medición ambiental y su plataforma web asociada. El proyecto fue concebido y ejecutado con la metodología ágil Scrum, reuniendo a un equipo de desarrolladores, diseñadores y gestores de proyectos con la visión común de innovar en la medición y visualización de datos ambientales.

## Visión General del Proyecto

El objetivo principal del proyecto es proporcionar una herramienta precisa y confiable para la medición de la calidad del aire, utilizando tecnología de vanguardia y una interfaz web intuitiva para la presentación de datos. El prototipo y la plataforma web se desarrollaron para facilitar el acceso a información vital sobre el ambiente, permitiendo a los usuarios tomar decisiones informadas basadas en datos en tiempo real.

## Tecnología del Prototipo

El corazón del sistema de medición es el Node MCU “Esp32”, que se complementa con un conjunto de sensores altamente sensibles:
- **SDS011**: Para la medición precisa de partículas finas PM2.5 y PM10.
- **MQ135**: Capaz de detectar una amplia gama de gases nocivos.
- **DHT22**: Que mide la temperatura y la humedad con gran exactitud.

La elección de estos sensores se basó en su fiabilidad y precisión, asegurando que los datos recogidos sean de la más alta calidad.

## Almacenamiento y Gestión de Datos

Los datos ambientales recopilados por el prototipo se transmiten automáticamente a Firebase Realtime Database cada 60 segundos. Esta base de datos No SQL proporciona un almacenamiento seguro, escalable y en tiempo real, ideal para manejar grandes volúmenes de datos ambientales.

## Plataforma Web Interactiva

La plataforma web desarrollada es más que un simple visualizador de datos; es un portal completo que ofrece:
- Visualización clara y comprensible de los datos recogidos.
- Funcionalidades avanzadas para el registro e inicio de sesión de usuarios.
- Un sistema robusto para la gestión de permisos basados en roles.

La plataforma garantiza que los usuarios puedan acceder fácilmente a los datos que necesitan, cuando lo necesitan, con las herramientas adecuadas para interpretarlos.

## Implementación Ágil con Asana

El equipo empleó la herramienta de gestión de proyectos Asana para implementar la metodología ágil Scrum. Asana facilitó la organización de tareas, la planificación de sprints y la colaboración en tiempo real, lo que permitió una comunicación clara y una gestión eficiente del flujo de trabajo del proyecto.

- **Product Backlog**: Organizado y priorizado dentro de Asana para una visión clara de las tareas pendientes.
- **Sprints**: Planificados con fechas límite y asignaciones claras, asegurando un progreso constante y medible.
- **Adaptabilidad**: La interfaz intuitiva de Asana permitió al equipo adaptarse rápidamente a los cambios y actualizar las prioridades sobre la marcha.

La integración de Asana en el proceso de desarrollo ayudó al equipo a mantenerse enfocado y alineado con los objetivos del proyecto, maximizando la productividad y la eficiencia.

