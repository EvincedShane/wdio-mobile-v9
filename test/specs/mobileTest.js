import { expect, browser, $ } from "@wdio/globals";
import { EvincedWdioMobileSdk } from "@evinced/wdio-mobile-sdk";

describe("My Login application", () => {
  let evincedWdioSDK;

  before(() => {
    evincedWdioSDK = new EvincedWdioMobileSdk();

    const isLicenseValid = evincedWdioSDK.setupCredentials(
      process.env.EVINCED_SERVICE_ID,
      process.env.EVINCED_API_KEY
    );

    if (!isLicenseValid) return console.log("Credentials are invalid.");
  });

  it("Opens the mobile App", async () => {
    const evincedLogo = await $(
      '//android.widget.ImageView[@content-desc="Evinced demo app"]'
    );
    await expect(evincedLogo).toBePresent();
    await $('(//android.widget.ImageView[@resource-id="com.evinced.demoapp:id/best_deal_image"])[1]').click();

    const reserveLocation = await $('//android.widget.Button[@resource-id="com.evinced.demoapp:id/reserve"]');
    await reserveLocation.click();

    const confirmationModal = await $('//android.view.ViewGroup');
    await expect(confirmationModal).toBePresent();

    await evincedWdioSDK.report();
  });
});
