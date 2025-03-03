import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.rohlik.cz/');
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Přijmout vše' }).click();
    await page.locator('[data-test="header-user-icon"]').click();
    await page.locator('[data-test="user-login-form-email"] [data-test="input"]').click();
    await page.locator('[data-test="user-login-form-email"] [data-test="input"]').fill('kimozade@gmail.com');
    await page.locator('[data-test="user-login-form-password"] [data-test="input"]').click();
    await page.locator('[data-test="user-login-form-password"] [data-test="input"]').fill('1Gfhjkbot!');
    await page.locator('[data-test="btnSignIn"]').click();
    await page.locator('[data-test="productCard-AVAILABLE-1302811"] [data-test="productCard-header-counterButton-plus-button"]').click();
    await page.locator('[data-test="productCard-header-counterButton-quantity-input"]').click();
    await page.locator('[data-test="productCard-header-counterButton-quantity-input"]').fill('02');
    await page.locator('[data-test="productCard-AVAILABLE-1302811"] [data-test="productCard-header-counterButton-plus-button"]').click();
    await page.locator('[data-test="cart-header-wrapper"]').click();
    await page.locator('[data-test="cart-redirectToCart"]').click();
    await page.locator('[data-test="cart-review-button"]').click();
    await page.locator('[data-test="checkoutForm-select-timeslot"]').click();
    await page.getByText('Zítra').click();
    await page.getByRole('button', { name: 'Mezi 12:00–13:00 0,00 Kč' }).click();
    await expect(page.getByRole('rowgroup')).toContainText('Zdarma');
});
