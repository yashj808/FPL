import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 800})
    page = context.new_page()

    # 1. Onboarding
    print("Starting Onboarding...")
    page.goto("http://localhost:5173")
    time.sleep(2)
    page.screenshot(path="verification/onboarding_1_start.png")

    # Step 1: Skill Level
    page.click("text=Intermediate")
    page.click("text=Next Step")
    time.sleep(1)

    # Step 2: Interests
    page.click("text=AI/ML")
    page.click("text=Web Development")
    page.screenshot(path="verification/onboarding_2_interests.png")
    page.click("text=Start My Journey")
    time.sleep(2)

    # 2. Idea Generator
    print("Generating Idea...")
    page.fill("input[placeholder='Enter a domain or keyword...']", "Education")
    page.click("text=Generate Idea")
    time.sleep(2)
    page.screenshot(path="verification/idea_generator_result.png")

    # Select the generated idea
    page.click("text=Start Project with This Idea")
    time.sleep(2)

    # 3. Timeline Setup
    print("Setting up Timeline...")
    page.screenshot(path="verification/timeline_setup.png")

    # Set deadline (future date)
    # Playwright's fill for date input requires YYYY-MM-DD
    # Calculating a date 3 months from now
    import datetime
    future_date = (datetime.date.today() + datetime.timedelta(days=90)).isoformat()
    page.fill("input[type='date']", future_date)

    # Adjust slider (optional, default is 10)
    page.click("text=Create Project Plan")
    time.sleep(2)

    # 4. Dashboard Verification
    print("Verifying Dashboard...")
    page.screenshot(path="verification/dashboard_enhanced.png")

    # Check elements
    # page.locator("text=Overall Progress").wait_for() # Implicit in screenshot

    # 5. Invite Team
    print("Generating Invite...")
    page.click("button[title='Invite Member']")
    time.sleep(1)
    page.screenshot(path="verification/dashboard_invite.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
