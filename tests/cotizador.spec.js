import { test, expect } from '@playwright/test';
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

  test('Validacion de que el campo monto solo acepta valores numericos', async () => {
    // Solo letras → campo debe quedar vacío
    await quoter.fillMonto(data.montoInputValidation.letras);
    expect(await quoter.getMontoValue()).toBe('');

    // Solo caracteres especiales → campo debe quedar vacío
    await quoter.fillMonto(data.montoInputValidation.caracteresEspeciales);
    expect(await quoter.getMontoValue()).toBe('');

    // Mezcla alfanumérica → el campo filtra las letras y conserva solo los dígitos
    await quoter.fillMonto(data.montoInputValidation.alfanumerico);
    expect(await quoter.getMontoValue()).toBe(data.montoInputValidation.alfanumericoResultado);

    // Número entero válido → debe aceptarse
    await quoter.fillMonto(data.montoInputValidation.numericoEntero);
    expect(await quoter.getMontoValue()).toBe(data.montoInputValidation.numericoEntero);

    // Número decimal válido → debe aceptarse
    await quoter.fillMonto(data.montoInputValidation.numericoDecimal);
    expect(await quoter.getMontoValue()).toBe(data.montoInputValidation.numericoDecimal);

  });

});
