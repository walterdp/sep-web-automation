import { test as base } from '@playwright/test';
import { CotizadorPage } from '../pages/cotizador.page.js';
import data from '../data/cotizador.data.json' assert { type: 'json' };

const QUOTE_URL = 'https://develop.d2wbsjn1hekdle.amplifyapp.com/send/quote';

/**
 * Fixture `quoterPage`: navega al formulario Cotizador, lo llena con datos
 * válidos y hace clic en "Cotizar", dejando la página lista para continuar
 * con las pantallas siguientes.
 *
 * Uso en un test:
 *   import { test } from '../fixtures/cotizador.fixture.js';
 *
 *   test('mi test', async ({ quoterPage }) => {
 *     // La pantalla de resultados ya está activa
 *   });
 */
export const test = base.extend({
  quoterPage: async ({ page }, use) => {
    const quoter = new CotizadorPage(page);

    await quoter.openUrl(QUOTE_URL);

    await quoter.selectDropdownOption(quoter.paisDestinoDropdown, data.dropdowns.paisDestino);
    await quoter.selectDropdownOption(quoter.monedaDropdown, data.dropdowns.moneda);
    await quoter.selectDropdownOption(quoter.metodoEntregaDropdown, data.dropdowns.metodoEntrega);

    await quoter.clickButton(quoter.montoAEnviarBtn);
    await quoter.fillMonto(data.montoLimits.valid);
    await quoter.clickButton(quoter.conComisionBtn);

    await quoter.clickCotizar();

    await use(quoter);
  },
});

export { expect } from '@playwright/test';
