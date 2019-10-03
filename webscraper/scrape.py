from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import sys

zipcode = sys.argv[0]
grocery_item = sys.argv[1]

print(zipcode)
print(grocery_item)
driver = webdriver.Chrome()
try:
    driver.get("https://www.safeway.com")
    change_zip_button = driver.find_element_by_css_selector(".shop-reserve-panel-cta")
    time.sleep(1)
    change_zip_button.click()
    time.sleep(1)
    change_zip_input = driver.find_element_by_css_selector(".input-zip-code")
    change_zip_input.click()
    change_zip_input.clear()
    change_zip_input.send_keys("22030")
    time.sleep(5)
    change_zip_input.send_keys(Keys.ENTER)

    time.sleep(5)
    continue_button = driver.find_element_by_id("continue-button")
    continue_button.click()

    time.sleep(1)
    search_input = driver.find_element_by_id("search-img")

    search_input.click()
    time.sleep(1)
    search_input.send_keys(grocery_item)
    search_input.send_keys(Keys.ENTER)
    time.sleep(5)
    groc_prices_qty = driver.find_elements_by_css_selector("p.product-qty")
    groc_prices = driver.find_elements_by_css_selector("span.product-price")

    for x in range(5):
        groc_prices[x]=groc_prices[x].text.split("\n")[1]
        print(f'{groc_prices[x]} @ {groc_prices_qty[x].text}')

    groc_elements = driver.find_elements_by_css_selector(".col-xs-12")
except Exception as e:
    print(e)
finally:
    driver.close()
