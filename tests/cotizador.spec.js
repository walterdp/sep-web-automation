import { test } from '@playwright/test';
import { CotizadorPage } from './pages/cotizador.page.js';
import data from './data/cotizador.data.json' assert { type: 'json' };

const URL = 'https://develop.d2wbsjn1hekdle.amplifyapp.com/send/quote';

test.describe('Automatizacion del formulario  "Cotizador', () => {
  let quoter;

  test.beforeEach(async ({ page }) => {
    quoter = new CotizadorPage(page);
    await quoter.openUrl(URL);
  });

  test('Validacion de los campos obligatorios del formulario Cotizador', async () => {
    await quoter.clickCotizar();
    await quoter.validateRequiredFields(data.requiredFieldMessages.paisDestino);
    await quoter.validateRequiredFields(data.requiredFieldMessages.moneda);
    await quoter.validateRequiredFields(data.requiredFieldMessages.metodoEntrega);
    await quoter.validateRequiredFields(data.requiredFieldMessages.monto);

    await quoter.takeScreenshot('screenshots/cotizador-required-fields.png');

  });

  test('Validacion de monto maximos en el formulario Cotizador', async () => {
    await quoter.fillMonto(data.montoLimits.exceedsMax);
    await quoter.clickCotizar();
    await quoter.validateRequiredFields(data.montoLimits.exceedsMaxMessage);

    await quoter.takeScreenshot('screenshots/cotizador-monto-exceeds-max.png');

   });

 
    test('Envio de formulario del cotizador por "Monto a enviar" y "Con comision incluida', async () => {
   
    await quoter.selectDropdownOption(quoter.paisDestinoDropdown, data.dropdowns.paisDestino);
    await quoter.selectDropdownOption(quoter.monedaDropdown, data.dropdowns.moneda);
    await quoter.selectDropdownOption(quoter.metodoEntregaDropdown, data.dropdowns.metodoEntrega);

    await quoter.clickButton(quoter.montoAEnviarBtn);

    await quoter.fillMonto(data.montoLimits.valid);

    await quoter.clickButton(quoter.conComisionBtn);

    await quoter.clickCotizar();
  
    await quoter.validateMessagesNotVisible(data.requiredFieldMessages.paisDestino);
    await quoter.validateMessagesNotVisible(data.requiredFieldMessages.moneda);
    await quoter.validateMessagesNotVisible(data.requiredFieldMessages.metodoEntrega);
    await quoter.validateMessagesNotVisible(data.requiredFieldMessages.monto);

    await quoter.takeScreenshot('screenshots/cotizador-monto-valid.png');

    });


});
