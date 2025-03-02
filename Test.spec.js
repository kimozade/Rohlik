import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://www.rohlik.cz/');
    // Login
    await page.locator('[data-test="header-user-icon"]').click();
    await page.locator('[data-test="user-login-form-email"] [data-test="input"]').click();
    await page.locator('[data-test="user-login-form-email"] [data-test="input"]').fill('kimozade@gmail.com');
    await page.locator('[data-test="user-login-form-password"] [data-test="input"]').click();
    await page.locator('[data-test="user-login-form-password"] [data-test="input"]').fill('1Gfhjkbot!');
    await page.locator('[data-test="btnSignIn"]').click();

    // Function to get the current cart total
    async function getCartTotal() {
        await page.locator('[data-test="cart-header-wrapper"]').click();
        const priceText = await page.locator('[data-test="actual-price"]').innerText();
        const price = parseFloat(priceText.replace(/\s/g, '').replace('Kč', '').replace(',', '.'));
        return price;
    }

    // Add items until the cart total is within the desired range
    let cartTotal = await getCartTotal();
    console.log(`Initial cart total: ${cartTotal}`);

    while (cartTotal < 500) {
        await page.locator('[data-test="productCard-AVAILABLE-1317247"] [data-test="productCard-header-counterButton-plus-button"]').click();
        console.log('Added one item');
        await page.waitForTimeout(1000);
        cartTotal = await getCartTotal();
        console.log(`Cart total after adding item: ${cartTotal}`);

        if (cartTotal > 550) {
            console.log('Cart total exceeded 550 CZK. Stopping item additions.');
            break;
        }
    }

    console.log(`Final cart total: ${cartTotal}`);
    expect(cartTotal).toBeGreaterThanOrEqual(500);
    expect(cartTotal).toBeLessThanOrEqual(550);

    // Checkout process
    await page.locator('[data-test="IconCartClosed"]').click();
    await page.locator('[data-test="cart-redirectToCart"]').click();
    await page.locator('[data-test="cart-review-button"]').click();
    await page.locator('[data-test="PACKAGING_SECTION"] [data-test="ch-h-header"]').click();
    await page.locator('label').filter({ hasText: 'Papírových tašek' }).click();
    await page.locator('[data-test="checkoutForm-select-timeslot"]').click();
    await page.getByText('Zítra').click();
    await page.getByRole('button', { name: 'Mezi 12:00–13:00 0,00 Kč' }).click();
    await expect(page.getByRole('rowgroup')).toContainText('Zdarma');
});
