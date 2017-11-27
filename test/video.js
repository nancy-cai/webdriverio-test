var expect=require('chai').expect;
browser.addCommand('isVideoPaused',function(){
    var isPaused = browser.execute(function(){
        var video = document.querySelector('#dance-video');
        return video.paused;
    });
    return isPaused.value;
})

describe('About us video',function(){
    beforeEach(function(){
        browser.url("/webdriverio-course-content/");
        browser.click('=About Us');
    })

    it('should open the modal with video paused',function(){
        var isPaused = browser.isVideoPaused();
        expect(isPaused.value).to.be.true;
    })

    it ('play video on clliking "Play', function(){
        browser.click('#play-btn');
         var isPaused = browser.isVideoPaused();
         expect(isPaused.value).to.be.false;
    })

    it('can pause the video again',function(){
        browser.click('#play-btn');
        browser.pause(1000);
        browser.click('#pause-btn');
        var isPaused = browser.isVideoPaused();
        expect(isPaused.value).to.be.true;
    })
})