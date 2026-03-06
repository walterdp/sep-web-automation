import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';
import { CotizadorPage } from '../pages/cotizador.page.js';
import data from '../data/cotizador.data.json' assert { type: 'json' };

const URL = 'https://develop.d2wbsjn1hekdle.amplifyapp.com/send/quote';

test.describe('Visual testing del formulario Cotizador', () => {
  let quoter;

  test.beforeEach(async ({ page }) => {
    quoter = new CotizadorPage(page);
    await quoter.openUrl(URL);
  });

  test('Visual - Carga inicial del formulario cotizador', async ({ page }) => {
    await percySnapshot(page, 'Cotizador - Carga inicial');
  });

  test('Visual - Formulario con mensajes de campos requeridos', async ({ page }) => {
    await quoter.clickCotizar();
    await percySnapshot(page, 'Cotizador - Campos requeridos');
  });

  test('Visual - Formulario con mensaje de monto excedido', async ({ page }) => {
    await quoter.fillMonto(data.montoLimits.exceedsMax);
    await quoter.clickCotizar();
    await percySnapshot(page, 'Cotizador - Monto excede maximo');
  });


});
