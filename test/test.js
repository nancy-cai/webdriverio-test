var assert=require('assert');
var request=require('request');

describe('Webdriver.io page', function(){
	
	//skip this test
	it.skip('should have the right title', function(){
		// to chain the function using .then(), need set sync to false in wdio.conf.js
		return browser.url('http://webdriver.io/')
		.getTitle().then(function(title){
			assert.equal(title, 'WebdriverIO - WebDriver bindings for Node.js');
		});
		
	});
	
	it.skip('Should filter search results', function(){
		browser.url('http://webdriver.io/api.html');
		browser.setValue('input[name="search"]','debug');
		browser.saveScreenshot('api-with-result.png');
		
	})
	
	describe('API Page', function(){
		it.skip('Should have a link to the API page', function(){
			browser.url('http://webdriver.io/');
			//var hasAPILink=browser.isExisting('a[href="/api.html"]')
			var hasAPILink=browser.isExisting('=API'); //CSS -selector getting Link text ('=link test')
			assert(hasAPILink);
		});
		
		//only run this test
		it.skip('API link should be clickable',function(){
			browser
			.url('http://webdriver.io/')
			.click('=API');
			var title = browser.getTitle();
			assert.equal(title,'WebdriverIO - API Docs');
			
		});
	})
	
	
});
