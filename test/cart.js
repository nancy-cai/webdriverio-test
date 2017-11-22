var expect=require('chai').expect;
var cart = require('./cart.page.js');

describe('Cart Functionality',function(){
	
		beforeEach(function(){
			browser.url('/webdriverio-course-content/product-page.html');
		});
		
		it('Should only let you buy after setting a quantity',function(){
			//var isBtnEnabled=browser.isEnabled(btn); btn here is var btn = '#buyNowButton';
			var isBtnEnabled=cart.btn.isEnabled();
			expect(isBtnEnabled,'Buy now should be disabled to begin').to.be.false;
			
			/*Add qty*/
			cart.qty.setValue(3);
			isBtnEnabled=cart.btn.isEnabled();
			expect(isBtnEnabled,'Buy now should be enabled now').to.be.true;
		});
		
		describe('checkout process', function(){

			beforeEach(function(){
				cart.qty.setValue(3);
				cart.btn.click();
			});
			
			it('Should diable buy now button during processing',function(){
				var isBtnEnabled=cart.btn.isEnabled();
				expect(isBtnEnabled,'Buy now should be disabled after clicking').to.be.false;
				
				var btnText = cart.btn.getText();
				expect(btnText,'Verify buy now text has changed').to.contain('Purchasing');
			});
			
			it('Should show a thank you msg with qty and type',function(){
				
				/*to look for a class called 'callout' that contains the text 'Thank you human'*/		
				cart.thankYou.waitForExist(3000);
				var thankText = cart.thankYou.getText();	
				expect(thankText).to.contain('3 T-800 Model 101');
			});

			it('Should clear input after completion',function(){
				//if true it waits for the opposite- that' said, no value in the input (default: false)
				//browser.waitForValue(qty,3000,true);
				cart.qty.waitForValue(3000,true);
			});

			it('should reset button text after purchase complete',function(){
				//wait for button to return to 'buy now'
				browser.waitUntil(function(){
					console.log('purch')
					return cart.btn.getText() !== 'Purchasing...'
				}, 3000);

				//Verify button now says 'Buy now'
				var btnText = cart.btn.getText();
				expect(btnText).to.equal('Buy Now');
			});

			it('should hide thank you msg after clicking cose button',function(){
				cart.thankYou.waitForExist(3000);
				browser.click('.close-button');
				//wait for the thank you message to disappear
				cart.thankYou.waitForVisible(3000,true);
			})


		});
		
	});
	