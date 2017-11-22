var expect=require('chai').expect;

describe('Homepage FAQ Accordion',function(){

    var accordion = {
        get first() {return $('.accordion .accordion-item:first-child .accordion-content')},
        get second() {return $('.accordion .accordion-item:nth-of-type(2) .accordion-content')}
    }

    beforeEach(function(){
         browser.url('/webdriverio-course-content/');
    });

    it('should show first section on page load',function(){
        var firstHeight = accordion.first.getCssProperty('height');
        expect(firstHeight.parsed.value).to.be.greaterThan(0);
    });

    it('should not show other content',function(){
        var secondDisplay = accordion.second.getCssProperty('display');
        console.log(secondDisplay);
        expect(secondDisplay.value).to.equal('none');
    });
    
    it('should expand/hide contant on click',function(){
        this.timeout(15000);
        browser.click('.accordion .accordion-item:nth-of-type(2) a');
        browser.pause(1000);
        var secondHeight = accordion.second.getCssProperty('height');
        expect(secondHeight.parsed.value).to.be.greaterThan(0);

        var firstDisplay = accordion.first.getCssProperty('display');
        expect(firstDisplay.value).to.equal('none');
    });
});