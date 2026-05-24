import { assert } from "chai";
import axios from "axios";

suite("Gallery API tests", () => {

  const serviceUrl = "http://localhost:3000";

  const testPost = {
  title: "Chrome Glam",
  image: "gallery/nail6.jpg",
  caption: "Mirror chrome finish with soft nude base. Minimal but classy.",
  style: "Nail Art Acrylic",
  salonName: "Mint Nails Dublin",
};

  test("create gallery post", async () => {

    const response = await axios.post(
      `${serviceUrl}/api/gallery`,
      testPost
    );

    assert.equal(response.status, 201);
    assert.equal(response.data.title, testPost.title);
    assert.equal(response.data.salonName, testPost.salonName);

  });

  test("get all gallery posts", async () => {

    const response = await axios.get(
      `${serviceUrl}/api/gallery`
    );

    assert.equal(response.status, 200);
    assert.isArray(response.data);

  });

});