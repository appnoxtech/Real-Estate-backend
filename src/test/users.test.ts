require('@babel/preset-typescript')
import { UserService } from "../modules/users/services/userService";
const { v4: uuidv4 } = require('uuid');

let userServiceInstance = new UserService();
let userbody = {
    body: {
        id: uuidv4(),
        name: "abc-Users",
        profilePhoto: "",
        phoneNumber: "7355088888",
        email: "abc01@gmail.com",
        isPhoneVerified: true,
        role: "tenant"
    }

};
let request = {
    query: { search: '' },
    params: { id: 'be0167a2-a44a-479f-830a-68fe028ed691' },
    body: {
        id: uuidv4(),
        name: "lmn-Users",
        profilePhoto: "",
        phoneNumber: "9858923454",
        email: "abc01@gmail.com",
        isPhoneVerified: true,
        role: "tenant"
    },
};

const res = {}
describe("User test cases", () => {
    describe("creating user test cases", () => {
        test("creating a user test case", async () => {
            let user = await userServiceInstance.registerUser(userbody, res);
            expect(user.user).toHaveProperty('name');
            expect(user.user).toHaveProperty('phoneNumber');
            expect(user.user).toHaveProperty('email');
            expect(user.user).toHaveProperty('isPhoneVerified');
            expect(user.user).toHaveProperty('role');


        });

        test("creating a user with existing phoneNumber", async () => {
            try {
                await userServiceInstance.registerUser(userbody, res);
            } catch (error: any) {
                expect(error.message).toBe('Account already exists with this phone number.')
            }
        })



    });
    describe("getting user test cases", () => {
        test("getting all the users", async () => {
            let users = await userServiceInstance.readAll(request);
            expect(users.rows.length).not.toBe(0);
        });

        test("getting user by giving search", async () => {
            request.query.search = "ab";
            const users = await userServiceInstance.readAll(request);
            expect(users.rows.length).not.toBe(0);
        });
    });
    describe("getting user by Id", () => {
        test("should return user data if user exists", async () => {
            try {
                const req = { params: { userId: "be0167a2-a44a-479f-830a-68fe028ed691" } };
                const result = await userServiceInstance.getUserById(req);
                expect(result).toBeDefined();

            } catch (error: any) {
                expect(error.message).toBe('user not found.')
            }
        });
    });
    describe("update user test cases", () => {
        test("should update userData and return the updated users", async () => {
            try {
                const req = {
                    params: { id: "c8172ff6-4225-4115-bba8-3412e7e6cf60" },
                    body: { name: "data01", email: "data@gmail.com" }
                };
                const result = await userServiceInstance.updateUser(req);
                expect(result).toBeDefined();
            } catch (err: any) {
                expect(err.message).toBe('user not found.')
            }
        })
    })

    describe("delete user test cases", () => {
        test("delete userData if this user exist", async () => {
            try {
                const req = {
                    params: { id: "63dc0e03-b186-46a2-99e7-55cff4938c59" }
                };
                const result = await userServiceInstance.deleteUser(req);
                expect(result).toBeDefined();
            } catch (error: any) {
                expect(error.message).toBe('user not found')
            }
        })
    })
});




