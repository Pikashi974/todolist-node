var assert = require("assert");
describe("navbar", function () {
  describe("#createNavbar()", function () {
    it("should return false if localStorage has no user key", function () {
      // assert.equal([1, 2, 3].indexOf(4), -1);
      let localStorage = {};
      let isAuthenticated =
        localStorage.user != undefined &&
        JSON.parse(localStorage.user).jwt != undefined;
      assert.equal(isAuthenticated, false);
    });
    it("should return false if localStorage has no jwt token", function () {
      // assert.equal([1, 2, 3].indexOf(4), -1);
      let localStorage = {
        user: "{}",
      };
      let isAuthenticated =
        localStorage.user != undefined &&
        JSON.parse(localStorage.user).jwt != undefined;
      assert.equal(isAuthenticated, false);
    });
    it("should return true if localStorage has a jwt token", function () {
      // assert.equal([1, 2, 3].indexOf(4), -1);
      let localStorage = {
        user: `{"jwt": "token"}`,
      };
      let isAuthenticated =
        localStorage.user != undefined &&
        JSON.parse(localStorage.user).jwt != undefined;
      assert.equal(isAuthenticated, true);
    });
    it("should return 0 if disconnect button is clicked", function () {
      // assert.equal([1, 2, 3].indexOf(4), -1);
      let localStorage = {
        user: `{"jwt": "token"}`,
      };
      localStorage.clear = () => {
        Object.keys(localStorage).forEach((element) => {
          delete localStorage[element];
        });
      };
      localStorage.clear();
      // 1 because clear
      assert.equal(Object.keys(localStorage).length, 0);
    });
  });
});
