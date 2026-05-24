import { assert } from "chai";
import axios from "axios";

suite("Booking API tests", () => {
  const serviceUrl = "http://localhost:3000";

  const testBooking = {
    customerName: "Lovely",
    salonName: "Tropical Nails",
    service: "BIAB",
    date: "2026-05-24",
    time: "10:00",
    notice: "Please do a soft pink finish",
    status: "Pending",
  };

  test("create booking", async () => {
    const response = await axios.post(`${serviceUrl}/api/bookings`, testBooking);

    assert.equal(response.status, 201);
    assert.equal(response.data.customerName, testBooking.customerName);
    assert.equal(response.data.salonName, testBooking.salonName);
    assert.equal(response.data.service, testBooking.service);
  });

  test("get all bookings", async () => {
    const response = await axios.get(`${serviceUrl}/api/bookings`);

    assert.equal(response.status, 200);
    assert.isArray(response.data);
  });
});