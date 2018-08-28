const test = require("tape");
const supertest = require("supertest");

const routes = require("../src/routes");

test("test that tape is working for the routing tests", function(t) {
  t.equal(1, 1, "tape is working");
  t.end();
});

// Home Route
test("Home route returns a status code of 200", t => {
  supertest(routes)
    .get("/")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200"); // note we have used .expect(200) above so this assertion is not neccesary. This is to show you how to check the statusCode in the res.
      t.end();
    });
});

// public route serving all other files for the index
test("Public route returns a status code of 200", t => {
  supertest(routes)
    .get("/search")
    .expect(200)
    .expect("Content-Type", /css/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200"); // note we have used .expect(200) above so this assertion is not neccesary. This is to show you how to check the statusCode in the res.
      t.end();
    });
});

// // Home Route
// test("route", t => {
//   supertest(routes)
//     .post("/")
//     .send(["a", "b"]) // to send a payload
//     // .set({ Headers }) //setting headers
//     .expect(200)
//     .expect("Content-Type", "application/json")
//     .end((err, res) => {
//       t.error(err);
//       t.end();
//     });
// });
