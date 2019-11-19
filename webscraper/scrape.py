from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from pprint import pprint

def construct_json(prices,images,names,stores):
    output =[]
    for x in range(len(prices)):
        item = {
            'price': prices[x].text,
            'name': names[x].text,
            'store': stores[x].text,
            'img-link': images[x].get_attribute("src")
                   }
        output.append(item)
    return output

def scrape(itemname,zipcode):
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--incognito")
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    #chrome_options.set_experimental_option("useAutomationExtenstion",false)
    driver = webdriver.Chrome(chrome_options=chrome_options)
    try:
        driver.get(f'https://mygrocerydeals.com/deals?q={itemname}&supplied_location={zipcode}')
        prices= driver.find_elements_by_css_selector(".pricetag")
        images = driver.find_elements_by_css_selector(".deal-productimg")
        names = driver.find_elements_by_css_selector(".deal-productname")
        stores = driver.find_elements_by_css_selector(".deal-storename")

        output = construct_json(prices,images,names,stores)
        pprint(output)
        return output
    except Exception as e:
        driver.close()
        print(e)
        return -1

scrape("milk","22030")
