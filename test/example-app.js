var expect=require('chai').expect;

describe('Robot page', function(){
	
	describe('Product page',function(){
		beforeEach(function(){
			browser.url('/webdriverio-course-content/product-page.html');
		})
		
		it('should add a review when submitted properly',function(){
			browser.setValue('#review-email','test@test.com');
			browser.setValue('#review-content','Review test');
			//browser.debug();
			browser.submitForm('#review-content');
			
			var hasReview=browser.isExisting('.comment=Review test');
			expect(hasReview,'comment text exists').to.be.true;
		});
		
		it('should focus on the first invalid input field on error', function(){
			
			var title=browser.getTitle();
			expect(title).to.equal('Totally Not Evil Sentient Robot - Robot Parts Emporium');
			
			var emailHasFocus=browser.hasFocus('#review-email');
			expect(emailHasFocus,'email should not have focus').to.be.false;
			
			browser.submitForm('form');
			emailHasFocus=browser.hasFocus('#review-email');
			expect(emailHasFocus,'email should not have focus').to.be.true;
		});
	});
	
	describe('Cart Functionality',function(){
		
		var btn = '#buyNowButton';
		var qty = '#qty';
		var thankYou=".callout*=Thank you human";

		var cart = {
			//shorten browser.element to $,. If $$, it returns all elements maches the selector, and even if there is only 1 element, it will return an array. So always access using a loop or index
			get btn() {return $(btn);},
			get qty() {return $(qty);},
			get thankYou() {return $(thankYou);}
		}
		
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
			browser.pause(3000);
		});
		
		describe('checkout process', function(){

			beforeEach(function(){
				cart.qty.setValue(3);
				cart.btn.click();
			});
			
			it('Should diable buy now button during processing',function(){
				var isBtnEnabled=browser.isEnabled(btn);
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

			it('should hode thank you msg after clicking cose button',function(){
				cart.thankYou.waitForExist(3000);
				browser.click('.close-button');
				//wait for the thank you message to disappear
				cart.thankYou.waitForVisible(3000,true);
			})


		});
		
	});
	
});
