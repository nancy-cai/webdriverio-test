var expect=require('chai').expect;

describe('Robot page', function(){
	it('should focus on the first invalid input field on error', function(){
		browser
		.url('/webdriverio-course-content')
		.click('=Product Page');
		
		var title=browser.getTitle();
		expect(title).to.equal('Totally Not Evil Sentient Robot - Robot Parts Emporium');
		
		var emailHasFocus=browser.hasFocus('#review-email');
		expect(emailHasFocus,'email should not have focus').to.be.false;
		
		browser.submitForm('form');
		emailHasFocus=browser.hasFocus('#review-email');
		expect(emailHasFocus,'email should not have focus').to.be.true;
	});
});
