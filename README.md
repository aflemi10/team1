# Requirements
- Webscraper
	- Selenium
	- A chrome webdriver
- Backend
	- Elasticsearch ( tested using version 6.5.4 )
	- Flask
- Python 3
# Usage
 1. Download + Install requirements
	 - [Selenium](http://seleniummaster.com/sitecontent/index.php/selenium-web-driver-menu/selenium-test-automation-with-python-menu/186-how-to-install-selenium-python-webdriver)
	 - [Chrome webdriver](https://chromedriver.chromium.org/downloads)
	 - [Elasticsearch](https://www.elastic.co/downloads/elasticsearch)
	 - [Elasticsearch Python API](https://pypi.org/project/elasticsearch/)
	 - [Flask](https://pypi.org/project/Flask/)
2. Start Elasticsearch
	- Go to wherever Elasticsearch was downloaded to
	 ```cd  Downloads/elasticsearch-6.5.4```
	- Enter bin
	```cd bin```
	- Run Elasticsearch
		```./elasticsearch```
	- Leave the terminal open while Elasticsearch is in use
3. Run the application using python 3
	- Enter the cloned repository
	- Run ```python3 login.py```
	- The flask log will now print out in this terminal window
4. Currently the page appears in your browser at ```localhost:5000/login```