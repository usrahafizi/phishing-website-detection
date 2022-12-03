var tips = ["Never open links from anonymous sources!","Your data is your wealth!","Never share your cridential information with anyone!", "Don't trust everyone!"];

function wait() {
    window.opener = self;
    window.close();
}
window.focus();
window.setTimeout(wait, 15000);