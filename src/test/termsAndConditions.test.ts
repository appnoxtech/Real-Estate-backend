require('@babel/preset-typescript')
import { terms_and_conditions_Service } from "../modules/responses/services/terms_and_conditions_service";
const { v4: uuidv4 } = require('uuid');

let terms_and_conditions_ServiceInstance = new terms_and_conditions_Service();
let termsBody = {
    body: {
        id: uuidv4(),
        terms_and_conditions:"hello its data new"
    }

};
let request = {
    query: { search: '' },
    params: { id: 'be0167a2-a44a-479f-830a-68fe028ed691' },
    body: {
        id: uuidv4(),
        terms_and_conditions:"hello its data new"
    },
};

const res = {}
describe("termsAndCondition test cases", () => {
    describe("creating terms test cases", () => {
        test("creating a terms test case", async () => {
            let terms = await terms_and_conditions_ServiceInstance.createTerms(termsBody, res);
            expect(terms).toHaveProperty('terms_and_conditions');
        });

    });
    describe("getting term test cases", () => {
        test("getting all the terms", async () => {
            let terms = await terms_and_conditions_ServiceInstance.readAllTerms(request);
            expect(terms?.length).not.toBe(0);
        });

    });
    describe("getting term by Id", () => {
        test("should return term data if term exists", async () => {
            try {
                const req = { params: { id: "8da32816-f696-499f-b4d5-6940836f3134" } };
                const result = await terms_and_conditions_ServiceInstance.getTermsById(req);

            } catch (error: any) {
                expect(error.message).toBe('term not found.')
            }
        });
    });
    describe("update term test cases", () => {
        test("should update termData and return the updated terms", async () => {
            try {
                const req = {
                    params: { id: "8da32816-f696-499f-b4d5-6940836f3134" },
                    body: { terms_and_conditions:"terms and conditions"}
                };
                const result = await terms_and_conditions_ServiceInstance.updateTerms(req);
                expect(result).toBeDefined();
            } catch (err: any) {
                expect(err.message).toBe('term not found.')
            }
        })
    })

});




