var mixpanel = require("mixpanel-browser");

mixpanel.init("b0d0638fc8fccc8c0e2f3f0941739105");

const actions = {
  track: (name, props, options, callback) => {
    mixpanel.track(name, props, options, callback);
  },
};

export const Mixpanel = actions;

export const trackProductListVisit = () => {
  Mixpanel.track("User views product list");
};

export const trackProductSearch = () => {
  Mixpanel.track("User search for a product");
};

export const trackUserOpenProductPage = () => {
  Mixpanel.track("User views a product");
};

export const trackUserChat = () => {
  Mixpanel.track("User sends a message to seller");
};

export const trackSignUp = () => {
  Mixpanel.track("New user joined");
};

export const trackSignIn = () => {
  Mixpanel.track("User log in");
};

export const trackVoiceSearch = () => {
  Mixpanel.track("User search by voice");
};
