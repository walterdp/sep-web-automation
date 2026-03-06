import { expect } from '@playwright/test';

export class CotizadorPage {
  constructor(page) {

    this.page = page;

    // Dropdowns
    this.paisDestinoDropdown     = page.getByRole('button', { name: /Elija el país/ });
    this.monedaDropdown          = page.getByRole('button', { name: 'Moneda' });
    this.metodoEntregaDropdown   = page.getByRole('button', { name: 'Método de entrega' });

    // Cotizar por
    this.montoAEnviarBtn         = page.getByRole('button', { name: 'Monto a enviar' });
    this.montoAEntregarBtn       = page.getByRole('button', { name: 'Monto a entregar' });

    // Input monto
    this.montoInput              = page.getByTestId('input-monto');

    // Comisión
    this.conComisionBtn          = page.getByRole('button', { name: 'Con comisión incluida' });
    this.sinComisionBtn          = page.getByRole('button', { name: 'Sin comisión incluida' });

    // Acciones
    this.btnCotizar              = page.getByRole('button', { name: 'Cotizar' });

  }

  async openUrl(url) {
    await this.page.goto(url);
  }

  async clickCotizar() {
    await this.btnCotizar.click();
  }

  async clickButton(button) {
    await button.click();
  }

  async validateRequiredFields(message) {
    await expect(this.page.getByText(message)).toBeVisible();
    await expect(this.page.getByText(message)).toHaveText(message);
  }

  async validateMessagesNotVisible(message) {
    await expect(this.page.getByText(message)).not.toBeVisible();
  }

  async selectDropdownOption(dropdown, option) {
    await dropdown.click();
    await this.page.getByText(option).click();
  }

  async fillMonto(value) {
    await this.montoInput.fill((value));
  }

  async getMontoValue() {
    return await this.montoInput.inputValue();
  }

   async takeScreenshot(route) {
    await this.page.screenshot({ path: route, fullPage: true });
  }

}
