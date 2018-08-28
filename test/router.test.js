const test = require("tape");
const supertest = require("supertest");

const handlers = require("../src/handlers");

test("test that tape is working for the routing tests", function(t) {
  t.equal(1, 1, "tape is working");
  t.end();
});
