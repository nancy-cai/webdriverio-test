var expect=require('chai').expect;

describe('Robot page', function(){
	
	describe('Product page',function(){
		beforeEach(function(){
			browser.url('/webdriverio-course-content/product-page.html');
		})
		
		it('should add a review when submitted properly',function(){
			browser.setValue('#review-email','test@test.com');
			browser.setValue('#review-content','Review test');
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
	})
	
});
