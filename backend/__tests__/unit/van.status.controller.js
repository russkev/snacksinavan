const mongoose = require("mongoose")
const vanController = require("../../controllers/van.controller")
const vanModel = require("../../models/van.model")

describe("Unit testing for setVanStatus valid", () => {
  const req = {
    body: {
      readyForOrders: true,
      locationDescription: "Test description",
      latitude: -36.33918629230979,
      longitude: 144.78256069859927,
    },
    headers: {
      vanName: "Test"
    }
  };

  const res = {
    json: jest.fn(),
    status: jest.fn()
  }

  vanData = {
      vanName: "Test",
      readyForOrders: true,
      latitude: -36.33918629230979,
      locationDescription: "Test description",
      longitude: 144.78256069859927,
  }

  beforeAll(() => {
    res.json.mockClear()

    vanModel.updateOne = jest.fn()
    
    vanModel.findOne = jest.fn().mockResolvedValue(vanData);

    vanController.setVanStatus(req, res)
  })

  test("Set van ready for orders", () => {
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(vanData);
  })
}) 

describe("Unit testing for setVanStatus invalid", () => {
  const req = {
    body: {
      readyForOrders: true,
      locationDescription: "Test description",
      latitude: -36.33918629230979,
      longitude: 144.78256069859927,
    },
    headers: {
      vanName: "InvalidVan",
    },
  };

  const res = {
    json: jest.fn(),
    status: jest.fn(),
  };

  vanData = {
    vanName: "Test",
    readyForOrders: false,
    latitude: -36.33918629230979,
    locationDescription: "Test description",
    longitude: 144.78256069859927,
  };

  beforeAll(() => {
    res.json.mockClear();

    vanModel.updateOne = jest.fn();

    vanModel.findOne = jest.fn().mockResolvedValue();

    vanModel.findOne.mockImplementation(() => {
      throw new Error();
    });

    vanController.setVanStatus(req, res);
  });

  test("Set van ready for orders", () => {
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ msg: "Unable to process request"});
  });
})