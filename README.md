# sep-web-automation

Proyecto de automatizacion de pruebas E2E para la plataforma SEP, desarrollado con [Playwright](https://playwright.dev/) y JavaScript.

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v8 o superior

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/walterdp/sep-web-automation.git
cd sep-web-automation

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

## Estructura del proyecto

```
sep-web-automation/
├── tests/               # Archivos de prueba (.spec.js)
├── pages/               # Page Object Models (POM)
├── fixtures/            # Fixtures y datos de prueba
├── playwright.config.js # Configuracion de Playwright
└── package.json
```

## Ejecucion de pruebas

```bash
# Ejecutar todas las pruebas
npx playwright test

# Ejecutar en modo UI (interfaz grafica)
npx playwright test --ui

# Ejecutar un archivo especifico
npx playwright test tests/nombre.spec.js

# Ejecutar en un navegador especifico
npx playwright test --project=chromium

# Ejecutar con reporte visible
npx playwright test --reporter=html
```

## Ver reporte

```bash
npx playwright show-report
```

## Navegadores soportados

- Chromium
- Firefox
- WebKit (Safari)

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto con las siguientes variables:

```env
BASE_URL=https://develop.d2wbsjn1hekdle.amplifyapp.com/
# Agrega aqui otras variables necesarias
```

## Autor

- **Walter Diaz** - [@walterdp](https://github.com/walterdp)
