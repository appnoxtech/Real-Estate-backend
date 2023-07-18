require('@babel/preset-typescript')
import { now } from "sequelize/types/utils";
import { RatingsService } from "../modules/ratings/services/ratingService";
const { v4: uuidv4 } = require('uuid');

let RatingsServiceInstance = new RatingsService();
let ratingBody = {
    body: {
        propertyId: "cb428ac2-9f1e-4296-8eae-b604aad8112a",
        userId: "0c8d65a6-a3ed-4df8-bfb3-3abdc1deed3b",
        ratings: "4"
    }
}
let request = {
    query: { search: '' },
    params: { id: 'be0167a2-a44a-479f-830a-68fe028ed691' },
    body: {
        propertyId: "cb428ac2-9f1e-4296-8eae-b604aad8112a",
        userId: "0c8d65a6-a3ed-4df8-bfb3-3abdc1deed3b",
        ratings: "4"
    },
};
const res = {}
describe("Ratings test cases", () => {
    describe("prove ratings test cases", () => {
        test("creating ratings test cases", async () => {
            let ratings = await RatingsServiceInstance.createRatings(ratingBody, res);
            expect(ratings).toHaveProperty('propertyId');
            expect(ratings).toHaveProperty('userId');
            expect(ratings).toHaveProperty('ratings')
        });
        test("give rating of property for existing userId", async () => {
            try {
                await RatingsServiceInstance.createRatings(ratingBody, res);
            } catch (error: any) {
                expect(error.message).toBe('ratings already exist with this user for this property.')
            }
        })
    })
    describe("getting rating by Id", () => {
        test("should return ratings data if user exists", async () => {
            try {
                const req = { params: { userId: "0c8d65a6-a3ed-4df8-bfb3-3abdc1deed3b" } };
                const result = await RatingsServiceInstance.getRatingsByUserId(req);
                expect(result).toBeDefined();

            } catch (error: any) {
                expect(error.message).toBe('user not found.')
            }
        });
    });
    describe("update rating test cases", () => {
        test("should update rating  and return the updated data", async () => {
            try {
                const req = {
                    params: {
                        propertyId: "cb428ac2-9f1e-4296-8eae-b604aad8112a",
                        userId: "0c8d65a6-a3ed-4df8-bfb3-3abdc1deed3b"
                    },
                    body: { ratings: "3" }
                };
                const result = await RatingsServiceInstance.updateRatings(req);
                expect(result).toBeDefined();
            } catch (err: any) {
                expect(err.message).toBe('user not found.')
            }
        })
    })

    describe("get rating test cases", () => {
        test("get data", async () => {
            let data = await RatingsServiceInstance.readAllRatings(request)
            expect(data.rows.length).not.toBe(0)

        })
    })
    describe("delete user test cases", () => {
        test("delete userData if this user exist", async () => {
            try {
                const req = {
                    params: {
                        propertyId: "cb428ac2-9f1e-4296-8eae-b604aad8112a",
                        userId: "0c8d65a6-a3ed-4df8-bfb3-3abdc1deed3b"
                    }
                };
                const result = await RatingsServiceInstance.deleteRatings(req);
                expect(result).toBeDefined();
            } catch (error: any) {
                expect(error.message).toBe('user not found')
            }
        })
    })
})
