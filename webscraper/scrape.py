from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import sys

def scrapeCmdLine():
    start = time.time()
    print(len(sys.argv))
    if(len(sys.argv)>3 or len(sys.argv)<3):
        print("Invalid number of elements");
        exit(1)

    zipcode = sys.argv[1]
    grocery_item = sys.argv[2]
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--incognito")
    driver = webdriver.Chrome(chrome_options=chrome_options)

    try:
        driver.get("https://www.safeway.com")
        timeout = 5
        while timeout > 0:
            try:
                change_zip_button = driver.find_element_by_css_selector(".current-store-panel")
                change_zip_button.click()
                timeout=0
            except:
                timeout -=.1
                time.sleep(.1)

        print(1)
        timeout = 5
        while timeout >0:
            try:
                change_zip_input = driver.find_element_by_css_selector(".input-zip-code")
                change_zip_input.click()
                timeout=0
            except Exception as e:
                time.sleep(.1)
                timeout -= .1
                print(timeout)

        change_zip_input.clear()
        change_zip_input.send_keys(zipcode)
        change_zip_input.send_keys(Keys.ENTER)
        time.sleep(1)
        continue_button = driver.find_element_by_id("continue-button")
        continue_button.click()
        time.sleep(1)
        search_input = driver.find_element_by_id("search-img")
        search_input.click()
        search_input.send_keys(grocery_item)
        search_input.send_keys(Keys.ENTER)
        timeout = 10
        while timeout>0:
            try:
                groc_prices_qty = driver.find_elements_by_css_selector("p.product-qty")
                groc_prices = driver.find_elements_by_css_selector("span.product-price")
                if len(groc_prices)>0:
                    timeout=0
                else:
                    raise(Exception)
            except Exception as e:
                timeout -=1
                print(e)
                time.sleep(1)



        for x in range(5):
            groc_prices[x]=groc_prices[x].text.split("\n")[1]
            print(f'{groc_prices[x]} @ {groc_prices_qty[x].text}')

        groc_elements = driver.find_elements_by_css_selector(".col-xs-12")
    except Exception as e:
        print(e)
    finally:
        driver.close()
        end = time.time()
        print(end - start)



def scrape(zipcode,grocery_item):
        output =[]
        zipcode = zipcode
        grocery_item = grocery_item
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--incognito")
        driver = webdriver.Chrome(chrome_options=chrome_options)
        try:
            driver.get("https://www.safeway.com")
            timeout = 5
            while timeout > 0:
                try:
                    change_zip_button = driver.find_element_by_css_selector(".current-store-panel")
                    change_zip_button.click()
                    timeout=0
                except:
                    timeout -=.1
                    time.sleep(.1)
            timeout = 5
            while timeout >0:
                try:
                    change_zip_input = driver.find_element_by_css_selector(".input-zip-code")
                    change_zip_input.click()
                    timeout=0
                except Exception as e:
                    time.sleep(.1)
                    timeout -= .1
                    print(timeout)

            change_zip_input.clear()
            time.sleep(.1)
            change_zip_input.send_keys(zipcode)
            time.sleep(.1)
            change_zip_input.send_keys(Keys.ENTER)
            time.sleep(1)
            continue_button = driver.find_element_by_id("continue-button")
            continue_button.click()
            time.sleep(1)
            search_input = driver.find_element_by_id("search-img")
            search_input.click()
            search_input.send_keys(grocery_item)
            search_input.send_keys(Keys.ENTER)
            timeout = 10
            while timeout>0:
                try:
                    groc_prices_qty = driver.find_elements_by_css_selector("p.product-qty")
                    groc_prices = driver.find_elements_by_css_selector("span.product-price")
                    if len(groc_prices)>0:
                        timeout=0
                    else:
                        raise(Exception)
                except Exception as e:
                    timeout -=1
                    time.sleep(1)

            for x in range(5):
                groc_prices[x]=groc_prices[x].text.split("\n")[1]
                output.append(groc_prices[x])
                print(f'{groc_prices[x]} @ {groc_prices_qty[x].text}')

            groc_elements = driver.find_elements_by_css_selector(".col-xs-12")
            return output
        except Exception as e:
            raise e
        finally:
            driver.close()

def test():
    zipcodes=["22193","22030","20603","22192"]
    foods = ["milk","chicken","bread","ground beef","rice","beans","broccoli"]
    output = []
    for x in range(10):
        try:
            scrape(zipcodes[x%len(zipcodes)],foods[x%len(foods)])
            output.append("success\n")
        except Exception as e:
            output.append("failure --- " + str(e))

            print(e)
    for x in range(len(output)):
        print(output[x])

test()
