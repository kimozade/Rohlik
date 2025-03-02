import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('https://www.rohlik.cz/');
    // Login
    await page.locator('[data-test="IconUserLogin"]').click();
    await page.locator('[data-test="user-login-form-email"] [data-test="input"]').click();
    await page.locator('[data-test="user-login-form-email"] [data-test="input"]').fill('kimozade@gmail.com');
    await page.locator('[data-test="user-login-form-password"] [data-test="input"]').click();
    await page.locator('[data-test="user-login-form-password"] [data-test="input"]').fill('1Gfhjkbot!');
    await page.locator('[data-test="btnSignIn"]').click();
    await page.locator('[data-gtm-section="user-login"]').click();
    await page.locator('[data-test="my-account-button"]').click();
    // Function to get the current cart total

});