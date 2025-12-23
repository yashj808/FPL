import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 720})
    page = context.new_page()

    print("Navigating to home...")
    page.goto("http://localhost:5173")
    time.sleep(2)
    page.screenshot(path="verification/demo_1_home.png")

    print("Selecting a problem...")
    # Click on the first "Start Project" button
    page.click("text=Start Project")
    time.sleep(2) # Wait for project creation
    page.screenshot(path="verification/demo_2_dashboard.png")

    print("Navigating to Mentors...")
    page.click("text=Mentors")
    time.sleep(1)
    page.screenshot(path="verification/demo_3_mentors.png")

    print("Booking a session...")
    # Click "Book Session" on the first mentor
    page.click("button:has-text('Book Session')")
    time.sleep(1)

    # Fill out the modal
    page.fill("textarea", "I need help with the database schema design.")
    page.click("text=Confirm Booking")
    time.sleep(2) # Wait for success message
    page.screenshot(path="verification/demo_4_booked.png")

    print("Returning to Dashboard...")
    page.click("text=Back to Dashboard")
    time.sleep(1)
    page.click("text=Current Project")
    time.sleep(1)

    print("Viewing Portfolio...")
    page.click("text=View Portfolio")
    time.sleep(2)
    page.screenshot(path="verification/demo_5_portfolio.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
