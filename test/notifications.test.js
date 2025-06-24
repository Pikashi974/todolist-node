var assert = require("assert");
var expect = require("expect.js");
function Message(title, description) {
  this.title = title;
  this.description = description;
}

let listeMessage = [
  new Message("Test 1", "Description 1"),
  new Message("", ""), // "Test 2", "Description 2"
  new Message(1, "Description 3"), // "Test 3", "Description 3"
  new Message("Test 4", 2), // "Test 4", "Description 4"
  new Message(3, 4), // "Test 5", "Description 5"
];

function notifyMe(title, description) {
  return `${title}\n${description}`;
}

describe("navbar", function () {
  describe("notifyMe()", function () {
    it("should be a message with only strings", function (done) {
      let message = listeMessage[0];
      expect(message).to.be.an("object");
      expect(message.title).to.be.a("string");
      expect(message.description).to.be.a("string");
      assert.equal(
        notifyMe(message.title, message.description),
        "Test 1\nDescription 1"
      );
      done();
    });
    it("should be a message with only \\n", function (done) {
      let message = listeMessage[1];
      expect(message).to.be.an("object");
      expect(message.title).to.be.a("string");
      expect(message.description).to.be.a("string");
      assert.equal(notifyMe(message.title, message.description), "\n");
      done();
    });
    it("should be a message with a number for title", function (done) {
      let message = listeMessage[2];
      expect(message).to.be.an("object");
      expect(message.title).to.be.a("number");
      expect(message.description).to.be.a("string");
      assert.equal(
        notifyMe(message.title, message.description),
        "1\nDescription 3"
      );
      done();
    });
    it("should be a message with a number for description", function (done) {
      let message = listeMessage[3];
      expect(message).to.be.an("object");
      expect(message.title).to.be.a("string");
      expect(message.description).to.be.a("number");
      assert.equal(notifyMe(message.title, message.description), "Test 4\n2");
      done();
    });
    it("should be a message with only numbers and \\n", function (done) {
      let message = listeMessage[4];
      expect(message).to.be.an("object");
      expect(message.title).to.be.a("number");
      expect(message.description).to.be.a("number");
      assert.equal(notifyMe(message.title, message.description), "3\n4");
      done();
    });
    // notifyMe("", "");
  });
});
