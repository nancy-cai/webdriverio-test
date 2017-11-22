var btn = '#buyNowButton';
var qty = '#qty';
var thankYou=".callout*=Thank you human";

class Cart {
	//shorten browser.element to $,. If $$, it returns all elements maches the selector, and even if there is only 1 element, it will return an array. So always access using a loop or index
	get btn() {return $(btn) }
	get qty() {return $(qty) }
	get thankYou() {return $(thankYou)}
}

module.exports = new Cart();