import { test, expect } from "@playwright/test";

test.describe("Topic Filter UI", () => {
  test("homepage renders and topic filter is functional", async ({ page }) => {
    await page.goto("/");

    // Page should load without errors
    await expect(page).toHaveTitle(/HN Digest/);

    // Check if digest content is present (either stories or empty state)
    const body = page.locator("body");
    await expect(body).toBeVisible();

    // If there are stories with topics, the filter bar should appear
    const filterLabel = page.getByText("Filter", { exact: true });
    const hasFilter = await filterLabel.isVisible().catch(() => false);

    if (hasFilter) {
      // Get all topic pill buttons (exclude Clear)
      const topicButtons = page.locator(
        'button.rounded-full:not(:has-text("Clear"))'
      );
      const count = await topicButtons.count();
      expect(count).toBeGreaterThan(0);

      // Click the first topic pill
      const firstTopic = topicButtons.first();
      const topicName = await firstTopic.textContent();
      await firstTopic.click();

      // The clicked pill should have active styling
      await expect(firstTopic).toHaveClass(/bg-slate-700/);

      // Clear button should now be visible
      const clearButton = page.getByText("Clear", { exact: true });
      await expect(clearButton).toBeVisible();

      // Click Clear — filter resets
      await clearButton.click();

      // The pill should revert to inactive styling
      await expect(firstTopic).toHaveClass(/bg-slate-100/);

      // Clear button should be gone
      await expect(clearButton).not.toBeVisible();

      test.info().annotations.push({
        type: "result",
        description: `Topic filter working — found ${count} topics, tested toggle for "${topicName}"`,
      });
    } else {
      test.info().annotations.push({
        type: "result",
        description:
          "No topic filter visible (no stories with topics in today's digest)",
      });
    }
  });

  test("digest date page renders and topic filter is functional", async ({
    page,
  }) => {
    // First get a valid date from the archive or homepage
    await page.goto("/");

    // Try to find a digest link or use today's date
    const digestLink = page.locator('a[href^="/digest/"]').first();
    const hasDigestLink = await digestLink.isVisible().catch(() => false);

    if (hasDigestLink) {
      await digestLink.click();
      await page.waitForLoadState("networkidle");

      // Page should have loaded
      const body = page.locator("body");
      await expect(body).toBeVisible();

      // Check for topic filter
      const filterLabel = page.getByText("Filter", { exact: true });
      const hasFilter = await filterLabel.isVisible().catch(() => false);

      if (hasFilter) {
        // Click a topic to filter
        const topicButtons = page.locator(
          'button.rounded-full:not(:has-text("Clear"))'
        );
        const firstTopic = topicButtons.first();
        await firstTopic.click();
        await expect(firstTopic).toHaveClass(/bg-slate-700/);

        // Click same topic to deselect
        await firstTopic.click();
        await expect(firstTopic).toHaveClass(/bg-slate-100/);

        test.info().annotations.push({
          type: "result",
          description: "Topic filter toggle/deselect working on digest page",
        });
      } else {
        test.info().annotations.push({
          type: "result",
          description: "No topic filter on digest page (no topics in stories)",
        });
      }
    } else {
      test.skip();
    }
  });

  test("selecting multiple topics uses OR logic", async ({ page }) => {
    await page.goto("/");

    const filterLabel = page.getByText("Filter", { exact: true });
    const hasFilter = await filterLabel.isVisible().catch(() => false);

    if (!hasFilter) {
      test.skip();
      return;
    }

    const topicButtons = page.locator(
      'button.rounded-full:not(:has-text("Clear"))'
    );
    const count = await topicButtons.count();

    if (count < 2) {
      test.skip();
      return;
    }

    // Count stories before filtering
    const storyCards = page.locator("article");
    const totalStories = await storyCards.count();

    // Select first topic
    await topicButtons.nth(0).click();
    const afterFirst = await storyCards.count();

    // Select second topic — should show equal or more stories (OR logic)
    await topicButtons.nth(1).click();
    const afterSecond = await storyCards.count();

    expect(afterSecond).toBeGreaterThanOrEqual(afterFirst);

    // Clear should restore all
    await page.getByText("Clear", { exact: true }).click();
    const afterClear = await storyCards.count();
    expect(afterClear).toBe(totalStories);

    test.info().annotations.push({
      type: "result",
      description: `OR logic verified: ${totalStories} total → ${afterFirst} (1 topic) → ${afterSecond} (2 topics) → ${afterClear} (cleared)`,
    });
  });
});
